// Reading preference: favourite genres & vibes, font size, theme, spacing.
const picks = store.get('picks', { cats: [], vibes: [] });
$('#genres').innerHTML = picks.cats.length ? picks.cats.map(c => `<span class="chip on">${catIcon(c)}${c}</span>`).join('') : '<small>No genres picked yet.</small>';
$('#vibes').innerHTML = picks.vibes.length ? picks.vibes.map(v => `<span class="chip">${v}</span>`).join('') : '<small>No vibes picked yet.</small>';
function sync() {
  applyPrefs();
  $('#fontSize').value = prefs.size; $('#spacing').value = prefs.spacing;
  $$('.theme').forEach(t => t.classList.toggle('on', t.dataset.theme === prefs.theme));
}
$('#fontSize').oninput = e => { prefs.size = +e.target.value; sync(); };
$('#spacing').oninput = e => { prefs.spacing = +e.target.value; sync(); };
$('#themes').onclick = e => { const t = e.target.closest('.theme'); if (t) { prefs.theme = t.dataset.theme; sync(); } };
$('#saveBtn').onclick = () => { store.set('prefs', prefs); toast('Preferences saved'); setTimeout(() => location.href = 'profile.html', 700); };
sync();
