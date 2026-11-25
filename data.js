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
// - "placeId": paikan tunniste Googlessa. Sivu hakee sen avulla arvosanan
//   ja kuvan suoraan Googlelta. Googlen ehtojen mukaan omiin tiedostoihin
//   saa tallentaa vain tämän tunnisteen, ei arvosanoja eikä kuvia.
// - "kuvausEn" ja "piilohelmiEn": englanninkieliset versiot. Jos ne
//   puuttuvat, englanninkielinen sivu näyttää suomenkielisen tekstin.
//   Tagit kirjoitetaan suomeksi; käännökset ovat tiedostossa kielet.js.

// Asemat järjestyksessä Aalto-yliopistolta länteen.
// Asemakuvat: Wikimedia Commons (CC BY-SA). Kuvaaja ja lisenssi
// näytetään kuvan alla, kuten lisenssi vaatii.
const ASEMAT = [
  { id: "aalto",         nimi: "Aalto-yliopisto", linjat: "M1 · M2 · Raide-Jokeri 15", lat: 60.1844626, lon: 24.8235709,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Aalto_University_metro_station_%28Nov_2017%29.jpg/960px-Aalto_University_metro_station_%28Nov_2017%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Aalto_University_metro_station_(Nov_2017).jpg",
    },
  },
  { id: "tapiola",       nimi: "Tapiola",         linjat: "M1 · M2", lat: 60.1750223, lon: 24.8038175,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Tapiola_metro_station_%28Nov_2017%29.jpg/960px-Tapiola_metro_station_%28Nov_2017%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Tapiola_metro_station_(Nov_2017).jpg",
    },
  },
  { id: "urheilupuisto", nimi: "Urheilupuisto",   linjat: "M1 · M2", lat: 60.1745591, lon: 24.7810824,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Urheilupuisto_metro_station_entrance_%28January_2019%2C_2%29.jpg/960px-Urheilupuisto_metro_station_entrance_%28January_2019%2C_2%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Urheilupuisto_metro_station_entrance_(January_2019,_2).jpg",
    },
  },
  { id: "niittykumpu",   nimi: "Niittykumpu",     linjat: "M1 · M2", lat: 60.1703645, lon: 24.7630169,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Niittykumpu_metro_station_%28March_2019%29.jpg/960px-Niittykumpu_metro_station_%28March_2019%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Niittykumpu_metro_station_(March_2019).jpg",
    },
  },
  { id: "matinkyla",     nimi: "Matinkylä",       linjat: "M1 · M2", lat: 60.15968,   lon: 24.7391256,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Matinkyl%C3%A4_metro_station_%28Nov_2017%29.jpg/960px-Matinkyl%C3%A4_metro_station_%28Nov_2017%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Matinkyl%C3%A4_metro_station_(Nov_2017).jpg",
    },
  },
  { id: "finnoo",        nimi: "Finnoo",          linjat: "M1 · M2", lat: 60.1530493, lon: 24.7118863,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Finnoo_metro_station.jpg/960px-Finnoo_metro_station.jpg",
      kuvaaja: "JIP",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Finnoo_metro_station.jpg",
    },
  },
];

// Baarit. "asema" viittaa yllä olevan aseman id:hen.
const BAARIT = [
  // --- Aalto-yliopisto (Otaniemi) ---
  {
    nimi: "Fat Lizard Otaniemi",
    asema: "aalto",
    osoite: "Tietotie 1, Espoo",
    placeId: "ChIJw6UCs5T1jUYRRdGPPZCOvjw",
    lat: 60.185575, lon: 24.820403,
    kuvaus: "Fat Lizard -panimon oma ravintola heti metroaseman vastapäätä. Talon oluita ja runsasta ruokaa ilman kikkailua.",
    kuvausEn: "Fat Lizard brewery's own restaurant right across from the metro station. House beers and hearty food, no fuss.",
    tagit: ["craft beer", "ruokaa"],
    tarkistettu: true,
  },
  {
    nimi: "Masis Brewery Taproom",
    asema: "aalto",
    osoite: "Tietotie 2, Espoo",
    placeId: "ChIJC7pMvbb1jUYRrfraQN35aow",
    lat: 60.1851983, lon: 24.8225425,
    kuvaus: "Pienpanimon taproom ja panimokauppa sisäpihalla A Blocin takana. Auki vain keskiviikosta lauantaihin.",
    kuvausEn: "Microbrewery taproom and brewery shop in the courtyard behind A Bloc. Open Wednesday to Saturday only.",
    tagit: ["craft beer"],
    tarkistettu: true,
    piilohelmi: "Pienpanimon oma taproom piilossa sisäpihalla – auki vain neljänä päivänä viikossa.",
    piilohelmiEn: "A microbrewery's own taproom hidden in a courtyard – open only four days a week.",
  },
  {
    nimi: "Kipsari",
    asema: "aalto",
    osoite: "Otaniementie 14, Espoo",
    placeId: "ChIJEefjr6AJkkYR-_5w_0NfRL4",
    lat: 60.185693, lon: 24.824374,
    kuvaus: "Taideopiskelijoiden pyörittämä ravintola, baari ja kahvila. Ruoka on vegaanista.",
    kuvausEn: "Restaurant, bar and café run by art students. The food is vegan.",
    tagit: ["opiskelijameininki", "ruokaa", "vegaani"],
    tarkistettu: true,
    piilohelmi: "Opiskelijoiden itse pyörittämä baari keskellä kampusta.",
    piilohelmiEn: "A bar run by the students themselves, right in the middle of campus.",
  },
  {
    nimi: "Bar Otapas",
    asema: "aalto",
    osoite: "Otakaari 27 (A Blanc), Espoo",
    placeId: "ChIJ_Q-OGwD1jUYRZX4y1TDY3Ac",
    lat: 60.1839647, lon: 24.8310598,
    kuvaus: "Lounge-henkinen baari Alvar Aallon suunnittelemassa A Blancissa. Laaja juomavalikoima, auki joka päivä klo 2 asti.",
    kuvausEn: "Lounge-style bar in A Blanc, designed by Alvar Aalto. Wide selection of drinks, open daily until 2 am.",
    tagit: ["drinkit", "myöhään auki"],
    tarkistettu: true,
  },
  {
    nimi: "Taproom d20",
    asema: "aalto",
    osoite: "Otakaari 27 (A Blanc), Espoo",
    placeId: "ChIJhXReF771jUYR7-b4jtUoku4",
    lat: 60.1839647, lon: 24.8310598,
    kuvaus: "Lautapelibaari A Blancin ensimmäisessä kerroksessa.",
    kuvausEn: "Board game bar on the ground floor of A Blanc.",
    tagit: ["lautapelit", "opiskelijameininki"],
    tarkistettu: true,
    piilohelmi: "Lautapelejä ja olutta samassa paikassa.",
    piilohelmiEn: "Board games and beer in the same place.",
  },
  {
    nimi: "Vesiheinä",
    asema: "aalto",
    osoite: "Otakaari 27 (A Blanc), Espoo",
    placeId: "ChIJ06lBBln1jUYR_bCeM70-4Ac",
    lat: 60.1839647, lon: 24.8310598,
    kuvaus: "Olut- ja viskihuone A Blancissa. Vaihtuvia tuotteita ja maistelutilaisuuksia.",
    kuvausEn: "Beer and whisky room in A Blanc. Rotating selection and tasting events.",
    tagit: ["craft beer", "viski"],
    tarkistettu: true,
  },
  {
    nimi: "Bistro Ranta",
    asema: "aalto",
    osoite: "Otaranta 2, Espoo",
    placeId: "ChIJjXV2JY31jUYRbF0VnD2p3kk",
    lat: 60.184009, lon: 24.836432,
    kuvaus: "Radisson Blu -hotellin bistro meren rannalla. Valikoituja oluita ja viinejä sekä merenrantaterassi kesällä.",
    kuvausEn: "Seaside bistro of the Radisson Blu hotel. Selected beers and wines, plus a waterfront terrace in summer.",
    tagit: ["viinit", "terassi", "ruokaa"],
    tarkistettu: true,
  },

  // --- Tapiola ---
  {
    nimi: "Gallows Bird Tapiola",
    asema: "tapiola",
    osoite: "Länsituuli 5, Espoo",
    placeId: "ChIJY1y9_6f1jUYRf6eAeJ12gRc",
    lat: 60.174736, lon: 24.803326,
    kuvaus: "Paikallinen pienpanimo kauppakeskus Ainoan sisällä. Viikonloppuisin auki klo 2 asti.",
    kuvausEn: "Local microbrewery inside the Ainoa shopping centre. Open until 2 am at weekends.",
    tagit: ["craft beer", "myöhään auki"],
    tarkistettu: true,
  },
  {
    nimi: "Watson Pub Tapiola",
    asema: "tapiola",
    osoite: "Pohjantie 3, Espoo",
    placeId: "ChIJaZruSHr1jUYRyQDU0zUyvEg",
    lat: 60.176144, lon: 24.800808,
    kuvaus: "Vilkas lähiöpubi, jossa on karaokeiltoja ja olutterassi.",
    kuvausEn: "Lively neighbourhood pub with karaoke nights and a beer terrace.",
    tagit: ["karaoke", "terassi"],
    tarkistettu: true,
  },
  {
    nimi: "Garden City Cafe",
    asema: "tapiola",
    osoite: "Kauppamiehentie 1, Espoo",
    placeId: "ChIJ_X4r-Jf1jUYRfh9_4h_2Lc0",
    lat: 60.17691, lon: 24.802253,
    kuvaus: "Pubi Tapiolan keskustassa.",
    kuvausEn: "Pub in central Tapiola.",
    tagit: [],
    tarkistettu: false,
  },
  {
    nimi: "Oravanhäntä",
    asema: "tapiola",
    osoite: "Oravannahkatori 3, Espoo",
    placeId: "ChIJ_TWEBqP1jUYRIoFQkG7F1PQ",
    lat: 60.176015, lon: 24.793482,
    kuvaus: "Pubi Itätuulen asuinalueella, hieman sivussa Tapiolan keskustasta.",
    kuvausEn: "Pub in the Itätuuli residential area, a little off central Tapiola.",
    tagit: [],
    tarkistettu: false,
  },

  // --- Urheilupuisto ---
  {
    nimi: "Tauko Baari",
    asema: "urheilupuisto",
    osoite: "Jousenpuistonkatu 2, Espoo",
    placeId: "ChIJ--zIabb1jUYRnkRWPad-geI",
    lat: 60.174355, lon: 24.780386,
    kuvaus: "Pubi aivan Urheilupuiston metroaseman vieressä.",
    kuvausEn: "Pub right next to Urheilupuisto metro station.",
    tagit: [],
    tarkistettu: false,
  },

  // --- Niittykumpu ---
  {
    nimi: "Bodom Bar & Sauna",
    asema: "niittykumpu",
    osoite: "Merituulentie 35, Espoo",
    placeId: "ChIJTWsgznz1jUYRhm0YgGeivNU",
    lat: 60.170871, lon: 24.756833,
    kuvaus: "15 hanaa, painotus paikallisissa panimoissa. Saunat ja pizzakeittiö.",
    kuvausEn: "15 taps with a focus on local breweries. Saunas and a pizza kitchen.",
    tagit: ["craft beer", "sauna", "ruokaa"],
    tarkistettu: true,
    piilohelmi: "Baari ja sauna samassa paikassa, hanoissa paikallisia panimoita.",
    piilohelmiEn: "Bar and sauna in one, with local breweries on tap.",
  },

  // --- Matinkylä ---
  {
    nimi: "Freja Rooftop",
    asema: "matinkyla",
    osoite: "Suomenlahdentie 7, Espoo",
    placeId: "ChIJf-QQ4M71jUYRvuXXyCHU1Zc",
    lat: 60.1592649, lon: 24.7364875,
    kuvaus: "Kattobaari Hotel Mattsin 7. kerroksessa. Kesäisin kuohuviiniä, viinejä ja drinkkejä, kesäviikonloppuisin livemusiikkia.",
    kuvausEn: "Rooftop bar on the 7th floor of Hotel Matts. Sparkling wine, wines and cocktails in summer, live music on summer weekends.",
    tagit: ["viinit", "drinkit", "terassi", "livemusiikki"],
    tarkistettu: true,
  },
  {
    nimi: "O'Learys Iso Omena",
    asema: "matinkyla",
    osoite: "Piispansilta 11 (Iso Omena), Espoo",
    placeId: "ChIJT7zBlx31jUYRqoJtH-P4CmM",
    lat: 60.162919, lon: 24.737629,
    kuvaus: "Urheilubaari Iso Omenassa. Shuffleboardia ja biljardia, perjantaisin happy hour.",
    kuvausEn: "Sports bar in the Iso Omena shopping centre. Shuffleboard and billiards, happy hour on Fridays.",
    tagit: ["urheilu", "pelit", "ruokaa"],
    tarkistettu: true,
  },
  {
    nimi: "Mega Bistro & Night Club",
    asema: "matinkyla",
    osoite: "Suomenlahdentie 11, Espoo",
    placeId: "ChIJtZGPKwD1jUYRaXa5BtYxCG8",
    lat: 60.159764, lon: 24.7383,
    kuvaus: "Bistro ja yökerho aivan Matinkylän metroaseman vieressä.",
    kuvausEn: "Bistro and nightclub right next to Matinkylä metro station.",
    tagit: ["yökerho"],
    tarkistettu: false,
  },

  // --- Finnoo ---
  // Ei vielä yhtään baaria. Alue rakentuu vielä 2030-luvulle asti.
];
