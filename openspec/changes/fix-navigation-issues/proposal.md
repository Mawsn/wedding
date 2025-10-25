# Fix Navigation Issues

## Why
The mobile hamburger menu has three critical issues:
1. **Menu item visibility bug**: First menu item sometimes "peeks through" when the menu is closed, creating visual glitches
2. **Dark mode text contrast**: When device dark mode is enabled, some text elements don't switch to white, making them hard to read against dark backgrounds
3. **Brand link missing**: The "Sally & Elisha" brand logo in the navigation doesn't redirect to the home page when clicked, which is a standard web pattern users expect

These issues impact usability, accessibility, and the professional appearance of the site.

## What Changes
- Fix hamburger menu z-index and overflow issues to prevent menu items from showing when closed
- Ensure all text elements (especially nav links, hamburger icon, and brand) switch to white in dark mode
- Make the nav-brand clickable and link to `index.html` (home page)
- Test across all pages to ensure consistent behavior

## Impact
- Affected specs: `navigation` (modified capability)
- Affected code:
  - `css/main.css` - Navigation styles, dark mode overrides, z-index fixes
  - `css/variables.css` - Enhanced dark mode color variables
  - `index.html`, `details.html`, `rsvp.html`, `photos.html` - Add link wrapper to nav-brand
- Visual: Clean hamburger menu behavior, proper dark mode text visibility
- Accessibility: Better contrast in dark mode (WCAG compliance)
- UX: Standard navigation pattern (clickable brand logo)
