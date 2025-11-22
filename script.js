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

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && currentCharIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
    typeSpeed = 500; // Pause before next word
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

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple form handling (you can integrate with a backend service)
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
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

