import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Menu mobile
const header = document.querySelector('.site-header');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// Ferme le menu quand on clique sur un lien
document.querySelectorAll('.nav a').forEach((link) =>
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
  })
);

// Carousel infini
const heroLogoCarousel = new InfiniteScrollCarousel('#hero-logo-carousel', {
  fadeColor: "#0d1621"
});

// Année du footer
document.getElementById('year').textContent = new Date().getFullYear();


/* =========================================================
   ANIMATIONS
   ========================================================= */

// Étoiles : une balise par étoile pour les faire scintiller une à une
document.querySelectorAll('.stars').forEach((el) => {
  const chars = [...el.textContent.trim()];
  el.textContent = '';
  chars.forEach((c, i) => {
    const s = document.createElement('span');
    s.className = 'star';
    s.textContent = c;
    s.style.setProperty('--i', i);
    s.setAttribute('aria-hidden', 'true');
    el.appendChild(s);
  });
});

// Header (ombre) + barre de progression + parallaxe légère
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);

const parallaxEls = [...document.querySelectorAll('.split .frame')];
let ticking = false;

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
  header.classList.toggle('scrolled', window.scrollY > 10);

  if (!reduceMotion) {
    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.translate = `0 ${(-offset * 0.06).toFixed(1)}px`;
    });
  }
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
onScroll();

// Lien actif dans le menu selon la section visible
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((l) =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id)
      );
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
navLinks.forEach((l) => {
  const target = document.querySelector(l.getAttribute('href'));
  if (target) spy.observe(target);
});

// Halo qui suit la souris dans le hero
const hero = document.querySelector('.hero');
if (hero && !reduceMotion) {
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', e.clientX - r.left + 'px');
    hero.style.setProperty('--my', e.clientY - r.top + 'px');
  });
}

if (!reduceMotion) {
  // Compteurs : "1,5M" -> anime de 0 à 1,5 en gardant le texte autour
  function prepCounter(el) {
    const node = [...el.childNodes].find((n) => n.nodeType === 3 && /\d/.test(n.nodeValue));
    if (!node) return null;
    const m = node.nodeValue.match(/^(\D*)(\d+(?:[.,]\d+)?)([\s\S]*)$/);
    if (!m) return null;
    const [, pre, num, post] = m;
    const decimals = (num.split(/[.,]/)[1] || '').length;
    const end = parseFloat(num.replace(',', '.'));
    const fmt = (v) => v.toFixed(decimals).replace('.', ',');
    node.nodeValue = pre + fmt(0) + post;
    return () => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / 1600, 1);
        node.nodeValue = pre + fmt(end * (1 - Math.pow(1 - p, 3))) + post;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
  }
  const counters = new Map();
  document.querySelectorAll('.stats strong, .result .big').forEach((el) => {
    const start = prepCounter(el);
    if (start) counters.set(el, start);
  });
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        counters.get(e.target)();
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((_, el) => counterObs.observe(el));

  // Apparition au scroll (aucun changement à faire dans le HTML)
  const marked = new Set();
  function reveal(selector, variant = 'up', stagger = false) {
    const groups = new Map();
    document.querySelectorAll(selector).forEach((el) => {
      if (marked.has(el) || el.closest('.hero')) return;
      marked.add(el);
      const list = groups.get(el.parentElement) || [];
      list.push(el);
      groups.set(el.parentElement, list);
    });
    groups.forEach((list) =>
      list.forEach((el, i) => {
        el.classList.add('reveal');
        el.dataset.reveal = variant;
        if (stagger) el.style.setProperty('--d', Math.min(i, 5) * 100 + 'ms');
        revealObs.observe(el);
      })
    );
  }
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('is-visible');
      revealObs.unobserve(el);
      // une fois fini, on retire les classes pour ne pas gêner les hovers
      el.addEventListener('transitionend', function done(ev) {
        if (ev.target !== el || ev.propertyName !== 'opacity') return;
        el.classList.remove('reveal', 'is-visible');
        el.style.removeProperty('--d');
        el.removeEventListener('transitionend', done);
      });
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  reveal('.section-head');
  reveal('.stats li', 'up', true);
  reveal('.marquee', 'fade');
  reveal('.grid > *', 'up', true);
  reveal('.split > div');
  reveal('.split > .frame', 'zoom');
  reveal('main > section > .container > .frame', 'zoom');
  reveal('.cta-box', 'zoom');
  reveal('details', 'up', true);
  reveal('.foot-grid > *', 'up', true);
}


// Navbar connection or account CTAs depending on wether or not the user is logged in

const navbarActionsEl = document.querySelector(".bar-actions")

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in", user.email)
    navbarActionsEl.classList.add("logged-in")
  } else {
    console.log("the user isnt logged in")
  }
})