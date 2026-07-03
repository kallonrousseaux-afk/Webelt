# FERUS. — 3-page e-commerce practice build

Fictional streetwear label, built to test the skill's range on a genuinely different content type (product catalog + cart, not a lead-gen service business) and full creative freedom on direction. AwardsSite-tier, spectacle-tolerant register.

**Not a real client.** Business is invented (name, products, prices) — that's fine for a demo; what's never invented is real business facts (reviews, credentials, stats). No such claims appear here.

## Pages
- `home.html` — hero, product marquee, 3-item featured grid, newsletter signup.
- `shop.html` — full 6-product grid, hover front/back image swap, add-to-cart on hover.
- `product.html` — single fixed product-detail template (reads `?id=` from `ferus-shared.js`'s `PRODUCTS` array; defaults to the utility jacket), size selector, related products.

Real 3-page Barba.js SPA navigation (verified pattern from `ironclad-multipage`) — no page reloads, `document.title` synced per page.

## `onepage.html` — single-file download-and-view version
The 3-page version needs `ferus-shared.js` served alongside the HTML files (relative `<script src>`), which breaks if only individual HTML files get downloaded/shared without it — the intro overlay never resolves because none of the JS that hides it ever loads (screenshot-confirmed: the page gets stuck showing just the word "Ferus." forever, with everything else invisible). **`onepage.html` is a single self-contained file** with Home/Shop/Featured as anchor-linked sections on one page instead of separate files, and all JS inlined — same design, same real cart, no external file dependency. Use this one for a plain download-and-open preview; use the 3 separate files only when they'll actually be served together (a real webserver, or all 4 files kept in the same folder).

## Design direction (chosen freely)
Near-black + off-white + acid lime (`#C8FF3D`) — bold, high-contrast streetwear editorial. Archivo Expanded (uppercase display) + Hanken Grotesk body. Marquee ticker, magnetic CTAs, hover image-swap product cards, slide-in cart drawer.

## What's actually functional (not a mockup)
- **Real client-side cart**: `localStorage`-backed, add/remove/quantity/subtotal math, persists across all 3 pages through Barba navigation (verified: added an item on `shop.html`, incremented qty, navigated to `product.html` via a real click, confirmed the cart count and full `localStorage` state survived the navigation and correctly merged a same-product add into the existing line item).
- **Cart drawer**: slide-in panel, keyboard-safe (`inert` when closed — see bugs below), qty +/− buttons, remove.
- **Newsletter form**: same Supabase + RLS + honeypot pattern used in every other build in this project.

## What's explicitly NOT real (flagged as TODO in the files)
- No real payment/checkout processing — the checkout button shows an explanatory alert, not a payment flow. A real store needs Stripe/Shopify/similar.
- `product.html` is one fixed template, not a real per-product page router — production would need a backend/CMS to generate one URL per SKU.
- Product photography is placeholder (labeled SVG gradients, same pattern as every other practice build — never a broken `<img>`).

## Real bugs found and fixed during QA
1. **`--muted-dark` (#5C5C56) failed AA on the dark background** (2.94:1, used for legal text/footer copyright) — despite being specifically named for dark-bg use. Lightened to `#85857C` (5.32:1).
2. **`aria-hidden="true"` on the closed cart drawer, which still contained focusable elements** (close button, checkout button, quantity controls) — axe correctly flags this as invalid: `aria-hidden` on a container with focusable descendants is a real WCAG violation regardless of visual (off-screen) state. Fixed by switching to the `inert` attribute (toggled on close/off on open) instead — `inert` correctly removes both focusability and AT-exposure at once, which `aria-hidden` alone does not for interactive content.
3. **Heading order skip on `shop.html`**: product-card `<h3>`s appeared directly under the page's `<h1>` with no `<h2>` in between. Fixed with a visually-hidden (`.sr-only`) `<h2>Products</h2>` before the grid.
4. **`--acid-deep` (#9FCC1F) failed badly (1.65:1) on the light `.news` section background** — this token was only ever contrast-checked against dark backgrounds elsewhere in the project; nobody had tested it against the light paper section it's actually used in here. Only reproducible after scrolling the section into view (GSAP reveal state), not on a fresh unscrolled page load — real bug, not a QA-script timing artifact (confirmed by checking the specific failing node, not just re-running with a longer wait). Darkened to `#4C610E` (6.09:1).

## QA result
1440px and 375px, all 3 pages: 0 overflow, 0 console errors, 0 axe-core violations (after the 4 fixes above). Real functional cart flow tested end-to-end via Playwright (add → qty → cross-page persistence → merge), not just visually inspected.
