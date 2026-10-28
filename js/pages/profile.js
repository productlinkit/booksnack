// Profile overview with live counts.
const p = profile();
$('#name').textContent = p.name; $('#email').textContent = p.email; $('#avatar').textContent = p.name[0].toUpperCase();
$('#plan').textContent = PLANS[store.get('plan', 'free')].name;
$('#sLiked').textContent = store.get('liked', []).length;
$('#sSaved').textContent = store.get('saved', []).length;
$('#sHl').textContent = store.get('highlights', []).length;
$('#logout').onclick = () => {
  if (!confirm('Log out and clear this demo account on this device?')) return;
  Object.keys(localStorage).filter(k => k.startsWith('bs_')).forEach(k => localStorage.removeItem(k));
  location.href = '../index.html';
};
