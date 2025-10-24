# Deployment Checklist

Use this checklist to ensure your wedding website is fully configured and ready for guests.

## Pre-Deployment Configuration

### Content Customization
- [ ] Updated couple names in all HTML files
- [ ] Updated wedding date and time
- [ ] Updated venue information and addresses
- [ ] Updated schedule of events
- [ ] Updated dress code and practical information
- [ ] Updated contact email addresses
- [ ] Reviewed all placeholder text

### Google Forms Setup
- [ ] Created Google Form with all required fields
- [ ] Obtained form action URL (with /formResponse)
- [ ] Extracted all entry IDs from form HTML
- [ ] Updated `js/modules/rsvp.js` with form URL
- [ ] Updated `js/modules/rsvp.js` with entry IDs
- [ ] Updated `rsvp.html` with correct entry IDs
- [ ] Tested form submission locally
- [ ] Verified responses appear in Google Sheets

### Visual Customization
- [ ] Generated PWA icons (or created custom ones)
- [ ] Placed all icon files in `/icons/` directory
- [ ] Updated theme colors in `css/variables.css`
- [ ] Updated `theme_color` in `manifest.json`
- [ ] Updated nav brand initials (optional)
- [ ] Added wedding photos to `/images/` (optional)

### Technical Setup
- [ ] Tested all pages load correctly
- [ ] Tested navigation on mobile and desktop
- [ ] Tested RSVP form validation
- [ ] Tested service worker registration (check console)
- [ ] Verified responsive design on multiple screen sizes
- [ ] Checked accessibility (keyboard navigation)
- [ ] Tested offline functionality (disconnect and reload)

## Deployment

### GitHub Repository
- [ ] Committed all changes to git
- [ ] Pushed to GitHub main branch
- [ ] `.nojekyll` file is present in repository root
- [ ] All necessary files are committed (HTML, CSS, JS, icons)

### GitHub Pages Configuration
- [ ] Enabled GitHub Pages in repository settings
- [ ] Selected "main" branch as source
- [ ] Waited for initial deployment (check Actions tab)
- [ ] Visited live URL: `https://mawsn.github.io/wedding/`
- [ ] Verified all pages load on live site

### Custom Domain (Optional)
- [ ] Purchased custom domain
- [ ] Created `CNAME` file with domain name
- [ ] Configured DNS A records with GitHub's IPs
- [ ] Configured DNS CNAME record
- [ ] Updated custom domain in GitHub Pages settings
- [ ] Enabled HTTPS in GitHub Pages settings
- [ ] Waited for SSL certificate provisioning
- [ ] Tested custom domain URL

## Post-Deployment Testing

### Functionality Testing
- [ ] Home page loads correctly
- [ ] Details page shows accurate information
- [ ] RSVP form displays properly
- [ ] Photos page shows placeholder content
- [ ] Navigation works on all pages
- [ ] Mobile menu toggles correctly
- [ ] All links work (no 404 errors)

### RSVP Form Testing
- [ ] Submit test RSVP with valid data
- [ ] Verify submission appears in Google Form responses
- [ ] Test form validation (empty fields, invalid email)
- [ ] Test success message displays
- [ ] Test error handling (if applicable)
- [ ] Verify email field accepts valid emails

### Cross-Browser Testing
- [ ] Tested on Chrome/Edge
- [ ] Tested on Firefox
- [ ] Tested on Safari (macOS/iOS)
- [ ] Tested on mobile Chrome (Android)
- [ ] Tested on mobile Safari (iOS)

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet landscape (1024x768)
- [ ] Tablet portrait (768x1024)
- [ ] Mobile landscape (667x375)
- [ ] Mobile portrait (375x667)

### PWA Testing
- [ ] Manifest loads without errors
- [ ] Service worker registers successfully
- [ ] Icons display correctly in manifest
- [ ] App is installable (see browser prompt)
- [ ] Installed app opens in standalone mode
- [ ] Offline mode works (disconnect and reload)
- [ ] Cached pages load when offline

### Performance Testing
- [ ] Page load time under 3 seconds
- [ ] Images optimized and load quickly
- [ ] No console errors or warnings
- [ ] Lighthouse score > 90 (run in Chrome DevTools)

### Accessibility Testing
- [ ] All images have alt text (when added)
- [ ] Form inputs have labels
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (test with NVDA/VoiceOver)
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible

## Guest Communication

### Sharing the Website
- [ ] Noted final website URL
- [ ] Created short link (optional, using bit.ly or similar)
- [ ] Added website URL to save-the-dates
- [ ] Added website URL to formal invitations
- [ ] Shared on wedding social media (if applicable)
- [ ] Sent email announcement to guest list

### Information for Guests
- [ ] Provided clear RSVP deadline
- [ ] Included troubleshooting contact (email/phone)
- [ ] Mentioned mobile app installation option
- [ ] Highlighted key information (date, venue, dress code)

## Monitoring & Maintenance

### Ongoing Tasks
- [ ] Monitor Google Form responses regularly
- [ ] Send confirmation emails to guests who RSVP
- [ ] Update website if plans change
- [ ] Check for broken links weekly
- [ ] Review analytics (if installed)

### Post-Wedding
- [ ] Upload wedding photos to photos page (future enhancement)
- [ ] Enable photo upload feature (if implementing)
- [ ] Archive RSVP responses
- [ ] Consider keeping site live as a memory
- [ ] Thank you message to guests (optional update)

## Troubleshooting Reference

### Common Issues
- **RSVP not submitting**: Check entry IDs match Google Form
- **PWA not installing**: Ensure HTTPS and valid manifest
- **Service worker errors**: Clear cache and re-register
- **Icons not showing**: Verify files exist in `/icons/`
- **Mobile menu not working**: Check JavaScript console for errors
- **GitHub Pages 404**: Ensure `.nojekyll` file exists

### Support Resources
- GitHub Pages Documentation: https://pages.github.com/
- PWA Checklist: https://web.dev/pwa-checklist/
- Google Forms Help: https://support.google.com/docs/topic/9054603
- Web Accessibility: https://www.w3.org/WAI/

## Sign-Off

### Final Review
- [ ] All items above completed
- [ ] Website reviewed by couple
- [ ] Test RSVP successful
- [ ] Ready to share with guests

**Deployment Date**: _________________

**Live URL**: _________________

**Deployed By**: _________________

---

**Notes**:
