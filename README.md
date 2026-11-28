# alo: Smog's link-in-bio

One static page for [smogmeister.com](https://www.smogmeister.com): profile, social links and Amazon product picks. Next.js 16, Tailwind 4, hosted on Vercel; pushing to `main` deploys.

## Edit content

- Products: `data/cards.json`. Only cards with a `links.usa` link are shown, sorted by `priority`; `featured: true` makes the large first tile.
- Profile (name, tagline, photo, email, socials): `data/profile.json`.
- Site title, description and URL: `lib/site.ts`.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run lint
npm test        # cookie-consent rules (Node's built-in test runner)
npm run build
```

Google Analytics loads only after a visitor allows analytics cookies (`components/google-analytics.tsx`).
