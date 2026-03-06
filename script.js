// ============================
// Typing Animation
// ============================
const roles = [
  'Senior Software Engineer 🔍',
  'Embedded Systems Detective',
  'C/C++ on Linux — Elementary!',
  'Automotive Infotainment Specialist',
  'Photographer (I observe, not just see)',
  'Poet (Midnights Era) ✨',
  'In My Debugging Era'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingRole');

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typingEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typingEl.textContent = current.substring(0, charIndex);
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeRole, speed);
}
typeRole();

// ============================
// Floating Particles
// ============================
const particlesContainer = document.getElementById('particles');
function createParticles() {
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 6) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 3) + 'px';
    particlesContainer.appendChild(particle);
  }
}
createParticles();

// ============================
// Navbar Scroll & Active Link
// ============================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
  // Navbar shadow
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================
// Mobile Nav Toggle
// ============================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ============================
// Theme Toggle
// ============================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Respect saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================
// Scroll Reveal Animation
// ============================
const revealElements = document.querySelectorAll(
  '.skill-card, .gallery-item, .poem-card, .about-grid, .contact-grid, .about-stats .stat, .timeline-item'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger animation
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============================
// Counter Animation
// ============================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ============================
// Gallery Filtering
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
        item.style.display = '';
      } else {
        item.classList.add('hidden');
        // Delay actual hide for animation
        setTimeout(() => {
          if (item.classList.contains('hidden')) {
            item.style.display = 'none';
          }
        }, 400);
      }
    });
  });
});

// ============================
// Lightbox
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const placeholder = item.querySelector('.gallery-placeholder');
    const clone = placeholder.cloneNode(true);
    clone.style.minWidth = '60vw';
    clone.style.minHeight = '50vh';
    clone.style.borderRadius = '12px';
    clone.style.fontSize = '2rem';
    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(clone);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================
// Contact Form
// ============================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<span>Case Received! The game is on. 🔍</span>';
  btn.style.background = '#22c55e';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

// ============================
// Smooth scroll for all anchor links
// ============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
