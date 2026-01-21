/**
 * ButtonAnimation Playground - Type Definitions
 *
 * Flat configuration interface for playground controls.
 * Transformed to nested component props before rendering.
 *
 * @module playground/button-animation
 */

import type {
  EaseType,
  EntryDirection,
  EntryOrder,
  OrchestrationWhen,
  StaggerDirection,
  GapSize,
  ButtonVariant,
  ButtonSize,
  ButtonRoundness,
} from '@/components/ui/prod/base/button-animation'

// =============================================================================
// PLAYGROUND CONFIG
// =============================================================================

/**
 * Flat playground configuration for control panel.
 * Each property maps directly to a control.
 */
export interface PlaygroundConfig {
  // -------------------------------------------------------------------------
  // Parent Animation
  // -------------------------------------------------------------------------
  /** Parent animation duration in ms (when ease is not spring) */
  parentDuration: number
  /** Parent easing function */
  parentEase: EaseType
  /** Parent spring stiffness */
  parentStiffness: number
  /** Parent spring damping */
  parentDamping: number
  /** Parent exit duration in ms */
  parentExitDuration: number
  /** Parent-child orchestration timing */
  parentWhen: OrchestrationWhen

  // -------------------------------------------------------------------------
  // Child Animation
  // -------------------------------------------------------------------------
  /** Initial delay before children start (ms) */
  childDelay: number
  /** Stagger between children (ms) */
  childStagger: number
  /** Child animation duration in ms (when ease is not spring) */
  childDuration: number
  /** Child easing function */
  childEase: EaseType
  /** Child spring stiffness */
  childStiffness: number
  /** Child spring damping */
  childDamping: number
  /** Direction from which children enter */
  childEntryDirection: EntryDirection
  /** Distance children travel on entry (px) */
  childEntryDistance: number
  /** Order of child entry */
  childEntryOrder: EntryOrder
  /** Direction of stagger delay */
  childStaggerDirection: StaggerDirection
  /** Child exit duration in ms */
  childExitDuration: number

  // -------------------------------------------------------------------------
  // Style
  // -------------------------------------------------------------------------
  /** Parent collapsed variant */
  parentVariant: ButtonVariant
  /** Parent expanded variant */
  parentExpandedVariant: ButtonVariant
  /** Child default variant */
  childVariant: ButtonVariant
  /** Child selected variant */
  childSelectedVariant: ButtonVariant
  /** "All" button variant */
  allButtonVariant: ButtonVariant
  /** "All" button offset (negative px) */
  allButtonOffset: number
  /** Button size */
  size: ButtonSize
  /** Button roundness */
  roundness: ButtonRoundness
  /** Gap between chips */
  gap: GapSize
  /** Render chips as links */
  asLink: boolean

  // -------------------------------------------------------------------------
  // Options
  // -------------------------------------------------------------------------
  /** Show index numbers on chips */
  showNumbers: boolean
  /** Show inline reset button */
  showInlineReset: boolean
}

// =============================================================================
// PRESET TYPE
// =============================================================================

export interface PlaygroundPreset {
  id: string
  name: string
  description: string
  data: Partial<PlaygroundConfig>
}
