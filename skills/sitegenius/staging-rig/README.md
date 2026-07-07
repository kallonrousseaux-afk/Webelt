# Staging Rig — mimic a live launch inside the sandbox

The closest thing to a real deploy this environment allows. Two scripts:

- **`server.js <package-dir> [port]`** — serves a deploy package the way Hostinger does: static files, `/404.html` fallback with a real 404 status, correct MIME types. Also mounts a mock Supabase endpoint (`POST /rest/v1/leads`) that logs rows and honors the honeypot convention.
- **`verify.js <package-dir>`** — starts the server and runs the launch-playbook "live verification list" as automated checks (16 total): page load + external-request audit, mixed-content lint, leftover-marker lint, branded-404 behavior, robots/sitemap resolution, share-card audit (og/twitter meta present AND the og:image file actually in the package), JS-disabled readability (catches no-JS locks), slow/blocked-CDN resilience, and a full form rehearsal — Supabase-wired forms get their request intercepted and fulfilled with 201 so the *success UX* (confirmation message) is what's tested; real credentials are verified only on the live site.

Run:
```
NODE_PATH=<dir-with-playwright-and-axe> node skills/sitegenius/staging-rig/verify.js <package-dir>
```
(Playwright + a browser at `/opt/pw-browsers/chromium-1194/...` — override with `STAGING_CHROME`.)

**When**: on every deploy package before it goes to Kallon (launch-playbook Part 1 final gate), and worth running on any build after major structural changes — its JS-disabled and slow-CDN checks catch failure modes the standard QA harness doesn't.

**What it cannot mimic** (live-only, playbook Part 2): real DNS/SSL/mixed-content over HTTPS, real Supabase inserts + notification emails, social networks' actual share-card scrapers, real devices/networks, Search Console.

First run paid for itself: caught a no-JS content lock (`.rv{opacity:0}` in plain CSS) present in both starter templates and all four immigration builds — gotcha #130.
