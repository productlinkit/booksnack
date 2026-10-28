// Notifications inbox (demo messages, read state is remembered).
const DEFAULT_NOTIFS = [
  { t: 'Your daily snack is ready', m: `Today's pick: ${BOOKS[0].title}. Takes 3 minutes.`, unread: true, icon: 'book' },
  { t: 'Keep your streak going', m: 'You read 2 days in a row. One more today?', unread: true, icon: 'flame' },
  { t: 'New in Fantasy/Myth', m: `${BOOKS.find(b => b.category === 'Fantasy/Myth').title} was just added.`, unread: false, icon: 'star' },
  { t: 'Welcome to BookSnack', m: 'Swipe up for the next book, sideways to read the summary.', unread: false, icon: 'hi' }
];
const ICONS = {
  book: '<path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z"/>',
  flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 3 3 5"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  hi: '<path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0"/>'
};
let notifs = store.get('notifs', DEFAULT_NOTIFS);
function render() {
  $('#list').innerHTML = notifs.map(n => `<div class="notif ${n.unread ? 'unread' : ''}"><span class="ic"><svg viewBox="0 0 24 24">${ICONS[n.icon]}</svg></span><div><b>${n.t}</b><p>${n.m}</p></div></div>`).join('');
}
$('#readAll').onclick = () => { notifs = notifs.map(n => ({ ...n, unread: false })); store.set('notifs', notifs); render(); toast('All caught up'); };
render();
