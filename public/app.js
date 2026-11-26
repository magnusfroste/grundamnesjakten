/* Grundämnesjakten — identifiera grundämnen, kemi åk 7–9.
   En mekanik: fråga + fyra brickor. Ingen tid, inga liv. */
(function () {
  'use strict';
  var S = { ljud: true, niva: 1, index: 0, stjarnor: 0, totala: 0,
            forsta: true, last: false, fel: 0, rader: [], svar: [] };
  window.__gaj = S; /* speltest: läsbart tillstånd */

  var $ = function (s) { return document.querySelector(s); };
  var el = {
    start: $('#startskarm'), spel: $('#spel'),
    frag: $('#fraga'), fragTexte: $('#fragTexte'), storSym: $('#storSym'),
    alt: $('#alternativ'), aterkoppling: $('#aterkoppling'), visning: $('#visning'),
    nivaText: $('#nivaText'), stjarnText: $('#stjarnText'), prickar: $('#prickar'),
    klart: $('#klart'), klartTitel: $('#klartTitel'), klartText: $('#klartText'),
    klartStjarnor: $('#klartStjarnor'), klartKnapp: $('#klartKnapp'), klartIgen: $('#klartIgen'),
    ljud: $('#ljud'), framsteg: $('#framsteg'), kotten: $('#kotten')
  };
  var reducerad = false;
  try { reducerad = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---------- ljud ---------- */
  var ljudCtx = null;
  function blipp(freq, slag, tid, volym) {
    if (!S.ljud) return;
    try {
      if (!ljudCtx) ljudCtx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ljudCtx.createOscillator(), g = ljudCtx.createGain();
      o.type = slag || 'triangle';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ljudCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(volym || 0.14, ljudCtx.currentTime + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, ljudCtx.currentTime + (tid || 0.2));
      o.connect(g); g.connect(ljudCtx.destination);
      o.start(); o.stop(ljudCtx.currentTime + (tid || 0.2) + 0.03);
    } catch (e) {}
  }
  function tal(text) {
    if (!S.ljud) return;
    try { if (typeof window.__rost === 'function' && window.__rost(text)) return; } catch (e) {}
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'sv-SE'; u.rate = 0.98; u.pitch = 1.03;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
  window.addEventListener('pointerdown', function enGang() {
    try { if (ljudCtx && ljudCtx.state === 'suspended') ljudCtx.resume(); } catch (e) {}
    window.removeEventListener('pointerdown', enGang);
  });

  /* ---------- Kotten ---------- */
  function kottenSvg(slag) {
    var kunskap = {
      glad:     { ov: 0,  mun: 'le'   },
      funderar: { ov: 1,  mun: 'krok' },
      firar:    { ov: -1, mun: 'gap'  },
      nyfiken:  { ov: -1, mun: 'o'    },
      imponerad:{ ov: 0,  mun: 'le'   }
    };
    var t = kunskap[slag] || kunskap.glad;
    var spridd = t.ov === 1 ? 4 : 0;
    var mun = t.mun;
    return '' +
      '<ellipse cx="60" cy="86" rx="38" ry="42" fill="#8C5A34"/>' +
      '<path d="M26 96 q34 -14 68 0" stroke="#6E4225" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M30 78 q30 -13 60 0" stroke="#6E4225" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M36 62 q24 -11 48 0" stroke="#6E4225" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M44 122 q16 -7 32 0" stroke="#6E4225" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      (slag === 'imponerad' ? '<path d="M60 34 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2z" fill="#E9B23C"/>' : '') +
      '<circle cx="46" cy="66" r="13" fill="#FFFDF7" stroke="#3A2718" stroke-width="3"/>' +
      '<circle cx="76" cy="66" r="13" fill="#FFFDF7" stroke="#3A2718" stroke-width="3"/>' +
      '<circle cx="' + (46 + (slag === 'nyfiken' ? 4 : 0)) + '" cy="' + (66 + (t.ov === 1 ? 3 : 0)) + '" r="6" fill="#222"/>' +
      '<circle cx="' + (76 + (slag === 'nyfiken' ? 4 : 0)) + '" cy="' + (66 + (t.ov === 1 ? 3 : 0)) + '" r="6" fill="#222"/>' +
      '<path d="M33 ' + (52 - spridd - (t.ov < 0 ? -3 : 0)) + ' q13 -7 25 ' + (t.ov > 0 ? 5 : (t.ov < 0 ? -4 : 0)) + '" stroke="#3A2718" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M89 ' + (52 - spridd - (t.ov < 0 ? -3 : 0)) + ' q-13 -7 -25 ' + (t.ov > 0 ? 5 : (t.ov < 0 ? -4 : 0)) + '" stroke="#3A2718" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      (mun === 'le'  ? '<path d="M46 86 q14 14 28 0" stroke="#3A2718" stroke-width="4.5" fill="none" stroke-linecap="round"/>' : '') +
      (mun === 'o'   ? '<ellipse cx="60" cy="88" rx="7" ry="9" fill="#3A2718"/>' : '') +
      (mun === 'krok'? '<path d="M47 90 q8 -7 16 1 q5 5 11 -2" stroke="#3A2718" stroke-width="4.5" fill="none" stroke-linecap="round"/>' : '') +
      (mun === 'gap' ? '<path d="M44 82 q16 24 32 0 z" fill="#3A2718"/>' : '');
  }
  function sattKotten(slag) { el.kotten.innerHTML = kottenSvg(slag); }

  /* ---------- atomritning (endast bild, inga tapperare) ---------- */
  function ritaAtom(sym) {
    var p = POOL[sym];
    if (!p || !p.sk) {
      return '<div class="chip"><strong>' + sym + '</strong><span>grupp ' + p.g + ' · period ' + p.p + '</span></div>';
    }
    var rings = p.sk.length;
    var radie = [0, 0, 17, 28, 39, 48];
    var s = '<svg viewBox="0 0 120 120" class="atom">';
    for (var n = rings; n >= 1; n--) {
      var rr = radie[n] || (12 + n * 11);
      s += '<circle cx="60" cy="60" r="' + rr + '" fill="none" stroke="#DDE1D6" stroke-width="2.5"/>';
      var antal = p.sk[n - 1];
      for (var e = 0; e < antal; e++) {
        var vinkel = (Math.PI * 2 * e) / antal + n * 0.5;
        var x = 60 + rr * Math.cos(vinkel), y = 60 + rr * Math.sin(vinkel);
        s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4.5" fill="#0F5F6B"/>';
      }
    }
    s += '<circle cx="60" cy="60" r="15" fill="#E9B23C"/>';
    s += '<text x="60" y="65" text-anchor="middle" font-size="15" font-weight="700" fill="#22302F">' + sym + '</text>';
    s += '<text x="60" y="115" text-anchor="middle" font-size="12" fill="#5B6B6A">' + p.sk.join(',') + '</text>';
    return s + '</svg>';
  }

  /* ---------- spelmekanik ---------- */
  function blanda(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  function visaPrickar() {
    var n = S.rader.length, i, d;
    el.prickar.innerHTML = '';
    for (i = 0; i < n; i++) {
      d = document.createElement('span');
      d.className = 'prick' + (i < S.index ? ' klar' : '') + (i === S.index ? ' nu' : '');
      el.prickar.appendChild(d);
    }
    el.framsteg.style.width = Math.round((S.index / n) * 100) + '%';
  }

  function textPa(kort, kod) {
    if (kort === 'namn') return NAMN[kod];
    if (kort === 'sym') return kod;
    return kod;
  }

  function visaFraga() {
    var q = S.rader[S.index];
    S.forsta = true; S.last = false; S.fel = 0;
    el.frag.classList.remove('svarad');
    el.aterkoppling.textContent = ''; el.aterkoppling.className = '';
    el.visning.innerHTML = ''; el.visning.className = '';
    el.fragTexte.textContent = q.f;
    el.storSym.hidden = q.kort !== 'sym';
    el.nivaText.textContent = 'Nivå ' + S.niva;
    el.stjarnText.textContent = S.stjarnor;
    sattKotten('nyfiken');

    var val = blanda([q.r].concat(q.d));
    S.kort = val;
    el.alt.innerHTML = '';
    val.forEach(function (kod) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'kort ' + q.kort;
      var namn = NAMN[kod], p = POOL[kod];
      if (q.kort === 'namn') {
        b.innerHTML = '<span class="namn">' + namn + '</span>';
        b.setAttribute('aria-label', namn);
      } else if (q.kort === 'sym') {
        b.innerHTML = '<span class="sym">' + kod + '</span>';
        b.setAttribute('aria-label', 'Symbolen ' + kod + ', ' + namn);
      } else {
        b.innerHTML = '<span class="sym">' + kod + '</span><span class="namn">' + namn + '</span>';
        b.setAttribute('aria-label', namn + ', symbolen ' + kod);
      }
      b.addEventListener('click', function () { valj(kod, b); });
      el.alt.appendChild(b);
    });

    visaPrickar();
    tal(q.f);
    if (window.skolappar && window.skolappar.event) window.skolappar.event('round_start');
  }

  function valj(kod, knapp) {
    if (S.last) return;
    var q = S.rader[S.index];
    if (kod === q.r) {
      S.last = true;
      knapp.classList.add('ratt');
      Array.prototype.forEach.call(el.alt.children, function (b) {
        b.disabled = true;
        if (b !== knapp) b.classList.add('slocknad');
      });
      el.frag.classList.add('svarad');
      if (S.forsta) { S.stjarnor++; S.totala++; }
      el.stjarnText.textContent = S.stjarnor;
      el.aterkoppling.textContent = q.f2;
      el.aterkoppling.className = 'visa';
      el.visning.innerHTML = ritaAtom(q.r);
      el.visning.className = 'visa';
      sattKotten(S.stjarnor >= 8 ? 'imponerad' : 'glad');
      blipp(660, 'triangle', 0.16); setTimeout(function () { blipp(880, 'triangle', 0.22); }, 120);
      tal(q.f2);
      if (window.skolappar && window.skolappar.event) window.skolappar.event('round_done', 100);
      S.svar.push({ i: S.index, ratt: true, forsta: S.forsta });
      setTimeout(nasta, 2100);
    } else {
      S.forsta = false; S.fel++;
      knapp.classList.add('fel');
      blipp(220, 'sine', 0.18, 0.1);
      if (navigator.vibrate) { try { navigator.vibrate(40); } catch (e) {} }
      setTimeout(function () { knapp.classList.remove('fel'); }, 900);
      if (window.skolappar && window.skolappar.event) window.skolappar.event('hint');
      if (S.fel === 1) {
        el.aterkoppling.textContent = 'Inte riktigt. Titta på brickorna och prova igen.';
        el.aterkoppling.className = 'visa';
        tal('Inte riktigt. Försök igen.');
      } else {
        var riktig = null;
        Array.prototype.forEach.call(el.alt.children, function (b, i) {
          b.disabled = true;
          if (S.kort[i] === q.r) { riktig = b; b.disabled = false; }
          if (b !== riktig) b.classList.add('slocknad');
        });
        if (riktig) riktig.classList.add('traad');
        el.frag.classList.add('svarad');
        el.aterkoppling.textContent = 'Denna bricka lyser. Tryck på den.';
        el.aterkoppling.className = 'visa';
        el.visning.innerHTML = ritaAtom(q.r);
        el.visning.className = 'visa';
        sattKotten('funderar');
        tal('Tryck på den som lyser.');
      }
    }
  }

  function nasta() {
    S.index++;
    if (S.index >= S.rader.length) { klart(); return; }
    visaFraga();
  }

  function klart() {
    var n = S.rader.length;
    var ratt = S.svar.filter(function (s) { return s.ratt; }).length;
    var antal = S.stjarnor;
    el.klartStjarnor.textContent = antal > 0 ? '⭐'.repeat(antal) : '–';
    el.klartTitel.textContent = 'Nivå ' + S.niva + ' klar!';
    el.klartText.textContent = ratt + ' av ' + n + ' rätt. ' +
      (S.niva < 3 ? 'Nästa nivå väntar.' : 'Du har klarat alla tre nivåerna – ' + S.totala + ' stjärnor.');
    el.klartKnapp.textContent = S.niva < 3 ? 'Nästa nivå' : 'Spela igen';
    el.klart.hidden = false;
    sattKotten(antal >= 8 ? 'imponerad' : 'firar');
    blipp(523, 'triangle', 0.18); setTimeout(function () { blipp(784, 'triangle', 0.3); }, 150);
    if (S.niva === 3) tal('Alla tre nivåerna är klara!');
    else tal('Nivå ' + S.niva + ' klar. Du fick ' + antal + (antal === 1 ? ' stjärna.' : ' stjärnor.'));
    if (window.skolappar && window.skolappar.event) window.skolappar.event('level', S.niva);
  }

  function startaNiva(n) {
    S.niva = n; S.index = 0; S.svar = []; S.stjarnor = 0;
    S.rader = blanda(BANK['niva' + n]);
    el.klart.hidden = true;
    el.spel.hidden = false;
    el.start.hidden = true;
    if (window.skolappar && window.skolappar.event) window.skolappar.event('level', n);
    visaFraga();
  }

  /* ---------- start ---------- */
  window.__gaj.starta = startaNiva; /* speltest: hoppa till nivå */
  $('#kottenStart').innerHTML = kottenSvg('nyfiken');
  $('#play').addEventListener('click', function () { startaNiva(1); });
  el.klartKnapp.addEventListener('click', function () {
    if (S.niva < 3) startaNiva(S.niva + 1); else startaNiva(1);
  });
  el.klartIgen.addEventListener('click', function () { startaNiva(S.niva); });
  el.ljud.addEventListener('click', function () {
    S.ljud = !S.ljud;
    el.ljud.textContent = S.ljud ? '🔊' : '🔇';
    el.ljud.setAttribute('aria-pressed', String(S.ljud));
    el.ljud.setAttribute('aria-label', S.ljud ? 'Stäng av ljudet' : 'Slå på ljudet');
    if (!S.ljud) {
      try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
      if (window.skolappar && window.skolappar.event) window.skolappar.event('sound_off');
    }
    blipp(600, 'triangle', 0.12);
  });
  document.addEventListener('keydown', function (ev) {
    if (el.start.hidden === false) return;
    if (!el.klart.hidden) return;
    var k = ['1', '2', '3', '4'].indexOf(ev.key);
    if (k >= 0 && el.alt.children[k]) el.alt.children[k].click();
  });
})();