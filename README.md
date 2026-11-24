# Hukkaputki

Lähiöbaarit Helsingin metron varrella. Selaimessa toimiva sivu puhelimelle ja
tietokoneelle.

**Versio 1:** kuusi asemaa Aalto-yliopistolta länteen (Aalto-yliopisto,
Tapiola, Urheilupuisto, Niittykumpu, Matinkylä, Finnoo – Finnoossa ei vielä
baareja). Baarikorteissa arvioitu kävelyaika,
tagisuodattimet sekä linkit Google Mapsiin (arvosanat ja kuvat) ja
kävelyreittiin.

## Tiedostot
- `index.html` – sivun rakenne
- `style.css` – ulkoasu (mobiili ensin, leveämmällä näytöllä kaksi saraketta)
- `data.js` – **asemat ja baarit.** Tätä muokkaamalla lisäät paikkoja.
- `app.js` – piirtää listan, laskee kävelyajat ja hoitaa suodattimet
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
- Asemakuvat: Wikimedia Commons (CC BY-SA 4.0). Kuvaaja ja lisenssi näkyvät
  kuvan alla, osoitteet `data.js`:n `kuva`-kentässä.
- Kartat: Leaflet-kirjasto ja OpenStreetMapin karttapohja (ilmainen,
  lähde mainittava). Oranssi pallo = asema, tumma = baari, turkoosi = piilohelmi.
- 💎 Piilohelmet: `data.js`:n kenttä `piilohelmi` (lyhyt perustelu).
  Kriteerit on kirjattu `data.js`:n alkuun. Sivulla on oma suodatin helmille.
- Kävelyaika = linnuntie × 1,3 / 80 m/min. Se on arvio, ei reititys.
