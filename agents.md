# agents.md

Guidance for AI coding agents (and humans) working on the **Easy Tech Development** website.

## Project
A futuristic, modern, clean marketing + lightweight e-commerce site for **Easy Tech Development SRL** — an industrial component supplier in Bucharest, Romania (procurement, customization, and planning of automation/control/electronics components).

- Company: Easy Tech Development SRL
- HQ: 16 Feleacu St, 014186, Bucharest, Romania
- Sectors: Industrial Automation, Industrial Control, Industrial Electronics
- Primary language: **Romanian (ro)** · Secondary: **English (en)**, **Hungarian (hu)**

## Stack
- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`) + shadcn/ui components
- react-i18next + i18next (+ i18next-browser-languagedetector)
- react-router-dom v7
- next-themes (dark default + light toggle)
- motion (framer-motion) + selected magicui registry components
- react-hook-form + zod
- lucide-react icons
- Web3Forms for the custom-request (RFQ) form email delivery

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (type-check + Vite)
- `npm run preview` — preview the build
- `npm run lint` — oxlint

### Adding shadcn/ui components
The shadcn CLI is installed locally as a dev dependency. `npx shadcn` (or `npm run`)
injects `npm_config_allow_scripts`, which makes the CLI's internal `npm install`
fail with `EALLOWSCRIPTS` in this environment. Invoke the local binary directly
instead, with that env var cleared:

```powershell
Remove-Item Env:npm_config_allow_scripts -ErrorAction SilentlyContinue
.\node_modules\.bin\shadcn.cmd add <component> -y
```

The registry style is `radix-nova` (see `components.json`); generated components
import `cn` from the `cn` package and Radix primitives from the unified `radix-ui`
package.

## File structure
```
src/
  main.tsx, App.tsx, index.css
  i18n/index.ts            # i18n init + detector
  i18n/locales/ro.json     # source of truth (Romanian)
  i18n/locales/en.json
  i18n/locales/hu.json
  components/
    ui/                    # shadcn primitives (do NOT hand-edit unless extending)
    layout/                # Navbar, Footer, LanguageSwitcher, ThemeToggle
    sections/              # Home page sections (Hero, Services, ...)
    shop/                  # ProductGrid, ProductCard, FilterSidebar
    forms/                 # CustomRequestForm
  pages/                   # Home, Services, Industries, Brands, Shop, Contact
  data/                    # products.ts, brands.ts, industries.ts
  lib/utils.ts             # cn() helper
public/                    # logos (svg), hero video
docs/                      # plan.md, milestones.md, design.md
```

## Conventions
- **TypeScript strict.** Prefer functional components + hooks. No `any` unless unavoidable.
- **Styling**: Tailwind utility classes + shadcn tokens. Use `cn()` from `lib/utils.ts` to merge classes. Use the brand CSS variables (see `docs/design.md`), never hard-coded hex in components where a token exists.
- **shadcn components** go in `src/components/ui`. To add one, use the shadcn CLI rather than copy-pasting manually.
- **i18n is mandatory for all user-facing strings** (see below).
- **Theme**: respect `next-themes` (dark default). Use `bg-background`, `text-foreground`, `text-primary`, etc. Do not force light/dark colors.
- **Assets**: brand logos live in `public/`; reference with absolute paths (`/full_logo.svg`). The hero video is `/gemini_hero.mp4`.

## i18n rules (IMPORTANT)
1. **Never hard-code user-facing text** in components. Always use `t('key')` from `react-i18next`.
2. Add new keys to **`ro.json` first** (Romanian is the source of truth). Then add the same keys to `en.json` and `hu.json`.
3. Use nested, dot-delimited keys grouped by page/section, e.g. `home.hero.title`, `nav.services`, `form.email`.
4. Keep translations in sync — if you add a key, add it to all three files in the same structure.
5. For dynamic values use i18next interpolation: `t('form.charCount', { count: 3 })`.
6. Default language is `ro`; the LanguageSwitcher sets `ro | en | hu` and persists to `localStorage`.

## Custom Request (RFQ) form
- Submits to Web3Forms: `https://api.web3forms.com/submit`.
- Access key comes from `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` (see `.env.example`).
- Supports file attachments (input name `attachment`). Validate with zod.
- On success/error show clear UI states. Do not log the access key.

## Do / Don't
- DO keep the design futuristic but clean: dark glassmorphism, brand gradient accents, generous spacing, subtle motion.
- DO make every page responsive (mobile-first).
- DON'T add a real checkout/payments to the shop (catalog scaffold only — "Coming soon").
- DON'T introduce heavy new dependencies without noting them in `plan.md`/`milestones.md`.

## Where to look
- Overall approach: `docs/plan.md`
- Task breakdown & status: `docs/milestones.md`
- Visual system: `docs/design.md`
