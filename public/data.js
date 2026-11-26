/* Grundämnesjakten – data.
   POOL: symbol -> fakta. main = sand för nivå 3 (skal, jon, familj, grupp).
   Verifieras av verify.cjs mot en OBEROENDE faktabell.
   window.BANK: 30 färdiga uppgifter (10 per nivå), kod f, r, d, eg, f2. */

var NAMN = {
  H: 'Väte', He: 'Helium', Li: 'Litium', Be: 'Beryllium', B: 'Bor', C: 'Kol',
  N: 'Kväve', O: 'Syre', F: 'Fluor', Ne: 'Neon', Na: 'Natrium', Mg: 'Magnesium',
  Al: 'Aluminium', Si: 'Kisel', P: 'Fosfor', S: 'Svavel', Cl: 'Klor', Ar: 'Argon',
  K: 'Kalium', Ca: 'Kalcium', Ga: 'Gallium', Ge: 'Germanium', As: 'Arsenik',
  Se: 'Selen', Br: 'Brom', Kr: 'Krypton',
  Fe: 'Järn', Cu: 'Koppar', Zn: 'Zink', Ag: 'Silver', Sn: 'Tenn', I: 'Jod',
  Au: 'Guld', Hg: 'Kvicksilver', Pb: 'Bly', Ni: 'Nickel', Mn: 'Mangan', Cr: 'Krom'
};

/* huvudgrupper (1, 2, 13-18) period 1-4: skalelektroner stämmer med gruppen */
var POOL = {
  H:  { g: 1,  p: 1, s: 1, i: '+1', f: 'icke-metall',        sk: [1],              main: true },
  He: { g: 18, p: 1, s: 2, i: '0',  f: 'ädelgas',             sk: [2],              main: true },
  Li: { g: 1,  p: 2, s: 1, i: '+1', f: 'alkalimetall',        sk: [2, 1],           main: true },
  Be: { g: 2,  p: 2, s: 2, i: '+2', f: 'alkalisk jordmetall', sk: [2, 2],           main: true },
  B:  { g: 13, p: 2, s: 3, i: null, f: 'metalloid',           sk: [2, 3],           main: true },
  C:  { g: 14, p: 2, s: 4, i: null, f: 'icke-metall',         sk: [2, 4],           main: true },
  N:  { g: 15, p: 2, s: 5, i: '-3', f: 'icke-metall',         sk: [2, 5],           main: true },
  O:  { g: 16, p: 2, s: 6, i: '-2', f: 'icke-metall',         sk: [2, 6],           main: true },
  F:  { g: 17, p: 2, s: 7, i: '-1', f: 'halogen',             sk: [2, 7],           main: true },
  Ne: { g: 18, p: 2, s: 8, i: '0',  f: 'ädelgas',             sk: [2, 8],           main: true },
  Na: { g: 1,  p: 3, s: 1, i: '+1', f: 'alkalimetall',        sk: [2, 8, 1],        main: true },
  Mg: { g: 2,  p: 3, s: 2, i: '+2', f: 'alkalisk jordmetall', sk: [2, 8, 2],        main: true },
  Al: { g: 13, p: 3, s: 3, i: '+3', f: 'metall',              sk: [2, 8, 3],        main: true },
  Si: { g: 14, p: 3, s: 4, i: null, f: 'metalloid',           sk: [2, 8, 4],        main: true },
  P:  { g: 15, p: 3, s: 5, i: '-3', f: 'icke-metall',         sk: [2, 8, 5],        main: true },
  S:  { g: 16, p: 3, s: 6, i: '-2', f: 'icke-metall',         sk: [2, 8, 6],        main: true },
  Cl: { g: 17, p: 3, s: 7, i: '-1', f: 'halogen',             sk: [2, 8, 7],        main: true },
  Ar: { g: 18, p: 3, s: 8, i: '0',  f: 'ädelgas',             sk: [2, 8, 8],        main: true },
  K:  { g: 1,  p: 4, s: 1, i: '+1', f: 'alkalimetall',        sk: [2, 8, 8, 1],     main: true },
  Ca: { g: 2,  p: 4, s: 2, i: '+2', f: 'alkalisk jordmetall', sk: [2, 8, 8, 2],     main: true },
  Ga: { g: 13, p: 4, s: 3, i: '+3', f: 'metall',              sk: [2, 8, 18, 3],    main: true },
  Ge: { g: 14, p: 4, s: 4, i: null, f: 'metalloid',           sk: [2, 8, 18, 4],    main: true },
  As: { g: 15, p: 4, s: 5, i: '-3', f: 'metalloid',           sk: [2, 8, 18, 5],    main: true },
  Se: { g: 16, p: 4, s: 6, i: '-2', f: 'icke-metall',         sk: [2, 8, 18, 6],    main: true },
  Br: { g: 17, p: 4, s: 7, i: '-1', f: 'halogen',             sk: [2, 8, 18, 7],    main: true },
  Kr: { g: 18, p: 4, s: 8, i: '0',  f: 'ädelgas',             sk: [2, 8, 18, 8],    main: true },
  /* igenkänning (namn <-> symbol) – ställs aldrig i nivå 3 */
  Fe: { g: 8,  p: 4, s: null, i: null, f: 'metall', sk: null, main: false },
  Cr: { g: 6,  p: 4, s: null, i: null, f: 'metall', sk: null, main: false },
  Mn: { g: 7,  p: 4, s: null, i: null, f: 'metall', sk: null, main: false },
  Ni: { g: 10, p: 4, s: null, i: null, f: 'metall', sk: null, main: false },
  Cu: { g: 11, p: 4, s: null, i: null, f: 'metall', sk: null, main: false },
  Zn: { g: 12, p: 4, s: null, i: null, f: 'metall', sk: null, main: false },
  Ag: { g: 11, p: 5, s: null, i: null, f: 'metall', sk: null, main: false },
  Sn: { g: 14, p: 5, s: null, i: null, f: 'metall', sk: null, main: false },
  I:  { g: 17, p: 5, s: null, i: null, f: 'halogen', sk: null, main: false },
  Au: { g: 11, p: 6, s: null, i: null, f: 'metall', sk: null, main: false },
  Hg: { g: 12, p: 6, s: null, i: null, f: 'metall', sk: null, main: false },
  Pb: { g: 14, p: 6, s: null, i: null, f: 'metall', sk: null, main: false }
};

/* 30 uppgifter. kort: 'namn' (nivå 1), 'sym' (nivå 2), 'atom' (nivå 3).
   eg = den egenskap nivå 3 frågar om (verifieras mot POOL ovan + oberoende tabell). */
window.BANK = {
  niva1: [
    { f: 'Vilket grundämne har symbolet Fe?', r: 'Fe', d: ['Ni', 'Mn', 'Cr'], kort: 'namn',
      f2: 'Järn. Symbolen Fe kommer av latinet ferrum, och järn finns i blodet.' },
    { f: 'Vilket grundämne har symbolet Cu?', r: 'Cu', d: ['Zn', 'Ag', 'Au'], kort: 'namn',
      f2: 'Koppar. Symbolen Cu kommer av latinet cuprum.' },
    { f: 'Vilket grundämne har symbolet Br?', r: 'Br', d: ['B', 'Cl', 'Kr'], kort: 'namn',
      f2: 'Brom. Ett halogen i grupp 17, som klor och fluor.' },
    { f: 'Vilket grundämne har symbolet Na?', r: 'Na', d: ['Ne', 'K', 'Ca'], kort: 'namn',
      f2: 'Natrium. Vi äter det varje dag – det är halvva bordsaltet.' },
    { f: 'Vilket grundämne har symbolet S?', r: 'S', d: ['Se', 'Si', 'P'], kort: 'namn',
      f2: 'Svavel. Grundämne 16 i period 3, det som luktar ägg.' },
    { f: 'Vilket grundämne har symbolet K?', r: 'K', d: ['Kr', 'Ca', 'Na'], kort: 'namn',
      f2: 'Kalium. K är latinet kalium – finnes i potatis och bananer.' },
    { f: 'Vilket grundämne har symbolet O?', r: 'O', d: ['S', 'Se', 'Cl'], kort: 'namn',
      f2: 'Syre. Luftens andra stora del, den vi behöver för att andas.' },
    { f: 'Vilket grundämne har symbolet P?', r: 'P', d: ['F', 'Fe', 'B'], kort: 'namn',
      f2: 'Fosfor. Namnet kommer av grekiskans ljusbärare.' },
    { f: 'Vilket grundämne har symbolet Cl?', r: 'Cl', d: ['Cr', 'C', 'Kr'], kort: 'namn',
      f2: 'Klor. Halogen i period 3 – samma familj som fluor och brom.' },
    { f: 'Vilket grundämne har symbolet Ca?', r: 'Ca', d: ['K', 'C', 'Kr'], kort: 'namn',
      f2: 'Kalcium. Bygger ben och tänder, av latinet kalk.' }
  ],
  niva2: [
    { f: 'Vilket grundämne heter Kisel?', r: 'Si', d: ['S', 'Se', 'Sn'], kort: 'sym',
      f2: 'Si. Kisel är halvledaren – det mesta elektroniken bygger på det.' },
    { f: 'Vilket grundämne heter Klor?', r: 'Cl', d: ['Cr', 'C', 'Ca'], kort: 'sym',
      f2: 'Cl. Klor håller rent i simhallar.' },
    { f: 'Vilket grundämne heter Svavel?', r: 'S', d: ['Se', 'Si', 'Sn'], kort: 'sym',
      f2: 'S. Svavel är gult och sitter i ägg och svavellågor.' },
    { f: 'Vilket grundämne heter Kalium?', r: 'K', d: ['Kr', 'Ca', 'C'], kort: 'sym',
      f2: 'K. Därför skrivs kalium med K och inte med P.' },
    { f: 'Vilket grundämne heter Neon?', r: 'Ne', d: ['Na', 'Ni', 'He'], kort: 'sym',
      f2: 'Ne. Neon reagerar inte med något – därför lyser skyltarna länge.' },
    { f: 'Vilket grundämne heter Kväve?', r: 'N', d: ['Na', 'Ni', 'Ne'], kort: 'sym',
      f2: 'N. Kväve är 78 procent av luften.' },
    { f: 'Vilket grundämne heter Aluminium?', r: 'Al', d: ['Ag', 'Ar', 'Au'], kort: 'sym',
      f2: 'Al. Det vanligaste metallet i jordskorpan.' },
    { f: 'Vilket grundämne heter Krypton?', r: 'Kr', d: ['K', 'Ca', 'Cl'], kort: 'sym',
      f2: 'Kr. En ädelgas i grupp 18, och ett av supermans hemland.' },
    { f: 'Vilket grundämne heter Bor?', r: 'B', d: ['Be', 'Br', 'C'], kort: 'sym',
      f2: 'B. Bor ligger mellan metallerna och gaserna, i grupp 13.' },
    { f: 'Vilket grundämne heter Fluor?', r: 'F', d: ['Fe', 'Br', 'P'], kort: 'sym',
      f2: 'F. Fluor klistrar starkast på elektroner av alla grundämnen.' }
  ],
  niva3: [
    { f: 'Vilket grundämne tillhör familjen alkalimetaller?', r: 'Na', d: ['Ca', 'Cl', 'He'],
      kort: 'atom', eg: { typ: 'familj', v: 'alkalimetall' },
      f2: 'Sant. Natrium ligger i grupp 1 och avgir en elektron lätt.' },
    { f: 'Vilket grundämne bildar en jon med laddning minus 1?', r: 'Br', d: ['S', 'Ar', 'Mg'],
      kort: 'atom', eg: { typ: 'jon', v: '-1' },
      f2: 'Rätt. Brom är halogen och tar gärna emot en elektron.' },
    { f: 'Vilket grundämne har 6 elektroner i yttersta skalet?', r: 'O', d: ['C', 'Ne', 'Na'],
      kort: 'atom', eg: { typ: 'skalet', v: 6 },
      f2: 'Rätt. Syre ligger i grupp 16 – därför blir det sex ytterst.' },
    { f: 'Vilket grundämne ligger i grupp 18?', r: 'Kr', d: ['Cl', 'Na', 'S'],
      kort: 'atom', eg: { typ: 'grupp', v: 18 },
      f2: 'Rätt. Krypton är en ädelgas – yttersta skalet är fullt.' },
    { f: 'Vilket grundämne har 7 elektroner i yttersta skalet?', r: 'F', d: ['O', 'Ne', 'P'],
      kort: 'atom', eg: { typ: 'skalet', v: 7 },
      f2: 'Rätt. Fluor är halogen – en elektron saknas till fullt skal.' },
    { f: 'Vilket grundämne bildar en jon med laddning plus 2?', r: 'Ca', d: ['K', 'Al', 'Cl'],
      kort: 'atom', eg: { typ: 'jon', v: '+2' },
      f2: 'Rätt. Kalcium är alkalisk jordmetall i grupp 2.' },
    { f: 'Vilket grundämne tillhör familjen ädelgaser?', r: 'Ar', d: ['K', 'Na', 'Br'],
      kort: 'atom', eg: { typ: 'familj', v: 'ädelgas' },
      f2: 'Rätt. Argon reagerar knappt med något alls.' },
    { f: 'Vilket grundämne har 4 elektroner i yttersta skalet?', r: 'Si', d: ['P', 'S', 'He'],
      kort: 'atom', eg: { typ: 'skalet', v: 4 },
      f2: 'Rätt. Kisel ligger i grupp 14.' },
    { f: 'Vilket grundämne bildar en jon med laddning minus 3?', r: 'P', d: ['S', 'Cl', 'Na'],
      kort: 'atom', eg: { typ: 'jon', v: '-3' },
      f2: 'Rätt. Fosfor ligger i grupp 15 och tar emot tre elektroner.' },
    { f: 'Vilket grundämne ligger i grupp 16?', r: 'S', d: ['Cl', 'Ar', 'K'],
      kort: 'atom', eg: { typ: 'grupp', v: 16 },
      f2: 'Rätt. Svavel ligger i syrgaserna, tillsammans med syre.' }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NAMN: NAMN, POOL: POOL, BANK: window.BANK };
}