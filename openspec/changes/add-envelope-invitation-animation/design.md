# Design: Envelope Invitation Animation

## Context
This feature adds a delightful first-time visitor experience to the wedding website by displaying an animated envelope opening sequence before the main content. The animation must be performant on mobile devices, respect accessibility preferences, and be easily disabled via configuration.

**Key Constraints:**
- Must perform smoothly on older smartphones (4-5 years old)
- Should respect user's motion sensitivity preferences
- Must not permanently block access to content
- Should only show once per visitor (unless localStorage is cleared)
- Must be simple to toggle on/off via code configuration

**Stakeholders:**
- Website visitors (primary users experiencing the animation)
- Site owners (Sally and Elisha - desire memorable first impression)
- Developer (needs maintainable, performant code)

## Goals / Non-Goals

**Goals:**
- Create a memorable, delightful first-time visitor experience
- Smooth, fluid animations that work on older mobile devices
- Clear user interaction cues (wax seal with "Tap to open")
- Respect accessibility preferences (reduced-motion)
- Simple configuration toggle for enabling/disabling
- Non-intrusive (can be skipped or auto-completes)

**Non-Goals:**
- Complex 3D graphics or WebGL effects
- Sound effects or background music
- Multi-page animation sequences
- Customization UI for users to control animation preferences
- Analytics tracking of animation completion rates
- Server-side storage of visitor status

## Decisions

### Decision 1: Use CSS Animations + JavaScript State Management
**What:** Implement animation sequences using CSS `@keyframes` with JavaScript controlling timing and state transitions.

**Why:** 
- CSS animations leverage GPU acceleration for better performance on mobile
- Separates presentation (CSS) from behavior (JS) for maintainability
- Easier to optimize and debug than complex JavaScript animation libraries
- Smaller payload (no animation library dependencies)

**Alternatives Considered:**
- **JavaScript animation libraries** (GSAP, Anime.js): More powerful but adds significant payload (~50-100KB) and may be overkill for this single-use animation
- **CSS-only with checkbox hack**: Would eliminate JS dependency but makes skip functionality and state management more complex
- **SVG/Lottie animations**: Better for complex illustrations but requires design tools and may have performance issues on older devices

### Decision 2: localStorage for First-Visit Detection
**What:** Use `localStorage.getItem('hasSeenInvitation')` to track if visitor has seen animation.

**Why:**
- Simple, widely supported API (98%+ browser support)
- Persists across sessions without server infrastructure
- Easy to clear for testing (just clear localStorage)
- Acceptable failure mode (if localStorage unavailable, animation just plays every time)

**Alternatives Considered:**
- **sessionStorage**: Would show animation every new session, which may be annoying
- **Cookies**: More complex API, same capabilities as localStorage for this use case
- **IndexedDB**: Overkill for storing a single boolean flag
- **No persistence**: Animation plays every visit, could frustrate returning visitors

### Decision 3: Three-Stage Animation Sequence
**What:** Break animation into stages: (1) Spotlight entrance, (2) Flip to back, (3) User tap to open + slide out.

**Why:**
- Stage 1-2 happen automatically, building anticipation
- Stage 3 requires user interaction, giving them control and engagement
- Breaking into stages allows for easier timing tuning and debugging
- Provides natural progression that tells a story

**Sequencing:**
1. **Stage 1 - Spotlight (0-1.5s)**: Envelope fades in with scale, spotlight effect on cream envelope
2. **Stage 2 - Flip (1.5-3s)**: Envelope flips 180° to reveal back with wax seal
3. **Stage 3 - Awaiting Interaction**: Wax seal pulses gently with "Tap to open" text
4. **Stage 4 - Opening (tap triggered)**: Envelope top flap opens upward
5. **Stage 5 - Slide Out (after open)**: Invitation card slides out and scales up
6. **Stage 6 - Cleanup**: Fade out overlay, show main content, remove animation DOM

### Decision 4: Performance Optimization Strategy
**What:** Use GPU-accelerated CSS properties exclusively, apply `will-change` during animation only, and lazy-load invitation image.

**Why:**
- `transform` and `opacity` are GPU-accelerated on all modern browsers
- Avoiding `left`, `top`, `width`, `height` prevents layout reflows
- `will-change` tells browser to optimize but should be removed after to save memory
- Lazy loading invitation image prevents loading it until it's needed

**Optimizations:**
- All animations use `transform: translateX/Y/Z/scale/rotateY` and `opacity`
- Add `will-change: transform, opacity` only during active animation
- Remove `will-change` in animation completion handler
- Use `content-visibility: auto` on hidden invitation card
- Compress `invite.JPG` to <500KB with modern formats (WebP fallback)
- Use CSS containment (`contain: layout style paint`) on animation overlay

### Decision 5: Configuration Toggle Pattern
**What:** Add a simple configuration object at the top of the animation module:
```javascript
const ANIMATION_CONFIG = {
  enabled: true, // Set to false to disable animation entirely
  autoPlayDuration: 15000, // Auto-complete after 15s if no interaction
  respectReducedMotion: true
};
```

**Why:**
- Single source of truth for animation settings
- Easy to find and modify (top of file)
- No need for complex configuration infrastructure
- Can be easily extended in future (durations, easing, etc.)

**Alternative:**
- Environment variables or external config file: Overkill for static site

### Decision 6: Skip Button and Auto-Dismiss
**What:** Provide visible skip button in corner + auto-dismiss after 15 seconds of inactivity.

**Why:**
- Users should never feel trapped by an animation
- Skip button gives immediate control
- Auto-dismiss prevents animation from blocking content indefinitely if user doesn't interact
- 15 seconds is long enough to appreciate but not annoyingly long

**Placement:** Top-right corner, always visible, clear contrast, large tap target (44x44px minimum)

### Decision 7: Accessibility Approach
**What:** Respect `prefers-reduced-motion`, provide keyboard controls, ensure screen reader compatibility.

**Implementation:**
- Detect `@media (prefers-reduced-motion: reduce)` and skip animation entirely
- Skip button focusable and activatable via keyboard (Tab + Enter)
- Enter/Space on wax seal triggers opening
- Escape key skips animation
- ARIA live region announces animation stages for screen readers
- Semantic HTML with proper roles

**Why:**
- WCAG 2.1 Level A requires respecting motion preferences
- Keyboard navigation is essential for accessibility
- Screen reader users should understand what's happening

## Risks / Trade-offs

### Risk 1: Older Device Performance
**Risk:** Animation may stutter or lag on very old smartphones (5+ years).

**Mitigation:**
- Use only GPU-accelerated properties
- Keep animation duration short (<5 seconds total)
- Test on iPhone 8 and Samsung Galaxy S8 as baseline
- Provide configuration toggle to disable if issues arise
- Auto-skip on devices with < 2GB RAM (if detectable)

**Trade-off:** Accept that very old devices (pre-2018) may have degraded experience

### Risk 2: User Frustration
**Risk:** Users may find animation annoying or blocking, especially on repeat visits.

**Mitigation:**
- Only show once (localStorage tracking)
- Prominent skip button
- Auto-dismiss after 15 seconds
- Fast-forward option (double-tap/click to skip wait time)

**Trade-off:** Some users may miss animation if they quickly skip

### Risk 3: Image Load Time
**Risk:** Large `invite.JPG` may delay animation or cause visible loading.

**Mitigation:**
- Compress image to <500KB
- Preload image before starting animation
- Show loading indicator if image takes >2s
- Fallback to text-only version if image fails to load

**Trade-off:** May need to reduce image quality for performance

### Risk 4: localStorage Unavailable
**Risk:** Private browsing or browser settings may block localStorage.

**Mitigation:**
- Wrap localStorage access in try-catch
- Fallback to showing animation every time if storage unavailable
- Document this behavior in code comments

**Trade-off:** Users in private browsing see animation every visit

## Migration Plan

**Phase 1: Development (Days 1-2)**
- Implement core animation CSS and HTML structure
- Create animation module with state machine
- Test on desktop browsers

**Phase 2: Mobile Testing (Day 3)**
- Test on various mobile devices
- Optimize performance issues
- Fine-tune timing and easing

**Phase 3: Accessibility (Day 4)**
- Implement keyboard controls
- Test with screen readers
- Verify reduced-motion handling

**Phase 4: Integration (Day 5)**
- Integrate with existing `index.html`
- Add configuration toggle
- Test first-visit detection

**Phase 5: Polish (Day 6)**
- Fine-tune animations
- Cross-browser testing
- Performance verification

**Rollback Plan:**
- Configuration toggle allows instant disable: `ANIMATION_CONFIG.enabled = false`
- No database changes or migrations needed
- Remove 4 files to fully rollback: animation module, CSS file, HTML changes, initialization code

**Deployment Strategy:**
- Deploy to staging branch first
- Test on multiple devices
- Get stakeholder approval
- Deploy to production
- Monitor for console errors in analytics (if available)

## Open Questions

1. **Should we add a "Don't show again" checkbox?**
   - Pro: Gives users explicit control
   - Con: Adds UI complexity, most users only visit once anyway
   - **Decision:** No - localStorage tracking is sufficient, users can clear cache if needed

2. **Should animation play on mobile vs desktop differently?**
   - Current plan: Same animation on all devices
   - Alternative: Simplified version on mobile
   - **Decision:** Same animation, but test thoroughly on mobile for performance

3. **What happens if user navigates away mid-animation?**
   - Should we mark as "seen" immediately on start or only on completion?
   - **Decision:** Mark as seen when animation starts (not completion) to avoid annoyance

4. **Should we support landscape orientation on mobile?**
   - Envelope might look awkward in landscape
   - **Decision:** Yes, use media queries to adjust envelope size/positioning for landscape

5. **Exact envelope flip direction?**
   - Flip vertically (like opening letter) vs horizontally (like book page)?
   - **Decision:** Flip horizontally (rotateY) - more natural for revealing back of envelope
