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

// Enquiry form — basic client-side validation + success state
const enquiryForm = document.querySelector('.enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = enquiryForm.querySelector('[type="submit"]');
    btn.textContent = 'Sent — we\'ll be in touch';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  });
}
