import type { PlaygroundConfig, ConfigPreset } from './types'

// =============================================================================
// FULL CONFIG PRESETS
// =============================================================================

/** Default preset - balanced CSS animation */
const PRESET_DEFAULT: Omit<PlaygroundConfig, 'configPreset'> = {
  // Layout
  containerCount: 3,
  squareAWidth: 64,
  squareAHeight: 64,
  squareBWidthMode: 'fixed',
  squareBWidth: 64,
  squareBHeight: 64,
  gap: 0,
  containerGap: 16,
  maxContainerWidth: 800,

  // Animation (CSS-based)
  animationDuration: 300,
  animationEasing: 'ease-out',

  // Square B Content Animation
  squareBRevealMode: 'clip',
  squareBEntryDelay: 50,
  squareBEntryDuration: 200,
  squareBExitDuration: 150,
  squareBEntryScale: 0.8,
  squareBEntryOpacity: 0,

  // Appearance
  squareAColor: 'neutral',
  squareBColor: 'error',
  squareBorderRadius: 8,
  containerBorderRadius: 12,
  showContainerBorder: true,
  showSquareLabels: true,

  // Page
  pageBackground: 'primary',

  // Debug
  showDebug: false,
  slowMoEnabled: false,
  reduceMotion: false,
}

/** Snappy preset - quick, responsive animation */
const PRESET_SNAPPY: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  animationDuration: 200,
  animationEasing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  squareBEntryDelay: 30,
  squareBEntryDuration: 150,
  squareBExitDuration: 100,
}

/** Bouncy preset - playful with overshoot */
const PRESET_BOUNCY: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  animationDuration: 400,
  animationEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Overshoot easing
  squareBEntryDelay: 80,
  squareBEntryDuration: 250,
  squareBExitDuration: 180,
  squareBEntryScale: 0.6,
}

/** Smooth preset - gentle, refined animation */
const PRESET_SMOOTH: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  animationDuration: 400,
  animationEasing: 'ease-in-out',
  squareBEntryDelay: 100,
  squareBEntryDuration: 300,
  squareBExitDuration: 200,
}

export const CONFIG_PRESETS: Record<
  ConfigPreset,
  Omit<PlaygroundConfig, 'configPreset'> | null
> = {
  default: PRESET_DEFAULT,
  snappy: PRESET_SNAPPY,
  bouncy: PRESET_BOUNCY,
  smooth: PRESET_SMOOTH,
  custom: null,
}

export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  configPreset: 'default',
  ...PRESET_DEFAULT,
}
