// Notification preferences.
const ns = Object.assign({ daily: true, time: '08:00', streak: true, fresh: true, promo: false }, store.get('notifSettings', {}));
$$('[data-ns]').forEach(input => {
  const k = input.dataset.ns;
  input.type === 'checkbox' ? input.checked = ns[k] : input.value = ns[k];
  input.onchange = () => {
    ns[k] = input.type === 'checkbox' ? input.checked : input.value;
    store.set('notifSettings', ns); syncTime(); toast('Saved');
  };
});
const syncTime = () => $('#timeRow').style.opacity = ns.daily ? 1 : .4;
syncTime();
