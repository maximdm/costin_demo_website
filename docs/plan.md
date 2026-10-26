# Plan — Easy Tech Development Website

## Goal
A futuristic, modern, clean website for **Easy Tech Development SRL**, an industrial
component supplier based in Bucharest, Romania. The site promotes the company's
**procurement, customization, and planning** services for industrial components,
showcases the industries and brands it serves, includes a (future) shop catalog
scaffold, and lets visitors submit a **custom request (RFQ)** with file attachments
delivered by email.

## Audience & languages
- Primary: Romanian buyers / engineers (default language `ro`).
- Secondary: English (`en`) and Hungarian (`hu`).
- All copy is translatable through `react-i18next`.

## Tech stack
- **Vite + React 19 + TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui**
- **react-i18next** (+ i18next-browser-languagedetector)
- **react-router-dom** v7
- **next-themes** (dark default, light toggle)
- **motion** (framer-motion) + a few **magicui** registry components
  (AnimatedGridPattern, ShineBorder, Marquee, BlurFade, GradientText, NumberTicker)
- **react-hook-form** + **zod**
- **lucide-react** icons
- **Web3Forms** for RFQ email delivery (no backend required)
- Deploy target: **Vercel**

## Pages / routes
| Route | Purpose |
|-------|---------|
| `/` Home | Hero (video bg + gradient), services overview, industries, brands marquee, stats, CTA, footer |
| `/services` | Procurement · Customization · Planning (detailed, with process steps) |
| `/industries` | Grid of served industries with tailored copy |
| `/brands` | Cards for distributed brands (Siemens, Allen Bradley, Festo, ABB, Beckhoff…) |
| `/shop` | **Catalog scaffold**: filterable product grid, product cards, "request info" → RFQ. No checkout. "Coming soon" tags. |
| `/contact` | Company info + **Custom Request / RFQ form** with file upload (Web3Forms) |

## Key features
1. **Multilingual** — RO/EN/HU switcher in navbar, persisted, default RO.
2. **Futuristic design** — dark glassmorphism, brand purple→blue gradient, animated
   grid/glow backgrounds, subtle scroll-reveal motion, gradient text.
3. **Services emphasis** — procurement, customization, and planning presented as the
   core value proposition.
4. **Industries & brands** — browsable, content-driven from `src/data/*.ts`.
5. **Shop scaffold** — realistic catalog UI ready to fill, intentionally no payments.
6. **RFQ form** — name, company, email, phone, industry, message, file attachment(s);
   delivered to email via Web3Forms; client-side zod validation.

## Content model
- Static content (industries, brands, product categories) lives in `src/data/*.ts`.
- All visible strings live in `src/i18n/locales/*.json` (`ro` is source of truth).

## Assets
- Brand logos: `public/full_logo.svg`, `public/symbol_logo.svg` (provided).
  Note: `full_logo.svg` embeds the wordmark as a raster image — acceptable for now;
  a clean vector wordmark can be exported later for crisp large display.
- Hero background video: `public/gemini_hero.mp4` (provided `gemini_generated_video_*.mp4`).

## Out of scope (for now)
- Real e-commerce checkout / payments.
- CMS / headless content backend.
- Admin panel.
- Blog (can be added later).

## Open items / prerequisites
- **Web3Forms access key** — free, ~1 min at web3forms.com, tied to the recipient
  email. Stored in `.env` as `VITE_WEB3FORMS_ACCESS_KEY` (see `.env.example`).
- Recipient email address for RFQ submissions (to be confirmed by the client).
- **Contact details** — the public email and phone number are not confirmed yet;
  wire them in once the client provides them (currently only labels are in the locale
  files). Address is taken from the company listing:
  Str. Feleacu 16, 014186, Bucharest.
- **Home stats are placeholders** — "15+ years", "50+ brands", "10.000+ components",
  "24h response" (in `ro/en/hu.json → home.stats`). Replace with verified figures.
