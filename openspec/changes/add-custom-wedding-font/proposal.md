# Add Custom Wedding Font

## Why
The website currently uses generic system fonts. Adding the custom "Weddingday" font will create a more personalized, elegant feel that reflects the couple's wedding aesthetic. The font should be prominently featured on the hero title and navigation brand to establish visual identity.

## What Changes
- Organize font file into proper `/fonts/` directory structure
- Create `@font-face` declaration to load Weddingday font
- Apply Weddingday font to `.hero-title` class for hero section
- Update navigation brand from "S & E" to "Sally & Elisha" with stacked layout
- Apply Weddingday font to `.nav-brand` class
- Update CSS variables to reference the custom font
- Ensure responsive styling for the updated navigation brand

## Impact
- Affected specs: `typography` (new capability)
- Affected code: 
  - `css/variables.css` - Add font-family variable
  - `css/main.css` - Add @font-face and apply to classes
  - `index.html` - Update nav-brand text
  - `details.html` - Update nav-brand text
  - `rsvp.html` - Update nav-brand text
  - `photos.html` - Update nav-brand text
- Performance: Adds ~100-200KB font file to initial load
- Visual: Enhances brand identity and visual appeal
