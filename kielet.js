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
    aukiAsti: "Auki {n} asti",
    aukiNyt: "Auki nyt",
    suljettuAukeaa: "Suljettu · aukeaa {n}",
    suljettu: "Suljettu",
    huomenna: "huomenna",
    // Putkigeneraattori (putki.js)
    naviPutki: "🚇 Pistetään putki päälle",
    naviKaikki: "📍 Kaikki mestat",
    putkiMitaEtsit: "Mitä etsit? Riittää, että baarissa on yksi valituista.",
    putkiLaskuri: "{n} baaria sopii valintoihisi.",
    putkiLaskuriVahan: "Valintoihisi sopii vain {n} baaria, joten putkesta tulee lyhyempi.",
    putkiLaskuriNolla: "Yksikään baari ei sovi näihin valintoihin. Poista jokin valinta.",
    putkiYllata: "🎲 Yllätä minut",
    putkiMaara: "Montako baaria?",
    putkiAlku: "Mistä lähdetään?",
    putkiMistaTahansa: "Mistä tahansa",
    putkiPaalle: "Putki päälle! 🚇",
    putkiOtsikko: "Sinun putkesi",
    putkiBaareja: "{n} baaria",
    putkiVahemman: "Näillä valinnoilla löytyi vain {n} baaria. Kokeile väljempiä valintoja, jos haluat pidemmän putken.",
    putkiEiOsumia: "Näillä valinnoilla ei löytynyt yhtään baaria. Kokeile väljempiä valintoja.",
    putkiSamaAsema: "🚶 Samalla asemalla, kävellen",
    putkiMetrolla1: "🚇 Metrolla 1 asema →",
    putkiMetrolla: "🚇 Metrolla {n} asemaa →",
    putkiUusi: "🎲 Arvo uusi putki",
    putkiJaa: "📤 Jaa putki",
    putkiKopioitu: "✅ Linkki kopioitu",
    putkiMuokkaa: "✏️ Muokkaa valintoja",
    putkiVesi: "💧 Vinkki: lasi vettä jokaisella pysäkillä pitää putken puhtaana.",
    putkiKotiin: "🏠 Kotimatka: tarkista viimeiset metrot ja yöbussit",
    putkiReittiopas: "HSL:n Reittioppaasta →",
    putkiTuki: `
      <h3>Jäikö putki päälle?</h3>
      <p>Jos oma tai läheisen juominen alkaa huolettaa, apua saa nimettömästi ja maksutta.</p>
      <ul>
        <li><a href="https://ehyt.fi/paihde-peli-info/paihdeneuvonta/" target="_blank" rel="noopener">Päihdeneuvonta</a>:
          soita <a href="tel:080090045">0800 900 45</a> (maksuton, ympäri vuorokauden)</li>
        <li><a href="https://paihdelinkki.fi/testit-ja-laskurit/alkoholi/" target="_blank" rel="noopener">Päihdelinkki</a>:
          testaa oma alkoholinkäyttösi, chat ja neuvontapalvelu</li>
        <li>Hätätilanteessa soita 112.</li>
      </ul>`,
    alatunniste: `
      <p>Kävelyajat ovat arvioita linnuntien perusteella.
        Baarien arvosanat, kuvat ja aukioloajat: Google Maps.</p>
      <p>💎 Piilohelmi = itsenäinen paikka, jossa on jotain erikoista ja joka ei
        ole ensimmäisenä silmien edessä.</p>
      <p>Sijaintitiedot ja kartat: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-tekijät</a>.
        Asemakuvat: <a href="https://commons.wikimedia.org">Wikimedia Commons</a>, kuvaajat mainittu kuvien alla.</p>
      <p>Jäikö putki päälle? Maksutonta ja nimetöntä apua:
        <a href="https://ehyt.fi/paihde-peli-info/paihdeneuvonta/">Päihdeneuvonta</a>, puh. 0800 900 45.</p>`,
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
    aukiAsti: "Open until {n}",
    aukiNyt: "Open now",
    suljettuAukeaa: "Closed · opens {n}",
    suljettu: "Closed",
    huomenna: "tomorrow",
    // Tube crawl generator (putki.js)
    naviPutki: "🚇 Start my tube crawl",
    naviKaikki: "📍 All the spots",
    putkiMitaEtsit: "What are you looking for? A bar only needs one of your picks.",
    putkiLaskuri: "{n} bars match your choices.",
    putkiLaskuriVahan: "Only {n} bars match your choices, so your crawl will be shorter.",
    putkiLaskuriNolla: "No bars match these choices. Remove one of them.",
    putkiYllata: "🎲 Surprise me",
    putkiMaara: "How many bars?",
    putkiAlku: "Where do we start?",
    putkiMistaTahansa: "Anywhere",
    putkiPaalle: "All aboard! 🚇",
    putkiOtsikko: "Your tube crawl",
    putkiBaareja: "{n} bars",
    putkiVahemman: "Only {n} bars matched these choices. Loosen them up for a longer crawl.",
    putkiEiOsumia: "No bars matched these choices. Try loosening them up.",
    putkiSamaAsema: "🚶 Same station, on foot",
    putkiMetrolla1: "🚇 Metro, 1 stop →",
    putkiMetrolla: "🚇 Metro, {n} stops →",
    putkiUusi: "🎲 Shuffle again",
    putkiJaa: "📤 Share crawl",
    putkiKopioitu: "✅ Link copied",
    putkiMuokkaa: "✏️ Change choices",
    putkiVesi: "💧 Tip: a glass of water at every stop keeps the tube running smoothly.",
    putkiKotiin: "🏠 Getting home: check the last metros and night buses in",
    putkiReittiopas: "the HSL Journey Planner →",
    putkiTuki: `
      <h3>Missed your stop?</h3>
      <p>If your own or someone else's drinking is starting to worry you, help is free and anonymous.</p>
      <ul>
        <li><a href="https://paihdelinkki.fi/en/tests-and-counters/" target="_blank" rel="noopener">AddictionLink</a>:
          test your drinking (AUDIT) in English</li>
        <li><a href="https://ehyt.fi/paihde-peli-info/paihdeneuvonta/" target="_blank" rel="noopener">Substance abuse helpline</a>:
          call <a href="tel:080090045">0800 900 45</a> (free, 24/7, website in Finnish)</li>
        <li>In an emergency, call 112.</li>
      </ul>`,
    alatunniste: `
      <p>Walking times are estimates based on straight-line distance.
        Bar ratings, photos and opening hours: Google Maps.</p>
      <p>💎 Hidden gem = an independent place with something special that
        isn't the first thing you see.</p>
      <p>Locations and maps: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>.
        Station photos: <a href="https://commons.wikimedia.org">Wikimedia Commons</a>, photographers credited below each photo.</p>
      <p>Missed your stop? Free, anonymous help:
        <a href="https://paihdelinkki.fi/en/tests-and-counters/">AddictionLink</a> · helpline 0800 900 45.</p>`,
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
