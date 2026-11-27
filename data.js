// Hukkaputki – data
// Tätä tiedostoa muokkaamalla lisäät asemia ja baareja.
//
// Lähteet (marraskuu 2026):
// - Koordinaatit ja baarien perustiedot: OpenStreetMap (© OpenStreetMap-tekijät)
// - Kuvaukset ja tagit: paikkojen omat sivut ja matkailu-/kampussivut
//   (Aalto-yliopiston uutiset, MyHelsinki, Visit Espoo, Ainoa, Radisson Blu,
//   Fonecta).
// - "tarkistettu: false" = paikka löytyy OpenStreetMapista ja Google kertoo
//   sen olevan auki (tarkistettu 26.11.2026), mutta muuta tietoa ei löytynyt. Sivu näyttää näille huomautuksen.
// - "piilohelmi": lyhyt perustelu, jos paikka on piilohelmi. Kriteerit:
//   1) itsenäinen paikka, ei ketju tai hotelliravintola
//   2) jotain erikoista (oma panimo, sauna, lautapelit, opiskelijavetoinen…)
//   3) ei ole ensimmäisenä silmien edessä (ei kauppakeskuksen pääkäytävällä)
//   4) tiedot on tarkistettu
// - "id": baarin pysyvä tunniste (pienillä kirjaimilla, ei ääkkösiä).
//   Jaetut putkilinkit (?putki=…) käyttävät sitä, joten ÄLÄ muuta olemassa
//   olevaa id:tä. Uudelle baarille keksitään uusi, ainutlaatuinen id.
// - "placeId": paikan tunniste Googlessa. Sivu hakee sen avulla arvosanan
//   ja kuvan suoraan Googlelta. Googlen ehtojen mukaan omiin tiedostoihin
//   saa tallentaa vain tämän tunnisteen, ei arvosanoja eikä kuvia.
// - "kuvausEn" ja "piilohelmiEn": englanninkieliset versiot. Jos ne
//   puuttuvat, englanninkielinen sivu näyttää suomenkielisen tekstin.
//   Tagit kirjoitetaan suomeksi; käännökset ovat tiedostossa kielet.js.

// Asemat järjestyksessä idästä länteen: Lauttasaaresta Kivenlahteen.
// M2 kääntyy Tapiolassa, joten sen länsipuolella kulkee vain M1.
// Asemakuvat: Wikimedia Commons (CC BY-SA). Kuvaaja ja lisenssi
// näytetään kuvan alla, kuten lisenssi vaatii.
const ASEMAT = [
  { id: "lauttasaari", nimi: "Lauttasaari", linjat: "M1 · M2", lat: 60.1598379, lon: 24.8806106,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Lauttasaari_metro_station_%28Nov_2017%29.jpg/960px-Lauttasaari_metro_station_%28Nov_2017%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Lauttasaari_metro_station_(Nov_2017).jpg",
    },
  },
  { id: "koivusaari", nimi: "Koivusaari", linjat: "M1 · M2", lat: 60.1632067, lon: 24.8557077,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Koivusaari_metro_station_%28Nov_2017%29.jpg/960px-Koivusaari_metro_station_%28Nov_2017%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Koivusaari_metro_station_(Nov_2017).jpg",
    },
  },
  { id: "keilaniemi", nimi: "Keilaniemi", linjat: "M1 · M2", lat: 60.1760221, lon: 24.8294526,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Platform_area_at_Keilaniemi_metro_station_in_January_2025.jpg/960px-Platform_area_at_Keilaniemi_metro_station_in_January_2025.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      kuvaaja: "JIP",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Platform_area_at_Keilaniemi_metro_station_in_January_2025.jpg",
    },
  },
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
  { id: "urheilupuisto", nimi: "Urheilupuisto",   linjat: "M1", lat: 60.1745591, lon: 24.7810824,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Urheilupuisto_metro_station_entrance_%28January_2019%2C_2%29.jpg/960px-Urheilupuisto_metro_station_entrance_%28January_2019%2C_2%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Urheilupuisto_metro_station_entrance_(January_2019,_2).jpg",
    },
  },
  { id: "niittykumpu",   nimi: "Niittykumpu",     linjat: "M1", lat: 60.1703645, lon: 24.7630169,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Niittykumpu_metro_station_%28March_2019%29.jpg/960px-Niittykumpu_metro_station_%28March_2019%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Niittykumpu_metro_station_(March_2019).jpg",
    },
  },
  { id: "matinkyla",     nimi: "Matinkylä",       linjat: "M1", lat: 60.15968,   lon: 24.7391256,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Matinkyl%C3%A4_metro_station_%28Nov_2017%29.jpg/960px-Matinkyl%C3%A4_metro_station_%28Nov_2017%29.jpg",
      kuvaaja: "Markus Säynevirta",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Matinkyl%C3%A4_metro_station_(Nov_2017).jpg",
    },
  },
  { id: "finnoo",        nimi: "Finnoo",          linjat: "M1", lat: 60.1530493, lon: 24.7118863,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Finnoo_metro_station.jpg/960px-Finnoo_metro_station.jpg",
      kuvaaja: "JIP",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Finnoo_metro_station.jpg",
    },
  },
  { id: "kaitaa", nimi: "Kaitaa", linjat: "M1", lat: 60.149417, lon: 24.690469,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Kaitaa_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February.jpg/960px-Kaitaa_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      kuvaaja: "Pete",
      lisenssi: "CC BY 2.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by/2.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Kaitaa_metro_station_platform_in_Espoo,_Finland,_2023_February.jpg",
    },
  },
  { id: "soukka", nimi: "Soukka", linjat: "M1", lat: 60.141465, lon: 24.6706182,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Soukka_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February_01.jpg/960px-Soukka_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      kuvaaja: "Pete",
      lisenssi: "CC BY 2.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by/2.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Soukka_metro_station_platform_in_Espoo,_Finland,_2023_February_01.jpg",
    },
  },
  { id: "espoonlahti", nimi: "Espoonlahti", linjat: "M1", lat: 60.149251, lon: 24.654998,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Espoonlahti_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February.jpg/960px-Espoonlahti_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      kuvaaja: "Pete",
      lisenssi: "CC BY 2.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by/2.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Espoonlahti_metro_station_platform_in_Espoo,_Finland,_2023_February.jpg",
    },
  },
  { id: "kivenlahti", nimi: "Kivenlahti", linjat: "M1", lat: 60.155437, lon: 24.636392,
    kuva: {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Kivenlahti_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February.jpg/960px-Kivenlahti_metro_station_platform_in_Espoo%2C_Finland%2C_2023_February.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      kuvaaja: "Pete",
      lisenssi: "CC BY 2.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by/2.0",
      lahde: "https://commons.wikimedia.org/wiki/File:Kivenlahti_metro_station_platform_in_Espoo,_Finland,_2023_February.jpg",
    },
  },
];

// Baarit. "asema" viittaa yllä olevan aseman id:hen.
const BAARIT = [
  // --- Lauttasaari ---
  {
    id: "bar-pikku-katti",
    nimi: "Bar Pikku Katti",
    asema: "lauttasaari",
    osoite: "Lauttasaarentie 32, Helsinki",
    placeId: "ChIJP4vMRl0KkkYRUucIlJ_B254",
    lat: 60.160164, lon: 24.8798842,
    kuvaus: "Lähiöpubi Lauttasaarentien varrella, aivan metroaseman vieressä. Tapahtumia ympäri vuoden: livemusiikkia, Halloween-juhlia ja jopa talvigrillausta.",
    kuvausEn: "Neighbourhood pub on Lauttasaarentie, right next to the metro station. Events all year round: live music, Halloween parties and even winter barbecues.",
    tagit: ["livemusiikki"],
    tarkistettu: true,
  },
  {
    id: "sidewalk",
    nimi: "Sidewalk",
    asema: "lauttasaari",
    osoite: "Lauttasaarentie 25, Helsinki",
    placeId: "ChIJ8-HRLV0KkkYRaFWWVG2eY1Y",
    lat: 60.1605559, lon: 24.8826412,
    kuvaus: "Industrial-tyylinen baari Lauttasaaren pääkadulla, sisustuksessa vaikutteita Brooklynistä. Järjestää mm. murhamysteeri-iltoja.",
    kuvausEn: "Industrial-style bar on Lauttasaari's main street with a Brooklyn-inspired interior. Hosts murder mystery nights, among other events.",
    tagit: ["pelit"],
    tarkistettu: true,
  },
  {
    id: "kaunis-kampela",
    nimi: "Kaunis Kampela",
    asema: "lauttasaari",
    osoite: "Lauttasaarentie 10, Helsinki",
    placeId: "ChIJb3mdXEMKkkYRz80ThhqjtgE",
    lat: 60.1609564, lon: 24.8889178,
    kuvaus: "Rento olutravintola, jossa on noin 15 hanaa oluita ja siidereitä sekä pullo-oluita eri puolilta maailmaa. Järjestää myös maistatuksia.",
    kuvausEn: "Laid-back beer bar with around 15 taps of beers and ciders, plus bottled beers from around the world. Also hosts tastings.",
    tagit: ["craft beer"],
    tarkistettu: true,
    piilohelmi: "Saaren oma olohuone: laaja olutvalikoima kaukana keskustan hälinästä.",
    piilohelmiEn: "The island's own living room: a wide beer selection far from the city-centre buzz.",
  },
  {
    id: "bar-52",
    nimi: "BAR 52",
    asema: "lauttasaari",
    osoite: "Heikkiläntie 2, Helsinki",
    placeId: "ChIJvQZpvV4KkkYRTxHpyYZl9QU",
    lat: 60.154282, lon: 24.8799224,
    kuvaus: "Musiikki- ja lounasravintola Lauttasaaren eteläosassa. Listalla mm. burgereita, gambas pil pil -katkarapuja ja simpukoita.",
    kuvausEn: "Music and lunch restaurant in southern Lauttasaari. The menu includes burgers, gambas pil pil and mussels.",
    tagit: ["ruokaa", "livemusiikki"],
    tarkistettu: true,
  },

  // --- Koivusaari ---
  // Ei baareja: saarella on lähinnä toimistoja ja rakennustyömaita.

  // --- Keilaniemi ---
  // Ei baareja. Lola Terrace & Minigolf on Googlen mukaan tilapäisesti suljettu.

  // --- Aalto-yliopisto (Otaniemi) ---
  {
    id: "fat-lizard-otaniemi",
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
    id: "masis-brewery-taproom",
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
    id: "kipsari",
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
    id: "bar-otapas",
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
    id: "taproom-d20",
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
    id: "vesiheina",
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
    id: "bistro-ranta",
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

  {
    id: "fat-lizard-taproom",
    nimi: "Fat Lizard Taproom",
    asema: "aalto",
    osoite: "Betonimiehenkuja 8, Espoo",
    placeId: "ChIJpc5eKXn2jUYRfZWfNbaaXOE",
    lat: 60.1816226, lon: 24.8300552,
    kuvaus: "Fat Lizard -panimon oma taproom panimon kyljessä. Talon vahvempia oluita, keikkoja ja stand upia, kesällä biergarten-terassi. Auki keskiviikosta lauantaihin.",
    kuvausEn: "Fat Lizard brewery's own taproom next to the brewery. Stronger house beers, gigs and stand-up, and a beer-garden terrace in summer. Open Wednesday to Saturday.",
    tagit: ["craft beer", "terassi", "livemusiikki"],
    tarkistettu: true,
    piilohelmi: "Panimon oma taproom teollisuuskorttelissa – keikkoja ja kesäinen biergarten.",
    piilohelmiEn: "A brewery's own taproom tucked away in an industrial block – gigs and a summer beer garden.",
  },

  // --- Tapiola ---
  {
    id: "gallows-bird-tapiola",
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
    id: "watson-pub-tapiola",
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
  // Garden City Cafe (Kauppamiehentie 1, placeId ChIJ_X4r-Jf1jUYRfh9_4h_2Lc0) jätetty
  // pois 27.11.2026: Facebookista ei selviä, onko säännöllisesti auki. Käy paikan päällä.
  {
    id: "oravanhanta",
    nimi: "Oravanhäntä",
    asema: "tapiola",
    osoite: "Oravannahkatori 3, Espoo",
    placeId: "ChIJ_TWEBqP1jUYRIoFQkG7F1PQ",
    lat: 60.176015, lon: 24.793482,
    kuvaus: "Lähiöpubi Itätuulessa, hieman sivussa Tapiolan keskustasta. Samoissa tiloissa toimii Smokin' Squirrel -BBQ-ravintola. Livemusiikkia ja kattoterassi. Talvikaudella kiinni sunnuntaisin ja maanantaisin.",
    kuvausEn: "Neighbourhood pub in Itätuuli, a short walk from central Tapiola. Shares its premises with the Smokin' Squirrel BBQ restaurant. Live music and a rooftop terrace. Closed on Sundays and Mondays in the winter season.",
    tagit: ["livemusiikki", "terassi", "ruokaa"],
    tarkistettu: true,
  },

  // --- Urheilupuisto ---
  {
    id: "tauko-baari",
    nimi: "Tauko Baari",
    asema: "urheilupuisto",
    osoite: "Jousenpuistonkatu 2, Espoo",
    placeId: "ChIJ--zIabb1jUYRnkRWPad-geI",
    lat: 60.174355, lon: 24.780386,
    kuvaus: "Lähiöpubi aivan Urheilupuiston metroaseman vieressä. Otteluita näytetään televisiosta, vaikka paikka ei ole sisustettu urheilubaariksi.",
    kuvausEn: "Neighbourhood pub right next to Urheilupuisto metro station. Matches are shown on TV, although the place isn't decked out as a sports bar.",
    tagit: ["urheilu"],
    tarkistettu: true,
  },

  // --- Niittykumpu ---
  {
    id: "bodom-bar-sauna",
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
    id: "freja-rooftop",
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
    id: "o-learys-iso-omena",
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
    id: "mega-bistro-night-club",
    nimi: "Mega Bistro & Night Club",
    asema: "matinkyla",
    osoite: "Piispansilta 11, Espoo",
    placeId: "ChIJtZGPKwD1jUYRaXa5BtYxCG8",
    lat: 60.159764, lon: 24.7383,
    kuvaus: "Viihdekeskus Iso Omenan kupeessa: päivällä lounasbuffet, illalla sportsbar, karaoke, biljardi, darts ja yökerho. Auki joka päivä aamusta pikkutunneille.",
    kuvausEn: "Entertainment venue next to Iso Omena: lunch buffet by day, then sports bar, karaoke, pool, darts and a nightclub. Open every day from morning until the small hours.",
    tagit: ["yökerho", "karaoke", "urheilu", "ruokaa", "myöhään auki"],
    tarkistettu: true,
  },

  // --- Finnoo ---
  // Ei vielä yhtään baaria. Alue rakentuu vielä 2030-luvulle asti.

  // --- Kaitaa ---
  // Ei baareja. Metro Bar (Iivisniemenkatu 3, placeId ChIJFWOjXM_0jUYR9i_ZxEeKO9w)
  // jätetty pois 27.11.2026: Facebookia päivitetty viimeksi 2020.

  // --- Soukka ---
  {
    id: "bestis-karaoke-nightlife",
    nimi: "Bestis Karaoke & Nightlife",
    asema: "soukka",
    osoite: "Yläkartanontie 28, Espoo",
    placeId: "ChIJcVnBCI31jUYRWrBrak0yptw",
    lat: 60.1417076, lon: 24.6690364,
    kuvaus: "Karaokebaari Soukan metroaseman vieressä. Karaokea joka päivä, auki aamuyöhön, laaja juomavalikoima. Isot ottelut näytetään valkokankaalta.",
    kuvausEn: "Karaoke bar next to Soukka metro station. Karaoke every day, open until the early hours, with a wide drinks selection. Big matches are shown on a projector screen.",
    tagit: ["karaoke", "myöhään auki", "urheilu"],
    tarkistettu: true,
  },
  {
    id: "public-house-wilperi",
    nimi: "Public House Wilperi",
    asema: "soukka",
    osoite: "Yläkartanontie 28, Espoo",
    placeId: "ChIJs_UEUrX0jUYRYvg1__UEaec",
    lat: 60.1417076, lon: 24.6690364,
    kuvaus: "Lähiöbaari Soukan metroaseman vieressä, samassa rakennuksessa Bestiksen kanssa.",
    kuvausEn: "Neighbourhood bar next to Soukka metro station, in the same building as Bestis.",
    tagit: [],
    tarkistettu: true,
  },
  {
    id: "mona-lisa-bar-lounge-club",
    nimi: "Mona Lisa Bar & Lounge Club",
    asema: "soukka",
    osoite: "Yläkaupinkuja 2, Espoo",
    placeId: "ChIJP5nugAgJkkYRuulN6TUFhlk",
    lat: 60.1424621, lon: 24.6688311,
    kuvaus: "Baari ja lounge Soukassa, parin minuutin päässä metrosta. DJ-musiikkia ja isot ottelut kisastudiossa.",
    kuvausEn: "Bar and lounge in Soukka, a couple of minutes from the metro. DJ music, and big matches shown in its sports corner.",
    tagit: ["urheilu"],
    tarkistettu: true,
  },

  // --- Espoonlahti ---
  {
    id: "satama-beerhouse",
    nimi: "Satama Beerhouse",
    asema: "espoonlahti",
    osoite: "Espoonlahdenkatu 8 (Lippulaiva), Espoo",
    placeId: "ChIJ5UucCN71jUYRG-YLuRKlP7Y",
    lat: 60.148933, lon: 24.6554783,
    kuvaus: "Helsingin Satama Bar & Bistro -ravintoloiden Espoon toimipaikka Lippulaivassa, avattu 2026. Ketjun ohjelmassa on mm. stand up-, peli- ja karaokeiltoja sekä livemusiikkia.",
    kuvausEn: "The Espoo branch of Helsinki's Satama Bar & Bistro restaurants, opened in Lippulaiva in 2026. The chain's programme includes stand-up, game and karaoke nights and live music.",
    tagit: ["ruokaa", "livemusiikki", "karaoke"],
    tarkistettu: true,
  },
  {
    id: "bar-casanova",
    nimi: "Bar Casanova",
    asema: "espoonlahti",
    osoite: "Maininkitie 7, Espoo",
    placeId: "ChIJsxcQBaz0jUYRkpAY8bW0d8o",
    lat: 60.1517215, lon: 24.6469654,
    kuvaus: "Seurusteluravintola ja yökerho Espoonlahdessa. Sama yritys on pyörittänyt paikkaa 1990-luvulta asti, ja ovet ovat auki myöhään.",
    kuvausEn: "Bar and nightclub in Espoonlahti, run by the same company since the 1990s and open late.",
    tagit: ["yökerho", "myöhään auki"],
    tarkistettu: true,
  },

  // --- Kivenlahti ---
  {
    id: "vaappuva-ankka-kivenlahti",
    nimi: "Vaappuva Ankka Kivenlahti",
    asema: "kivenlahti",
    osoite: "Merivalkama 2, Espoo",
    placeId: "ChIJ791tsPLzjUYRD8udRN-s1Wo",
    lat: 60.1545446, lon: 24.6352635,
    kuvaus: "Kivenlahtelaisen viski- ja olutharrastajan perustaman neljän baarin ketjun ravintola aivan metroaseman vieressä. Laaja, vaihtuva valikoima pienpanimo-oluita ja viskejä.",
    kuvausEn: "Part of a four-bar chain founded by a Kivenlahti-born whisky and beer enthusiast, right next to the metro station. A wide, changing selection of craft beers and whiskies.",
    tagit: ["craft beer", "viski"],
    tarkistettu: true,
  },
  {
    id: "pub-nousuvesi",
    nimi: "Pub Nousuvesi",
    asema: "kivenlahti",
    osoite: "Merenkäynti 3, Espoo",
    placeId: "ChIJydF6-VXzjUYRuft87ICEI8w",
    lat: 60.1537623, lon: 24.6352215,
    kuvaus: "Lähiöbaari Kivenlahden keskustassa, muutaman minuutin päässä metrosta. Livemusiikkia ja tapahtumia, kuten Halloween-juhlia.",
    kuvausEn: "Neighbourhood bar in central Kivenlahti, a few minutes from the metro. Live music and events such as Halloween parties.",
    tagit: ["livemusiikki"],
    tarkistettu: true,
  },
  {
    id: "tyrsky-pub",
    nimi: "Tyrsky Pub",
    asema: "kivenlahti",
    osoite: "Merenkäynti, Espoo",
    placeId: "ChIJAdwu-lXzjUYR9Slt41u3rjQ",
    lat: 60.1539116, lon: 24.6350899,
    kuvaus: "Lähiöpubi Kivenlahden keskustassa. Ohjelmassa mm. bingoa, DJ-iltoja, Euroviisujen katsomista ja Halloween-juhlia, ja pöydistä löytyy lauta- ja korttipelejä.",
    kuvausEn: "Neighbourhood pub in central Kivenlahti. The programme includes bingo, DJ nights, Eurovision viewing and Halloween parties, plus board and card games on the tables.",
    tagit: ["lautapelit"],
    tarkistettu: true,
  },
  {
    id: "se-toinen-vesi",
    nimi: "Se Toinen Vesi",
    asema: "kivenlahti",
    osoite: "Merenkäynti, Espoo",
    placeId: "ChIJaZ17-lXzjUYRKsEGWhbKmxo",
    lat: 60.1538191, lon: 24.6349309,
    kuvaus: "Lähiöbaari Kivenlahden keskustassa, samassa korttelissa Nousuveden ja Tyrskyn kanssa. DJ-musiikkia, karaokea ja bingoa.",
    kuvausEn: "Neighbourhood bar in central Kivenlahti, on the same block as Nousuvesi and Tyrsky. DJ music, karaoke and bingo.",
    tagit: ["karaoke"],
    tarkistettu: true,
  },
  // Messi Pub (Ristiaallokonkatu 4 G, placeId ChIJJfplcKn0jUYRnT15WSKquhE) jätetty
  // pois 27.11.2026: tietoa ei löydy netistä. Voidaan lisätä, jos käydään paikan päällä.
];
