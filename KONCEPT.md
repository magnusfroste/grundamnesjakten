# Grundämnesjakten – koncept och testplan

## 1. Mål (en sak per app)
Identifiera grundämnen: koppla symbol ↔ svenskt namn ↔ egenskap (jon, skal­elektroner,
familj, grupp) på det periodiska systemets villkor. Ingen beräkning, inga reaktioner,
inga molekyler – bara *vem är det här ämnet och vad kännetecknar det*.

## 2. Målgrupp och årskurs
Åk 7–9 (12–15 år, men spelbart från ca 9). Engelska/svenska gränssnitt: svenskt genom
("du"), å ä ö, decimaler med komma.

## 3. Kärnmekanik (touch först)
Fråga + fyra brickor att trycka på. Samma mekanik hela tiden, bara frågan förändras:

- **Nivå 1 – symbol → namn.** Frågan visar symbolen i stort (`Br`). Brickorna visar
  **bara namn** (Brom, Klor, Bor…). Ingen symbol på brickorna, annars blir det en
  ögonmatchning.
- **Nivå 2 – namn → symbol.** Frågan visar det svenska namnet. Brickorna visar
  **bara symboler** (Cr, Cl, C…).
- **Nivå 3 – egenskap → ämne.** Frågan är en svensk mening ("Bildar en jon med
  laddning −1."). Brickorna visar **symbol + namn** – men egenskapen står inte på
  brickan, så kunskapen måste finnas i huvudet.

Lockbetena är avsiktliga: närliggande symboler (K / Ca / Kr, Cr / Cl), samma grupp
två gånger om i namnfrågor, och i nivå 3 **aldrig** en bricka som också uppfyller
villkoret (verifieras maskinellt).

Allt är ett tryck. Ingen tid, inga liv, inget förlustläge: fel kostar en ledtråd,
efter två felklick lyser rätt bricka och förklaringen läses upp.

## 4. Femminuterssession
10 uppgifter per nivå, tre nivåer, ca 30 tryck. En stjärna per rätt på första
försöket (max 30), "Nästa nivå" och "Spela igen".

## 5. Belöning barnet kan berätta om
"Jag fick 8 av 10 stjärnor i symboljakten" – antal stjärnor per nivå + totalen.

## 6. Vad barnet lär
Att läsa periodiska systemets symboler, att symbolen pekar ut namnet, och att en
atoms egenskaper (skalelektroner, jonladdning, familj, grupp) går att läsa av direkt
ur systemet.

## 7. Lgr22 (citeras ordagrant från get_curriculum, Skolverket Syllabus API, hämtad 2026-11-23)
- **KE.7-9.1.1** – ”Grundämnen, molekyl- och jonföreningar samt hur ämnen omvandlas
  genom kemiska reaktioner. Atomer, elektroner och kärnpartiklar.”
  (Kommentar: två meningar ur acentexten, hämtade ur get_curriculum och kopierade
  ordagrant – de används som citat på startsidan.)

## 8. Varför det funkar på iPad
Fyra stora brickor (≥72 px på iPad liggande, 2×2 i stående och på telefon), allt på
en skärm utan scroll, en tumme räcker, frågan skrivs ut OCH läses upp (mp3), och den
miniatyriseerade atomen till höger visar svaret visuellt i stället för som text.

## 9. Tom cell / lucka det fyller (mätt på admin-ytan 2026-11-26, 88 rader)
- Kemin finns bara som del av STEM (18 rader); **7–9-kemin är två appar** – Balansera
  (ekvationer) och Molekylbyggaren (bindningar). Ingen app tränar **identifiering av
  grundämnen**, det vanligaste minneskravet i ett kemiprov.
- Lockbete: KE.7-9.1.1 är använd av 2 rader, men hela övriga KE.7-9 (1.2–1.8, 2.1,
  2.3) är 0 av 88. Vi lämnar 1.2 (pH) till nästa körning i stället för att tvinga en
  passform; **ingen app täcker 7–9:s atomsymboler**.
- Ingen idé motsvarar facken exakt förutom öppna katalogidén
  **"Grundämnesjakten – periodiska systemet som Seterra"** (status: open, Kemi) –
  mekaniken är Seterra (Marianne Wartoft, finns i svenska-utvecklare.md): en fråga i
  taget, tryck på rätt ruta, direkt återkoppling, tider som slås. Hos oss: inga tider
  (7–9-regeln säger inget tidsabsolutism utan klocka som dömer).

## 10. TESTPLAN (mätbara krav, sätts före kod)
1. **Spelbart med bara fingrar:** alla svarsklick via `Input.dispatchTouchEvent`;
   varje svarsknapp ≥72 px bred och ≥56 px hög på 1024×768, ≥72 px på 390×844.
2. **Allt ryms:** `scrollHeight - innerHeight == 0` och
   `scrollWidth - innerWidth == 0` i 1024×768, 768×1024, 390×844, 1440×900 – både på
   startskärmen och i spelet (mätt efter att `#startskarm` dolts).
3. **Svensk text i barnets nivå:** frågor ≤ 60 tecken, "du", å ä ö; allt som sägs
   står också skrivet (minst en mp3-anrop i webbläsaren per påbörjad nivå,
   `performance.getEntriesByType('resource')` filtrerat på `\.mp3`).
4. **Återkoppling + nytt försök:** ett felklick flyttar **inte** uppgiften, ger
   "Inte riktigt. Försök igen."; efter två fel lyser rätt bricka med puls och
   förklaringen läses upp; rätt på första försöket ger stjärna.
5. **Ingen inloggning/reklam/länkar ut:** `check_app` `no_login`, `no_links_out`,
   `no_tracking`, `own_files` ska vara ok; enda externa skriptet är katalogens
   `kotten.js`-kodsnut (tillåten av guiden).
6. **Riktiga fakta:** `node verify.cjs` jämför varje uppgift mot en **oberoende**
   faktabell (namn, grupp, familj, skal­elektroner, jon) – svaret uppfyller
   villkoret, **ingen av de tre lockbrickorna** gör det, symbol≠namn aldrig dubblett,
   10 000 simulerade rundor utan dubbletter. Felantal 0.
7. **Inga dödade layouter:** mätningar av knapparnas `getBoundingClientRect()` ska
   ligga inom viewporten i alla fyra storlekarna.

## 11. VALIDERING (avsett: delegate_task med en andra agent)
`delegate_task` finns **inte** i den här miljön (verktygsregister: 172 verktyg, ingen
subagent att delegera till – sökt på fyra sätt). Ersättes med en skriftlig hård
självkritik ställd mot de tre frågorna:

- **(a) Skulle ett barn frivilligt spela det 5 minuter?** Ja: 30 tryck, stjärnor per
  nivå, "Spela igen", atomen som ritas upp efter rätt svar är en belöning i sig.
  Risk: nivå 1 är ostadig (symbol→namn är/INFOsearch) – mildras genom att brickorna saknar
  symboler helt, så det inte går att gissa på form.
- **(b) Träffar det ett verkligt kunskapskrav?** Ja: KE.7-9.1.1 citeras ordagrant och
  ämnesidentifiering är det som provet förutsätter innan reaktioner går att skriva.
  Svaghet: punkten delas med Balansera/Molekylbyggaren – motivering står i §9.
- **(c) Teknisk risk?** Låg: ren statisk app, ingen fysik, inget canvas-spel, bara
  DOM-klick. Största risken är mp3-genereringen (edge-tts) och att lagret hamnar på
  fel fråga – skyddas av `mp3.py` som läser **data.js** (inte koden) och av kravet
  att räkna mp3-anrop i webbläsaren, inte 200-svar.

**Beslut: GO.**

## 12. Kottenmaskoten
Egen SVG, samma figur och färger som resten av familjen: glad (rätt), funderande
(fel), firande (nivå klar), nyfiken (start), imponerad (10 av 10). Aldrig dömande.