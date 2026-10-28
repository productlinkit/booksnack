// Home feed: scroll down for the next book, sideways for its pages.
const picked = store.get('picks', {}).cats || [];
// books from the reader's favourite categories come first
const feedBooks = [...BOOKS].sort((a, b) => picked.includes(b.category) - picked.includes(a.category));
let bookIdx = 0, page = 0;
const feed = $('#feed');
const marked = () => store.get('highlights', []);
feed.innerHTML = feedBooks.map(b => `
  <section class="feed-item"><div class="pages">
    <div class="page cover-page"><img src="${b.cover}" alt="${b.title} by ${b.author}" loading="lazy"></div>
    ${b.story.map(t => `<div class="page text-page">
      <div class="story-head"><img src="${b.cover}" alt="" loading="lazy"><div><h2>${b.title}</h2><small>${b.author}</small></div></div>
      <p data-book="${b.id}" class="${marked().some(h => h.id === b.id && h.text === t) ? 'marked' : ''}">${t}</p>
      <small class="hint">Tap the text to highlight it</small></div>`).join('')}
  </div></section>`).join('');
const pagesOf = i => $$('.feed-item .pages')[i];
const current = () => feedBooks[bookIdx];

function syncCard() {
  const b = current();
  $$('.dot').forEach((d, i) => d.classList.toggle('on', i === page));
  const comments = store.get('comments', {})[b.id] || [];
  const counts = { like: inList('liked', b.id), save: inList('saved', b.id), share: 0, comment: comments.length };
  $$('.action-bar button').forEach(btn => {
    const k = btn.dataset.act, n = +counts[k];
    btn.classList.toggle('on', k === 'like' || k === 'save' ? !!counts[k] : false);
    $('b', btn).textContent = n;
  });
  $('#offlineBtn').classList.toggle('on', inList('offline', b.id));
}
// scroll events don't bubble, so listen in the capture phase for the inner page strips too
feed.addEventListener('scroll', e => {
  if (e.target === feed) {
    const i = Math.round(feed.scrollTop / feed.clientHeight);
    if (i !== bookIdx) { bookIdx = i; page = Math.round(pagesOf(i).scrollLeft / feed.clientWidth); stopAudio(); }
  } else if (e.target.classList.contains('pages')) {
    page = Math.round(e.target.scrollLeft / e.target.clientWidth);
  }
  syncCard();
}, true);

$('#swipeBtn').onclick = () => {
  const strip = pagesOf(bookIdx);
  if (page < current().story.length) strip.scrollBy({ left: strip.clientWidth, behavior: 'smooth' });
  else feed.scrollBy({ top: feed.clientHeight, behavior: 'smooth' });
};

/* action bar */
$('.action-bar').onclick = e => {
  const btn = e.target.closest('button'); if (!btn) return;
  const b = current(), k = btn.dataset.act;
  if (k === 'like') toast(toggleList('liked', b.id) ? 'Added to liked books' : 'Removed from liked books');
  if (k === 'save') toast(toggleList('saved', b.id) ? 'Saved to My Library' : 'Removed from My Library');
  if (k === 'share') shareBook(b);
  if (k === 'comment') openComments(b);
  syncCard();
};
function openComments(b) {
  const all = store.get('comments', {}), list = all[b.id] || [];
  const me = profile().name;
  const sheet = openSheet(`<h3>Comments · ${b.title}</h3>
    <div id="cList">${list.length ? list.map(c => `<div class="comment"><span class="av">${me[0]}</span><div><b>${me}</b><p>${c}</p></div></div>`).join('') : '<small>No comments yet. Be the first!</small>'}</div>
    <form class="comment-form"><input class="field" placeholder="Write a comment..." required><button>Send</button></form>`, syncCard);
  $('form', sheet.el).onsubmit = e => {
    e.preventDefault();
    const v = $('input', sheet.el).value.trim(); if (!v) return;
    all[b.id] = [...list, v]; store.set('comments', all);
    sheet.close(); toast('Comment posted');
  };
}

/* highlights: tap a summary paragraph */
feed.addEventListener('click', e => {
  const p = e.target.closest('.text-page p'); if (!p) return;
  const id = +p.dataset.book, text = p.textContent;
  let list = marked();
  const has = list.some(h => h.id === id && h.text === text);
  list = has ? list.filter(h => !(h.id === id && h.text === text)) : [{ id, text, at: Date.now() }, ...list];
  store.set('highlights', list);
  p.classList.toggle('marked', !has);
  toast(has ? 'Highlight removed' : 'Saved to My Highlights');
});

/* floating buttons */
$('#offlineBtn').onclick = () => { toast(toggleList('offline', current().id) ? 'Downloaded for offline reading' : 'Removed from downloads'); syncCard(); };
$('#fullBtn').onclick = () => document.body.classList.toggle('immersive');
$('#askBtn').onclick = () => location.href = `ask.html?book=${current().id}`;
let playing = false;
function stopAudio() { if (playing) { speechSynthesis.cancel(); playing = false; $('#audioBtn').classList.remove('on'); } }
$('#audioBtn').onclick = () => {
  if (playing) return stopAudio();
  const b = current();
  const text = page === 0 ? `${b.title}, by ${b.author}. ${b.story.join(' ')}` : b.story[page - 1];
  playing = speak(text, stopAudio);
  $('#audioBtn').classList.toggle('on', playing);
};

// open at a specific book: home.html?book=12
const start = feedBooks.findIndex(b => b.id === +params.get('book'));
if (start > 0) requestAnimationFrame(() => { feed.scrollTop = start * feed.clientHeight; bookIdx = start; syncCard(); });
if (store.get('notifs', []).some(n => n.unread) || !store.get('notifs')) $('#bell').insertAdjacentHTML('beforeend', '<i class="badge-dot"></i>');
syncCard();
