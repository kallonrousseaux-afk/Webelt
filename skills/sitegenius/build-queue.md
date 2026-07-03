# Practice Build Queue — exercising the catalog

Goal: touch every register × tier combo once to graduate catalog recipes from documented to verified. Not real clients — throwaway practice builds in `clients/_practice/`.

- [x] 1. LocalSite, trust-first — accounting firm (baseline template, unmodified motion layer) — DONE (`clients/_practice/accounting-localsite/`), found+fixed grid overflow bug
- [ ] 2. AwardsSite, trust-first — immigration/paralegal — **DONE** (`clients/immigration-paralegal/`)
- [x] 3. AwardsSite, warm-local — restaurant (Trattoria Marchetti) — DONE (`clients/_practice/trattoria-awardssite/`), swapped WebGL aura for photo hero + draggable gallery, found+fixed dangling ScrollTrigger ref + copy-miss gotchas
- [ ] 4. AwardsSite, craft/impact — trades or gym (centerpiece: spotlight cursor before/after)
- [ ] 5. AwardsSite, spectacle-tolerant — new centerpiece (3D model viewer or scroll-scrubbed sequence)
- [ ] 6. LocalSite via full menu-driven intake (not "you decide") — confirms that path

Run one at a time. Keep practice builds lean — single QA pass, not multi-round.
