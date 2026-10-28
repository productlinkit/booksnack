// Books the reader liked.
const books = store.get('liked', []).map(bookById).filter(Boolean);
$('#list').innerHTML = books.length ? `<div class="grid">${books.map(bookTile).join('')}</div>`
  : `<div class="white-box"><div><img class="empty-ill" src="../assets/illustrations/hug-books.png" alt="">No liked books yet.<small>Tap the heart on any book in your feed.</small></div></div>`;
