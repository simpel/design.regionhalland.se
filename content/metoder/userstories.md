---
title: "Userstories"
linktitle: "Userstories"
date: 2019-01-31T21:09:57+01:00
draft: false
description: "Beskrivning av sidan"
weight: 0
---
En user story, eller användarhistoria, är en kort mening som konkret beskriver vad din användare vill uppnå. Tillsammans med acceptanskriterier beskriver den vad ni skall producera.


## Format

En user story har en enkel men effektiv uppbyggnad och synliggör vem som vill göra vad och varför.

{{ box }}
Som **användartyp** vill jag **mål/önskan/händelse** så att **syfte**
{{ /box }}

 - **Användartyp** ‐ En användartyp är en av dina målgrupper eller personas. Dessa kan vara både externa och interna, se exemplen nedan.
 - **Mål/önskan/händelse** ‐ Här beskriver vi det som användartypen vill uppnå, t.ex. boka en tid, köpa en vara, få information m.m.
 - **Syfte** ‐ Syftet är helt enkelt anledningen till varför användartypen vill genomföra en viss aktivitet
 
 ### Exempel
 
Som **patient** vill jag **kunna kontakta läkare via mobilen** så att **jag slipper åka till vårdcentralen**.

Som **blivande kund** vill jag **förstå hur era produkter fungerar** så att **jag kan fatta ett köpbeslut**.

Som **användare** vill jag **kunna markera flera filer** så att **jag kan flytta dem till en annan mapp**.

## Hur vet jag när en user story är levererad?
Det är här acceptanskriterier(***AC***) kommer in i bilden. Det är en samling krav som beskriver för teamet när man uppfyllt målet med user storyn. AC:s är också till för att säkerställa kvalitén på produkten, t.ex. kan ett AC vara att den producerade koden skall ha kodgranskats av en kollega eller att det man producerat skall dokumenteras.

{{ box }}
### EXEMPEL
#### User Story
Som **användare** vill jag **kunna se alla vårdcentraler på en karta** så att **jag kan avgöra vilken som är närmast mig**.

#### Acceptanskriterier
- Kartan skall fungera både på mobil, surfplatta och datorskärm.
- Kartan skall visa min nuvarande position.
- Som användare skall jag kunna zooma och panorera kartan.
- Kartan skall visa både våra egna vårdcentraler och de som drivs i egen regi.
- Kartan får inte ta mer än 1 sek att ladda via en 4G uppkoppling.
- Den producerade koden skall även kunna användas för att visa andra POI:s än vårdcentraler.
- All kod har kodgranskats.
- Definition of done är uppfylld.

{{ /box }}

## Struktur

### Skriv "små" user stories
Desto konkretare desto bättre är devisen med user stories. Målet är att få till beskrivningar som går att leverara med några dagars arbetsinsats. En funktion beskrivs ofta med flera user stories. Detta minimerar risken för missförstånd och gör att man oftare kan lansera nya versioner av det man bygger.

### Gruppera dina user stories i features
Antalet user stories för en produkt eller tjänst blir snabbt överväldigande. Snart upplever man att man drunknar i user stories. Då finns ett antal strategier för att skapa struktur, ett är att koppla alla dina user stories till övergripande funktioner, eller features, som ska kunna utföras i den tjänst ni producerar. Behöver man sedan abstrahera ytterligare för att få en överblick av tjänsten kan man grupera featuers i s.k. epics.



