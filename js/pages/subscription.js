// Manage subscription: see the current plan, switch or cancel.
let current = store.get('plan', 'free'), chosen = current;
function render() {
  const plan = PLANS[current];
  $('#current').innerHTML = `<small>Current plan</small><b>${plan.name}</b><small>${plan.note}</small>`;
  $('#plans').innerHTML = Object.entries(PLANS).map(([k, v]) => `<div class="sub-plan ${k === chosen ? 'on' : ''}" data-plan="${k}" role="radio" aria-checked="${k === chosen}" tabindex="0">
    <span class="radio-dot ${k === chosen ? 'on' : ''}"></span><div class="grow"><b>${v.name}</b><small>${v.note}</small></div><span class="price">${v.price}</span></div>`).join('');
  $('#change').disabled = chosen === current;
  $('#change').textContent = chosen === current ? 'This is your plan' : `Switch to ${PLANS[chosen].name}`;
  $('#cancel').hidden = current === 'free';
}
$('#plans').onclick = e => { const r = e.target.closest('[data-plan]'); if (r) { chosen = r.dataset.plan; render(); } };
$('#change').onclick = () => { current = chosen; store.set('plan', current); toast(`You're on ${PLANS[current].name}`); render(); };
$('#cancel').onclick = () => {
  if (!confirm('Cancel your subscription? You keep access until the end of this period.')) return;
  current = chosen = 'free'; store.set('plan', 'free'); toast('Subscription cancelled'); render();
};
render();
