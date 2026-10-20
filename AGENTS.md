# AGENTS.md

## Project

Course website for **Software Development Methodologies (2026)**, aimed at students.
A static [Astro](https://astro.build) site deployed to GitHub Pages by GitHub Actions:
https://kornel-filep.github.io/software-development-methodologies/

- `reqs.txt` – source text of the semester team assignment requirements.
- `src/content/pages/*.md` – **all page content, in Markdown.** Edit content here.
  - `index.md` is the home page (the `reqs.txt` content). Any other `name.md` is served at `/name/`
    and is added to the header menu automatically.
  - Frontmatter: `title` (required), `description` (optional subtitle), `order` (menu order, lower first),
    `navLabel` (optional menu label). `index.md` also holds `footer`, the site-wide footer text.
- `src/content.config.ts` – content collection schema.
- `src/pages/[...slug].astro` – generates one page per Markdown file.
- `src/layouts/Layout.astro` – shared shell, menu and Markdown styles (`.prose`).
- `.github/workflows/deploy.yml` – build and deploy on push to `main`.

## Language rules (mandatory)

1. **Content is Hungarian.** Everything students read (Markdown text, frontmatter values such as titles,
   menu labels and footer, alt text) is written in Hungarian, and the page uses `<html lang="hu">`.
   Programming and industry terms may stay in English where Hungarian practice does so
   (e.g. CI/CD, build, lint, MVP, epic, user story, Scrum, Kanban, Git, merge, Docker).
2. **Code is English only.** All Astro/TypeScript/CSS code uses English words only: file and folder names,
   collection names, variables, functions, props, frontmatter keys, CSS classes and comments.
   Do not hard-code Hungarian UI text in code; put it in Markdown content (body or frontmatter) instead.
3. Repository docs for maintainers (this file), commit messages and workflow files are in English.
   `README.md` is in Hungarian because it is the editing guide for the course owner.

## Workflow

- Local preview: `npm install`, then `npm run dev`.
- Check the build: `npm run build` (output goes to `dist/`).
- Content changes only touch Markdown; never put content into `.astro` files.
- If `reqs.txt` changes, update `src/content/pages/index.md` to match.
- Style new Markdown elements (tables, quotes, etc.) via the `.prose` rules in `Layout.astro`.
- The site runs under the `/software-development-methodologies` base path (`base` in `astro.config.mjs`),
  so build internal links with `import.meta.env.BASE_URL`.
