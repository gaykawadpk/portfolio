// ============================
// 🎬 CINEMATIC PAGE LOADER
// ============================
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  setTimeout(() => {
    loader.classList.add('loaded');
    document.body.style.overflow = '';
    document.querySelectorAll('.animate-in').forEach(el => el.style.animationPlayState = 'running');
  }, 1800);
});

// ============================
// 🔍 CUSTOM CURSOR
// ============================
const cursor = document.getElementById('customCursor');
const cursorDot = document.getElementById('cursorDot');
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

if (cursor && cursorDot && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    if (!cursor.classList.contains('visible')) {
      cursor.classList.add('visible');
      cursorDot.classList.add('visible');
    }
  });

  function animateCursor() {
    dotX += (cursorX - dotX) * 0.15;
    dotY += (cursorY - dotY) * 0.15;
    cursor.style.left = dotX + 'px';
    cursor.style.top = dotY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverables = document.querySelectorAll('a, button, .gallery-item, .skill-card, .poem-card, .filter-btn, .contact-item, .tag');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
    cursorDot.classList.remove('visible');
  });
  document.addEventListener('mouseenter', () => {
    cursor.classList.add('visible');
    cursorDot.classList.add('visible');
  });
}

// ============================
// 🔮 CONSTELLATION BACKGROUND
// ============================
const constellationCanvas = document.getElementById('constellationCanvas');
if (constellationCanvas) {
  const ctx = constellationCanvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 80;
  const CONNECTION_DISTANCE = 120;
  let mouseStarX = -9999, mouseStarY = -9999;

  function resizeCanvas() {
    constellationCanvas.width = window.innerWidth;
    constellationCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * constellationCanvas.width,
        y: Math.random() * constellationCanvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.3,
      });
    }
  }
  initStars();

  document.addEventListener('mousemove', (e) => {
    mouseStarX = e.clientX;
    mouseStarY = e.clientY;
  });

  function animateConstellation() {
    ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const starColor = isDark ? '201, 168, 76' : '120, 90, 20';

    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;
      if (star.x < 0 || star.x > constellationCanvas.width) star.vx *= -1;
      if (star.y < 0 || star.y > constellationCanvas.height) star.vy *= -1;

      const dxM = mouseStarX - star.x;
      const dyM = mouseStarY - star.y;
      const distM = Math.sqrt(dxM * dxM + dyM * dyM);
      if (distM < 200) {
        star.x += dxM * 0.002;
        star.y += dyM * 0.002;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starColor}, ${star.brightness})`;
      ctx.fill();
    });

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.2;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(${starColor}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateConstellation);
  }
  animateConstellation();
}

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
  'In My Debugging Era',
  'The Art of Deduction'
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

  let speed = isDeleting ? 30 : 70;

  if (!isDeleting && charIndex === current.length) {
    speed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeRole, speed);
}
typeRole();

// ============================
// Floating Particles
// ============================
const particlesContainer = document.getElementById('particles');
function createParticles() {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (5 + Math.random() * 7) + 's';
    const size = (2 + Math.random() * 4);
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
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
  navbar.classList.toggle('scrolled', window.scrollY > 50);

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
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ============================
// 🎠 GALLERY CAROUSEL
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const categoryPanels = document.querySelectorAll('.category-panel');
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDots = document.getElementById('carouselDots');

let currentCategory = 'landscape';
let currentIndex = 0;
let filteredItems = [];

function getItemsForCategory(filter) {
  return Array.from(galleryItems).filter(item =>
    item.getAttribute('data-category').split(' ').includes(filter)
  );
}

function buildDots(count) {
  carouselDots.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    carouselDots.appendChild(dot);
  }
}

function updateDots(index) {
  carouselDots.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, filteredItems.length - 1));
  // Find the position of the current slide in the full track (accounting for header panel)
  const activePanel = carouselTrack.querySelector(`.category-panel[data-panel="${currentCategory}"]`);
  const panelWidth = activePanel ? activePanel.offsetWidth + 20 : 0; // 20 = gap
  const slideWidth = filteredItems[0] ? filteredItems[0].offsetWidth + 20 : 360;
  carouselTrack.style.transform = `translateX(-${panelWidth + currentIndex * slideWidth}px)`;
  updateDots(currentIndex);
  carouselPrev.disabled = currentIndex === 0;
  carouselNext.disabled = currentIndex === filteredItems.length - 1;
}

function applyFilter(filter) {
  currentCategory = filter;
  currentIndex = 0;

  // Show/hide gallery items and category panels
  galleryItems.forEach(item => {
    const match = item.getAttribute('data-category').split(' ').includes(filter);
    item.style.display = match ? '' : 'none';
  });
  categoryPanels.forEach(panel => {
    panel.style.display = panel.getAttribute('data-panel') === filter ? '' : 'none';
  });

  filteredItems = getItemsForCategory(filter);
  buildDots(filteredItems.length);

  // Reset track position instantly
  carouselTrack.style.transition = 'none';
  carouselTrack.style.transform = 'translateX(0)';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      carouselTrack.style.transition = '';
      goToSlide(0);
    });
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.getAttribute('data-filter'));
  });
});

carouselPrev.addEventListener('click', () => goToSlide(currentIndex - 1));
carouselNext.addEventListener('click', () => goToSlide(currentIndex + 1));

// Touch / swipe support
let carouselTouchStartX = 0;
const viewport = document.getElementById('carouselViewport');
if (viewport) {
  viewport.addEventListener('touchstart', e => { carouselTouchStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = carouselTouchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
  });
}

// Keyboard arrow nav (when gallery section is in view)
document.addEventListener('keydown', e => {
  if (document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
});

// Apply default on page load
const defaultFilter = document.querySelector('.filter-btn.active');
if (defaultFilter) applyFilter(defaultFilter.getAttribute('data-filter'));

// ============================
// 🎬 CINEMATIC LIGHTBOX
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxCaption = document.getElementById('lightboxCaption');

let lightboxImages = [];
let lightboxIndex = 0;

function getVisibleGalleryItems() {
  return filteredItems.length ? filteredItems : Array.from(galleryItems).filter(item => item.style.display !== 'none');
}

function openLightbox(index) {
  lightboxImages = getVisibleGalleryItems();
  lightboxIndex = index;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  const item = lightboxImages[lightboxIndex];
  const img = item.querySelector('img');
  const h4 = item.querySelector('.gallery-overlay h4');
  const p = item.querySelector('.gallery-overlay p');

  lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
  lightboxCaption.querySelector('.lightbox-title').textContent = h4 ? h4.textContent : '';
  lightboxCaption.querySelector('.lightbox-subtitle').textContent = p ? p.textContent : '';
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  lightboxCaption.style.opacity = '0';
  lightboxCaption.style.animation = 'none';
  requestAnimationFrame(() => {
    lightboxCaption.style.animation = '';
    lightboxCaption.style.opacity = '';
  });
}

function nextLightbox() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightbox();
}

function prevLightbox() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const visible = getVisibleGalleryItems();
    const visibleIndex = visible.indexOf(item);
    openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevLightbox);
lightboxNext.addEventListener('click', nextLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLightbox();
  if (e.key === 'ArrowLeft') prevLightbox();
});

let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
lightbox.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) {
    if (diff < 0) nextLightbox();
    else prevLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================
// 🎭 3D TILT EFFECT ON CARDS
// ============================
const tiltCards = document.querySelectorAll('.skill-card, .poem-card');
tiltCards.forEach(card => {
  const shine = document.createElement('div');
  shine.classList.add('tilt-shine');
  card.appendChild(shine);

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY * -5;
    const rotateY = (x - centerX) / centerX * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================
// 🔦 SPOTLIGHT FOLLOW ON SECTIONS
// ============================
const sectionElements = document.querySelectorAll('.section');
sectionElements.forEach(sec => {
  const spotlight = document.createElement('div');
  spotlight.classList.add('spotlight');
  sec.insertBefore(spotlight, sec.firstChild);

  sec.addEventListener('mousemove', (e) => {
    const rect = sec.getBoundingClientRect();
    sec.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    sec.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  });
});

// ============================
// ⌨️ KEYBOARD SHORTCUTS
// ============================
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (lightbox.classList.contains('active')) return;

  const shortcuts = { '1': '#about', '2': '#skills', '3': '#gallery', '4': '#poetry', '5': '#contact', 'd': 'toggle-theme' };

  if (shortcuts[e.key]) {
    e.preventDefault();
    if (e.key === 'd') {
      themeToggle.click();
    } else {
      const target = document.querySelector(shortcuts[e.key]);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// ============================
// 💀 KONAMI CODE EASTER EGG
// ============================
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
let konamiActive = false;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      konamiActive = !konamiActive;
      document.body.classList.toggle('easter-egg-active', konamiActive);

      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 99999;
        background: var(--accent); color: #fff; padding: 16px 32px; border-radius: 12px;
        font-family: var(--font-mono); font-size: 0.9rem; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        animation: fadeUp 0.5s var(--ease-spring);
      `;
      notification.textContent = konamiActive
        ? '🎮 Konami Code activated! The game is REALLY on now!'
        : '🎮 Konami Code deactivated. Back to business.';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  } else {
    konamiIndex = 0;
  }
});

// ============================
// 🔍 SECTION TITLE DECODE ANIMATION
// ============================
const sectionTitles = document.querySelectorAll('.section-title');
const cipherChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,./<>?';

sectionTitles.forEach(title => {
  const originalText = title.textContent;
  let isDecoding = false;

  title.addEventListener('mouseenter', () => {
    if (isDecoding) return;
    isDecoding = true;
    let iterations = 0;
    const interval = setInterval(() => {
      title.textContent = originalText.split('').map((char, idx) => {
        if (idx < iterations) return originalText[idx];
        if (char === ' ') return ' ';
        return cipherChars[Math.floor(Math.random() * cipherChars.length)];
      }).join('');

      iterations += 1;
      if (iterations > originalText.length) {
        clearInterval(interval);
        title.textContent = originalText;
        isDecoding = false;
      }
    }, 40);
  });
});

// ============================
// 🧲 MAGNETIC BUTTONS
// ============================
const magneticBtns = document.querySelectorAll('.btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ============================
// Contact Form (Formspree AJAX)
// ============================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<span>🔍 Sending...</span>';
  btn.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.innerHTML = '<span>✅ Case Received! The game is on.</span>';
      btn.style.background = '#22c55e';

      // Confetti celebration
      for (let i = 0; i < 24; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed; width: 8px; height: 8px; border-radius: 50%;
          background: ${['#c9a84c','#e0c56a','#ffd700','#fff'][Math.floor(Math.random()*4)]};
          top: ${btn.getBoundingClientRect().top}px;
          left: ${btn.getBoundingClientRect().left + Math.random() * btn.offsetWidth}px;
          z-index: 9999; pointer-events: none;
          animation: confettiFall 1s ease-out forwards;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
      }

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch {
    btn.innerHTML = '<span>❌ Something went wrong. Try emailing directly.</span>';
    btn.style.background = '#ef4444';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
});

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translateY(-150px) translateX(${Math.random() > 0.5 ? '' : '-'}${40 + Math.random()*60}px) rotate(${360 + Math.random()*360}deg) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(confettiStyle);

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

// ============================
// 📊 SCROLL PROGRESS BAR
// ============================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px; z-index: 10001;
  background: linear-gradient(90deg, var(--accent), #ffd700, var(--accent));
  background-size: 200% 100%;
  animation: borderGlow 3s ease infinite;
  transition: width 0.1s;
  width: 0%;
  box-shadow: 0 0 10px rgba(201,168,76,0.25);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// ============================
// 🖨️ CONSOLE EASTER EGG
// ============================
console.log('%c🔍 The game is on!', 'font-size: 24px; color: #c9a84c; font-weight: bold;');
console.log('%c"When you have eliminated the impossible, whatever remains must be the truth."', 'font-size: 12px; color: #888; font-style: italic;');
console.log('%c— Sherlock Holmes (& Puja Kumari, during debugging)', 'font-size: 11px; color: #666;');
console.log('%c\n🎹 Keyboard Shortcuts:', 'font-size: 13px; color: #c9a84c; font-weight: bold;');
console.log('%c  1-5: Navigate sections | D: Toggle theme | ←→: Lightbox nav | ↑↑↓↓←→←→BA: Konami Code', 'font-size: 11px; color: #aaa;');

// ============================
// ⬆️ BACK TO TOP BUTTON
// ============================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
