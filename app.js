// Hukkaputki – sovelluslogiikka
// Lukee asemat ja baarit tiedostosta data.js (muuttujat ASEMAT ja BAARIT)
// ja piirtää ne sivulle. Suodatinnapeilla voi rajata baareja tagien mukaan.

// Valitut suodattimet. Set on lista, jossa sama arvo voi olla vain kerran.
const valitut = new Set();

// Näytetäänkö vain piilohelmet? (oma erillinen suodatin)
let vainHelmet = false;

// ---------- Kieli ----------

// Valitaan kieli tässä järjestyksessä:
// 1) osoitteen ?lang=en  2) aiempi valinta selaimen muistissa
// 3) selaimen kieli: suomi → fi, kaikki muut → en
function alkuKieli() {
  const osoitteesta = new URLSearchParams(location.search).get("lang");
  if (KIELET.includes(osoitteesta)) return osoitteesta;
  const muistista = localStorage.getItem("kieli");
  if (KIELET.includes(muistista)) return muistista;
  return navigator.language.toLowerCase().startsWith("fi") ? "fi" : "en";
}

let kieli = alkuKieli();

// Hakee tekstin valitulla kielellä. {n} korvataan annetulla arvolla.
function t(avain, n) {
  const teksti = TEKSTIT[kieli][avain] ?? TEKSTIT.fi[avain];
  return n === undefined ? teksti : teksti.replace("{n}", n);
}

// Tagin nimi valitulla kielellä (data.js:ssä tagit ovat suomeksi).
function tagiTeksti(tagi) {
  return kieli === "en" ? (TAGIT_EN[tagi] ?? tagi) : tagi;
}

// Baarin kuvaus tai piilohelmiperustelu valitulla kielellä.
// Jos englanninkielinen puuttuu, näytetään suomenkielinen.
function kaannos(baari, kentta) {
  return kieli === "en" ? (baari[kentta + "En"] ?? baari[kentta]) : baari[kentta];
}

// Päivittää sivun kiinteät tekstit (otsikko, iskulause, alatunniste…).
function paivitaKiinteatTekstit() {
  document.documentElement.lang = kieli;
  document.title = t("sivunOtsikko");
  document.querySelectorAll("[data-teksti]").forEach((el) => {
    el.textContent = t(el.dataset.teksti);
  });
  document.getElementById("footer").innerHTML = t("alatunniste");
  document.getElementById("koti-linkki").href = `./?lang=${kieli}`;
  document.querySelectorAll(".lang-switch button").forEach((nappi) => {
    nappi.setAttribute("aria-pressed", nappi.dataset.kieli === kieli ? "true" : "false");
  });
}

// Vaihtaa kielen: muistaa valinnan, päivittää osoitteen (?lang=…)
// ja piirtää sivun uudelleen. Suodattimet pysyvät valittuina.
function vaihdaKieli(uusi) {
  kieli = uusi;
  localStorage.setItem("kieli", kieli);
  const osoite = new URL(location.href);
  osoite.searchParams.set("lang", kieli);
  history.replaceState(null, "", osoite);
  paivitaKiinteatTekstit();
  piirraSuodattimet();
  piirraLinja();
  piirraPutki(); // putki.js
}

document.querySelectorAll(".lang-switch button").forEach((nappi) => {
  nappi.addEventListener("click", () => vaihdaKieli(nappi.dataset.kieli));
});

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
        // Aukioloajat ovat samassa hintaluokassa kuin arvosana, joten ne
        // eivät tee hausta kalliimpaa.
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,photos," +
          "currentOpeningHours.openNow,currentOpeningHours.nextOpenTime,currentOpeningHours.nextCloseTime",
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

// ---------- Aukiolo ----------

// Muuttaa Googlen ajan (esim. "2026-11-25T14:00:00Z") luettavaksi
// Suomen aikaa: "klo 16", "huomenna klo 16" tai "ke klo 16".
// Englanniksi: "16:00", "tomorrow 16:00" tai "Wed 16:00".
// sulkemisaika = true: yöllä sulkeutuva baari on "auki klo 2 asti", ei
// "auki huomenna klo 2 asti", ja puoliyö on "klo 24" / "midnight".
function aikaTeksti(iso, sulkemisaika = false) {
  const aika = new Date(iso);
  const vyohyke = { timeZone: "Europe/Helsinki" };
  const kello = aika.toLocaleTimeString("en-GB", { ...vyohyke, hour: "2-digit", minute: "2-digit" });
  const [tunnit, minuutit] = kello.split(":");
  let kelloTeksti = kieli === "fi"
    ? "klo " + Number(tunnit) + (minuutit === "00" ? "" : "." + minuutit)
    : kello;
  if (sulkemisaika && kello === "00:00") kelloTeksti = kieli === "fi" ? "klo 24" : "midnight";

  // Onko aika tänään, huomenna vai myöhemmin? Verrataan päivämääriä Suomen ajassa.
  const paiva = (d) => d.toLocaleDateString("en-CA", vyohyke); // muoto 2026-11-25
  const nyt = new Date();
  const huomenna = new Date(nyt.getTime() + 24 * 60 * 60 * 1000);
  if (paiva(aika) === paiva(nyt)) return kelloTeksti;
  // Sulkemisaika ennen klo 7 seuraavana aamuna = saman illan jatkot.
  if (sulkemisaika && paiva(aika) === paiva(huomenna) && Number(tunnit) < 7) return kelloTeksti;
  if (paiva(aika) === paiva(huomenna)) return `${t("huomenna")} ${kelloTeksti}`;
  const viikonpaiva = aika.toLocaleDateString(kieli === "fi" ? "fi-FI" : "en-GB", { ...vyohyke, weekday: "short" });
  return `${viikonpaiva} ${kelloTeksti}`;
}

// Palauttaa aukiolotekstin, esim. "Auki klo 2 asti" tai
// "Suljettu · aukeaa ke klo 16". Jos Googlella ei ole aukioloaikoja,
// palautetaan tyhjä, eikä kortissa näytetä mitään.
// Tieto haettiin, kun kortti tuli näkyviin. Jos sivu on ollut pitkään auki,
// tarkistetaan kellosta, onko sulkemis- tai avaamisaika jo ohitettu.
function aukioloHtml(tiedot) {
  const a = tiedot.currentOpeningHours;
  if (!a) return "";
  const nyt = Date.now();
  let auki = a.openNow;
  if (auki && a.nextCloseTime && nyt >= Date.parse(a.nextCloseTime)) auki = false;
  if (!auki && a.nextOpenTime && nyt >= Date.parse(a.nextOpenTime)) auki = true;

  let teksti;
  if (auki) {
    const ennenSulkemista = a.nextCloseTime && nyt < Date.parse(a.nextCloseTime);
    teksti = ennenSulkemista ? t("aukiAsti", aikaTeksti(a.nextCloseTime, true)) : t("aukiNyt");
  } else {
    const ennenAvaamista = a.nextOpenTime && nyt < Date.parse(a.nextOpenTime);
    teksti = ennenAvaamista ? t("suljettuAukeaa", aikaTeksti(a.nextOpenTime)) : t("suljettu");
  }
  return `<p class="open-status ${auki ? "is-open" : "is-closed"}">${teksti}</p>`;
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
        : t("tuntematon");
      html += `
        <figure class="google-photo">
          <img src="${kuva.osoite}"
               alt="${t("kuvaPaikastaAlt", baari.nimi)}" loading="lazy">
          <figcaption>${t("kuva")} ${tekijaHtml} · Google Maps</figcaption>
        </figure>`;
    }

    // Arvosana tähtinä ja numerona, linkki Google Mapsiin.
    // Suomeksi desimaalipilkku (4,4), englanniksi piste (4.4).
    if (tiedot.rating) {
      const muoto = kieli === "fi" ? "fi-FI" : "en-GB";
      const arvosana = tiedot.rating.toLocaleString(muoto, { minimumFractionDigits: 1 });
      const maara = (tiedot.userRatingCount || 0).toLocaleString(muoto);
      html += `
        <p class="google-rating">
          <span class="stars" aria-hidden="true">★</span>
          <strong>${arvosana}</strong>
          <a href="${tiedot.googleMapsUri}" target="_blank" rel="noopener">${t("arvioita", maara)}</a>
        </p>`;
    }

    // Auki / suljettu arvosanan alle.
    html += aukioloHtml(tiedot);

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

// Piirretään uudelleen myös kieltä vaihdettaessa. Napit merkitään
// valituiksi sen mukaan, mitä käyttäjä on jo valinnut.
function piirraSuodattimet() {
  // Kerätään kaikki eri tagit baareista ja järjestetään ne aakkosjärjestykseen
  // valitun kielen mukaan (tagit ovat silti sisäisesti suomeksi).
  const kaikkiTagit = [...new Set(BAARIT.flatMap((b) => b.tagit))]
    .sort((a, b) => tagiTeksti(a).localeCompare(tagiTeksti(b), kieli));
  const kontti = document.getElementById("filter-buttons");
  kontti.innerHTML = "";

  // Ensimmäisenä erikoisnappi: vain piilohelmet
  const helmiNappi = document.createElement("button");
  helmiNappi.className = "chip chip-gem";
  helmiNappi.textContent = t("piilohelmet");
  helmiNappi.setAttribute("aria-pressed", vainHelmet ? "true" : "false");
  helmiNappi.addEventListener("click", () => {
    vainHelmet = !vainHelmet;
    helmiNappi.setAttribute("aria-pressed", vainHelmet ? "true" : "false");
    paivitaSuodatinTilat();
    piirraLinja();
  });
  kontti.appendChild(helmiNappi);

  for (const tagi of kaikkiTagit) {
    const nappi = document.createElement("button");
    nappi.className = "chip";
    nappi.textContent = tagiTeksti(tagi);
    nappi.setAttribute("aria-pressed", valitut.has(tagi) ? "true" : "false");

    nappi.dataset.tagi = tagi;
    nappi.addEventListener("click", () => {
      if (valitut.has(tagi)) {
        valitut.delete(tagi);
      } else {
        valitut.add(tagi);
      }
      nappi.setAttribute("aria-pressed", valitut.has(tagi) ? "true" : "false");
      paivitaSuodatinTilat();
      piirraLinja();
    });

    kontti.appendChild(nappi);
  }
  paivitaSuodatinTilat();
}

// Harmaannuttaa napit, jotka veisivät nollaan osumaan. Valitun napin voi
// aina poistaa. Näin käyttäjä ei päädy tyhjään listaan.
function paivitaSuodatinTilat() {
  const osumia = (tagit, helmet) => BAARIT.filter((b) =>
    (!helmet || b.piilohelmi) && tagit.every((tagi) => b.tagit.includes(tagi))).length;
  document.querySelectorAll("#filter-buttons [data-tagi]").forEach((nappi) => {
    const tagi = nappi.dataset.tagi;
    nappi.disabled = !valitut.has(tagi) && osumia([...valitut, tagi], vainHelmet) === 0;
  });
  const helmiNappi = document.querySelector("#filter-buttons .chip-gem");
  if (helmiNappi) helmiNappi.disabled = !vainHelmet && osumia([...valitut], true) === 0;
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
    <img src="${k.url}" alt="${t("asemakuvaAlt", asema.nimi)}" loading="lazy" width="960" height="640">
    <figcaption>
      ${t("kuva")} <a href="${k.lahde}" target="_blank" rel="noopener">${k.kuvaaja}</a>,
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
    }).addTo(kartta).bindPopup(`<strong>${asema.nimi}</strong><br>${t("metroasema")}`);

    // Baarit: tumma pallo, piilohelmet turkoosilla
    for (const b of baarit) {
      L.circleMarker([b.lat, b.lon], {
        radius: 7, color: "#fff", weight: 2,
        fillColor: b.piilohelmi ? "#1f6f78" : "#1d1d1b", fillOpacity: 1,
      }).addTo(kartta).bindPopup(`<strong>${b.nimi}</strong><br>${t("kavelyKartalla", b.minuutit)}`);
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
        ? t("eiOsumia")
        : t("eiBaareja");
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
    ${baari.piilohelmi ? `<p class="gem-badge">${t("piilohelmi")}</p>` : ""}
    <h3>${baari.nimi}</h3>
    <p class="walk">${t("kavely", baari.minuutit)} · ${baari.osoite}</p>
    ${baari.placeId ? `<div class="google"></div>` : ""}
    ${baari.kuvaus ? `<p class="desc">${kaannos(baari, "kuvaus")}</p>` : ""}
    ${baari.piilohelmi ? `<p class="gem-why"><strong>${t("miksiHelmi")}</strong> ${kaannos(baari, "piilohelmi")}</p>` : ""}
    ${baari.tarkistettu ? "" : `<p class="unverified">${t("tarkistamaton")}</p>`}
    ${baari.tagit.length ? `<ul class="tags">${baari.tagit.map((tagi) => `<li>${tagiTeksti(tagi)}</li>`).join("")}</ul>` : ""}
    <div class="links">
      <a href="${googleMapsLinkki(baari)}" target="_blank" rel="noopener">${t("avaaMapsissa")}</a>
      <a href="${reittiLinkki(asema, baari)}" target="_blank" rel="noopener">${t("kavelyreitti")}</a>
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
paivitaKiinteatTekstit();
piirraSuodattimet();
piirraLinja();
