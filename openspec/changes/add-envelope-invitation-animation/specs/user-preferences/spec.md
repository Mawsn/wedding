# Spec: User Preferences

## ADDED Requirements

### Requirement: First-Time Visitor Detection
The system SHALL track whether a visitor has previously seen the envelope invitation animation using browser localStorage to avoid replaying the animation on subsequent visits.

#### Scenario: New visitor is detected
- **WHEN** a user visits `index.html`
- **AND** localStorage does not contain a `hasSeenInvitation` key
- **THEN** the system identifies the user as a first-time visitor
- **AND** proceeds to display the envelope animation (if enabled)

#### Scenario: Returning visitor is detected
- **WHEN** a user visits `index.html`
- **AND** localStorage contains `hasSeenInvitation` key with value `true`
- **THEN** the system identifies the user as a returning visitor
- **AND** skips the envelope animation entirely
- **AND** displays the main website content immediately

#### Scenario: Visitor status is marked after animation starts
- **WHEN** the envelope animation begins for a first-time visitor
- **THEN** the system immediately sets `localStorage.setItem('hasSeenInvitation', 'true')`
- **AND** persists this value across browser sessions
- **AND** the value remains until manually cleared by user or browser

#### Scenario: localStorage is unavailable
- **WHEN** the system attempts to access localStorage
- **AND** localStorage is blocked (private browsing mode, browser settings, or security policy)
- **THEN** the system catches the exception gracefully
- **AND** defaults to showing the animation every visit
- **AND** logs a warning to console for debugging purposes

### Requirement: Animation Configuration Toggle
The system SHALL provide a simple configuration flag that allows developers to enable or disable the envelope animation feature entirely without removing code.

#### Scenario: Animation is enabled via configuration
- **WHEN** the animation module configuration has `enabled: true`
- **AND** a first-time visitor loads `index.html`
- **THEN** the system displays the envelope animation

#### Scenario: Animation is disabled via configuration
- **WHEN** the animation module configuration has `enabled: false`
- **THEN** the system skips the envelope animation for all visitors
- **AND** displays the main website content immediately
- **AND** does not write to localStorage (since animation never attempted)

#### Scenario: Configuration is easily accessible
- **WHEN** a developer opens the animation module file (`js/modules/invitation-animation.js`)
- **THEN** the configuration object is located at the top of the file
- **AND** contains clear inline comments explaining each option
- **AND** includes the `enabled` boolean flag

### Requirement: Additional Animation Settings
The system SHALL provide configurable settings for animation behavior including auto-dismiss timeout and motion preference respect.

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

### Requirement: Developer Override Mechanism
The system SHALL provide a way for developers to reset the first-time visitor status for testing and debugging purposes.

#### Scenario: Manual localStorage clearing for testing
- **WHEN** a developer opens browser DevTools console
- **AND** executes `localStorage.removeItem('hasSeenInvitation')`
- **THEN** the next page load treats the user as a first-time visitor
- **AND** the animation plays again

#### Scenario: Debug mode exposes reset function
- **WHEN** the animation module is loaded
- **AND** a global debug object exists (`window.weddingApp`)
- **THEN** a reset function is available as `window.weddingApp.resetInvitationAnimation()`
- **AND** calling this function clears the localStorage flag
- **AND** logs confirmation to console

#### Scenario: Configuration comments document override method
- **WHEN** a developer reads the configuration object in the animation module
- **THEN** clear comments document how to reset for testing
- **AND** provide example code for manual localStorage clearing
- **AND** explain the expected behavior after clearing

### Requirement: Configuration Validation
The system SHALL validate configuration values and provide sensible defaults if invalid values are provided.

#### Scenario: Invalid autoPlayDuration defaults to safe value
- **WHEN** the animation configuration includes `autoPlayDuration` with a non-numeric value
- **OR** a negative number
- **OR** the value is missing
- **THEN** the system defaults to 15000ms (15 seconds)
- **AND** logs a warning about the invalid configuration

#### Scenario: Missing enabled flag defaults to true
- **WHEN** the animation configuration does not include an `enabled` property
- **THEN** the system defaults to `enabled: true`
- **AND** proceeds with normal animation logic

#### Scenario: Invalid respectReducedMotion defaults to true
- **WHEN** the animation configuration includes `respectReducedMotion` with a non-boolean value
- **OR** the value is missing
- **THEN** the system defaults to `respectReducedMotion: true`
- **AND** respects the user's accessibility preference
