# ignatij.github.io

Personal portfolio, technical writing, and CV generator for Ignatij Gichevski. Built with Solid.js, Vite, Tailwind CSS, and Markdown frontmatter, deployed statically to GitHub Pages.

## Stack

- **Frontend:** Solid.js, `@solidjs/router`, `solid-meta`
- **Build & styling:** Vite, Tailwind CSS, custom dark editorial stylesheet ([src/index.css](src/index.css))
- **Content:** Markdown + YAML frontmatter (`gray-matter`, `marked`, `highlight.js`)
- **CV generation:** Puppeteer HTML-to-PDF pipeline ([scripts/generate-cv.js](scripts/generate-cv.js)) driven by [src/data/profile.js](src/data/profile.js) and project frontmatter
- **Hosting:** GitHub Pages via GitHub Actions

## Scripts

```bash
pnpm install        # Install dependencies
pnpm dev            # Local dev server (http://localhost:3000)
pnpm build          # Production build to dist/
pnpm preview        # Preview production build
pnpm lint           # Run ESLint
pnpm cv:generate    # Regenerate public/Ignatij Gichevski CV.pdf and archive copy
pnpm cv:resend      # Generate tailored Resend CV in content/cv/
pnpm cv:dualentry   # Generate tailored DualEntry CV in content/cv/
```

To run the Puppeteer layout, contrast, route, and PDF checks against a running local server on port `3000`:

```bash
node scripts/check-design.mjs
```

## Repository Layout

```text
content/
├── blog/           # Markdown articles (supports draft, featured, topic frontmatter)
├── cv/             # Archived and tailored PDF CVs
└── projects/       # Client & open-source case studies (supports archived, cv_highlights)
scripts/
├── check-design.mjs
├── generate-cv.js
└── cv-targets/
src/
├── components/     # Header, Footer, Entries
├── data/           # profile.js (shared by site and CV generator)
├── pages/          # Home, Projects, Project, Blog, BlogPost
└── utils/          # content.js, experience.js
```

See [content/README.md](content/README.md) for frontmatter fields and publishing conventions.

## Contact

- Website: [ignatij.github.io](https://ignatij.github.io)
- GitHub: [@ignatij](https://github.com/ignatij)
- Email: [ignatij.gichevski@gmail.com](mailto:ignatij.gichevski@gmail.com)
