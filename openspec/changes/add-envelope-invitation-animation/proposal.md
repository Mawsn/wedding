# Proposal: Add Envelope Invitation Animation

## Why
The wedding website currently displays the main content immediately upon loading `index.html`. To create a more memorable and delightful first-time visitor experience, we want to add an optional entrance animation that presents the wedding invitation in a creative way—through an animated envelope opening sequence. This adds a personal touch and sets a celebratory tone before users access the main site content.

## What Changes
- Add a first-time visitor detection mechanism using browser storage
- Create a full-screen envelope animation overlay that displays on initial load
- Implement three animation stages:
  1. Spotlight cream envelope with "Sally and Elisha Wedding Invitation" text
  2. Envelope flip animation to reveal back with wax seal
  3. Envelope opening with invitation slide-out revealing the actual invitation image (`/images/invite.JPG`)
- Add user interaction (tap/click wax seal) to trigger the opening sequence
- Ensure animations are smooth, fluid, and mobile-device-friendly
- Include a configuration toggle (`animationOn = false`) to disable the feature
- Maintain accessibility and respect reduced-motion preferences
- Ensure the animation doesn't block access to content (skip button or automatic dismissal)

## Impact
- Affected specs: 
  - `intro-animation` (NEW) - Core animation behavior and sequencing
  - `user-preferences` (NEW) - First-time visitor detection and animation toggle
- Affected code:
  - `index.html` - Add animation markup structure
  - `css/main.css` - Add animation styles and keyframes
  - `css/components/` - New animation component CSS file
  - `js/app.js` - Add initialization logic
  - `js/modules/` - New animation module for animation control and state management
- Performance considerations:
  - Must work smoothly on older smartphones (optimize animations using CSS transforms and opacity)
  - Use `will-change` sparingly and clean up after animation completes
  - Ensure images are appropriately sized/compressed for mobile
- User experience:
  - Only shows on first visit (stored in localStorage)
  - Respects `prefers-reduced-motion` accessibility setting
  - Provides clear visual cues for user interaction
  - Non-blocking (can be skipped or auto-completes after timeout)
