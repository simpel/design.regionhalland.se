---
title: "Redigera webbplatsens innehåll"
linktitle: "Redigera innehåll"
date: 2019-01-24T11:17:48+01:00
draft: false
---
Alla kan bidra med innehåll till denna webbplats genom att skicka in så kallade pull requests på GitHub. Även om det låter tekniskt så är processen enkel och säker.

## Steg för steg

{{< youtube 3FQ2DBcmlX4 >}}

1. **Leta upp den sida du vill redigera** <br> ...och klicka på "Redigera denna sidan"

2. **Logga in** <br>
[Skapa konto](https://github.com/signup) och logga in på GitHub.

3. **Redigera sidan** <br> När du är inloggad kan du redigera sidan genom att klicka på redigera ikonen:
{{< figure src="/images/github/editfile.png" alt="Redigera fil på GitHub" >}}

4. **Genomför dina ändringar** <br> Ett tips här är att läsa på lite om Hugos s.k. [Shortcodes](https://gohugo.io/content-management/shortcodes) som kan användas för att lägga in t.ex. video m.m. på sidan. I övrigt används [Markdown](https://guides.github.com/features/mastering-markdown/) för att göra enkare formateringar av sidan.

5. **Föreslå din förändring** <br> När du är klar med dina ändringar så scrollar du längst ner, skriver en kommentar kring vad du ändrat och klickar sedan på "Propose file change"
{{< figure src="/images/github/proposefilechange.png" alt="Skicka in förslag på förändring" >}}

6. **Skapa din pull request** <br> När du har redigerat alla de sidor du vill och känner dig färdig så kan du sammanställa och skicka in din pull request genom att klicka på "Create pull request". Läs mer här om vad en [Pull Request](https://help.github.com/articles/using-pull-requests) är för något
{{< figure src="/images/github/createpullrequest.png" alt="Skapa pull request" >}}

7. **Skicka in pull request** <br> Ta en minut och granska dina ändringar och klicka sedan på "Create pull request" en sista gång.
{{< figure src="/images/github/sendpullrequest.png" alt="Skapa pull request" >}}

8. **Klart!** <br> Du är nu färdig med dina ändringar. Bra jobbat! Nu kommer sidans administratörer att titta på din pull request och antingen godkänna eller avvisa den. Vid ett godkännande går dina ändringar ut live på sajten, vid ett avvisande kommer du få ett meddelande med en förklaring till varför.


## Bildhantering
Vill du använda dig av bilder på en sida så sker det i två steg, först behöver du ladda upp din bild, sen lägger du in den på din sida med hjälp av en shortcode.

1. **Ladda upp din bild** på en lämplig plats i vår [`/static/images` mapp](https://github.com/RegionHalland/design.regionhalland.se/tree/production/static/images).
   - Notera att det går även bra att skapa nya mappar i strukturen om du så vill. 
   {{< figure src="/images/github/uploadfiles.png" alt="Ladda upp bild" >}}
   
2. **Lägg till bilden på sidan** genom att använda dig av följande shortcode.
{{< highlight go >}}
{{< figure src="/images/sokväg/till/dinfil.png" alt="Beskrivande text om bildens innehåll" title="Bildtexten till din fil" >}}
{{< /highlight >}}
