// Sign up (demo): remember the email as the profile, then go to the trial offer.
const done = msg => { toast(msg); setTimeout(() => location.href = 'trial.html', 700); };
$('#signupForm').onsubmit = e => {
  e.preventDefault();
  const email = $('#signupEmail').value.trim();
  const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  store.set('profile', { name, email });
  done('Account created');
};
$('#googleBtn').onclick = () => done('Signed in with Google (demo)');
$('#signinBtn').onclick = () => done('Signed in (demo)');
