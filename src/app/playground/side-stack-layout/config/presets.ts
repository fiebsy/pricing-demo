import type { PlaygroundConfig, ConfigPreset } from './types'

// =============================================================================
// FULL CONFIG PRESETS
// =============================================================================

/** Default preset - balanced CSS animation with clip-path reveals */
const PRESET_DEFAULT: Omit<PlaygroundConfig, 'configPreset'> = {
  // Mode
  sideStackMode: 'both',

  // Layout
  containerCount: 3,
  triggerWidth: 64,
  triggerHeight: 64,
  leftSlotWidth: 80,
  rightSlotWidth: 80,
  containerGap: 24,
  slotInset: 4,

  // Animation
  animationDuration: 350,
  animationEasing: 'ease-out',
  collapseDuration: 200,
  slotContainerDurationOffset: 50,

  // Slot Content Animation
  animateSlotContainers: true,
  slotEntryDelay: 0,
  slotEntryDuration: 300,

  // Appearance
  triggerColor: 'neutral',
  leftSlotColor: 'brand',
  rightSlotColor: 'success',
  borderRadius: 12,
  containerBorderRadius: 16,
  showContainerBorder: false,
  showSlotLabels: true,

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
  collapseDuration: 150,
  slotContainerDurationOffset: 30,
  slotEntryDelay: 0,
  slotEntryDuration: 180,
}

/** Bouncy preset - playful with overshoot */
const PRESET_BOUNCY: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  animationDuration: 450,
  animationEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  collapseDuration: 250,
  slotContainerDurationOffset: 80,
  slotEntryDelay: 50,
  slotEntryDuration: 350,
}

/** Smooth preset - gentle, refined animation */
const PRESET_SMOOTH: Omit<PlaygroundConfig, 'configPreset'> = {
  ...PRESET_DEFAULT,
  animationDuration: 400,
  animationEasing: 'ease-in-out',
  collapseDuration: 300,
  slotContainerDurationOffset: 100,
  slotEntryDelay: 50,
  slotEntryDuration: 350,
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
