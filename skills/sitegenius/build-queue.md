# Practice Build Queue — exercising the catalog

Goal: touch every register × tier combo once to graduate catalog recipes from documented to verified. Not real clients — throwaway practice builds in `clients/_practice/`.

- [x] 1. LocalSite, trust-first — accounting firm (baseline template, unmodified motion layer) — DONE (`clients/_practice/accounting-localsite/`), found+fixed grid overflow bug
- [ ] 2. AwardsSite, trust-first — immigration/paralegal — **DONE** (`clients/immigration-paralegal/`)
- [x] 3. AwardsSite, warm-local — restaurant (Trattoria Marchetti) — DONE (`clients/_practice/trattoria-awardssite/`), swapped WebGL aura for photo hero + draggable gallery, found+fixed dangling ScrollTrigger ref + copy-miss gotchas
- [x] 4. AwardsSite, craft/impact — trades (Ironclad Roofing) — DONE (`clients/_practice/ironclad-roofing/`), spotlight-cursor before/after centerpiece, Archivo Expanded (bold not italic — no italic cut for this family)
- [x] 5. AwardsSite, spectacle-tolerant — eyewear studio (Aurora Optics) — DONE (`clients/_practice/aurora-optics/`), scroll-scrubbed sequence centerpiece verified with real pixel-diff test
- [x] 6. LocalSite via full menu-driven intake (Voltage Fitness) — DONE (`clients/_practice/voltage-fitness/`), type-only statement hero (new pattern), full GSAP motion layer on LocalSite tier per brief, bright/vibrant palette built from scratch

Run one at a time. Keep practice builds lean — single QA pass, not multi-round.

- [x] 7. Multi-page real build (Barba.js in a full site, not synthetic) — trades (Ironclad Multipage) — DONE (`clients/_practice/ironclad-multipage/`), 3 real pages, full nav flow verified, cursor re-init across page swaps confirmed, 2 real bugs found+fixed (missing nav links, form-guard), 0 axe/overflow/console issues across all 3 pages × 2 viewports.
