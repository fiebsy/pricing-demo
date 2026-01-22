/**
 * Question Command Menu - Type Definitions
 *
 * Comprehensive configuration for a Question-focused command menu variant.
 * Based on BiaxialExpandV4 architecture with additional styling options.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/question-command-menu
 */

import type * as React from 'react'

// ============================================================================
// BACKGROUND & APPEARANCE TYPES
// ============================================================================

export type BackgroundOption =
  | 'none'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'

export type BorderColorOption =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand'

export type ShineOption =
  | 'none'
  | 'shine-1'
  | 'shine-1-subtle'
  | 'shine-2'
  | 'shine-2-subtle'
  | 'shine-3'
  | 'shine-brand'

export type ShadowOption = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type GradientOption =
  | 'none'
  | 'subtle-depth-sm'
  | 'subtle-depth-md'
  | 'subtle-depth-lg'
  | 'subtle-depth-xl'

export type GradientColorOption =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'gray'

// ============================================================================
// ANIMATION TYPES
// ============================================================================

export type BackdropAnimationMode = 'size' | 'clip-path'
export type ExpandOrigin = 'top' | 'center' | 'bottom'

export interface AnimationConfig {
  /** Duration for expand animation (ms) */
  duration: number
  /** Duration for collapse animation (ms) */
  collapseDuration: number
  /** Content fade duration (ms) */
  contentFadeDuration: number
  /** Content fade delay (ms) */
  contentFadeDelay: number
  /** Backdrop animation mode */
  backdropMode: BackdropAnimationMode
  /** Backdrop delay (ms) */
  backdropDelay: number
  /** Backdrop duration offset (ms) */
  backdropDurationOffset: number
  /** Enable slot container clip-path animation */
  animateSlotContainers: boolean
  /** Slot container delay (ms) */
  slotContainerDelay: number
  /** Slot container duration offset (ms) */
  slotContainerDurationOffset: number
  /** Expansion origin for bottom slot */
  expandOrigin: ExpandOrigin
  /** Expansion origin for top slot (bottom = expands up, top = expands down) */
  topExpandOrigin: ExpandOrigin
}

// ============================================================================
// LAYOUT TYPES
// ============================================================================

export interface LayoutConfig {
  /** Width of collapsed trigger */
  triggerWidth: number
  /** Height of collapsed trigger */
  triggerHeight: number
  /** Width of expanded panel */
  panelWidth: number
  /** Maximum height for top content (enables scrollable content in top slot) */
  maxTopHeight?: number
  /** Maximum height for bottom content */
  maxBottomHeight: number
  /** Border radius for the entire component */
  borderRadius: number
  /** Gap between top slot and trigger */
  topGap: number
  /** Gap between trigger and bottom slot */
  bottomGap: number
  /** Backdrop top offset */
  backdropTopOffset: number
}

// ============================================================================
// APPEARANCE CONFIG
// ============================================================================

export interface AppearanceConfig {
  /** Overall border radius preset */
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Shadow preset */
  shadow: ShadowOption
  /** Shine effect */
  shine: ShineOption
  /** Background color */
  background: BackgroundOption
  /** Depth gradient */
  gradient: GradientOption
  /** Gradient color */
  gradientColor: GradientColorOption
  /** Use squircle corners */
  squircle: boolean
}

// ============================================================================
// SLOT CONFIGS
// ============================================================================

export interface SlotConfig {
  /** Whether this slot is enabled */
  enabled?: boolean
  /** Fixed height for this slot (px) */
  height?: number
  /** Animation delay offset (ms) */
  delayOffset?: number
  /** Animation duration offset (ms) */
  durationOffset?: number
  /** Background option */
  background?: BackgroundOption
  /** Border radius override */
  borderRadius?: number
  /** Inset from container edges */
  inset?: number
  /** Border width */
  borderWidth?: number
  /** Border color */
  borderColor?: BorderColorOption
}

// ============================================================================
// TRIGGER CONFIG (Enhanced for buttons inside input)
// ============================================================================

/**
 * Button variant matching the proper Button component
 * - primary: Brand solid with inner gradient border
 * - secondary: Outlined with skeuomorphic shadow
 * - tertiary: Minimal, no background
 * - shine: Subtle with shine gradient effect
 * - ghost: Legacy - maps to tertiary
 * - outline: Legacy - maps to secondary
 * - solid: Legacy - maps to primary
 */
export type TriggerButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'shine'
  // Legacy variants (for backward compat)
  | 'ghost'
  | 'outline'
  | 'solid'

/**
 * Button element type
 * - icon: Icon only button
 * - text: Text only button
 * - icon-text: Icon + text button
 * - indicator: Non-interactive icon (e.g., arrow for navigation hint)
 */
export type TriggerButtonType = 'icon' | 'text' | 'icon-text' | 'indicator'

export interface TriggerButtonConfig {
  /** Button position */
  position: 'left' | 'right'
  /** Show this button */
  enabled: boolean
  /** Button type */
  type: TriggerButtonType
  /** Button variant (ignored for indicator type) */
  variant: TriggerButtonVariant
  /** Size */
  size: 'sm' | 'md'
  /** Roundness - default, pill, or squircle */
  roundness?: 'default' | 'pill' | 'squircle'
  /** Text label (if type includes text) */
  label?: string
  /** Icon name (if type includes icon) */
  icon?: string
  /** Custom className */
  className?: string
}

export interface TriggerConfig extends SlotConfig {
  /** Horizontal padding */
  paddingX: number
  /** Additional padding when expanded */
  paddingExpanded: number
  /** Top padding when expanded */
  topPaddingExpanded: number
  /** Show search icon */
  showSearchIcon: boolean
  /** Show keyboard hint when collapsed */
  showKeyboardHint: boolean
  /** Keyboard hint text */
  keyboardHintText: string
  /** Cursor when collapsed */
  cursor: 'text' | 'pointer'
  /** Buttons inside the trigger */
  buttons: TriggerButtonConfig[]
}

// ============================================================================
// TOP SECTION CONFIG
// ============================================================================

export type TopSectionContentType = 'filters' | 'questions' | 'breadcrumbs' | 'tabs' | 'custom'

export interface TopSlotConfig extends SlotConfig {
  /** Content type for the top section */
  contentType: TopSectionContentType
  /** Shine effect for top section */
  shine?: ShineOption
  /** Bottom offset (gap above trigger) */
  bottomOffset?: number
  /** Show overflow gradient (when using scrollable content) */
  overflowGradient?: boolean
  /** Overflow gradient height */
  overflowGradientHeight?: number
  /** Scroll padding top */
  scrollPaddingTop?: number
  /** Scroll padding bottom */
  scrollPaddingBottom?: number
}

// ============================================================================
// BOTTOM SECTION CONFIG
// ============================================================================

export type BottomSectionContentType = 'questions' | 'filters' | 'buttons' | 'custom'

/** Button variant for action buttons */
export type ActionButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'shine'

/** Available icons for action buttons */
export type ActionButtonIcon = 'check' | 'edit' | 'sparkle' | 'close' | 'refresh' | 'send' | 'none'

/** Configuration for a single action button */
export interface ActionButtonConfig {
  /** Button ID */
  id: string
  /** Button label */
  label: string
  /** Icon to show */
  icon: ActionButtonIcon
  /** Button variant */
  variant: ActionButtonVariant
  /** Whether button is enabled */
  enabled: boolean
}

export interface BottomSlotConfig extends SlotConfig {
  /** Content type for the bottom section */
  contentType: BottomSectionContentType
  /** Show overflow gradient */
  overflowGradient: boolean
  /** Overflow gradient height */
  overflowGradientHeight: number
  /** Scroll padding top */
  scrollPaddingTop: number
  /** Scroll padding bottom */
  scrollPaddingBottom: number
  /** Shine effect */
  shine?: ShineOption
  /** Button configurations (when contentType is 'buttons') */
  buttons?: ActionButtonConfig[]
}

// ============================================================================
// QUESTION ITEM CONFIG
// ============================================================================

export interface QuestionItemConfig {
  /** Item height */
  height: number
  /** Gap between items */
  gap: number
  /** Horizontal padding */
  paddingX: number
  /** Vertical padding */
  paddingY: number
  /** Item border radius */
  borderRadius: number
  /** Highlight background (keyboard/selected) */
  highlightBackground: BackgroundOption
  /** Hover background */
  hoverBackground: BackgroundOption
  /** Icon size */
  iconSize: number
  /** Gap between icon and text */
  iconGap: number
  /** Icon opacity (0-100) */
  iconOpacity: number
}

// ============================================================================
// MAIN CONFIG
// ============================================================================

export interface QuestionCommandMenuConfig {
  // Animation
  animation: AnimationConfig

  // Layout
  layout: LayoutConfig

  // Appearance
  appearance: AppearanceConfig

  // Slots
  topSlot: TopSlotConfig
  trigger: TriggerConfig
  bottomSlot: BottomSlotConfig

  // Content
  items: QuestionItemConfig

  // Behavior
  placeholder: string
  showEmptyState: boolean
  emptyStateMessage: string

  // Debug
  debug?: boolean
}

// ============================================================================
// PRESET TYPES
// ============================================================================

export interface QuestionCommandMenuPreset {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'elevated' | 'brand' | 'custom'
  data: QuestionCommandMenuConfig
}

// ============================================================================
// PLAYGROUND STATE
// ============================================================================

export interface PlaygroundState {
  config: QuestionCommandMenuConfig
}

// ============================================================================
// QUESTION DATA TYPES
// ============================================================================

export interface QuestionStatus {
  type: 'approved' | 'needs-revision' | 'pending' | 'rejected'
  label: string
}

export interface QuestionItem {
  id: string
  text: string
  answer?: string
  status?: QuestionStatus
  icon?: React.ComponentType<{ className?: string }>
}

export interface QuestionGroup {
  id: string
  label: string
  items: QuestionItem[]
}
