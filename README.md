[![Netlify Status](https://api.netlify.com/api/v1/badges/172c7c5c-51d4-4224-8f8c-42bcdddf352b/deploy-status)](https://app.netlify.com/sites/regionhalland-design/deploys)

# Om Region Hallands design guidelines
Detta repository innehåller koden för Region Hallands Design guildelines.

## Bidra gärna!
Vill du bidra till att bygga upp den här sajten? Hurra för det! Följ installationsguiden nedan för att få igång en lokal version av sajten och skicka sedan in en [pull request](https://help.github.com/articles/creating-a-pull-request/) när du är klar med dina förbättringar.

## Installation

1. Sajten använder sig av [Hugo](https://gohugo.io/) så [följ deras instruktioner](https://gohugo.io/getting-started/installing/) för hur du installerar Hugo. Enklast är att installera Hugo via Homebrew.
2. Testa att hugo är installerat genom att i terminalen skriva `Hugo version`. Printar terminalen ut något liknande så ser allt bra ut:
`Hugo Static Site Generator v0.53/extended darwin/amd64 BuildDate: unknown`

### Utveckla lokalt

1. Ladda hem [GitHubs desktop app](https://desktop.github.com/) för att hantera GIT.
2. [Ta hem vårt repos!](x-github-client://openRepo/https://github.com/RegionHalland/design.regionhalland.se)
3. Installera på valfri plats på din dator.
4. Ställ dig i din valda mapp i Terminalen och skriv: ´hugo server -w´
3. Besök den URL som terminalen ger dig, troligtvis [http://localhost:1313](http://localhost:1313)
4. Tuta och 🏎!

## Hur kan jag redigera innehåll på sajten?
1. Bli vän med Hugos [dokumentation](https://gohugo.io/documentation/)
2. Redigera existerande sidor genom att skriva i `/content` mappen.
3. Skapa nya sidor genom att i terminalen skriva `hugo new path/till/dinfil/namn.md`
    1. Sajten applicerar [GitHub flavoured markdown](https://guides.github.com/features/mastering-markdown/) för allt innehåll.
    2. Ta gärna en titt på [Hugos Shortcodes](https://gohugo.io/content-management/shortcodes/) för att lägga till t.ex. video, tweets m.m. på en sida

### Hantering av bilder m.m.
Om du vill använda bilder m.m. i din dokumentation så lägg alla assets i `/static/*` och hänvisa sedan till dem i din dokumentation t.ex. så här: `{{< figure src="/mapp/fil.jpg" title="Dieter Rams" alt="text" >}}`.

### Publicera till produktion

Detta är skrämmande enkelt. Bumpa bara upp versionnumret i config.toml, commita och byt seda till ´production´ branschen och merga. När du commitar till ´production´ så byggs en ny version på [Netlify](https://regionhalland-design.netlify.com/)
