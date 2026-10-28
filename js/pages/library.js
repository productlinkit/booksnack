// My Library: saved and downloaded books.
let tab = params.get('tab') || 'saved';
function render() {
  $$('.lib-tabs .chip').forEach(c => c.classList.toggle('on', c.dataset.tab === tab));
  const books = store.get(tab, []).map(bookById).filter(Boolean);
  $('#libGrid').innerHTML = books.length ? `<div class="grid">${books.map(bookTile).join('')}</div>`
    : `<div class="white-box"><div><img class="empty-ill" src="../assets/illustrations/books-check.png" alt="">${tab === 'saved' ? 'No saved books yet.' : 'No downloads yet.'}<small>${tab === 'saved' ? 'Tap the bookmark on any book in your feed.' : 'Tap the download button on any book in your feed.'}</small></div></div>`;
}
$('.lib-tabs').onclick = e => { const c = e.target.closest('[data-tab]'); if (c) { tab = c.dataset.tab; render(); } };
render();
