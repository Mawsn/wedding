# Implementation Tasks

## 1. Image Preparation and Optimization
- [x] 1.1 Verify `wax_seal.png` exists and inspect its dimensions/quality
- [x] 1.2 Optimize image file size if necessary (compress PNG or convert to WebP with PNG fallback)
- [x] 1.3 Determine optimal dimensions for responsive display (100px-150px max width)

## 2. Configuration Update
- [x] 2.1 Add `enableHints` boolean flag to `ANIMATION_CONFIG` in `js/modules/invitation-animation.js`
- [x] 2.2 Add inline documentation explaining hint behavior
- [x] 2.3 Set default value for `enableHints` (recommend `true` for better UX)

## 3. CSS Updates - Wax Seal Image
- [x] 3.1 Replace radial gradient background with `background-image: url('../../images/wax_seal.png')`
- [x] 3.2 Add `background-size: cover` and `background-position: center`
- [x] 3.3 Remove or simplify the `::before` pseudo-element (may conflict with image)
- [x] 3.4 Ensure image scales properly on different screen sizes
- [x] 3.5 Test that hover and focus states still work with image background

## 4. CSS Updates - Interaction Hints
- [x] 4.1 Create hint styles (e.g., `.wax-seal-hint` class for visual indicators)
- [x] 4.2 Design subtle hint animation (pulsing glow, bouncing arrow, or shimmer effect)
- [x] 4.3 Style hint text or icon overlay if using text-based hints
- [x] 4.4 Ensure hints don't obstruct the seal image
- [x] 4.5 Add responsive styles for hints on mobile devices

## 5. JavaScript Logic - Hints Management
- [x] 5.1 Check `enableHints` config flag in animation state transitions
- [x] 5.2 Conditionally add/remove hint classes or elements when seal becomes interactive (SEALED state)
- [x] 5.3 Remove hints after user first interacts with seal
- [x] 5.4 Ensure hints respect `prefers-reduced-motion` accessibility setting

## 6. HTML Updates (if needed)
- [x] 6.1 Review if HTML structure needs modification for hints (likely minimal changes)
- [x] 6.2 Add hint elements (text, icons, or containers) if using DOM-based hints
- [x] 6.3 Ensure ARIA labels remain appropriate with image-based seal

## 7. Image Preloading
- [x] 7.1 Add `wax_seal.png` to the preload logic in `preloadInvitationImage()` function
- [x] 7.2 Ensure image is fully loaded before showing envelope back (Stage 2)
- [x] 7.3 Add fallback if image fails to load (keep gradient as backup)

## 8. Performance Optimization
- [x] 8.1 Compress `wax_seal.png` if file size is >150KB (target <100KB)
- [x] 8.2 Consider creating WebP version with PNG fallback for better compression
- [x] 8.3 Test loading performance on slower connections
- [x] 8.4 Verify no layout shift occurs when image loads

## 9. Testing and Validation
- [x] 9.1 Test wax seal image displays correctly on all screen sizes
- [x] 9.2 Verify image scales properly in portrait and landscape orientations
- [x] 9.3 Test that click/tap interaction still works with image
- [x] 9.4 Verify pulse animation works with image background
- [x] 9.5 Test hints appear when `enableHints: true` and disappear when `false`
- [x] 9.6 Test hints disappear after interaction
- [x] 9.7 Verify image preloading works and doesn't cause flicker
- [x] 9.8 Test fallback behavior if image fails to load
- [x] 9.9 Verify no console errors or warnings

## 10. Accessibility and Polish
- [x] 10.1 Ensure image has appropriate alt text or ARIA labels
- [x] 10.2 Verify keyboard navigation still works
- [x] 10.3 Test hints with screen readers (shouldn't be overly intrusive)
- [x] 10.4 Fine-tune hint animation timing for optimal user guidance
- [x] 10.5 Document the `enableHints` configuration in code comments
