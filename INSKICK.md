# Grundämnesjakten – underlag för publicering

- **Titel:** Grundämnesjakten
- **Kort beskrivning (max 500):** Frågan gäller ett grundämne: först symbol till namn,
  sedan namn till symbol, sedan egenskaper som familj, grupp, skalelektroner och jon.
  Fyra brickor, en omgång, inga tider. Kemi åk 7–9.
- **URL:** https://grundamnesjakten.shipholm.dev (katalogens adress: https://grundamnesjakten.skolappar.org)
- **Ämne / årskurs / typ / enhet:** STEM / 7–9 / Öva / Alla enheter
- **Lgr22:** KE.7-9.1.1 – ”Grundämnen, molekyl- och jonföreningar samt hur ämnen omvandlas
  genom kemiska reaktioner. Atomer, elektroner och kärnpartiklar.”
  (Skolverket, Syllabus API, hämtad 2026-11-23; citerat ordagrant på appens startsida
  under ”För lärare”.)
- **Kortbild:** `public/kort.png`, 1200×900 (4:3), spelmoment i nivå 3: frågan om
  jonladdning, fyra atombrickor, rätt svar markerat med atomritningen bredvid.
  Inget pålagt namn, ingen startskärm, ingen meny.
- **Creator:** LiteIT
- **Katalograd:** (fylls i efter create_app)
- **check_app:** (fylls i efter deploy)

## Long description

Grundämnesjakten tränar det som måste sitta innan kemiprov: att en symbol pekar ut ett
namn, och att familj, grupp, antal elektroner i yttersta skal och vanligast jonladdning går
att läsa av direkt ur det periodiska systemet.

En mekanik hela tiden – fråga och fyra brickor att trycka på – men frågan växer över tre
nivåer med tio uppgifter var:

- Nivå 1 – symbol till namn: frågan visar symbolen, brickorna visar bara namn.
- Nivå 2 – namn till symbol: frågan visar det svenska namnet, brickorna visar bara symboler.
- Nivå 3 – egenskap till ämne: frågan är en mening om familj, grupp, skalelektroner eller
  jonladdning, och brickorna visar symbol och namn.

Svaret står aldrig på brickan. Lockbetena ligger nära (K, Ca och Kr; Cr, Cl och C), och i
nivå 3 finns ingen bricka som också uppfyller frågans villkor – appen kontrollerar det mot
en separat faktabell (`verify.cjs`, 10 000 simulerade omgångar, 0 fel).

Fel kostar ingenting: ett felklick ger en ledtråd, efter två försök lyser rätt bricka och
barnet trycker på den. Stjärnan får man om man svarar rätt på första försöket. Varje rätt
svar ritar atomens skal med elektroner runt kärnan och förklarar varför på svenska – allt
ljud är färdiga mp3-filer (96 stycken), så appen talar även på en tyst platta med
talsyntes avstängd. Kotten, katalogens maskot, funderar, hejar och firar.

Ingen inloggning, ingen reklam, inga länkar ut, inga barnuppgifter. Allt är lokal kod och
lokala filer.

## Fakta och källor

Symboler, svenska namn, grupp, period, elektroner i yttersta skal och vanligaste
jonladdningen är ordinarie data ur det periodiska systemet. Uppgifterna i appen
(`public/data.js`) kontrolleras av `verify.cjs` mot en skriven facittabell där varje atoms
skal summerar till rätt atomnummer och varje familj härleds ur gruppen. Lgr22-citatet är
kopierat ordagrant ur Skolverkets Syllabus API (hämtad 2026-11-23). Uppgifterna är skrivna
för appen – inga texter är hämtade från andra.

## Testbevis

- `node verify.cjs`: 30 uppgifter, 96 talade meningar, 30 000 simulerade omgångar /
  300 000 klick, 0 fel.
- Hela rundan spelad i webbläsare: nivå 1 (10/10, 10 stjärnor), nivå 2 (10/10),
  nivå 3 (10/10) – "Alla tre nivåerna" + 30 stjärnor; felvägen prövad (1 fel gav ledtråd
  utan att uppgiften flyttade sig, 2 fel tände rätt bricka).
- mp3-bevis: 63 mp3-anrop i `performance.getEntriesByType('resource')` under en rundh,
  plus 22 under en annan – inget talsyntesbehov.
- 0 px scroll (både startskärm och spel) i 1024×768, 768×1024, 390×844 och 1440×900;
  inga element utanför viewporten, ingen klippt text, inga överlappande brickor.
  Brickor 227×168 px (iPad liggande), 178×218 px (390 px telefon), 354×294 (iPad stående).
- Inmatning: `Input.dispatchTouchEvent` flyttade frågan första korten av rundan (fel- och
  rättsvar), sedan svarade kanalen inte längre (timeout både för touch och mus) och
  återstående klick gjordes med `element.click()` på samma brickor – det bevisar
  click-handlern, inte multitouch.