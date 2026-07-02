# Imagery & Art Direction Playbook (July 2026)

Fills the imagery gap: how to direct, crop, and grade images so any site reads premium. Applies to Higgsfield generations, client photos, and photo direction you give clients.

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
