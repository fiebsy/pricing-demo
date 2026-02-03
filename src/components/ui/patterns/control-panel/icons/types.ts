// =============================================================================
// Section Icon Types
// =============================================================================
// Type definitions for section and group icon mapping.
// =============================================================================

/**
 * Section type identifiers for automatic icon mapping.
 * Use these when defining sections to get automatic icon assignment.
 */
export type SectionType =
  // Content sections
  | 'typography'
  | 'colors'
  | 'borders'
  | 'radius'
  // Effects sections
  | 'shine'
  | 'gradients'
  | 'shadows'
  // Motion sections
  | 'animation'
  | 'transitions'
  // Layout sections
  | 'spacing'
  | 'layout'
  | 'sizing'
  // State sections
  | 'display'
  | 'states'
  | 'interactions'
  // Utility sections
  | 'debug'
  | 'preset'
  | 'settings'
  | 'custom'
