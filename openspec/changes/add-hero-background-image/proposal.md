# Add Hero Background Image

## Why
The hero section currently uses a plain gradient background which lacks visual interest and personalization. Using the couple's photo (`cvi.PNG`) as the hero background will create a more engaging, memorable first impression and better reflect the couple's personality.

## What Changes
- Replace gradient background with `cvi.PNG` image
- Implement adaptive background scaling using iOS-style blur extension technique
- Ensure image displays fully on mobile without cropping
- Apply blur/extend effect on larger screens to fill space naturally
- Maintain text readability with overlay or shadow effects
- Optimize image loading and performance

## Impact
- Affected specs: `hero-styling` (new capability)
- Affected code:
  - `css/main.css` - Update `.hero` background styling
  - `images/cvi.PNG` - Background image (3.7MB)
- Visual: Enhanced hero section with personalized imagery
- Performance: Adds ~3.7MB image (will need optimization)
- User Experience: More engaging landing page, better brand identity
