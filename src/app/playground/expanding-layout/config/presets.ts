import type { PlaygroundConfig, ConfigPreset } from './types'

// =============================================================================
// FULL CONFIG PRESETS
// =============================================================================

/** Default preset - balanced spring animation */
const PRESET_DEFAULT: Omit<PlaygroundConfig, 'configPreset'> = {
  // Layout
  containerCount: 3,
  squareASize: 64,
  squareBSize: 64,
  gap: 12,
  containerGap: 16,
  maxContainerWidth: 800,

  // Animation Type
  animationType: 'spring',

  // Spring Settings
  springStiffness: 300,
  springDamping: 30,
  springMass: 1,
  springPreset: 'smooth',

  // Tween Settings
  tweenDuration: 300,
  tweenEase: 'easeInOut',

  // Square B Animation
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

/** Snappy preset - quick, responsive spring */
const PRESET_SNAPPY: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  springStiffness: 500,
  springDamping: 35,
  springPreset: 'snappy',
  squareBEntryDelay: 30,
  squareBEntryDuration: 150,
  squareBExitDuration: 100,
}

/** Bouncy preset - playful with overshoot */
const PRESET_BOUNCY: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  springStiffness: 400,
  springDamping: 15,
  springPreset: 'bouncy',
  squareBEntryDelay: 80,
  squareBEntryDuration: 250,
  squareBExitDuration: 180,
  squareBEntryScale: 0.6,
}

/** Smooth preset - gentle tween animation */
const PRESET_SMOOTH: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  animationType: 'tween',
  tweenDuration: 400,
  tweenEase: 'easeInOut',
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
