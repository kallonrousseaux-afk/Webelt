# MERIDIAN. — single-file e-commerce practice build

Second e-commerce demo, built deliberately "very different" from FERUS. — same content type (product catalog + real cart), opposite register: quiet ivory/wine luxury-editorial instead of dark acid-lime streetwear.

**Not a real client.** Business, products, and prices are invented — fine for a demo; no invented reviews/stats/credentials appear.

## Single file by design
Built as one self-contained `index.html` from the start — no separate pages, no external shared JS file. This is a direct lesson from FERUS.'s 3-page build, which broke completely when only the HTML files were downloaded without its required `ferus-shared.js` (nothing ever rendered past the intro overlay). MERIDIAN. never has that failure mode: download this one file and everything works.

## What's different from FERUS.
- **Palette/type**: ivory `#F7F2ED` + near-black ink + wine `#7A2E3A` + gold accent, Fraunces serif display + Inter body — vs. FERUS.'s near-black + acid lime, all-caps Archivo Expanded.
- **Hero**: full-bleed looping video background (Higgsfield-generated Winnipeg, MB aerial scenery — Red/Assiniboine river confluence at The Forks) instead of a static/motion-graphic hero.
- **Product browsing**: horizontal drag-to-scroll carousel + slide-in quick-view panel with size selection, instead of a grid with hover image-swap.
- **Motion**: quiet fade/rise reveals only — no marquee ticker, no magnetic cursor, no scroll-pinned slide sequence.

## What's actually functional
- **Real client-side cart**: `localStorage` (`meridian_cart`), add/remove/qty/subtotal math, merges same product+size into one line item. Verified via Playwright: add from carousel → increment qty → add a different product+size from quick-view → confirmed 2 distinct correct line items in `localStorage`.
- **Cart drawer**: slide-in, `inert`-toggled when closed (not `aria-hidden`, learned from the FERUS. bug).
- **Quick-view panel**: same `inert` pattern, size selector, add-to-bag.
- **Newsletter form**: honeypot + no-op submit (no real backend — this is a demo).
- **Hero video**: `IntersectionObserver` pause/play discipline; header text/logo/cart color flips based on whether the video hero is still in view.

## What's explicitly NOT real
- No real payment/checkout — checkout button shows an explanatory alert.
- Product photography is placeholder (labeled SVG gradients).
- Hero video is referenced directly from its Higgsfield CDN URL (the build sandbox can't download/re-host CloudFront assets) — works fine in a real browser outside the sandbox; degrades gracefully to the `.hero-veil` background color if the video fails to load.

## Soft section-color transitions
Section background changes (ivory → dark `.feature` → tan `.news` → dark footer) crossfade in gradually as you scroll, instead of cutting hard at the section boundary — each section's `background-color` is CSS-declared as normal (so it's correct with zero JS) and GSAP/ScrollTrigger tweens it from the previous section's color into its own over a short scroll range right before that section's content reveals, closing before the text fades in so there's never a low-contrast overlap window.

## Bugs found and fixed during QA
1. **Heading order**: footer used `<h4>` directly after the last `<h2>` (news section), skipping `<h3>`. Fixed by making the footer's "Shop"/"Support" headings `<h3>`.
2. **Missing landmark region**: axe flagged 29 nodes for `region` — page content wasn't wrapped in a `<main>` landmark between the header and footer. Fixed by wrapping the hero/statement/shop/feature sections in `<main>`.
3. **Mismatched closing tag** introduced while fixing #1 (`<h3>Shop/h4>`, `<h4>${p.name}</h3>` in the cart-line template) — caught by HTML parse + axe re-run, fixed directly.
4. **First draft of the section-color crossfade removed each section's own `background-color` and relied on a single fixed backdrop `<div>` painted entirely by JS.** Two real problems: (a) axe/any DOM-ancestor-based contrast tool can't see a fixed sibling element as a text node's effective background, so it reported white (the real default) as the background and flagged every dark-section text node as a contrast failure — genuinely correct, since the DOM no longer has any provable ancestor background; (b) more importantly, if GSAP fails to load for any reason (blocked CDN, disabled JS), the backdrop never gets painted at all and every "colored" section falls through to plain white — an actual visual regression, not just a tooling quirk. Fixed by reverting to each section's own real CSS `background-color` (so the no-JS/no-GSAP state is identical to the original hard-cut design and passes contrast checks on its own) and having GSAP tween that section's own background property, not a separate layer.

## QA result
1440px and 375px: 0 horizontal overflow, 0 axe-core violations, 0 real console/JS errors (the only console entries are expected sandbox-network failures for the video/CDN/fonts, not app bugs). Cart flow verified end-to-end via Playwright, not just visually.
