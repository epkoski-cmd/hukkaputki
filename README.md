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
- `SUUNNITELMA.md` – kilpailijaselvitys, datalähteet ja jatkokehitysideat
- `CLAUDE.md` – ohjeet Claudelle
- `.claude/launch.json` – Clauden esikatselun asetus

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
- Kävelyaika = linnuntie × 1,3 / 80 m/min. Se on arvio, ei reititys.
