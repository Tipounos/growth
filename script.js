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
  speed: 50
});

// Année du footer
document.getElementById('year').textContent = new Date().getFullYear();