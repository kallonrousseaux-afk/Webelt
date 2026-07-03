# Immigration & Paralegal — Third direction (v3)

Third design for the same client/content, testing genuinely different page architecture and a WebGL technique not used in v1 or v2.

## Revision history
- **Draft A**: persistent left sidebar nav (300px, fixed) instead of a top header, hover-reveal bento grid for services, click-to-expand accordion for process, no marquee/slide, amber accent palette. **Rejected**: "no animations at all" (there was reveal/hover/cursor motion, but no scroll-driven centerpiece — the build read as static next to v1/v2's spectacle) and "don't like the bar on the side."
- **Draft B (current)**: standard top header restored (matching v1/v2). Kept the bento grid and accordion — those weren't the complaint. Added a real WebGL centerpiece: five lit Three.js primitives (icosahedron, torus, octahedron, box, cone — one per service pathway) floating in the hero with independent rotation, plus a scroll-linked group rotation as the visitor scrolls past the hero. Explicitly a different technique from both v1 (fullscreen fBm shader, no real geometry) and v2 (DOM `clip-path` panel stack, no WebGL at all).

## Real bugs found and fixed
1. **Draft A**: `.bento-n`'s `opacity:.6` diluted an already-contrast-checked color to 2.43:1 (axe only caught it after scroll, since the card hadn't revealed on fresh load — see build-gotchas for the durable lesson).
2. **Draft A**: `.contact .eyebrow` was missing the dark-background color override the sidebar had, same class of oversight.
3. **Draft B**: the 3D object canvas (`width:56%`) overlapped the hero headline on a 1440px viewport — the text column and the WebGL canvas region shared screen space. Fixed by narrowing the canvas to `38%` and tightening the objects' orbital radius so they cluster clearly in the right portion instead of spreading toward center.

## QA result
1440px and 375px: 0 overflow, 0 console errors, 0 axe-core violations. `#gl3d.on` confirmed present (WebGL scene actually initialized and rendered, not just attempted). Full WebGL guard set applied (`prefers-reduced-motion` + `hover:hover` + width>900 + `THREE` existence check + try/catch on renderer + DPR≤1.5 + `IntersectionObserver` pause offscreen), matching every other WebGL centerpiece in this project. Bento hover-reveal and accordion click-to-expand re-verified working after the header swap.

## TODOs before this could ship
Same as v1/v2 — real business name/phone/address/hours/credentials/testimonial, Supabase keys, social share image, domain.
