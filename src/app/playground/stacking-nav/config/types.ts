import type {
  AnimationType,
  EasingType,
  ButtonVariant,
  ButtonSize,
  ButtonRoundness,
} from '@/components/ui/features/stacking-nav'

// =============================================================================
// TYPE ALIASES
// =============================================================================

export type ConfigPreset = 'default' | 'spring' | 'custom'

export type NavVariant = 'orders' | 'products' | 'content'

export type EntryDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'
  | 'none'
  | 'custom'

export type PageBackground =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'black'
  | 'white'

// =============================================================================
// PLAYGROUND CONFIG INTERFACE
// =============================================================================

export interface PlaygroundConfig {
  // Config Preset
  configPreset: ConfigPreset

  // Animation Type
  animationType: AnimationType

  // Spring Animation
  springStiffness: number
  springDamping: number
  springPreset: 'custom' | 'smooth' | 'snappy' | 'soft' | 'bouncy'

  // Tween/Easing Animation
  tweenDuration: number
  tweenEase: EasingType

  // Promotion Animation
  promotionDuration: number
  promotionScale: number

  // Child Animation
  childStagger: number
  entryDirection: EntryDirection
  entryOffsetX: number
  entryOffsetY: number
  childEntryDelay: number
  childEntryScale: number

  // Exit Animation
  exitScale: number
  exitUseCustomTiming: boolean
  exitDuration: number        // ms in playground
  exitEase: EasingType
  exitDelay: number           // ms in playground
  collapseLayoutDuration: number  // ms in playground

  // Leaf Node Behavior
  skipLeafAnimation: boolean

  // Button Style
  buttonSize: ButtonSize
  buttonRoundness: ButtonRoundness

  // Button Variants
  expandedVariant: ButtonVariant
  childVariant: ButtonVariant
  anchoredVariant: ButtonVariant
  selectedLeafVariant: ButtonVariant

  // Stacking
  peekOffset: number
  anchoredOpacity: number

  // Layout
  gap: 'sm' | 'md' | 'lg'

  // Display
  showNumbers: boolean
  showDebug: boolean

  // Navigation Variant
  navVariant: NavVariant

  // Page Layout
  pageBackground: PageBackground

  // Level All Button
  showLevelAll: boolean
  levelAllLabel: string
  levelAllActiveVariant: ButtonVariant
  levelAllInactiveVariant: ButtonVariant

  // Interaction
  hoverDelay: number // ms in playground

  // Debug/Inspection
  timeScale: number // 1 = normal, 0.1 = 10x slower (slow-mo), 2 = 2x faster
}
