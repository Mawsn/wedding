# Design: Update Wax Seal to Custom Image

## Context
The envelope animation currently uses a CSS radial gradient to create a generic red wax seal. We have a custom `wax_seal.png` image (254KB) that provides a more authentic and personalized appearance. This change will swap the gradient for the image while maintaining all existing functionality and adding optional interaction hints.

**Key Constraints:**
- Must maintain existing click/tap interaction behavior
- Should not degrade animation performance (especially on mobile)
- Must work responsively across all screen sizes
- Should preserve accessibility features (keyboard nav, screen reader support)
- Hints should be configurable and non-intrusive

**Stakeholders:**
- Website visitors (benefit from clearer interaction cues and more authentic design)
- Site owners (Sally and Elisha - personalized touch with custom seal)
- Developer (needs maintainable configuration)

## Goals / Non-Goals

**Goals:**
- Replace gradient wax seal with custom image while maintaining functionality
- Add configurable interaction hints to improve discoverability
- Optimize image loading for performance
- Maintain responsive design across all devices
- Preserve accessibility features

**Non-Goals:**
- Animated seal opening sequence (beyond existing pulse)
- Multiple seal design options or customization UI
- Seal engraving text or custom monograms
- 3D seal rendering or complex visual effects
- Sound effects on seal interaction

## Decisions

### Decision 1: Use CSS Background Image
**What:** Implement the wax seal image using `background-image` CSS property on the existing `.wax-seal` element.

**Why:**
- Maintains existing HTML structure (minimal changes)
- CSS background properties provide built-in responsive scaling
- Easy to add fallback with multiple background images
- Doesn't interfere with existing pseudo-elements for effects
- Simpler than using `<img>` tag which would require restructuring

**Alternatives Considered:**
- **`<img>` tag**: Would require restructuring HTML and managing image as separate DOM element; more complex for layering effects
- **SVG inline**: Would require converting PNG to SVG; file may not be suitable for vector conversion
- **Canvas rendering**: Overkill for static image display; adds complexity

**Implementation:**
```css
.wax-seal {
  background-image: url('../../images/wax_seal.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Remove or adjust gradient backgrounds */
}
```

### Decision 2: Hint Design - Subtle Pulsing Glow
**What:** Implement hints as a subtle pulsing glow/shadow effect around the wax seal, optionally with a small text label below.

**Why:**
- Glow effect draws attention without being overly distracting
- Consistent with existing pulse animation pattern
- Can be implemented purely in CSS (no additional DOM elements needed)
- Easy to animate and remove after interaction
- Works well with image-based seal

**Alternatives Considered:**
- **Bouncing arrow**: More explicit but potentially too cartoon-like for wedding theme
- **Shimmer effect**: Could be distracting and harder to implement smoothly
- **Tooltip popup**: Too intrusive; users might think it's an error
- **Text label only**: Less eye-catching; might be missed

**Implementation:**
```css
.wax-seal.hint {
  animation: hintGlow 2s ease-in-out infinite;
}

@keyframes hintGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
  }
}
```

Optional text hint positioned below seal using `::after` pseudo-element or separate span.

### Decision 3: Configuration Flag Pattern
**What:** Add `enableHints: true` to `ANIMATION_CONFIG` object in the animation module.

**Why:**
- Consistent with existing configuration pattern (`enabled`, `respectReducedMotion`)
- Single location for all animation settings
- Easy for developers to find and modify
- No need for complex configuration infrastructure

**Implementation:**
```javascript
const ANIMATION_CONFIG = {
  enabled: true,
  autoPlayDuration: 15000,
  respectReducedMotion: true,
  enableHints: true, // NEW: Show interaction hints on wax seal
  storageKey: 'hasSeenInvitation',
};
```

### Decision 4: Image Optimization Strategy
**What:** Compress `wax_seal.png` to <100KB if possible, consider WebP format with PNG fallback.

**Why:**
- 254KB is relatively large for a seal image (100x100px display size)
- WebP provides 25-35% better compression than PNG
- Faster loading improves animation start time
- Progressive enhancement approach ensures compatibility

**Optimization Plan:**
1. Use image optimization tool (e.g., TinyPNG, ImageOptim) to compress PNG
2. Create WebP version using `cwebp` or online converter
3. Use CSS multiple background fallback:

```css
.wax-seal {
  background-image: url('../../images/wax_seal.webp'), 
                    url('../../images/wax_seal.png');
  /* Browser loads first supported format */
}
```

**Target:** <100KB for PNG, <70KB for WebP

### Decision 5: Preloading Strategy
**What:** Preload wax seal image along with invitation image during Stage 1 (spotlight).

**Why:**
- Seal appears in Stage 2 (flip), giving ~1.5s for image to load
- Prevents visible loading delay or flicker
- Consistent with existing invitation image preloading pattern
- Provides better user experience

**Implementation:**
Update `preloadInvitationImage()` function:
```javascript
function preloadInvitationImage() {
  // Preload invitation
  const inviteImg = new Image();
  inviteImg.src = 'images/invite.JPG';
  
  // Preload wax seal
  const sealImg = new Image();
  sealImg.src = 'images/wax_seal.png';
  // Images will be cached when they load
}
```

### Decision 6: Fallback Strategy for Image Load Failure
**What:** Keep existing gradient as CSS fallback; log warning if image fails to load.

**Why:**
- Graceful degradation ensures animation never breaks
- Gradient background renders immediately even if image hasn't loaded
- User still sees functional animation even with poor network
- Simple to implement (just don't remove existing background property)

**Implementation:**
```css
.wax-seal {
  /* Fallback gradient (loads immediately) */
  background: radial-gradient(circle, #8b0000 0%, #660000 100%);
  /* Image overlay (loads async) */
  background-image: url('../../images/wax_seal.png');
  background-size: cover;
  background-position: center;
}
```

If PNG fails, gradient shows. If both PNG and WebP fail, gradient still shows.

### Decision 7: Hint Removal Trigger
**What:** Remove hints immediately when user interacts with seal (click/tap/keyboard), not after animation completes.

**Why:**
- Provides immediate feedback that interaction was recognized
- Prevents hints from showing during opening animation (would be distracting)
- Cleaner user experience

**Implementation:**
In `handleWaxSealClick()` and related handlers:
```javascript
function handleWaxSealClick(e) {
  if (currentState === STATES.SEALED) {
    e.preventDefault();
    removeHints(); // NEW: Remove hints immediately
    transitionToState(STATES.OPENING);
  }
}

function removeHints() {
  const { waxSeal } = animationElements;
  waxSeal.classList.remove('hint');
}
```

## Risks / Trade-offs

### Risk 1: Image Loading Delay
**Risk:** 254KB image may not load in time for Stage 2 (flip animation), causing seal to appear blank or show gradient briefly.

**Mitigation:**
- Preload image during Stage 1 (1.5s window)
- Use gradient as fallback so seal never looks broken
- Compress image to <100KB for faster loading
- Consider showing loading indicator if image takes >2s (unlikely)

**Trade-off:** Slightly increased initial page load if preloading happens too early

### Risk 2: Image Quality vs. File Size
**Risk:** Aggressive compression may degrade image quality, making seal look pixelated or blurry.

**Mitigation:**
- Test multiple compression levels to find optimal balance
- Display size is only 100x100px, so significant compression is acceptable
- WebP format provides better quality at smaller sizes
- Review compressed image visually before deploying

**Trade-off:** May need to accept slightly larger file size to maintain quality

### Risk 3: Hints Being Too Intrusive
**Risk:** Pulsing glow or text hints may be distracting or annoying to users.

**Mitigation:**
- Keep hint animation subtle (low opacity, slow pulse)
- Make hints easily configurable with `enableHints: false`
- Remove hints immediately on interaction
- Respect `prefers-reduced-motion` for hint animations

**Trade-off:** Very subtle hints may not be noticed by users who need them

### Risk 4: Responsive Sizing Issues
**Risk:** Image may not scale properly on very small or very large screens, appearing distorted or blurry.

**Mitigation:**
- Use `background-size: cover` to fill container without distortion
- Test on range of device sizes (320px to 2560px width)
- Adjust container size constraints in media queries if needed
- Use high-resolution source image (at least 2x display size)

**Trade-off:** Larger source image increases file size

## Migration Plan

**Phase 1: Preparation (15-30 min)**
- Inspect and optimize `wax_seal.png` image
- Create WebP version if beneficial
- Update preload function

**Phase 2: CSS Updates (15-30 min)**
- Update `.wax-seal` styles to use image background
- Add hint animation styles
- Test responsive scaling

**Phase 3: JavaScript Updates (15-20 min)**
- Add `enableHints` config flag
- Implement hint logic in state transitions
- Add hint removal on interaction

**Phase 4: Testing (30-45 min)**
- Test image display across devices
- Verify hints work correctly
- Test with `enableHints: false`
- Check image loading and fallback
- Verify accessibility features

**Phase 5: Polish (15-20 min)**
- Fine-tune hint animation timing
- Adjust image sizing if needed
- Document configuration

**Total Estimated Time:** 1.5-2.5 hours

**Rollback Plan:**
- Configuration toggle allows instant disable: `enableHints = false`
- Remove `background-image` CSS to revert to gradient
- No database changes or migrations needed
- Can revert by removing 3-4 lines of CSS and 5-10 lines of JS

**Deployment Strategy:**
- Test locally first
- Deploy to staging branch
- Verify image loads correctly from server
- Get stakeholder approval on appearance
- Deploy to production

## Open Questions

1. **Should hints be shown on every visit or only first visit?**
   - Proposal: Show hints every time seal appears (even returning visitors) since they're subtle and helpful
   - Alternative: Only show on first visit (track in localStorage)
   - **Decision:** Show every time - hints are subtle enough and improve discoverability

2. **Should "Tap to Open" text remain visible with image?**
   - Current: Text is overlaid on gradient seal
   - Option A: Keep text overlaid on image
   - Option B: Remove text, rely on hints
   - Option C: Move text below seal
   - **Decision:** Keep text overlaid on image for accessibility and clarity

3. **What if wax_seal.png has transparency?**
   - If PNG has transparent background, gradient will show through
   - May create interesting layered effect or may look wrong
   - **Decision:** Test image; adjust gradient or remove it based on appearance

4. **Should we add a "hand cursor" or "pointer" icon hint?**
   - Could add cursor icon near seal as additional hint
   - Pro: Very clear affordance
   - Con: May be too explicit/childish for wedding theme
   - **Decision:** Start with glow effect only; can add icon later if needed

5. **Performance target for image load time?**
   - How long is acceptable before showing fallback?
   - **Decision:** Image should load within 1.5s (Stage 1 duration); gradient fallback ensures no blocking
