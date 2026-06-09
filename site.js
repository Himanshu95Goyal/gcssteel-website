// ─── GCS Steel — Shared Site JS ───────────────────────────────────────────

// ── Mobile Menu ──────────────────────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-close-btn');
  if (!btn || !drawer) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

// ── Sticky Nav Shrink on Scroll ───────────────────────────────────────────────
function initNavScroll() {
  const nav = document.querySelector('nav, header');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('shadow-lg', 'backdrop-blur-sm');
    } else {
      nav.classList.remove('shadow-lg', 'backdrop-blur-sm');
    }
  });
}

// ── Card Scroll Animation ─────────────────────────────────────────────────────
function initScrollReveal() {
  const cards = document.querySelectorAll('.reveal-on-scroll');
  if (!cards.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
}

// ── Pre-fill contact form from URL params ─────────────────────────────────────
function prefillContactForm() {
  const params = new URLSearchParams(window.location.search);
  const product = params.get('product');
  if (product) {
    const select = document.getElementById('product-tier');
    const msg = document.getElementById('message');
    if (msg) msg.value = `I would like to inquire about: ${decodeURIComponent(product)}`;
  }
}

// ── Run on DOM ready ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavScroll();
  initScrollReveal();
  prefillContactForm();
});
