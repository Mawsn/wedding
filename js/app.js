// Main Application Entry Point
// Initializes all modules and PWA functionality

import { initNavigation } from './modules/navigation.js';
import { initRSVP } from './modules/rsvp.js';

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  // Initialize navigation
  initNavigation();

  // Initialize RSVP form (only on RSVP page)
  initRSVP();

  // Register service worker for PWA
  registerServiceWorker();

  // Add smooth scroll behavior
  initSmoothScroll();
}

// Service Worker Registration
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered successfully:', registration.scope);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('Service Worker update found');

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            showUpdateNotification();
          }
        });
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
}

// Show update notification
function showUpdateNotification() {
  // Simple notification - can be enhanced with a modal or toast
  if (confirm('A new version is available! Reload to update?')) {
    window.location.reload();
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;

      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button (if you add one in the future)
  showInstallButton();
});

function showInstallButton() {
  // Optional: Show a custom install button
  // For now, just log that the app is installable
  console.log('App is installable');
}

// Track if app was installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
});

// Handle online/offline status
window.addEventListener('online', () => {
  console.log('Back online');
  // Optional: Show notification that connection is restored
});

window.addEventListener('offline', () => {
  console.log('Connection lost');
  // Optional: Show notification about offline mode
});

// Export for debugging
window.weddingApp = {
  initNavigation,
  initRSVP,
  registerServiceWorker
};
