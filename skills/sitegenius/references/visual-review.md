# Visual Self-Review — the "ugly check" the QA harness can't do

**Why this exists**: automated QA catches *broken* (contrast, overflow, JS errors) but not *ugly*. The two worst misses in project history — v3's squished WebGL objects and the wholesale FIELDWORK rejection — both passed every automated gate and were caught by Kallon's eyes. This protocol is how they get caught by ours first.

**When**: after QA gates pass, before delivery. Every build, no exceptions. Budget ~10 minutes.

## Procedure

1. Screenshot the build at **1440×900** at 4+ scroll positions: hero, each major section boundary, the centerpiece mid-interaction (scroll-jack halfway, panel mid-wipe), and the footer. Then **375×812**: hero + one content section + any horizontal-scroll element.
2. **Open and LOOK at every screenshot.** Not a glance — answer the checklist below in writing (a sentence per item in your head is fine; a failure gets written down and fixed).
3. If any answer is "no," fix it before delivery. If unsure, fix it anyway — "unsure" from us renders as "trash" feedback from the client.

## The checklist

**Composition & spacing**
- Does the hero fill its space with intent — headline, support, CTA, and imagery in a deliberate arrangement — or does it look like items dropped into a grid?
- Is vertical rhythm consistent? (Section paddings should feel like one system — no section noticeably tighter/looser than its neighbors.)
- Is any text sitting on top of, colliding with, or crowded by a decorative element? (v3 overlap bug — measure, don't eyeball, when a decorative layer and text share a region.)
- At 375px: does anything overlap, wrap awkwardly (single-word orphan lines in headlines), or shrink below readable?

**Type & hierarchy**
- Is there exactly one clearly-dominant type moment per screen? (Two competing large elements = neither reads.)
- Do proportions look right — are display sizes actually display-sized (clamp upper bound reached at 1440), or is everything timidly medium?
- Does the type pairing match the register (serif warmth vs. grotesk edge), and is the italic/weight the CSS asks for actually rendering (not faux-bolded/faux-italicized)?

**Color & imagery**
- Do all images/placeholders share one temperature and grade, or does one tile break the family?
- Do section background changes feel sequenced (rhythm: light → surface → dark → light), or arbitrary?
- Is the accent color doing a job (guiding the eye to CTAs/prices/labels) or sprinkled everywhere until it means nothing?

**Distinct-shapes test (geometry, not DOM)**
- Are rendered proportions correct — circles circular, squares square, aspect-ratio'd media not stretched? (The squish bug passed every DOM check; only the pixels showed it.)

**The two killer questions**
- **Would a designer whose work I respect put their name on this screen?** If the honest answer is no, identify the single weakest screenshot and redo that section.
- **Does this look like the OTHER builds?** Check `kallon-taste.md`. If the direction rhymes too closely with a recent build's palette/type/centerpiece, it under-delivers on the "show me range" expectation even if it's individually good.

## What "fix" means here

Visual-review failures are design failures, not code bugs — the fix is a design decision (respace, rescale, recolor, recompose), not a patch. Re-screenshot after fixing; a fix that wasn't re-verified visually doesn't count (same rule as re-running axe after a contrast fix).
