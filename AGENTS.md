# AGENTS.md

## Project

Course website for **Software Development Methodologies (2026)**, aimed at students.
A static [Astro](https://astro.build) site deployed to GitHub Pages by GitHub Actions:
https://kornel-filep.github.io/software-development-methodologies/

- `reqs.txt` – source text of the semester team assignment requirements.
- `src/content/pages/*.md|*.mdx` – **all page content, in Markdown.** Edit content here.
  Use `.mdx` only when a page needs a component such as `<Excalidraw />`.
  - `index.md` is the home page (the `reqs.txt` content). Any other `name.md` is served at `/name/`
    and is added to the header menu automatically.
  - Frontmatter: `title` (required), `description` (optional subtitle), `order` (menu order, lower first),
    `navLabel` (optional menu label). `index.md` also holds `footer`, the site-wide footer text.
- `src/content.config.ts` – content collection schema.
- `src/pages/[...slug].astro` – generates one page per Markdown file.
- `src/layouts/Layout.astro` – shared shell, left sidebar menu (collapses to the top on narrow screens)
  and Markdown styles (`.prose`).
- `src/components/Excalidraw.astro` + `ExcalidrawViewer.tsx` – renders an Excalidraw diagram as SVG,
  with zoom buttons and a fullscreen overlay.
- `src/content/ui-text.json` – Hungarian UI strings used by components (button labels, aria labels).
  Any new user-facing text in components goes here, never inline in code.
- `public/diagrams/*.excalidraw` – diagram sources (Excalidraw JSON).
- `.github/workflows/deploy.yml` – builds and publishes every branch (see Deployment).
- `scripts/publish-pages.sh` – writes a build into a folder of the `gh-pages` branch, or removes it.

## Diagrams (Excalidraw)

1. Create or edit the diagram on https://excalidraw.com (or in VS Code with the recommended
   Excalidraw extension) and save it as `public/diagrams/<name>.excalidraw`.
2. In an `.mdx` page, embed it with `<Excalidraw name="<name>" caption="..." />`; no import is needed,
   the component is provided by `src/pages/[...slug].astro`.

The diagram is rendered client-side to an SVG that follows the light/dark theme, and the caption links
to the source file. Diagram text is content, so it is written in Hungarian.

## Deployment

GitHub Pages serves the `gh-pages` branch (source: branch, not Actions). The workflow publishes:

- `main` → site root: https://kornel-filep.github.io/software-development-methodologies/
- any other branch → `/preview/<slug>/`, where `<slug>` is the branch name lowercased with
  non `[a-z0-9._-]` characters replaced by `-` (e.g. `feature/mvp-guide` → `preview/feature-mvp-guide`).
- deleting a branch removes its preview folder.

The base path is passed to Astro via the `BASE_PATH` env var (`astro.config.mjs`).
Never edit `gh-pages` by hand; publishing `main` keeps the `preview/` folder intact.

## Language rules (mandatory)

1. **Content is Hungarian.** Everything students read (Markdown text, frontmatter values such as titles,
   menu labels and footer, alt text) is written in Hungarian, and the page uses `<html lang="hu">`.
   Programming and industry terms may stay in English where Hungarian practice does so
   (e.g. CI/CD, build, lint, MVP, epic, user story, Scrum, Kanban, Git, merge, Docker).
2. **Code is English only.** All Astro/TypeScript/CSS code uses English words only: file and folder names,
   collection names, variables, functions, props, frontmatter keys, CSS classes and comments.
   Do not hard-code Hungarian UI text in code; put it in Markdown content (body or frontmatter) or in
   `src/content/ui-text.json` instead.
3. Repository docs for maintainers (this file), commit messages and workflow files are in English.
   `README.md` is in Hungarian because it is the editing guide for the course owner.

## Workflow

- Local preview: `npm install`, then `npm run dev`.
- Check the build: `npm run build` (output goes to `dist/`).
- Content changes only touch Markdown; never put content into `.astro` files.
- If `reqs.txt` changes, update `src/content/pages/index.md` to match.
- Style new Markdown elements (tables, quotes, etc.) via the `.prose` rules in `Layout.astro`.
- The base path differs per branch, so always build internal links with `import.meta.env.BASE_URL`.
