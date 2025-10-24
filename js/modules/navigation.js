// Navigation Module
// Handles mobile menu toggle and active state management

export function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navToggle || !navMenu) {
    console.warn('Navigation elements not found');
    return;
  }

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideNav = event.target.closest('.nav');
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    }
  });

  // Update active link based on current page
  setActiveNavLink();
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Reset mobile menu on desktop size
    if (window.innerWidth > 768) {
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      if (navMenu) navMenu.classList.remove('active');
    }
  }, 250);
});
