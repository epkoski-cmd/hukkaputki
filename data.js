// Hukkaputki – data
// Tätä tiedostoa muokkaamalla lisäät asemia ja baareja.
//
// Lähteet (marraskuu 2026):
// - Koordinaatit ja baarien perustiedot: OpenStreetMap (© OpenStreetMap-tekijät)
// - Kuvaukset ja tagit: paikkojen omat sivut ja matkailu-/kampussivut
//   (Aalto-yliopiston uutiset, MyHelsinki, Visit Espoo, Ainoa, Radisson Blu).
// - "tarkistettu: false" = paikka löytyy OpenStreetMapista, mutta muuta
//   tietoa ei löytynyt. Sivu näyttää näille huomautuksen.
// - "piilohelmi": lyhyt perustelu, jos paikka on piilohelmi. Kriteerit:
//   1) itsenäinen paikka, ei ketju tai hotelliravintola
//   2) jotain erikoista (oma panimo, sauna, lautapelit, opiskelijavetoinen…)
//   3) ei ole ensimmäisenä silmien edessä (ei kauppakeskuksen pääkäytävällä)
//   4) tiedot on tarkistettu

// Asemat järjestyksessä Aalto-yliopistolta länteen.
const ASEMAT = [
  { id: "aalto",         nimi: "Aalto-yliopisto", linjat: "M1 · M2 · Raide-Jokeri 15", lat: 60.1844626, lon: 24.8235709 },
  { id: "tapiola",       nimi: "Tapiola",         linjat: "M1 · M2", lat: 60.1750223, lon: 24.8038175 },
  { id: "urheilupuisto", nimi: "Urheilupuisto",   linjat: "M1 · M2", lat: 60.1745591, lon: 24.7810824 },
  { id: "niittykumpu",   nimi: "Niittykumpu",     linjat: "M1 · M2", lat: 60.1703645, lon: 24.7630169 },
  { id: "matinkyla",     nimi: "Matinkylä",       linjat: "M1 · M2", lat: 60.15968,   lon: 24.7391256 },
  { id: "finnoo",        nimi: "Finnoo",          linjat: "M1 · M2", lat: 60.1530493, lon: 24.7118863 },
];

// Baarit. "asema" viittaa yllä olevan aseman id:hen.
const BAARIT = [
  // --- Aalto-yliopisto (Otaniemi) ---
  {
    nimi: "Fat Lizard Otaniemi",
    asema: "aalto",
    osoite: "Tietotie 1, Espoo",
    lat: 60.185575, lon: 24.820403,
    kuvaus: "Fat Lizard -panimon oma ravintola heti metroaseman vastapäätä. Talon oluita ja runsasta ruokaa ilman kikkailua.",
    tagit: ["craft beer", "ruokaa"],
    tarkistettu: true,
  },
  {
    nimi: "Masis Brewery Taproom",
    asema: "aalto",
    osoite: "Tietotie 2, Espoo",
    lat: 60.1851983, lon: 24.8225425,
    kuvaus: "Pienpanimon taproom ja panimokauppa sisäpihalla A Blocin takana. Auki vain keskiviikosta lauantaihin.",
    tagit: ["craft beer"],
    tarkistettu: true,
    piilohelmi: "Pienpanimon oma taproom piilossa sisäpihalla – auki vain neljänä päivänä viikossa.",
  },
  {
    nimi: "Kipsari",
    asema: "aalto",
    osoite: "Otaniementie 14, Espoo",
    lat: 60.185693, lon: 24.824374,
    kuvaus: "Taideopiskelijoiden pyörittämä ravintola, baari ja kahvila. Ruoka on vegaanista.",
    tagit: ["opiskelijameininki", "ruokaa", "vegaani"],
    tarkistettu: true,
    piilohelmi: "Opiskelijoiden itse pyörittämä baari keskellä kampusta.",
  },
  {
    nimi: "Bar Otapas",
    asema: "aalto",
    osoite: "Otakaari 27 (A Blanc), Espoo",
    lat: 60.1839647, lon: 24.8310598,
    kuvaus: "Lounge-henkinen baari Alvar Aallon suunnittelemassa A Blancissa. Laaja juomavalikoima, auki joka päivä klo 2 asti.",
    tagit: ["drinkit", "myöhään auki"],
    tarkistettu: true,
  },
  {
    nimi: "Taproom d20",
    asema: "aalto",
    osoite: "Otakaari 27 (A Blanc), Espoo",
    lat: 60.1839647, lon: 24.8310598,
    kuvaus: "Lautapelibaari A Blancin ensimmäisessä kerroksessa.",
    tagit: ["lautapelit", "opiskelijameininki"],
    tarkistettu: true,
    piilohelmi: "Lautapelejä ja olutta samassa paikassa.",
  },
  {
    nimi: "Vesiheinä",
    asema: "aalto",
    osoite: "Otakaari 27 (A Blanc), Espoo",
    lat: 60.1839647, lon: 24.8310598,
    kuvaus: "Olut- ja viskihuone A Blancissa. Vaihtuvia tuotteita ja maistelutilaisuuksia.",
    tagit: ["craft beer", "viski"],
    tarkistettu: true,
  },
  {
    nimi: "Bistro Ranta",
    asema: "aalto",
    osoite: "Otaranta 2, Espoo",
    lat: 60.184009, lon: 24.836432,
    kuvaus: "Radisson Blu -hotellin bistro meren rannalla. Valikoituja oluita ja viinejä sekä merenrantaterassi kesällä.",
    tagit: ["viinit", "terassi", "ruokaa"],
    tarkistettu: true,
  },

  // --- Tapiola ---
  {
    nimi: "Gallows Bird Tapiola",
    asema: "tapiola",
    osoite: "Länsituuli 5, Espoo",
    lat: 60.174736, lon: 24.803326,
    kuvaus: "Paikallinen pienpanimo kauppakeskus Ainoan sisällä. Viikonloppuisin auki klo 2 asti.",
    tagit: ["craft beer", "myöhään auki"],
    tarkistettu: true,
  },
  {
    nimi: "Watson Pub Tapiola",
    asema: "tapiola",
    osoite: "Pohjantie 3, Espoo",
    lat: 60.176144, lon: 24.800808,
    kuvaus: "Vilkas lähiöpubi, jossa on karaokeiltoja ja olutterassi.",
    tagit: ["karaoke", "terassi"],
    tarkistettu: true,
  },
  {
    nimi: "Garden City Cafe",
    asema: "tapiola",
    osoite: "Kauppamiehentie 1, Espoo",
    lat: 60.17691, lon: 24.802253,
    kuvaus: "Pubi Tapiolan keskustassa.",
    tagit: [],
    tarkistettu: false,
  },
  {
    nimi: "Oravanhäntä",
    asema: "tapiola",
    osoite: "Oravannahkatori 3, Espoo",
    lat: 60.176015, lon: 24.793482,
    kuvaus: "Pubi Itätuulen asuinalueella, hieman sivussa Tapiolan keskustasta.",
    tagit: [],
    tarkistettu: false,
  },

  // --- Urheilupuisto ---
  {
    nimi: "Tauko Baari",
    asema: "urheilupuisto",
    osoite: "Jousenpuistonkatu 2, Espoo",
    lat: 60.174355, lon: 24.780386,
    kuvaus: "Pubi aivan Urheilupuiston metroaseman vieressä.",
    tagit: [],
    tarkistettu: false,
  },

  // --- Niittykumpu ---
  {
    nimi: "Bodom Bar & Sauna",
    asema: "niittykumpu",
    osoite: "Merituulentie 35, Espoo",
    lat: 60.170871, lon: 24.756833,
    kuvaus: "15 hanaa, painotus paikallisissa panimoissa. Saunat ja pizzakeittiö.",
    tagit: ["craft beer", "sauna", "ruokaa"],
    tarkistettu: true,
    piilohelmi: "Baari ja sauna samassa paikassa, hanoissa paikallisia panimoita.",
  },

  // --- Matinkylä ---
  {
    nimi: "Freja Rooftop",
    asema: "matinkyla",
    osoite: "Suomenlahdentie 7, Espoo",
    lat: 60.1592649, lon: 24.7364875,
    kuvaus: "Kattobaari Hotel Mattsin 7. kerroksessa. Kesäisin kuohuviiniä, viinejä ja drinkkejä, kesäviikonloppuisin livemusiikkia.",
    tagit: ["viinit", "drinkit", "terassi", "livemusiikki"],
    tarkistettu: true,
  },
  {
    nimi: "O'Learys Iso Omena",
    asema: "matinkyla",
    osoite: "Piispansilta 11 (Iso Omena), Espoo",
    lat: 60.162919, lon: 24.737629,
    kuvaus: "Urheilubaari Iso Omenassa. Shuffleboardia ja biljardia, perjantaisin happy hour.",
    tagit: ["urheilu", "pelit", "ruokaa"],
    tarkistettu: true,
  },
  {
    nimi: "Mega Bistro & Night Club",
    asema: "matinkyla",
    osoite: "Suomenlahdentie 11, Espoo",
    lat: 60.159764, lon: 24.7383,
    kuvaus: "Bistro ja yökerho aivan Matinkylän metroaseman vieressä.",
    tagit: ["yökerho"],
    tarkistettu: false,
  },

  // --- Finnoo ---
  // Ei vielä yhtään baaria. Alue rakentuu vielä 2030-luvulle asti.
];
