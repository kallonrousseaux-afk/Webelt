# Immigration & Paralegal — Alternate direction (v2)

Second design direction for the same client as `clients/immigration-paralegal/`, built for side-by-side comparison. Same business facts, same content, same AwardsSite tier and QA bar — different design.

## How it differs from v1
| | v1 (`immigration-paralegal/`) | v2 (this build) |
|---|---|---|
| Palette | Dark navy + brass gold | Light editorial paper + terracotta clay |
| Display font | Playfair Display | Fraunces |
| Hero | Full-bleed WebGL fBm aura shader behind headline | Type-only statement hero, no WebGL |
| Centerpiece | Aura shader + pinned horizontal process cards + continuity orbit | Scroll-scrubbed "application, stamped through" document sequence (self-authored SVG frames) |
| Section rhythm | Dark hero → dark marquee → light services → dark process → mixed | Light hero → dark marquee → light services → dark centerpiece → light quote → dark CTA → light contact → dark footer |

Both keep: intro word-reveal, labeled cursor, magnetic CTAs, scroll reveals, RLS-documented Supabase form, full guard set (reduced-motion, no-JS, print).

## QA result
1440px and 375px: 0 overflow, 0 console errors, 0 axe-core violations. Contrast-checked the full custom palette — found and fixed one real fail (`--clay` #B5551F was 4.43:1 on paper, under the 4.5:1 AA text threshold; darkened to `#A64E1C` at 5.09:1). intro/lock/no-JS guard set verified identically to v1's fixed pattern.

## TODOs before either version could ship
Same as v1 — real business name/phone/address/hours/credentials/testimonial, Supabase keys, social share image, domain.
