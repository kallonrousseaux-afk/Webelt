# FIELDWORK. — single-file e-commerce practice build

Third e-commerce demo. Same content type as FERUS. and MERIDIAN. (product catalog + real cart), but every centerpiece technique and interaction pattern is different from both.

**Not a real client.** Business, products, and prices are invented — fine for a demo; no invented reviews/stats/credentials appear.

## What's different from FERUS. and MERIDIAN.
- **Palette/type**: cool paper `#EEF0F2` + navy ink + cobalt + tangerine accent, Space Grotesk display + JetBrains Mono for labels/prices — a technical/utility register, distinct from FERUS.'s dark streetwear and MERIDIAN.'s ivory luxury-editorial.
- **Product browsing centerpiece**: a horizontal, scroll-jacked product rail — the shop section pins to the screen and the cards translate sideways as the visitor scrolls vertically, with a progress bar. Neither FERUS.'s hover-swap grid nor MERIDIAN.'s free-drag carousel does this — this one is scroll-driven, not pointer-driven.
- **Hero interaction**: a hotspot/pin product image (tap a pin on the lifestyle shot to reveal a mini product card and add to cart) instead of a video background or a static headline-only hero.
- **Cart UI**: a bottom sheet (mobile-app style, slides up from the bottom edge) instead of a side drawer.
- **No generated video/image asset** — placeholder SVGs throughout, consistent with the project's placeholder-imagery convention.

## What's actually functional
- **Real client-side cart**: `localStorage` (`fieldwork_cart`), add/remove/qty/subtotal, merges same-product adds from either entry point (hotspot pin or scroll-rail card) into one line item — verified via Playwright: added from the horizontal rail, incremented qty, then added the *same* product again via its hotspot pin, and confirmed it merged into the existing line (qty 3, not two separate lines).
- **Bottom-sheet cart**: `inert`-toggled when closed (learned pattern from FERUS., gotcha #103), not `aria-hidden`.
- **Hotspot pins**: click to open a mini product card, click outside or another pin to close; add-to-cart from the card auto-opens the cart sheet.
- **Horizontal scroll-jack**: GSAP `ScrollTrigger`-pinned track, `x` translated by scroll progress, with a visible progress bar so the interaction is legible (not just "the page scrolled sideways for no visible reason").
- **Newsletter form**: honeypot + no-op submit, same pattern as every other build in this project.

## What's explicitly NOT real
- No real payment/checkout — checkout button shows an explanatory alert.
- Product photography is placeholder (labeled SVG gradients).
- Spec numbers (20K mm waterproof rating, 5-year warranty, etc.) are illustrative marketing copy for a fictional brand, not real tested claims.

## Bugs found and fixed during QA
1. **Double-escaped apostrophe broke the newsletter success message's JS entirely.** Written as `'You\\'re on the list...'` — the double backslash produced a literal `\` character followed by a real `'`, which closed the string early and left `re on the list` as a dangling identifier, throwing a real syntax error (`Unexpected identifier 're'`) that halted all subsequent script execution on the page. Caught by the QA harness's `pageerror` listener, not a linter (this is a template-literal file, not run through a JS toolchain). Fixed by switching to a double-quoted string (`"You're on the list..."`) so the apostrophe never needs escaping.
2. **Same root mistake, lower severity, in the product-detail alert**: `'\\n\\n'` produced the literal two-character sequence `\n\n` instead of two real newlines, so the "Details" popup would have shown a literal backslash-n instead of a blank line. Fixed to a real escaped newline (`'\n\n'`).

## QA result
1440px and 375px: 0 horizontal overflow, 0 axe-core violations, 0 real console/JS errors after the fix (remaining console entries are expected sandbox-network failures for fonts/CDN, not app bugs). Cart flow verified end-to-end via Playwright including the cross-entry-point merge case.
