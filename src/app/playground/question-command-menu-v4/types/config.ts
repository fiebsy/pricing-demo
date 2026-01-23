/**
 * Question Command Menu V4 - Main Config Types
 *
 * The complete configuration object for the command menu.
 */

import type { TriggerConfig, TriggerDisplayConfig } from './trigger'
import type { ContentInstance, ContentConfigs, ShineOption, BackgroundOption } from './content'
import type { SlotsConfig } from './slots'
import type { TriggerMode } from './state'

// =============================================================================
// ANIMATION CONFIG
// =============================================================================

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

// =============================================================================
// LAYOUT CONFIG
// =============================================================================

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

// =============================================================================
// APPEARANCE CONFIG
// =============================================================================

export type ShadowOption = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type GradientOption = 'none' | 'subtle-depth-sm' | 'subtle-depth-md' | 'subtle-depth-lg' | 'subtle-depth-xl'
export type GradientColorOption = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'gray'

export interface AppearanceConfig {
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shadow: ShadowOption
  shine: ShineOption
  background: BackgroundOption
  gradient: GradientOption
  gradientColor: GradientColorOption
  squircle: boolean
}

// =============================================================================
// MAIN V4 CONFIG
// =============================================================================

export interface QuestionCommandMenuV4Config {
  // Global settings
  animation: AnimationConfig
  layout: LayoutConfig
  appearance: AppearanceConfig
  trigger: TriggerConfig
  triggerDisplay: TriggerDisplayConfig

  // Unified slot configs
  slots: SlotsConfig

  // Content assignment (which content goes where)
  content: ContentInstance[]

  // Content type configurations
  contentConfigs: ContentConfigs

  // Behavior
  placeholder: string
  defaultMode: TriggerMode

  // Debug
  debug?: boolean
}

// =============================================================================
// PRESET TYPES
// =============================================================================

export interface QuestionCommandMenuV4Preset {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'elevated' | 'brand' | 'custom'
  data: QuestionCommandMenuV4Config
}

// =============================================================================
// PLAYGROUND STATE
// =============================================================================

export interface PlaygroundState {
  config: QuestionCommandMenuV4Config
}
