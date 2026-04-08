/* JLM Pest Control - Main JavaScript */

// ===== Mobile Menu =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

// ===== Quote Modal =====
const quoteModal = document.getElementById('quoteModal');
const quoteForm = document.getElementById('quoteForm');
const quoteSuccess = document.getElementById('quoteSuccess');

function openQuoteModal() {
  if (quoteModal) {
    quoteModal.removeAttribute('hidden');
    // Force reflow so the transition plays
    void quoteModal.offsetHeight;
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuoteModal() {
  if (quoteModal) {
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      quoteModal.setAttribute('hidden', '');
      if (quoteForm) quoteForm.classList.remove('hidden');
      if (quoteSuccess) quoteSuccess.classList.add('hidden');
      if (quoteForm) quoteForm.reset();
    }, 300);
  }
}

// Close modal on backdrop click
if (quoteModal) {
  quoteModal.addEventListener('click', function(e) {
    if (e.target === quoteModal) closeQuoteModal();
  });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeQuoteModal();
    closeMobileMenu();
  }
});

// Handle quote form submission
function handleQuoteSubmit(e) {
  e.preventDefault();
  // In production, this would send data to a backend/email service
  // For now, show success message
  if (quoteForm) quoteForm.classList.add('hidden');
  if (quoteSuccess) quoteSuccess.classList.remove('hidden');
}

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScrollY = 0;

function handleScroll() {
  const scrollY = window.scrollY;
  if (header) {
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  lastScrollY = scrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ===== Scroll Animations =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== FAQ Accordion =====
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // Close all
        faqItems.forEach((i) => {
          i.classList.remove('active');
          const a = i.querySelector('.faq-answer');
          if (a) a.classList.remove('open');
        });
        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('active');
          answer.classList.add('open');
        }
      });
    }
  });
}

// ===== Exit Intent Popup =====
let exitPopupShown = false;
function initExitIntent() {
  const exitPopup = document.getElementById('exitPopup');
  if (!exitPopup) return;

  document.addEventListener('mouseout', function(e) {
    if (exitPopupShown) return;
    if (e.clientY <= 0 && !e.relatedTarget) {
      exitPopup.classList.add('active');
      exitPopupShown = true;
    }
  });
}

function closeExitPopup() {
  const exitPopup = document.getElementById('exitPopup');
  if (exitPopup) exitPopup.classList.remove('active');
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initFaqAccordion();
  initExitIntent();
  handleScroll();
});

// Make functions globally accessible
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.handleQuoteSubmit = handleQuoteSubmit;
window.closeMobileMenu = closeMobileMenu;
window.closeExitPopup = closeExitPopup;
