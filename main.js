/* ═══════════════════════════════════════
   MINUS EIGHTEEN — JavaScript Interactions
   ═══════════════════════════════════════ */

'use strict';

// ── Hamburger / Mobile Drawer ────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() {
  mobileDrawer.classList.add('open');
  drawerOverlay.classList.add('visible');
  hamburgerBtn.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  mobileDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  mobileDrawer.classList.remove('open');
  drawerOverlay.classList.remove('visible');
  hamburgerBtn.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  mobileDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// Close drawer on any link click inside it
document.querySelectorAll('.drawer-link, .drawer-cta').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

// ── Nav: transparent → solid on scroll ──────────────────
const nav = document.getElementById('site-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Add to Cart buttons ──────────────────────────────────
const toast = document.getElementById('toast');
let toastTimer;

function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.flavor-card');
    const name = card ? card.querySelector('.card-name').textContent : 'Item';
    // Count bump animation
    const counter = document.querySelector('.cart-count');
    const prev = parseInt(counter.textContent, 10) || 0;
    counter.textContent = prev + 1;
    counter.style.transform = 'scale(1.6)';
    setTimeout(() => counter.style.transform = '', 300);
    showToast(`${name} added to cart! 🍦`);
  });
});

// ── Cart icon click ─────────────────────────────────────
document.getElementById('cart-btn').addEventListener('click', () => {
  showToast('Your cart is waiting! 🛒');
});

// ── Newsletter form ─────────────────────────────────────
document.getElementById('newsletter-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('email-input');
  if (!input.value) return;
  showToast(`Subscribed! Sweet mail incoming 💌`);
  input.value = '';
});

// ── Intersection Observer – fade-in on scroll ────────────
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate in
const animTargets = [
  '.flavor-card',
  '.cat-card',
  '.story-inner',
  '.insta-post',
  '.section-header',
  '.limited-banner',
  '.newsletter-inner',
];

animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 80}ms`);
    el.classList.add('anim-hidden');
    observer.observe(el);
  });
});

// ── Smooth active nav link highlight ────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Cone stage parallax (hero) ───────────────────────────
const coneStage = document.querySelector('.cone-stage');
if (coneStage) {
  window.addEventListener('mousemove', e => {
    const xFrac = (e.clientX / window.innerWidth - 0.5) * 12;
    const yFrac = (e.clientY / window.innerHeight - 0.5) * 8;
    coneStage.style.transform = `translate(${xFrac}px, ${yFrac}px)`;
  }, { passive: true });
}
