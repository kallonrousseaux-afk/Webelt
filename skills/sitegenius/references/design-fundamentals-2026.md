# Design Fundamentals Playbook — Type, Color, Layout, Depth, UI Detail (July 2026)

Third research file. The Awwwards files cover spectacle, functional-sites covers conversion — this one covers why a site *looks fantastic* in the first place, for any site type. Rated /10 for impact on perceived quality per effort.

---

## 1. Typography System — 10/10

The single biggest expensive/cheap signal on any site.

- **Two fonts max**: one display, one body. Editorial pairing (serif display + grotesk body) already our default: Fraunces + Hanken Grotesk.
- **Modular type scale**: pick a ratio, generate every size from it — never eyeball sizes. Ratios: Minor Third 1.2 (dense/functional), Major Third 1.25 (balanced default), Perfect Fourth 1.333 (editorial drama). 6–8 steps total.
- **Fluid type with `clamp()`** — one continuous curve, no breakpoint jumps. Use [Utopia](https://utopia.fyi) to generate the whole scale at once:
  ```css
  --step-0: clamp(1rem, 0.93rem + 0.33vw, 1.19rem);      /* body */
  --step-4: clamp(2.49rem, 1.95rem + 2.68vw, 4.03rem);   /* h1 */
  ```
  **Always a rem-based minimum, never viewport-only** — respects user font-size settings (a11y).
- Heading `line-height` 1.02–1.15, body 1.5–1.7. `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. `letter-spacing` slightly negative on large display (−.02em), never negative on body.
- 45–75 characters per line (`max-width: 65ch` on prose).

## 2. Color System — 9/10

- **60-30-10**: 60% dominant (bg/surfaces), 30% secondary (cards, sections), 10% accent (CTAs, links, active states). If the accent appears on more than ~10% of the page it stops being an accent — our #B0492A usage is correct.
- **Warm neutrals are the 2026 direction** — Pantone COY "Cloud Dancer" (pale warm neutral); organic off-white over cold corporate white. Validates the RNR cream/ink palette; reuse the principle for clients: tint the neutral toward the brand's temperature.
- **Build palettes in OKLCH** (W3C Design Tokens spec now mandates it): perceptually uniform lightness steps, so a 10-step ramp actually looks even. `oklch(97% 0.01 85)` → step lightness down evenly. CSS support is universal.
- **WCAG AA is structural, not a QA afterthought** — 4.5:1 body, 3:1 large text/UI. EU accessibility law now enforces it. Bake contrast pairs into tokens: every bg token ships with its approved ink token.
- One or two brand hues + a neutral ramp. Never more.

## 3. Layered Shadows + Border Craft — 9/10

- **A single box-shadow always reads cheap.** Stripe/Linear/Vercel layer 3–4 shadows: a sharp low-offset "key" shadow (contact edge) + soft large-blur "ambient" shadows. Tint shadows with the background hue, never pure black — our `--shadow-*` stack already does this; make it the standard on every client build.
- **Subtle border + soft shadow together** beats either alone: `border: 1px solid rgba(ink, .08)` + layered shadow = structure and depth.
- All elevations from one light source (shadows all fall the same direction, offset/blur grow with elevation).
- 2026 splits two ways, matching the aesthetic-camps rule: **glassmorphism** (translucent panels, `backdrop-filter: blur`, soft separation — techno-futurist camp) vs **tactile brutalism** (sharp geometry, 1px solid borders, no blur — engineered precision). Pick per client, don't mix.

## 4. Bento Grid + Asymmetric Layout — 8/10

The dominant 2026 layout language for feature/services sections; replaces equal-card grids.

- Asymmetric tile sizing = hierarchy through spatial weight: **the anchor tile ≥ 2× the area of the largest supporting tile**. One big tile says "this matters most."
- ~20–30% inner whitespace per cell; `gap` is a design element (16–24px), not an absence.
- Claims of +23% scroll depth / higher dwell time vs uniform grids (vendor numbers — direction is right, treat magnitudes loosely).
- CSS: `grid-template-columns: repeat(4, 1fr)` + `grid-column/row: span n` per tile; collapse to single column ≤900px (overlap rule applies).
- Complements the existing 60/40 and 7/5 asymmetric-grid rule in premium-craft.

## 5. Micro-Interactions & Button States — 8/10

Where "considered" is felt rather than seen.

- **Timing: 0.2–0.3s hover response**, ease-out. Slower feels laggy, faster feels jumpy.
- Every interactive element needs **4+ states designed, not defaulted**: default / hover / active / focus-visible (+ loading, disabled where relevant). `:active { transform: scale(.96) }` already our rule; add designed `:focus-visible` everywhere (a11y + polish in one).
- 2026 direction is **restraint**: "natural, not theatrical." Motion on primary CTAs to guide attention; everything else quiet. Specific properties only (never `transition: all`).
- Form micro-feedback: input focus glow (border-color + soft ring), inline validation on blur, button → loading state on submit. This is most of the perceived quality of the booking/form upsells.

## 6. Navigation & Header — 8/10

- **Sticky headers: ~22% faster navigation, mid-single-digit conversion lift.** Compact — shrink on scroll (our 90px scroll-padding pairs with this). Prefer `position: sticky`.
- **"Smart sticky"** (hide on scroll-down, reveal on scroll-up) for content-heavy pages — good mobile pattern, more screen for content.
- **5–7 top-level items max** for SMB sites. More than that = grouping problem, not a menu problem.
- Mega menus only for genuinely deep catalogs; if used: 200ms hover-intent delay, keyboard support via `:focus-within`, hidden ≤768px in favor of accordion.
- Mobile: hamburger opens a full-screen overlay with large tap targets — not a squeezed dropdown.

## 7. Footer Patterns — 6/10

- Footer is the "dead-end catcher": user scrolled to the bottom — give them an action (CTA repeat), then wayfinding, then legal/NAP.
- SMB footer recipe: mini-CTA band ("Ready? Get your site → ") → columns (services / pages / contact-NAP with `tel:` link) → legal line. NAP here feeds local SEO on every page.
- Long marketing pages: utility-only footer is fine; the mid-page CTAs do the work.

---

## Assembly order for any new site

1. Tokens first: type scale (clamp/Utopia) + OKLCH color ramp with AA pairs + shadow stack + spacing scale.
2. Pick the aesthetic camp (editorial vs techno-futurist) — governs shadows (soft vs 1px borders), radius, imagery.
3. Layout: hero (10-second test from functional-sites) → bento/asymmetric sections → footer recipe.
4. States pass: hover/active/focus-visible on every interactive element, 0.2–0.3s.
5. Then and only then: motion/spectacle from the Awwwards files.

## Sources

- https://typographyhandbook.com/ · https://fontfyi.com/blog/fluid-typography-css-clamp/ · https://remtopx.com/blog/responsive-typography-best-practices/ · https://www.onething.design/post/a-guide-to-typography-in-web-design
- https://ixdf.org/literature/article/ui-color-palette · https://www.uxpin.com/studio/blog/choose-color-pallete/ · https://designsystem.digital.gov/design-tokens/color/overview/ · https://colorpickercode.com/blog/best-website-color-palettes-2026/
- https://www.joshwcomeau.com/css/designing-shadows/ · https://fireart.studio/blog/the-best-web-design-trends/ · https://www.theedigital.com/blog/web-design-trends
- https://brainy.ink/paper/bento-grid-design-guide · https://www.orbix.studio/blogs/bento-grid-dashboard-design-aesthetics · https://senorit.de/en/blog/bento-grid-design-trend-2025
- https://www.uxpin.com/studio/blog/button-states/ · https://www.designstudiouiux.com/blog/micro-interactions-examples/ · https://blog.tubikstudio.com/ui-design-trends-2026/
- https://smart-interface-design-patterns.com/articles/sticky-menus/ · https://www.eleken.co/blog-posts/footer-ux · https://laurentaylar.com/blog/website-header-navigation-menu · https://logoswebdesigns.com/blog/website-navigation-design-that-converts-2026/
