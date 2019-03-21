---
title: "Utvecklingsprint"
linktitle: "Utvecklingsprint"
date: 2019-03-20T08:10:27+01:00
draft: false
description: "Hur vi arbetar med utvecklingssprintar"
weight: 0
---
## Inför Sprintplanering

Kravställarna äger backloggen och inför sprintplaneringen ser kravställarna till att prioritera sina [User Stories](/metoder/userstories/) och ser till att de högst prioriterade är tillräckligt detaljerade för att tidsuppskattas. Utvecklarna sätter då Story Points (ungefärligt antal timmar för att implementera storyn) på respektive [User Story](/metoder/userstories/). Under detta arbete kan det vara lämpligt att även bryta ner varje story i [Tasks](/verktyg/devops/#tasks).

Detta är något som sker fortlöpande hela tiden. Det gäller att hålla [Backloggen](/verktyg/devops/#backlog) levande och aktuell, det är kravställarens ansvar. Arbetet med Backloggen fortsätter alltså under hela sprinten parallellt.

## Sprintplaneringen

På sprintplaneringen prioriteras slutligen vilka User Stories som ska tas in i sprinten och respektive Task tilldelas en person i teamet. De User Stories som får plats i sprinten läggs över från Backloggen till sprinten, därmed assignas även tillhörande Tasks till sprinten.

## Under utvecklingssprinten

Utvecklaren betar av sprinten i prioriteringsordning från första till sista User Storyn. När första Tasken på en User Story startas sätter utvecklaren om statusen från New till Active. Tasken sätts också från New till Active.

När arbetsdagen är slut så uppdaterar utvecklaren Remaining Time på alla Aktiva Tasks så att de ungefär återspeglar hur lång tid det återstår av uppgiften. Det kan tillkomma fler Tasks under sprinten, tidsuppskattning ska sättas på dessa också. Det kan även vara så att tidsuppskattningarna växer, det kan framkomma information som gör att Remaining time ökar.

När en Task är slutförd sätter utvecklaren om den till Closed.

När en User Story är klar för att testas och är lyft till testmiljön sätter utvecklaren om den till Resolved.

När en User Story är satt till Resolved tar kravställaren och testar den levererade storyn i testmiljön.

Om kravställaren godkänner leveransen av storyn sätter hen om den till Closed. Om det uppstår frågor används Diskussions-funktionen på User Storyn.

Hittas buggar ska de registreras i DevOps genom att på User Storyn lägga till en bugg. Beskrivningen av buggen ska innehålla tillräcklig information för att utvecklaren ska kunna återskapa samma fel. Skärmdump på eventuellt felmeddelande och vid webblösningar får gärna urlen till den felande sidan synas tydligt i skärmdumpen. Tilldela sedan buggen till den utvecklare som jobbat med User Storyn.

När utvecklaren påbörjar felsökningen av Buggen sätter hen om den till Active. Eventuella kompletteringar och frågor hanteras genom Diskussionsfunktionen på ärendet i DevOps. Om utvecklaren inte kan felsöka för att det inte finns tillräckligt med information sätts Buggen tillbaka till den som rapporterade den.

Utvecklaren får förstås också registrera buggar som hen hittar.

När utvecklaren rättat buggen och lagt upp den i testmiljön sätter hen om den till Resolved. DevOps kommer då automatiskt att tilldela tillbaka den till den person som rapporterade buggen.

Kravställaren testar att buggen verkligen är rättad och efter verfiering sätter om buggen till Closed.

## Sprintslut

I en perfekt sprint finns det varken öppna buggar eller user storys kvar... Men i verkligheten har man kanske både en User Story och ett par buggar kvar som man inte hunnit stänga i sprinten. Dessa måste hanteras innan sprinten tar slut.

### Ej påbörjade User Storys

Läggs tillbaka i Backloggen för prioritering till nästa sprintplanering.

### Ej färdigställda User Storys

Om en Users Story nästan är klar, t ex om de flesta Acceptanskriterier är uppfyllda, kan man skriva en ny User Story med Acceptanskriterier som ej levererades och lägga den på Backloggen för prioritering till nästa sprint.

### Buggar 

De buggar som inte stängts placeras på Backloggen och prioriteras.

### Buggar som egentligen var nya krav

De buggar som visat sig egentligen vara nya krav ska skrivas om till User Stories och läggas på Backloggen för prioritering till kommande sprintar. Buggen status sätts därefter till Copied to Backlog.
