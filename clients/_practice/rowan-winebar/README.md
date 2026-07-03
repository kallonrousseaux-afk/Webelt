# ROWAN & VINE — restaurant practice build

A neighborhood wine bar + kitchen. Full restaurant page: hero, hours strip, kitchen note, curated weekly menu (starters + oven), wine list callout, room gallery, real reservation form, footer.

**Not a real client.** Business, address, phone, menu, and prices are invented — fine for a demo; no invented reviews/awards/press appear.

## Design direction
Deep forest green `#1F3527` + warm ivory `#F4EFE4` + amber accents (light `#D9A66E` for dark-bg use, deep `#8A5A20` for light-bg use), DM Serif Display for headlines with italic pulls + Inter body. Moody-but-warm, wine-bar editorial — deliberately different from every prior build's palette (ivory/wine, cream/clay, dark/acid-lime, cool/mono-tech).

## What's actually functional
- **Reservation form**: name, date, time (30-min slots), party size, email, plus a honeypot field. Submit is intercepted, no real backend — the note updates in place to confirm the demo behavior and calls out that a real build would connect to Resy/OpenTable.
- **Curated menu section** with real dish descriptions and prices.
- **Wine list callout** with 5 by-the-glass + bottle prices on dark forest background.
- **Room gallery**: asymmetric bento-style grid (tall + wide + regular tiles) built with placeholder SVGs.
- **Motion**: quiet fade/rise reveals on scroll, no marquee or scroll-jack — the register calls for restrained, editorial motion.

## What's explicitly NOT real
- Reservation form doesn't send anything — call-out in the note.
- Photography is placeholder SVGs. The user opted to skip Higgsfield generation for this build; a real production version would swap in real food/interior photography.
- Address, phone, wine producers, and menu items are fictional but plausible.

## Bugs found and fixed during QA
1. **`--amber` (#B8823D) failed 3.94:1 on the forest dark background**, used in the hours-strip strong labels, the wine section's eyebrow, the wine-list price column, and the footer's italic ampersand — a systemic use of one token against the wrong background pairing (same pattern shape as FERUS.'s `--acid-deep` bug, gotcha #104). Added a separate `--amber-lite` (#D9A66E, 6.03:1) explicitly for dark-bg use and swapped all four call sites over.
2. **Footer-bottom text (#9C9484) on forest measured 4.37:1 — under the 4.5 threshold**. Lightened to #AAA294 (5.2:1) with real margin, applying the ARLO lesson (don't skim the threshold, target 5+).

## QA result
1440px and 375px: 0 horizontal overflow, 0 axe-core violations, 0 real console/JS errors (remaining console entries are expected sandbox-network failures for fonts/CDN). Reservation form honeypot verified, motion layer renders cleanly.
