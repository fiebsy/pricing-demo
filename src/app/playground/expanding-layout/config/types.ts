// =============================================================================
// TYPE ALIASES
// =============================================================================

export type ConfigPreset = 'default' | 'snappy' | 'bouncy' | 'smooth' | 'custom'

export type CSSEasing =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | `cubic-bezier(${string})`

export type SquareAColor = 'neutral' | 'secondary' | 'tertiary'

export type SquareBColor = 'error' | 'success' | 'warning' | 'brand'

export type PageBackground = 'primary' | 'secondary' | 'tertiary'

export type RevealMode = 'fade' | 'clip' | 'clip-circle'

export type SquareBWidthMode = 'fixed' | 'flex'

// =============================================================================
// PLAYGROUND CONFIG INTERFACE
// =============================================================================

/**
 * Playground config for expanding-layout.
 * Uses CSS Grid animation for synchronized layout transitions.
 */
export interface PlaygroundConfig {
  // Preset
  configPreset: ConfigPreset

  // Layout
  containerCount: number // 2-6 containers
  squareAWidth: number // 40-120px
  squareAHeight: number // 40-120px
  squareBWidthMode: SquareBWidthMode // 'fixed' = pixel width, 'flex' = fill remaining
  squareBWidth: number // 40-120px (used when mode is 'fixed')
  squareBHeight: number // 40-120px
  gap: number // A-B gap in px
  containerGap: number // Between containers in px
  maxContainerWidth: number // Max width of container

  // Animation (CSS-based)
  animationDuration: number // ms - grid-template-columns transition
  animationEasing: CSSEasing // CSS easing function

  // Square B Content Animation
  squareBRevealMode: RevealMode
  squareBEntryDelay: number // ms - delay before content animates
  squareBEntryDuration: number // ms - content animation duration
  squareBExitDuration: number // ms - content exit duration
  squareBEntryScale: number // 0-1 (fade mode only)
  squareBEntryOpacity: number // 0-1 (fade mode only)

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
