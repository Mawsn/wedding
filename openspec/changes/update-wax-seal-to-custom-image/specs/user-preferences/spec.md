# Spec: User Preferences

## MODIFIED Requirements

### Requirement: Additional Animation Settings
The system SHALL provide configurable settings for animation behavior including auto-dismiss timeout, motion preference respect, and interaction hints.

#### Scenario: Auto-dismiss duration is configurable
- **WHEN** the animation configuration includes `autoPlayDuration: 15000`
- **AND** the animation reaches Stage 3 (wax seal)
- **AND** the user does not interact for the specified duration (15 seconds)
- **THEN** the system automatically triggers the opening sequence

#### Scenario: Motion preference respect is configurable
- **WHEN** the animation configuration includes `respectReducedMotion: true`
- **AND** user has `prefers-reduced-motion: reduce` set
- **THEN** the system skips the animation entirely

#### Scenario: Motion preference respect can be disabled
- **WHEN** the animation configuration includes `respectReducedMotion: false`
- **AND** user has `prefers-reduced-motion: reduce` set
- **THEN** the system still displays the animation
- **AND** logs a warning noting that accessibility preference is being overridden

#### Scenario: Interaction hints can be enabled
- **WHEN** the animation configuration includes `enableHints: true`
- **AND** the animation reaches Stage 3 (wax seal visible)
- **THEN** the system displays visual hints around the wax seal to encourage interaction
- **AND** hints remain visible until user interacts with the seal

#### Scenario: Interaction hints can be disabled
- **WHEN** the animation configuration includes `enableHints: false`
- **AND** the animation reaches Stage 3 (wax seal visible)
- **THEN** the system does NOT display any additional visual hints
- **AND** relies only on the pulse animation and "Tap to open" text

#### Scenario: Hints respect reduced motion preference
- **WHEN** the animation configuration includes `enableHints: true`
- **AND** user has `prefers-reduced-motion: reduce` set
- **THEN** the system either skips hint animations or uses static hints without motion
- **AND** ensures hints don't violate accessibility preferences

## ADDED Requirements

### Requirement: Interaction Hints Configuration
The system SHALL provide a configuration option to enable or disable visual hints that guide users to interact with the wax seal.

#### Scenario: Hints configuration is easily accessible
- **WHEN** a developer opens the animation module file (`js/modules/invitation-animation.js`)
- **THEN** the configuration object includes an `enableHints` boolean property
- **AND** contains clear inline comments explaining hint behavior
- **AND** defaults to `true` for better user experience

#### Scenario: Hints configuration validation
- **WHEN** the animation module initializes
- **AND** the `enableHints` property is missing or has an invalid value (non-boolean)
- **THEN** the system defaults to `enableHints: true`
- **AND** logs a warning about the invalid configuration

#### Scenario: Hints can be toggled at runtime
- **WHEN** a developer changes the `ANIMATION_CONFIG.enableHints` value
- **AND** reloads the page
- **THEN** the hint behavior reflects the new configuration value
- **AND** no code changes beyond configuration are needed
