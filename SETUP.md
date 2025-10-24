# Quick Start Guide

Welcome! This guide will help you get your wedding website up and running quickly.

## Immediate Next Steps

### 1. Generate Icons (5 minutes)
1. Open `icon-generator.html` in your browser
2. Click each "Download" button to save the icons
3. Save all icons to the `/icons/` directory
4. Later, you can replace these with custom-designed icons

### 2. Customize Your Content (15 minutes)
Edit the HTML files to match your wedding:

#### `index.html`
- Line 21: Update couple names in `<title>`
- Line 35: Update initials in nav brand (`S & E`)
- Line 48-49: Update couple names
- Line 51: Update wedding date
- Line 54: Update location
- Line 67-86: Update welcome message and quick info

#### `details.html`
- Update the schedule times and descriptions
- Update venue names and addresses
- Update practical information (dress code, parking, etc.)
- Add your Google Maps links for directions

#### `rsvp.html`
- Update RSVP deadline date (line 50)
- Update contact email (line 171)

#### `photos.html`
- Customize the coming soon message if desired

### 3. Set Up Google Forms (20 minutes)

#### Create Your Google Form
1. Go to [https://forms.google.com](https://forms.google.com)
2. Create a new form titled "Wedding RSVP"
3. Add these questions in order:

   **Question 1: Full Name**
   - Type: Short answer
   - Required: Yes

   **Question 2: Email Address**
   - Type: Short answer
   - Required: Yes

   **Question 3: Phone Number**
   - Type: Short answer
   - Required: No

   **Question 4: Will you be attending?**
   - Type: Multiple choice
   - Options: 
     - Yes, I'll be there!
     - Sorry, I can't make it
   - Required: Yes

   **Question 5: Number of Guests**
   - Type: Short answer
   - Required: No

   **Question 6: Dietary Requirements**
   - Type: Paragraph
   - Required: No

   **Question 7: Message to the Couple**
   - Type: Paragraph
   - Required: No

#### Get Form URL and Entry IDs
1. Click "Send" → Copy the form link
2. Open the form link in a new browser tab
3. Right-click → "View Page Source"
4. Search for "entry." - you'll see things like `entry.123456789`
5. Note down each entry ID for each question in order

#### Update Your Website
1. Open `js/modules/rsvp.js`
2. Find the `GOOGLE_FORM_CONFIG` object (around line 8)
3. Update `formUrl`: Change `/viewform` to `/formResponse` in your form URL
4. Update the entry IDs:
   ```javascript
   fields: {
     name: 'entry.YOUR_NAME_ID',
     email: 'entry.YOUR_EMAIL_ID',
     phone: 'entry.YOUR_PHONE_ID',
     attendance: 'entry.YOUR_ATTENDANCE_ID',
     guests: 'entry.YOUR_GUESTS_ID',
     dietary: 'entry.YOUR_DIETARY_ID',
     message: 'entry.YOUR_MESSAGE_ID'
   }
   ```
5. Open `rsvp.html`
6. Replace all `entry.NAME_ID`, `entry.EMAIL_ID`, etc. with your actual entry IDs

### 4. Customize Theme Colors (5 minutes)
1. Open `css/variables.css`
2. Update the colors at the top:
   ```css
   --color-primary: #8B7355;        /* Your main wedding color */
   --color-secondary: #D4AF37;      /* Your accent color */
   ```
3. Update `manifest.json` line 6 with your primary color

### 5. Test Locally (5 minutes)
1. Open a terminal in the project directory
2. Run a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Or Node.js
   npx http-server
   ```
3. Open `http://localhost:8000` in your browser
4. Test all pages and navigation
5. Test the RSVP form submission

### 6. Deploy to GitHub Pages (10 minutes)
1. Commit all your changes:
   ```bash
   git add .
   git commit -m "Set up wedding website"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click "Settings"
   - Click "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   
3. Your site will be live at:
   ```
   https://mawsn.github.io/wedding/
   ```
   (May take a few minutes to deploy)

4. Test your live site:
   - Visit the URL
   - Test on mobile and desktop
   - Submit a test RSVP
   - Check your Google Form responses

### 7. Share With Guests! 🎉
Once everything is tested and working:
1. Share your website URL with guests
2. Monitor RSVP responses in your Google Form
3. Enjoy planning your special day!

## Optional Enhancements

### Add Custom Domain
1. Buy a domain (e.g., `sallyandelisha.wedding`)
2. Create a `CNAME` file in your repository with your domain
3. Configure DNS with your domain provider
4. Update GitHub Pages settings with custom domain

### Improve Icons
1. Design custom icons in Photoshop/Illustrator
2. Use a professional icon generator
3. Replace the placeholder icons in `/icons/`

### Add Images
1. Add wedding photos to `/images/`
2. Update hero section background in CSS
3. Add gallery on home or details page

### Analytics
1. Sign up for Google Analytics
2. Add tracking code to each HTML page
3. Monitor visitor traffic

## Need Help?

- Check the main `README.md` for detailed documentation
- Review the OpenSpec proposal in `openspec/changes/add-core-wedding-website/`
- Contact: sallyandElisha@wedding.com

## Checklist

- [ ] Icons generated and placed in `/icons/`
- [ ] Content customized (names, dates, venues)
- [ ] Google Form created and integrated
- [ ] Theme colors updated
- [ ] Tested locally
- [ ] Deployed to GitHub Pages
- [ ] Test RSVP submitted successfully
- [ ] Shared with guests

---

**Total setup time: ~60 minutes**

Congratulations on your wedding website! 💍✨
