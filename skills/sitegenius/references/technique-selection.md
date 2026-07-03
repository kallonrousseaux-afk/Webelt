# Technique Selection — how to choose from the 60-item catalog

The catalog is a menu, not a checklist. Most builds use 5-10 items, not 60. Selection follows four filters, applied in order.

## Filter 1 — Tier caps the budget
- **LocalSite**: scroll reveals, hover states, texture/depth, forms/conversion furniture, 1-2 luxury CSS touches. No WebGL, no 3D, no sound, no page transitions. 5-8 techniques total.
- **AwardsSite**: everything LocalSite gets, plus one WebGL/spectacle centerpiece and 2-4 supporting motion techniques. 10-15 techniques total.
Never smuggle AwardsSite-cost techniques into a LocalSite build — that's the exact mistake that produced the bland first draft this session. Never under-deliver AwardsSite either — it needs a centerpiece, not just "LocalSite plus a cursor."

## Filter 2 — Industry preset sets the register
From `design-planning.md`'s 10 presets, each industry has an implied *tolerance* for spectacle:
| Register | Industries | What fits | What doesn't |
|---|---|---|---|
| Trust-first | Legal, clinic/dental, accounting, immigration/paralegal | Editorial type moments, quiet parallax, lined forms, restrained cursor | Sound, particle trails, glitch/squiggle text, playful mascots |
| Warm-local | Restaurant, salon/spa, nonprofit, realtor | Photo-led hero, grain, hover tilt, count-up numbers, device-mock hero | WebGL centerpieces (usually LocalSite tier anyway), 3D product viewers |
| Craft/impact | Trades, gym, auto/detail | Bold type, action photo, before/after spotlight cursor, draggable gallery | Ambient sound, delicate serif italics |
| Spectacle-tolerant | Tech-ish startup, creative agency/portfolio, RNR's own site | Full catalog is fair game: WebGL, 3D, sound (opt-in), page transitions | Nothing is off-limits, but still needs a *reason*, see Filter 4 |

A lawyer's site with a particle cursor trail undermines trust — playful reads as unserious in a trust-first register even if it's technically well-built.

## Filter 3 — One centerpiece, not a pile
Every AwardsSite build gets exactly ONE hero-level spectacle technique (the thing it's "known for"): the aura shader, OR a 3D model viewer, OR a scroll-scrubbed sequence, OR a pinned horizontal story. Not two competing for attention. Everything else in the build supports that centerpiece rather than competing with it — this is the same principle as the OFF+BRAND "continuity element": one strong idea threaded through, not a demo reel of every trick.

## Filter 4 — The "why" test
Before adding any technique, answer in one sentence: *what does this do for the visitor that a simpler version wouldn't?* If the honest answer is "it's cool" with no functional or emotional payoff, cut it or downgrade it (e.g. a spotlight cursor with no real "reveal" content behind it is decoration; the same spotlight over a before/after photo is a technique with a job).
- Aura shader → sets an emotional tone in 2 seconds, before any copy loads. Job: first impression.
- Pinned horizontal process → makes a linear service explainable without a wall of text. Job: comprehension.
- Sound → almost never passes this test for RNR's client base. Job: rare, mostly a portfolio/agency flex.
- Percentage preloader vs word-reveal intro → percentage counter only earns its keep when there's real asset weight (3D model, video sequence) to justify the wait; otherwise the lighter word-reveal wins.

## Worked defaults (use unless the brief says otherwise)
- **LocalSite, any industry**: scroll reveals + hover tilt + magnetic CTAs + grain + layered shadows + bento services + editorial form. (= the localsite-starter, unmodified motion layer.)
- **AwardsSite, trust-first**: aura shader (desaturated toward the brand's dark tone) + line-reveal hero + editorial hover list + pinned horizontal process + continuity orb + labeled cursor. (= the awardssite-starter, unmodified.)
- **AwardsSite, warm-local**: swap the aura shader for a photo/video hero with veil + count-up metrics + draggable gallery instead of pinned scroll (friendlier, less "corporate procedure").
- **AwardsSite, spectacle-tolerant**: centerpiece = 3D model viewer or scroll-scrubbed sequence if the client has a real product; otherwise floating 3D icons + full page transitions.

## When Kallon wants a say
Present the CENTERPIECE choice via AskUserQuestion (2-4 options from Filter 3, matched to the industry register from Filter 2) — that's the one decision worth asking about. Don't ask him to approve all 10 supporting techniques individually; those follow from the tier default unless he flags something.
