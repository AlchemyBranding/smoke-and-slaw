// Past events gallery: arrow buttons scroll the track by most of a screen,
// and hide themselves at either end. Touch and trackpad scrolling work without this.
document.querySelectorAll('.gallery').forEach((gallery) => {
  const track = gallery.querySelector('.gallery__track');
  const prev = gallery.querySelector('.gallery__btn--prev');
  const next = gallery.querySelector('.gallery__btn--next');
  if (!track || !prev || !next) return;

  const step = () => track.clientWidth * 0.8;

  function update() {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  }

  prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  track.querySelectorAll('img').forEach((img) => img.addEventListener('load', update));
  update();
});
