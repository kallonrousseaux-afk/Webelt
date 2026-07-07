# Imagery & Art Direction Playbook (July 2026)

Fills the imagery gap: how to direct, crop, and grade images so any site reads premium. Applies to Higgsfield generations, client photos, and photo direction you give clients.

## The image plan — decide imagery at intake, not as an afterthought

Placeholder gradients are the single biggest tell that a build is a mockup — a food or product business with gray tiles reads fake no matter how good the layout is. So:

1. **At intake, imagery gets its own question**: client photos / Higgsfield generation / placeholders-for-now. Present the credit cost when generation is on the table (image ≈ cheap, video ≈ 10 credits — preflight with `get_cost:true` for the real number) and get one up-front yes for the SET, not a re-ask per image.
2. **A standard generated set is 3–5 images, planned before generating any**: one hero (wide, copy space on the headline side), 1–2 section/feature shots (medium), 1–2 texture/detail tiles (tight). One consistent prompt family = one grade family.
3. **Prompt recipe per register** — always include: palette words from the locked tokens, light direction, grade ("film grain", "soft directional window light"), and NEGATIVES ("no text, no logos, no people close-up" — generated faces as fake staff are banned).
   - *Warm-local (restaurant/café)*: "overhead 45° food photography, [palette] palette, warm window light, shallow depth, film grain, no text no logos"
   - *Trust-first (professional)*: "architectural interior detail, [palette] palette, soft morning light, calm negative space, editorial, no people no text"
   - *Craft/impact (trades)*: "low-angle work-in-progress detail, tool and material texture, [palette] tones, directional workshop light, no faces no text"
   - *Spectacle/product*: "studio product still, single object, [palette] backdrop, dramatic side light, subtle grain, no text"
4. **Reference generated assets by their CDN URL directly** (sandbox can't download/re-host — SKILL.md step 3 rules apply), with the standing `TODO:` to re-host before production launch.
5. **Video is the hero-only upgrade**: one looping ambient video (5s, 16:9, 1080p) for the hero when the register supports it — Kallon has approved this pattern twice. Everything below the fold stays stills; multiple videos on one page is cost and weight with no added signal.

## The 2026 direction: authentic + cinematic

- **Authenticity beat perfection** — the industry moved off polished/photoshopped toward relatable, human-focused imagery. For local clients this is good news: their real shop, real staff, real work — properly graded — beats stock every time. (Reinforces the existing no-stock rule.)
- **Cinematic grade** is the premium signal: filmic directional lighting, rich color grading, subtle grain, contrast in the shadows. Our CSS `.grain` overlay + palette-prompting into Higgsfield already implements this pipeline.

## Grading to palette (the core skill)

Every image on a site must feel lit by the same light as the UI:
1. **Pick the image's temperature from the brand neutral** — RNR cream (#EFE9DE) = warm images; a cool-slate brand = cool images. Never mix temperatures across a page.
2. **Higgsfield**: put the palette in the prompt ("warm cream and terracotta palette, soft directional window light, film grain") — grading at generation time, per connector rules.
3. **Client photos**: warm/cool white balance shift + lift blacks slightly toward the brand ink color + gentle S-curve. A duotone-ish accent wash at 5–10% opacity (`mix-blend-mode: color` overlay div) unifies mismatched client photos cheaply.
4. **Consistency across all images** — same tones, same editing style, same composition family. This is what "professional" reads as; one off-grade image breaks the whole page.

## Composition & cropping

- **Deliberate crop variation** (already in premium-craft): mix one wide establishing shot, one medium, one tight detail per section family. All-same-aspect-ratio grids read as template output.
- **Crop for the layout, not the photo**: heroes crop wide (16:9 → 21:9), cards crop 4:5 or 1:1, details crop square and tight. Set with `aspect-ratio` + `object-fit: cover` + `object-position` toward the subject.
- **Mobile-first framing**: 70% of viewers see the image at 375px wide — the subject must survive a center-crop to vertical. Check every hero at 375px; use `object-position` or a separate mobile crop via `<picture>`.
- **Leave copy space**: direct/generate heroes with dead space (wall, sky, bokeh) on the side where the headline sits. Text-over-busy-image is the #1 amateur tell.
- **Angle = story**: eye-level for trust (portraits, storefronts), low angle for authority (buildings, trades), top-down for craft (food, workbenches).

## Per-industry image recipes ($350 clients)

| Client | Shoot/generate | Hero |
|---|---|---|
| Restaurant | 3–5 dishes top-down/45°, one interior with people blur, one hands-plating detail | Signature dish or warm interior, copy space left |
| Trades | Before/after pairs, one action shot mid-work, branded vehicle/tools detail | Job-site action, low angle |
| Salon/clinic | Result close-ups, one chair/room wide, product detail | Calm interior or result, heavy copy space |
| Professional services | Real team eye-level portraits (same background/grade), office detail | Portrait or abstract brand texture — never handshakes |

If the client has NO usable photos: generate environment/craft imagery (never fake people as "staff"), or use the work-in-a-browser-mock pattern (the café hero) which reads as portfolio, not decoration.

## Technical delivery

- `.webp`, hero ≤120KB at 1600w, cards ≤60KB; `<picture>` for art-directed mobile crops.
- `loading="lazy"` on everything below the fold; hero gets `fetchpriority="high"`.
- Meaningful `alt` text (a11y + SEO); empty `alt=""` on decorative.
- 3–7% grain overlay unifies AI + photo sources on the same page.

## Sources
https://www.visualsclipping.com/blog/top-photograhy-trends-2026/ · https://elements.envato.com/learn/photography-trends · https://clippingexpertasia.com/blog/what-is-color-grading-guide/ · https://www.ravikantphotography.com/top-10-product-photography-tips-every-brand-must-know-in-2026/ · https://brandguide.asu.edu/execution-guidelines/photo-video/art-direction
