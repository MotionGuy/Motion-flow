<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Motion Flow site: rules for anyone editing this repo

Motion Flow is a motion-design studio focused only on cybersecurity. This site is the proof of our craft: dark, spacious, editorial, restrained. Quiet UI, loud work.

## Design system (do not drift)
- Colors live as tokens in `app/globals.css`. Page `ink #0B0D13`, surface `panel #131620`, `line #232838`, text `fg #F5F7FA`, `muted #9BA1AD`.
- The only color is soft light blue: `blue #A9C7FF` and `ice #EAF1FF`, used on buttons, glows, focus, and active states. `tide #6C85EB` appears only inside the hero liquid gradient. No purple, no saturated or electric blue, no neon cyan.
- Type: Zodiak (Fontshare) for display and headings, italic as the only emphasis move; Geist for body; Geist Mono for small uppercase labels, used sparingly. Never Inter, Roboto, Arial, Fraunces, or Clash Display.
- Section headings on the home page are large Zodiak italic.
- Shapes: interactive elements are pills, containers are 14px radius, borders are 1px hairlines.
- Leave lots of empty space. Don't fill every spot.

## Logo
- The wordmark is the outlined SVG in `public/logo.svg`, rendered by `components/ui/Logo.tsx`. Never rebuild it with fonts.

## Components and conventions
- Every "Book a call" button is `<Button variant="secondary">` (outline with a blue fill rising on hover), on every page.
- Reuse `components/ui/*` (Button, Tag, Reveal, TextReveal, WorkCard, GlassIcon, LoopVideo) before writing new UI.
- Motion: ease `cubic-bezier(0.16, 1, 0.3, 1)`; one cinematic moment per page (the preloader); everything else is a quiet reveal. Honor `prefers-reduced-motion`.
- Copy: plain verbs, sentence case, no em dashes, no filler. Never invent testimonials, client quotes, or metrics.

## Media
- Short preview clips (under ~8 MB) go in `public/video/`. Full-length films go on Cloudflare R2, never in git.

## Workflow
- `main` deploys to production automatically through Vercel. Work on a branch, open a pull request, and review the Vercel preview link before merging.
- Run `npm run build` before pushing.
- The domain origin for metadata and the sitemap is `lib/site.ts`.
