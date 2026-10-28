// Accessibility toggles, applied app-wide by common.js.
const a11y = store.get('a11y', {});
$$('[data-a11y]').forEach(input => {
  input.checked = !!a11y[input.dataset.a11y];
  input.onchange = () => { a11y[input.dataset.a11y] = input.checked; store.set('a11y', a11y); applyPrefs(); toast('Saved'); };
});
