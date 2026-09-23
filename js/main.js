// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  mobileNav.setAttribute('aria-hidden', !open);
});
document.querySelectorAll('.ml').forEach(l => l.addEventListener('click', () => {
  navToggle.classList.remove('open');
  mobileNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
}));

// Demo modal
const modal = document.getElementById('demo-modal');
const openModal = () => { modal.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
document.getElementById('open-demo').addEventListener('click', openModal);
document.getElementById('open-demo-cta').addEventListener('click', openModal);
document.getElementById('close-demo').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Scroll reveal via IntersectionObserver
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

// Smooth anchor scroll (offset for navbar height)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    }
  });
});

// Subtle hero parallax
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight && heroContent) {
    heroContent.style.transform = `translateY(${window.scrollY * 0.22}px)`;
  }
}, { passive: true });
