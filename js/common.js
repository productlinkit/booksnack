// Shared helpers loaded on every page (after data.js, before the page script).
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const safe = fn => { try { return fn(); } catch (e) {} };
const params = new URLSearchParams(location.search);

/* ---------- storage (everything lives in localStorage under bs_*) ---------- */
const store = {
  get: (k, fallback) => safe(() => JSON.parse(localStorage.getItem('bs_' + k))) ?? fallback,
  set: (k, v) => safe(() => localStorage.setItem('bs_' + k, JSON.stringify(v)))
};
// lists of book ids: liked, saved, offline
function inList(k, id) { return store.get(k, []).includes(id); }
function toggleList(k, id) {
  const list = store.get(k, []), i = list.indexOf(id);
  i < 0 ? list.unshift(id) : list.splice(i, 1);
  store.set(k, list);
  return i < 0;
}
const profile = () => Object.assign({ name: 'Product Linkit', email: 'productlinkit@gmail.com' }, store.get('profile', {}));
const PLANS = {
  free: { name: 'Free', price: 'Rp0', note: '1 AI summary · limited books' },
  trial: { name: 'Free Trial', price: 'Rp49.000/mo', note: '3 days free, then Rp49.000/month' },
  yearly: { name: 'Yearly Premium', price: 'Rp399.000/yr', note: 'Rp399.000/year · only Rp33.250/month' }
};

/* ---------- toast ---------- */
function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; $('.app').append(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1600);
}

/* ---------- bottom sheet ---------- */
function openSheet(html, onClose) {
  const back = document.createElement('div');
  back.className = 'sheet-back';
  back.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;
  const close = () => { back.remove(); onClose && onClose(); };
  back.addEventListener('click', e => { if (e.target === back || e.target.closest('[data-close]')) close(); });
  $('.app').append(back);
  return { el: $('.sheet', back), close };
}

/* ---------- bottom nav: <nav class="bottom-nav" data-nav="home"></nav> ---------- */
const NAV = [
  ['home', 'Home', '<path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'],
  ['explore', 'Explore', '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'],
  ['ask', 'ASK.AI', '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0 0 12 3Z"/>'],
  ['profile', 'Profile', '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>']
];
$$('[data-nav]').forEach(nav => {
  nav.innerHTML = NAV.map(([k, label, icon]) =>
    `<a href="${k}.html" class="${k === nav.dataset.nav ? 'active' : ''}"><svg viewBox="0 0 24 24">${icon}</svg><span>${label}</span></a>`).join('');
});

/* ---------- reading theme + accessibility, applied on every page ---------- */
const prefs = Object.assign({ size: 18, spacing: 1.6, theme: 'light' }, store.get('prefs', {}));
function applyPrefs() {
  document.documentElement.style.setProperty('--fs', prefs.size + 'px');
  document.documentElement.style.setProperty('--lh', prefs.spacing);
  ['light', 'dark', 'sepia'].forEach(t => document.body.classList.toggle('theme-' + t, prefs.theme === t));
  const a11y = store.get('a11y', {});
  document.body.classList.toggle('a11y-large', !!a11y.large);
  document.body.classList.toggle('a11y-contrast', !!a11y.contrast);
  document.body.classList.toggle('a11y-motion', !!a11y.motion);
}
applyPrefs();

/* ---------- small render helpers ---------- */
const bookTile = b => `<a class="book" href="book.html?id=${b.id}"><img class="cover" src="${b.cover}" alt="${b.title} cover" loading="lazy"><p>${b.title}</p><small>${b.author}</small></a>`;
const catIcon = c => `<svg viewBox="0 0 24 24">${CAT_ICONS[c] || CAT_ICONS['Non-fiction']}</svg>`;
function shareBook(b) {
  const text = `${b.title} by ${b.author} — on BookSnack`;
  if (navigator.share) navigator.share({ title: b.title, text }).catch(() => {});
  else safe(() => navigator.clipboard.writeText(text).then(() => toast('Link copied')));
}
// read text aloud with the browser's built-in speech; returns false when it stops
function speak(text, onEnd) {
  if (!('speechSynthesis' in window)) { toast('Audio is not supported here'); return false; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.onend = onEnd;
  speechSynthesis.speak(u);
  return true;
}
