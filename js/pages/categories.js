// Pick favourite categories. With ?edit=1 (from Reading Preference) it returns there after saving.
const editing = params.has('edit');
const picks = store.get('picks', { cats: [], vibes: [] });
const chosen = new Set(picks.cats);
$('#onbCats').innerHTML = CATEGORIES.map(c =>
  `<button class="chip ${chosen.has(c) ? 'on' : ''}" data-cat="${c}">${catIcon(c)}${c}</button>`).join('');
const sync = () => $('#catsNext').disabled = !chosen.size;
$('#onbCats').onclick = e => {
  const c = e.target.closest('[data-cat]'); if (!c) return;
  const k = c.dataset.cat;
  chosen.has(k) ? chosen.delete(k) : chosen.add(k);
  c.classList.toggle('on', chosen.has(k));
  sync();
};
$('#catsNext').onclick = () => {
  store.set('picks', { ...picks, cats: [...chosen] });
  location.href = editing ? 'reading-preference.html' : 'vibes.html';
};
if (editing) {
  $('#catsNext').textContent = 'Save';
  $('.skip').href = 'reading-preference.html'; $('.skip').textContent = 'Cancel';
}
sync();
