# Design Options Catalog — pick-list for client builds

Quick-reference menu of every technique in the bundle. ✅ = already coded in a starter template (transplantable). Tier: L = LocalSite, A = AwardsSite, B = both.

## Scroll & motion
| Option | Tier | Status |
|---|---|---|
| Staggered scroll reveals (GSAP ScrollTrigger) | B | ✅ both starters |
| Line-by-line hero headline reveal | B | ✅ awardssite |
| Intro/preloader brand reveal (word rises, curtain lifts) | A | ✅ awardssite |
| Parallax scroll (decorative layers at different speeds) | B | ✅ awardssite (orbs, quote mark, rings) |
| Pinned horizontal-scroll section (scrub) | A | ✅ awardssite (process) |
| Continuity element (orb/shape morphing across whole page) | A | ✅ awardssite (orbit) |
| Infinite marquee strip | B | ✅ awardssite |
| Count-up numbers on scroll | B | webelt.ca example |
| Clip-path wipe reveals (inset 100%→0) | B | pattern in luxury-techniques |
| Variable-font weight driven by scroll | A | code in awwwards-research-2026 §2 |
| Scroll-snap storytelling (GSAP Observer state machine) | A | pattern in awwwards-research-2026 §3 |
| CSS view-timeline reveals (zero-JS) | L | pattern in functional/design refs |
| Smart-sticky header (hide down, reveal up) | B | ✅ awardssite |

## Cursor & hover
| Option | Tier | Status |
|---|---|---|
| Custom cursor: dot + trailing labeled ring ("View"/"Book") | B | ✅ awardssite |
| mix-blend-mode difference cursor | B | webelt.ca example |
| Magnetic buttons (pull toward cursor) | B | ✅ awardssite |
| 3D hover tilt on cards (≤12deg) | B | webelt.ca example |
| Editorial list hover (row shifts, bg fills, arrow rotates) | B | ✅ awardssite (services) |
| Grayscale→color "paint" hover | B | pattern in awwwards-research-2026 §5 |
| Nav underline slide (scaleX origin swap) | B | ✅ awardssite |

## WebGL / spectacle (desktop + motion-on only)
| Option | Tier | Status |
|---|---|---|
| fBm living aura shader (breathing, cursor-reactive, palette-graded) | A | ✅ awardssite + webelt.ca |
| Single-progress-uniform shader transitions (block reveal, displacement, chromatic aberration) | A | code in awwwards-research-2026 §1 |
| Stencil-buffer scene masking / SDF logo morph | A | code in awwwards-techniques §3 |
| Instanced 3D objects (single draw call) | A | code in awwwards-techniques §7 |
| three-mesh-bvh interactive raycasting | A | code in awwwards-techniques §4 |

## Layout & editorial
| Option | Tier | Status |
|---|---|---|
| Bento grid (anchor tile ≥2×) | B | ✅ localsite |
| Editorial numbered list layout (01/02 index rows) | B | ✅ awardssite |
| Oversized outlined display word (text-stroke) | B | ✅ awardssite (step numerals) |
| Giant italic serif accent words in headings | B | ✅ both |
| Full-viewport type-led hero | A | ✅ awardssite |
| Photo/device-mock hero (work shown in browser frame) | B | ✅ localsite + webelt.ca |
| Asymmetric 60/40 · 7/5 grids | B | premium-craft rules |
| Section background rhythm (dark→light→dark→cream) | B | ✅ awardssite |
| Horizontal → vertical collapse ≤900px | B | ✅ awardssite |

## Texture & depth
| Option | Tier | Status |
|---|---|---|
| Film grain overlay (SVG noise, 5–7%) | B | ✅ both starters |
| Layered tinted shadows (3–4 layers, never pure black) | B | ✅ localsite |
| 1px border + soft shadow card treatment | B | ✅ both |
| Glassmorphism header (backdrop blur) | B | ✅ awardssite |
| Gradient veil over hero media for text legibility | B | ✅ awardssite |
| Decorative concentric rings / orbs | B | ✅ awardssite |

## Forms & conversion furniture
| Option | Tier | Status |
|---|---|---|
| Lined editorial form (fields as rows, focus tint) | B | ✅ awardssite |
| Card form with focus ring glow | L | ✅ localsite |
| 3-field + honeypot + Supabase handler | B | ✅ both |
| Click-to-call sticky header · NAP footer · schema JSON-LD | B | ✅ both |
| Drip scroll-cue indicator | A | ✅ awardssite |

Pairing guidance: pick 1 spectacle item + 2–3 scroll/hover items + the texture stack per build. Everything obeys the standing guards (reduced-motion, ≤900px, transform/opacity only). When Kallon asks for options on a build, present choices from this catalog via AskUserQuestion.
