// =============================================================================
// TYPE ALIASES
// =============================================================================

export type ConfigPreset = 'default' | 'snappy' | 'bouncy' | 'smooth' | 'custom'

export type AnimationType = 'spring' | 'tween'

export type SpringPreset = 'smooth' | 'snappy' | 'soft' | 'bouncy' | 'custom'

export type EasingType =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate'

export type SquareAColor = 'neutral' | 'secondary' | 'tertiary'

export type SquareBColor = 'error' | 'success' | 'warning' | 'brand'

export type PageBackground = 'primary' | 'secondary' | 'tertiary'

// =============================================================================
// PLAYGROUND CONFIG INTERFACE
// =============================================================================

/**
 * Playground config for expanding-layout.
 * Controls for layout animation experimentation.
 */
export interface PlaygroundConfig {
  // Preset
  configPreset: ConfigPreset

  // Layout
  containerCount: number // 2-6 containers
  squareASize: number // 40-120px
  squareBSize: number // 40-120px
  gap: number // A-B gap in px
  containerGap: number // Between containers in px
  maxContainerWidth: number // Max width of container

  // Animation Type
  animationType: AnimationType

  // Spring Settings
  springStiffness: number
  springDamping: number
  springMass: number
  springPreset: SpringPreset

  // Tween Settings
  tweenDuration: number // ms
  tweenEase: EasingType

  // Square B Animation
  squareBEntryDelay: number // ms
  squareBEntryDuration: number // ms
  squareBExitDuration: number // ms
  squareBEntryScale: number // 0-1
  squareBEntryOpacity: number // 0-1

  // Appearance
  squareAColor: SquareAColor
  squareBColor: SquareBColor
  squareBorderRadius: number // px
  containerBorderRadius: number // px
  showContainerBorder: boolean
  showSquareLabels: boolean

  // Page
  pageBackground: PageBackground

  // Debug
  showDebug: boolean
  slowMoEnabled: boolean
  reduceMotion: boolean
}
