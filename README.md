## Om
Detta repository innehåller koden för Region Hallands Design guildelines.

## Installation
Ta först hem reposet lokalt, gör sedan följande i Terminalen:

### Installera Fractal
Fractal är det ramverk som vår dokumentation bygger på.

1. `npm install --save @frctl/fractal`
2. `npm i -g @frctl/fractal`

De två stegen ovan installerar Fractal och dess CLI verktyg

### Kör lokalt

1. `cd site`
2. `fractal start --synk`
3. Besök den URL som terminalen ger dig, troligtvis http://localhost:3000

### Bygg en dist

För att exportera ut Fractal till statiska filer som vi kan köra upp på http://design.regionhalland.se så behöver vi bygga en dist. Detta göra du genom att skriva `fractal build`när du står i `/site`. Det i sin tur kommer att generera statiska HTML filer till `/site/build`som vi sedan kan lägga på vår server.
