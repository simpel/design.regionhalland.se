---
title: "I Azure DevOps följer vi våra utvecklingsprojekt från idé till produktion"
linktitle: "Azure DevOps"
date: 2019-02-11T09:17:43+01:00
draft: false
description: "I Azure DevOps följer vi statusen för våra digitala utvecklingsprojekt."
weight: 1000
---
För att kunna följa arbetet med våra olika utveklingsinitivativ, lagra källkod och säkerställa gemensamma arbetsätt använder vi verktyget Azure DevOps.

{{< button icon="external-link" url="https://regionhalland.visualstudio.com" label="Logga in i DevOps" >}}


## Begrepp i DevOps

### Workitems
I DevOps finns ett antal olika workitems, de vi primärt använder beskrivs nedan. Ett workitem är helt enkelt en beskrivning över vad som behöver göras.

#### Epics
En Epic är den största abstraktionen vi har av ett projekt eller satsning. Vi använder epics för att på helikopternivå kunna följa våra olika projekt och se att vår gemensamma portfölj ligger i synk. Vanligvis består ett projekt av endast en eller ett fåtal Epics. Vanligvis skrivs och hanteras Epics av Objektägaren tillsammans med Digitaliseringsenheten.

#### Features
En Epic består av flera features. En feature är en övergripande förmåga som en tjänst ska leverera. Exempel på features kan vara "Inloggning", "Att kunna söka i styrda dokument" eller "Listning av klienter". En Feature består i sin tur av flera Stories. Vanligtvis skrivs både features och stories av Objektledaren.

#### Stories
Stories i DevOps är kanske den viktigaste pusselbiten då det är här man konkretiserar vad som de facto ska produceras. Formatet bör vara att man skriver [user stories](/metoder/userstories/) med tydliga [acceptanskriterier](/metoder/userstories/#acceptanskriterier).

#### Tasks
Om en produktägare, eller objektledare, är den som skriver Features och Stories så bör arbetet med Tasks hanteras av det utförande teamet. Tasks är teamets chans att i varje sprint själva tydliggöra och fördela arbetet kring hur man uppfyller acceptanskriterierna på en viss Story.

### Pipelines
En pipeline är den process man sätter upp i Azure DevOps för att lansera/bygga en tjänst. En typisk pipeline kan vara att man kompilerar all kod som driver tjänsten, kör ett antal tester för att kontrollera att allt fungerar och publicerar sedan tjänsten på en server så att användarna får en ny version.
