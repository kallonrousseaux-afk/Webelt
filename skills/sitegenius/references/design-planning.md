# Design Planning — Style Tile Step + Industry Presets

## The style tile (mandatory between intake and build)

After the intake menu (or after deciding everything solo), do NOT build the full site yet. Build a **single-screen style tile** — one HTML file, one viewport, no scroll — and screenshot it for sign-off:

Contents (one 1280×800 screen):
1. Palette swatches with hex labels (bg, surface, ink, accent, one support)
2. Type specimen: H1 in the display font ("The quick brown fox…" is banned — use the client's actual headline), body paragraph, the eyebrow style
3. One primary button + one ghost button (default + hover shown side by side)
4. A miniature hero mock (headline + CTA + image placeholder block) showing the layout direction
5. One card sample with the shadow/border treatment

Present the screenshot with ONE line: "This direction, or adjust?" — adjustments loop on the tile (fast), never on a full build (slow). Once approved, tokens are LOCKED and the full build starts. Skip the tile only if Kallon explicitly says "skip the tile / just build the whole thing."

## Industry presets (starting points, not straitjackets)

Each = palette seed + font pairing + shadow camp + hero style. Adjust to the client's existing brand if one exists.

| Industry | Palette seed | Display / Body | Camp | Hero |
|---|---|---|---|---|
| Restaurant / café | Warm cream #F6F0E6 · ink #221D16 · appetite red #C63B1E or terracotta #B0492A | Fraunces / Hanken Grotesk | Editorial soft | Full-bleed dish photo, copy space |
| Trades (plumber, electrician, roofer) | Off-white #F4F2ED · charcoal #23241F · safety-adjacent accent (amber #C97B1D or steel blue #2D5D7B) | Archivo Expanded or Syne / Hanken Grotesk | Tactile 1px borders | Big headline + job-site photo |
| Salon / spa / wellness | Blush or sage neutral (#F5EEE9 / #EEF0E9) · soft ink #2A2624 · muted gold #A8854C | Instrument Serif or Playfair / DM Sans | Editorial soft, generous air | Type-led or calm interior |
| Clinic / dental / physio | Cool paper #F6F8F8 · slate ink #1E2A2F · trust teal #1F6E6B | Fraunces (light) / Hanken Grotesk | Soft shadows, rounded | Real practitioner portrait |
| Legal / accounting / consulting | Warm paper #F7F5F0 · deep ink #191C24 · oxblood #6E2B2B or navy #1F2E4D | Playfair or DM Serif / Hanken Grotesk | 1px borders, minimal shadow | Type-only statement hero |
| Gym / martial arts | Near-black #141414 · bone #EDE8DF · impact red #D8321F or volt #C6F432 | Clash Display or Syne / Archivo | Techno-futurist dark | Full-bleed action, big type overlay |
| Realtor | Ivory #F8F5EF · espresso #2B2119 · brass #9C7A3C | Fraunces / DM Sans | Editorial soft | Property photo in device/frame mock |
| Auto / detail shop | Graphite #1B1D1F · silver #E8EAEC · signal orange #E85D26 | Archivo Expanded / Hanken Grotesk | Tactile dark, sharp radius | Low-angle vehicle, gloss |
| Tech-ish local startup | Deep navy #0E1420 · ice #E9EEF5 · electric #4F7CFF | Syne or Clash Display / Hanken Grotesk | Techno-futurist, bento, glass | Product mock in browser frame |
| Nonprofit / community | Warm white #FAF7F1 · earth ink #2E2A22 · hopeful green #3E7C4F | Fraunces / Hanken Grotesk | Editorial soft | People photo, warm grade |

Rules that override presets: never Inter/Roboto/Arial; accent stays ≤10% of the page; all pairs AA-checked before lock; warm-tint the neutrals unless the industry demands cool.

## Layout planning (before writing sections)

Write a 5-line section map before coding, e.g.:
```
1. Hero — photo right 5/7, headline "Fixed in 24h", CTA quote
2. Services bento — anchor: emergency repairs (2×2), 4 support cells
3. Proof — single quote, River Heights homeowner
4. CTA band — dark, restate offer
5. Contact — NAP left, 3-field form right
```
Every section gets a job (attention / interest / desire / action — AIDA macro). If a section has no job, cut it. Vary section backgrounds (bg → surface → bg → ink → bg) so the scroll has rhythm.
