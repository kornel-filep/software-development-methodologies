# Szoftverfejlesztési módszertanok 2026

A tárgy tananyag-weboldala: https://kornel-filep.github.io/software-development-methodologies/

## Szerkesztés

Az oldalak tartalma a `src/content/pages/` mappában található Markdown fájlokban van.

- A főoldal az `index.md`.
- Új oldalhoz hozz létre egy új `.md` fájlt (vagy `.mdx`-et, ha ábrát is tartalmaz) az alábbi fejléccel; automatikusan megjelenik a menüben.

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

## Ábrák (Excalidraw)

1. Rajzold meg az ábrát az https://excalidraw.com oldalon (vagy VS Code-ban az Excalidraw bővítménnyel),
   és mentsd el ide: `public/diagrams/<név>.excalidraw`.
2. Ágyazd be egy `.mdx` oldalba:

```mdx
<Excalidraw name="<név>" caption="Az ábra felirata" />
```

A meglévő ábra szerkesztéséhez nyisd meg a `.excalidraw` fájlt az excalidraw.com oldalon
(Menü → Megnyitás), módosítsd, majd mentsd vissza ugyanoda.

## Előnézet más ágakon

Minden más ág külön címen is elérhető, így a még nem kész tartalom nem kerül a `main`-be:

```
https://kornel-filep.github.io/software-development-methodologies/preview/<ág-neve>/
```

Az ág nevében a `/` és más speciális karakterek `-` jelre cserélődnek, például a `feature/mvp-guide` ág címe
`.../preview/feature-mvp-guide/`. Ha az ágat törlöd, az előnézet is automatikusan eltűnik.
A pontos cím minden futás után megjelenik a GitHub Actions összefoglalójában is.

Helyi előnézet: `npm install`, majd `npm run dev`. Részletek az [AGENTS.md](AGENTS.md) fájlban.
