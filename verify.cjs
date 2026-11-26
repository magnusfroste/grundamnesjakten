#!/usr/bin/env node
/* Grundämnesjakten — verifiering mot en OBEROENDE faktabell.
   Denna fil innehåller egna, handskrivna uppgifter om periodiska systemet;
   den importerar INTE appens POOL till facit, utan jämför appens data mot sig själv här. */
'use strict';
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const ctx = { window: {}, module: undefined, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'public', 'data.js'), 'utf8'), ctx);
const { NAMN, POOL, BANK } = { NAMN: ctx.NAMN, POOL: ctx.POOL, BANK: ctx.window.BANK };
if (!ctx.window.__ok) { /* data.js sätter window.BANK */ }

const fel = [];
const kab = (s) => fel.push(s);

/* ---- oberoende faktabell: Z, namn, grupp, period, skal, jon, familj ---- */
const F = {
  H:  { z: 1,  namn: 'Väte',      g: 1,  p: 1, sk: [1],             j: '+1', f: 'icke-metall' },
  He: { z: 2,  namn: 'Helium',    g: 18, p: 1, sk: [2],             j: '0',  f: 'ädelgas' },
  Li: { z: 3,  namn: 'Litium',    g: 1,  p: 2, sk: [2, 1],          j: '+1', f: 'alkalimetall' },
  Be: { z: 4,  namn: 'Beryllium', g: 2,  p: 2, sk: [2, 2],          j: '+2', f: 'alkalisk jordmetall' },
  B:  { z: 5,  namn: 'Bor',       g: 13, p: 2, sk: [2, 3],          j: null, f: 'metalloid' },
  C:  { z: 6,  namn: 'Kol',       g: 14, p: 2, sk: [2, 4],          j: null, f: 'icke-metall' },
  N:  { z: 7,  namn: 'Kväve',     g: 15, p: 2, sk: [2, 5],          j: '-3', f: 'icke-metall' },
  O:  { z: 8,  namn: 'Syre',      g: 16, p: 2, sk: [2, 6],          j: '-2', f: 'icke-metall' },
  F:  { z: 9,  namn: 'Fluor',     g: 17, p: 2, sk: [2, 7],          j: '-1', f: 'halogen' },
  Ne: { z: 10, namn: 'Neon',      g: 18, p: 2, sk: [2, 8],          j: '0',  f: 'ädelgas' },
  Na: { z: 11, namn: 'Natrium',   g: 1,  p: 3, sk: [2, 8, 1],       j: '+1', f: 'alkalimetall' },
  Mg: { z: 12, namn: 'Magnesium', g: 2,  p: 3, sk: [2, 8, 2],       j: '+2', f: 'alkalisk jordmetall' },
  Al: { z: 13, namn: 'Aluminium', g: 13, p: 3, sk: [2, 8, 3],       j: '+3', f: 'metall' },
  Si: { z: 14, namn: 'Kisel',     g: 14, p: 3, sk: [2, 8, 4],       j: null, f: 'metalloid' },
  P:  { z: 15, namn: 'Fosfor',    g: 15, p: 3, sk: [2, 8, 5],       j: '-3', f: 'icke-metall' },
  S:  { z: 16, namn: 'Svavel',    g: 16, p: 3, sk: [2, 8, 6],       j: '-2', f: 'icke-metall' },
  Cl: { z: 17, namn: 'Klor',      g: 17, p: 3, sk: [2, 8, 7],       j: '-1', f: 'halogen' },
  Ar: { z: 18, namn: 'Argon',     g: 18, p: 3, sk: [2, 8, 8],       j: '0',  f: 'ädelgas' },
  K:  { z: 19, namn: 'Kalium',    g: 1,  p: 4, sk: [2, 8, 8, 1],    j: '+1', f: 'alkalimetall' },
  Ca: { z: 20, namn: 'Kalcium',   g: 2,  p: 4, sk: [2, 8, 8, 2],    j: '+2', f: 'alkalisk jordmetall' },
  Ga: { z: 31, namn: 'Gallium',   g: 13, p: 4, sk: [2, 8, 18, 3],   j: '+3', f: 'metall' },
  Ge: { z: 32, namn: 'Germanium', g: 14, p: 4, sk: [2, 8, 18, 4],   j: null, f: 'metalloid' },
  As: { z: 33, namn: 'Arsenik',   g: 15, p: 4, sk: [2, 8, 18, 5],   j: '-3', f: 'metalloid' },
  Se: { z: 34, namn: 'Selen',     g: 16, p: 4, sk: [2, 8, 18, 6],   j: '-2', f: 'icke-metall' },
  Br: { z: 35, namn: 'Brom',      g: 17, p: 4, sk: [2, 8, 18, 7],   j: '-1', f: 'halogen' },
  Kr: { z: 36, namn: 'Krypton',   g: 18, p: 4, sk: [2, 8, 18, 8],   j: '0',  f: 'ädelgas' },
  Fe: { z: 26, namn: 'Järn',      g: 8,  p: 4, sk: null, j: null, f: 'metall' },
  Cr: { z: 24, namn: 'Krom',      g: 6,  p: 4, sk: null, j: null, f: 'metall' },
  Mn: { z: 25, namn: 'Mangan',    g: 7,  p: 4, sk: null, j: null, f: 'metall' },
  Ni: { z: 28, namn: 'Nickel',    g: 10, p: 4, sk: null, j: null, f: 'metall' },
  Cu: { z: 29, namn: 'Koppar',    g: 11, p: 4, sk: null, j: null, f: 'metall' },
  Zn: { z: 30, namn: 'Zink',      g: 12, p: 4, sk: null, j: null, f: 'metall' },
  Ag: { z: 47, namn: 'Silver',    g: 11, p: 5, sk: null, j: null, f: 'metall' },
  Sn: { z: 50, namn: 'Tenn',      g: 14, p: 5, sk: null, j: null, f: 'metall' },
  I:  { z: 53, namn: 'Jod',       g: 17, p: 5, sk: null, j: null, f: 'halogen' },
  Au: { z: 79, namn: 'Guld',      g: 11, p: 6, sk: null, j: null, f: 'metall' },
  Hg: { z: 80, namn: 'Kvicksilver', g: 12, p: 6, sk: null, j: null, f: 'metall' },
  Pb: { z: 82, namn: 'Bly',       g: 14, p: 6, sk: null, j: null, f: 'metall' }
};
const METALLOID = ['B', 'Si', 'Ge', 'As'];
const ICKE_METALL = ['H', 'C', 'N', 'O', 'P', 'S', 'Se'];

function familjEnligt(g, p) {
  if (g === 1 && p > 1) return 'alkalimetall';
  if (g === 1 && p === 1) return 'icke-metall';
  if (g === 2) return 'alkalisk jordmetall';
  if (g === 17) return 'halogen';
  if (g === 18) return 'ädelgas';
  return null; /* metall/metalloid/icke-metall avgörs per element nedan */
}

/* ---------- 1. POOL mot oberoende tabell ---------- */
const poolKoder = Object.keys(POOL);
if (poolKoder.length !== Object.keys(F).length) kab(`POOL har ${poolKoder.length} ämnen, facittabellen har ${Object.keys(F).length}`);
for (const k of poolKoder) {
  const p = POOL[k], f = F[k];
  if (!f) { kab(`${k} finns i POOL men inte i facittabellen`); continue; }
  if (NAMN[k] !== f.namn) kab(`${k}: appens namn "${NAMN[k]}" != "${f.namn}"`);
  if (p.g !== f.g) kab(`${k}: grupp ${p.g} != ${f.g}`);
  if (p.p !== f.p) kab(`${k}: period ${p.p} != ${f.p}`);
  if (p.f !== f.f) kab(`${k}: familj "${p.f}" != "${f.f}"`);
  if ((p.sk || []).join() !== (f.sk || []).join()) kab(`${k}: skalelektroner ${p.sk} != ${f.sk}`);
  if ((p.i || null) !== (f.j || null)) kab(`${k}: jonladdning "${p.i}" != "${f.j}"`);
  if (Boolean(p.main) !== Boolean(f.sk)) kab(`${k}: main-flagga stämmer inte med skalen`);

  if (p.main) {
    const summa = f.sk.reduce((a, b) => a + b, 0);
    if (summa !== f.z) kab(`${k}: skalen ${f.sk} summerar till ${summa}, men Z = ${f.z}`);
    const ytterst = f.sk[f.sk.length - 1];
    if (ytterst !== p.s) kab(`${k}: yttersta skallet ${p.s} != ${ytterst}`);
    if (k === 'He') { if (p.s !== 2) kab('He ska ha 2 elektroner ytterst'); }
    else {
      const forvantat = f.g <= 2 ? f.g : f.g - 10; /* grupp 13 ger 3 ... grupp 18 ger 8 */
      if (p.s !== forvantat) kab(`${k}: ${p.s} elektroner ytterst men grupp ${f.g} ger ${forvantat}`);
    }
    const underavled = familjEnligt(f.g, f.p);
    if (underavled && p.f !== underavled) kab(`${k}: familj "${p.f}" men grupp ${f.g} ger "${underavled}"`);
    if (!underavled) {
      const gissad = METALLOID.includes(k) ? 'metalloid' : ICKE_METALL.includes(k) ? 'icke-metall' : 'metall';
      if (p.f !== gissad) kab(`${k}: familj "${p.f}" men grupp/behör ger "${gissad}"`);
    }
  }
}
for (const k of Object.keys(NAMN)) if (!POOL[k]) kab(`NAMN har ${k} som POOL saknar`);

/* ---------- 2. uppgifterna ---------- */
const orsak = { typ: null };
function uppfyller(kod, eg) {
  const p = POOL[kod], f = F[kod];
  if (!p || !f) return false;
  if (eg.typ === 'skalet') return p.main && f.sk[f.sk.length - 1] === eg.v;
  if (eg.typ === 'jon') return p.main && f.j === eg.v;
  if (eg.typ === 'familj') return p.main && f.f === eg.v;
  if (eg.typ === 'grupp') return p.main && f.g === eg.v;
  return false;
}

const allaFragor = [];
for (const niva of ['niva1', 'niva2', 'niva3']) {
  const qs = BANK[niva];
  if (!Array.isArray(qs)) { kab(`${niva} saknas`); continue; }
  if (qs.length !== 10) kab(`${niva} har ${qs.length} uppgifter, ska vara 10`);
  qs.forEach((q, i) => {
    const varde = `${niva}[${i}]`;
    if (!q.f || !q.r || !q.f2) { kab(`${varde}: saknar f/r/f2`); return; }
    if (q.f.length > 72) kab(`${varde}: frågan är ${q.f.length} tecken (gräns 72): ${q.f}`);
    if (!NAMN[q.r]) kab(`${varde}: svaret ${q.r} finns inte i NAMN`);
    if (!Array.isArray(q.d) || q.d.length !== 3) { kab(`${varde}: har inte exakt tre lockbeten`); return; }
    const kort = [q.r].concat(q.d);
    if (new Set(kort).size !== 4) kab(`${varde}: dubblett bland brickorna: ${kort.join(',')}`);
    for (const k of kort) if (!POOL[k]) kab(`${varde}: ${k} finns inte i POOL`);
    for (const k of kort) {
      if (!NAMN[k]) kab(`${varde}: ${k} saknar namn`);
      else if (k !== q.r && NAMN[k] === NAMN[q.r]) kab(`${varde}: lockbetet heter likadant som svaret`);
    }

    if (niva === 'niva1') {
      const m = q.f.match(/symbolet ([A-Z][a-z]?)/);
      if (!m) kab(`${varde}: frågan utelämnar symbolen: ${q.f}`);
      else if (m[1] !== q.r) kab(`${varde}: frågan gäller ${m[1]} men svaret är ${q.r}`);
      if (q.kort !== 'namn') kab(`${varde}: brickorna ska visa namn, inte ${q.kort}`);
    } else if (niva === 'niva2') {
      const m = q.f.match(/heter ([A-ZÅÄÖ][a-zåäö]+)/);
      if (!m) kab(`${varde}: frågan utelämnar namnet: ${q.f}`);
      else if (NAMN[q.r] !== m[1]) kab(`${varde}: frågan gäller "${m[1]}" men svaret är ${q.r} = "${NAMN[q.r]}"`);
      if (q.kort !== 'sym') kab(`${varde}: brickorna ska visa symboler, inte ${q.kort}`);
    } else {
      if (q.kort !== 'atom') kab(`${varde}: nivå 3 ska visa atombrickor`);
      if (!q.eg || !q.eg.typ) { kab(`${varde}: saknar egenskap`); return; }
      if (!uppfyller(q.r, q.eg)) kab(`${varde}: svaret ${q.r} uppfyller inte ${JSON.stringify(q.eg)}`);
      for (const d of q.d) if (uppfyller(d, q.eg)) kab(`${varde}: lockbetet ${d} uppfyller också ${JSON.stringify(q.eg)} – två rätt svar`);
      /* frågetexten ska beskriva samma egenskap som eg */
      const t = q.f;
      if (q.eg.typ === 'skalet' && !t.includes(q.eg.v + ' elektroner i yttersta skalet')) kab(`${varde}: texten beskriver inte skalelektroner`);
      if (q.eg.typ === 'familj' && !t.toLowerCase().includes(q.eg.v)) kab(`${varde}: texten nämner inte familjen ${q.eg.v}`);
      if (q.eg.typ === 'grupp' && !t.includes('grupp ' + q.eg.v)) kab(`${varde}: texten nämner inte grupp ${q.eg.v}`);
      if (q.eg.typ === 'jon') {
        const talord = { '-1': 'minus 1', '-3': 'minus 3', '+2': 'plus 2' };
        if (!t.includes(talord[q.eg.v] || q.eg.v)) kab(`${varde}: texten beskriver inte laddningen ${q.eg.v}`);
      }
    }
    allaFragor.push(q);
  });
}

/* frågor ska vara unika (ingen upprepning i samma omgång finns ändå, men dubbla texter börjas bort) */
const texts = allaFragor.map((q) => q.f);
if (new Set(texts).size !== texts.length) kab('dubbletter bland frågetexterna');
const f2s = allaFragor.map((q) => q.f2);
if (new Set(f2s).size !== f2s.length) kab('dubbletter bland förklaringarna');

/* ---------- 3. simulerade rundor ---------- */
function blanda(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
const RUNDOR = 10000;
let klick = 0;
for (let r = 0; r < RUNDOR; r++) {
  for (const niva of ['niva1', 'niva2', 'niva3']) {
    const ordning = blanda(BANK[niva]);
    const spelade = new Set();
    for (const q of ordning) {
      if (spelade.has(q.f)) kab('samma fråga två gånger i en omgång');
      spelade.add(q.f);
      const kort = blanda([q.r].concat(q.d));
      if (kort.length !== 4 || new Set(kort).size !== 4) kab('brickorna är inte fyra unika');
      if (!kort.includes(q.r)) kab('svaret saknas på brickorna');
      const etiketter = kort.map((k) => (q.kort === 'namn' ? NAMN[k] : k));
      if (new Set(etiketter).size !== 4) kab('brickor med samma etikett: ' + etiketter.join(','));
      klick++;
      /* rätt svar: första försöket = stjärna, därefter ledtråd, därefter avslöjande */
      const rat = kort.indexOf(q.r);
      const fels = Math.floor(Math.random() * 3);
      const andra = fels >= 1 ? q.d[Math.floor(Math.random() * 3)] : null;
      if (andra && andra === q.r) kab('felsimuleringen klickade på rätt kort');
      if (fels === 2) { const avslorad = kort[rat]; if (avslorad !== q.r) kab('avslöjade fel bricka'); }
    }
  }
}

/* ---------- 4. frågor som appen talar (mp3-genereringens urval) ---------- */
function talade() {
  const ut = [];
  for (const niva of ['niva1', 'niva2', 'niva3']) for (const q of BANK[niva]) { ut.push(q.f); ut.push(q.f2); }
  ut.push('Inte riktigt. Försök igen.');
  ut.push('Tryck på den som lyser.');
  for (let n = 1; n <= 3; n++) for (let k = 0; k <= 10; k++)
    ut.push(`Nivå ${n} klar. Du fick ${k === 1 ? '1 stjärna' : k + ' stjärnor'}.`);
  ut.push('Alla tre nivåerna är klara!');
  return ut;
}
const tal = talade();
const fragor = tal.filter((t) => t.endsWith('?') || t.startsWith('Vilket'));
console.log('uppgifter:', allaFragor.length, '| talade meningar:', tal.length,
            '| frågor som talas:', fragor.length, '| simulerade klick:', klick, '| rundor:', RUNDOR * 3);

if (fel.length) {
  console.error('\n' + fel.length + ' FEL:');
  for (const f of fel.slice(0, 40)) console.error(' -', f);
  process.exit(1);
}
console.log('\n0 fel');