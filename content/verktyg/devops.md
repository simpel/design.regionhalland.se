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
En Epic är den största abstraktionen vi har av ett projekt eller satsning. Vi använder epics för att på helikopternivå kunna följa våra olika projekt och se att vår gemensamma portfölj ligger i synk. Ett projekt kan bestå av ett flertal Epics och bör alltid vara uppdelade så att arbetet kan göras klart inom ca. ett kvartal. Vanligvis skrivs och hanteras Epics av Objektägaren tillsammans med Digitaliseringsenheten. Vi använder Epics enbart på portföljninvån och inte på team nivå.

#### Features
En Epic består av flera features. En feature är en övergripande förmåga som en tjänst ska leverera. Exempel på features kan vara "Inloggning", "Att kunna söka i styrda dokument" eller "Listning av klienter". En Feature består i sin tur av flera Stories. Vanligtvis skrivs både features och stories av Objektledaren. En bra måttstock är att en feature kan levereras inom 1-2 sprintar. Är featuren större än så bör den delas upp i flera features.

#### User Stories
Stories i DevOps är kanske den viktigaste pusselbiten då det är här man konkretiserar vad som de facto ska produceras. Formatet bör vara att man skriver [user stories](/metoder/userstories/) med tydliga [acceptanskriterier](/metoder/userstories/#acceptanskriterier). Även här bör man tänka på storleken och inte låta user storien bli större än någon/några veckors jobb.

#### Tasks
Om en produktägare, eller objektledare, är den som skriver Features och Stories så bör arbetet med Tasks hanteras av det utförande teamet. Tasks är teamets chans att i varje sprint själva tydliggöra och fördela arbetet kring hur man uppfyller acceptanskriterierna på en viss Story. Vi skriver alltid minst en Task per Story, detta ger oss också bl.a. möjligheten att följa upp tiden i burn-down charts då tiden läggs per Task. 

### Pipelines
En pipeline är den process man sätter upp i Azure DevOps för att lansera/bygga en tjänst. En typisk pipeline kan vara att man kompilerar all kod som driver tjänsten, kör ett antal tester för att kontrollera att allt fungerar och publicerar sedan tjänsten på en server så att användarna får en ny version.

### Area Paths
För att kunna skicka en workitem till ett team så anväder vi Area Paths. Vi har definerat en Area Path struktur som bygger på att ett team kan vara av någon av typerna App (ett produktteam), Org (ett organisationsteam, t.ex. ett Objekt) eller Projekt (ett projektteam). Under respektive kategori finns det sedan underkategorier. För att flytta en workitem från ett team till ett annat så byter man bara Area Path så dyker workitem upp i rätt teams backlog.

### Iteration Paths
Vi använder iteration paths för att definiera tidslängden på våra sprintar. VI har ett gemensamt iteration path bibliotek utifrån vilket varje team kan välja tidsrymden för sina sprintar. Vi försöker hålla oss till samma "tick" för alla team och för närvarande använder vi oss av månadssprintar och halvmånadssprintar. Månadssprintar benämns "Sprint 2019.02", "Sprint 2019.03", osv. Under dessa finns våra halvmånadssprintar där den första sprinten går från den 1:e till den 15:e varje månad och den andra sprinten går från den 16:e till den sista varje månad. 
