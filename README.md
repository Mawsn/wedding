# Sally & Elisha's Wedding Website 💍

A beautiful, responsive wedding RSVP website built as a Progressive Web App (PWA).

## Features

- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- 🌐 **Progressive Web App** - Installable and works offline
- 📝 **RSVP Form** - Integrated with Google Forms for easy response collection
- 🎨 **Beautiful Design** - Elegant wedding theme with smooth animations
- ♿ **Accessible** - Keyboard navigation and screen reader support
- 🚀 **Fast Loading** - Optimized static site hosted on GitHub Pages

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties (variables) for theming
- **JavaScript (ES6+)** - Modular architecture
- **PWA** - Service worker for offline capabilities
- **Google Forms** - Backend for RSVP collection

## Project Structure

```
wedding/
├── index.html              # Home page
├── details.html            # Wedding details
├── rsvp.html              # RSVP form
├── photos.html            # Photo sharing (placeholder)
├── css/
│   ├── variables.css      # CSS custom properties
│   ├── main.css           # Main styles
│   └── components/        # Component-specific styles
├── js/
│   ├── app.js             # Main application
│   ├── modules/
│   │   ├── navigation.js  # Navigation component
│   │   └── rsvp.js        # RSVP form handling
│   └── service-worker.js  # PWA service worker
├── images/                # Image assets
├── icons/                 # PWA icons
├── manifest.json          # PWA manifest
└── .nojekyll             # GitHub Pages configuration
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Mawsn/wedding.git
cd wedding
```

### 2. Configure Google Forms Integration

To enable RSVP submissions:

1. **Create a Google Form:**
   - Go to [Google Forms](https://docs.google.com/forms)
   - Create a new form with these fields:
     - Full Name (Short answer, Required)
     - Email Address (Short answer, Required)
     - Phone Number (Short answer)
     - Attendance (Multiple choice, Required): "Yes, I'll be there!" / "Sorry, I can't make it"
     - Number of Guests (Short answer)
     - Dietary Requirements (Paragraph)
     - Message to the Couple (Paragraph)

2. **Get the Form Action URL:**
   - Click "Send" on your Google Form
   - Click the "Link" tab
   - Copy the form URL
   - Replace `/viewform` with `/formResponse` in the URL

3. **Get Field Entry IDs:**
   - Open your published Google Form in a new tab
   - Right-click and select "View Page Source"
   - Search for `entry.` to find the entry IDs for each field
   - They look like: `entry.1234567890`

4. **Update the RSVP Module:**
   - Open `js/modules/rsvp.js`
   - Update the `GOOGLE_FORM_CONFIG` object with your form URL and entry IDs
   - Replace the placeholder IDs in `rsvp.html` with your actual entry IDs

### 3. Add PWA Icons

Generate icon files for the PWA:

1. Create a 512x512px square image with your wedding logo or initials
2. Use an online tool to generate icon files:
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - [Favicon.io](https://favicon.io/)
3. Place the generated icons in the `icons/` directory

### 4. Customize Content

Update the website content to match your wedding:

- **Wedding Details** (`index.html`, `details.html`):
  - Couple names
  - Wedding date and time
  - Venue information
  - Schedule
  - Dress code
  - Any special instructions

- **Theme Colors** (`css/variables.css`):
  - Update `--color-primary` and `--color-secondary` to match your wedding colors
  - Modify font families if desired

- **PWA Configuration** (`manifest.json`):
  - Update `name` and `short_name` if desired
  - Adjust `theme_color` to match your primary color

### 5. Deploy to GitHub Pages

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Save

2. **Your site will be available at:**
   ```
   https://mawsn.github.io/wedding/
   ```

3. **Optional - Custom Domain:**
   - Add a `CNAME` file with your custom domain
   - Configure DNS settings with your domain provider

## Development

### Local Development

Simply open `index.html` in a web browser. For a better development experience:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Testing PWA Features

PWA features (service worker, installation) require HTTPS or localhost. Test locally or deploy to GitHub Pages to test PWA functionality.

## Customization Guide

### Changing Colors

Edit `css/variables.css`:

```css
:root {
  --color-primary: #8B7355;        /* Main theme color */
  --color-secondary: #D4AF37;      /* Accent color */
  /* ... other variables */
}
```

### Adding New Pages

1. Create a new HTML file (e.g., `gifts.html`)
2. Copy the structure from an existing page
3. Add navigation link in all page headers
4. Update `service-worker.js` to cache the new page

### Extending Photo Functionality

The photos page is currently a placeholder. To add photo upload:

1. Set up Google Drive API integration
2. Create `js/modules/photos.js`
3. Implement upload and gallery functionality
4. Update `photos.html` with the photo upload interface

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 11.3+)
- Opera: Full support

## Troubleshooting

### RSVP Form Not Submitting

- Check that you've updated the Google Form URL in `js/modules/rsvp.js`
- Verify entry IDs match your Google Form fields
- Check browser console for errors

### PWA Not Installing

- Ensure you're using HTTPS or localhost
- Check that all icon files exist
- Verify `manifest.json` is valid (use Chrome DevTools)

### Service Worker Issues

- Clear cache and unregister service worker in DevTools
- Check for errors in browser console
- Ensure service worker file is at the root of your site

## Future Enhancements

Potential features to add:

- [ ] Photo upload and gallery with Google Drive
- [ ] Guest authentication with personal RSVP codes
- [ ] Email notifications for RSVP confirmations
- [ ] Interactive venue map
- [ ] Countdown timer to wedding day
- [ ] Guest book / well wishes section
- [ ] Live streaming integration
- [ ] Wedding registry links
- [ ] Accommodation booking integration

## License

This project is created for personal use. Feel free to fork and adapt for your own wedding!

## Support

For questions or issues, please contact:
- Email: sallyandElisha@wedding.com
- Repository: https://github.com/Mawsn/wedding

---

Made with ❤️ for Sally & Elisha's special day