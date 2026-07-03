# Immigration & Paralegal — Alternate direction (v2)

Second design direction for the same client as `clients/immigration-paralegal/`, built for side-by-side comparison. Same business facts, same content, same AwardsSite tier and QA bar — different design.

Went through 3 drafts based on direct feedback each round — see revision history below and the comment block at the top of `index.html`.

## Current design (draft 3)
| | v1 (`immigration-paralegal/`) | v2 (this build, draft 3) |
|---|---|---|
| Palette | Dark navy + brass gold | Warm ivory paper + deep plum + muted teal accent |
| Display font | Playfair Display | Fraunces |
| Hero | Full-bleed WebGL fBm aura shader behind headline | Type-only statement hero, no WebGL |
| Centerpiece | Aura shader + pinned horizontal process cards + continuity orbit | Pinned stacked-panel reveal (clip-path wipe, no canvas, no line-draw) |
| Section rhythm | Dark hero → dark marquee → light services → dark process → mixed | Light hero → dark marquee → light services → dark centerpiece → light quote → dark CTA → light contact → dark footer |

Both keep: intro word-reveal, labeled cursor, magnetic CTAs, scroll reveals, RLS-documented Supabase form, full guard set (reduced-motion, no-JS, print).

## Revision history
- **Draft 1**: clay/navy palette (a lighter take on v1's tones), scroll-scrubbed square canvas illustration as centerpiece (a document with a stamp animating through 4 stages). **Rejected**: "that square is gross, don't use that again."
- **Draft 2**: added a second accent (`--forest`, deep green) alongside clay, replaced the canvas with a horizontal scroll-drawn line timeline. **Rejected**: palette only partially liked ("take that away" re: an earlier gold option), asked for a completely new palette, and the timeline centerpiece was also rejected — asked for a different technique entirely.
- **Draft 3 (current)**: fully new palette — warm ivory/plum/teal, no reused clay or forest. New centerpiece — a pinned stacked-panel reveal using `clip-path` wipes (4 full-viewport panels stacked with `z-index`, each revealing over the last as the section is pinned and scrolled). Found and fixed a real bug during this draft: panels lacked `z-index` stacking, so mid-transition both the outgoing and incoming panel's text rendered simultaneously, overlapping — fixed by giving each panel an explicit `z-index` and opaque background.
- The now-declined square-canvas recipe is flagged in `skills/sitegenius/references/design-options-catalog.md` (scroll-scrubbed image sequence entry) so the skill doesn't default back to it for this register.

## QA result
1440px and 375px: 0 overflow, 0 console errors, 0 axe-core violations. Full contrast pass on the new teal/plum palette — every pair clears AA (4.3:1 to 16.5:1 across all text/background combinations tested). intro/lock/no-JS guard set verified identically to v1's fixed pattern. Pinned panel-stack centerpiece visually verified at 4 scroll checkpoints — no overlap after the z-index fix, dot progress indicator tracks correctly.

## TODOs before either version could ship
Same as v1 — real business name/phone/address/hours/credentials/testimonial, Supabase keys, social share image, domain.
