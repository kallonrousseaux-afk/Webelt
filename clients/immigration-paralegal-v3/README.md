# Immigration & Paralegal — Third direction (v3)

Third design for the same client/content, this time testing a genuinely different **page architecture**, not just palette/centerpiece variations — per explicit request to keep exercising the skill's range.

## What's different from v1 and v2
- **Persistent left sidebar nav** (300px, fixed) instead of a top header — logo, nav, mini contact info, and the primary CTA all live in one always-visible rail. Active section highlights on scroll.
- **Hover-reveal bento grid** for services instead of a row list (v1/v2) — cards expand their description on hover/focus, one large "hero" card plus four smaller ones.
- **Click-to-expand accordion** for the process section instead of any scroll-scrubbed or pinned technique — a genuinely different interaction model (click, not scroll).
- **No marquee.** No pinned slide/stack of any kind.
- New palette: warm bone/near-black ink + single amber accent — distinct from v1's navy/brass and v2's teal/plum.

## Real bugs found and fixed during this build
1. **Contrast fail found by axe, only reproducible after scroll**: `.bento-n` (the large decorative index number on each service card) used `opacity:.6` on top of an already-contrast-checked color, diluting it to 2.43:1 — well under the 3:1 large-text minimum. The bug was invisible on a fresh page load because the cards' reveal animation hadn't fired yet (still `opacity:0`), so axe had nothing to measure; it only showed up once scrolled into view. Fixed by removing the opacity dimming — the base color already passes at full opacity. **Lesson**: contrast math on a base hex value doesn't account for CSS `opacity` layered on top in the actual rule — check the rendered/computed color, not just the source hex.
2. **`.contact .eyebrow` inherited the light-background amber-deep color while sitting on the dark sidebar-color contact section** — missing the same dark-background override `.sidebar .eyebrow` already had. Fixed by adding `.contact` to that selector.

## QA result
1440px and 375px: 0 overflow, 0 console errors, 0 axe-core violations (after both fixes above). Bento hover-reveal and accordion click-to-expand both visually verified working. Sidebar collapses to a simple top bar at ≤900px per the standing mobile rules.

## TODOs before this could ship
Same as v1/v2 — real business name/phone/address/hours/credentials/testimonial, Supabase keys, social share image, domain.
