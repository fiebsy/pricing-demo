/**
 * Magnetic Menu Presets
 */

import type {
  MagneticMenuConfig,
  MagneticMenuPresetMeta,
  PullAnimationConfig,
  UnifiedHoverConfig,
} from './types'

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_MAGNETIC_MENU_CONFIG: MagneticMenuConfig = {
  pullMode: 'background',
  pullStrength: 0.085,
  pullDirection: 'vertical',
  clampToParent: true,
  animation: {
    stiffness: 500,
    damping: 40,
    mass: 0.5,
    delay: 20,
  },
  hover: {
    background: 'quaternary',
    backgroundOpacity: 1,
    borderRadius: 8,
  },
  hoverIndicator: {
    mode: 'unified',
    unified: {
      stiffness: 550,
      damping: 34,
      mass: 0.8,
    },
  },
  background: {
    showBlurCircle: true,
    blurCircleColor: 'brand-solid',
    blurCircleOpacity: 0.15,
    blurCircleSize: 400,
    blurAmount: 110,
    showPattern: true,
    patternType: 'diagonal',
    patternOpacity: 0.04,
  },
  shadow: {
    intensity: '2xl',
  },
  icons: {
    show: true,
    size: 18,
    opacity: 0.4,
  },
}

// ============================================================================
// Unified Hover Spring Presets
// ============================================================================

export interface UnifiedHoverPreset {
  id: string
  name: string
  description: string
  data: UnifiedHoverConfig
}

export const UNIFIED_HOVER_PRESETS: UnifiedHoverPreset[] = [
  {
    id: 'snappy',
    name: 'Snappy',
    description: 'Fast with minimal overshoot',
    data: { stiffness: 400, damping: 30, mass: 1 },
  },
  {
    id: 'smooth',
    name: 'Smooth',
    description: 'Balanced glide between items',
    data: { stiffness: 300, damping: 25, mass: 1 },
  },
  {
    id: 'bouncy',
    name: 'Bouncy',
    description: 'Playful with overshoot',
    data: { stiffness: 350, damping: 18, mass: 0.8 },
  },
  {
    id: 'tight',
    name: 'Tight',
    description: 'Near-instant response',
    data: { stiffness: 500, damping: 35, mass: 0.8 },
  },
  {
    id: 'floaty',
    name: 'Floaty',
    description: 'Light, airy movement',
    data: { stiffness: 200, damping: 20, mass: 0.6 },
  },
]

export const getUnifiedHoverPresetById = (id: string): UnifiedHoverPreset | undefined =>
  UNIFIED_HOVER_PRESETS.find((p) => p.id === id)

// ============================================================================
// Main Presets (just one default)
// ============================================================================

export const MAGNETIC_MENU_PRESETS: MagneticMenuPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Background pull with balanced spring physics',
    data: DEFAULT_MAGNETIC_MENU_CONFIG,
  },
]

// ============================================================================
// Spring Physics Presets (for Animation tab)
// ============================================================================

export interface SpringPreset {
  id: string
  name: string
  description: string
  data: PullAnimationConfig
}

export const SPRING_PRESETS: SpringPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Balanced spring response',
    data: { stiffness: 150, damping: 15, mass: 1, delay: 0 },
  },
  {
    id: 'critically-damped',
    name: 'Critically Damped',
    description: 'Fastest settle, no overshoot',
    data: { stiffness: 200, damping: 28, mass: 1, delay: 0 },
  },
  {
    id: 'underdamped',
    name: 'Underdamped',
    description: 'Oscillates before settling',
    data: { stiffness: 200, damping: 8, mass: 1, delay: 0 },
  },
  {
    id: 'overdamped',
    name: 'Overdamped',
    description: 'Slow settle, no oscillation',
    data: { stiffness: 100, damping: 40, mass: 1, delay: 0 },
  },
  {
    id: 'rubber',
    name: 'Rubber',
    description: 'Elastic, stretchy with bounce',
    data: { stiffness: 400, damping: 15, mass: 0.8, delay: 0 },
  },
  {
    id: 'jelly',
    name: 'Jelly',
    description: 'Wobbly, gelatinous',
    data: { stiffness: 150, damping: 6, mass: 1.2, delay: 0 },
  },
  {
    id: 'magnetic',
    name: 'Magnetic',
    description: 'Strong snap, gentle settle',
    data: { stiffness: 500, damping: 25, mass: 0.6, delay: 0 },
  },
  {
    id: 'floaty',
    name: 'Floaty',
    description: 'Light, airy movement',
    data: { stiffness: 60, damping: 8, mass: 0.5, delay: 0 },
  },
  {
    id: 'molasses',
    name: 'Molasses',
    description: 'Thick, viscous movement',
    data: { stiffness: 50, damping: 35, mass: 2, delay: 30 },
  },
  {
    id: 'snappy',
    name: 'Snappy',
    description: 'Fast with minimal overshoot',
    data: { stiffness: 400, damping: 30, mass: 0.5, delay: 0 },
  },
  {
    id: 'bouncy',
    name: 'Bouncy',
    description: 'Playful spring',
    data: { stiffness: 300, damping: 10, mass: 1, delay: 0 },
  },
  {
    id: 'tight',
    name: 'Tight',
    description: 'Almost instant response',
    data: { stiffness: 500, damping: 40, mass: 0.5, delay: 0 },
  },
  {
    id: 'loose',
    name: 'Loose',
    description: 'Relaxed, gentle movement',
    data: { stiffness: 80, damping: 12, mass: 1.5, delay: 0 },
  },
  {
    id: 'delayed-snap',
    name: 'Delayed Snap',
    description: 'Waits then snaps',
    data: { stiffness: 350, damping: 25, mass: 0.7, delay: 100 },
  },
]

// ============================================================================
// Helpers
// ============================================================================

export const getSpringPresetById = (id: string): SpringPreset | undefined =>
  SPRING_PRESETS.find((p) => p.id === id)
