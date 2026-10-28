// ASK.AI: history list, or a chat about one book when opened with ?book=id.
// Answers are built from the book's summary (demo, no real AI behind it).
const book = bookById(params.get('book'));
const history = store.get('ai', []);

if (!book) {
  $('#historyView').hidden = false;
  $('#badge').textContent = `${history.length} ${history.length === 1 ? 'Book' : 'Books'}`;
  const render = () => {
    const q = $('#histSearch').value.trim().toLowerCase();
    const rows = history.map(h => ({ ...h, b: bookById(h.id) })).filter(h => h.b && (!q || h.b.title.toLowerCase().includes(q)));
    $('#histList').innerHTML = rows.length ? rows.map(h => `<a class="hist" href="ask.html?book=${h.id}"><img src="${h.b.cover}" alt=""><div class="grow"><b>${h.b.title}</b><p>${h.last}</p></div><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></a>`).join('')
      : `<div class="white-box"><div><img class="empty-ill" src="../assets/illustrations/no-summaries.png" alt="Open book with a glowing lightbulb">No AI summaries yet.<small>Pick a book and tap the lightbulb to start.</small></div></div>`;
  };
  $('#histSearch').oninput = render;
  $('#pickBook').innerHTML = BOOKS.slice(0, 6).map(bookTile).join('').replace(/book\.html\?id=/g, 'ask.html?book=');
  render();
} else {
  $('#chatView').hidden = false;
  $('#chatBook').innerHTML = `<img src="${book.cover}" alt=""><div class="grow"><b>${book.title}</b><small>${book.author}</small></div>`;
  const saved = history.find(h => h.id === book.id);
  const msgs = saved ? saved.msgs : [{ ai: true, html: `Hi! I've read <b>${book.title}</b>. Ask me anything about it.` }];
  const box = $('#msgs');
  const draw = () => { box.innerHTML = msgs.map(m => `<div class="msg ${m.ai ? 'ai' : 'me'}">${m.html}</div>`).join(''); box.scrollTop = box.scrollHeight; };
  const answer = q => {
    const s = q.toLowerCase();
    if (s.includes('main idea') || s.includes('about')) return `In short: ${book.story[0]} ${book.story[1]}`;
    if (s.includes('takeaway') || s.includes('lesson')) return `Three takeaways:<ul><li>${book.story[0]}</li><li>${book.story[1]}</li><li>It's a great pick if you enjoy ${book.category.toLowerCase()}.</li></ul>`;
    if (s.includes('who')) return `Readers who like ${book.category.toLowerCase()} will enjoy it most. ${book.author} keeps it accessible, so it also works as a first read in the genre.`;
    if (s.includes('similar') || s.includes('recommend')) {
      const more = BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, 3);
      return more.length ? `You might also like: ${more.map(b => `<b>${b.title}</b>`).join(', ')}.` : 'This one is unique in our library for now!';
    }
    return `Good question! Based on the summary: ${book.story[1]} Try asking for the main idea or key takeaways too.`;
  };
  const save = () => {
    const rest = history.filter(h => h.id !== book.id);
    const last = msgs.filter(m => !m.ai).pop();
    store.set('ai', [{ id: book.id, last: last ? last.html : 'Started a chat', msgs }, ...rest]);
  };
  const ask = q => {
    if (!q.trim()) return;
    msgs.push({ ai: false, html: q.replace(/</g, '&lt;') });
    draw();
    box.insertAdjacentHTML('beforeend', '<div class="msg ai" id="typing"><span class="typing"><i></i><i></i><i></i></span></div>');
    box.scrollTop = box.scrollHeight;
    setTimeout(() => { msgs.push({ ai: true, html: answer(q) }); draw(); save(); }, 700);
  };
  $('#suggest').onclick = e => { const c = e.target.closest('.chip'); if (c) ask(c.textContent); };
  $('#chatForm').onsubmit = e => { e.preventDefault(); ask($('#chatInput').value); $('#chatInput').value = ''; };
  draw();
}
