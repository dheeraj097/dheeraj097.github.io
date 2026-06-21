# dheeraj097.github.io

Personal portfolio and blog built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

**Live site:** [https://dheeraj097.github.io](https://dheeraj097.github.io)

## Tech Stack

- **Astro 4** — Static site generator with zero JS by default
- **Tailwind CSS 3** — Utility-first CSS framework
- **TypeScript** — Type safety
- **GitHub Actions** — Automatic build and deployment

## Features

- Dark-mode developer portfolio with animated SVG hero
- Responsive design (mobile-first)
- Blog system powered by Astro Content Collections (Markdown)
- SEO optimized (Open Graph, Twitter Cards, JSON-LD, sitemap)
- Interactive hover effects and animations

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable Astro components
├── content/blog/   # Blog posts (Markdown)
├── layouts/        # Page layouts
├── pages/          # File-based routing
└── styles/         # Global CSS
public/             # Static assets (favicon, sitemap, robots.txt)
```

## Adding Blog Posts

Create a new `.md` file in `src/content/blog/` with frontmatter:

```markdown
---
title: "Your Post Title"
description: "A brief description for SEO and previews."
date: 2024-12-20
tags: ["Tag1", "Tag2"]
---

Your content here...
```

## Deployment

The site deploys automatically via GitHub Actions on every push to `master`. Make sure your repository's Pages settings use **GitHub Actions** as the source (Settings > Pages > Source).
