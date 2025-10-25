# Design Document: Hero Background Image with Adaptive Blur

## Context
The hero section needs a custom background image (`cvi.PNG`, 3.7MB) that adapts to different screen sizes. The challenge is displaying the full image on mobile while handling larger desktop viewports without awkward cropping, excessive zoom, or repetition—similar to iOS wallpaper behavior.

## Goals / Non-Goals

### Goals
- Display full image on mobile devices without cropping critical content
- Implement iOS-style blur extension on larger screens to fill viewport naturally
- Maintain text readability over the image
- Optimize image loading performance
- Ensure responsive behavior across all screen sizes
- Create visually appealing transition between image and blur zones

### Non-Goals
- Supporting multiple background images or image galleries
- Implementing parallax scrolling effects (future enhancement)
- Creating dynamic background switching
- Video backgrounds

## Technical Decisions

### 1. Background Image Strategy
**Decision**: Use CSS `background-image` with adaptive sizing and blur overlay technique

**Rationale**:
- Pure CSS solution, no JavaScript required
- Better performance than canvas-based approaches
- Maintains semantic HTML structure
- Easy to optimize with service worker caching

**Implementation**:
```css
.hero {
  position: relative;
  background-image: url('../images/cvi.PNG');
  background-size: cover;
  background-position: center;
}
```

### 2. iOS-Style Blur Extension Technique
**Decision**: Use pseudo-elements with blurred, scaled background for extension

**Rationale**:
- Creates natural edge blending effect
- No visible repetition or hard edges
- Maintains original image sharpness in center
- Performance-efficient with CSS filters

**Two-Layer Approach**:
1. **Base layer**: Blurred, scaled version fills entire viewport
2. **Sharp layer**: Original image centered, covers optimal viewing area

**Implementation**:
```css
/* Blurred base layer (fills entire background) */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../images/cvi.PNG');
  background-size: cover;
  background-position: center;
  filter: blur(40px);
  transform: scale(1.1);
  z-index: 1;
}

/* Sharp overlay (shows on mobile/tablet) */
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../images/cvi.PNG');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;
}

/* Content layer on top */
.hero-content {
  position: relative;
  z-index: 3;
}
```

### 3. Responsive Behavior
**Decision**: Adjust blur intensity and sharp overlay visibility by screen size

**Rationale**:
- Mobile: Show full sharp image (no blur visible)
- Tablet: Begin transitioning to blur edges
- Desktop: Heavy blur extension, sharp center focal point
- Ultra-wide: Full blur base with subtle sharp overlay

**Breakpoint Strategy**:
```css
/* Mobile: Full sharp image */
@media (max-width: 768px) {
  .hero::after {
    background-size: cover;
  }
}

/* Desktop: Blur extension active */
@media (min-width: 1024px) {
  .hero::after {
    background-size: contain;
    opacity: 0.8;
  }
}

/* Ultra-wide: More blur prominence */
@media (min-width: 1920px) {
  .hero::before {
    filter: blur(60px);
  }
  .hero::after {
    opacity: 0.6;
  }
}
```

### 4. Text Readability Enhancement
**Decision**: Add semi-transparent dark overlay for text contrast

**Rationale**:
- Ensures white text remains readable over image
- Doesn't obscure the background image too much
- Standard web pattern for hero sections
- Adjustable opacity for different images

**Implementation**:
```css
.hero {
  position: relative;
}

.hero::before {
  /* Blur layer */
}

/* Dark overlay for text readability */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
}
```

Alternative: Use `text-shadow` instead of overlay for lighter appearance.

### 5. Image Optimization
**Decision**: Compress and convert image; implement lazy loading

**Rationale**:
- 3.7MB is too large for hero image
- Target: <500KB for good performance
- WebP format for better compression
- Progressive loading for better UX

**Optimization Steps**:
1. Compress PNG to ~80% quality
2. Create WebP version with `<picture>` fallback
3. Generate responsive image variants (mobile, tablet, desktop)
4. Implement lazy loading (not critical for above-fold hero)
5. Add to service worker cache

**Responsive Images**:
```html
<style>
.hero {
  background-image: url('../images/cvi-mobile.webp');
}

@media (min-width: 768px) {
  .hero {
    background-image: url('../images/cvi-tablet.webp');
  }
}

@media (min-width: 1024px) {
  .hero {
    background-image: url('../images/cvi-desktop.webp');
  }
}
</style>
```

## Alternative Approaches Considered

### Alternative 1: CSS background-size: cover with no blur
**Rejected**: Would crop image on different aspect ratios, losing important content.

### Alternative 2: Repeated/tiled background
**Rejected**: Creates unnatural, dated appearance; not suitable for photo.

### Alternative 3: Canvas-based blur extension
**Rejected**: More complex, requires JavaScript, worse performance, accessibility concerns.

### Alternative 4: Excessive zoom to fill
**Rejected**: Loses image detail, creates pixelation on large screens.

## Performance Considerations

### Image Size Impact
- Current: 3.7MB PNG
- Target: <500KB WebP (mobile), <800KB WebP (desktop)
- Expected reduction: ~85%

### Loading Strategy
- Critical CSS inlines small background
- Full image loads progressively
- Service worker caches for offline
- Blur layer can use lower-res version

### Lighthouse Impact
- Expect: -5 to -10 points initially
- After optimization: -2 to -5 points
- Trade-off acceptable for visual enhancement

## Browser Support

- `filter: blur()`: All modern browsers ✓
- `background-size: cover/contain`: All browsers ✓
- Pseudo-elements: All browsers ✓
- WebP: All modern browsers (PNG fallback for older browsers)

## Accessibility Considerations

- Background image is decorative, doesn't require alt text
- Text overlay ensures readability
- Sufficient contrast maintained with overlay
- No content in background image itself
- Works with high contrast modes

## Migration Plan

1. Optimize image (`cvi.PNG` → compressed versions)
2. Update CSS with blur extension technique
3. Add dark overlay for text readability
4. Test across devices and screen sizes
5. Measure performance impact
6. Adjust blur intensity and overlay opacity as needed
7. Add responsive image variants
8. Update service worker cache

## Rollback Strategy

If performance or visual issues arise:
1. Revert to gradient background
2. Keep image file for future use
3. Consider simpler background-size: cover approach

## Open Questions

**Q: Should we add a loading placeholder/blur-up effect?**
A: Good for UX. Can use gradient as placeholder while image loads.

**Q: Image positioning - should couple be centered or offset?**
A: Test with actual image; center is safest. Can adjust `background-position` if needed.

**Q: Blur intensity - 40px, 60px, or variable?**
A: Start with 40px, make variable by breakpoint. Can be fine-tuned after visual testing.
