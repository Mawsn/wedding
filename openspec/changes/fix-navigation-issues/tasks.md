# Implementation Tasks

## 1. Fix Hamburger Menu Visibility Bug
- [x] 1.1 Remove padding from `.nav-menu` default state in CSS
- [x] 1.2 Add padding to `.nav-menu.active` state only
- [x] 1.3 Add padding transition to smooth animation
- [x] 1.4 Test menu closes completely with no visible items
- [x] 1.5 Verify smooth open/close animation still works
- [x] 1.6 Test on mobile viewport (375px, 414px widths)

## 2. Enhance Dark Mode Support
- [x] 2.1 Review current dark mode variables in `variables.css`
- [x] 2.2 Verify hamburger icon uses `var(--color-text)`
- [x] 2.3 Add explicit dark mode overrides for `.nav-link` if needed
- [x] 2.4 Add explicit dark mode overrides for `.nav-brand` if needed
- [x] 2.5 Add explicit dark mode overrides for `.hamburger` and pseudo-elements
- [x] 2.6 Adjust `--color-primary` for better visibility on dark backgrounds
- [x] 2.7 Test with device dark mode enabled (iOS, Android, desktop)
- [x] 2.8 Verify all navigation text is readable (white/light colored)
- [x] 2.9 Check color contrast meets WCAG AA standards

## 3. Make Brand Logo Clickable
- [x] 3.1 Wrap `.nav-brand` in anchor tag in `index.html`
- [x] 3.2 Wrap `.nav-brand` in anchor tag in `details.html`
- [x] 3.3 Wrap `.nav-brand` in anchor tag in `rsvp.html`
- [x] 3.4 Wrap `.nav-brand` in anchor tag in `photos.html`
- [x] 3.5 Add `text-decoration: none` to `.nav-brand` CSS
- [x] 3.6 Add hover effect (opacity: 0.8) to `.nav-brand`
- [x] 3.7 Add smooth transition for hover effect
- [x] 3.8 Ensure focus outline is visible for keyboard navigation
- [x] 3.9 Test clicking brand logo navigates to home page
- [x] 3.10 Test from all four pages (index, details, rsvp, photos)

## 4. Cross-Browser Testing
- [x] 4.1 Test on Chrome desktop (Windows/Mac)
- [x] 4.2 Test on Firefox desktop
- [x] 4.3 Test on Safari desktop (Mac)
- [x] 4.4 Test on iOS Safari (iPhone)
- [x] 4.5 Test on Android Chrome
- [x] 4.6 Test on Edge desktop
- [x] 4.7 Verify dark mode works on all browsers

## 5. Responsive Testing
- [x] 5.1 Test at 320px width (small mobile)
- [x] 5.2 Test at 375px width (iPhone)
- [x] 5.3 Test at 414px width (large mobile)
- [x] 5.4 Test at 768px width (tablet portrait)
- [x] 5.5 Test at 1024px width (tablet landscape / desktop)
- [x] 5.6 Test at 1440px width (desktop)
- [x] 5.7 Verify desktop nav unchanged (hamburger only on mobile)

## 6. Accessibility Testing
- [x] 6.1 Tab to brand logo with keyboard
- [x] 6.2 Press Enter to navigate (should go to home)
- [x] 6.3 Verify focus outline is visible
- [x] 6.4 Test with screen reader (announces "Sally & Elisha, link")
- [x] 6.5 Verify hamburger button still has proper ARIA label
- [x] 6.6 Check color contrast in dark mode (aim for WCAG AA)
- [x] 6.7 Test with high contrast mode enabled

## 7. Visual Quality Assurance
- [x] 7.1 Verify no layout shifts when wrapping brand in anchor
- [x] 7.2 Check brand logo alignment unchanged
- [x] 7.3 Verify hover effect is subtle and not jarring
- [x] 7.4 Confirm menu animation remains smooth
- [x] 7.5 Check for any visual glitches during menu open/close
- [x] 7.6 Verify dark mode colors look good (not too bright/harsh)

## 8. Functionality Validation
- [x] 8.1 Open hamburger menu on mobile
- [x] 8.2 Close hamburger menu (verify fully hidden)
- [x] 8.3 Click menu items (verify navigation works)
- [x] 8.4 Click brand logo from each page (verify goes to home)
- [x] 8.5 Toggle device dark mode on/off (verify changes apply)
- [x] 8.6 Test rapid open/close of menu (no glitches)
- [x] 8.7 Test clicking outside menu to close (if feature exists)

## 9. Code Quality
- [x] 9.1 Ensure CSS changes don't break existing styles
- [x] 9.2 Verify no duplicate CSS rules
- [x] 9.3 Check for proper CSS variable usage
- [x] 9.4 Validate HTML (no nesting errors with anchor)
- [x] 9.5 Ensure consistent code formatting
- [x] 9.6 Add comments if complex logic needed

## 10. Final Verification
- [x] 10.1 No errors in browser console
- [x] 10.2 All four HTML pages updated consistently
- [x] 10.3 CSS changes applied correctly
- [x] 10.4 Dark mode works across all pages
- [x] 10.5 Menu visibility issue completely resolved
- [x] 10.6 Brand logo clickable on all pages
- [x] 10.7 Run through full user flow (navigate site, toggle menu, click brand)
