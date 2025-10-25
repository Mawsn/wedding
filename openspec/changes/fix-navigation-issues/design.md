# Design Document: Navigation Fixes

## Context
The navigation component has three distinct issues that need to be resolved:
1. Mobile hamburger menu allows first menu item to "peek through" when closed
2. Dark mode support is incomplete - some text doesn't switch to white
3. Brand logo lacks home page link (expected UX pattern)

## Goals / Non-Goals

### Goals
- Completely hide mobile menu when closed (no visual glitches)
- Ensure all text is readable in dark mode with proper contrast
- Make brand logo clickable and navigate to home page
- Maintain existing responsive behavior
- Preserve accessibility (ARIA labels, focus states)

### Non-Goals
- Redesigning navigation layout or structure
- Adding new navigation features (dropdowns, mega menus, etc.)
- Implementing light/dark mode toggle button
- Adding animations beyond what exists

## Technical Decisions

### 1. Fix Hamburger Menu Visibility Bug
**Problem**: Menu items visible when `max-height: 0` due to padding/overflow issues.

**Root Cause Analysis**:
```css
.nav-menu {
  max-height: 0;
  overflow: hidden;  /* Present but padding may cause issues */
  padding: var(--spacing-lg);  /* Padding creates visible space even at max-height: 0 */
}
```

**Solution**: Conditionally apply padding only when menu is active.

```css
.nav-menu {
  max-height: 0;
  overflow: hidden;
  padding: 0;  /* No padding when closed */
  transition: max-height var(--transition-base), padding var(--transition-base);
}

.nav-menu.active {
  max-height: 500px;
  padding: var(--spacing-lg);  /* Padding only when open */
}
```

**Alternative Considered**: `display: none` → Rejected because it breaks transition animations.

---

### 2. Dark Mode Text Contrast
**Problem**: Not all text elements inherit dark mode colors from CSS variables.

**Current State**:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #F5F5F5;
    /* Other variables... */
  }
}
```

The hamburger icon and some fixed-color elements don't use CSS variables.

**Solution**: Ensure all navigation elements use variables and add explicit dark mode overrides.

```css
/* Ensure hamburger uses variable */
.hamburger,
.hamburger::before,
.hamburger::after {
  background: var(--color-text);  /* Already present, verify it works */
}

/* Add explicit dark mode overrides if needed */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #F5F5F5;
    --color-text-light: #CCCCCC;
    --color-primary: #E6C3A5;  /* Lighter version for dark backgrounds */
  }
  
  /* Force white text on specific elements if CSS vars don't cascade */
  .nav-link,
  .nav-brand,
  .hamburger,
  .hamburger::before,
  .hamburger::after {
    color: #FFFFFF;
    background-color: #FFFFFF;  /* For hamburger bars */
  }
}
```

**Rationale**: CSS custom properties should handle this, but explicit overrides ensure compatibility across all browsers.

---

### 3. Clickable Brand Logo
**Problem**: `.nav-brand` div is not clickable.

**Current HTML**:
```html
<div class="nav-brand">
    <span>Sally &</span>
    <span>Elisha</span>
</div>
```

**Solution**: Wrap in an anchor tag.

```html
<a href="index.html" class="nav-brand">
    <span>Sally &</span>
    <span>Elisha</span>
</a>
```

**CSS Adjustments**:
```css
.nav-brand {
  /* Keep existing styles */
  text-decoration: none;  /* Remove underline */
  cursor: pointer;
}

.nav-brand:hover {
  opacity: 0.8;  /* Subtle hover effect */
  transition: opacity var(--transition-fast);
}
```

**Accessibility**: Anchor tags are keyboard-navigable by default. No additional ARIA needed.

---

## Alternative Approaches Considered

### Alternative 1: Use JavaScript to toggle display property
**Rejected**: Breaks CSS transitions. Current max-height approach is better for smooth animations.

### Alternative 2: Implement custom dark mode toggle
**Rejected**: Out of scope. User requested respecting system preference, not custom toggle.

### Alternative 3: Use transform: translateY() instead of max-height
**Rejected**: More complex, current approach is simpler and works well when padding is fixed.

---

## Implementation Details

### Files to Modify

1. **`css/main.css`**:
   - Fix `.nav-menu` padding (only apply when `.active`)
   - Verify dark mode selectors
   - Add `.nav-brand` link styles (hover, focus states)

2. **`css/variables.css`**:
   - Enhance dark mode variables if needed
   - Ensure `--color-primary` works well on dark backgrounds

3. **HTML files** (`index.html`, `details.html`, `rsvp.html`, `photos.html`):
   - Wrap `.nav-brand` div in `<a href="index.html">` tag
   - Verify no layout shifts occur

### Testing Checklist
- [ ] Mobile menu fully hidden when closed (no peeking items)
- [ ] Mobile menu opens/closes smoothly
- [ ] Dark mode: all nav text is white/light colored
- [ ] Dark mode: hamburger icon is visible (white)
- [ ] Brand logo clickable and navigates to home
- [ ] Brand logo hover effect works
- [ ] Keyboard navigation works (Tab to brand, Enter to navigate)
- [ ] Test on iOS Safari, Android Chrome, desktop browsers

---

## Performance Considerations
- No performance impact (CSS-only fixes, minimal HTML change)
- No new assets or dependencies

## Browser Support
- All modern browsers support `prefers-color-scheme`
- Fallback: Light mode styles apply for older browsers

## Accessibility Considerations
- **Keyboard Navigation**: Brand logo anchor is keyboard-accessible
- **Screen Readers**: Anchor will announce "Sally & Elisha, link" which is semantically correct
- **Color Contrast**: Dark mode ensures WCAG AA compliance (white text on dark backgrounds)
- **Focus Indicators**: Ensure `.nav-brand:focus` has visible outline

## Rollback Strategy
If issues arise:
1. Revert HTML changes (remove anchor wrapper)
2. Revert CSS padding changes
3. All changes are non-breaking and easily reversible

## Open Questions
None - requirements are clear and straightforward.
