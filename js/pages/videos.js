// Video summaries: tap a book to play a short animated preview (demo player).
$('#vidGrid').innerHTML = BOOKS.map((b, i) => `<button class="book vid" data-id="${b.id}" style="text-align:left">
  <img class="cover" src="${b.cover}" alt="${b.title} cover" loading="lazy"><span class="len">${2 + i % 4}:${(17 * i % 50 + 10)}</span>
  <span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><p>${b.title}</p><small>${b.author}</small></button>`).join('');
$('#vidGrid').onclick = e => {
  const t = e.target.closest('[data-id]'); if (!t) return;
  const b = bookById(t.dataset.id);
  let step = 0, timer;
  const sheet = openSheet(`<div class="player"><img src="${b.cover}" alt=""><div class="cap" id="cap"></div></div>
    <div class="progress"><span id="bar"></span></div>
    <div class="stack" style="gap:10px"><a class="btn-primary" href="book.html?id=${b.id}">Open book</a><button class="btn-soft" data-close>Close</button></div>`,
    () => clearInterval(timer));
  const lines = [`${b.title} · ${b.author}`, ...b.story];
  const tick = () => {
    $('#cap', sheet.el).textContent = lines[step % lines.length];
    $('#bar', sheet.el).style.width = Math.min(100, (step + 1) / lines.length * 100) + '%';
    if (++step > lines.length) clearInterval(timer);
  };
  tick(); timer = setInterval(tick, 2500);
};
