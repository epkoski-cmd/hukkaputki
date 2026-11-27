// Hukkaputki – putkigeneraattori ("Pistetään putki päälle")
// Arpoo reitin baareista metrolinjan varrelta. Käyttää app.js:n funktioita
// (t, kavelyMinuutit, baariKortti, tagiTeksti…), joten tämä ladataan sen jälkeen.
//
// Säännöt:
// - baareja 2–5, jokainen mieluiten eri asemalla
// - reitti etenee metrolinjaa yhteen suuntaan
// - jos sopivia asemia ei riitä, samalle asemalle saa tulla toinen baari
// - kiinni olevat baarit näytetään, Google-osio kertoo aukiolon
// - tageista riittää YKSI: "karaoke + craft beer" = putkessa voi olla kumpaakin.
//   (Listan suodattimissa sen sijaan vaaditaan kaikki valitut tagit.)

// Käyttäjän valinnat. Tagit ovat samat kuin listan suodattimissa, mutta
// valinnat ovat omansa: putken tekeminen ei muuta alla olevaa listaa.
const putkiValinnat = {
  maara: 3,          // montako baaria
  alku: "",          // aseman id tai "" = mistä tahansa
  tagit: new Set(),
  helmet: false,     // vain piilohelmet
};

// Viimeksi arvottu putki: lista baarien id:itä järjestyksessä.
let nykyinenPutki = [];

// Valinnat, joilla nykyinen putki arvottiin ("Arvo uusi putki" käyttää samoja).
// null = putki tuli jaetusta linkistä.
let viimeisetValinnat = null;

// Ovatko valinnat auki?
let valinnatAuki = false;

// ---------- Arvonta ----------

// Satunnainen alkio listasta.
function arvoYksi(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// Sekoittaa listan satunnaiseen järjestykseen (Fisher–Yates).
function sekoita(lista) {
  const kopio = [...lista];
  for (let i = kopio.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopio[i], kopio[j]] = [kopio[j], kopio[i]];
  }
  return kopio;
}

// Baarit, jotka sopivat valintoihin: piilohelmi (jos valittu) ja vähintään
// yksi valituista tageista (jos tageja on valittu).
function sopivatBaarit({ tagit, helmet }) {
  return BAARIT.filter((b) =>
    (!helmet || b.piilohelmi) &&
    (tagit.size === 0 || b.tagit.some((tagi) => tagit.has(tagi))));
}

// Generaattorissa näytetään vain tagit, joilla on vähintään 2 baaria.
// Yhden baarin tagilla ei saa putkea aikaan.
function putkenTagit() {
  const maarat = new Map();
  for (const b of BAARIT) for (const tagi of b.tagit) maarat.set(tagi, (maarat.get(tagi) || 0) + 1);
  return [...maarat].filter(([, n]) => n >= 2).map(([tagi]) => tagi)
    .sort((a, b) => tagiTeksti(a).localeCompare(tagiTeksti(b), kieli));
}

// Arpoo putken. Palauttaa listan baareja reitin järjestyksessä.
function arvoPutki({ maara, alku, tagit, helmet }) {
  // 1) Baarit, jotka sopivat valintoihin, asemittain.
  const sopivat = sopivatBaarit({ tagit, helmet });
  const asemanBaarit = (asemaId) => sopivat.filter((b) => b.asema === asemaId);

  // Asemien järjestysnumerot linjalla (ASEMAT on idästä länteen).
  const indeksi = (asemaId) => ASEMAT.findIndex((a) => a.id === asemaId);

  // 2) Kaikki mahdolliset reitit: aloitusasema × suunta (länteen +1, itään −1).
  //    Reitin asemat = aloitusasemasta eteenpäin ne, joilla on sopivia baareja.
  const alkuasemat = alku
    ? [indeksi(alku)]
    : ASEMAT.map((_, i) => i).filter((i) => asemanBaarit(ASEMAT[i].id).length > 0);

  const reitit = [];
  for (const i of alkuasemat) {
    for (const suunta of [1, -1]) {
      const asemat = [];
      for (let j = i; j >= 0 && j < ASEMAT.length; j += suunta) {
        if (asemanBaarit(ASEMAT[j].id).length > 0) asemat.push(ASEMAT[j].id);
      }
      if (asemat.length > 0) reitit.push(asemat);
    }
  }
  if (reitit.length === 0) return [];

  // 3) Valitaan reitti, jolla saadaan mahdollisimman monta eri asemaa
  //    (enintään baarien määrä). Tasapelissä arvotaan, joten putki vaihtelee.
  const eriAsemia = (r) => Math.min(maara, r.length);
  const paras = Math.max(...reitit.map(eriAsemia));
  const reitti = arvoYksi(reitit.filter((r) => eriAsemia(r) === paras)).slice(0, paras);

  // 4) Jokaiselta reitin asemalta yksi satunnainen baari.
  const putki = reitti.map((asemaId) => arvoYksi(asemanBaarit(asemaId)));

  // 5) Jos asemia oli liian vähän, täydennetään samoilta asemilta.
  //    Lisäbaari laitetaan oman asemansa baarin perään, jotta järjestys säilyy.
  if (putki.length < maara) {
    const lisat = sekoita(reitti.flatMap(asemanBaarit).filter((b) => !putki.includes(b)))
      .slice(0, maara - putki.length);
    for (const lisa of lisat) {
      const paikka = putki.map((b) => b.asema).lastIndexOf(lisa.asema);
      putki.splice(paikka + 1, 0, lisa);
    }
  }
  return putki;
}

// ---------- Valinnat ----------

function piirraValinnat() {
  const kontti = document.getElementById("putki-valinnat");
  kontti.hidden = !valinnatAuki;
  if (!valinnatAuki) return;

  // Asemat, joilla on baareja (tyhjältä asemalta ei kannata aloittaa).
  const asemaVaihtoehdot = ASEMAT
    .filter((a) => BAARIT.some((b) => b.asema === a.id))
    .map((a) => `<option value="${a.id}" ${putkiValinnat.alku === a.id ? "selected" : ""}>${a.nimi}</option>`)
    .join("");

  kontti.innerHTML = `
    <div class="putki-kentta">
      <p class="putki-otsake">${t("putkiMaara")}</p>
      <div class="putki-maarat" role="group" aria-label="${t("putkiMaara")}">
        ${[2, 3, 4, 5].map((n) => `
          <button type="button" class="chip" data-maara="${n}"
                  aria-pressed="${putkiValinnat.maara === n}">${n}</button>`).join("")}
      </div>
    </div>
    <div class="putki-kentta">
      <label class="putki-otsake" for="putki-alku">${t("putkiAlku")}</label>
      <select id="putki-alku">
        <option value="">${t("putkiMistaTahansa")}</option>
        ${asemaVaihtoehdot}
      </select>
    </div>
    <div class="putki-kentta">
      <p class="putki-otsake">${t("putkiMitaEtsit")}</p>
      <div class="putki-tagit"></div>
      <p class="putki-laskuri" aria-live="polite"></p>
    </div>
    <div class="putki-napit">
      <button type="button" class="putki-paalle">${t("putkiPaalle")}</button>
      <button type="button" class="putki-nappi-toissijainen" data-toiminto="yllata">${t("putkiYllata")}</button>
    </div>
  `;

  // Baarien määrä
  kontti.querySelectorAll("[data-maara]").forEach((nappi) => {
    nappi.addEventListener("click", () => {
      putkiValinnat.maara = Number(nappi.dataset.maara);
      kontti.querySelectorAll("[data-maara]").forEach((n) =>
        n.setAttribute("aria-pressed", n === nappi ? "true" : "false"));
      paivitaLaskuri();
    });
  });

  // Aloitusasema
  kontti.querySelector("#putki-alku").addEventListener("change", (e) => {
    putkiValinnat.alku = e.target.value;
  });

  // Tagit: piilohelmet ensin, sitten muut aakkosjärjestyksessä (kuten listassa).
  const tagiKontti = kontti.querySelector(".putki-tagit");
  const helmi = document.createElement("button");
  helmi.type = "button";
  helmi.className = "chip chip-gem";
  helmi.textContent = t("piilohelmet");
  helmi.setAttribute("aria-pressed", putkiValinnat.helmet ? "true" : "false");
  helmi.addEventListener("click", () => {
    putkiValinnat.helmet = !putkiValinnat.helmet;
    helmi.setAttribute("aria-pressed", putkiValinnat.helmet ? "true" : "false");
    paivitaLaskuri();
  });
  tagiKontti.appendChild(helmi);

  for (const tagi of putkenTagit()) {
    const nappi = document.createElement("button");
    nappi.type = "button";
    nappi.className = "chip";
    nappi.dataset.tagi = tagi;
    nappi.textContent = tagiTeksti(tagi);
    nappi.setAttribute("aria-pressed", putkiValinnat.tagit.has(tagi) ? "true" : "false");
    nappi.addEventListener("click", () => {
      if (putkiValinnat.tagit.has(tagi)) putkiValinnat.tagit.delete(tagi);
      else putkiValinnat.tagit.add(tagi);
      nappi.setAttribute("aria-pressed", putkiValinnat.tagit.has(tagi) ? "true" : "false");
      paivitaLaskuri();
    });
    tagiKontti.appendChild(nappi);
  }

  kontti.querySelector(".putki-paalle").addEventListener("click", () => teePutki(putkiValinnat));
  kontti.querySelector('[data-toiminto="yllata"]').addEventListener("click", yllataMinut);
  paivitaLaskuri();
}

// Kertoo heti, montako baaria valintoihin sopii, ja estää valinnat,
// joilla ei saisi yhtään baaria.
function paivitaLaskuri() {
  const kontti = document.getElementById("putki-valinnat");
  const laskuri = kontti.querySelector(".putki-laskuri");
  if (!laskuri) return;
  const n = sopivatBaarit(putkiValinnat).length;

  // Piilohelmet päällä: tagi, jolla ei ole yhtään piilohelmeä, ei tuo mitään.
  kontti.querySelectorAll(".putki-tagit [data-tagi]").forEach((nappi) => {
    const turha = putkiValinnat.helmet && !putkiValinnat.tagit.has(nappi.dataset.tagi) &&
      !BAARIT.some((b) => b.piilohelmi && b.tagit.includes(nappi.dataset.tagi));
    nappi.disabled = turha;
  });

  laskuri.textContent = n === 0
    ? t("putkiLaskuriNolla")
    : n < putkiValinnat.maara
      ? t("putkiLaskuriVahan", n)
      : t("putkiLaskuri", n);
  laskuri.classList.toggle("on-varoitus", n < putkiValinnat.maara);
  kontti.querySelector(".putki-paalle").disabled = n === 0;
}

// ---------- Putken teko ja tulos ----------

// Arpoo putken annetuilla valinnoilla ja näyttää sen.
function teePutki(valinnat) {
  const putki = arvoPutki(valinnat);
  nykyinenPutki = putki.map((b) => b.id);
  viimeisetValinnat = valinnat;
  valinnatAuki = false;
  piirraValinnat();
  paivitaPutkiOsoite();
  piirraTulos();
  document.getElementById("putki-tulos").scrollIntoView({ behavior: "smooth", block: "start" });
}

// "Yllätä minut": 3 baaria mistä tahansa, ei suodattimia.
function yllataMinut() {
  teePutki({ maara: 3, alku: "", tagit: new Set(), helmet: false });
}

// Pitää osoitteen ?putki=… ajan tasalla, jotta sen voi jakaa sellaisenaan.
function paivitaPutkiOsoite() {
  const osoite = new URL(location.href);
  if (nykyinenPutki.length) osoite.searchParams.set("putki", nykyinenPutki.join(","));
  else osoite.searchParams.delete("putki");
  history.replaceState(null, "", osoite);
}

// Jakolinkki: putki + kieli, ei muuta.
function jakoLinkki() {
  const osoite = new URL(location.origin + location.pathname);
  osoite.searchParams.set("putki", nykyinenPutki.join(","));
  osoite.searchParams.set("lang", kieli);
  return osoite.toString();
}

// Jakaa putken puhelimen jakovalikolla tai kopioi linkin leikepöydälle.
async function jaaPutki(nappi) {
  const baarit = nykyinenPutki.map((id) => BAARIT.find((b) => b.id === id));
  const otsikko = `Hukkaputki: ${baarit.map((b) => b.nimi).join(" → ")}`;
  const linkki = jakoLinkki();
  try {
    if (navigator.share) {
      await navigator.share({ title: "Hukkaputki", text: otsikko, url: linkki });
    } else {
      await navigator.clipboard.writeText(`${otsikko}\n${linkki}`);
      nappi.textContent = t("putkiKopioitu");
    }
  } catch (virhe) {
    // Käyttäjä sulki jakovalikon – ei tehdä mitään.
  }
}

// HSL Reittiopas: lähtöpaikkana viimeinen baari, määränpään käyttäjä kirjoittaa itse.
function reittiopasLinkki(baari) {
  const lahto = encodeURIComponent(`${baari.nimi}::${baari.lat},${baari.lon}`);
  return `https://reittiopas.hsl.fi/reitti/${lahto}/-`;
}

// Piirtää tuloksen. Jos putki arvottiin täällä, näytetään myös "Arvo uusi putki".
function piirraTulos() {
  const tulos = document.getElementById("putki-tulos");
  tulos.innerHTML = "";
  if (!nykyinenPutki.length && !viimeisetValinnat) return;
  const pyydetty = viimeisetValinnat && viimeisetValinnat.maara;

  const baarit = nykyinenPutki
    .map((id) => BAARIT.find((b) => b.id === id))
    .filter(Boolean);

  if (baarit.length === 0) {
    tulos.innerHTML = `<p class="putki-huom">${t("putkiEiOsumia")}</p>`;
    return;
  }

  const asemaOf = (b) => ASEMAT.find((a) => a.id === b.asema);
  const ensimmainen = asemaOf(baarit[0]).nimi;
  const viimeinen = asemaOf(baarit[baarit.length - 1]).nimi;

  const otsikko = document.createElement("div");
  otsikko.className = "putki-otsikko";
  otsikko.innerHTML = `
    <h2>${t("putkiOtsikko")}</h2>
    <p class="station-meta">${ensimmainen === viimeinen ? ensimmainen : `${ensimmainen} → ${viimeinen}`}
      · ${t("putkiBaareja", baarit.length)}</p>
    ${pyydetty && baarit.length < pyydetty ? `<p class="putki-huom">${t("putkiVahemman", baarit.length)}</p>` : ""}
  `;
  tulos.appendChild(otsikko);

  // Pysäkit: välissä kerrotaan metromatka edelliseltä baarilta.
  const lista = document.createElement("ol");
  lista.className = "putki-lista";
  baarit.forEach((baari, i) => {
    const asema = asemaOf(baari);
    if (i > 0) {
      const edellinen = asemaOf(baarit[i - 1]);
      const vali = Math.abs(ASEMAT.indexOf(asema) - ASEMAT.indexOf(edellinen));
      const siirtyma = document.createElement("li");
      siirtyma.className = "putki-siirtyma";
      siirtyma.setAttribute("aria-hidden", "true");
      siirtyma.textContent = vali === 0
        ? t("putkiSamaAsema")
        : `${vali === 1 ? t("putkiMetrolla1") : t("putkiMetrolla", vali)} ${asema.nimi}`;
      lista.appendChild(siirtyma);
    }
    const kohta = document.createElement("li");
    kohta.className = "putki-kohta";
    kohta.innerHTML = `<p class="putki-numero">${i + 1}. ${asema.nimi}</p>`;
    kohta.appendChild(baariKortti(asema, { ...baari, minuutit: kavelyMinuutit(asema, baari) }));
    lista.appendChild(kohta);
  });
  tulos.appendChild(lista);

  // Napit, vesivinkki, kotimatka ja tuki.
  const loppu = document.createElement("div");
  loppu.className = "putki-loppu";
  loppu.innerHTML = `
    <div class="putki-napit">
      ${viimeisetValinnat ? `<button type="button" class="chip" data-toiminto="uusi">${t("putkiUusi")}</button>` : ""}
      <button type="button" class="chip" data-toiminto="jaa">${t("putkiJaa")}</button>
      <button type="button" class="chip" data-toiminto="muokkaa">${t("putkiMuokkaa")}</button>
    </div>
    <p class="putki-vinkki">${t("putkiVesi")}</p>
    <p class="putki-vinkki">${t("putkiKotiin")}
      <a href="${reittiopasLinkki(baarit[baarit.length - 1])}" target="_blank" rel="noopener">${t("putkiReittiopas")}</a></p>
    <aside class="putki-tuki">${t("putkiTuki")}</aside>
  `;
  const uusi = loppu.querySelector('[data-toiminto="uusi"]');
  if (uusi) uusi.addEventListener("click", () => teePutki(viimeisetValinnat));
  loppu.querySelector('[data-toiminto="jaa"]').addEventListener("click", (e) => jaaPutki(e.target));
  loppu.querySelector('[data-toiminto="muokkaa"]').addEventListener("click", () => {
    valinnatAuki = true;
    piirraValinnat();
    document.getElementById("putki").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  tulos.appendChild(loppu);
}

// ---------- Aloitusnapit ja käynnistys ----------

// Piirretään uudelleen myös kieltä vaihdettaessa (app.js kutsuu tätä).
function piirraPutki() {
  piirraValinnat();
  piirraTulos();
}

// Navigaation "Pistetään putki päälle" avaa valinnat.
document.getElementById("navi-putki").addEventListener("click", (e) => {
  e.preventDefault();
  valinnatAuki = true;
  piirraValinnat();
  document.getElementById("putki").scrollIntoView({ behavior: "smooth", block: "start" });
});

// Logo vie etusivulle: putki ja valinnat suljetaan ja palataan ylös.
document.getElementById("koti-linkki").addEventListener("click", (e) => {
  e.preventDefault();
  nykyinenPutki = [];
  viimeisetValinnat = null;
  valinnatAuki = false;
  paivitaPutkiOsoite();
  piirraPutki();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Jos osoitteessa on ?putki=…, näytetään jaettu putki.
// Tuntemattomat id:t (esim. poistettu baari) ohitetaan.
const jaettu = new URLSearchParams(location.search).get("putki");
if (jaettu) {
  nykyinenPutki = jaettu.split(",").filter((id) => BAARIT.some((b) => b.id === id)).slice(0, 5);
}
piirraPutki();
if (nykyinenPutki.length) {
  document.getElementById("putki-tulos").scrollIntoView({ block: "start" });
}
