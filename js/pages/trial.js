// Trial offer: pick a plan (dropdown shows what's included), then finish onboarding.
let chosen = 'trial';
$('#plans').onclick = e => {
  const plan = e.target.closest('.plan'); if (!plan) return;
  if (e.target.closest('.plan-toggle')) {
    plan.classList.toggle('open');
    $('.plan-toggle', plan).setAttribute('aria-expanded', plan.classList.contains('open'));
    return;
  }
  $$('#plans .plan').forEach(p => {
    p.classList.toggle('on', p === plan);
    p.setAttribute('aria-checked', p === plan);
  });
  chosen = plan.dataset.plan;
  $('#planCta').textContent = plan.dataset.cta;
};
$('#plans').onkeydown = e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('plan')) { e.preventDefault(); e.target.click(); }
};
$('#planCta').onclick = () => { store.set('plan', chosen); location.href = 'all-set.html'; };
$('#noPlan').onclick = () => { store.set('plan', 'free'); location.href = 'all-set.html'; };
