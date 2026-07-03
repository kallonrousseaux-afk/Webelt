# Practice / Regression Builds

Not real clients — throwaway builds generated to exercise `sitegenius`'s full register × tier matrix and the design-options catalog. Kept intentionally (not deleted) as a **regression set**.

| Build | Tier | Register | Centerpiece |
|---|---|---|---|
| `accounting-localsite/` | LocalSite | Trust-first | Baseline template, unmodified motion layer |
| `trattoria-awardssite/` | AwardsSite | Warm-local | Photo hero + draggable gallery |
| `ironclad-roofing/` | AwardsSite | Craft/impact | Spotlight-cursor before/after |
| `aurora-optics/` | AwardsSite | Spectacle-tolerant | Scroll-scrubbed 360° sequence |
| `voltage-fitness/` | LocalSite | Bold/loud (custom) | Type-only statement hero, full GSAP layer |

## Re-run after any starter template change
Whenever `templates/localsite-starter/index.html` or `templates/awardssite-starter/index.html` changes, re-run the QA harness (`skills/sitegenius/references/build-gotchas.md` §QA) against these five builds before touching a real client — they were each chosen to stress a different part of the system (grid layout, centerpiece swap, font swap, scroll-behavior, and the menu intake path) and are cheap early-warning for regressions.

Full history and the bugs each build caught: `skills/sitegenius/build-queue.md` and `skills/sitegenius/references/build-gotchas.md` (entries #15-25).
