# SEO & Copywriting Playbook (July 2026)

Backs the $75 SEO product and gives every build professional copy. Two halves: local SEO (technical, checklist-driven) and copy formulas (per-section).

---

## Part 1 — Local SEO

In 2026 structured data matters more than ever: Google's AI search, answer engines, and voice assistants synthesize schema to recommend businesses. Rich results (stars, hours, services in the SERP) materially lift CTR.

### On-page checklist (every RNR build)
- [ ] One `<h1>` containing service + city ("Custom websites for Winnipeg businesses"); logical h2/h3 hierarchy
- [ ] `<title>` ≤60 chars: `{Service} in {City} | {Business}` · meta description ≤155 chars with a benefit + CTA
- [ ] NAP identical in footer, contact page, and schema — and identical to the Google Business Profile
- [ ] `tel:` click-to-call link; Google Maps embed on contact
- [ ] Canonical URL, Open Graph tags (og:title/description/image), favicon
- [ ] Meaningful alt text; one page per major service for trades (each targets its own search intent)
- [ ] Service-area page/section listing neighbourhoods/regions covered
- [ ] Reviews visible on-page (schema must match visible content — never mark up ratings that aren't shown)
- [ ] Fast: CWV green is a ranking factor; our perf gates already cover it

### LocalBusiness JSON-LD (homepage + contact page)
Use the most specific type: `Restaurant`, `HairSalon`, `Electrician`, `Plumber`, `Dentist`, `LegalService`… fallback `LocalBusiness`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{{BUSINESS_NAME}}",
  "description": "{{ONE_SENTENCE}}",
  "url": "https://{{DOMAIN}}",
  "telephone": "{{PHONE_E164}}",
  "email": "{{EMAIL}}",
  "image": "https://{{DOMAIN}}/{{HERO_IMAGE}}",
  "address": { "@type": "PostalAddress", "streetAddress": "{{STREET}}",
    "addressLocality": "{{CITY}}", "addressRegion": "{{PROV}}",
    "postalCode": "{{POSTAL}}", "addressCountry": "CA" },
  "geo": { "@type": "GeoCoordinates", "latitude": {{LAT}}, "longitude": {{LNG}} },
  "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "17:00" }],
  "priceRange": "$$",
  "areaServed": "{{CITY_AND_REGION}}",
  "sameAs": ["{{GBP_URL}}", "{{INSTAGRAM}}", "{{FACEBOOK}}"]
}
</script>
```
Rules: accuracy over ambition — only mark up what's visible on the page; fabricated AggregateRating triggers penalties. Multi-location = one LocalBusiness block per location page. Validate with Google's Rich Results Test before shipping.

---

## Part 2 — Copywriting

### Formulas (stack them, don't pick one)
- **PAS** (Problem → Agitate → Solution) — service pages and ads, when the visitor knows their pain. "Losing customers to a website that embarrasses you? Every day it's up, they call someone else. We rebuild it in days for $350."
- **AIDA** (Attention → Interest → Desire → Action) — the homepage's macro-structure: hero grabs, services build interest, proof builds desire, CTA closes.
- **FAB** (Feature → Advantage → Benefit) — service cards: "3-page custom site (feature) built in days (advantage) so you look established before your next customer searches (benefit)."
- Hybridize: PAS hook → FAB body → AIDA close. Elite pages stack formulas.

### Section-by-section recipe (LocalSite)
| Section | Formula | Rules |
|---|---|---|
| Hero H1 | Benefit + number/specific | ≤10 words; passes the 10-second test; "you" not "we" |
| Hero sub | One sentence: who it's for + what changes | No jargon, no "welcome to" |
| Services | FAB per card | 15–25 words per card, verb-first titles |
| About/story | One paragraph, founder voice | Trust builder — name, years, why they started |
| Proof | Real quote + full name + context | Specific results beat adjectives |
| CTA bands | Action verb + low friction | "Get your quote" not "Submit"; restate the offer |
| FAQ | Real objections (price, time, area) | Doubles as SEO long-tail |

### Voice
Pick one tone per client (warm / authoritative / witty) and hold it everywhere — "inconsistency is the only tone that doesn't convert." Local default: warm-direct, grade 7 reading level, short sentences, no corporate filler ("solutions", "leverage", "passionate about"). Benefit-led headlines beat feature-led by 27%; concrete numbers add 15% (see functional-sites-2026.md).

## Sources
https://developers.google.com/search/docs/appearance/structured-data/local-business · https://crawlvision.com/blog/local-business-schema-markup-2026/ · https://medium.com/@joosep_41274/schema-for-local-businesses-in-2026-what-to-implement-and-why-924a64fad212 · https://searchengineland.com/schema-local-visibility-google-ai-470906 · https://thrivethemes.com/copywriting-formulas/ · https://universaldigitalservices.com/copywriting-formulas-aida-pas-convert/ · https://www.readstoleads.com/blog-article/best-copywriting-formulas
