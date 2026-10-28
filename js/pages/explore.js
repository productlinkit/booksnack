// Explore: search, category chips, book grid.
let activeCat = params.get('cat') || (store.get('picks', {}).cats || [])[0] || 'Drama';
function renderChips() {
  $('#chips').innerHTML = CATEGORIES.map(c =>
    `<button class="chip ${c === activeCat ? 'on' : ''}" data-cat="${c}">${catIcon(c)}${c}</button>`).join('');
}
function renderBooks() {
  const q = $('#searchInput').value.trim().toLowerCase();
  const list = BOOKS.filter(b => q ? (b.title + ' ' + b.author).toLowerCase().includes(q) : b.category === activeCat);
  $('#resultsTitle').textContent = q ? `Results for "${q}"` : activeCat;
  $('#bookGrid').innerHTML = list.length ? `<div class="grid">${list.map(bookTile).join('')}</div>` : '<small>No books found.</small>';
}
$('#chips').onclick = e => {
  const c = e.target.closest('[data-cat]'); if (!c) return;
  activeCat = c.dataset.cat; $('#searchInput').value = ''; renderChips(); renderBooks();
};
$('#searchInput').oninput = renderBooks;
renderChips(); renderBooks();
