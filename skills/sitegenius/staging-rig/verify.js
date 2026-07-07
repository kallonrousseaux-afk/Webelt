#!/usr/bin/env node
// Staging rig verifier — runs the launch-playbook "live verification list"
// against a package served by server.js. Mirrors Part 2 step 4 of
// references/launch-playbook.md as closely as the sandbox allows.
//
// Usage: node verify.js <package-dir> [--base http://localhost:8787]
// (starts its own server on a free port if --base not given)
//
// Checks:
//  1. Home page loads over HTTP with zero page errors
//  2. External-request audit: every third-party URL the page tries, and its fate
//  3. Mixed-content lint: any hardcoded http:// reference in served HTML
//  4. Garbage URL → branded 404 (status 404 AND on-brand content)
//  5. /robots.txt and /sitemap.xml resolve
//  6. Share-card audit: og:title/description/image + twitter card present;
//     og:image points into the package (flag if external/TODO)
//  7. JS-disabled pass: content still readable, backgrounds still painted
//  8. Slow-CDN simulation: GSAP + fonts delayed 5s — page must not be blank
//     or broken during the wait
//  9. Form rehearsal: submit the first form; demo-mode must confirm in-page,
//     live-mode (fetch to /rest/v1/*) must produce a mock-Supabase row
// 10. Leftover-marker lint: {{PLACEHOLDER}} / TODO-DOMAIN in served HTML
//
// Exit code 0 = all pass; prints PASS/FAIL per check.

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const pkgDir = path.resolve(process.argv[2] || '.');
const baseArg = process.argv.indexOf('--base');
const externalBase = baseArg > -1 ? process.argv[baseArg + 1] : null;
const CHROME = process.env.STAGING_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

function get(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', () => resolve({ status: 0, body: '' }));
  });
}

(async () => {
  let server, base;
  if (externalBase) {
    base = externalBase;
  } else {
    const port = 8700 + Math.floor(Math.random() * 200);
    server = spawn('node', [path.join(__dirname, 'server.js'), pkgDir, String(port)], { stdio: ['ignore', 'pipe', 'inherit'] });
    let serverLog = '';
    server.stdout.on('data', (d) => { serverLog += d; process.stdout.write('[server] ' + d); });
    base = `http://localhost:${port}`;
    await new Promise((r) => setTimeout(r, 800));
  }

  const results = [];
  const check = (name, ok, detail) => {
    results.push({ name, ok, detail });
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
  };

  const browser = await chromium.launch({ executablePath: CHROME });

  // ---- 1+2: load + external request audit
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const pageErrors = [];
    const external = [];
    page.on('pageerror', (e) => pageErrors.push(e.message));
    page.on('requestfinished', (r) => { if (!r.url().startsWith(base)) external.push(`OK      ${r.url()}`); });
    page.on('requestfailed', (r) => { if (!r.url().startsWith(base)) external.push(`FAILED  ${r.url()} (${r.failure() && r.failure().errorText})`); });
    await page.goto(base + '/', { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    check('home loads, zero page errors', pageErrors.length === 0, pageErrors.join(' | '));
    console.log('  external requests:');
    external.forEach((l) => console.log('   ', l));
    await ctx.close();
  }

  // ---- 3 + 10: served-HTML lints
  {
    const { body } = await get(base + '/');
    const mixed = (body.match(/(src|href)=["']http:\/\/[^"']+/g) || []).filter((m) => !m.includes('localhost'));
    check('no mixed-content http:// references', mixed.length === 0, mixed.slice(0, 3).join(', '));
    const markers = body.match(/\{\{[A-Z0-9_]+\}\}|TODO-DOMAIN/g) || [];
    check('no leftover template markers (TODO-DOMAIN is expected pre-domain; fail only on {{...}})',
      !markers.some((m) => m.startsWith('{{')),
      [...new Set(markers)].join(', ') || 'clean');
  }

  // ---- 4: branded 404
  {
    const { status, body } = await get(base + '/definitely-not-a-page');
    check('garbage URL returns 404 status', status === 404, `got ${status}`);
    check('404 page is branded (not server default)', /<style|class=/.test(body) && body.length > 500, `${body.length} bytes`);
  }

  // ---- 5: robots + sitemap
  {
    const r = await get(base + '/robots.txt');
    const s = await get(base + '/sitemap.xml');
    check('robots.txt resolves', r.status === 200);
    check('sitemap.xml resolves', s.status === 200);
  }

  // ---- 6: share-card audit
  {
    const { body } = await get(base + '/');
    const meta = (p) => (body.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]+content=["']([^"']*)`, 'i')) || [])[1];
    const ogt = meta('og:title'), ogd = meta('og:description'), ogi = meta('og:image'), tw = meta('twitter:card');
    check('og:title + og:description + twitter:card present', !!(ogt && ogd && tw));
    if (ogi) {
      const isLocalRef = ogi.includes('TODO-DOMAIN') || ogi.startsWith('/') || ogi.startsWith(base);
      const fileName = ogi.split('/').pop();
      const inPkg = require('fs').existsSync(path.join(pkgDir, fileName));
      check('og:image file exists in package', inPkg, inPkg ? fileName : `${fileName} MISSING — share card will be blank (${isLocalRef ? 'local ref' : 'external ref'})`);
    } else {
      check('og:image present', false, 'no og:image meta at all');
    }
  }

  // ---- 7: JS-disabled pass
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'load' });
    const textLen = (await page.evaluate(() => document.body.innerText)).length;
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const invisible = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1, h2, p')).filter((el) => {
        const s = getComputedStyle(el);
        return s.opacity === '0' || s.visibility === 'hidden';
      }).length
    );
    check('JS-disabled: content readable', textLen > 300, `${textLen} chars of text`);
    check('JS-disabled: body background painted', bg !== 'rgba(0, 0, 0, 0)', bg);
    check('JS-disabled: no opacity-0 hidden headings/copy', invisible === 0, `${invisible} elements invisible without JS`);
    await ctx.close();
  }

  // ---- 8: slow-CDN simulation
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.route(/cdnjs|fonts\.g|jsdelivr|cloudfront/, async (route) => {
      await new Promise((r) => setTimeout(r, 5000));
      route.abort();
    });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200); // mid-wait: CDNs still hanging
    const textLen = (await page.evaluate(() => document.body.innerText)).length;
    check('slow-CDN: page readable while CDNs hang', textLen > 300, `${textLen} chars at t+1.2s`);
    check('slow-CDN: no page errors from missing libs', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }

  // ---- 9: form rehearsal
  // Live-mode forms POST to Supabase (absolute URL, often placeholder creds).
  // Intercept *.supabase.co and fulfill 201 so the SUCCESS path (confirmation
  // message, form reset) is what gets rehearsed — the real endpoint is
  // verified on the live site per launch-playbook.md Part 2.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    let supabaseRow = null;
    await page.route(/supabase\.co\/rest\/v1\//, (route) => {
      supabaseRow = route.request().postData();
      route.fulfill({ status: 201, contentType: 'application/json', body: '[]' });
    });
    await page.goto(base + '/', { waitUntil: 'load' });
    await page.waitForTimeout(800);
    const form = page.locator('form').first();
    if ((await form.count()) === 0) {
      check('form rehearsal', true, 'no form in build — skipped');
    } else {
      await form.evaluate((f) => {
        f.querySelectorAll('input, select, textarea').forEach((el) => {
          if (el.closest('[class*="hp"]') || el.getAttribute('aria-hidden') === 'true' || ['_gotcha', 'company'].includes(el.name)) return; // honeypots stay empty
          if (el.type === 'email') el.value = 'rehearsal@test.ca';
          else if (el.type === 'date') el.value = '2026-08-01';
          else if (el.tagName === 'SELECT') el.selectedIndex = el.selectedIndex >= 0 ? el.selectedIndex : 0;
          else if (el.type !== 'hidden') el.value = 'Staging rehearsal message';
        });
      });
      const [resp] = await Promise.all([
        page.waitForResponse((r) => r.url().includes('/rest/v1/'), { timeout: 4000 }).catch(() => null),
        form.evaluate((f) => f.querySelector('button[type="submit"], button:not([type])') ? f.querySelector('button[type="submit"], button:not([type])').click() : f.requestSubmit()),
      ]);
      await page.waitForTimeout(800);
      const confirmed = await page.evaluate(() =>
        /thank|thanks|on the list|demo|received|got it|reply within/i.test(document.body.innerText)
      );
      if (resp || supabaseRow) {
        check('form rehearsal: live-mode POST fired with a real row', !!supabaseRow, supabaseRow ? supabaseRow.slice(0, 80) : 'no POST body captured');
        check('form rehearsal: success confirmation shown after 201', confirmed, confirmed ? 'confirmation text found' : 'no confirmation despite 201');
      } else {
        check('form rehearsal: demo-mode confirms in page', confirmed, confirmed ? 'confirmation text found' : 'no confirmation after submit');
      }
    }
    await ctx.close();
  }

  await browser.close();
  if (server) server.kill();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed${failed.length ? ' — FAILURES: ' + failed.map((f) => f.name).join('; ') : ''}`);
  process.exit(failed.length ? 1 : 0);
})();
