/**
 * Question Command Menu Playground - Type Definitions
 *
 * Types for the integrated command menu + edit questions interface.
 * Uses V4 slot architecture for composable content areas.
 *
 * @module playground/question-command-menu
 */

import type { BiaxialExpandConfig } from '@/components/ui/features/command-menu'

// =============================================================================
// QUESTION TYPES
// =============================================================================

/** Status of a question in the list */
export type QuestionStatus = 'pending' | 'answered' | 'orphaned'

/** An answer generated for a question */
export interface Answer {
  id: string
  text: string
  confidence: number // 0-1 scale
  generatedAt: Date
}

/** A question in the Q/A system */
export interface Question {
  id: string
  text: string
  status: QuestionStatus
  answer?: Answer
}

// =============================================================================
// VIEW STATE
// =============================================================================

/**
 * Current view mode for the command menu
 * - 'add': Input field empty/typing, bottom shows suggested questions dropdown
 * - 'list': Shows existing questions list (when there are questions)
 * - 'detail': Question selected, shows answer above and actions below
 */
export type ViewMode = 'add' | 'list' | 'detail'

/** Visual state for answer preview component */
export type AnswerState = 'idle' | 'loading' | 'success' | 'orphaned'

// =============================================================================
// SUGGESTION TYPES
// =============================================================================

/** A question suggestion for the dropdown */
export interface QuestionSuggestion {
  id: string
  text: string
}

// =============================================================================
// PLAYGROUND CONFIG
// =============================================================================

/** Animation timing presets */
export type AnimationPreset = 'snappy' | 'smooth' | 'bouncy'

/** Layout variant presets */
export type LayoutVariant = 'compact' | 'standard' | 'spacious'

/**
 * Playground configuration for the question command menu.
 * Controls both the V4 expand behavior and the question/answer UI.
 */
export interface PlaygroundConfig {
  // ---------------------------------------------------------------------------
  // V4 Expand Config (partial)
  // ---------------------------------------------------------------------------
  /** Trigger width (px) */
  triggerWidth: number
  /** Trigger height (px) */
  triggerHeight: number
  /** Panel width when expanded (px) */
  panelWidth: number
  /** Max height for bottom content (px) */
  maxBottomHeight: number
  /** Border radius (px) */
  borderRadius: number
  /** Top gap between trigger and top slot (px) */
  topGap: number
  /** Bottom gap between trigger and bottom slot (px) */
  bottomGap: number

  // ---------------------------------------------------------------------------
  // Animation
  // ---------------------------------------------------------------------------
  /** Animation preset */
  animationPreset: AnimationPreset
  /** Expand duration (ms) */
  expandDuration: number
  /** Collapse duration (ms) */
  collapseDuration: number
  /** Enable slot container animations */
  animateSlots: boolean

  // ---------------------------------------------------------------------------
  // Top Slot (Answer Preview)
  // ---------------------------------------------------------------------------
  /** Enable top slot */
  topSlotEnabled: boolean
  /** Top slot height (px) */
  topSlotHeight: number
  /** Top slot background */
  topSlotBackground: 'none' | 'primary' | 'secondary' | 'tertiary'

  // ---------------------------------------------------------------------------
  // Bottom Slot (Actions or List)
  // ---------------------------------------------------------------------------
  /** Enable bottom slot */
  bottomSlotEnabled: boolean
  /** Bottom slot background */
  bottomSlotBackground: 'none' | 'primary' | 'secondary' | 'tertiary'

  // ---------------------------------------------------------------------------
  // Question/Answer Behavior
  // ---------------------------------------------------------------------------
  /** Simulated response type */
  responseType: 'good' | 'lousy' | 'unsure'
  /** Response delay (ms) */
  responseDelay: number
  /** Max questions allowed */
  maxQuestions: number

  // ---------------------------------------------------------------------------
  // Suggestions (Add mode)
  // ---------------------------------------------------------------------------
  /** Show suggestions dropdown in add mode */
  showSuggestions?: boolean
  /** Max suggestions to show */
  maxSuggestions?: number
}

// =============================================================================
// PRESET TYPE
// =============================================================================

export interface PlaygroundPreset {
  id: string
  name: string
  description: string
  data: PlaygroundConfig
}

// =============================================================================
// PANEL STATE (for control panel)
// =============================================================================

export interface PanelState {
  config: PlaygroundConfig
  activePresetId: string | null
}
