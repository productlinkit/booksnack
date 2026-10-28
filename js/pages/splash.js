// Splash: show the logo briefly, then continue to the welcome slides (tap to skip).
const next = () => location.replace('welcome.html');
const timer = setTimeout(next, 1800);
document.addEventListener('click', () => { clearTimeout(timer); next(); });
