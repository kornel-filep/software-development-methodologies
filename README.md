# Szoftverfejlesztési módszertanok 2026

A tárgy tananyag-weboldala: https://kornel-filep.github.io/software-development-methodologies/

## Szerkesztés

Az oldalak tartalma a `src/content/pages/` mappában található Markdown fájlokban van.

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

## Előnézet más ágakon

Minden más ág külön címen is elérhető, így a még nem kész tartalom nem kerül a `main`-be:

```
https://kornel-filep.github.io/software-development-methodologies/preview/<ág-neve>/
```

Az ág nevében a `/` és más speciális karakterek `-` jelre cserélődnek, például a `feature/mvp-guide` ág címe
`.../preview/feature-mvp-guide/`. Ha az ágat törlöd, az előnézet is automatikusan eltűnik.
A pontos cím minden futás után megjelenik a GitHub Actions összefoglalójában is.

Helyi előnézet: `npm install`, majd `npm run dev`. Részletek az [AGENTS.md](AGENTS.md) fájlban.
