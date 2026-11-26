#!/usr/bin/env python3
"""mp3.py — färdiga röstfiler för Grundämnesjakten.

Appen säger exakt (och bara) det som står här:
  - varje frågetext q.f          (sv-SE-SofieNeural)
  - varje förklaring q.f2        (sv-SE-SofieNeural)
  - 'Inte riktigt. Försök igen.' / 'Tryck på den som lyser.'
  - 'Nivå N klar. Du fick K stjärnor.' (N=1..3, K=0..10)
  - 'Alla tre nivåerna är klara!'

Kör: python3 mp3.py   (skriver public/ljud/*.mp3, lines.js, rosten.js)
"""
import hashlib
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(HERE, "public")
LJUD = os.path.join(PUB, "ljud")
os.makedirs(LJUD, exist_ok=True)

VOICE = "sv-SE-SofieNeural"
RATE = "-4%"


def samling():
    """Läs BANK ur public/data.js i en node-kontext (samma sätt som appen gör)."""
    out = subprocess.run(
        ["node", "-e",
         "const vm=require('vm'),fs=require('fs');const w={};const s={window:w,console};"
         "vm.createContext(s);vm.runInContext(fs.readFileSync('public/data.js','utf8'),s);"
         "process.stdout.write(JSON.stringify(w.BANK))"],
        cwd=HERE, capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def rader():
    bank = samling()
    ut = []
    for niva in ("niva1", "niva2", "niva3"):
        for q in bank[niva]:
            ut.append(q["f"])
            ut.append(q["f2"])
    ut.append("Inte riktigt. Försök igen.")
    ut.append("Tryck på den som lyser.")
    for n in (1, 2, 3):
        for k in range(0, 11):
            ut.append(f"Nivå {n} klar. Du fick 1 stjärna." if k == 1
                      else f"Nivå {n} klar. Du fick {k} stjärnor.")
    ut.append("Alla tre nivåerna är klara!")
    # unika men ordningsbevarande
    seen, uni = set(), []
    for t in ut:
        if t not in seen:
            seen.add(t)
            uni.append(t)
    return uni


def synth(text):
    fid = hashlib.sha1((VOICE + "|" + text).encode("utf-8")).hexdigest()[:10]
    path = os.path.join(LJUD, fid + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 400:
        return fid
    for _ in range(4):
        p = subprocess.run(
            ["edge-tts", "--text", text, "--voice", VOICE, "--rate", RATE, "--write-media", path],
            capture_output=True, text=True, timeout=90)
        if p.returncode == 0 and os.path.exists(path) and os.path.getsize(path) > 400:
            return fid
    if os.path.exists(path):
        os.remove(path)
    return None


def main():
    lista = rader()
    lines, miss = {}, 0
    for i, text in enumerate(lista, 1):
        fid = synth(text)
        if not fid:
            miss += 1
            print("MISS", text[:70])
            continue
        lines[text] = fid
        if i % 20 == 0:
            print(f"{i}/{len(lista)}", flush=True)
    with open(os.path.join(LJUD, "lines.js"), "w", encoding="utf-8") as f:
        f.write("window.__ROST = " + json.dumps(lines, ensure_ascii=False, indent=1) + ";\n")
    dst = os.path.join(LJUD, "rosten.js")
    src = os.path.join(HERE, "..", "tools", "rosten.js")
    open(dst, "w", encoding="utf-8").write(open(src, encoding="utf-8").read())
    print(f"lines: {len(lines)}  miss: {miss}")


if __name__ == "__main__":
    main()