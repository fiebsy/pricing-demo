/**
 * Question Command Menu V3 - Main Type Definitions
 *
 * Content-first architecture: configure WHAT appears, then WHERE.
 * Unified slot system eliminates duplication between top/bottom configs.
 */

import type {
  ContentInstance,
  ContentConfigs,
  BackgroundOption,
  ShineOption,
} from './content-types'
import type { SlotsConfig } from './slots'

// ============================================================================
// TRIGGER PHASE
// ============================================================================

export type TriggerPhase =
  | 'add-idle'         // Shows "Add a question" placeholder (cursor: pointer)
  | 'add-expanded'     // Expanded with suggestions in bottom slot
  | 'question-idle'    // Shows saved question text (cursor: pointer, read-only)
  | 'question-editing' // Input field mode for editing existing question
  | 'question-saved'   // Saved state with AI response in top slot

// ============================================================================
// ANIMATION CONFIG
// ============================================================================

export type BackdropAnimationMode = 'size' | 'clip-path'

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
}

// ============================================================================
// LAYOUT CONFIG
// ============================================================================

export interface LayoutConfig {
  /** Width of collapsed trigger */
  triggerWidth: number
  /** Height of collapsed trigger */
  triggerHeight: number
  /** Width of expanded panel (ignored if fillWidth is true) */
  panelWidth: number
  /** When true, panel width matches trigger width (no horizontal expansion) */
  fillWidth: boolean
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

export type ShadowOption = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type GradientOption = 'none' | 'subtle-depth-sm' | 'subtle-depth-md' | 'subtle-depth-lg' | 'subtle-depth-xl'
export type GradientColorOption = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'gray'

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
// TRIGGER CONFIG
// ============================================================================

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
export type TriggerButtonShowWhen = 'always' | 'expanded' | 'collapsed'

export interface TriggerButtonConfig {
  position: 'left' | 'right'
  enabled: boolean
  type: TriggerButtonType
  variant: TriggerButtonVariant
  size: 'xs' | 'sm' | 'md'
  roundness?: 'default' | 'pill' | 'squircle'
  label?: string
  icon?: string
  className?: string
  /** When to show this button */
  showWhen?: TriggerButtonShowWhen
}

export interface TriggerConfig {
  /** Left padding */
  paddingLeft: number
  /** Right padding */
  paddingRight: number
  /** Top padding */
  paddingTop: number
  /** Bottom padding */
  paddingBottom: number
  /** Additional left padding when expanded */
  paddingExpandedLeft: number
  /** Additional right padding when expanded */
  paddingExpandedRight: number
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
// MAIN V3 CONFIG
// ============================================================================

export interface QuestionCommandMenuV3Config {
  // Global settings
  animation: AnimationConfig
  layout: LayoutConfig
  appearance: AppearanceConfig
  trigger: TriggerConfig

  // Unified slot configs (same type for both!)
  slots: SlotsConfig

  // Content assignment (which content goes where)
  content: ContentInstance[]

  // Content type configurations (shared, not per-slot)
  contentConfigs: ContentConfigs

  // Behavior
  placeholder: string

  // Debug
  debug?: boolean
}

// ============================================================================
// PRESET TYPES
// ============================================================================

export interface QuestionCommandMenuV3Preset {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'elevated' | 'brand' | 'custom'
  data: QuestionCommandMenuV3Config
}

// ============================================================================
// PLAYGROUND STATE
// ============================================================================

export interface PlaygroundState {
  config: QuestionCommandMenuV3Config
}

// ============================================================================
// RE-EXPORTS
// ============================================================================

export type {
  ContentTypeId,
  SlotPosition,
  ContentInstance,
  ContentConfigs,
  QuestionsConfig,
  ButtonsConfig,
  FiltersConfig,
  ChatConfig,
  ChatMessage,
  QuestionItem,
  QuestionGroup,
  QuestionStatus,
  QuestionItemConfig,
  ActionButtonConfig,
  ActionButtonVariant,
  ActionButtonIcon,
  ButtonSize,
  FilterOption,
  BackgroundOption,
  BorderColorOption,
  ShineOption,
  SuggestionItem,
  SuggestionsConfig,
} from './content-types'

export type {
  HeightMode,
  ExpandOrigin,
  UnifiedSlotConfig,
  SlotsConfig,
  SlotAppearanceConfig,
  SlotAnimationConfig,
  SlotScrollConfig,
} from './slots'
