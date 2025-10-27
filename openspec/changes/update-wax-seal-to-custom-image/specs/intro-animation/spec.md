# Spec: Intro Animation

## MODIFIED Requirements

### Requirement: Visual Design
The system SHALL present the envelope animation with appropriate styling, colors, and visual effects to create an elegant and polished experience, including a custom wax seal image.

#### Scenario: Wax seal uses custom image
- **WHEN** the envelope flips to reveal the back (Stage 2 complete)
- **THEN** the system displays the wax seal using the custom `wax_seal.png` image as the primary visual element
- **AND** applies `background-size: cover` to scale the image appropriately
- **AND** centers the image within the seal container
- **AND** falls back to the gradient background if the image fails to load

#### Scenario: Wax seal with interaction cue
- **WHEN** the envelope flips to reveal the back (Stage 2 complete)
- **THEN** the system displays a wax seal centered on the envelope back using the custom image
- **AND** displays "Tap to open" text overlaid on or near the seal
- **AND** animates a subtle pulse effect (scale 1.0 to 1.05) to indicate interactivity

#### Scenario: Wax seal image is preloaded
- **WHEN** the envelope animation begins at Stage 1
- **THEN** the system preloads the `wax_seal.png` image in the background
- **AND** ensures the image is loaded before Stage 2 (flip) completes
- **AND** uses gradient fallback if image hasn't loaded by Stage 2

#### Scenario: Interaction hints are displayed (when enabled)
- **WHEN** the envelope flip completes and wax seal is visible (Stage 3)
- **AND** the `enableHints` configuration is set to `true`
- **THEN** the system displays subtle interaction hints around the wax seal (pulsing glow or shadow effect)
- **AND** maintains the hint animation until user interacts with the seal
- **AND** respects `prefers-reduced-motion` setting for hint animations

#### Scenario: Interaction hints are hidden after interaction
- **WHEN** the user interacts with the wax seal (click, tap, or keyboard activation)
- **AND** hints are currently displayed
- **THEN** the system immediately removes all hint visual effects
- **AND** proceeds with the envelope opening animation

#### Scenario: Wax seal image scales responsively
- **WHEN** the animation displays on different screen sizes
- **THEN** the wax seal image scales proportionally to the seal container
- **AND** maintains aspect ratio without distortion
- **AND** remains clearly visible on screens from 320px to 2560px width

## ADDED Requirements

### Requirement: Wax Seal Image Loading
The system SHALL preload and display a custom wax seal image, providing fallback behavior if the image fails to load.

#### Scenario: Wax seal image loads successfully
- **WHEN** the animation starts and preloading begins
- **AND** the `wax_seal.png` image successfully loads
- **THEN** the system displays the image as the wax seal background
- **AND** overlays interactive elements (text, pulse animation) on top of the image

#### Scenario: Wax seal image fails to load
- **WHEN** the animation starts and preloading begins
- **AND** the `wax_seal.png` image fails to load or times out
- **THEN** the system displays the CSS gradient fallback as the wax seal
- **AND** logs a warning to the console about the image load failure
- **AND** continues the animation without interruption

#### Scenario: Wax seal image has transparency
- **WHEN** the `wax_seal.png` image has transparent areas
- **THEN** the gradient fallback shows through transparent regions
- **AND** creates a layered visual effect
- **AND** maintains visibility of the seal's clickable nature
