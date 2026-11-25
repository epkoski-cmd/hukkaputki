// Hukkaputki – kieliversiot
// Kaikki sivun kiinteät tekstit suomeksi (fi) ja englanniksi (en).
// Uuden kielen (esim. ruotsi, "sv") voi lisätä kopioimalla "en"-osion
// ja kääntämällä sen. Lisää kieli myös KIELET-listaan.
//
// Tekstit, joissa on {n}, saavat luvun paikalleen sivulla
// (esim. "noin {n} min" → "noin 5 min").

const KIELET = ["fi", "en"];

const TEKSTIT = {
  fi: {
    sivunOtsikko: "Hukkaputki – lähiöbaarit metron varrella",
    iskulause: "Lähiöbaarit metron varrella. Jää pois, kävele hetki, löydä jotain uutta.",
    mitaEtsit: "Mitä etsit?",
    piilohelmet: "💎 Piilohelmet",
    piilohelmi: "💎 Piilohelmi",
    miksiHelmi: "Miksi helmi:",
    kavely: "🚶 noin {n} min asemalta",
    kavelyKartalla: "noin {n} min kävelyä",
    metroasema: "metroasema",
    asemakuvaAlt: "Metroasema: {n}",
    kuva: "Kuva:",
    kuvaPaikastaAlt: "Kuva paikasta {n}",
    tuntematon: "tuntematon",
    arvioita: "({n} arviota Google Mapsissa)",
    tarkistamaton: "Tietoja ei ole vielä tarkistettu. Katso ajantasainen tilanne Google Mapsista.",
    avaaMapsissa: "Avaa Google Mapsissa →",
    kavelyreitti: "Kävelyreitti",
    eiOsumia: "Ei osumia näillä suodattimilla.",
    eiBaareja: "Ei vielä baareja listalla.",
    alatunniste: `
      <p>Kävelyajat ovat arvioita linnuntien perusteella.
        Baarien arvosanat ja kuvat: Google Maps. Aukioloajat löydät Google Mapsista.</p>
      <p>💎 Piilohelmi = itsenäinen paikka, jossa on jotain erikoista ja joka ei
        ole ensimmäisenä silmien edessä.</p>
      <p>Sijaintitiedot ja kartat: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-tekijät</a>.
        Asemakuvat: <a href="https://commons.wikimedia.org">Wikimedia Commons</a>, kuvaajat mainittu kuvien alla.</p>`,
  },

  en: {
    sivunOtsikko: "Hukkaputki – neighbourhood bars along the metro",
    iskulause: "Neighbourhood bars along the metro. Hop off, walk a bit, find something new.",
    mitaEtsit: "What are you looking for?",
    piilohelmet: "💎 Hidden gems",
    piilohelmi: "💎 Hidden gem",
    miksiHelmi: "Why it's a gem:",
    kavely: "🚶 about {n} min from the station",
    kavelyKartalla: "about {n} min walk",
    metroasema: "metro station",
    asemakuvaAlt: "Metro station: {n}",
    kuva: "Photo:",
    kuvaPaikastaAlt: "Photo of {n}",
    tuntematon: "unknown",
    arvioita: "({n} reviews on Google Maps)",
    tarkistamaton: "Details not verified yet. Check Google Maps for up-to-date info.",
    avaaMapsissa: "Open in Google Maps →",
    kavelyreitti: "Walking route",
    eiOsumia: "No matches with these filters.",
    eiBaareja: "No bars listed yet.",
    alatunniste: `
      <p>Walking times are estimates based on straight-line distance.
        Bar ratings and photos: Google Maps. Check opening hours on Google Maps.</p>
      <p>💎 Hidden gem = an independent place with something special that
        isn't the first thing you see.</p>
      <p>Locations and maps: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>.
        Station photos: <a href="https://commons.wikimedia.org">Wikimedia Commons</a>, photographers credited below each photo.</p>`,
  },
};

// Tagit kirjoitetaan data.js:ssä suomeksi. Tässä niiden englanninkieliset
// vastineet. Jos tagi puuttuu tästä, se näytetään suomeksi.
const TAGIT_EN = {
  "craft beer": "craft beer",
  "drinkit": "cocktails",
  "karaoke": "karaoke",
  "lautapelit": "board games",
  "livemusiikki": "live music",
  "myöhään auki": "open late",
  "opiskelijameininki": "student vibe",
  "pelit": "games",
  "ruokaa": "food",
  "sauna": "sauna",
  "terassi": "terrace",
  "urheilu": "sports",
  "vegaani": "vegan",
  "viinit": "wine",
  "viski": "whisky",
  "yökerho": "nightclub",
};
