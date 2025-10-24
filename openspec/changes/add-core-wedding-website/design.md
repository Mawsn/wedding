# Design Document: Core Wedding Website

## Context
Building a wedding RSVP website for Sally and Elisha as a static PWA hosted on GitHub Pages. The site needs to be beautiful, easy to navigate, mobile-friendly for Australian guests, and modular to allow future feature additions (e.g., photo capture/upload).

## Goals / Non-Goals

### Goals
- Simple, beautiful user experience on mobile and desktop
- RSVP functionality via Google Forms integration
- PWA capabilities for offline access and app-like feel
- Modular architecture for easy feature additions
- Zero backend infrastructure (static hosting)
- Fast loading and responsive design

### Non-Goals
- Server-side logic or database
- Real-time features
- User authentication (for initial version)
- Complex photo management (placeholder only in v1)
- Testing infrastructure

## Technical Decisions

### 1. Architecture: Vanilla JavaScript with Modular Components
**Decision**: Use vanilla HTML/CSS/JavaScript with ES6 modules instead of a framework.

**Rationale**:
- Simplicity: No build process, easy to understand and maintain
- Performance: Minimal overhead, fast loading
- Modularity: ES6 modules provide component organization
- Future-proof: Easy to migrate to a framework later if needed

**Alternatives Considered**:
- React/Next.js: Overkill for static content, adds complexity
- Vue/Svelte: Better than React but still unnecessary for current scope
- jQuery: Outdated, vanilla JS is sufficient

### 2. RSVP Backend: Google Forms
**Decision**: Embed Google Forms or use its API for RSVP collection.

**Rationale**:
- No backend needed
- Automatic data collection in Google Sheets
- Easy to review and manage responses
- Free and reliable

**Implementation Options**:
- Option A (Simple): Embed iframe of Google Form
- Option B (Custom UI): Custom form posting to Google Forms endpoint
- Chosen: Option B for better UX control and consistent branding

### 3. PWA Implementation
**Decision**: Full PWA with service worker caching and manifest.

**Rationale**:
- Offline access for guests in poor connectivity areas
- "Add to Home Screen" creates app-like experience
- Modern best practice for mobile web
- Required minimal effort for static content

**Caching Strategy**:
- Cache-first for static assets (HTML, CSS, JS, images)
- Network-first for Google Forms submissions
- Fallback offline page for network failures

### 4. File Structure
```
wedding/
├── index.html              # Home page
├── details.html            # Wedding details
├── rsvp.html              # RSVP form
├── photos.html            # Photo sharing (placeholder)
├── css/
│   ├── main.css           # Core styles
│   ├── variables.css      # CSS custom properties
│   └── components/        # Component-specific styles
├── js/
│   ├── app.js             # Main application logic
│   ├── modules/
│   │   ├── navigation.js  # Navigation component
│   │   ├── rsvp.js        # RSVP form handling
│   │   └── pwa.js         # PWA utilities
│   └── service-worker.js  # Service worker
├── images/                # Image assets
├── icons/                 # PWA icons
├── manifest.json          # PWA manifest
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Pages deployment (optional)
```

### 5. Design System
**Decision**: Custom CSS with CSS custom properties (variables) for theming.

**Core Variables**:
```css
:root {
  --color-primary: #...;      /* Wedding theme color */
  --color-secondary: #...;    /* Accent color */
  --color-text: #...;         /* Body text */
  --color-background: #...;   /* Page background */
  --font-heading: ...;        /* Heading font */
  --font-body: ...;           /* Body font */
  --spacing-unit: 8px;        /* Base spacing */
}
```

**Mobile-First**: All styles default to mobile, with `min-width` media queries for desktop.

## Data Flow

### RSVP Submission Flow
```
User fills form
    ↓
Client-side validation
    ↓
POST to Google Forms endpoint
    ↓
Success: Show confirmation
Failure: Show error + retry
    ↓
Google Forms saves to Sheet
```

### PWA Installation Flow
```
User visits site
    ↓
Service worker registers
    ↓
Assets cached for offline use
    ↓
Browser shows "Add to Home Screen"
    ↓
User installs (optional)
    ↓
App available offline
```

## Risks / Trade-offs

### Risk: Google Forms Rate Limiting
**Mitigation**: Monitor submission patterns; Google Forms is designed for this use case and unlikely to hit limits for wedding RSVPs.

### Risk: Service Worker Caching Issues
**Mitigation**: Implement versioned cache names and cache-busting for updates. Provide clear cache invalidation strategy.

### Trade-off: No Real-time Validation
Accepting that form validation is client-side only. Google Forms provides server-side validation, but users won't see it until submission.

### Trade-off: Limited Photo Functionality Initially
Photos page is placeholder only. Future enhancement will integrate Google Drive API for uploads.

## Migration Plan
N/A - Initial implementation, no migration needed.

## Future Extension Points

1. **Photo Sharing Module** (`photos.js`):
   - Google Drive API integration for upload
   - Image gallery rendering
   - Optional: Camera access for live capture

2. **Guest Authentication** (if needed):
   - Simple code-based access
   - Personalized RSVP pre-filling

3. **Analytics** (if desired):
   - Google Analytics or similar
   - Track page views and RSVP completions

4. **Email Notifications**:
   - Google Apps Script triggered by Form submissions
   - Send confirmation emails to guests

## Open Questions
None at this time - ready for implementation.
