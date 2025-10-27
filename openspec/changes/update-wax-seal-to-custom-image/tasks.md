# Implementation Tasks

## 1. Image Preparation and Optimization
- [ ] 1.1 Verify `wax_seal.png` exists and inspect its dimensions/quality
- [ ] 1.2 Optimize image file size if necessary (compress PNG or convert to WebP with PNG fallback)
- [ ] 1.3 Determine optimal dimensions for responsive display (100px-150px max width)

## 2. Configuration Update
- [ ] 2.1 Add `enableHints` boolean flag to `ANIMATION_CONFIG` in `js/modules/invitation-animation.js`
- [ ] 2.2 Add inline documentation explaining hint behavior
- [ ] 2.3 Set default value for `enableHints` (recommend `true` for better UX)

## 3. CSS Updates - Wax Seal Image
- [ ] 3.1 Replace radial gradient background with `background-image: url('../../images/wax_seal.png')`
- [ ] 3.2 Add `background-size: cover` and `background-position: center`
- [ ] 3.3 Remove or simplify the `::before` pseudo-element (may conflict with image)
- [ ] 3.4 Ensure image scales properly on different screen sizes
- [ ] 3.5 Test that hover and focus states still work with image background

## 4. CSS Updates - Interaction Hints
- [ ] 4.1 Create hint styles (e.g., `.wax-seal-hint` class for visual indicators)
- [ ] 4.2 Design subtle hint animation (pulsing glow, bouncing arrow, or shimmer effect)
- [ ] 4.3 Style hint text or icon overlay if using text-based hints
- [ ] 4.4 Ensure hints don't obstruct the seal image
- [ ] 4.5 Add responsive styles for hints on mobile devices

## 5. JavaScript Logic - Hints Management
- [ ] 5.1 Check `enableHints` config flag in animation state transitions
- [ ] 5.2 Conditionally add/remove hint classes or elements when seal becomes interactive (SEALED state)
- [ ] 5.3 Remove hints after user first interacts with seal
- [ ] 5.4 Ensure hints respect `prefers-reduced-motion` accessibility setting

## 6. HTML Updates (if needed)
- [ ] 6.1 Review if HTML structure needs modification for hints (likely minimal changes)
- [ ] 6.2 Add hint elements (text, icons, or containers) if using DOM-based hints
- [ ] 6.3 Ensure ARIA labels remain appropriate with image-based seal

## 7. Image Preloading
- [ ] 7.1 Add `wax_seal.png` to the preload logic in `preloadInvitationImage()` function
- [ ] 7.2 Ensure image is fully loaded before showing envelope back (Stage 2)
- [ ] 7.3 Add fallback if image fails to load (keep gradient as backup)

## 8. Performance Optimization
- [ ] 8.1 Compress `wax_seal.png` if file size is >150KB (target <100KB)
- [ ] 8.2 Consider creating WebP version with PNG fallback for better compression
- [ ] 8.3 Test loading performance on slower connections
- [ ] 8.4 Verify no layout shift occurs when image loads

## 9. Testing and Validation
- [ ] 9.1 Test wax seal image displays correctly on all screen sizes
- [ ] 9.2 Verify image scales properly in portrait and landscape orientations
- [ ] 9.3 Test that click/tap interaction still works with image
- [ ] 9.4 Verify pulse animation works with image background
- [ ] 9.5 Test hints appear when `enableHints: true` and disappear when `false`
- [ ] 9.6 Test hints disappear after interaction
- [ ] 9.7 Verify image preloading works and doesn't cause flicker
- [ ] 9.8 Test fallback behavior if image fails to load
- [ ] 9.9 Verify no console errors or warnings

## 10. Accessibility and Polish
- [ ] 10.1 Ensure image has appropriate alt text or ARIA labels
- [ ] 10.2 Verify keyboard navigation still works
- [ ] 10.3 Test hints with screen readers (shouldn't be overly intrusive)
- [ ] 10.4 Fine-tune hint animation timing for optimal user guidance
- [ ] 10.5 Document the `enableHints` configuration in code comments
