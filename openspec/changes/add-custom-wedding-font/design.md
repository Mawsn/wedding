# Design Document: Custom Wedding Font Integration

## Context
The website uses the "Weddingday" custom font (WeddingdayPersonalUseRegular-1Gvo0.ttf) that needs to be properly integrated. This font will provide a distinctive, elegant aesthetic for key branding elements.

## Goals / Non-Goals

### Goals
- Load custom font efficiently with proper fallbacks
- Ensure that the font can be loaded for iOS and other mobile devices, fallback should be practically neve invoked ideally
- Apply font to hero title and navigation brand for visual consistency
- Update navigation brand to display full couple names with elegant layout
- Ensure font renders correctly across all browsers
- Maintain responsive design principles

### Non-Goals
- Applying custom font to body text (keep readable system fonts)
- Creating multiple font weight variations (use single weight provided)
- Optimizing font with subsetting (keep full character set for now)

## Technical Decisions

### 1. Font File Organization
**Decision**: Move font to `/fonts/` directory

**Rationale**:
- Standard web convention for font assets
- Separates fonts from other static assets
- Easier to manage multiple font files if added later
- Clear organizational structure

**Structure**:
```
fonts/
  └── Weddingday.ttf  (renamed for simplicity)
```

### 2. Font Loading Strategy
**Decision**: Use `@font-face` with `font-display: swap`

**Rationale**:
- `font-display: swap` shows fallback font immediately, then swaps when custom font loads
- Prevents invisible text (FOIT) while font loads
- Better user experience on slow connections
- Good Lighthouse performance score

**Implementation**:
```css
@font-face {
  font-family: 'Weddingday';
  src: url('../fonts/Weddingday.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 3. CSS Variable Integration
**Decision**: Add `--font-wedding` variable to variables.css

**Rationale**:
- Consistent with existing design system
- Easy to reference throughout codebase
- Can be updated in one place if font changes
- Maintains separation of concerns

**Variable**:
```css
--font-wedding: 'Weddingday', 'Great Vibes', cursive;
```

### 4. Navigation Brand Layout
**Decision**: Stack "Sally &" and "Elisha" on two lines with responsive sizing

**Rationale**:
- Better utilizes vertical space in navigation
- More elegant than single-line abbreviated version
- Full names are more personal and welcoming
- Stacked layout is visually balanced

**Layout Approach**:
```css
.nav-brand {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-align: center;
}
```

**Responsive Strategy**:
- Desktop: Larger font size (~28-32px)
- Mobile: Slightly smaller (~20-24px) to fit in nav bar
- Maintain aspect ratio and readability

### 5. Hero Title Styling
**Decision**: Apply Weddingday font to hero title with size adjustments

**Rationale**:
- Custom font is more decorative, may need different sizing than Georgia
- Maintain visual hierarchy with other hero elements
- Ensure readability on all screen sizes

**Adjustments**:
- May need to adjust font-size due to font metrics
- Consider letter-spacing adjustments for better readability
- Maintain responsive breakpoints

## Font Fallback Stack

Primary target: `'Weddingday', 'Great Vibes', cursive`

Fallback reasoning:
1. **Weddingday** - Custom font (primary)
2. **Great Vibes** - Google Font with similar script style
3. **cursive** - Generic cursive family (final fallback)

## Performance Considerations

### Font File Size
- Current file: ~100-200KB (estimated)
- Impact: Acceptable for decorative use on limited elements
- Mitigation: Used only for branding elements, not body text

### Loading Performance
- `font-display: swap` prevents render blocking
- Font cached after first load
- Service worker will cache for offline use

### Future Optimizations (if needed)
- Convert to WOFF2 format for better compression (~30% smaller)
- Subset font to only include needed characters
- Preload font file for faster loading: `<link rel="preload" as="font">`

## Browser Support

TTF format supported by:
- Chrome/Edge: ✓
- Firefox: ✓
- Safari: ✓
- iOS Safari: ✓
- Android Chrome: ✓

No compatibility concerns for target browsers.

## Accessibility Considerations

- Font remains decorative, doesn't affect content readability
- Fallback fonts ensure text is always readable
- Navigation text is simple and clear
- Hero title has sufficient contrast against background
- Font size maintains WCAG minimum sizes on mobile

## Migration Plan

1. Create `/fonts/` directory
2. Move and rename font file
3. Add `@font-face` declaration in main.css
4. Update CSS variable in variables.css
5. Apply font to `.hero-title`
6. Update HTML for `.nav-brand` in all pages
7. Style `.nav-brand` with stacked layout
8. Test across browsers and devices
9. Verify font loads correctly
10. Check responsive behavior

## Rollback Strategy

If font issues arise:
1. Remove `@font-face` declaration
2. Revert to original nav-brand text ("S & E")
3. Font variable will fall back to Great Vibes/cursive

## Open Questions

None - implementation is straightforward.
