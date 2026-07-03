# ARLO. — single-file e-commerce practice build (v2 of the third store)

Replaces `fieldwork-store` (deleted) after direct client feedback: "the only thing I like from that is when you scroll down it scrolls the slider besides that everything looked trash." Kept the one thing that landed — the scroll-jacked horizontal product rail — and rebuilt everything else: new brand, new palette/type, no hotspot pins, redone layout/spacing. Bottom-sheet cart was kept since it wasn't called out as a problem.

**Not a real client.** Business, products, and prices are invented — fine for a demo; no invented reviews/stats/credentials appear.

## What changed from the rejected FIELDWORK. draft
- **Business/brand**: small-batch ceramics/table-goods studio (ARLO.) instead of technical outdoor gear — a fresh canvas rather than reskinning the same copy.
- **Palette/type**: warm cream + charcoal + clay/terracotta + olive, Zilla Slab serif display + Inter body — replaces the cobalt/tangerine/monospace technical look entirely.
- **Hero**: simple large editorial headline + a single studio photo, no interactive hotspot pins (explicitly disliked — removed, not reworked).
- **Layout/spacing**: redone with more editorial breathing room (asymmetric grids, generous section padding) instead of the tighter technical-spec layout.
- **Kept**: the scroll-jacked horizontal product rail (GSAP `ScrollTrigger`-pinned, `x`-translated by scroll progress, visible progress bar) — the one piece of positive feedback — and the bottom-sheet cart, since it wasn't flagged as a problem.

## What's actually functional
- **Real client-side cart**: `localStorage` (`arlo_cart`), add/remove/qty/subtotal, merges same-product adds into one line item — verified via Playwright.
- **Bottom-sheet cart**: `inert`-toggled when closed.
- **Horizontal scroll-jack**: same proven mechanic as the prior build, restyled.
- **Newsletter form**: honeypot + no-op submit.

## What's explicitly NOT real
- No real payment/checkout — checkout button shows an explanatory alert.
- Product photography is placeholder (labeled SVG gradients).
- Studio/kiln claims are illustrative copy for a fictional brand.

## Bugs found and fixed during QA
1. **`--olive` (#6B7353) measured 4.4:1 against the cream background in the real browser render — just under the 4.5:1 AA text threshold**, despite an independent Python luminance calculation putting it at 4.41 (a rounding-edge false pass). Darkened to `#5A6146` (5.73:1) to build in real margin rather than relying on a value that only barely cleared the line on paper.

## QA result
1440px and 375px: 0 horizontal overflow, 0 axe-core violations, 0 real console/JS errors (remaining console entries are expected sandbox-network failures for fonts/CDN). Cart flow verified end-to-end via Playwright.
