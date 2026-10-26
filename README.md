# Easy Tech Development — Website

Futuristic, modern, clean marketing + lightweight catalog site for **Easy Tech
Development SRL**, an industrial component supplier (Bucharest, Romania).
Procurement · Customization · Planning of industrial automation / control /
electronics components.

- **Languages**: Romanian (default) · English · Hungarian — via `react-i18next`.
- **Stack**: Vite + React 19 + TypeScript · Tailwind v4 · shadcn/ui · react-router ·
  next-themes · motion · react-hook-form + zod · Web3Forms (RFQ email) · gsap (cursor).
- **Deploy**: Vercel.

## Docs
- [plan.md](docs/plan.md) — overall approach, stack, pages, scope.
- [milestones.md](docs/milestones.md) — task breakdown & status.
- [design.md](docs/design.md) — brand palette, theme tokens, visual language.
- [agents.md](../agents.md) — conventions & rules for AI/human contributors.

## Getting started
```bash
npm install
cp .env.example .env      # then add your Web3Forms access key
npm run dev
```

## Environment
See `.env.example`:
- `VITE_WEB3FORMS_ACCESS_KEY` — free key from https://web3forms.com (tied to the
  recipient email). Used by the Custom Request (RFQ) form to email submissions.

## Scripts
- `npm run dev` — local dev
- `npm run build` — production build
- `npm run preview` — preview the build

## Deploy (Vercel)
This is a static Vite SPA — no server needed.
1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Import** the project (Vercel auto-detects Vite).
3. Build settings (defaults are usually correct):
   - Build command: `npm run build`
   - Output directory: `dist`
   - SPA rewrite: all routes → `index.html` (Vercel handles this for Vite automatically).
4. Add the environment variable `VITE_WEB3FORMS_ACCESS_KEY` (Project → Settings → Environment Variables) so the RFQ form can email submissions.
5. Deploy. Each push to the production branch re-deploys automatically.

> The `VITE_` prefix is required for Vite to expose the variable to client code.

## Project layout
See `agents.md` for the full structure and contribution conventions.
