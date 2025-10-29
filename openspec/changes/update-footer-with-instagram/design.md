# Design Document: Footer Instagram Integration

## Context
The website footer currently displays copyright information and an email contact link. The couple wants to modernize the footer by showcasing their Instagram profiles with usernames (_mawson for Elisha and zixinzhang920 for Sally) styled elegantly with the custom Weddingday font and accompanied by Instagram icons.

## Goals / Non-Goals

### Goals
- Display both Instagram profiles prominently in the footer
- Use the Weddingday cursive font for usernames to match the wedding aesthetic
- Add Instagram icons for visual recognition
- Ensure responsive design that works on mobile and desktop
- Maintain consistency across all pages
- Create clickable links that open Instagram profiles in a new tab

### Non-Goals
- Adding other social media platforms (Facebook, Twitter, etc.)
- Creating a comprehensive social media widget
- Implementing Instagram feed integration or API calls
- Keeping the existing copyright and email information (can be removed or minimized)
- Adding animation or hover effects beyond basic link styling

## Technical Decisions

### 1. Icon Strategy
**Decision**: Use inline SVG for Instagram icon

**Rationale**:
- No external dependencies or icon font libraries needed
- Lightweight and fast loading
- Easy to style and color with CSS
- Full control over icon appearance
- Works offline with service worker
- Scalable without quality loss

**Alternative Considered**: Font Awesome or similar icon library
- **Rejected** because it adds an external dependency and increases page weight unnecessarily for a single icon

**Implementation**:
```html
<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
  <path fill="currentColor" d="Instagram SVG path data"/>
</svg>
```

### 2. Footer Layout Structure
**Decision**: Horizontal flex layout with two Instagram profiles side-by-side

**Rationale**:
- Clean, balanced appearance
- Easy to make responsive (stack on mobile if needed)
- Visually separates the two profiles
- Fits naturally in footer space

**Layout Approach**:
```html
<footer class="footer">
  <div class="container">
    <div class="footer-social">
      <a href="https://instagram.com/_mawson" class="instagram-link" target="_blank" rel="noopener noreferrer">
        <svg>...</svg>
        <span class="instagram-username">@_mawson</span>
      </a>
      <a href="https://instagram.com/zixinzhang920" class="instagram-link" target="_blank" rel="noopener noreferrer">
        <svg>...</svg>
        <span class="instagram-username">@zixinzhang920</span>
      </a>
    </div>
  </div>
</footer>
```

### 3. Typography Strategy
**Decision**: Apply Weddingday font to Instagram usernames

**Rationale**:
- Maintains consistent branding with hero title and nav-brand
- Creates elegant, personal feel
- Distinguishes from generic social media footers
- Already established pattern in the codebase with `--font-wedding` variable

**Implementation**:
```css
.instagram-username {
  font-family: var(--font-wedding);
  font-size: var(--font-size-xl); /* ~20px */
}
```

### 4. Responsive Strategy
**Decision**: Stack profiles vertically on mobile, horizontal on desktop

**Rationale**:
- Prevents cramping on small screens
- Maintains readability of usernames
- Standard responsive pattern for footer elements
- Breakpoint at 768px aligns with existing site breakpoints

**Breakpoint Strategy**:
```css
/* Mobile: Stack vertically */
.footer-social {
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Desktop: Horizontal layout */
@media (min-width: 768px) {
  .footer-social {
    flex-direction: row;
    justify-content: center;
    gap: var(--spacing-3xl);
  }
}
```

### 5. Link Behavior
**Decision**: Open Instagram links in new tab with security attributes

**Rationale**:
- Standard practice for external social media links
- Keeps wedding website open in original tab
- `rel="noopener noreferrer"` prevents security vulnerabilities and referrer tracking
- Better user experience as users don't lose their place

**Attributes**:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Security best practice

### 6. Color and Styling
**Decision**: Use existing color scheme with subtle hover effects

**Rationale**:
- Maintain visual consistency with rest of site
- White text on primary brown background (existing footer styling)
- Secondary gold color for hover state (already defined in variables)
- Instagram icon inherits text color via `currentColor`

**Color Strategy**:
```css
.instagram-link {
  color: white;
  text-decoration: none;
}

.instagram-link:hover {
  color: var(--color-secondary-light); /* Gold hover */
}
```

### 7. Accessibility Considerations
**Decision**: Include proper ARIA labels and semantic HTML

**Rationale**:
- Screen readers should announce "Link to Instagram profile for [username]"
- SVG icons marked as `aria-hidden="true"` since text provides context
- Sufficient color contrast maintained
- Links are keyboard accessible

**Implementation**:
```html
<a href="..." aria-label="Visit Elisha's Instagram profile">
  <svg aria-hidden="true">...</svg>
  <span>@_mawson</span>
</a>
```

### 8. Copyright Information
**Decision**: Remove copyright and email from footer

**Rationale**:
- Request specifically asks to replace the footer
- Instagram provides contact method
- Simplifies footer design
- Can add copyright in small text below if needed later

**Alternative**: Keep copyright in very small text below social links if legally required

## Performance Considerations
- Inline SVG adds minimal bytes (~1-2KB)
- No additional HTTP requests needed
- Font already loaded for other elements
- No JavaScript required for basic functionality

## Browser Compatibility
- Inline SVG supported in all modern browsers
- Flexbox layout widely supported
- Weddingday font already tested across browsers
- External links with `target="_blank"` universally supported

## Future Enhancements (Not in Scope)
- Add other social media platforms
- Display Instagram follower counts
- Embed Instagram feed preview
- Add QR codes for easy mobile scanning at wedding venue
