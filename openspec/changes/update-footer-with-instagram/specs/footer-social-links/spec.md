# Footer Social Links Capability

## ADDED Requirements

### Requirement: Instagram Profile Links
The system SHALL display Instagram profile links for both Sally and Elisha in the footer.

#### Scenario: Footer displays both Instagram profiles
- **WHEN** a user views the footer on any page of the website
- **THEN** Elisha's Instagram profile link (@_mawson) is displayed
- **AND** Sally's Instagram profile link (@zixinzhang920) is displayed
- **AND** both links are visually distinct and clickable
- **AND** both profiles are displayed with equal visual prominence

#### Scenario: Instagram links open correct profiles
- **WHEN** a user clicks on Elisha's Instagram link
- **THEN** the link opens https://instagram.com/_mawson
- **AND** the link opens in a new browser tab
- **AND** the original wedding website tab remains open

#### Scenario: Sally's Instagram link functionality
- **WHEN** a user clicks on Sally's Instagram link
- **THEN** the link opens https://instagram.com/zixinzhang920
- **AND** the link opens in a new browser tab
- **AND** the original wedding website tab remains open

### Requirement: Instagram Icon Display
The system SHALL display Instagram icons alongside each username for visual recognition.

#### Scenario: Icons appear with usernames
- **WHEN** a user views the footer
- **THEN** an Instagram icon appears next to each username
- **AND** the icons are properly aligned with the text
- **AND** the icons use the same color as the text
- **AND** the icons are scalable and render clearly

#### Scenario: Icons respond to hover states
- **WHEN** a user hovers over an Instagram link
- **THEN** both the icon and username change color together
- **AND** the color transition is smooth and consistent
- **AND** the hover color matches the site's secondary theme color (gold)

### Requirement: Cursive Font Typography
The system SHALL apply the Weddingday cursive font to Instagram usernames for elegant styling.

#### Scenario: Usernames display in Weddingday font
- **WHEN** a user views Instagram usernames in the footer
- **THEN** both usernames are rendered in the Weddingday cursive font
- **AND** the font size is appropriate for readability (approximately 20px)
- **AND** the text is legible and maintains the wedding aesthetic
- **AND** fallback fonts are used if Weddingday fails to load

#### Scenario: Font consistency with site branding
- **WHEN** comparing footer typography to other branded elements
- **THEN** the Instagram usernames use the same Weddingday font as the hero title
- **AND** the Instagram usernames use the same Weddingday font as the navigation brand
- **AND** the overall typography creates a cohesive visual identity

### Requirement: Responsive Footer Layout
The system SHALL adjust footer layout based on screen size for optimal display.

#### Scenario: Desktop horizontal layout
- **WHEN** the footer is viewed on screens 768px wide or larger
- **THEN** the two Instagram profiles are displayed side-by-side horizontally
- **AND** there is adequate spacing between the two profiles
- **AND** both profiles are centered in the footer
- **AND** the layout is balanced and symmetrical

#### Scenario: Mobile vertical layout
- **WHEN** the footer is viewed on screens smaller than 768px
- **THEN** the two Instagram profiles are stacked vertically
- **AND** each profile is centered within the footer
- **AND** there is adequate spacing between the stacked profiles
- **AND** both profiles remain fully visible without horizontal scrolling

#### Scenario: Footer adapts to device orientation changes
- **WHEN** a mobile device is rotated from portrait to landscape
- **THEN** the footer layout adjusts appropriately
- **AND** the layout transition is smooth
- **AND** content remains readable and properly aligned

### Requirement: Cross-Page Footer Consistency
The system SHALL maintain identical footer styling and functionality across all pages.

#### Scenario: Footer appears on all pages
- **WHEN** a user navigates to index.html (home page)
- **THEN** the Instagram footer is displayed with both profiles
- **WHEN** a user navigates to details.html
- **THEN** the Instagram footer is displayed identically
- **WHEN** a user navigates to rsvp.html
- **THEN** the Instagram footer is displayed identically
- **WHEN** a user navigates to photos.html
- **THEN** the Instagram footer is displayed identically

#### Scenario: Footer styling consistency
- **WHEN** comparing footers across different pages
- **THEN** the background color is identical on all pages
- **AND** the font styles are identical on all pages
- **AND** the layout and spacing are identical on all pages
- **AND** the hover effects behave identically on all pages

### Requirement: Footer Accessibility
The system SHALL ensure footer social links are accessible to all users.

#### Scenario: Screen reader announces links correctly
- **WHEN** a screen reader user navigates to the footer
- **THEN** each Instagram link is announced with clear context
- **AND** the link purpose is identified (e.g., "Visit Elisha's Instagram profile")
- **AND** Instagram icons are hidden from screen readers (marked with aria-hidden)
- **AND** usernames are announced clearly

#### Scenario: Keyboard navigation support
- **WHEN** a user navigates the footer using keyboard only
- **THEN** both Instagram links can be reached via Tab key
- **AND** focus indicators are clearly visible on focused links
- **AND** links can be activated using Enter key
- **AND** tab order is logical (left to right or top to bottom)

#### Scenario: Color contrast compliance
- **WHEN** measuring color contrast in the footer
- **THEN** text meets WCAG AA standards (4.5:1 minimum)
- **AND** icons meet WCAG AA standards for graphical objects
- **AND** hover state colors maintain sufficient contrast
- **AND** links remain distinguishable from background

### Requirement: Link Security
The system SHALL implement secure external link practices for Instagram profiles.

#### Scenario: Links prevent security vulnerabilities
- **WHEN** Instagram links are opened in a new tab
- **THEN** links include `rel="noopener"` attribute to prevent window.opener access
- **AND** links include `rel="noreferrer"` attribute to protect privacy
- **AND** no sensitive information is passed to Instagram via referrer
- **AND** the original site is protected from potential tabnapping attacks

#### Scenario: Mobile app integration
- **WHEN** a user clicks an Instagram link on a mobile device with Instagram app installed
- **THEN** the link behavior respects device settings
- **AND** the experience is seamless for users who prefer the app
- **AND** users without the app are directed to Instagram's mobile web

### Requirement: Footer Visual Styling
The system SHALL maintain the wedding theme aesthetic in footer social links.

#### Scenario: Color scheme matches site theme
- **WHEN** a user views the footer
- **THEN** the footer background uses the primary color (#8B7355)
- **AND** text and icons use white color for contrast
- **AND** hover states use the secondary gold color (#E5C158)
- **AND** the overall color palette is consistent with the site

#### Scenario: Spacing and layout balance
- **WHEN** viewing the footer layout
- **THEN** adequate padding surrounds all footer content
- **AND** spacing between icon and username is visually balanced
- **AND** spacing between the two profiles is appropriate
- **AND** the footer doesn't feel cramped or too sparse

#### Scenario: Visual hierarchy in footer
- **WHEN** comparing footer elements to rest of page
- **THEN** the footer is visually distinct as a footer section
- **AND** Instagram links are the primary focus of the footer
- **AND** the cursive font creates visual interest
- **AND** the footer complements but doesn't overshadow main content

## REMOVED Requirements

### Requirement: Footer Copyright Information
The system NO LONGER displays copyright information in the footer.

#### Scenario: Copyright text removed from all pages
- **WHEN** a user views the footer on any page
- **THEN** the copyright text "© 2026 Sally & Elisha. All rights reserved." is not present
- **AND** no alternative copyright notice is displayed

### Requirement: Footer Email Contact
The system NO LONGER displays email contact information in the footer.

#### Scenario: Email link removed from all pages
- **WHEN** a user views the footer on any page
- **THEN** the contact email "elisha.mawson14@gmail.com" is not displayed
- **AND** no alternative email link is provided
- **AND** Instagram serves as the primary contact method
