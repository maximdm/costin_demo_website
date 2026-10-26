# Milestones — Easy Tech Development Website

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

## M1 — Scaffold & tooling
- [x] Initialize Vite + React + TypeScript project in repo root
- [x] Install & configure Tailwind CSS v4 (`@tailwindcss/vite`)
- [x] Initialize shadcn/ui (`components.json`, `lib/utils.ts`, base components)
- [x] Add `next-themes` and dark/light theming
- [x] Install core deps: react-router-dom, react-i18next, i18next, i18next-browser-languagedetector, react-hook-form, zod, @hookform/resolvers, motion, lucide-react, gsap
- [x] Copy brand logos + hero video into `public/` (+ `image_1`–`image_7.png` from design assets)
- [x] Base `index.css` with brand tokens (see design.md)

## M2 — Internationalization
- [x] `src/i18n/index.ts` init + language detector (default `ro`)
- [x] Create `ro.json` (source of truth) with full Romanian copy
- [x] Create `en.json` (English translations)
- [x] Create `hu.json` (Hungarian translations)
- [x] `LanguageSwitcher` component built and mounted in Navbar
- [x] Verify key parity across all three locales (239 keys each)
- [x] Enable `returnObjects: true` for array translations (feature/benefit/step lists)

## M3 — Layout & routing
- [x] Router setup (all routes: `/`, `/services`, `/industries`, `/brands`, `/shop`, `/contact`, `*`)
- [x] `Navbar` — floating glass pill, centered nav, lang switcher, theme toggle, magnetic CTA, mobile Sheet
- [x] `Footer` — floating glass card, locale-aware columns + copyright
- [x] Responsive mobile menu (Sheet)
- [x] ThemeToggle (next-themes)
- [x] `MotionConfig reducedMotion="user"` wraps the app (all motion respects reduced motion)
- [x] `CustomCursor` + `Magnetic` (Cuberto-style cursor, desktop/fine-pointer only)

### Notes / follow-ups
- Routes still in one bundle; add `React.lazy` + `Suspense` code-splitting in M8.
- Footer + Contact use placeholder email/phone in `src/data/company.ts` — replace with real values before launch.
- Navbar + Footer render a faint diagonal `.pattern2` texture on their glass surface.

## M4 — Home page
- [x] Hero (animated brand-glow background, headline, dual CTAs, magnetic buttons)
- [x] Stats / trust section with `NumberTicker` (count-up on scroll; 15+ yrs, 30+ brands, 100+ projects, 24h)
- [x] Services overview — 3 cards (Procurement / Customization / Planning) with feature lists
- [x] Industries preview — 6 industry cards + CTA to `/industries`
- [x] Brands marquee — custom CSS infinite scroll (pauses on hover, edge-masked)
- [x] Why-us — 4 reason cards
- [x] CTA band (glass) with magnetic gradient button
- [x] Scroll-reveal animations via reusable `Reveal` component (motion `whileInView`)
- [x] Brand symbol watermark behind hero (low-opacity, slow sway + breathe)

### Notes
- Hero uses the animated gradient glow rather than `gemini_hero.mp4` (video remains available in `public/` if wanted).
- Marquee and scroll-reveal are custom (CSS + `motion/react`), not the magicui/blur-fade packages.

## M5 — Services / Industries / Brands pages
- [x] `/services` — hero image (`image_1`), 3 service cards (long descriptions + benefit lists), 4-step process with `image_6`, CTA
- [x] `/industries` — hero image (`image_2`), full 8-industry grid, closing band with `image_7`, CTA
- [x] `/brands` — hero image (`image_3`), 6 category cards, disclaimer, CTA
- [x] Content sourced from i18n keys (no separate `data/*.ts` files)

## M6 — Shop catalog scaffold
- [x] `/shop` — hero image (`image_4`) + "Coming soon" badge
- [x] Category cards scaffold (6 categories), each marked "Coming soon"
- [x] "Coming soon" treatment (no checkout, per brief)
- [ ] Wire real product data + filtering when the catalog is ready (deferred)

## M7 — Contact & RFQ form
- [x] `/contact` page — hero image (`image_5`), 2-column layout: RFQ form + contact-info panel (address/email/phone/hours, mailto + tel links)
- [x] `CustomRequestForm` (react-hook-form + zod, localized validation messages)
- [x] Multi-file attachment input (10 MB guard, per-file remove) posted to Web3Forms as `attachment`
- [x] Web3Forms integration via `VITE_WEB3FORMS_ACCESS_KEY` (fetch + `FormData`; shows a setup banner when the key is missing instead of breaking)
- [x] Success / error UI states (replace form with a status panel + "request another" CTA)
- [x] `.env.example` + README instructions for obtaining the key

### Notes
- Activation requires the real Web3Forms access key (`VITE_WEB3FORMS_ACCESS_KEY`) and verified contact email/phone (still placeholders in `src/data/company.ts`). Until the key is set, the form renders with a non-blocking "not configured" banner and a disabled submit.
- File attachments are delivered as email attachments through Web3Forms; check the Web3Forms attachment-size limit on the free tier.

## M8 — Production polish & deploy
- [x] Performance pass — `React.lazy` + `Suspense` route code-splitting (each page is its own chunk; initial bundle ~500 kB, no size warning); `loading="lazy"` + `decoding="async"` on inner-page images
- [x] Accessibility pass — skip-to-content link, keyboard-accessible file picker (button-triggered input), focus-visible rings on controls, `alt=""` on decorative images, reduced-motion respected app-wide
- [x] Responsive pass — verified the responsive Tailwind grid/breakpoint classes across all pages (hero, stats, services, industries, brands, shop, contact); mobile Sheet menu
- [x] README — added Deploy (Vercel) section + Web3Forms env var docs
- [~] Deploy to Vercel — production build verified (`npm run build` passes); the actual Vercel import/push is a manual step (instructions in README)

### Notes
- The shared vendor chunk (react-dom, react-router, motion, gsap, react-hook-form, zod) loads up-front; `chunkSizeWarningLimit` raised to 900 to silence the cosmetic warning.
- Visual QA in a real browser (esp. responsive breakpoints + the custom cursor) is still recommended before launch.

## M9 — Signature visuals & motion (added, completed)
Unplanned aesthetic/motion work layered on top of M3–M4:
- [x] Custom Cuberto-style cursor: blend-mode dot, velocity stretch, hover scale (desktop/fine-pointer only, reduced-motion safe)
- [x] `Magnetic` wrapper for primary CTAs (navbar, hero, CTAs)
- [x] Floating **glass** Navbar + Footer with masked (`::before`) edges that fade into the page
- [x] Full-page fixed animated brand glow (`brand-glow-drift`, 20s) — moved from hero-only to site-wide
- [x] Two distinct symbol-logo animations: hero watermark (sway + breathe) and `LogoLoader` spinner (`logo-spin`) used in a first-paint `BootOverlay`
- [x] Faint diagonal `.pattern2` texture on Navbar + Footer glass
- [x] Transparent PNG treatment: `object-contain` + drop-shadow (no box frame) on all inner-page images
- [x] Stat copy update: 30+ brands, 100+ projects completed

## Notes
- Order is roughly sequential; M2 (i18n) ran in parallel with M1 since all later strings depend on it.
- Keep `ro.json` as the single source of truth; sync `en`/`hu` on every change.
- M9 work was not in the original plan but is now part of the shipped design language.
