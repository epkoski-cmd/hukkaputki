# Hukkaputki

Lähiöbaarit Helsingin metron varrella. Selaimessa toimiva sivu puhelimelle ja
tietokoneelle.

**Länsimetro:** 13 asemaa Lauttasaaresta Kivenlahteen ja 25 baaria
(Koivusaaressa, Keilaniemessä, Finnoossa ja Kaitaalla ei vielä baareja). Baarikorteissa arvioitu kävelyaika,
tagisuodattimet, Googlen arvosana, kuva ja aukiolotieto ("Auki klo 2 asti" /
"Suljettu · aukeaa ke klo 16") sekä linkit Google Mapsiin ja kävelyreittiin.
Jos Googlella ei ole paikan aukioloaikoja, tietoa ei näytetä.

**Putkigeneraattori** ("Pistetään putki päälle" / "Start my tube crawl"):
arpoo 2–5 baarin reitin metrolinjaa yhteen suuntaan, valittavissa
aloitusasema ja tagit. Generaattorissa baarille riittää yksi valituista
tageista, ja siinä näytetään vain tagit, joilla on vähintään 2 baaria;
valintojen alla näkyy heti, montako baaria sopii. Listan suodattimissa
vaaditaan kaikki valitut tagit, ja nollaan johtavat napit harmaantuvat.
Ylhäällä navigaatio: "Pistetään putki päälle" ja "Kaikki mestat". Logo vie etusivulle. "🎲 Yllätä minut" arpoo 3 baaria ilman valintoja.
Reitin voi jakaa linkkinä (`?putki=baari-id,baari-id,…`). Tuloksen lopussa
kotimatkalinkki HSL:n Reittioppaaseen ja "Jäikö putki päälle?" -tukilinkit.
Baarien `id`:tä ei saa muuttaa, ettei jo jaetut linkit rikkoudu.

**Kielet:** suomi ja englanti (FI | EN -nappi). Oletuskieli tulee selaimen
kielestä, valinta muistetaan, ja englanninkielisen version voi jakaa
osoitteella `…/hukkaputki/?lang=en`. Uutta baaria lisätessä kirjoita myös
`kuvausEn` (ja `piilohelmiEn`); uudet tagit lisätään `kielet.js`:n
`TAGIT_EN`-listaan.

## Tiedostot
- `index.html` – sivun rakenne
- `style.css` – ulkoasu (mobiili ensin, leveämmällä näytöllä kaksi saraketta)
- `data.js` – **asemat ja baarit.** Tätä muokkaamalla lisäät paikkoja.
- `kielet.js` – sivun tekstit suomeksi ja englanniksi sekä tagien käännökset
- `app.js` – piirtää listan, laskee kävelyajat ja hoitaa suodattimet ja kielen
- `putki.js` – putkigeneraattori: valinnat, arvonta, tulos ja jakolinkki
- `kuvat/` – jakokuva (`jakokuva.svg` → `.png`) ja ikonit (`favicon.svg`,
  `apple-touch-icon.png`). Muokkaa SVG:tä ja aja `sh kuvat/tee-png.sh`,
  niin PNG:t päivittyvät (vaatii Chromen).
- `SUUNNITELMA.md` – kilpailijaselvitys ja jatkokehitysideat (vain paikallisesti,
  ei gitissä – ks. `.gitignore`)
- `CLAUDE.md` – ohjeet Claudelle
- `.claude/launch.json` – Clauden esikatselun asetus

## Julkaisu
- Sivu: https://epkoski-cmd.github.io/hukkaputki/ (GitHub Pages, `main`-haara).
  Jokainen push mainiin päivittää sivun noin minuutissa.
- Kun muutat `style.css`-, `data.js`-, `kielet.js`-, `app.js`- tai `putki.js`-tiedostoa,
  kasvata `index.html`:ssä niiden perässä olevaa versionumeroa (`?v=2` → `?v=3`).
  Muuten selain voi käyttää vanhaa tiedostoa välimuistista (GitHub Pages
  pitää tiedostoja välimuistissa 10 minuuttia).
- Kävijätilasto: https://hukkaputki.goatcounter.com (GoatCounter, ei evästeitä)

## Näin katsot sivua omalla koneella
Avaa pääte projektikansiossa ja aja:

```bash
python3 -m http.server 8000
```

Mene sitten selaimella osoitteeseen http://localhost:8000.

## Data
- Sijainnit: © OpenStreetMap-tekijät
- Kuvaukset: paikkojen omat sivut sekä kampus- ja matkailusivut.
  Jos paikasta ei löytynyt tietoa, `data.js`:ssä on `tarkistettu: false`
  ja kortissa näkyy huomautus.
- Asemakuvat: Wikimedia Commons (CC BY-SA 4.0 tai CC BY 2.0). Kuvaaja ja lisenssi näkyvät
  kuvan alla, osoitteet `data.js`:n `kuva`-kentässä.
- Kartat: Leaflet-kirjasto ja OpenStreetMapin karttapohja (ilmainen,
  lähde mainittava). Oranssi pallo = asema, tumma = baari, turkoosi = piilohelmi.
- 💎 Piilohelmet: `data.js`:n kenttä `piilohelmi` (lyhyt perustelu).
  Kriteerit on kirjattu `data.js`:n alkuun. Sivulla on oma suodatin helmille.
- Arvosanat ja kuvat: Google Places API (New). `data.js`:ssä on jokaiselle
  baarille vain `placeId`; sivu hakee arvosanan ja kuvan Googlelta vasta,
  kun kortti tulee näkyviin (säästää maksullisia hakuja). Googlen ehtojen
  mukaan niitä ei saa tallentaa omiin tiedostoihin eikä näyttää muun kuin
  Googlen kartan päällä. API-avain on `app.js`:n alussa ja rajattu Google
  Cloudissa osoitteisiin `epkoski-cmd.github.io` ja `localhost:8000` sekä
  pelkkään Places API:in. Uuden baarin `placeId`:n löydät Googlen
  [Place ID Finderilla](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
- Kävelyaika = linnuntie × 1,3 / 80 m/min. Se on arvio, ei reititys.
