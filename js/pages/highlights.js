// Saved highlights from the feed.
let list = store.get('highlights', []);
function render() {
  $('#list').innerHTML = list.length ? list.map((h, i) => {
    const b = bookById(h.id);
    return `<div class="quote"><p>“${h.text}”</p><div class="meta"><small>${b ? `${b.title} · ${b.author}` : ''}</small><a class="link" href="home.html?book=${h.id}" style="font-size:12px">Open</a><button data-i="${i}">Remove</button></div></div>`;
  }).join('') : `<div class="white-box"><div><img class="empty-ill" src="../assets/illustrations/reading-phone.png" alt="">No highlights yet.<small>Tap any summary text in your feed to highlight it.</small></div></div>`;
}
$('#list').onclick = e => { const b = e.target.closest('[data-i]'); if (b) { list.splice(+b.dataset.i, 1); store.set('highlights', list); render(); toast('Highlight removed'); } };
render();
