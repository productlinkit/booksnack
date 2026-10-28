// Finish onboarding and open the feed.
$('#finishOnb').onclick = () => { store.set('onboarded', true); location.href = 'home.html'; };
