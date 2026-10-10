# Dev Foundry website (Next.js)

Next.js 15 App Router, TypeScript, no CSS framework. Two pages:

- `/` (`app/page.tsx`): home page
- `/work` (`app/work/page.tsx`): projects, with a detail drawer

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Edit content

All copy and data live in `lib/data.ts`: capabilities, engagements, team, client regions and testimonials, FAQ and projects.

- **Calendly link and email:** `CALENDLY` and `EMAIL` at the top of `lib/data.ts`.
- **Team photos:** put a square headshot in `public/team/` (e.g. `public/team/nabil.jpg`) and set `photo: '/team/nabil.jpg'` on that member in `team`. It is converted to the animated binary portrait in the browser. Front-facing photos on a plain background work best.
- **Testimonials:** replace `quote`, `person` and `role` in `regions`.
- **Daksh and Pranchol:** add a `focus` line for each in `team`.

## Styling

- `app/globals.css` holds all styles. Palette tokens are at the top (`--cream`, `--mint`, `--line` and so on).
- Fonts are Plus Jakarta Sans and Geist Mono, self-hosted by `next/font` (see `app/layout.tsx`).
- Breakpoints: navigation collapses below 900px; the capabilities grid goes 3 → 2 → 1 columns at 1060px / 640px. The other grids reflow automatically.
- Every animation is turned off for visitors whose system is set to reduced motion.

## Deploy to devfoundry.shop

**Vercel (recommended)**

1. Push this folder to a GitHub repository.
2. Import the repository at vercel.com/new. The defaults work as they are.
3. In Project → Settings → Domains, add `devfoundry.shop` and `www.devfoundry.shop`, then set the DNS records Vercel shows at your domain registrar.

**Any Node host:** run `npm run build` then `npm start` (port 3000) behind your reverse proxy.

## Remote images

The Work page loads some screenshots from `https://devfoundry.shop/assets/...`. To serve them from this app instead, download them into `public/assets/` and update the `img` paths in `lib/data.ts`.
