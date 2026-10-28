// Pick reading vibes. With ?edit=1 (from Reading Preference) it returns there after saving.
const editing = params.has('edit');
const picks = store.get('picks', { cats: [], vibes: [] });
const chosen = new Set(picks.vibes);
$('#onbVibes').innerHTML = VIBES.map(([t, s, art]) =>
  `<button class="vibe ${chosen.has(t) ? 'on' : ''}" data-vibe="${t}"><span class="ill"><svg viewBox="0 0 64 64">${art}</svg></span><b>${t}</b><small>${s}</small></button>`).join('');
const sync = () => $('#vibesNext').disabled = !chosen.size;
$('#onbVibes').onclick = e => {
  const v = e.target.closest('[data-vibe]'); if (!v) return;
  const k = v.dataset.vibe;
  chosen.has(k) ? chosen.delete(k) : chosen.add(k);
  v.classList.toggle('on', chosen.has(k));
  sync();
};
$('#vibesNext').onclick = () => {
  store.set('picks', { ...picks, vibes: [...chosen] });
  location.href = editing ? 'reading-preference.html' : 'signup.html';
};
if (editing) {
  $('#vibesNext').textContent = 'Save';
  $('.skip').href = 'reading-preference.html'; $('.skip').textContent = 'Cancel';
}
sync();
