/* ============================================================
   CLV.IE — index.js
   Handles: nav scroll, hamburger menu, scroll reveal,
            parallax hero grid, about frame tilt, active nav
   ============================================================ */

/* ── NAV SCROLL EFFECT ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── HAMBURGER / MOBILE MENU ── */
const ham = document.getElementById('ham');
const mob = document.getElementById('mobMenu');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.ml').forEach(link => {
  link.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.r');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── PARALLAX HERO GRID LINES ── */
const heroCols = document.querySelectorAll('.hero-grid-col');
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  heroCols.forEach((col, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    col.style.transform = `translateY(${sy * 0.04 * dir}px)`;
  });
}, { passive: true });

/* ── ABOUT FRAME 3D TILT ON HOVER ── */
const mainFrame  = document.querySelector('.frame-box.main');
const framesWrap = document.querySelector('.about-frames');

if (framesWrap && mainFrame) {
  framesWrap.addEventListener('mousemove', e => {
    const rect = framesWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left)  / rect.width  - 0.5;
    const y = (e.clientY - rect.top)   / rect.height - 0.5;
    mainFrame.style.transform =
      `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });

  framesWrap.addEventListener('mouseleave', () => {
    mainFrame.style.transform = '';
  });
}

/* ── ACTIVE NAV LINK HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color =
      link.getAttribute('href') === '#' + current ? 'var(--cream)' : '';
  });
}, { passive: true });