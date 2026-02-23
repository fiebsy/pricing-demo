/**
 * Modal V2 Style Utilities
 *
 * Minimal style helpers for the modal playground.
 */

import type { BackgroundColor, ShinePreset, ShadowSize, DepthPreset } from '../config/types'

// ============================================================================
// Class Mappings
// ============================================================================

export const BACKGROUND_CLASSES: Record<BackgroundColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
}

export const SHADOW_CLASSES: Record<ShadowSize, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Get background class from semantic color.
 */
export function getBackgroundClass(color: BackgroundColor): string {
  return BACKGROUND_CLASSES[color]
}

/**
 * Get shadow class from size.
 */
export function getShadowClass(size: ShadowSize): string {
  return SHADOW_CLASSES[size]
}

/**
 * Get shine class (returns the preset name or empty string).
 */
export function getShineClass(shine: ShinePreset): string {
  return shine === 'none' ? '' : shine
}

/**
 * Get depth class (returns the preset name or empty string).
 */
export function getDepthClass(depth: DepthPreset): string {
  return depth === 'none' ? '' : depth
}
