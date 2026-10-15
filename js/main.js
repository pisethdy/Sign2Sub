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
const form = document.getElementById('demo-form');
const formSuccess = document.getElementById('form-success');

const openModal = () => { modal.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeModal = () => { 
  modal.classList.remove('open'); 
  document.body.style.overflow = ''; 
  setTimeout(() => {
    if (form) {
      form.style.display = 'flex';
      form.reset();
    }
    if (formSuccess) formSuccess.style.display = 'none';
  }, 300);
};

document.getElementById('open-demo').addEventListener('click', openModal);
document.getElementById('open-demo-cta').addEventListener('click', openModal);
document.getElementById('close-demo').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─────────────────────────────────────────
// EmailJS Configuration
// 1. Sign up at https://emailjs.com (free)
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create TWO email templates (see comments below)
// 4. Paste your keys below
// ─────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'ieKVH8xr_dPoGSVw1';        // Account → API Keys
const EMAILJS_SERVICE_ID  = 'service_1758k6q';        // Email Services tab
const EMAILJS_TEAM_TPL    = 'template_lwche3n';  // Notifies your team
const EMAILJS_REPLY_TPL   = 'template_net7djs'; // Auto-reply to submitter

// Init EmailJS
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// Spin animation for loading state
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes ejs-spin { to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);

// Form submission
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn  = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    // Loading state
    submitBtn.innerHTML = '<svg style="width:16px;height:16px;animation:ejs-spin 0.8s linear infinite;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending\u2026';
    submitBtn.disabled = true;

    // Collect form values — keys must match your EmailJS template variables
    const params = {
      from_name:  form.querySelector('#req-name').value.trim(),
      from_email: form.querySelector('#req-email').value.trim(),
      message:    form.querySelector('#req-message').value.trim(),
      reply_to:   form.querySelector('#req-email').value.trim(),
    };

    try {
      // Send team notification + auto-reply to submitter in parallel
      await Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEAM_TPL,  params),
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_REPLY_TPL, params),
      ]);

      form.style.display = 'none';
      formSuccess.style.display = 'block';
      form.reset();

    } catch (err) {
      console.error('EmailJS error:', err);
      alert('Something went wrong. Please email us directly at sign2sub@gmail.com');
    } finally {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled  = false;
    }
  });
}

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
