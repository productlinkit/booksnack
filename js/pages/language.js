// Language preference (stored; the demo content itself stays in English).
const LANGS = [['en', 'English', 'English'], ['id', 'Bahasa Indonesia', 'Indonesian'], ['ms', 'Bahasa Melayu', 'Malay'], ['es', 'Español', 'Spanish'], ['ja', '日本語', 'Japanese'], ['ar', 'العربية', 'Arabic']];
let lang = store.get('lang', 'en');
function render() {
  $('#langs').innerHTML = LANGS.map(([k, n, en]) => `<div class="set-row ${k === lang ? 'on' : ''}" data-lang="${k}" role="radio" aria-checked="${k === lang}" tabindex="0"><div class="grow"><b>${n}</b><small>${en}</small></div><span class="radio-dot"></span></div>`).join('');
}
$('#langs').onclick = e => {
  const r = e.target.closest('[data-lang]'); if (!r) return;
  lang = r.dataset.lang; store.set('lang', lang); render();
  toast(`Language set to ${LANGS.find(l => l[0] === lang)[1]}`);
};
render();
