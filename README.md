# Heriberto Tejada Guzmán — Portfolio

Next.js + Tailwind CSS + Motion. Colors: Midnight Black, Miami Blue, Caliente Red, Slate Gray.

## Run it

```bash
npm install     # first time only
npm run dev     # then open http://localhost:3000
```

## Edit content

All text (about, experience, skills, projects, blog posts, links) lives in
**`src/data/site.ts`**. Change it there and the page updates.

- Add a project: copy one of the objects in `projects` and fill it in.
- Unity project: replace `comingSoon: true` with `live: "https://..."`.

## Where things are

| File | What it does |
| --- | --- |
| `src/app/page.tsx` | The page — the order of the sections |
| `src/components/Hero.tsx` | Top section with your name |
| `src/components/Sections.tsx` | About, Journey, Skills, Projects, Blog, Contact |
| `src/components/Navbar.tsx` | Sticky nav bar |
| `src/components/motion.tsx` | Animations: scroll reveal, hover cards, progress bar |
| `src/app/globals.css` | Colors and the hover glow effect |

## Deploy

Push to GitHub, then import the repo at vercel.com (free). Vercel detects Next.js automatically.

The previous HTML/CSS version is kept in `public/old-site/` (live at /old-site/).
