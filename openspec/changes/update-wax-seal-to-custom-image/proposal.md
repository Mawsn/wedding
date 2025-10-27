# Proposal: Update Wax Seal to Custom Image

## Why
The current envelope animation uses a generic red radial gradient for the wax seal. To make the animation more personal and visually authentic, we want to replace it with a custom wax seal image (`wax_seal.png`) that's already available in the `/images` directory. Additionally, we want to add optional visual hints to guide users to tap the seal, with a configuration toggle for enabling/disabling these hints.

## What Changes
- Replace the CSS radial gradient wax seal with the custom `wax_seal.png` image (254KB)
- Maintain all existing functionality (click/tap interaction, pulse animation, keyboard accessibility)
- Add optional interaction hints (subtle animations, glow effects, or text indicators)
- Add `enableHints` configuration flag in the animation module to toggle hints on/off
- Ensure the image-based seal works responsively across all device sizes
- Keep the "Tap to Open" text as an accessible fallback or enhancement
- Optimize image loading and ensure it doesn't impact animation performance

## Impact
- Affected specs:
  - `intro-animation` (MODIFIED) - Update wax seal visual design requirement to use custom image
  - `user-preferences` (MODIFIED) - Add hints configuration option
- Affected code:
  - `css/components/invitation-animation.css` - Replace gradient styles with image background, add hint styles
  - `js/modules/invitation-animation.js` - Add `enableHints` config flag, conditional hint behavior
  - `index.html` - Potentially update HTML structure for hints (if needed)
- Performance considerations:
  - 254KB image should be preloaded along with invitation image
  - May need to compress or optimize the PNG for faster loading
  - Consider WebP format with PNG fallback for better compression
- User experience:
  - More personalized and authentic visual appearance
  - Hints provide clearer interaction cues for users who may not understand the seal is clickable
  - Configuration allows easy disabling of hints if they're too intrusive
