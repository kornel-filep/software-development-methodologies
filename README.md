# Szoftverfejlesztési módszertanok 2026

A tárgy tananyag-weboldala: https://kornel-filep.github.io/software-development-methodologies/

## Szerkesztés

Az oldalak tartalma a `src/content/oldalak/` mappában található Markdown fájlokban van.

- A főoldal az `index.md`.
- Új oldalhoz hozz létre egy új `.md` fájlt az alábbi fejléccel; automatikusan megjelenik a menüben.

```md
---
title: Oldal címe
description: Rövid alcím (opcionális)
order: 10
---

## Szakasz

Szöveg, listák, táblázatok...
```

A `main` ágra pusholt változtatások pár percen belül megjelennek az oldalon.

Helyi előnézet: `npm install`, majd `npm run dev`. Részletek az [AGENTS.md](AGENTS.md) fájlban.
