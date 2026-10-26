# Design System — Easy Tech Development Website

A futuristic, modern, clean industrial brand. Dark by default with a signature
**purple → blue** gradient drawn from the company logo. Calm, technical, premium.

## Brand palette
| Token | Hex | Use |
|-------|-----|-----|
| Brand purple | `#6B1FA1` | Gradient start, accents, glows |
| Brand blue | `#2879B5` | Gradient end, links, secondary accent |
| Brand gradient | `linear-gradient(135deg, #6B1FA1, #2879B5)` | Buttons, text gradients, borders, glows |

## Theme tokens (Tailwind v4 + shadcn CSS variables)
Defined in `src/index.css` under `@theme` / `:root` and `.dark`.

Recommended shadcn token overrides:
- `--primary`: brand blue `#2879B5` (or a near-white on dark for contrast on filled buttons)
- `--ring` / focus: brand blue
- Backgrounds: deep near-black with a slight blue tint, e.g. `#0A0E1A` (dark), `#FFFFFF` (light)
- Surfaces/cards: translucent panels (`bg-white/5` + `backdrop-blur`) for glassmorphism
- Borders: `white/10` on dark, `black/10` on light
- Foreground text: high-contrast `#E8ECF4` on dark, `#0A0E1A` on light
- Muted text: `#94A3B8`-ish

> Rule: components reference tokens (`bg-background`, `text-primary`, `border-border`),
> never hard-coded hex, so dark/light both work.

## Typography
- **Headings**: `Space Grotesk` (geometric, technical, modern)
- **Body / UI**: `Inter` (shadcn default, highly legible)
- Loaded via Google Fonts `<link>` in `index.html`.
- Scale: large hero (clamp ~2.5–4.5rem), clear section headings, comfortable line-height (1.6 body).
- Use **GradientText** (magicui) for key hero/section headlines.

## Visual language (futuristic + clean)
- **Dark glassmorphism**: translucent cards with `backdrop-blur` and subtle 1px borders.
- **Backgrounds**: layered radial gradient glows (purple/blue) + `AnimatedGridPattern` (magicui) at low opacity behind heroes/sections.
- **Accents**: brand gradient on buttons, icons, underlines, and section dividers.
- **Motion**: subtle, purposeful. Scroll-reveal via `BlurFade`; hover lift on cards;
  `ShineBorder` on featured cards; `Marquee` for the brands strip; `NumberTicker` for stats.
- **Spacing**: generous section padding (py-20+ on desktop), max-width container (~1200px).
- **Radius**: rounded-xl to 2xl for a soft, modern feel.

## Components
- Base: shadcn `Button`, `Card`, `Input`, `Textarea`, `Select`, `Label`, `Badge`, `Separator`, `Sheet` (mobile menu), `Tooltip`.
- Magicui (registry): `AnimatedGridPattern`, `ShineBorder`, `Marquee`, `BlurFade`, `GradientText`, `NumberTicker`.
- Icons: `lucide-react` (consistent 1.5px stroke, currentColor).

## Logo & assets
- `public/symbol_logo.svg` — mark used in navbar (small).
- `public/full_logo.svg` — full logo for footer / about.
  - Note: wordmark is embedded as a raster image inside the SVG → not crisp at large
    sizes. Pair the symbol with gradient-styled text "Easy Tech Development" where a
    large wordmark is needed, or export a clean vector wordmark later.
- `public/gemini_hero.mp4` — hero background video. Render muted, autoplay, loop,
  `playsInline`; overlay a dark gradient for text legibility. Provide a poster/fallback
  gradient for reduced-motion / no-autoplay contexts.

## Accessibility & motion
- Respect `prefers-reduced-motion`: disable/limit transforms & autoplay video.
- Maintain WCAG AA contrast on text over gradients/glows.
- Visible focus rings (`--ring` = brand blue) on all interactive elements.
- Alt text / aria-labels on icons, images, and form fields.

## Do / Don't
- DO keep it minimal and breathable; let the gradient + glow do the work.
- DO keep motion subtle and fast (<400ms) — "clean" beats "busy".
- DON'T use clashing accent colors; stay within purple→blue + neutrals.
- DON'T overload a single screen with animations.
