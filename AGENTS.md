# AGENTS.md

## A projektről

Ez a repó a **Szoftverfejlesztési módszertanok (2026)** tárgy hallgatóknak szóló tananyag-weboldala.
Statikus [Astro](https://astro.build) oldal, amely GitHub Actions segítségével GitHub Pages-re települ:
https://kornel-filep.github.io/software-development-methodologies/

- `reqs.txt` – a féléves csapatfeladat követelményeinek forrásszövege.
- `src/content/oldalak/*.md` – **az oldalak tartalma Markdownban.** Itt kell szerkeszteni.
  - `index.md` a főoldal (a `reqs.txt` tartalma), minden további `valami.md` a `/valami/` címen jelenik meg,
    és automatikusan bekerül a fejléc menüjébe.
  - Frontmatter: `title` (kötelező), `description` (opcionális alcím), `order` (menüsorrend, kisebb = előrébb).
- `src/content.config.ts` – a tartalomgyűjtemény sémája.
- `src/pages/[...slug].astro` – minden Markdown fájlból oldalt generál.
- `src/layouts/Layout.astro` – közös oldalkeret, menü és a Markdown elemek stílusai (`.prose`).
- `.github/workflows/deploy.yml` – build és telepítés a `main` ágra pusholáskor.

## Nyelvi szabály (kötelező)

**Minden hallgatóknak szóló tartalom magyar nyelvű.** Ez vonatkozik az oldalak szövegére, címekre,
menüpontokra, alt szövegekre és metaadatokra is (`<html lang="hu">`).

Kivétel: a programozási és szakmai kifejezések maradhatnak angolul, ha a magyar szakmai nyelvben is
így használatosak (pl. CI/CD, build, lint, MVP, epic, user story, Scrum, Kanban, Git, merge, Docker).

Kód, fájlnevek, commit üzenetek és ez a technikai dokumentáció angolul vagy magyarul is írható.

## Munkafolyamat

- Helyi futtatás: `npm install`, majd `npm run dev`.
- Build ellenőrzése: `npm run build` (a kimenet a `dist/` mappába kerül).
- Tartalmi változtatáshoz csak Markdownt szerkessz; ne írj tartalmat `.astro` fájlokba.
- Ha a `reqs.txt` változik, frissítsd a `src/content/oldalak/index.md` tartalmát is, hogy egyezzenek.
- Új Markdown elem (pl. táblázat, idézet) stílusát a `Layout.astro` `.prose` szabályai közé vedd fel.
- Az oldal a `/software-development-methodologies` alútvonalon fut (`base` az `astro.config.mjs`-ben),
  ezért belső hivatkozásoknál használd az `import.meta.env.BASE_URL` értéket.
