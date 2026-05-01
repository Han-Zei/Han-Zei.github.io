const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section, .hero');
const revealElements = document.querySelectorAll('.reveal');
const projectButtons = document.querySelectorAll('[data-project-link]');
let toastTimeout;

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

function updateActiveNav() {
  let currentId = 'home';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentId = section.id || 'home';
    }
  });

  navAnchors.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

projectButtons.forEach((button) => {
  button.addEventListener('click', function handleProjectClick(event) {
    const link = this.dataset.projectLink;

    if (!link || link.trim() === '' || link === '#') {
      event.preventDefault();
      showToast('This project is currently available for local deployment only. A live link may be added in the future.');
      return;
    }

    event.preventDefault();
    window.open(link, '_blank', 'noopener,noreferrer');
  });
});

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', () => {
  updateActiveNav();
  document.getElementById('year').textContent = new Date().getFullYear();
});
