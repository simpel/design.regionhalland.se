---
title: "Handbok för utveckling av .NET webbapplikationer"
linktitle: "webbapplikationer .NET"
date: 2019-02-01T09:07:05+01:00
draft: false
description: "Beskrivning av sidan"
weight: 0
---
# Inledning
Detta dokument är en bilaga till utvecklingshandboken och syftar till att beskriva hur vi utvecklar webbapplikationer och hur dessa samverkar med en tillhörande databas.
### Webbapplikationen
Webbapplikationer I Region Halland utvecklas med tre olika ramverk, ASP.Net, Telerik  UI for ASP.Net AJAX och  RHCommonComponents. Våra webbapplikationer har tidigare varit skiktade i tre nivåer, gränssnitt, affärslogik och databasåtkomst. Sedan 2016/2017 så har vi ändrat detta till två nivåer gränssnitt och databasåtkomst. Affärslogiken är i de allra flesta fall förflyttad till databasen. Även .Net version kommer under 2017 att succesivt bytas från 4.0 till 4.6.2. Aktuell .Net version framgår i baseline. Samtliga webbapplikationer utvecklas i ASP-Net Webforms.
## Databasen
Databasen är alltid Microsoft SQL Server men dess version kan variera mellan olika applikationer. Oftast är det dock 2008 och 2012 som används. Programmering i T-SQL sker i mycket stor utsträckning där vi, förutom Stored Procedures, använder triggers och funktioner på databassidan. Applikationernas affärsregler återfinns oftast som T-SQL i databasen.
# Webbapplikationen
Varje organisation sätter upp sina unika regler för hur systemutveckling ska gå till. För utveckling av webbapplikationer så är reglerna ganska omfattande. För att våra system ska överleva över lång tid och till en rimlig förvaltningskostnad så är dessa regler viktiga att följa.
## .Net
Då detta dokument skrivs så är alla våra webbapplikationer utvecklade i .Net 4.0. Inom Region Halland så har vi en återhållsam strategi vad det gäller att rulla ut nya .Net versioner, både för klienter och servrar. Under 2017 så är planen att succesivt flytta över till version 4.6.2. Inga planer finns att gå över till .Net Core.
### Resharper
Inom Region Halland använder vi Resharper, från företaget JetBrains, vilket är ett av våra viktigaste verktyg. Det hjälper oss att hålla en likvärdig och god kodningsstandard, det analyserar kodkvaliteten och det lär oss nya features i C#. Vad det gäller kodningsstandarden så använder vi funktionaliteten i nedanstående menyval:

{{< figure src="/images/handbocker/utveckling/web/image001.png" >}}

Med denna funktionalitet i Resharper så kontrolleras både C# koden och mark-up i aspx-filerna. Resharper kontrollerar koden med över 1700 ”regler”. I Region Halland så har vi valt att helt låta Resharper bestämma vår kodstandard vilket gör att vi använder verktyget med default-inställningar och tillämpar endast få undantag från regelverket. Hur vi implementerar våra undantag i Region Halland framgår i en bilaga. Ytterligare ett undantag finns dock och det handlar om sökvägar till resurser som inte är del av vår solution. I praktiken är det sökvägar till våra egenutvecklade User-Controls och undantaget implementeras så här:
{{< highlight csharp >}}
<%-- ReSharper disable Html.PathError --%>
<%@ Register src="~/Public/UserControls/RHProgress2.ascx" tagname="RHProgress" tagprefix="ucRH" %>
<%@ Register src="~/Public/UserControls/RHNotification.ascx" tagname="RHNotification" tagprefix="ucRH" %>
<%@ Register src="~/Public/UserControls/RHGridView2.ascx" tagname="RHGridView2" tagprefix="ucRH" %>
<%@ Register src="~/Public/UserControls/RHDatePicker.ascx" tagname="RHDatePicker" tagprefix="ucRH" %>
<%-- ReSharper restore Html.PathError --%>
{{< /highlight >}}
## N-Tier
Fram till årsskiftet 2016/2017 så byggde vi alla våra webbapplikationer i tre skikt, gränssnitt, affärsregler och databasaccess. Nya applikationer, byggda efter årsskiftet 2016/2017 bygger vi med endast två skikt, gränssnitt och databasaccess. Då vi inte jobbar med cachning så mycket så behövs inte affärsregellagret. Befintliga applikationer kan byggas om i samband med att större revisioner av dem sker. Orsaken till att vi går från tre till två skikt är att vi sällan placerar någon affärslogik i affärsskiktet och att vi har större praktisk nytta att ha affärsreglerna i databasen.
En webbapplikation med två skikt kan se ut så här:

{{< figure src="/images/handbocker/utveckling/web/image002.png" >}}

Förkortningen DAL står för Data Access Layer. I exemplet ovan så finns det en referens, av typen ”Project” från ”Elvis” till ”ElvisDal” enligt följande:

{{< figure src="/images/handbocker/utveckling/web/image003.png" >}}

I äldre applikationer så finns det motsvarande referenser från gränssnittet till affärslagret och från affärslagret till databaslagret.
## ASP.Net
För utveckling av webbapplikationer så använder vi tre olika ramverk där ASP.Net av naturliga skäl är det mest grundläggande. Vi använder dock ytterst få kontroller i verktygslådan i ASP.Net.
Vilka kontroller i ASP.Net som vi valt att använda framgår i baseline.
## Telerik
Sedan årsskiftet 2015/2016 använder vi ramverket Telerik UI for ASP.Net AJAX. Detta är ett ramverk som innehåller runt 100 olika kontroller vars syfte är att få en rik användarupplevelse. De kontroller som finns i Telerik är ofta utökningar och förbättringar av de i ASP.Net. Telerik har även stöd för skins, vilket gör att användaren själv kan välja färgsättning. Av de 100 kontrollerna som totalt finns i Teleriks ramverk så har vi valt att använda cirka 10 stycken.
Vilka kontroller i Telerik som vi valt att använda framgår i baseline.
## RHCommonComponents
RHCommonComponents är en en egen solution som innehåller viktig gemensam kod och komponenter. Här har vi bland annat skapat UserControls som baseras på ASP.Net och/eller Teleriks kontroller. Dessa UserControls är alltså en ytterligare förbättring/anpassning av de andra två ramverken. Förutom UserControls så finns det statiska komponenter så som bilder, ikoner, script och css.
Vad RHCommonComponents innehåller framgår i baseline.

## Bootstrap
Vi använder Bootstraps gridsystem för att positionera ut kontroller på webbsidorna. Detta gridsystem består maximalt av tolv kolumner. Kolumnerna går att sätta ihop så att allt ifrån en till tolv kolumner kan erållas. Vi använder alltid .col-xs- för alla kolumner. Den vanligaste implementationen av Bootstraps gridsystem är den vi använder i inmatningsformulär, där det ofta finns en textbox och en förklarande label. Det ser då exempelvis ut så här:
{{< highlight html >}}
<div class="row">
  <div class="col-xs-6">
    <telerik:RadLabel ID="lblNamn" Text="Namn:" runat="server" RenderMode="Lightweight"></telerik:RadLabel>
    <telerik:RadTextBox ID="txtNamn" Width="100%" runat="server" RenderMode="Lightweight"></telerik:RadTextBox>
  </div>
  <div class="col-xs-6">
    <telerik:RadLabel ID="lblFormel" Text="Formel:" runat="server" RenderMode="Lightweight"></telerik:RadLabel>
    <telerik:RadTextBox ID="txtFormel" Width="100%" runat="server"	RenderMode="Lightweight"></telerik:RadTextBox>
  </div>
</div>
{{< /highlight >}}

I exemplet ovan så placeras två uppsättningar av label/textbox ut och dess utrymme horisontellt fördelas med 50% vardera. Om ytterligare en kolumn önskas, totalt tre, så ändras col-xs-6 till col-xs-4 och vid fyra kolumner så ändras col-xs-6 till col-xs-3. Siffran tolv dividerat med antal kolumner ger alltid siffran Z till höger i uttrycket col-xs-Z.
I Solution RHCommonComponents, under projektet RHÖvriga finns en fil, Bootstrap, template.txt, Som innehåller en väldigt enkel uppsättning med Bootstrap-exempel.

## ASP.Net vs Telerik vs RHCommonComponents
Då en applikation designas, ur vilket ramverk ska kontroller väljas? De egna kontrollerna i RHCommonComponents ska alltid väljas i första hand men om kontrollen saknas där så används kontroller från Telerik. Endast i undantagsfall så väljs kontroller från ASP.Net. Endast de kontroller som är specificerade i baseline får användas. Om behov uppstår av att använda kontroller som inte finns i baseline så tas först en diskussion i utvecklingsgruppen angående behovet och tjänsteansvarig för systemutveckling tar beslut. Kontroller som vid varje implementation kräver anpassning för att fungera väl bör byggas in som en egenutvecklad komponent och placeras i RHCommonComponents.
## Att använda kontroller från Telerik
För att kunna använda kontroller från Telerik så behövs först och främst en installation av Telerik  UI for ASP.Net AJAX. Det är viktigt att alla utvecklare kör samma version av detta ramverket och att vi därmed uppgraderar samtidigt. Lika viktigt är att alla utvecklare installerar ramverket på default sökväg. Aktuell version framgår i baseline.
I respektive projekt som utnyttjar Teleriks kontroller så behövs två referenser Telerik.Web.UI och Telerik.Web.UI.Skins. Det finns olika varianter av dessa klassbibliotek, en uppsättning för varje .Net version. Eftersom sökvägen till klassbiblioteken innehåller .Net versionen så varierar den. För .Net 4.0 så är sökvägen:

`C:\Program Files (x86)\Telerik\UI for ASP.NET AJAX Q2 2016\Bin40\`

I sökvägen framgår också vilken version av Telerik som används.
För att Telerik ska fungera så måste också några inställningar göras i ```web.config```:

{{< highlight html >}}
<system.web>
  <httpHandlers>
    <add path="Telerik.Web.UI.WebResource.axd" type="Telerik.Web.UI.WebResource" verb="*" validate="false" />
  </httpHandlers>
    <pages>
      <controls>
  <add tagPrefix="telerik" namespace="Telerik.Web.UI" assembly="Telerik.Web.UI" />
      </controls>
    </pages>
</system.web>
<system.webServer>
  <handlers>
    <add name="Telerik_Web_UI_WebResource_axd" verb="*" preCondition="integratedMode"
	path="Telerik.Web.UI.WebResource.axd" type="Telerik.Web.UI.WebResource" />
  </handlers>
</system.webServer>
  <appSettings>
    <!-- Inställningar för Telerik -->
    <add key="Telerik.ScriptManager.TelerikCdn" value="Enabled"/>
    <add key="Telerik.ScriptManager.TelerikCdn.BaseSecureUrl" value="https://d2i2wahzwrm1n5.cloudfront.net"/>
    <add key="Telerik.StyleSheetManager.TelerikCdn" value="Enabled"/>
    <add key="Telerik.StyleSheetManager.TelerikCdn.BaseSecureUrl" value="https://d35islomi5rx1v.cloudfront.net"/>
    <add key="Telerik.Web.UI.RenderMode" value="lightweight" />
  </appSettings>
{{< /highlight  >}}

Observera att ovanstående är exempel som ska passas in med övriga inställningar i web.config. Inställningen under sektionen `<appSettings>` innebär att alla filer, förutom de lokalt installerade klassbiblioteken, hämtas från en CDN, Content Delivery Network.

När ovanstående finns på plats så används exempelvis Teleriks kontroller, tillsammans med Bootstrap, så här:
{{< highlight html >}}
<div class="row">
  <div class="col-xs-6">
    <telerik:RadLabel ID="lblNamn" Text="Namn:" runat="server" ></telerik:RadLabel>
    <telerik:RadTextBox ID="txtNamn" Width="100%" runat="server" ></telerik:RadTextBox>
  </div>
  <div class="col-xs-6">
    <telerik:RadLabel ID="lblFormel" Text="Formel:" runat="server" ></telerik:RadLabel>
    <telerik:RadTextBox ID="txtFormel" Width="100%" runat="server" ></telerik:RadTextBox>
  </div>
</div>
{{< /highlight  >}}

En viktig princip är att `RadTextBox` har `Width="100%"`.

## Att använda usercontrols från RHCommonComponents
För att få tillgång till usercontrols i RHCommonComponents så behövs tre saker, en referens till dess klassbibliotek, en kopia av dess ascx fil och en referens i respektive aspx som ska använda den. För att alltid, enkelt, ha tillgång till de senaste klassbiblioteken och ascx-filerna så är rekommendationen att alltid ha en kopia av solution för RHCommonComponents. Då kan de olika projekten enkelt byggas och ascx-filerna finns på den utvecklarens lokala dator. Projekt som behöver utnyttja klassbiblioteken i RHCommonComponents ska alltid referera till release-versionen av klassbiblioteket. Om en komponent i RHCommonComponents gjorts om så ska dess projekt alltid byggas i release så att den konsumerande applikationens referens uppdateras. Att bygga RHCommonComponents i debug används lämpligen då någon komponent är under förändring.
När referensen till klassbiblioteket finns på plats så ska ascx-filen kopieras in, vilket sker med ett så kallat post-build event. Se separat stycke i detta dokument.
Den tredje åtgärden som behövs för att kunna använda en usercontrol från RHCommonComponents är en referens på respektive sida som behöver den, vilket kan se ut enligt nedan:
{{< highlight csharp >}}
<%-- ReSharper disable Html.PathError --%>
<%@ Register src="~/Public/UserControls/RHGridView2.ascx" tagname="RHGridView2" tagprefix="ucRH" %>
<%@ Register src="~/Public/UserControls/RHNotification.ascx" tagname="RHNotification" tagprefix="ucRH" %>
<%-- ReSharper restore Html.PathError --%>
{{< /highlight >}}
I exemplet ovan så ges möjlighet att använda två usercontrols på den aktuella sidan.
## Post-build event
Vi använder post-build event då vi utvecklar webbapplikationer. Detta ger oss möjligheten att skripta åtgärder som ska ske i samband med att en applikation byggs. Det finns två varianter, ”Pre-build” och ”Post-build”, för aktiviteter som kan ske före respektive efter att ett projekt byggts. Post-build eventet äger rum först efter ett lyckat bygge och dess skript kommer inte att köra om projektet har syntaxfel. Skripten matas in i projektets egenskaper enligt nedan.

{{< figure src="/images/handbocker/utveckling/web/image004.png" >}}

Vi använder en generell uppsättning med skriptkommandon för Post-build. I Solution RHCommonComponents, under projektet RHÖvriga finns en fil, PostBuildEvent.txt, med dessa generella skriptkommandon. Alla skriptkommandon passar inte i alla projekt utan det krävs att man granskar denna och plockar bort det som inte är relevant för det aktuella projektet.
Det som händer i praktiken är att skriptet kopierar in filer från RHCommonComponents till det aktuella projektet. Främst är det ascx-filer men det kan även vara filer som behövs för export till affärssystemet Agresso.
## Behörighetsstyrning
Alla applikationer som visar upp person- och/eller patientuppgifter ska autentisera användarna med hjälp av stark autentisering, tvåfaktors autentisering. I vårt fall innebär det att vi använder certifikat som finns på våra SITHS-kort. För auktorisation av användaren så används oftast applikationsspecifika användardatabaser. Alternativet till behörighetsstyrning med klientcertifikat är Windows authentication.
### Autentisering med klientcertifikat
Applikation som finns i drift på en IIS server har SSL aktiverat och alternativet ”Request Client Certificate”. Det innebär att användaren måste ha sitt SITHS kort i läsaren när applikationen efterfrågas. Certifikaten på korten måste vara av typen SITHS CA och de får inte vara revokerade. Om dessa förutsättningar finns så presenterar IIS ett dialogfönster där användaren kan ange sin pinkod för legitimering. Om rätt pinkod anges, certifikatet är giltigt och inte revokerat, så släpper IIS in användaren i applikationen. En stor fördel med detta förfarande är att applikationen är helt skyddad bakom denna, i IIS inbyggda, säkerhetsmekanism. Det innebär att endast de som har ett SITHS CA certifikat med rätt pinkod kommer igenom. När en applikation placeras exempelvis på DMZ i vår driftmiljö så innebär det ju att servern är exponerad mot internet för hela världen men det är bara hälso- och sjukvårdspersonal som kan ta sig igenom säkerhetsmekanismen i IIS.
Det finns två pinkoder kopplat till varje SITHS CA certifikat, ett för legitimering och ett för signering. Signeringscertifikatet används väldigt sällan i våra applikationer. Ett typiskt användningsområde för signeringscertifikatet är exempelvis då en läkare signerar en journalhandling eller en läkemedelsförskrivning.
Pinkoderna som är kopplad till de olika certifikaten kan ändras genom applikationen NetId. Användaren har tre försök på sig att ange en korrekt pinkod innan certifikatet låses. För att låsa upp certifikatet behövs en så kallad pukkod. Såväl pinkoder som pukkod erhöll användaren i ett kodkuvert som skickades till användarens folkbokföringsadress i samband med att kortet införskaffades.
Programmet NetId har till uppgift att, då ett kort sätts i läsaren, kopiera in dess certifikat till local certificate store på Pc:n.
### Auktorisation med klientcertifikat
När användaren kommit igenom autentiseringsfasen och säkerhetsmekanismen i IIS så händer flera saker. Eftersom alla våra applikationer använder ”forms autentication” så kommer användaren att omdirigeras till en sida som heter Public/GetUser.aspx. I denna så läses användarens så kallade HSAID ut från det certifikat som användaren använt vid autentiseringen. HSAID är ett, för användaren, unik teckensträng, bestående av upptill 64 tecken och det kan se ut så här: SE2321000115-259448. Det finns viss logik i uppbyggnaden av HSAID. De första tecknen är en landskod, SE för Sverige. Efter landskoden så utgörs strängen av två delar åtskiljda av bidestreck. Den vänstra delen är ett unikt nummer för den organisation som användaren här till och den andra delen en unik sifferserie för användaren i den organisationen. Tillsammans utgör hela strängen ett unikt ”personnummer” för användaren. Samma system används i hela Sverige, såväl inom landsting/regioner som inom kommunerna. Det gör att samma infrastruktur kan användas oavsett varifrån användaren kommer. Våra applikationer hanterar alltså alla SITHS CA certifikat, oavsett utgivare.
Det HSAID som lästs ut ur användarens certifikat lagras i en sessionsvariabel, Session["hsaid"]. Användarens HSAID är därmed tillgängligt i hela applikationen under användarens hela session. Det andra händer på sidan Public/GetUser.aspx är att ett uppslag mot webbtjänsten HAK görs. Via detta uppslag så tar vi reda på användarens övriga uppgifter såsom namn och mejladress. Uppgifter om namn och mejladress finns även i certifikatet men där är det en statisk information. Om användaren till exempel ändrar efternamn så ändras inte den uppgiften i certet men däremot alltid i HAK.
Det tredje som händer i Public/GetUser.aspx är att användarens uppgifter sparas till applikationens databas och till sessionsvariabler. Följande sessionsvariabler används:



| Sessionsvariabel  | Förklaring          |
|:------------------------------|---------------------------------------------------|
| `Session["fornamn"]`    | Användarens förnamn       |
| `Session["efternamn"]`	    | Användarens efternamn     |
| `Session["mejladress"]` | Användarens mejladress    |
| `Session["organisation"]`     | Användarens organisatoriska tillhörighet    |
| `Session["browser"]` 	  | Användarens webbläsare    |
| `Session["netId"]`	  | Versionen på NetId som användaren har på datorn   |
| `Session["hsaid"]`	  | Användarens hsaid.        |
| `Session["adkonto"]`    | Användarens användarnamn i AD.        |



Informationen om browser och netid är under avveckling då vi inte ser att behovet är lika stort som tidigare.
Slutligen så läses information från databasens tabell ”tblAnvandare” upp till applikationen. Informationen i kolumnen behorighetsgrupp anger användarens roller. Informationen i kolumnen är kommaseparerad och uppdateras från specifik administratörssida i applikationen. Kolumnen kan editeras direkt i databasen men det är viktigt att inga mellanslag läggs in vid kommatecknen. Vilka behörighetsgrupper som används i applikationen styrs från tabellen tblBehorighet.
En ny användare, som inte har någon representation i tabellen, tblAnvandare, läggs upp i tabellen automatiskt och förses med en defaultroll som heter ”Public”. Användare som enbart har rollen public kommer in i alla applikationer men har inte möjlighet att utföra något. Detta innebär att då nya användare tillkommer i en befintlig applikation så ber vi dem alltid att gå in i applikationen en första gång. De dyker då automatiskt upp i databasen och i applikationens användaradministration. Användarens uppgifter, så som HSAID, namn, mejladress m.m., behöver därmed aldrig matas in manuellt.

### Auktorisation och Autentisering med klientcertifikat i din lokala utvecklingsmiljö
Ibland uppstår behovet att testa funktionalitet som är beroende av klientcertifikatlösningen lokalt i din lokala utvecklingsmiljö. För att aktivera detta måste du ställa in IISExpress på att använda SSL samt göra ändringar i web.config och i $SolutionFolder\.vs\config\applicationhost.config.
Web.config:
{{< highlight csharp >}}
<system.webServer>
<!-- För att köra lokalt med klientcertifikat ska denna avdelning vara påslagen,
     samt app setting key="DefaultHSAID" måste värdet vara tomt.
     Detta kräver även ändring i lokala filen .vs/config/applicationhost.config
     elementet Configuration/ConfigSections/SectionGroup/Security
   Sätt <section name="access" overrideModeDefault="Allow" /> till Allow
   för att config nedan ska bli tillåten i IISExpress
   START -->
    <security>
      <access sslFlags="Ssl,SslNegotiateCert,SslRequireCert" />
    </security>
    <!-- SLUT -->
</system.webServer>
{{< /highlight >}}

Ändring i Projektets-properties i VS:

{{< figure src="/images/handbocker/utveckling/web/image005.png" >}}

### Autentisering med Windows authentication
De allra flesta av våra applikationer innehåller person- och/eller patientuppgifter men de som inte gör det kan vi köra utan klientcertifikat och istället använda Windows authentication. För att ange att en applikation ska köras med Windows authentication så läggs en parameter in i Web.config:
{{< highlight csharp >}}

    <!-- Variabel för att ange att systemet kör med Windows authentication. -->
    <add key="WindowsAuthentication" value="True" />
### Behörighetsstyrning
Alla applikationer använder ett menysystem som styrs via web.sitmap, se separat stycke i detta dokument. Här filtreras menyvalen utifrån vilka roller som användaren har. Endast de menyval som användaren har behörighet till visas.
Den andra, och viktigaste delen är att applikationen delas upp i undermappar där varje mapp motsvarar en applikationsroll. Via web.config styrs sedan åtkomsten till respektive mapp på detta sätt:
<location path="Public">
  <system.web>
    <authorization>
      <allow users="?"/>
    </authorization>
  </system.web>
</location>
<location path="InternUser">
  <system.web>
    <authorization>
      <allow roles="InternUser"/>
      <deny users="*"/>
    </authorization>
  </system.web>
<location path="ExternUser">
  <system.web>
    <authorization>
      <allow roles="ExternUser"/>
      <deny users="*"/>
    </authorization>
  </system.web>
</location>
{{< /highlight >}}

Principen är alltså att alla användare kommer åt mappen Public medans alla andra mappar styrs med roller. Standardmässigt så bör nedanstående roller finnas, även om varje enskild applikation kan ha helt andra:


| Mapp  | Förklaring          |
|:------------------------------|---------------------------------------------------|
|`/Public`	|Ger egentligen inga behörigheter alls men är gruppen som alla användare är med i.|
|`/InternUser`	|Grupp för användare som jobbar internt sett ur applikationens perspektiv.|
|`/ExternUser`	|Grupp för användare som jobbar externt sett ur applikationens perspektiv.|
|`/InternSuperUser`	|Grupp för användare som kan administrera användare.|

### Rolltilldelning
I våra webbapplikationer så finns det två metoder att tilldela användaren roller. Dels i applikationens databas, tabellerna tblBehorighet och tblAnvandare, dels via AD.
Tabellen tblBehorighet måste populeras manuellt i SSMS men tabellen tblAnvandare redigeras i användargränssnittet. Vid inloggning erhåller användaren de roller som finns i tabellen tblAnvandare för respektive användare. Eventuella förändringar i rolltilldelningen tas om hand endast då användaren loggar in på nytt. Den vanligaste metoden för att styra rolltilldelning är via applikationens databas och den funktionaliteten är in möjlig att välja bort, framförallt för att vi alltid behöver rollerna Public och AdminIT.
Att styra rolltilldelningen med hjälp av AD är egentligen ett komplement till ovanstående rolltilldelning, då tabeller ändå måste finnas. I teorin är det alltså alltid en form av hybridlösning där databastabellerna alltid används men där en övervägande majoritet av behörighetsstyrningen kan göras via AD. Undantaget rollerna Public och AdminIT, från databastabellerna, så kan webbapplikationens rolltilldelning göras helt med AD. Att införa AD-baserad rolltilldelning är mycket enkelt genom att lägga till nedanstående parameter i web.config:

{{< highlight csharp >}}
<!-- AD-grupper som ska läsas in som roller i systemet. Kommaseparerad lista -->
<add key="AdGroupsToRoles" value="ADH HAK Uppdaterare, Rapporter Utvecklare"/>
{{< /highlight >}}

Inloggningsprocessens rolltilldelning görs i två steg, först kontrollerar applikationen vilka roller som användaren har i tabellen tblAnvandare. Därefter itereras den kommaseparerade listans AD-grupper igenom och processen kontrollerar om användaren är medlem i någon av dessa grupper. Om så är fallet så läggs rollen till.

### Felsida för hantering av saknat SITHS-kort – 403 Access denied
De webbplatser som nyttjar SITHS-korts for Autentisering hanteras Autentiseringen i IIS innan ASP.NET får tillgång till anropen. Det är önskvärt att dessa sajter aldrig serverar något innehåll från webbplatsen om klientcert inte finns närvarande. I det fall användaren glömt att sätta i sitt SITHS-kort innan webbläsaren öppnas kan ingen TLS-anslutning upprättas och därmed kan webbplatsen ej heller visa upp ett relevant felmeddelande. För att då visa felmeddelande och eventuella Javascript och annat kan hänvisas till en standardiserad felsida som finns på https://static.regionhalland.se. För att aktivera funktionen på din webbplats måste du göra följande ändring.
Följande transforms behövs i Web.Debug.config och motsvarande i Web.Debug.Release.config:
{{< highlight csharp >}}
  <system.webServer>
    <httpErrors xdt:Transform="Remove" />
    <httpErrors existingResponse="Replace" errorMode="Custom" xdt:Transform="InsertIfMissing">
      <remove statusCode="403" xdt:Transform="InsertIfMissing"  xdt:Locator="Match(statusCode)" />
      <error statusCode="403" path="https://static.regionhalland.se/Public/CustomErrors/403.html?referrer=https://rapportertest" responseMode="Redirect"  xdt:Transform="InsertIfMissing"  xdt:Locator="Match(statusCode)" />
    </httpErrors>
  </system.webServer>
  {{< /highlight >}}
Notera att det är osäkert att med querystrings i denna lösning varpå de kommer att ignoreras. Notera även att mottagande sida (403.html) automatiskt alltid komplettera parametern referrer med ”.regionhalland.se”, detta för att minska risken för att utsättas för en Cross-Site-Scripting eller att man använder lösningen för att skicka Regionens Användare till externa sajter.
I testhänseende så kan ändringar göras även i web.config:
{{< highlight csharp >}}
<httpErrors errorMode="Custom">
      <remove statusCode="403" />
      <error statusCode="403" path="https://static.regionhalland.se/Public/CustomErrors/403.html?referrer=https://localhost:44333" responseMode="Redirect"/>
</httpErrors>
{{< /highlight >}}

## Menysystemet
Menysystemet i våra webbapplikationer byggs upp med hjälp av en web.sitemap. Visningen filtreras utifrån vilka roller som aktuell användare har, dock fungerar bara filtreringen på första nivån av menyn, undermenyer kan inte filtreras. Det är viktigt att visningsfiltret speglar de behörigheter man satt i web.config i dess location-taggar och dess roller.
Vi använder Telerik RadMenu för renderingen av en horisontell rullgardinsmeny. Menyn har stöd för undermenyer fälls ut automatiskt.

## ”Statiskt innehåll”
En webbapplikation innehåller alltid delar som ändras sällan och som dessutom delas av flera applikationer. Som exempel på detta är bilder, skript och CSS. I solution RHCommonComponents finns ett projekt som heter RHStaticContent och detta projekt innehåller just dessa, nyss nämna delar. Vad det gäller bilder så återfinns här Region Hallands logotyp och ikon. Avseende javascript så finns RH.js och som CSS återfinns RH2.css och RH3.css.
Projektet RHStaticContent publiceras till https://static.regionhalland.se och det är sedan därifrån som respektive applikation konsumerar denna typ av filer.

## .Master filer

Eftersom Region Hallands webbapplikationer bygger på webforms så använder vi även så kallade .Master-filer (Master Page). Vi har tre olika .Master-filer:

Start.Master	Är den Master Page som används när användaren autentiseras. Syns nästan aldrig.
Site2.Master	Master Page som visar meny och listor.
Edit2.Master	Master Page för editering av data.

I våra .Master filer så finns generella funktioner som alla andra sidor. Dessa generella funktioner utgörs av logotyp, ikon, CSS, javascript och delar för AJAX-funktionalitet samt för hanteringen av skins.
Avseende skins så går det att låsa användaren till ett specifikt sådant genom en parameter i web.config:
{{< highlight csharp >}}
    <!-- Variabel för att ange ett fast värde för RadSkinManager -->
    <add key="RadSkinManagerFixedValue" value="WebBlue" />
{{< /highlight >}}

Trots att samtliga .Master-filer är generella så har varje webbapplikation en egen uppsättning av dem, inte minst för att vi ska kunna visa programmets version och titel. Det innebär att utvecklaren, vid nya projekt, manuellt måste kopiera in dessa och uppdatera namespaces samt, då en webbapplikation ska lanseras i en ny version, uppdatera dem. Mallfiler finns i projektet RHÖvriga i RHCommonComponents.
Alla webbsidor i våra webbapplikationer är kopplade till en .Master-fil.

## Global.asax
Alla våra webbapplikationer innehåller en Global.asax-fil vilken kopieras in till applikationsroten vid post-build. Originalfilen återfinns i RHÖvriga i RHCommonComponents.
För våra webbapplikationer så fyller Global.asax två syften. Dels att auktorisera användaren via metoden Application_AuthenticateRequest samt att kunna växla webbapplikationen mellan drift- och serviceläge. Det senare hanteras via metoden Application_BeginRequest och styrs med hjälp av web.config med följande:

{{< highlight csharp >}}
    <!-- Variabel för att kontrollera maintenancemode. Denna kontrolleras sedan i Global.asax -->
    <add key="MaintenanceMode" value="false"/>
    <!-- true/false -->
{{< /highlight >}}

Genom att sätta `MaintenanceMode` till `true` så kommer användarna att få en informationssida presenterad för sig. Informationssidan meddelar användaren att applikationen för tillfället är i serviceläge och att den därmed inte kan användas. Ibland kan utvecklaren behöva köra webbapplikationen, trots att den befinner sig i serviceläge och då finns möjligheten att exkludera vissa användare med hjälp av deras IP-adresser. Även denna inställning görs i web.config:

{{< highlight csharp >}}
    <!-- Variabel för att exkludera maintenancemode. Denna kontrolleras sedan i Global.asax. Flera IP-adresser separeras med semikolon. -->
    <add key="MaintenanceModeExlIP" value="10.11.9.32;::1"/>
    <!-- Flera IP-adresser separeras med semikolon. -->
{{< /highlight >}}

## Listor och formulär
Eftersom majoriteten av våra webbapplikationer är av administrativ karaktär med koppling till databas så använder vi en princip som ibland kallas Master/Detail. Principen bygger på att data visas i listform, Master, med flera kolumner och rader, en matris, där en rad motsvarar en post i databasen. Via listan så kan användaren nå en detaljsida, Detail, för varje post. I Region Halland så har vi valt att ha kopplingen mellan listan, Master, och editeringssidan, Detail, med en knapp som vi benämnt [Visa]. Då användaren klickar på knappen [Visa] så öppnas i normalfallet ett nytt webbläsarfönster som visar postens data och ger användaren möjlighet att editera. Metoden att öppna ett nytt webbläsarfönster kallar vi för pop-out men det finns även en annan möjlighet som vi kallar pop-up vilket innebär att listan gråas ut och editeringsbilden visas i samma webbläsarfönster som listan. Våra användare har önskemål om att få till en tredje variant i form av in-line editering, det vill säga möjlighet att redigera data direkt i listan utan att något ytterligare fönster öppnas. Eventuellt så kommer detta tredje editeringsalternativ att införas under 2017.

### RHGridView2
För att bygga listor, matriser, av data så har Telerik en komponent som heter RadGrid. Denna komponent är mycket kraftfull och innehåller filtrering, sortering, paging m.m. I Region Halland är detta den viktigaste komponenten och den används på hundratals ställen. Eftersom RadGrid är så mångfasetterad så har vi valt att bygga en egen UserControl av den som vi kallar RHGridView2.ascx.
Vår usercontrol bygger på att man sätter ett antal parametrar på den. Parametrarna finns lagrade i databasen vilket gör att vi uppnår en stor dynamik i dess användning. Det finns parametrar för själva gridviewn i sig och parametrar för varje kolumn. Vissa av parametrarna är obligatoriska.

Följande parametrar används:

#### För gridview:

| Egenskapsnamn | Default | Obligatorisk | Förklaring |
| --- | --- | --- |:--- |
| AllowFilteringByColumn | True |   | Visar/döljer filtrering per kolumn. |
| AllowPaging | True |   | Visar/döljer paginering. |
| AllowSorting | True |   | Aktiverar/deaktiverar sorteringsmöjlighet per kolumn. |
| ShowAddNewRecordButton | True |   | Visar/döljer knappen för att lägga till ny post. |
| ShowFooter | False |   | Visar/döljer foten i gridview. |
| ShowHeader | True |   | Visar/döljer huvudet i gridview. |
| ShowExportCsv | True |   | Visar/döljer knapp för csv-export. |
| ShowExportExcel | True |   | Visar/döljer knapp för Excel-export. |
| ShowRefreshButton | True |   | Visar/döljer knappen för uppdatering av grid. |
| Title |   | ? | Rubrik på gridview. |
| SortExpressions |   | ? | Sätter grundsorteringen som ska gälla då listan först visas. |
| FilterExpression |   |   | Sätter grundfiltrering i vyn. Exempel &quot;Aktiv=&#39;J&#39;&quot; |
| SessionVariableRefreshList |   | ? | Sessionsvariabel som håller samman listan med  editeringsbilden och gör så att listan refreshas efter att användaren sparat eller raderat. |
| PageSize |   | ? | Antal poster som visas per sida. |
| EmptyDataText |   | ? | Text som visas då inga poster finns att visa. |
| EditWindowX |   | ? | Storleken på editeringsförstret i x-led. |
| EditWindowY |   | ? | Storleken på editeringsförstret i y-led. |
| EditWindowURL |   | ? | Sökväg till editeringsbild, befintlig post. |
| EditWindowNewURL |   | ? | Sökväg till editeringsbild, ny post. |
| ButtonTextToOpenEditWindow | Visa | N | Anger vilken knapptext som automatiskt skapar en Editeringsknapp med EditWindowURL ovan. |
| DataKeyNames |   | ? | Kolumnnamnet till unik yckel. |
| SqlDataSourceCommmandTimeout |   | N | Timeout på SqlDataCommand, satt till 30 sek default. |

#### För kolumner


| Egenskapsnamn | Default | Obligatorisk | Förklaring |
| --- | --- | --- | :--- |
| HeaderText | - | X | Rubriken på kolumnen |
| Width | - | X | Bredden på kolumnen |
| HorizontalAlign | Left |   | Horisontell orientering |
| AllowFiltering | True |   |   |
| ShowFilterIcon | False |   | Om filtrering ska kunna ske på annat än &quot;innehåller&quot;, men även om t ex CheckList ska visas för filtrering på fasta värden. |
| MaxTextLength | \* |   | Om den inte angivits på kolumnen så plockas den från motsvarande egenskap på GridView. |
| AggregateFunction | - |   | Ger aggregering på kolumnen. Egenskapens värde kan vara t.ex. Sum |
| DataFormatString | - |   | Anger hur kolumnen ska formatteras. Egenskapens värde kan vara t.ex. {0:C0} |
| NumericType | - |   | Anger hur kolumnen ska formatteras. Egenskapens värde kan vara t.ex. Currency |
| IsDateTimeColumn | False |   | Anger om kolumnen ska hanteras som ett datum. Gör det möjligt att använda DateTimePickerType nedan för att filtrera med datumväljare men även intervall. |
| EnableRangeFiltering | False |   | Anger om man ska kunna filtrera med intervall. Fungerar endast på DateTimeColumns. |
| Visible | True |   | Anger om kolumnen ska visas i gränssnittet. Även om denna sätts till false så kommer kolumnen med i Excel-exporten. |
| Display | True |   | Anger om kolumnen ska visas i gränssnittet. Sätts denna till false så renderas kolumnen med style &quot;display:none&quot; och exkluderas från exporten. |
| DateTimePickerType | None |   | Anger vilken typ av datumväljare som ska användas. Endast om DateTimeType är sattGiltiga alternativ:    None,    DatePicker,    TimePicker,    DateTimePicker, |
| IsButtonColumn | False |   | Anger om kolumnen ska visa en knapp. |
| ButtonText | - |   | Anger texten på knappen. |
| DisableAjax | False |   | Anger om knappen ska trigga en komplett PostBack för att rita om hela sidan. |
| CurrentFilterFunction | Contains |   | Anger vilken filterfunktion som ska vara vald som standard.Giltiga alternativ:    NoFilter,    Contains,    DoesNotContain,    StartsWith,    EndsWith,    EqualTo,    NotEqualTo,    GreaterThan,    LessThan,    GreaterThanOrEqualTo,    LessThanOrEqualTo,    Between,    NotBetween,    IsEmpty,    NotIsEmpty,    IsNull,    NotIsNull,    Custom, |
| CurrentFilterValue |   |   | Anger om filtertextrutan ska var förifylld med text. Observera att detta inte påverkar själva filtret, för att utföra filtrering vid laddningen måste även FilterExpression sättas på GridView-kontrollen. |
|   |   |   |   |



## Styrning av filtrering i RHGridView
I vissa fall önskar man styra vilka värden man ska kunna filtrera på. T ex i status-fält. För detta fall finns en inbyggd funktion i RHGridView som med hjälp av en vy i databasen fyller en checkboxlista. Har man mer komplicerade krav på att styra alternativen i checkboxlistan kan man från Code-Behind prenumerera på ett event och där fylla listan.
Tyvärr är det inte möjligt i denna version av Telerik att översätta knapparna ”Apply” och ”Cancel” nedan då de verkar implementerade utan språkstöd.


{{< figure src="/images/handbocker/utveckling/web/image006.png" >}}

### För Styrning av filtrering i gridview med hjälp av en vy.

För att fylla listan med hjälp av en vy ska följande ställas in för i tblRHGridView2

| Egenskapsnamn | Default | Obligatorisk | Förklaring |
| --- | --- | --- | :--- |
| AllowFiltering | True  |  |  |
| ShowFilterIcon |  |  | Om filtrering ska kunna ske på annat än ”innehåller” eller om filtrering ska ske med CheckList. |
| ResetFilters |  |  | Metod för att rensa alla filtreringsvärden utifrån GridView. |
| CheckListSource |  |  | Anger vilken vy i databasen som ska fylla CheckBoxlisten. Genom att sätta detta värde aktiveras denna funktion. Tex: vwArendestatusar |
| CheckListTextField |  |  | Ja om Checklistsource används	Anger vilket fält som ska användas som text i listan. Tex: STATUSNAMN |
| CheckListValueField |  |  | Anger vilket fält som ska användas för filtrering av fältet. Tex STATUSNAMN |
| CheckListKeyField |  |  | Anger vilket fält som ska användas som nyckel, tex STATUSID |
| CheckListOrderBy |  |  | Anger hur vyn ska sorteras, tex STATUSNAME ASC. Om denna utelämnas sätts sorteringen automatiskt till ChecklistTextField ASC |


Förutom ovanstående konfiguration och själva vyn krävs inget ytterligare. Observera att detta fungerar utmärkt i CommonList2.aspx.

### För Styrning av filtrering i gridview med hjälp av code-behind.

I de fall man har mer avancerade krav på innehållet i checkboxlistan kan man istället prenumerera på ett event samt ställa in på kolumnen att filter ska aktiveras och laddas vid behov:




| Egenskapsnamn | Default | Obligatorisk | Förklaring |
| --- | --- | --- | :--- |
| AllowFiltering | True |  |  |
| ShowFilterIcon |  |  | Om filtrering ska kunna ske på annat än ”innehåller” eller om filtrering ska ske med CheckList. |
| FilterCheckListEnableLoadOnDemand | False |  | Anger om laddning av checkboxlistan ska ske. |

Förutom ovanstående konfiguration och själva vyn krävs att följande kod är implementerad i code-behind (vilket utesluter användning i CommonList2.aspx)


#### CodeBehind på sidan med RHGridViewn:

{{< highlight csharp >}}

protected override void OnInit(EventArgs e)
{
      base.OnInit(e);
      ucArenden.OnFilterCheckListItemsRequested += UcArenden_OnFilterCheckListItemsRequested;
}
private void UcArenden_OnFilterCheckListItemsRequested(
           object sender,
           GridFilterCheckListItemsRequestedEventArgs e)
{
    if (e.Column.UniqueName == "Status")
    {
  // Fyll alla statusar ett ärende kan ha här!
  var uppslagsdata = new UppslagsDataAccess();
  e.ListBox.DataSource = uppslagsdata.GetÄrendeStatus();
  e.ListBox.DataKeyField = "STATUSID";
  e.ListBox.DataTextField = "STATUSNAME";
  e.ListBox.DataValueField = "STATUSNAME";
  e.ListBox.DataBind();
    }

    if (e.Column.UniqueName == "KompliceratFält")
    {
  // Fyll alla statusar ett Komplicerat fält kan ha här!
  e.ListBox.Items.Add("Äpplen");
  e.ListBox.Items.Add("Bananer");
  e.ListBox.Items.Add("Päron");
    }
}

{{< /highlight >}}


### CommonList2.aspx
CommonList2.aspx är en webbsida där RHGridView2.ascx implementerat men som inte kräver någon kodning alls. Lämpligtvis så kopieras denna in till samtliga mappar i webbapplikationen för framtida bruk. I web.sitemap kan denna sida länkas in med en tillhörande querystring, kallad ”dbo”. Resultatet blir att data kan visualiseras i en lista, oavsett om källan är en vy, tabell eller funktion. Rekommendationen är dock att man skapar en databasvy för varje lista som ska visas på detta sätt. I web.sitemap kan det då se ut så här:

{{< highlight csharp >}}
    <siteMapNode url="~/InternSuperUser/CommonList2.aspx?DBO=vwAnvandareLista" title="Användare" description="Redigerar användare och behörigheter" roles="InternSuperUser" />
{{< /highlight >}}

CommonList2.aspx är extremt kraftfull och den ska användas på så många ställen som möjligt. Den främsta anledningen är att man slipper skapa en unik websida för varje lista och slipper skriva en endaste rad kod. Samma parametrar, som för RHGridView2, ska dock anges i databastabellen tblRHGridView2.

## Övriga webbdelar
### RadSkinManager och RadSkinManagerFixedValue

RadSkinManager är en komponent från Telerik som används för att välja färgtema i webbapplikationen. Det ger en möjlighet att välja färgsättning efter personliga preferenser och att anpassa färgtemat för en synskadad medarbetare. I vissa specifika applikationer finns önskemål om att låsa applikationen till ett specifikt färgsättningsschema. För att åstadkomma det så sätts en parameter i web.config:

{{< highlight csharp >}}
    <!-- Variabel för att ange ett fast värde för RadSkinManager -->
    <add key="RadSkinManagerFixedValue" value="WebBlue"/>
{{< /highlight >}}

I ovanstående exempel så sätts färgsättningen enligt schemat ”WebBlue” vilket är den färgsättning som bäst överensstämmer med Region Hallands färger. Om ovanstående sätts så visas inte drop-down valet för användaren. Om parametern helt utelämnas i web.config så visas drop-down för användaren, vilket är det den vanligaste implementationen.

## Webbapplikationens databas

Den standard som vi använder inom Region Halland för att bygga webbapplikationer kräver att det finns en bakomliggande databas. I databasen lagras bland annat egenskaperna för hur GridView2 byggs upp samt användaruppgifter och dess roller. Några databasobjekt är därför obligatoriska för alla webbapplikationer.

### tblRHGridView2

Här lagras egenskaperna för hur en GridView2 byggs upp. Dels lagras egenskaper för varje kolumn i listan, rubrik och kolumnbredd, men även egenskaper för listan självt, till exempel dess titel. Alla dessa egenskaper lagras i tabellen tblRHGridView2 i fem kolumner:

| Kolumn | Förklaring |
| --- | :--- |
| vynamn | Databasvyn, eller i undantagsfall tabellens namn, vars data som ska visas. |
| kontrollnamn | Har det fasta värdet ”GridView”, för egenskaper som för denna, alternativt datakällans kolumnnamn. |
| egenskapNamn | Namnet på egenskapen som ska sättas |
| egenskapVarde | Värdet på egenskapen som ska sättas |
| kolumn | Nummer för vilken ordning som kolumnerna ska presenteras. Lägst nummer längst till vänster. GridView kan sättas till värdet 0. |

Om en ny webbapplikation byggs så kan det vara lämpligt att kopiera över en del egenskaper från en annan existerande applikation.

### tblInfo
I tabellen tblInfo så sätts olika dynamiska parametrar för applikationen som inte hör hemma i web.config. Tabellen innehåller i huvudsak två kolumner, varde och beskrivning och de utgör ett slags key/value par. Framförallt en egenskap måste alltid finnas, nämligen ”Version”. Denna egenskap anger versionsnumret på databasstrukturen och ska stämma överens med assemblyversion i applikationen. Kontrollen av denna version görs alltid vid programstart.

### tblBehorighet
Tabellen tblBehorighet innehåller de applikationsroller eller behörighetsgrupper som applikationen behöver. Dessa roller återkommer som kryssrutor då användaren redigeras, en kryssruta per roll. Rollernas namn ska också återfinnas i web.config som location-taggar och i web.sitemap för att styra behörigheterna.

### tblAnvandare
I tabellen tblAnvändare så lagras alla uppgifter om applikationens användare. Tabellen populeras automatiskt då användaren besöker applikationens webbplats första gången. När användaruppgifterna finns på plats i tabellen så kan dess roller redigeras i applikationens gränssnitt.

### tblAnvandareLogg
tblAnvandareLogg används för att lagra viktiga aktiviteter som användarna tagit sig för i applikationen. För t.ex. vårdvalet så finns det funktioner där användaren fastställer den månatliga utbetalningen via en knappklick. Den typen av aktiviteter lagras här.

### tblRapport
tblRapport används för att styra behörigheter till applikationens rapporter. Alla rapporter lagras för närvarande i Public vilket gör att alla användare har tillgång till alla rapporter men tillgången begränsas alltså av innehållet i denna tabell. Detta är kanske inte en optimal lösning men det är så det fungerar.

### tblRHProgress
Om webbapplikationen använder den UserControl som heter RHProgress så behövs även denna tabell, vilken håller information kring hur långt en databasoperation kommit. Det används för databasoperationer som pågår över längre tid och kanske innehåller flera steg.

### Databasvyer
Några databasvyer behövs och dessa matchar i stort sett tabellerna enligt ovan. Följande vyer måste finnas:

`vwAnvandareLista`

`vwRHGridView2`

### Lagrade procedurer
Även några lagrade procedurer måste alltid finnas:

`uspAnvandareCreateUpdate`

`uspAnvandareDelete`

`uspGridViewCreateUpdate`

`uspGridViewDelete`

## Klient-kod
Eftersom mycket av koden, som exekveras på klienten, automatiskt byggs upp med hjälp av Telerik så är inte behovet så stort att skriva egna javaskript. Vi vill undvika klientvalidering och tar hellre en extra postback.
Det finns dock en RH.js i RHStaticContent som innehåller javascript och denna laddas till alla sidor via .Master filerna. Framförallt är det sedan usercontrollen RHNotification.ascx som använder dessa skript. Via RHNotification.ascx så kan vi presentera dialogfönster till användaren, dels i code-behind, men även som OnClientClick events direkt på klienten. De senare kan exempelvis användas för att bekräfta en knapptryckning och kan ske på detta sätt:

{{< highlight csharp >}}
<telerik:RadButton ID="btnRadera" Text="Radera" OnClientClicking="RadConfirm" CommandArgument="Radera|Är du säker på att du vill radera?" OnClick="Radera_Click" Width="100px" RenderMode="Lightweight" runat="server">
{{< /highlight >}}

Metoden ”RadConfirm” finns i RH.js och tar en pipe-separerad sträng som in-parameter. Den vänstra delen ger titeln på dialogfönstret och den högra texten i fönstret.

## Exceptions och dialogfönster
Vi hanterar exceptions i gränssnittets allra flesta metoder genom try/catch block enligt nedan:

{{< highlight csharp >}}
protected void Radera_Click(object sender, EventArgs e)
{
  try
  {
    PrismodellServices service = new PrismodellServices();
    service.Delete(Id, User.Identity.Name);
    Session["RecordDeleted"] = "true";
    Session["RefreshPrismodellList"] = "true";
    Page.ClientScript.RegisterStartupScript(GetType(), "Refresh", "if (window.opener != null &&      window.opener.document.forms[0] != null && !window.opener.closed) window.opener.document.forms[0].submit();", true);
    pnlFormulär.Visible = false;
    RHNotification.ShowNotificationMessageText("Posten raderad");
  }
  catch (Exception ex)
  {
    RHNotification.ShowNotificationErrorText(ex.Message);
  }
}

{{< /highlight >}}

För själva undantagsfelet så anropar vi metoden ShowNotificationErrorText i RHNotification med undantagsfelets meddelande som in-parameter.
I exemplet ovan så talar vi även om för användaren om operationen gick bra. Även här används usercontrollen RHNotification men med metoden ShowNotificationMessageText istället och med en valfri sträng som meddelande.

| Metodnamn | Parameter | Obligatorisk | Förklaring |
| --- | --- | --- | :--- |
| ShowInformationMessageText | text | X | Text som visas |
| autoCloseDelay  |   |   | Antalet millisekunder till rutan stängs automatiskt. Defaultvärde 2 sekunder (2000 millisekunder) |
| ShowNotificationMessageText | text | X | Text som visas |
| ShowNotificationErrorText | text | X | Text som visas |

## Web.config
Web.config är ju central i alla webbapplikationer och referenser till denna finns på andra ställen i detta dokument. Vissa saker har dock inte nämnts tidigare och de återfinns här. Vi placerar connection-strängen i web.config med namnet db. Anslutningssträngen läses ut via RHCommonDAL och namnet på strängen är optional så om det inte anges så är det ”db”.
Andra inställningar under appSettings är möjligheten att fejka en användare:

{{< highlight csharp >}}
<!-- Variabel för att fejka ett HSAID (t.ex. SE2321000115-000000). OBS!!! Sätter behörighetssystemet ur spel.  -->
<add key="DefaultHSAID" value="SE2321000115-000000"/>
<!-- För normal funktion så lämnas value tomt -->
{{< /highlight >}}

Detta är förstås en väldigt kraftfull inställning som sätter behörighetssystemet ur funktion. Den får därmed inte användas i produktionsmiljön men i test- och utvecklingshänseende så kan den vara ovärderlig. Det HSAID som finns i exemplet ovan är dessutom hårdkodat i GetUser.aspx som ett undantag från uppslaget mot HAK.
En annan inställning, även den under appSettings är denna:

{{< highlight csharp >}}
<!-- Namn på SMTP Host -->
<add key="SMTPHost" value="rhmail.lthalland.se"/>
<!-- Namn på SMTP Host om server är på dmz -->
<add key="SMTPHost" value="dmzrhmail.lthalland.se"/>
{{< /highlight >}}

Inställningen sätter FQDN för den SMTPHost som används för utgående mejl.

### Debug och release.
Default i en typiskt .Net webbapplikation så finns det tre web.config filer:
web.config		Grunden och den som används vid debug i Visual Studio.
web.debug.config	Undantag från grunden för användning i testmiljö.
web.release.config	Undantag från grunden för användning i produktionsmiljö.
I de två senare filerna så specificeras undantagen från de inställningar som görs i web.config. Framförallt så byts connection-strängen ut eftersom den i princip alltid är annorlunda i test och produktion. Även funktionscertifikatens så kallade thumbprint kan också vara olika beroende på miljö, även om vi försöker använda samma certifikat i alla miljöer.
En inställning som alltid skiljer sig åt mellan miljöerna är följande:

{{< highlight csharp >}}
<!-- Ramstil som visas då applikationen körs i test- eller utvecklingsmiljö -->
<add key="border-style" value="dotted"/>
{{< /highlight >}}

Den ändras till följande i web.debug.config:

{{< highlight csharp >}}
<!-- Ramstil som visas då applikationen körs i test- eller utvecklingsmiljö -->
<add key="border-style" value="solid" xdt:Transform="Replace" xdt:Locator="Match(key)" />
{{< /highlight >}}

…och till följande I web.release.config:

{{< highlight csharp >}}
<!-- Ramstil som visas då applikationen körs i test- eller utvecklingsmiljö -->
<add key="border-style" value="none" xdt:Transform="Replace" xdt:Locator="Match(key)" />
{{< /highlight >}}

Sammantaget innebär detta att vi får en ram runt applikationen som ser olika ut beroende på var användaren befinner sig. I utvecklingsmiljön så är det en röd streckad ram, i testmiljön en heldragen röd ram och i produktionsmiljön visas ingen ram alls. Detta är förstås till för att hjälpa de användare som växlar mellan de olika miljöerna, att se skillnad på dem.

### Kryptera innehåll i web.config
Ibland behöver vi lagra känslig information i web.config och denna information ska då vara krypterad. Principen bygger på att applikationen har ett funktionscertifikat och krypteringen görs med dess publika nyckel. Den krypterade informationen läggs in i web.config och dekrypteras vid run-time . Genom att göra på detta sätt så är informationen krypterad på test- och produktionsservrarna, på våra lokala diskar samt i källkodshanteraren.
Ramverket för kryptering och dekryptering är inlagt i RHCommonComponents under projektet RhCryptographic. Projektet i sig består av en class som heter RhCryptographer och en konsolapplikation. Den senare går att köra genom att sätta projektet som ”Set as Startup Project”. Med konsolapplikationen kan information både krypteras och dekrypteras med hjälp av de certifikat som finns inlästa på den egna datorn. När applikationen körs så kan det se ut så här:


{{< figure src="/images/handbocker/utveckling/web/image007.png" >}}

Stegen är alltså dessa:

 - Välj om du vill kryptera eller dekryptera.
 - Välj vilket certifikat som ska användas.
 - Skriv in text för kryptering/dekryptering.
 - Kopiera in de två raderna, parametern för thumbprint och dess kommentar till applikationens web.config.
 - Kopiera den hemliga texten till applikationen.

Observera att du som användare måste ha läsrättigheter till den privata nyckeln för att kunna dekryptera. I test- och produktionsmiljön så måste applikationspoolskontot ha läsrättigheter till den privata nyckeln.
När informationen ska användas så kan det se ut så här i web.config:
{{< highlight csharp >}}
<configuration>
  <appSettings>
    <add key="earkivUrlExtra"    value="tkzUvFgMm69oAV9UXqkC4pYC3BZdoflxqJyKJDSMCIZVeQ6uynwthe9bPzlnJw4+8k3AA32TPw4sJy51iJsCYfeiexExs8Gk7Bo9dVKwEESmXBx5fx5djPHIGwm065KkFYPMu3C6ByEjKNuKJehLZU1NX8/mJ7E4367iavvqmfkL2aq5vUvlyJym/YS758Q6pPUGAChFb1rBjy1FqzSYT+PUmxNLeosEZg03O4JhhxH2EsgkIJUdUU7M9pLeruLzSBec5i66z1Af40A6dIo7y3PvHGsMGuF+xxg+ruoaF+EoNXwfwZUAfb7qVx6G0gqsszhysx873/R6mj7i67hEbw=="/>
    <!-- Variabel för att ange tumavtrycket för det certifikat som kan dekryptera   hemligheter i applikationen. -->
    <add key="ThumbprintEncryptionCertificate"     value="BD24B89AF2FB614F1ECF5E9EED1F6E1E068129C6"/>
  </appSettings>
</configuration>
{{< /highlight >}}

Den första parametern innehåller hemligheten och den andra innehåller tumavtrycket för certifikatet som ska användas för att dekryptera hemligheten. För att dekryptera ovanstående information så behövs endast en rad kod:
{{< highlight csharp >}}
var earkivUrlExtra = RhCryptographer.Decrypt(ConfigurationManager.AppSettings["earkivUrlExtra"], ConfigurationManager.AppSettings["ThumbprintEncryptionCertificate"]);
{{< /highlight >}}

På motsvarande sätt kan vi kryptera connectionStrings. Observera att hela connectionString är krypterad, på så sätt skyddar vi även kontonamnet och servernamnet. Den connectionString som är kommenterad finns med enbart som en jämförelse och ska inte vara så i skarp drift.
{{< highlight csharp >}}
  <connectionStrings>
    <!--<add name="db" connectionString="Data Source=LTSQLUTV4;Initial Catalog=Pillan;;User Id=PillanWebUser;Password=Pillan_q1+w2=e3" providerName="System.Data.SqlClient"/>-->
    <add name="db" connectionString="JI2rpdSWpm2Ai/BClXr7p3UqLvnke/G5t2o3zHEa4YUJuath/ncD/jDkHkXqww8p501JVgp3NDvGBMScmSHlA/S5KsvDhtoPdCujhGz34gIq5O1iq//Wzz/OyvVs/n8ZO5vXnQgINrmGXCwaeJUIEKZk7AfUQte3FeIcxuIDchfScao6ICX+5rWmENy3G9E3dHIdTP70FEeeO1Z4tOC1mwgks0jYjQER6ICjPU8p6KKnVnIBDUHpb6tniui0XghWxZYCxjhebUcC1kNxZJ1hQqp0d8XijIKISMuXBnDVHKriuPa7JazISQV4ravx2tC8TPRdr06LUQNu4ZguWGpFbA==" providerName="System.Data.SqlClient"/>
  </connectionStrings>

  <appSettings>
    <!-- Variabel för att ange tumavtrycket för det certifikat som kan dekryptera hemligheter i applikationen. -->
    <add key="ThumbprintEncryptionCertificate" value="1FDC1682268549567B3844CFC5C22E57E738F906"/>
{{< /highlight >}}

All logik som behövs för dekryptering finns redan inbyggd i ramverket. Det innebär att när vi hämtar connectionString i vår DAL så kommer ramverket att undersöka om parametern ThumbprintEncryptionCertificate finns i web.config. Om den finns så görs en dekryptering av connectionString, annars inte.
Naturligtvis går det att kryptera allt möjligt med detta ramverk. Tänk dock på att funktionscertifikaten har begränsad livslängd (ett par år) vilket gör att då certifikatet byts ut så kan det inte det nya certifikatet användas för att dekryptera information som är krypterad med det gamla certifikatet, trots att det har samma CN. Krypterad information i web.config måste alltså krypteras om när ett nytt certifikat installeras.
Information som lagras i web.config är lämpligt att kryptera på detta sätt. Metoden ska dock inte användas för att kryptera information som lagras i databas, eftersom den går förlorad den dag som certifikatet löper ut.

## Konsumera Webbtjänster Master och Hak
Två webbtjänster konsumeras flitigt från våra webbapplikationer. Det gäller webbtjänsterna för Master och HAK. För att underlätta användningen av dessa så finns ett projekt i RHCommonComponents som heter RHMasterHAK. I projektet finns servicereferenser till de båda webbtjänsterna och en C# ”wrapper” för respektive webbtjänst. Detta innebär att, då vi vill konsumera webbtjänsterna så behöver vi inte sätta upp servicereferenser i vårt projekt utan endast referera RHMasterHAK och använda de metoder som finns där i.
För att konsumera ovanstående webbtjänster så behövs också ett par inställningar i web.config. Dessa inställningar anger det så kallade tumavtrycket på de certifikat som vi vill använda då vi autentiserar vår applikation mot webbtjänsterna.

## Reporting
Ibland behövs utskriftsfunktionalitet i våra system. För detta ändamål använder vi SQL Server Reporting Services, SSRS, men vi använder inte rapportmotorn i SQL Server utan låter istället vår webbapplikation vara värd för rapporten, vilket kallas för lokal rapport. Det skiljer inte mycket mellan dessa två rapporttyper och det går att kovertera mellan dem. Den uppenbara skillnaden är dock i filändelsen som för de lokala rapporterna är rdlc, där l:et står för local.

### Design
Själva designen av rapporterna görs i Visual Studio. I rapportdesignen så finns ett en verktygslåda med standardkomponenter. För att presentera data i matrisform så använder vi komponenten Tablix, vilket motsvarar en GridView. Rapporter kan designas dels i ett grafiskt gränssnitt och dels i ett textbaserat XML-gränssnitt.

### Data till rapporten
Det finns två typer av data som vi använder till rapporter, parametrar och datatables. Parametrar används för enskilda värden och datatables för data i tabellform.
Som exempel så kan det se ut så här:

{{< highlight csharp >}}

var ansokan = _ansökanServices.GetAnsökanRapportById(Session["ansokanId"].ToString());
var reportAnsökan = new ReportDataSource("dtAnsökan", ansökan);
RHReportViewer.LocalReport.DataSources.Add(reportAnsökan);

RHReportViewer.LocalReport.SetParameters(new[] { new ReportParameter("rubrik1",
	dv[0]["rapportRubrik"].ToString(), false) });

RHReportViewer.LocalReport.SetParameters(new[] { new ReportParameter("company",
    assemblyInfo.GetAssemblyCompany()) });
SetReportParametersPerson();

{{< /highlight >}}

För att mappa kolumnerna till fält i en tablix så är det enklast att jobba i den textbaserade XML-designen. För att öppna XML-designen så är det enklaste att högerklicka på filen och välja ”Open With…”. Den delen som hanterar mappningen kan se ut så här:

{{< highlight xml >}}
  <DataSets>
    <DataSet Name="dtAnsökan">
      <Query>
  <DataSourceName>LokeWebbDataSet</DataSourceName>
  <CommandText>/* Local Query */</CommandText>
      </Query>
      <Fields>
  <Field Name="id">
    <DataField>id</DataField>
    <rd:TypeName>System.Guid</rd:TypeName>
  </Field>
  <Field Name="lmanr">
    <DataField>lmanr</DataField>
    <rd:TypeName>System.String</rd:TypeName>
  </Field>
  <Field Name="personnummer">
    <DataField>personnummer</DataField>
    <rd:TypeName>System.String</rd:TypeName>

{{< /highlight >}}

### Klassbibliotek

För att visningen av rapporten ska fungera så behövs fyra klassfiler vilka läggs till så här:

{{< figure src="/images/handbocker/utveckling/web/image008.png" >}}

Alla projekt i solution som har behov av dessa ska ha en referens till dem.


## En webbapplikation från grunden

Tack vare komponentbiblioteket ”RHCommonComponents” så sätts skelettet till en webbapplikation upp enkelt.
Innan du börjar behöver du skicka in en beställning till Server och Kommunikation av webbsajter och AD-konto för applikationspool. För att beställa certifikat för åtkomst till HAK och eventuellt till Master, så ska du vända dig till OL IT.

Nedanstående punktlista kan vara ett stöd men kanske inte en komplett guide:

{{% box %}}

1. Först se till att det kommer gå att debugga via Internet Explorer enligt nedan:
{{< figure src="/images/handbocker/utveckling/web/image009.png" >}}
2. Skapa ett nytt projekt i Visual Studio genom att välja mallen “ASP.NET Web Application”. Namnet i detta exempel kan vara ”Xyz”. Skapa projektet under ”C:\Projekt” och se till att ”Create directory for solution” är markerat, samtidigt som du kan vänta med att markera ”Add to Source Control”. Klicka därefter ”OK”. Välj den .NET-version som anges i dokumentet Baseline.
3. I nästa dialog så väljer du ”Empty” bland de mallar som är valbara. I övrigt ska inga checkboxar väljas, klicka sedan ”OK”.
4. Skapa ett nytt projekt för dataåtkomst med mallen ”Class Library (.NET framework)”. Projektet ska läggas till befintlig Solution och namnet på projekt ska vara ”XyzDal”. Suffixet ”Dal” står för ”Data Access Layer”.
5. I projektet ”XyzDal” kan du radera filen ”Class1.cs”.
6. Skapa en referens i huvudprojektet till det nyligen skapade ”Data Access Layer”.
7. Ange rätt .NET-version, ”Target Framwork”, i båda projekten till den version som anges i dokumentet Baseline.
{{< figure src="/images/handbocker/utveckling/web/image010.png" >}}
I egenskaperna för webb-projektet, välj ”Package/Publish Web” och se till att ”Configuration” för både ”Active (Debug)” och ”Release” är satt till ”All files in this project folder”.
{{< figure src="/images/handbocker/utveckling/web/image011.png" >}}
Se också till att ”Language version” är ”C# latest minor version (latest)” som återfinns under Build | Advanced…
{{< figure src="/images/handbocker/utveckling/web/image012.png" >}}
8. Skapa referenser i webb-projektet, med alternativet Browse, till följande Telerik-filer:<br>
   a) Telerik.Web.UI (i skrivande stund:
`C:\Program Files (x86)\Progress\Telerik UI for ASP.NET AJAX R3 2017\Bin40\Telerik.Web.UI.dll)`<br>
   b) Telerik.Web.UI.Skins (i skrivande stund:
`C:\Program Files (x86)\Progress\Telerik UI for ASP.NET AJAX R3 2017\Bin40\Telerik.Web.UI.Skins.dll)`
9. Skapa en ny databas på LTSQLUTV4 som heter ”Xyz”. Det räcker att bara namnge databasen och skapa den, inga andra inställningar eller justeringar behöver göras.


10.   Använd det tillhörande applikationskontot som är beställt och skapa ett nytt login (Security | Login).
{{< figure src="/images/handbocker/utveckling/web/image013.png" >}}
Om du inte hunnit få applikationspoolskontot kan du tillfälligtvis skapa ett SQL-konto som heter ”XyzWebUser” och ange ett lösenord som du lägger på minnet då detta ska användas senare. Avmarkera ”Enforce password policy”. Glöm inte ta bort det sedan.
{{< figure src="/images/handbocker/utveckling/web/image014.png" >}}
Kontot ska ha ”db_datareader”, ”db_datawriter” och ”db_executor” under ”User Mapping”. Kontot får inte vara sa och endast i undantagsfall vara owner (t.ex. om behov finns för trunkering av data). By default så kan man inte sätta ”db_executor” under ”User Mapping”, utan först behöver man köra följande skript i SSMS:

{{< highlight sql >}}
USE [Xyz]
CREATE ROLE [db_executor] AUTHORIZATION [dbo]
GO
GRANT EXECUTE ON SCHEMA::[dbo] TO [db_executor]
GO
{{< /highlight >}}

1. Kopiera följande databasobjekt från en annan databas, t ex VvFinansN:
a. tblAnvandare
b. tblAnvandareLogg
c. tblBehorighet
d. tblInfo
e. tblRHGridView2
f. vwAnvandareLista
g. uspAnvandareCreateUpdate
h. ufValidateStringLengthVsDatabase
12. I tabellen tblAnvandare så bör användaren med HSAID = SE2321000115-000000 finnas med, kan också plockas från VvFinansN.
13. I tabellen tblBehorighet så specificeras programmets roller (InterUser, ExternUser, InternSuperUser, AdminIT) och dessa kan också plockas från VvFinansN.
14. I tabellen tblInfo så ska minst en post finnas enligt nedanstående:
{{< figure src="/images/handbocker/utveckling/web/image015.png" >}}
15. Från tblRHGridView2 i VvFinansN ska poster med vynamn ”vwAnvandareLista” kopieras in till motsvarande tabell i din databas.
16. Skapa ConnectionString i web.config utifrån databasnamn och applikationskonto. Lägg även till anpassade ConnectionString i web.debug.config och web.release.config.
17. Skapa upp mappar i huvudprojektet, först en mapp ”Public” och sedan dem som ska motsvara användarnas roller. Dessa roller kan vara ”InternUser”, ”ExternUser” och ”InternSuperUser”. Namnet på mapparna ska vara detsamma som namnet på rollerna. Behörighetsstyrningen läggs in i web.config och web.sitemap, se befintliga projekt.
18. Kopiera informationen från filen ”PostBuildEvent.txt” i RHCommonComponents | RHÖvriga och lägg denna i huvudprojektets Post-build Event. Redigera informationen i texten efter kopieringen så att den stämmer med projektets syfte. Två saker behöver redigering, dels avsnittet som är unikt för varje projekt och dels avsnittet som rör Agresso-integrationen.
19. Passa också på att städa bort NuGet-paketen (två stycken i skrivande stund) som ligger i Visual Studio.
20. Kopiera följande filer manuellt via Utforskaren från RHCommonComponents | RHÖvriga:
a. AssemblyInfo.cs till Public\ en fil
b. Edit2.Master till Public\ tre filer
c. Site2.Master till Public\ tre filer
21. Ta bort skrivskyddsattributet för filerna ovan, annars blir det problem vid incheckning.
22. Lägg också till ovanstående filer i projektet.
23. Byt ut NameSpace i de kopierade filerna.
24. Kopiera även web.sitemap och komplettera denna med användarnas roller.
25. Komplettera web.config med nödvändiga parametrar för den egna applikationen, för Telerik och för eventuella rapporter. Kopiera från referensprojektet VvFinansN och ändra och ta bort så det passar för det nya projktet. Glöm inte tumavtrycken för certifikaten.
26. Komplettera web.debug.config och web.release.config med dess unika connection-string, ram-färg och eventuellt specifika tumavtryck.
27. Skapa referenser i webbprojektet till de viktigaste klassbiblioteken i ”RHCommonComponents”. Det är viktigt att ta get latest på RHCommonComponents och bygga nedanstående projekt i Release. När referensen görs så ska den vara till respektive projekts releasemapp (viktigt).
a. RHCommonBLL
b. RHGridView
c. RHCommon
d. RHHandleUser
e. RHMasterHAK
f. RHNotification
g. RHÖvriga
h. RHDatePicker
28.   Gör Rebuild på Solution två gånger efter varandra. Kontrollera ”Output” efter den andra Rebuild. Kopieringen av filer ska då inte ge några felmeddelanden.
29.   Komplettera Assembly Information så att den blir snarlik denna:
{{< figure src="/images/handbocker/utveckling/web/image016.png" >}}
30.   Testkör applikationen.
31.   Kontakta Peter Larsson för att få hjälp med att skapa upp ett nytt team-projekt i lämplig Collection. Därefter följ instruktion enligt dokumentet TFS för att anpassa Team-projektet.
32.   Checka in webb-applikationen i TFS. Detta görs genom att markera den solution som ska versionhanteras och klicka på alternativet ”Add Solution to Source Control…”.
Mycket viktigt att tänka på i detta steg är att man pekar ut rätt workspace enligt skärmdump nedan.
{{< figure src="/images/handbocker/utveckling/web/image017.png" >}}
Klicka ”OK” och gör sedan din första incheckning i ”Source Control Explorer”.

33.  Checka in databasändringarna i TFS. Detta innebär att först skapa en folder ”SQLSoureControl” direkt under rooten för din ”Source Location”.
{{< figure src="/images/handbocker/utveckling/web/image018.png" >}}
För att kunna skapa den katalogen så måste du mappa root-nivån först. Därefter högerklickar du på root-nivån och väljer ”New Folder”. När katalogen väl skapats så checkar du in den via ”Source Control Explorer”. Slutligen tar du bort mappningen till root-nivån.
Kika sedan i dokumentet SQL Redgate för vidare instruktioner för versionshantering.


{{% /box %}}

## Åtgärder vid uppdatering av en befintlig webbapplikation
I samband med att vi uppdaterar applikationer för att tillföra ny funktionalitet så finns det alltid ett antal standardåtgärder som vi ska göra. Syftet är att systemet efter lanseringen ska vara så modern som möjligt och följa vår senaste standard. Nedanstående instruktion förutsätter att Telerik finns implementerat sedan tidigare.
### Skapa en ny branch
Vi strävar efter att inte jobba i main-branch/trunk, utan tanken är att main-branch/trunk ska innehålla den kod som ligger i produktion. Det innebär att när vi ska uppdatera eller buggfixa så ska en branch skapas och det är i denna branch som utveckling sker.
### Stega upp versionsnumret
Det är lika bra att stega upp versionsnumret i din nyskapade branch på en gång så att det inte glöms bort. Och vi gör det för alla ingående delar, dvs för webbprojekt, affärslager och databaslager om det finns.
### Uppdatera Telerik-referenser
I din branch, se till att uppdatera webbprojektets Telerik-referenser så att rätt version på DLL’er används. De DLL’er som avses främst är ”Telerik.Web.UI” och ”Telerik.Web.UI.Skins”. Sen får man naturligtvis vara observant på om det finns fler.
### Uppdatera RHCommonComponents-referenser
Fortsätt med att uppdatera referenser till de viktigaste klassbiblioteken i RHCommonComponents i din utvecklingsbranch. Det är viktigt att ta hem den senaste versionen på RHCommonComponents och bygga projekten i Release. När referensen uppdaters så är det viktigt att den är till respektive projekts releasemapp. De viktigaste klassbiblioteken är:

   - RHCommonBLL
   - RHGridView
   - RHCommon
   - RHHandleUser
   - RHMasterHAK
   - RHNotification
   - RHÖvriga
   - RHDatePicker

### Kopiera post-build events
Kopiera informationen från filen ”PostBuildEvent.txt” i RHCommonComponents.RHÖvriga till din branch, och lägg denna i huvudprojektets post-build Event. Redigera informationen i texten efter kopieringen så att den stämmer med projektets syfte. Två saker behöver redigering, dels avsnittet som är unikt för varje projekt och dels avsnittet som rör Agresso-integrationen.

### Uppdatera Edit2.Master och Site2.Master
Då har turen kommit till filerna Edit2.Master och Site2.Master.

Utgå ifrån RHCommonComponents.RHÖvriga och kör en ”Get Latest Version” för att hämta hem de senaste ändringar till ditt lokala projekt. Kopiera därefter innehållet (inte filkopiering) i både .aspx- och .aspx.cs-fil för Edit2.Master respektive Site2.Master. Totalt fyra filer.

Klistra sedan in det kopierade innehållet i din branchs motsvarande filer. Efter inkopieringen så måste namespace ändras i samtliga fyra filer.

### Ta bort affärslager

Vi jobbar succesivt med att bygga bort affärsskiktet, BLL, i våra webbapplikationer, inte minst eftersom vi ytterst sällan haft anledning att lägga in någon specifik kod där. För att kunna ta bort BLL så måste vi identifiera att det inte finns någon specifik kod där men om så är fallet så måste den flyttas någon annanstans, företrädelsevis till databasen. Vidare så ska ju webbapplikationens referenser och namespace uppdateras så att det pekar direkt mot DAL. Slutligen kan projektet BLL raderas.

### Uppdatera rapportgeneratorn
Kontinuerligt pågår arbete med att byta ut vår befintliga rapportgenerator från version 10 till 14. Inte minst för att den gamla kräver lokalt installerade filer, vilket vi försöker arbeta bort i samband med införandet av Windows 10. Arbetsgången hur detta går till visas nedan. Använd VvFinansN som mall om något är oklart.

1. Ta bort alla referenser till den gamla rapportgeneratorn. Gäller de som börjar med Microsoft.Report.
2. Lägg till en lib-mapp både i solution och på motsvarande nivå i filstrukturen.
3. Kopiera in fyra DLL:er till lib-mapp från motsvarande ställe i t.ex. VvFinansN.
4. Lägg till de inkopierade filerna i solution i mappen lib.
5. Tillse att de inkopierade filerna är med i källkodshanteringen.
6. Lägg referenser från huvudprojektet till de nya DLL:erna.
7. Jämför innehållet avseende Reporting i web.config för VvFinansN och aktuellt projekt. Referenser ska finnas på totalt fem rader. Viktigt att Report kommer före Telerik och Charting.
8. Kopiera innehållet i Public/Reports/Rapportvisning.aspx från VvFinansN till aktuellt projekt. Code-behind ska inte kopieras.
9. Rapportvisning.aspx öppnas alltid i ett nytt fönster mha javaskript. I javaskriptet ställs även storleken på fönstret in. Bredden ska vara 1200 och höjden 750 för stående utskrifter.
10. Jämför innehållet i Rapportvisning.aspx med t.ex. den som finns i VvFN. Vissa justeringar kan behöva göras.

### CommonList2.aspx

CommonList2.aspx är en viktig komponent för oss som snabbt kan visualisera data i listform. Den kan dock utgöra en säkerhetsbrist eftersom den vy som ska visas syns i adressfältet. En kunnig användare kan då välja att visa en annan vy än den som föreslagits. Den vyn finns kanske under ett annat menyval och kräver där en helt annan behörighetsnivå. Detta är en säkerhetsrisk. För att balansera nyttan mot risken så ska vi helt försöka undvika att använda CommonList2.aspx i mappen Public eftersom samtliga användare har tillgång till den. Om CommonList2.aspx finns i mappen Public så ska den raderas.

### AnvändareEdit.aspx

Tillse att UserControl RHUserEdit används för standarduppgifterna.

### RadConfirm

Då behov finns av att inhämta bekräftelse från användaren så använder vi RadConfirm och där vi skickar in meddelandet som ska visas som en sträng. Tidigare så fanns flera olika varianter men med fasta texter, t.ex. RadConfirmDelete, RadConfirmTransfer, RadConfirmCreate. Samtliga dessa varianter med fasta texter önskar vi avveckla.

### Uppdatera applikationslistan

I samband med uppgradering så uppdatera förteckningen över egenutvecklade system.

## Gränssnittsdesign

Reglerna för gränssnittsdesign finns någonstans emellan de funktionella och de icke-funktionella reglerna. De är också mjukare, det vill säga inte så tvingande, regler.  Vilka regler som väljs beror från fall till fall och är en bedömningsfråga.

### Operationer som tar tid

Målet för användarupplevelsen är att användaren alltid ska känna att applikationen ”jobbar på” snarare än att applikationen ”har hängt sig”. Normalt sett så kräver de flesta operationer så kort tid så att systemutvecklaren inte behöver tänka på att göra någon särskild hantering. Nästan alla operationer föregås av att användaren klickat på en knapp eller gjort något val, via drop-down eller kryssruta. Man kan tänka sig att vi delar upp operationer i tre tidsspann och där det för varje tidsspann behöver vidtas någon åtgärd:

| Tid | Åtgärd |
| --- | --- |
| 0-5 sekunder		| Implementera SingleClick och SingleClickText på alla knappar.|
| 5-30 sekunder		| Implementera laddningsindikering via Teleriks AjaxLoadingPanel.|
| Över 30 sekunder	| Implementera RHProgress som visar händelseförloppet via stapel.|

I och med att det kortaste tidsspannet sträcker sig från 0 sekunder så innebär det i praktiken att vi alltid använder SingleClick och SingleClickText, det gäller alltså även om vi implementerar någon av de andra lösningarna. Förutom den förbättrade användarupplevelsen, med att använda SingleClick och SingleClickText, löser vi även problemet med att användaren inte kan klicka två gånger. Utan denna funktionalitet så finns det risk att användaren chokar systemet genom att klicka upprepade gånger.
## Versionshantering
Vi versionshanterar våra webbapplikationer enligt standarden Semantic Versioning, https://semver.org/ och använder egenskapsparametrarna i respektive projekt för att ange versionssiffrorna. I huvudsak handlar det om ”Assembly version” men för att få till tidsstämpel så har vi valt att även utnyttja fältet ”Trademark”. Översättningen mellan standarden för Semantic Versioning och Visual Studio blir då:





| https://semver.org/ = RH standard | Visual Studio |
| --- | --- |
| Major | Major |
| Minor | Minor |
| Patch | Build |
| Används ej | MinorRevision |
| ”alfa- och betaversioner” | Trademark |

{{< figure src="/images/handbocker/utveckling/web/image019.png" >}}

Vi använder både Assembly och File Version. Assembly Version är den som kommer att visas i programmet och File Version visas på klassbibliotekens kompilerade filer. Assembly och File Version ska alltid vara samma, både i varje projekt och mellan projekten i en Solution.
För versioner som sätts i produktion använder vi de tre textrutorna längst till vänster, major, minor och build (patch). Alla tre versionsdelarna saknar individuell övre gräns och stegs upp oberoende av varandra, vilket innebär att ett versionsnummer skulle kunna vara 1.25.104. Versionsnummer stegas enligt följande exempel:

{{< highlight array >}}
0.9.9	=>	0.9.10 (tidig version för system som aldrig produktionssatts)
1.0.0	=>	1.0.1 eller 1.1.0 eller 2.0.0 beroende på typ av förändring.
1.1.0	=>	1.1.1 eller 1.2.0 eller 2.0.0 beroende på typ av förändring.
1.1.1	=>	1.1.2 eller 1.2.0 eller 2.0.0 beroende på typ av förändring.

{{< /highlight >}}

För ”alfa- och betaversioner” använder vi en tidsstämpel till höger om samtliga versionssiffror, separerad med bindestreck. En ”alfa-/betaversion” enligt ovanstående exempel blir alltså ”1.25.104-201812101013” innan den slutgiltiga versionen 1.25.104 lanseras.
I samband med att applikationen släpps till test och/eller produktion så ska den checkas in och en label ska sättas på incheckningen. Detta görs via File | Source Control | Advanced | Apply label. En sådan label ska vara ”Version 1.25.104”.
Motsvarande värden för versionsnumrering ska användas för applikationens databas. Applikationen och dess tillhörande databas behöver dock inte ha exakt samma versionsnumrering utan har sina egna uppskrivningar av versionsnummer. Undantaget är vid ändring av major, som innebär ”breaking change” och därmed ökas major versionen. En kontroll görs automatiskt i alla våra webbapplikationer där siffran för major i applikationen jämförs med major i databasen och dessa siffror måste stämma överens. Som ”breaking change” räknas förändringar som påverkar applikationen, t.ex. en tabell som utökas med ytterligare en kolumn. Ändringar av exempelvis affärslogik, inne i en user-defined-function räknas då inte som ”breaking change”.

## Icke-funktionella krav

Icke-funktionella krav kan ses som egenskaper på ett system utöver förväntad funktionalitet. En vanlig definition är: “Med icke-funktionella krav avses egenskaper som systemet bör uppfylla, men som inte kan karaktäriseras som tjänster, såsom tillförlitlighet, användbarhet, effektivitet, kapacitet och säljbarhet”. I normalfallet så finns alltid funktionella krav på en applikation och dessa är unika för den specifika applikationen och har oftast tagits fram av en beställare. De icke-funktionella kraven är däremot gemensamma för alla applikationer som levereras.
Huruvida de funktionella kraven har uppfyllts vid en leverans kontrolleras ofta av beställaren men de icke-funktionella kraven syns sällan och de är därför svåra för en beställare att se och dessutom ägs de inte av beställaren utan av leverantören. Det är därför leverantören som måste se till att dessa krav uppfyllts, genom automatiserade eller manuella kontroller. De manuella kontrollerna görs lämpligtvis av annan person än den som gjort utvecklingen.
Icke-funktionella krav delas ofta in i kategorier och i Region Halland så jobbar vi med dessa kategorier:

- Effektivitet
   - Svarstider
* Användbarhet
   - Använder vi de gränssnittskomponenter som tagits fram gemensamt.?
* Säkerhet
   - Följer applikationen kraven enligt PDL och PUL.
* Förvaltningsbarhet
   - Håller koden den standard som vi bestämt oss för.
* Uppfyller alla krav i Resharper.
* Är alla TODO åtgärdade.
* Är alla metoder dekorerade med dokumentation.
* Är tillfälligt bortkommenterad kod hanterad.
* Interoperabilitet
   - Hur integrerar våra applikationer med andra system

I egenutvecklingen av system i Region Halland så är detta ett område att jobba vidare med.

### Resharper

I Region Halland använder vi verktyget Resharper för att bland annat hjälpa oss med kodkvalitet. Vi har anammat verktyget fullt ut och alla applikationer ska uppfylla samtliga regler i Resharper. Se dokumentation på annat ställe i detta dokument.

### TODO:
Vi använder kommentarer i koden med dekorationen TODO: för att enkelt få en Task list att arbeta efter. Vid leverans till produktion så får dock inga TODO-kommentarer finnas kvar. Om aktiviter behöver göras efter leverans så ska de istället läggas som ärenden i TFS.

### Bortkommenterad kod
Under utvecklingen så kommenterar man ofta bort kod, ibland för att testa alternativa lösningar. Bortkommenterad kod får aldrig lämnas kvar då system levereras.

## Miljöer och publicering
I alla system jobbar vi med tre miljöer, utveckling, test och produktion (drift). Anledningen till denna uppdelning är att arbete kan bedrivas i respektive miljö utan att det påverkas av varandra. En version av en applikation kan var finnas i produktion och användas av såväl interna som externa personer. En annan version kan samtidigt befinna sig i test där beställaren acceptanstestar versionen inför produktionssättning och en tredje version kan vara under utveckling.
Då webbapplikationerna körs i de olika miljöerna så syns det i form av en ram runt kanten på webbapplikationen. En streckad röd linje indikerar utvecklingsmiljön, en heldragen röd linje är testmiljön och i produktionsmiljön visas ingen ram alls.

### Web.config
Vi använder tre olika web.config-filer. Den som enbart heter web.config används i alla miljöer men med förändringsfiler för test- och produktionsmiljön, web.debug.config respektive web.release.config. Vid deployment till test och produktion så sätts ändringsfilerna samman med grundfilen och blir den miljöns web.config. Det som skiljer mellan de olika miljöerna är framförallt connection-string till databasen, parameter för ramfärg och eventuella skillnader i tumavtryck för certifikaten..

### Publicering
Publicering sker m.h.a. Visual Studios inbyggda metod. När allt är korrekt uppsatt så behöver utvecklaren endast högerklicka på huvudprojektet och välja Publish. I dialogfönstret finns då färdigdefinierade profiler för att publicera till test- eller produktionsmiljön. Eftersom alla våra webbservrar går att nå via UNC-sökvägar på vårt nätverk så publicerar vi till filsystemet. Alla webbapplikationer har en mapputdelning (share) per webbapplikation som skall användas. Vi skall inte använda administrativa share såsom C$ eller D$.

I respektive profil finns uppgift om till vilken UNC-sökväg som applikationen ska samt vilken konfiguration, debug eller release, som ska användas.
Vi publicerar alltid med våra så kallade adm-konton eftersom endast dessa har rättigheter att komma åt webbservrarna. Under ”Server Explorer” i Visual Studio så läggs applikationens UNC sökväg upp och där väljs även att autentiseringen till servern ska vara med annat konto än inloggad användare.

Vi använder en del UserControls som kopieras in till vår solution via Post-Build-skript. Dessa filer hör ju inte till projekten så därför måste en inställning göras för egenskaperna i huvudprojektet. Under fliken ”Package/Publish Web” så finns ett alternativ under rubriken ”Item sto deploy” och dess val ska vara ”All files in this project folder”. Inställningen måste göras för både debug och release.
