/**
 * Question Command Menu V4 - Trigger Types
 *
 * Types for the unified trigger component that handles all interaction modes.
 */

import type { TriggerMode } from './state'

// =============================================================================
// BUTTON VISIBILITY
// =============================================================================

/**
 * Extended button visibility predicates
 * Replaces V3's limited 'always' | 'expanded' | 'collapsed' options
 */
export type ButtonVisibility =
  | boolean              // Static: always shown (true) or never (false)
  | 'always'             // Show in all states
  | 'expanded'           // Only when panel is expanded
  | 'collapsed'          // Only when panel is collapsed
  | 'editing'            // Only when input is active (question mode)
  | 'has-value'          // Only when there's input content
  | 'saved'              // Only after save in question mode
  | 'not-saved'          // Only before save in question mode

// =============================================================================
// BUTTON CONFIG
// =============================================================================

export type TriggerButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'shine'
  | 'ghost'
  | 'outline'
  | 'solid'
  | 'primary-destructive'
  | 'secondary-destructive'
  | 'tertiary-destructive'

export type TriggerButtonType = 'icon' | 'text' | 'icon-text' | 'indicator'
export type TriggerButtonSize = 'xs' | 'sm' | 'md'
export type TriggerButtonRoundness = 'default' | 'pill' | 'squircle'

/** Button group for layout purposes */
export type TriggerButtonGroup = 'input-area' | 'actions'

export interface TriggerButtonConfig {
  /** Unique identifier for this button */
  id: string
  /** Position in the trigger */
  position: 'left' | 'right'
  /** Whether button is enabled */
  enabled: boolean
  /** Button display type */
  type: TriggerButtonType
  /** Button variant */
  variant: TriggerButtonVariant
  /** Button size */
  size: TriggerButtonSize
  /** Corner style */
  roundness?: TriggerButtonRoundness
  /** Text label (for text/icon-text types) */
  label?: string
  /** Icon name (for icon/icon-text types) */
  icon?: string
  /** Additional CSS classes */
  className?: string
  /** When to show this button (extended visibility) */
  showWhen?: ButtonVisibility
  /** Action to perform on click */
  action?: TriggerButtonAction
  /** Group for layout purposes - 'input-area' buttons are styled with the input when expanded */
  group?: TriggerButtonGroup
}

// =============================================================================
// BUTTON ACTIONS
// =============================================================================

/**
 * Predefined button actions
 */
export type TriggerButtonAction =
  | 'expand'
  | 'collapse'
  | 'toggle'
  | 'save'
  | 'clear'
  | 'submit'
  | 'cancel'
  | 'edit'
  | { type: 'custom'; handler: string }

// =============================================================================
// TRIGGER CONFIG
// =============================================================================

export interface TriggerConfig {
  /** Default mode for this trigger */
  defaultMode: TriggerMode
  /** Padding */
  paddingLeft: number
  paddingRight: number
  paddingTop: number
  paddingBottom: number
  /** Additional padding when expanded */
  paddingExpandedLeft: number
  paddingExpandedRight: number
  /** Show search icon in input */
  showSearchIcon: boolean
  /** Show keyboard hint when collapsed */
  showKeyboardHint: boolean
  /** Keyboard hint text */
  keyboardHintText: string
  /** Cursor style when collapsed */
  cursor: 'text' | 'pointer'
  /** Buttons in the trigger */
  buttons: TriggerButtonConfig[]
  /** Additional className for input area when expanded (wraps input + 'input-area' group buttons) */
  inputAreaExpandedClassName?: string
}

// =============================================================================
// DISPLAY CONFIG (for question mode)
// =============================================================================

export interface TriggerDisplayConfig {
  /** Placeholder text when no saved value */
  placeholderText: string
  /** Placeholder when adding new */
  addPlaceholderText: string
  /** Text color for saved value */
  savedValueColor: 'primary' | 'secondary' | 'tertiary'
  /** Show edit indicator on hover */
  showEditIndicator: boolean
}

// =============================================================================
// TRIGGER PROPS (for UnifiedTrigger component)
// =============================================================================

export interface UnifiedTriggerProps {
  /** Current mode */
  mode: TriggerMode
  /** Configuration */
  config: TriggerConfig
  /** Display configuration (for question mode) */
  displayConfig?: TriggerDisplayConfig
  /** Current input value */
  value: string
  /** Saved value (for question mode) */
  savedValue: string | null
  /** Is expanded */
  expanded: boolean
  /** Is editing (question mode) */
  editing: boolean
  /** Placeholder text */
  placeholder: string
  /** Callbacks */
  onChange?: (value: string) => void
  onSave?: (value: string) => void
  onExpand?: () => void
  onCollapse?: () => void
  onStartEditing?: () => void
  onCancelEditing?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
}
