# Implementation Tasks

## 1. Font File Organization
- [x] 1.1 Create `/fonts/` directory in project root
- [x] 1.2 Move `WeddingdayPersonalUseRegular-1Gvo0.ttf` to `/fonts/` directory
- [x] 1.3 Rename font file to `Weddingday.ttf` for simplicity
- [x] 1.4 Verify font file is accessible and not corrupted

## 2. CSS Font Integration
- [x] 2.1 Add `@font-face` declaration in `css/main.css`
- [x] 2.2 Add `--font-wedding` variable to `css/variables.css`
- [x] 2.3 Update service worker cache to include font file path

## 3. Hero Title Styling
- [x] 3.1 Apply Weddingday font to `.hero-title` class
- [x] 3.2 Adjust font-size if needed for visual balance
- [x] 3.3 Fine-tune letter-spacing for readability
- [x] 3.4 Test on mobile and desktop viewports

## 4. Navigation Brand Update
- [x] 4.1 Update `.nav-brand` HTML from "S & E" to "Sally & Elisha" in all pages
- [x] 4.2 Add stacked layout styling to `.nav-brand` class
- [x] 4.3 Apply Weddingday font to `.nav-brand`
- [x] 4.4 Adjust responsive font sizes (desktop vs mobile)
- [x] 4.5 Ensure nav-brand fits properly in navigation bar on all screen sizes

## 5. Cross-Browser Testing
- [x] 5.1 Test font rendering on Chrome/Edge
- [x] 5.2 Test font rendering on Firefox
- [x] 5.3 Test font rendering on Safari (macOS/iOS)
- [x] 5.4 Verify font-display: swap behavior
- [x] 5.5 Check fallback fonts render correctly when font is loading

## 6. Responsive Testing
- [x] 6.1 Test navigation brand on mobile portrait (375px)
- [x] 6.2 Test navigation brand on tablet (768px)
- [x] 6.3 Test navigation brand on desktop (1024px+)
- [x] 6.4 Test hero title responsiveness
- [x] 6.5 Verify no layout breaks or text overflow

## 7. Performance Validation
- [x] 7.1 Verify font file loads successfully (check Network tab)
- [x] 7.2 Check font file is cached by service worker
- [x] 7.3 Test offline functionality with cached font
- [x] 7.4 Run Lighthouse audit to ensure no performance regression
