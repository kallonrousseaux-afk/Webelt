// ============================================================
// FERUS. shared script — loaded on every page (home/shop/product)
// Product catalog, cart (localStorage), motion system, Barba wiring.
// ============================================================

// ---- Placeholder product imagery (sized SVG gradients, clearly labeled —
// never a broken <img>, see build-gotchas #31) ----
function placeholderSVG(hueA, hueB, label) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='hsl(${hueA},22%,16%)'/>
      <stop offset='1' stop-color='hsl(${hueB},18%,9%)'/>
    </linearGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='50%' font-family='sans-serif' font-size='28' fill='rgba(242,240,234,.4)' text-anchor='middle' dominant-baseline='middle'>PLACEHOLDER — ${label}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const PRODUCTS = [
  { id: 'utility-jacket', name: 'Oversized Utility Jacket', price: 228, tag: 'New', hueA: 40, hueB: 20 },
  { id: 'raw-edge-tee', name: 'Raw Edge Tee', price: 58, tag: null, hueA: 200, hueB: 220 },
  { id: 'wide-leg-cargo', name: 'Wide-Leg Cargo', price: 148, tag: null, hueA: 90, hueB: 70 },
  { id: 'cropped-hoodie', name: 'Cropped Hoodie', price: 98, tag: 'New', hueA: 260, hueB: 280 },
  { id: 'selvedge-denim', name: 'Selvedge Denim', price: 188, tag: null, hueA: 210, hueB: 230 },
  { id: 'mesh-layer-top', name: 'Mesh Layer Top', price: 68, tag: null, hueA: 150, hueB: 170 }
];

function productImg(p, variant) {
  return placeholderSVG(p.hueA + (variant === 'b' ? 12 : 0), p.hueB + (variant === 'b' ? 12 : 0), p.name + (variant === 'b' ? ' (back)' : ''));
}

// ---- Cart (localStorage-backed, real add/remove/qty/subtotal math) ----
const CART_KEY = 'ferus_cart';
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); renderCart(); }
function addToCart(id, size) {
  const product = PRODUCTS.find(p => p.id === id); if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id && i.size === size);
  if (existing) existing.qty += 1;
  else cart.push({ id, size: size || 'M', qty: 1 });
  saveCart(cart);
  openCart();
}
function removeFromCart(id, size) { saveCart(getCart().filter(i => !(i.id === id && i.size === size))); }
function setQty(id, size, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}
function cartCount() { return getCart().reduce((n, i) => n + i.qty, 0); }
function cartSubtotal() {
  return getCart().reduce((sum, i) => { const p = PRODUCTS.find(pr => pr.id === i.id); return sum + (p ? p.price * i.qty : 0); }, 0);
}

function renderCart() {
  const wrap = document.getElementById('cartItems'); if (!wrap) return;
  const cart = getCart();
  const countEl = document.getElementById('cartCount'); if (countEl) countEl.textContent = cartCount();
  const subtotalEl = document.getElementById('cartSubtotal'); if (subtotalEl) subtotalEl.textContent = '$' + cartSubtotal();
  if (!cart.length) { wrap.innerHTML = '<p class="cart-empty">Your cart is empty.</p>'; return; }
  wrap.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id); if (!p) return '';
    return `<div class="cart-item">
      <img src="${productImg(p, 'a')}" alt="">
      <div>
        <h4>${p.name}</h4>
        <p class="meta">Size ${item.size}</p>
        <div class="qty">
          <button type="button" data-qty-down="${item.id}" data-size="${item.size}" aria-label="Decrease quantity">&minus;</button>
          <span>${item.qty}</span>
          <button type="button" data-qty-up="${item.id}" data-size="${item.size}" aria-label="Increase quantity">+</button>
        </div>
        <span class="remove" data-remove="${item.id}" data-size="${item.size}" role="button" tabindex="0">Remove</span>
      </div>
      <span class="price">$${p.price * item.qty}</span>
    </div>`;
  }).join('');
}

function openCart() {
  const d = document.getElementById('cartDrawer'); if (!d) return;
  d.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  d.removeAttribute('aria-hidden');
  d.removeAttribute('inert');
}
function closeCart() {
  const d = document.getElementById('cartDrawer'); if (!d) return;
  d.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  // `inert` (not aria-hidden) — aria-hidden on a container with focusable children
  // is itself a WCAG violation (axe: aria-hidden-focus) even while visually offscreen;
  // `inert` correctly removes focusability AND AT-exposure at once.
  d.setAttribute('inert', '');
}

function wireCartControls(root) {
  root = root || document;
  root.querySelector('#cartOpen')?.addEventListener('click', openCart);
  root.querySelector('#cartClose')?.addEventListener('click', closeCart);
  root.querySelector('#cartOverlay')?.addEventListener('click', closeCart);
  root.querySelector('#checkoutBtn')?.addEventListener('click', () => {
    alert('This is a practice build — checkout/payment is not wired to a real processor. See the TODO note in the cart.');
  });
  const items = root.querySelector('#cartItems');
  if (items) {
    items.addEventListener('click', e => {
      const up = e.target.closest('[data-qty-up]'), down = e.target.closest('[data-qty-down]'), rem = e.target.closest('[data-remove]');
      if (up) { const c = getCart().find(i => i.id === up.dataset.qtyUp && i.size === up.dataset.size); if (c) setQty(c.id, c.size, c.qty + 1); }
      if (down) { const c = getCart().find(i => i.id === down.dataset.qtyDown && i.size === down.dataset.size); if (c) setQty(c.id, c.size, c.qty - 1); }
      if (rem) removeFromCart(rem.dataset.remove, rem.dataset.size);
    });
  }
}

function renderFeaturedGrid(root) {
  root = root || document;
  const grid = root.querySelector('#featuredGrid'); if (!grid) return;
  const featured = PRODUCTS.slice(0, 3);
  grid.innerHTML = featured.map(cardHTML).join('');
}
function renderShopGrid(root) {
  root = root || document;
  const grid = root.querySelector('#shopGrid'); if (!grid) return;
  grid.innerHTML = PRODUCTS.map(cardHTML).join('');
}
function cardHTML(p) {
  return `<a class="card" href="product.html?id=${p.id}" data-cursor="View">
    ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
    <div class="card-img">
      <img class="img-a" src="${productImg(p, 'a')}" alt="${p.name}">
      <img class="img-b" src="${productImg(p, 'b')}" alt="">
      <button class="card-add" type="button" data-add="${p.id}" aria-label="Add ${p.name} to cart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6h15l-2 9H8L6 6Zm0 0L5 3H2"/><circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none"/></svg>
      </button>
    </div>
    <div class="card-info">
      <h3>${p.name}</h3>
      <span class="card-price">$${p.price}</span>
    </div>
  </a>`;
}
function wireGridAddButtons(root) {
  root = root || document;
  root.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); addToCart(btn.dataset.add, 'M'); });
  });
}

// ---- Motion system: intro, reveals, cursor, magnetic CTAs, marquee ----
function initMotion(root) {
  root = root || document;
  const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const desktop = matchMedia('(hover:hover)').matches && innerWidth > 900;

  if (window.gsap && motionOK) {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('gsap');
    root.querySelectorAll('.rv').forEach(el => {
      gsap.from(el, { y: 32, opacity: 0, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' } });
    });
    const track = root.querySelector('.marquee-track');
    if (track) gsap.to(track, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
  } else {
    root.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    root.querySelectorAll('.rv').forEach(el => io.observe(el));
  }

  if (desktop) {
    root.querySelectorAll('a,button,.card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const ring = document.querySelector('.cursor-ring'); if (!ring) return;
        ring.classList.add('grow');
        ring.querySelector('span').textContent = el.dataset.cursor || '';
      });
      el.addEventListener('mouseleave', () => { document.querySelector('.cursor-ring')?.classList.remove('grow'); });
    });
    root.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }
}

function initCursorOnce() {
  const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const desktop = matchMedia('(hover:hover)').matches && innerWidth > 900;
  if (!desktop || !motionOK) return;
  const dot = document.createElement('div'); dot.className = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring'; ring.innerHTML = '<span></span>';
  document.body.append(dot, ring);
  let tx = innerWidth / 2, ty = innerHeight / 2, rx = tx, ry = ty;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`; }, { passive: true });
  (function loop() { rx += (tx - rx) * .16; ry += (ty - ry) * .16;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
}

function initHeaderScroll() {
  const hdr = document.getElementById('hdr'); if (!hdr) return;
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    hdr.classList.toggle('solid', y > 40);
    hdr.classList.toggle('hide', y > 300 && y > lastY);
    lastY = y;
  }, { passive: true });
}

function initPageMotion(root) {
  const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (window.gsap && motionOK) {
    document.body.classList.add('lock');
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete() { document.body.classList.remove('lock'); } });
    tl.from('.intro .word span', { yPercent: 120, duration: .65 })
      .to('.intro .word span', { yPercent: -120, duration: .45, delay: .3, ease: 'power4.in' })
      .to('.intro', { yPercent: -100, duration: .7, ease: 'power4.inOut' }, '-=.1')
      .set('.intro', { display: 'none' })
      .from('.hero h1 .ln > span', { yPercent: 115, duration: .9, stagger: .08 }, '-=.5');
  } else {
    document.body.classList.remove('lock');
    const intro = document.querySelector('.intro'); if (intro) intro.style.display = 'none';
  }
  initMotion(root);
}

// ---- Newsletter form (Supabase pattern, same as every other sitegenius build) ----
// REQUIRED before this works: Supabase blocks anonymous inserts by default (RLS).
//   alter table subscribers enable row level security;
//   create policy "anon insert subscribers" on subscribers for insert to anon with check (true);
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
function wireNewsletter(root) {
  root = root || document;
  const form = root.querySelector('#news-form'); if (!form) return;
  const msg = form.parentElement.querySelector('.form-msg');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form._gotcha.value) return;
    const btn = form.querySelector('button');
    if (!form.email.value.includes('@')) { msg.textContent = 'Enter a valid email.'; msg.className = 'form-msg err'; return; }
    btn.disabled = true; btn.textContent = 'Joining…';
    try {
      const r = await fetch(SUPABASE_URL + '/rest/v1/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY, Prefer: 'return=minimal' },
        body: JSON.stringify({ email: form.email.value.trim() })
      });
      if (!r.ok) throw 0;
      msg.textContent = "You're on the list."; msg.className = 'form-msg ok';
      form.reset();
    } catch {
      msg.textContent = 'Something went wrong — try again shortly.'; msg.className = 'form-msg err';
    }
    btn.disabled = false; btn.textContent = 'Join';
  });
}

function initPage(root) {
  root = root || document;
  renderCart();
  wireCartControls(root);
  renderFeaturedGrid(root);
  renderShopGrid(root);
  wireGridAddButtons(root);
  wireNewsletter(root);
  const yr = root.querySelector('#yr'); if (yr) yr.textContent = new Date().getFullYear();
  initPageMotion(root);
  initProductPage(root);
}

// ---- Product detail page (single fixed template, id read from ?id=) ----
function initProductPage(root) {
  root = root || document;
  const pdWrap = root.querySelector('#productDetail'); if (!pdWrap) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'utility-jacket';
  const p = PRODUCTS.find(pr => pr.id === id) || PRODUCTS[0];
  pdWrap.querySelector('.pd-img-a').src = productImg(p, 'a');
  pdWrap.querySelector('.pd-img-b')?.setAttribute('src', productImg(p, 'b'));
  pdWrap.querySelector('.pd-name').textContent = p.name;
  pdWrap.querySelector('.pd-price').textContent = '$' + p.price;
  let selectedSize = 'M';
  const sizeBtns = pdWrap.querySelectorAll('.size-btn');
  sizeBtns.forEach(b => b.addEventListener('click', () => {
    sizeBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active'); selectedSize = b.dataset.size;
  }));
  pdWrap.querySelector('.pd-add')?.addEventListener('click', () => addToCart(p.id, selectedSize));
  const related = root.querySelector('#relatedGrid');
  if (related) related.innerHTML = PRODUCTS.filter(pr => pr.id !== p.id).slice(0, 3).map(cardHTML).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initCursorOnce();
  initHeaderScroll();
  initPage(document);

  if (window.barba) {
    barba.init({
      transitions: [{
        leave({ current }) { return gsap.to(current.container, { opacity: 0, y: -16, duration: .35, ease: 'power2.in' }); },
        enter({ next }) {
          document.body.classList.remove('lock');
          const titleMatch = next.html.match(/<title>([^<]*)<\/title>/);
          if (titleMatch) document.title = titleMatch[1];
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === location.pathname.split('/').pop()));
          initPage(next.container);
          return gsap.from(next.container, { opacity: 0, y: 16, duration: .45, ease: 'power2.out' });
        }
      }]
    });
  }
});
