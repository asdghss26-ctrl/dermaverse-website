# Dr. Jansi's Dermverse

Marketing site for Dr. Jansi's Dermverse, a dermatology clinic in Adyar, Chennai. The site presents clinic information, services, FAQs, and a WhatsApp booking flow.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4 with the Turbopack integration
- next/font/google: Bodoni Moda for display type, Jost for body type
- framer-motion for restrained entrance motion
- lucide-react for interface icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Run the production build locally with:

```bash
npm run start
```

## Content and configuration

- Clinic details, contact links, hours, and placeholder flags live in `src/data/clinic.ts`.
- `SITE_URL` in `src/data/clinic.ts` is the single source for canonical URLs, robots, sitemap, and JSON-LD.
- Placeholder content is flagged in the data files and should be replaced only after client confirmation.
- The visual system and motion rules are documented in `DESIGN.md`.

## Before launch

Confirm these client inputs before removing placeholders:

- Confirmed doctor portrait
- Verified services, FAQs, and clinic gallery copy
- Google Business Profile link
- Parking details
- Map location for directions or embed
- Open Graph share image and logo files
- Production domain for `SITE_URL`
