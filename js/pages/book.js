// Book detail: cover, key ideas and actions.
const b = bookById(params.get('id')) || BOOKS[0];
document.title = `${b.title} · BookSnack`;
$('#detail').innerHTML = `
  <div class="detail-hero"><img src="${b.cover}" alt="${b.title} cover"><div><h1>${b.title}</h1><small>${b.author}</small><a class="tag" href="explore.html?cat=${encodeURIComponent(b.category)}">${b.category}</a></div></div>
  <a class="btn-primary" href="home.html?book=${b.id}">Start reading</a>
  <div class="detail-acts">
    <button data-act="liked"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z"/></svg>Like</button>
    <button data-act="saved"><svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>Save</button>
    <button data-act="listen"><svg viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10H4ZM16 9a4 4 0 0 1 0 6"/></svg>Listen</button>
  </div>
  <h3 class="sec">Key ideas</h3>
  <div class="card">${b.story.map((t, i) => `<div class="idea"><span>${i + 1}</span><p>${t}</p></div>`).join('')}</div>
  <h3 class="sec">Have a question?</h3>
  <a class="btn-soft" href="ask.html?book=${b.id}"><svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0 0 12 3Z"/></svg>Ask AI about this book</a>
  <h3 class="sec">More in ${b.category}</h3>
  <div class="grid">${BOOKS.filter(x => x.category === b.category && x.id !== b.id).slice(0, 3).map(bookTile).join('') || '<small>No other books yet.</small>'}</div>`;
const sync = () => ['liked', 'saved'].forEach(k => $(`[data-act=${k}]`).classList.toggle('on', inList(k, b.id)));
let playing = false;
$('.detail-acts').onclick = e => {
  const btn = e.target.closest('button'); if (!btn) return;
  const k = btn.dataset.act;
  if (k === 'listen') {
    if (playing) { speechSynthesis.cancel(); playing = false; }
    else playing = speak(`${b.title}, by ${b.author}. ${b.story.join(' ')}`, () => { playing = false; btn.classList.remove('on'); });
    btn.classList.toggle('on', playing);
    return;
  }
  toast(toggleList(k, b.id) ? (k === 'liked' ? 'Added to liked books' : 'Saved to My Library') : 'Removed');
  sync();
};
sync();
