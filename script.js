// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Typewriter Effect
const typewriterTexts = ['WordPress Developer','Frontend Developer', 'IT Support', 'Angular Learner'];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typewriter() {
  const currentText = typewriterTexts[currentTextIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
  }

  let typeSpeed = isDeleting ? 120 : 180;

  if (!isDeleting && currentCharIndex === currentText.length) {
    typeSpeed = 2800; // Slow pause at end
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
    typeSpeed = 900; // Pause before next word
  }

  setTimeout(typewriter, typeSpeed);
}

// Start typewriter after page load
setTimeout(typewriter, 1000);

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-up, .stagger-item').forEach(el => {
  observer.observe(el);
});

// Stagger animation for skills and projects
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll('.stagger-item').forEach(el => {
  staggerObserver.observe(el);
});

// About Read More Toggle
const aboutToggle = document.getElementById('aboutToggle');
const aboutMore = document.getElementById('aboutMore');

if (aboutToggle && aboutMore) {
  aboutToggle.addEventListener('click', () => {
    const expanded = aboutToggle.getAttribute('aria-expanded') === 'true';
    aboutToggle.setAttribute('aria-expanded', String(!expanded));
    aboutMore.hidden = expanded;
    aboutToggle.textContent = expanded ? 'Read more' : 'Show less';
  });
}

// Contact Form Handler + Notification
const contactForm = document.getElementById('contactForm');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const notificationClose = document.getElementById('notificationClose');
let notificationTimeout;

const hideNotification = () => {
  if (!notification) return;
  notification.classList.remove('is-visible');
  notificationTimeout && clearTimeout(notificationTimeout);
  setTimeout(() => {
    if (!notification.classList.contains('is-visible')) {
      notification.hidden = true;
    }
  }, 300);
};

const showNotification = (message) => {
  if (!notification || !notificationMessage) return;
  notificationMessage.textContent = message;
  notification.hidden = false;
  requestAnimationFrame(() => notification.classList.add('is-visible'));
  notificationTimeout && clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(hideNotification, 6000);
};

if (notificationClose) {
  notificationClose.addEventListener('click', hideNotification);
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`);
    window.location.href = `mailto:mehedihasan.fhl@gmail.com?subject=${subject}&body=${emailBody}`;

    showNotification(`Thanks ${name || 'there'}! Your message pinged my inbox.`);
    contactForm.reset();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      closeMobileMenu();
    }
  });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMobileMenu);
}

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-links a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

// Cursor Mesh Effect
function createCursorMesh() {
  const mesh = document.createElement('div');
  mesh.id = 'cursor-mesh';
  document.body.appendChild(mesh);

  const gridSize = 50;
  const mouse = { x: 0, y: 0 };
  const lines = [];

  // Create grid lines
  for (let i = 0; i < window.innerWidth; i += gridSize) {
    const line = document.createElement('div');
    line.className = 'mesh-line vertical';
    line.style.left = i + 'px';
    line.style.transform = 'translateX(0)';
    mesh.appendChild(line);
    lines.push({ element: line, type: 'vertical', pos: i });
  }

  for (let i = 0; i < window.innerHeight; i += gridSize) {
    const line = document.createElement('div');
    line.className = 'mesh-line horizontal';
    line.style.top = i + 'px';
    line.style.transform = 'translateY(0)';
    mesh.appendChild(line);
    lines.push({ element: line, type: 'horizontal', pos: i });
  }

  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Update grid lines based on mouse position
    lines.forEach(line => {
      if (line.type === 'vertical') {
        const distance = Math.abs(line.pos - mouse.x);
        const offset = (distance / gridSize) * 5;
        line.element.style.transform = `translateX(${offset}px)`;
        line.element.style.opacity = Math.max(0.1, 0.3 - distance / 500);
      } else {
        const distance = Math.abs(line.pos - mouse.y);
        const offset = (distance / gridSize) * 5;
        line.element.style.transform = `translateY(${offset}px)`;
        line.element.style.opacity = Math.max(0.1, 0.3 - distance / 500);
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    mesh.innerHTML = '';
    lines.length = 0;
    
    for (let i = 0; i < window.innerWidth; i += gridSize) {
      const line = document.createElement('div');
      line.className = 'mesh-line vertical';
      line.style.left = i + 'px';
      line.style.transform = 'translateX(0)';
      mesh.appendChild(line);
      lines.push({ element: line, type: 'vertical', pos: i });
    }

    for (let i = 0; i < window.innerHeight; i += gridSize) {
      const line = document.createElement('div');
      line.className = 'mesh-line horizontal';
      line.style.top = i + 'px';
      line.style.transform = 'translateY(0)';
      mesh.appendChild(line);
      lines.push({ element: line, type: 'horizontal', pos: i });
    }
  });
}

// Initialize cursor mesh
createCursorMesh();

