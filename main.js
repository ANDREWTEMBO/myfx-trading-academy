/* ============================================
   myFX Trading Academy — Global JS
   ============================================ */

// ---- Sticky Nav ----
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ---- Mobile Menu ----
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });
}

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ---- Active Nav Link ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ---- Staggered reveal delays ----
document.querySelectorAll('[data-stagger]').forEach(parent => {
  const children = parent.querySelectorAll('.reveal');
  children.forEach((child, i) => {
    child.dataset.delay = i * 120;
  });
});

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = el.dataset.decimal === 'true';
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ---- Contact Form ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const message = this.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate send (replace with real backend/formspree)
    setTimeout(() => {
      showFormMessage(`Thank you, ${name}! Your message has been sent. Andrew will respond within 24 hours.`, 'success');
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1200);
  });
}

function showFormMessage(msg, type) {
  let el = document.getElementById('form-message');
  if (!el) {
    el = document.createElement('div');
    el.id = 'form-message';
    contactForm.appendChild(el);
  }
  el.textContent = msg;
  el.style.cssText = `
    margin-top: 1rem;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 500;
    background: ${type === 'success' ? 'rgba(201,168,76,0.12)' : 'rgba(200,60,60,0.12)'};
    border: 1px solid ${type === 'success' ? 'rgba(201,168,76,0.4)' : 'rgba(200,60,60,0.4)'};
    color: ${type === 'success' ? '#C9A84C' : '#e07070'};
  `;
}
