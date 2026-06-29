/* Smoke & Slaw — Main JS */

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Auto-hide past events
const eventCards = document.querySelectorAll('.event-card');
if (eventCards.length) {
  const MONTHS = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  const today = new Date(); today.setHours(0,0,0,0);
  let visible = 0;
  eventCards.forEach(card => {
    const day = parseInt(card.querySelector('.event-card__date-day')?.textContent);
    const mon = card.querySelector('.event-card__date-month')?.textContent.trim();
    if (!day || !(mon in MONTHS)) return;
    const eventDate = new Date(today.getFullYear(), MONTHS[mon], day);
    if (eventDate < today) { card.hidden = true; } else { visible++; }
  });
  if (visible === 0) {
    const list = eventCards[0].closest('.stack');
    if (list) list.innerHTML = '<p style="color:var(--muted);">No upcoming dates confirmed yet. Follow us on Instagram for the latest.</p>';
  }
}

// Testimonial quote marks
document.querySelectorAll('.testimonial-track > div > div').forEach(card => {
  const q = document.createElement('div');
  q.innerHTML = '“';
  q.style.cssText = 'font-size:3.5rem;color:var(--red);line-height:0.8;margin-bottom:0.5rem;font-family:Georgia,serif;font-weight:700;';
  card.insertBefore(q, card.firstChild);
});

// Testimonial carousel
const carousel = document.querySelector('.testimonial-carousel');
if (carousel) {
  const track = carousel.querySelector('.testimonial-track');
  const dots = carousel.querySelectorAll('.t-dot');
  const total = track.children.length;
  let current = 0;
  let timer;

  dots.forEach((d, i) => {
    d.style.cssText = 'width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;padding:0;transition:background 0.3s;';
  });

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      d.style.background = i === current ? 'var(--red)' : 'rgba(255,255,255,0.2)';
    });
  }

  function startTimer() { timer = setInterval(() => goTo(current + 1), 5000); }
  function stopTimer() { clearInterval(timer); }

  dots.forEach((d, i) => d.addEventListener('click', () => { stopTimer(); goTo(i); startTimer(); }));
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);

  goTo(0);
  startTimer();
}

