#!/bin/sh
# Tekee SVG-kuvista PNG-versiot Chromen avulla.
# WhatsApp ja muut somepalvelut eivät näytä SVG-kuvia, joten jakokuva
# tarvitaan PNG:nä. Aja projektikansiosta:  sh kuvat/tee-png.sh
set -e
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

tee_png() {  # tee_png lähde.svg kohde.png leveys korkeus
  printf '<html><meta charset="utf-8"><style>body{margin:0;background:#faf8f5}svg{display:block;width:100vw;height:100vh}</style><body>%s</body></html>' "$(cat "$1")" > .tmp.html
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --window-size="$3,$4" --screenshot="$PWD/$2" "file://$PWD/.tmp.html" 2>/dev/null
  rm .tmp.html
}

tee_png jakokuva.svg jakokuva.png 1200 630

# Chrome ei piirrä alle ~500 px ikkunaa oikein, joten ikoni tehdään
# ensin isona ja pienennetään macOS:n sips-työkalulla.
tee_png favicon.svg apple-touch-icon.png 600 600
sips -Z 180 apple-touch-icon.png >/dev/null
