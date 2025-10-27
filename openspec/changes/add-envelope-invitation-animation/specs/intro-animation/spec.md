# Spec: Intro Animation

## ADDED Requirements

### Requirement: Envelope Animation Sequence
The system SHALL display a three-stage animated envelope opening sequence when a first-time visitor loads `index.html`, presenting the wedding invitation in a delightful and engaging manner.

#### Scenario: First-time visitor sees complete animation
- **WHEN** a user visits `index.html` for the first time
- **AND** animation is enabled via configuration (`animationOn = true`)
- **AND** user has not disabled motion preferences (`prefers-reduced-motion: no-preference`)
- **THEN** the system displays a full-screen overlay with blurred/greyed background
- **AND** animates a cream-colored envelope with "Sally and Elisha Wedding Invitation" text (Stage 1: Spotlight, 0-1.5s)
- **AND** flips the envelope to reveal the back with a wax seal (Stage 2: Flip, 1.5-3s)
- **AND** displays "Tap to open" text with a pulsing wax seal awaiting user interaction
- **AND** marks the visitor as having seen the animation in localStorage

#### Scenario: User taps wax seal to open envelope
- **WHEN** the envelope animation is at the wax seal stage (Stage 3)
- **AND** the user taps/clicks on the wax seal element
- **THEN** the system animates the envelope top flap opening upward (Stage 4: Opening, ~1s)
- **AND** slides the invitation card (`/images/invite.JPG`) out from the envelope (Stage 5: Slide out, ~1.5s)
- **AND** scales up and displays the invitation prominently
- **AND** after a 2-second display, fades out the overlay
- **AND** reveals the main website content beneath

#### Scenario: User skips animation via skip button
- **WHEN** the envelope animation is playing at any stage
- **AND** the user clicks/taps the skip button in the top-right corner
- **THEN** the system immediately halts all animations
- **AND** removes the animation overlay
- **AND** displays the main website content
- **AND** marks the visitor as having seen the animation

#### Scenario: Animation auto-dismisses after timeout
- **WHEN** the envelope animation reaches the wax seal stage (Stage 3)
- **AND** the user does not interact with the wax seal for 15 seconds
- **THEN** the system automatically triggers the opening sequence
- **AND** proceeds with the complete animation to reveal the invitation
- **AND** completes the animation flow as if the user had tapped the seal

### Requirement: Performance Optimization
The system SHALL ensure the envelope animation performs smoothly on older smartphones (4-5 years old) by using GPU-accelerated CSS properties and optimizing animation techniques.

#### Scenario: Animation uses only GPU-accelerated properties
- **WHEN** the envelope animation is executing
- **THEN** the system uses only CSS `transform` (translate, scale, rotate) and `opacity` properties for all animations
- **AND** avoids layout-triggering properties such as `left`, `top`, `width`, `height`, `margin`, `padding`

#### Scenario: Will-change optimization lifecycle
- **WHEN** an animation stage begins
- **THEN** the system applies `will-change: transform, opacity` to the animating elements
- **AND** when the animation stage completes, removes the `will-change` property to free GPU memory

#### Scenario: Invitation image is lazy-loaded
- **WHEN** the envelope animation begins at Stage 1
- **THEN** the system starts preloading `/images/invite.JPG` in the background
- **AND** the image is fully loaded before Stage 5 (invitation slide-out)
- **AND** if the image fails to load, displays a fallback text-only invitation message

### Requirement: Visual Design
The system SHALL present the envelope animation with appropriate styling, colors, and visual effects to create an elegant and polished experience.

#### Scenario: Full-screen overlay with background blur
- **WHEN** the envelope animation is active
- **THEN** the system displays a full-screen overlay (z-index above main content)
- **AND** applies a backdrop-filter blur (8-12px) to the underlying page content
- **AND** applies a semi-transparent dark overlay (rgba(0, 0, 0, 0.5)) for contrast

#### Scenario: Cream envelope with proper styling
- **WHEN** the envelope appears in Stage 1 (Spotlight)
- **THEN** the system displays a cream/beige colored envelope (#F5F5DC or similar)
- **AND** centers the envelope on screen with appropriate sizing (max 600px width on desktop, 90% width on mobile)
- **AND** displays "Sally and Elisha Wedding Invitation" text overlaid on the envelope front
- **AND** uses appropriate typography (wedding font or elegant serif)

#### Scenario: Wax seal with interaction cue
- **WHEN** the envelope flips to reveal the back (Stage 2 complete)
- **THEN** the system displays a circular wax seal centered on the envelope back
- **AND** applies a red/burgundy color (#8B0000 or similar) to the seal
- **AND** displays "Tap to open" text beneath or inside the seal
- **AND** animates a subtle pulse effect (scale 1.0 to 1.05) to indicate interactivity

#### Scenario: Skip button is clearly visible
- **WHEN** the envelope animation is active
- **THEN** the system displays a "Skip" button in the top-right corner
- **AND** styles the button with high contrast (white text on dark background or vice versa)
- **AND** ensures minimum tap target size of 44x44 pixels for mobile accessibility
- **AND** button remains visible and accessible throughout all animation stages

### Requirement: Animation Timing and Sequencing
The system SHALL coordinate animation stages with appropriate timing, transitions, and easing functions to create a smooth and natural flow.

#### Scenario: Stage 1 - Spotlight entrance timing
- **WHEN** the envelope animation begins
- **THEN** the overlay fades in over 0.3 seconds
- **AND** the envelope scales from 0.8 to 1.0 with fade-in over 1.2 seconds
- **AND** uses `ease-out` easing function for natural deceleration

#### Scenario: Stage 2 - Flip transition timing
- **WHEN** Stage 1 completes (at 1.5s mark)
- **THEN** the envelope flips 180° around Y-axis over 1.5 seconds
- **AND** uses `ease-in-out` easing for smooth rotation
- **AND** maintains 3D perspective transform for depth effect

#### Scenario: Stage 3 - Wax seal pulse animation
- **WHEN** the envelope flip completes and back is visible
- **THEN** the wax seal begins a continuous pulse animation
- **AND** scales from 1.0 to 1.05 and back over 2 seconds
- **AND** repeats infinitely until user interaction or timeout

#### Scenario: Stage 4 - Envelope opening timing
- **WHEN** user taps wax seal or auto-dismiss triggers
- **THEN** the envelope top flap rotates upward around X-axis over 1.0 second
- **AND** uses `ease-out` easing function

#### Scenario: Stage 5 - Invitation slide-out timing
- **WHEN** envelope opening completes
- **THEN** the invitation card translates upward (Y-axis) out of the envelope over 1.5 seconds
- **AND** scales from 0.6 to 1.0 simultaneously
- **AND** uses `ease-out` easing for smooth emergence
- **AND** invitation remains displayed for 2 seconds before final fade-out

#### Scenario: Stage 6 - Cleanup and dismissal
- **WHEN** the invitation has been displayed for 2 seconds
- **THEN** the entire overlay fades out over 0.5 seconds
- **AND** removes the animation DOM elements from the page
- **AND** removes all `will-change` properties
- **AND** reveals the main website content

### Requirement: Accessibility Support
The system SHALL respect user accessibility preferences and provide alternative interaction methods for the envelope animation.

#### Scenario: Reduced motion preference disables animation
- **WHEN** a user has `prefers-reduced-motion: reduce` set in their browser/OS
- **THEN** the system skips the envelope animation entirely
- **AND** immediately displays the main website content
- **AND** still marks the user as having "seen" the animation to prevent future attempts

#### Scenario: Keyboard navigation for skip button
- **WHEN** the envelope animation is active
- **AND** the user presses the Tab key
- **THEN** focus moves to the skip button
- **AND** pressing Enter or Space key activates the skip functionality

#### Scenario: Keyboard activation of wax seal
- **WHEN** the animation is at Stage 3 (wax seal visible)
- **AND** the wax seal element has focus
- **AND** the user presses Enter or Space key
- **THEN** the system triggers the envelope opening sequence as if tapped

#### Scenario: Escape key dismisses animation
- **WHEN** the envelope animation is active at any stage
- **AND** the user presses the Escape key
- **THEN** the system immediately skips the animation and shows main content

#### Scenario: Screen reader announcements
- **WHEN** the envelope animation transitions between stages
- **THEN** the system updates an ARIA live region with descriptive text
- **AND** announces "Wedding invitation animation playing. Press Escape to skip." at start
- **AND** announces "Tap the wax seal to open the invitation" at Stage 3
- **AND** announces "Invitation revealed" at Stage 5

### Requirement: Animation State Management
The system SHALL maintain proper state throughout the animation lifecycle, handling edge cases and cleanup appropriately.

#### Scenario: Animation state machine tracks current stage
- **WHEN** the envelope animation is executing
- **THEN** the system maintains a state variable indicating the current stage (spotlight, flip, sealed, opening, slideout, complete)
- **AND** prevents duplicate stage transitions
- **AND** ignores user interactions that are not valid for the current state

#### Scenario: Cleanup after animation completion
- **WHEN** the envelope animation completes (either naturally or via skip)
- **THEN** the system removes all animation-related DOM elements
- **AND** removes all event listeners attached to animation elements
- **AND** removes `will-change` CSS properties
- **AND** clears any animation timeouts or intervals

#### Scenario: User navigates away mid-animation
- **WHEN** the envelope animation is active
- **AND** the user navigates to a different page or refreshes
- **THEN** the system has already marked the user as having seen the animation
- **AND** on subsequent visits, the animation does not replay

#### Scenario: Multiple rapid skip attempts are handled gracefully
- **WHEN** the user clicks the skip button multiple times rapidly
- **THEN** the system processes only the first click
- **AND** prevents duplicate cleanup or state corruption
- **AND** successfully transitions to main content only once

### Requirement: Mobile Responsiveness
The system SHALL adapt the envelope animation for different screen sizes and orientations, ensuring a good experience on mobile devices.

#### Scenario: Envelope sizing on mobile portrait
- **WHEN** the animation displays on a mobile device in portrait orientation (max-width: 768px)
- **THEN** the envelope width is set to 90% of viewport width
- **AND** envelope height scales proportionally
- **AND** text sizing adjusts for readability

#### Scenario: Envelope sizing on mobile landscape
- **WHEN** the animation displays on a mobile device in landscape orientation (max-height: 500px)
- **THEN** the envelope sizing is based on viewport height
- **AND** envelope is constrained to fit within visible area
- **AND** skip button remains visible and accessible

#### Scenario: Envelope sizing on desktop
- **WHEN** the animation displays on desktop (min-width: 1024px)
- **THEN** the envelope has a maximum width of 600px
- **AND** is centered horizontally and vertically
- **AND** maintains aspect ratio appropriate for standard envelope dimensions

#### Scenario: Touch interaction for mobile
- **WHEN** the animation displays on a touch-enabled device
- **THEN** all interactive elements (wax seal, skip button) have minimum 44x44px tap targets
- **AND** touch events are properly handled (touchstart/touchend)
- **AND** prevents default touch behaviors that might interfere (like text selection)
