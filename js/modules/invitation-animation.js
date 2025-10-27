// Invitation Animation Module
// Displays an animated envelope opening sequence for first-time visitors

// ============================================================================
// Configuration
// ============================================================================

const ANIMATION_CONFIG = {
  enabled: true, // Set to false to disable animation entirely
  autoPlayDuration: 15000000, // Auto-complete after 15s if no interaction (milliseconds)
  respectReducedMotion: true, // Respect user's prefers-reduced-motion setting
  enableHints: true, // Show visual hints (pulsing glow) to guide users to tap the wax seal
  storageKey: 'hasSeenInvitation', // localStorage key for tracking visits
};

// Animation timing constants (milliseconds)
const TIMING = {
  spotlightDuration: 1500, // Stage 1: Envelope entrance
  flipDelay: 1500, // Delay before flip starts
  flipDuration: 1500, // Stage 2: Flip animation
  openingDuration: 1000, // Stage 4: Envelope opening
  slideOutDuration: 1500, // Stage 5: Invitation slide out
  displayDuration: 2000, // How long to display invitation before fade
  fadeOutDuration: 500, // Final overlay fade out
};

// Animation states
const STATES = {
  INIT: 'init',
  SPOTLIGHT: 'spotlight',
  FLIP: 'flip',
  SEALED: 'sealed',
  OPENING: 'opening',
  SLIDEOUT: 'slideout',
  COMPLETE: 'complete',
};

// ============================================================================
// State Management
// ============================================================================

let currentState = STATES.INIT;
let autoPlayTimeout = null;
let animationElements = null;

// ============================================================================
// Initialization
// ============================================================================

export function initInvitationAnimation() {
  // Check if animation is enabled
  if (!ANIMATION_CONFIG.enabled) {
    console.log('Invitation animation is disabled via configuration');
    return;
  }

  // Check if user prefers reduced motion
  if (ANIMATION_CONFIG.respectReducedMotion && prefersReducedMotion()) {
    console.log('Skipping animation: user prefers reduced motion');
    markAsSeenAndSkip();
    return;
  }

  // Check if visitor has already seen the animation
  if (hasSeenAnimation()) {
    console.log('Animation already seen, skipping');
    return;
  }

  // Only run on index.html
  if (!isIndexPage()) {
    return;
  }

  // Mark as seen immediately (at start of animation)
  markAsSeen();

  // Preload the invitation image
  preloadInvitationImage();

  // Start the animation
  startAnimation();
}

// ============================================================================
// Visitor Tracking (localStorage)
// ============================================================================

function hasSeenAnimation() {
  try {
    return localStorage.getItem(ANIMATION_CONFIG.storageKey) === 'true';
  } catch (e) {
    console.warn('localStorage unavailable, animation will play every visit:', e);
    return false; // Default to showing animation if localStorage unavailable
  }
}

function markAsSeen() {
  try {
    localStorage.setItem(ANIMATION_CONFIG.storageKey, 'true');
  } catch (e) {
    console.warn('Unable to mark animation as seen in localStorage:', e);
  }
}

function markAsSeenAndSkip() {
  markAsSeen();
  // Don't need to do anything else since animation won't be created
}

// ============================================================================
// Utility Functions
// ============================================================================

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isIndexPage() {
  const path = window.location.pathname;
  return path === '/' || path === '/index.html' || path.endsWith('/wedding/') || path.endsWith('/wedding/index.html');
}

function preloadInvitationImage() {
  const img = new Image();
  img.src = 'images/invite.JPG';
  
  // Preload wax seal image
  const sealImg = new Image();
  sealImg.src = 'images/wax_seal.png';
  sealImg.onerror = () => {
    console.warn('Failed to load wax_seal.png - gradient fallback will be used');
  };
  
  // Images will be cached when they load
}

// ============================================================================
// Animation Lifecycle
// ============================================================================

function startAnimation() {
  // Get reference to animation elements
  animationElements = getAnimationElements();

  if (!animationElements) {
    console.error('Animation elements not found in DOM');
    return;
  }

  // Make overlay visible
  animationElements.overlay.style.display = 'flex';
  
  // Announce to screen readers
  announceToScreenReader('Wedding invitation animation playing. Press Escape to skip.');

  // Set up event listeners
  attachEventListeners();

  // Start Stage 1: Spotlight entrance
  setTimeout(() => {
    transitionToState(STATES.SPOTLIGHT);
    
    // After spotlight, start flip
    setTimeout(() => {
      transitionToState(STATES.FLIP);
      
      // After flip, show sealed state and wait for interaction
      setTimeout(() => {
        transitionToState(STATES.SEALED);
        startAutoPlayTimer();
      }, TIMING.flipDuration);
      
    }, TIMING.flipDelay);
  }, 50); // Small delay to ensure CSS is ready
}

function transitionToState(newState) {
  if (currentState === STATES.COMPLETE) {
    return; // Don't transition if already complete
  }

  const prevState = currentState;
  currentState = newState;

  const { overlay, envelope, envelopeFront, envelopeBack, waxSeal, invitation } = animationElements;

  // Apply will-change for performance
  switch (newState) {
    case STATES.SPOTLIGHT:
      envelope.style.willChange = 'transform, opacity';
      overlay.classList.add('spotlight');
      envelope.classList.add('spotlight');
      break;

    case STATES.FLIP:
      envelope.style.willChange = 'transform';
      envelope.classList.add('flip');
      envelopeFront.style.willChange = 'transform';
      envelopeBack.style.willChange = 'transform';
      break;

    case STATES.SEALED:
      // Remove will-change from previous animations
      envelope.style.willChange = '';
      envelopeFront.style.willChange = '';
      envelopeBack.style.willChange = '';
      
      // Activate wax seal
      waxSeal.style.willChange = 'transform';
      waxSeal.classList.add('pulse');
      
      // Add hints if enabled and motion is allowed
      if (ANIMATION_CONFIG.enableHints && !prefersReducedMotion()) {
        waxSeal.classList.add('hint');
      }
      
      announceToScreenReader('Tap the wax seal to open the invitation');
      break;

    case STATES.OPENING:
      clearAutoPlayTimer();
      waxSeal.style.willChange = '';
      waxSeal.classList.remove('pulse');
      waxSeal.classList.remove('hint'); // Remove hints on interaction
      
      envelope.style.willChange = 'transform';
      envelope.classList.add('opening');
      
      // After opening, slide out invitation
      setTimeout(() => {
        transitionToState(STATES.SLIDEOUT);
      }, TIMING.openingDuration);
      break;

    case STATES.SLIDEOUT:
      envelope.style.willChange = '';
      invitation.style.willChange = 'transform, opacity';
      invitation.classList.add('visible');
      announceToScreenReader('Invitation revealed');
      
      // After display, complete animation
      setTimeout(() => {
        transitionToState(STATES.COMPLETE);
      }, TIMING.slideOutDuration + TIMING.displayDuration);
      break;

    case STATES.COMPLETE:
      completeAnimation();
      break;
  }
}

function startAutoPlayTimer() {
  autoPlayTimeout = setTimeout(() => {
    if (currentState === STATES.SEALED) {
      // Auto-trigger opening if user hasn't interacted
      transitionToState(STATES.OPENING);
    }
  }, ANIMATION_CONFIG.autoPlayDuration);
}

function clearAutoPlayTimer() {
  if (autoPlayTimeout) {
    clearTimeout(autoPlayTimeout);
    autoPlayTimeout = null;
  }
}

function completeAnimation() {
  const { overlay } = animationElements;
  
  // Fade out overlay
  overlay.classList.add('fade-out');
  
  // Clean up after fade completes
  setTimeout(() => {
    cleanup();
  }, TIMING.fadeOutDuration);
}

function skipAnimation() {
  // Immediately skip to complete
  clearAutoPlayTimer();
  currentState = STATES.COMPLETE;
  
  const { overlay } = animationElements;
  overlay.classList.add('fade-out');
  
  setTimeout(() => {
    cleanup();
  }, TIMING.fadeOutDuration);
}

function cleanup() {
  if (!animationElements) return;

  const { overlay } = animationElements;
  
  // Remove will-change properties
  const allElements = overlay.querySelectorAll('[style*="will-change"]');
  allElements.forEach(el => {
    el.style.willChange = '';
  });

  // Remove event listeners
  detachEventListeners();

  // Remove overlay from DOM
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }

  // Clear reference
  animationElements = null;
  currentState = STATES.COMPLETE;
}

// ============================================================================
// Event Handlers
// ============================================================================

function attachEventListeners() {
  if (!animationElements) return;

  const { skipButton, waxSeal } = animationElements;

  // Skip button
  skipButton.addEventListener('click', handleSkip);
  
  // Wax seal interaction
  waxSeal.addEventListener('click', handleWaxSealClick);
  waxSeal.addEventListener('touchend', handleWaxSealTouch);
  
  // Keyboard controls
  document.addEventListener('keydown', handleKeydown);
}

function detachEventListeners() {
  if (!animationElements) return;

  const { skipButton, waxSeal } = animationElements;

  skipButton.removeEventListener('click', handleSkip);
  waxSeal.removeEventListener('click', handleWaxSealClick);
  waxSeal.removeEventListener('touchend', handleWaxSealTouch);
  document.removeEventListener('keydown', handleKeydown);
}

function handleSkip(e) {
  e.preventDefault();
  skipAnimation();
}

function handleWaxSealClick(e) {
  if (currentState === STATES.SEALED) {
    e.preventDefault();
    transitionToState(STATES.OPENING);
  }
}

function handleWaxSealTouch(e) {
  if (currentState === STATES.SEALED) {
    e.preventDefault();
    transitionToState(STATES.OPENING);
  }
}

function handleKeydown(e) {
  // Escape key - skip animation
  if (e.key === 'Escape') {
    e.preventDefault();
    skipAnimation();
    return;
  }

  // Enter or Space on wax seal
  if ((e.key === 'Enter' || e.key === ' ') && currentState === STATES.SEALED) {
    const { waxSeal } = animationElements;
    if (document.activeElement === waxSeal) {
      e.preventDefault();
      transitionToState(STATES.OPENING);
    }
  }
}

// ============================================================================
// DOM Helper Functions
// ============================================================================

function getAnimationElements() {
  const overlay = document.getElementById('invitation-animation-overlay');
  
  if (!overlay) {
    console.error('Animation overlay not found');
    return null;
  }

  return {
    overlay,
    envelope: overlay.querySelector('.envelope'),
    envelopeFront: overlay.querySelector('.envelope-front'),
    envelopeBack: overlay.querySelector('.envelope-back'),
    waxSeal: overlay.querySelector('.wax-seal'),
    invitation: overlay.querySelector('.invitation-card'),
    skipButton: overlay.querySelector('.skip-button'),
    ariaLive: overlay.querySelector('.sr-only[aria-live]'),
  };
}

function announceToScreenReader(message) {
  if (!animationElements || !animationElements.ariaLive) return;
  animationElements.ariaLive.textContent = message;
}

// ============================================================================
// Developer Tools (exposed for debugging)
// ============================================================================

export function resetInvitationAnimation() {
  try {
    localStorage.removeItem(ANIMATION_CONFIG.storageKey);
    console.log('Animation reset - will play on next page load');
  } catch (e) {
    console.error('Unable to reset animation:', e);
  }
}

// ============================================================================
// Export for app.js
// ============================================================================

export default {
  init: initInvitationAnimation,
  reset: resetInvitationAnimation,
  config: ANIMATION_CONFIG,
};
