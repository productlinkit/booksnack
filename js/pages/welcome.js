// Welcome slides: Next / swipe / dots, with a light parallax on the illustration.
let slide = 0;
const slides = $$('.slide');
function showSlide(i) {
  slide = Math.max(0, Math.min(i, slides.length - 1));
  slides.forEach((s, j) => {
    s.style.transform = `translateX(-${slide * 100}%)`;
    s.classList.toggle('cur', j === slide);
  });
  $$('.board-bg .bg').forEach((b, j) => b.classList.toggle('on', j === slide));
  $$('#boardDots i').forEach((d, j) => d.classList.toggle('on', j === slide));
  $('#boardNext').textContent = slide === slides.length - 1 ? 'Get Started' : 'Next';
}
const forward = () => slide < slides.length - 1 ? showSlide(slide + 1) : location.href = 'categories.html';
$('#boardNext').onclick = forward;
$$('#boardDots i').forEach((d, j) => d.onclick = () => showSlide(j));

let touchX = null;
$('#slides').addEventListener('touchstart', e => touchX = e.touches[0].clientX, { passive: true });
$('#slides').addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX; touchX = null;
  if (dx < -50) forward();
  if (dx > 50) showSlide(slide - 1);
});

showSlide(0);
