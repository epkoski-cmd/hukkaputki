// Hukkaputki – sovelluslogiikka
// Lukee asemat ja baarit tiedostosta data.js (muuttujat ASEMAT ja BAARIT)
// ja piirtää ne sivulle. Suodatinnapeilla voi rajata baareja tagien mukaan.

// Valitut suodattimet. Set on lista, jossa sama arvo voi olla vain kerran.
const valitut = new Set();

// Näytetäänkö vain piilohelmet? (oma erillinen suodatin)
let vainHelmet = false;

// ---------- Kävelyaika ----------

// Etäisyys kahden koordinaatin välillä metreinä (haversine-kaava).
function etaisyysMetreina(lat1, lon1, lat2, lon2) {
  const R = 6371000; // maapallon säde metreinä
  const rad = (aste) => (aste * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Arvio kävelyajasta minuutteina.
// Kadut eivät kulje suoraan, joten linnuntie kerrotaan 1,3:lla.
// Kävelyvauhti noin 80 m/min (≈ 4,8 km/h).
function kavelyMinuutit(asema, baari) {
  const linnuntie = etaisyysMetreina(asema.lat, asema.lon, baari.lat, baari.lon);
  return Math.max(1, Math.round((linnuntie * 1.3) / 80));
}

// ---------- Linkit ----------

// Google Mapsin hakulinkki. Ei vaadi API-avainta.
// Ohje: https://developers.google.com/maps/documentation/urls/get-started
function googleMapsLinkki(baari) {
  const haku = encodeURIComponent(`${baari.nimi}, ${baari.osoite}`);
  return `https://www.google.com/maps/search/?api=1&query=${haku}`;
}

// Kävelyreitti asemalta baariin Google Mapsissa.
function reittiLinkki(asema, baari) {
  const mista = `${asema.lat},${asema.lon}`;
  const minne = encodeURIComponent(`${baari.nimi}, ${baari.osoite}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${mista}&destination=${minne}&travelmode=walking`;
}

// ---------- Google: arvosana ja kuva ----------

// API-avain näkyy julkisesti sivun koodissa, ja se on normaalia.
// Avain on Google Cloudissa rajattu niin, että se toimii vain
// osoitteissa epkoski-cmd.github.io ja localhost:8000 ja vain Places API:ssa.
const GOOGLE_API_KEY = "AIzaSyBHt90N4iqEUOOX2KSsZeuAcKevfkVVTjs";

// Haetut tiedot pidetään muistissa vain niin kauan kuin sivu on auki,
// ettei samaa baaria haeta uudelleen esim. suodattimia vaihdettaessa.
// Googlen ehtojen vuoksi tietoja EI tallenneta pysyvästi mihinkään.
const googleMuisti = new Map();

function jsonTaiVirhe(vastaus) {
  if (!vastaus.ok) throw new Error(`Google vastasi ${vastaus.status}`);
  return vastaus.json();
}

// Hakee Googlelta arvosanan, arvioiden määrän, linkin ja kuvan tiedot.
// FieldMask kertoo, mitkä kentät halutaan – vähemmän kenttiä = halvempi haku.
function haeGoogleTiedot(placeId) {
  if (!googleMuisti.has(placeId)) {
    const haku = fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=fi`, {
      headers: {
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,photos",
      },
    })
      .then(jsonTaiVirhe)
      .then(async (tiedot) => {
        // Kuvan osoite haetaan heti kerran (skipHttpRedirect). Muuten jokainen
        // kortin uudelleenpiirto hakisi kuvan Googlelta uudestaan ja maksaisi.
        const kuva = tiedot.photos && tiedot.photos[0];
        if (kuva) {
          const media = await fetch(
            `https://places.googleapis.com/v1/${kuva.name}/media?maxWidthPx=640&skipHttpRedirect=true`,
            { headers: { "X-Goog-Api-Key": GOOGLE_API_KEY } }
          ).then(jsonTaiVirhe);
          kuva.osoite = media.photoUri;
        }
        return tiedot;
      });
    googleMuisti.set(placeId, haku);
  }
  return googleMuisti.get(placeId);
}

// Täyttää kortin Google-osion. Jos haku epäonnistuu, osio poistetaan
// hiljaa, ja kortissa näkyy edelleen tavallinen Google Maps -linkki.
async function taytaGoogleOsio(osio, baari) {
  try {
    const tiedot = await haeGoogleTiedot(baari.placeId);
    let html = "";

    // Kuva: Google vaatii kuvaajan nimen näkyviin.
    const kuva = tiedot.photos && tiedot.photos[0];
    if (kuva && kuva.osoite) {
      const tekija = (kuva.authorAttributions || [])[0];
      const tekijaHtml = tekija
        ? `<a href="${tekija.uri}" target="_blank" rel="noopener">${tekija.displayName}</a>`
        : "tuntematon";
      html += `
        <figure class="google-photo">
          <img src="${kuva.osoite}"
               alt="Kuva paikasta ${baari.nimi}" loading="lazy">
          <figcaption>Kuva: ${tekijaHtml} · Google Maps</figcaption>
        </figure>`;
    }

    // Arvosana tähtinä ja numerona, linkki Google Mapsiin.
    if (tiedot.rating) {
      const arvosana = tiedot.rating.toLocaleString("fi-FI", { minimumFractionDigits: 1 });
      const maara = (tiedot.userRatingCount || 0).toLocaleString("fi-FI");
      html += `
        <p class="google-rating">
          <span class="stars" aria-hidden="true">★</span>
          <strong>${arvosana}</strong>
          <a href="${tiedot.googleMapsUri}" target="_blank" rel="noopener">(${maara} arviota Google Mapsissa)</a>
        </p>`;
    }

    if (html) {
      osio.innerHTML = html;
    } else {
      osio.remove();
    }
  } catch (virhe) {
    console.warn(`Google-tietoja ei saatu: ${baari.nimi}`, virhe);
    osio.remove();
  }
}

// IntersectionObserver kertoo, kun kortti tulee näkyviin. Vasta silloin
// haetaan Googlelta – näin maksetaan vain niistä korteista, jotka joku näkee.
const korttiVahti = new IntersectionObserver((havainnot) => {
  for (const h of havainnot) {
    if (!h.isIntersecting) continue;
    korttiVahti.unobserve(h.target); // haetaan vain kerran
    taytaGoogleOsio(h.target.googleOsio, h.target.baari);
  }
}, { rootMargin: "200px" }); // aloitetaan vähän ennen kuin kortti on ruudulla

// ---------- Suodattimet ----------

function piirraSuodattimet() {
  // Kerätään kaikki eri tagit baareista aakkosjärjestykseen.
  const kaikkiTagit = [...new Set(BAARIT.flatMap((b) => b.tagit))].sort();
  const kontti = document.getElementById("filter-buttons");

  // Ensimmäisenä erikoisnappi: vain piilohelmet
  const helmiNappi = document.createElement("button");
  helmiNappi.className = "chip chip-gem";
  helmiNappi.textContent = "💎 Piilohelmet";
  helmiNappi.setAttribute("aria-pressed", "false");
  helmiNappi.addEventListener("click", () => {
    vainHelmet = !vainHelmet;
    helmiNappi.setAttribute("aria-pressed", vainHelmet ? "true" : "false");
    piirraLinja();
  });
  kontti.appendChild(helmiNappi);

  for (const tagi of kaikkiTagit) {
    const nappi = document.createElement("button");
    nappi.className = "chip";
    nappi.textContent = tagi;
    nappi.setAttribute("aria-pressed", "false");

    nappi.addEventListener("click", () => {
      if (valitut.has(tagi)) {
        valitut.delete(tagi);
      } else {
        valitut.add(tagi);
      }
      nappi.setAttribute("aria-pressed", valitut.has(tagi) ? "true" : "false");
      piirraLinja();
    });

    kontti.appendChild(nappi);
  }
}

// Baari näytetään, jos sillä on KAIKKI valitut tagit
// (ja se on piilohelmi, jos helmisuodatin on päällä).
function sopiiSuodattimiin(baari) {
  if (vainHelmet && !baari.piilohelmi) return false;
  return [...valitut].every((tagi) => baari.tagit.includes(tagi));
}

// ---------- Asemakuva ----------

// Kuva ja sen alle kuvaaja + lisenssi (CC BY-SA vaatii nämä näkyviin).
function asemaKuva(asema) {
  const k = asema.kuva;
  const kuva = document.createElement("figure");
  kuva.className = "station-photo";
  kuva.innerHTML = `
    <img src="${k.url}" alt="Metroasema: ${asema.nimi}" loading="lazy" width="960" height="640">
    <figcaption>
      Kuva: <a href="${k.lahde}" target="_blank" rel="noopener">${k.kuvaaja}</a>,
      <a href="${k.lisenssiUrl}" target="_blank" rel="noopener">${k.lisenssi}</a>
    </figcaption>
  `;
  return kuva;
}

// ---------- Kartta ----------

// Kaikki sivun kartat. Ne poistetaan ennen uudelleenpiirtoa,
// muuten vanhat kartat jäisivät muistiin.
let kartat = [];

function asemaKartta(asema, baarit) {
  const div = document.createElement("div");
  div.className = "station-map";

  // Leaflet tarvitsee div:n, joka on jo sivulla, joten kartta luodaan
  // vasta kun osio on lisätty (ks. piirraLinja).
  div.luoKartta = () => {
    const kartta = L.map(div, {
      scrollWheelZoom: false,          // ei zoomaa vahingossa sivua vierittäessä
      dragging: !L.Browser.mobile,     // puhelimella sormi vierittää sivua, ei karttaa
      tap: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(kartta);

    // Asema: iso oranssi pallo
    L.circleMarker([asema.lat, asema.lon], {
      radius: 9, color: "#fff", weight: 3, fillColor: "#ff6319", fillOpacity: 1,
    }).addTo(kartta).bindPopup(`<strong>${asema.nimi}</strong><br>metroasema`);

    // Baarit: tumma pallo, piilohelmet turkoosilla
    for (const b of baarit) {
      L.circleMarker([b.lat, b.lon], {
        radius: 7, color: "#fff", weight: 2,
        fillColor: b.piilohelmi ? "#1f6f78" : "#1d1d1b", fillOpacity: 1,
      }).addTo(kartta).bindPopup(`<strong>${b.nimi}</strong><br>noin ${b.minuutit} min kävelyä`);
    }

    // Zoomataan niin, että asema ja kaikki baarit näkyvät
    const pisteet = [[asema.lat, asema.lon], ...baarit.map((b) => [b.lat, b.lon])];
    if (pisteet.length > 1) {
      kartta.fitBounds(pisteet, { padding: [24, 24], maxZoom: 17 });
    } else {
      kartta.setView(pisteet[0], 16);
    }
    kartat.push(kartta);
  };
  return div;
}

// ---------- Asemat ja baarit ----------

function piirraLinja() {
  const linja = document.getElementById("line");
  kartat.forEach((k) => k.remove());
  kartat = [];
  linja.innerHTML = ""; // tyhjennetään ja piirretään uudelleen

  for (const asema of ASEMAT) {
    // Aseman baarit, suodatettuna ja lähimmästä kauimpaan.
    const baarit = BAARIT
      .filter((b) => b.asema === asema.id && sopiiSuodattimiin(b))
      .map((b) => ({ ...b, minuutit: kavelyMinuutit(asema, b) }))
      .sort((a, b) => a.minuutit - b.minuutit);

    const osio = document.createElement("article");
    osio.className = "station";
    osio.innerHTML = `
      <h2>${asema.nimi}</h2>
      <p class="station-meta">${asema.linjat}</p>
    `;

    // Kuva ja kartta rinnakkain (tietokone) tai allekkain (puhelin)
    const media = document.createElement("div");
    media.className = "station-media";
    if (asema.kuva) media.appendChild(asemaKuva(asema));
    const karttaDiv = asemaKartta(asema, baarit);
    media.appendChild(karttaDiv);
    osio.appendChild(media);

    if (baarit.length === 0) {
      const tyhja = document.createElement("p");
      tyhja.className = "empty";
      tyhja.textContent = valitut.size > 0 || vainHelmet
        ? "Ei osumia näillä suodattimilla."
        : "Ei vielä baareja listalla.";
      osio.appendChild(tyhja);
    } else {
      const lista = document.createElement("div");
      lista.className = "bars";
      for (const baari of baarit) {
        lista.appendChild(baariKortti(asema, baari));
      }
      osio.appendChild(lista);
    }

    linja.appendChild(osio);
    karttaDiv.luoKartta(); // nyt div on sivulla, joten kartan voi luoda
  }
}

function baariKortti(asema, baari) {
  const kortti = document.createElement("div");
  kortti.className = baari.piilohelmi ? "bar bar-gem" : "bar";
  kortti.innerHTML = `
    ${baari.piilohelmi ? `<p class="gem-badge">💎 Piilohelmi</p>` : ""}
    <h3>${baari.nimi}</h3>
    <p class="walk">🚶 noin ${baari.minuutit} min asemalta · ${baari.osoite}</p>
    ${baari.placeId ? `<div class="google"></div>` : ""}
    ${baari.kuvaus ? `<p class="desc">${baari.kuvaus}</p>` : ""}
    ${baari.piilohelmi ? `<p class="gem-why"><strong>Miksi helmi:</strong> ${baari.piilohelmi}</p>` : ""}
    ${baari.tarkistettu ? "" : `<p class="unverified">Tietoja ei ole vielä tarkistettu. Katso ajantasainen tilanne Google Mapsista.</p>`}
    ${baari.tagit.length ?`<ul class="tags">${baari.tagit.map((t) => `<li>${t}</li>`).join("")}</ul>` : ""}
    <div class="links">
      <a href="${googleMapsLinkki(baari)}" target="_blank" rel="noopener">Avaa Google Mapsissa →</a>
      <a href="${reittiLinkki(asema, baari)}" target="_blank" rel="noopener">Kävelyreitti</a>
    </div>
  `;

  // Google-osio täytetään vasta, kun kortti tulee näkyviin.
  const googleOsio = kortti.querySelector(".google");
  if (googleOsio) {
    kortti.googleOsio = googleOsio;
    kortti.baari = baari;
    korttiVahti.observe(kortti);
  }
  return kortti;
}

// ---------- Käynnistys ----------
piirraSuodattimet();
piirraLinja();
