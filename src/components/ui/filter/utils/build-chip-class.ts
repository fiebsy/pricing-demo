/**
 * Build Chip Class Utility
 *
 * Generates className string from ChipStyleConfig.
 * Used internally by FilterChip, but exported for advanced use cases.
 *
 * @module base-ui/filter/utils/build-chip-class
 *
 * @example
 * ```tsx
 * import { buildChipClassFromConfig, DEFAULT_CHIP_STYLE } from '@/components/ui/filter'
 *
 * const className = buildChipClassFromConfig(DEFAULT_CHIP_STYLE)
 * // => "shine-3-subtle bg-secondary border-transparent subtle-depth-10-primary"
 * ```
 */

import type { ChipStyleConfig } from '../types'

/**
 * Builds a Tailwind className string from a ChipStyleConfig
 *
 * Handles:
 * - Shine classes (shine-0 through shine-brand with intensity variants)
 * - Background classes (bg-secondary, bg-tertiary, etc.)
 * - Border transparency (when border is false)
 * - Depth gradient classes (subtle-depth-10-primary-bottom, etc.)
 */
export function buildChipClassFromConfig(config: ChipStyleConfig): string {
  const classes: string[] = []

  // Shine class (e.g., "shine-3", "shine-3-subtle", "shine-brand-intense")
  if (config.shine !== 'none') {
    const base = `shine-${config.shine}`
    const intensitySuffix = config.shineIntensity === 'normal' ? '' : `-${config.shineIntensity}`
    classes.push(`${base}${intensitySuffix}`)
  }

  // Background class (e.g., "bg-secondary")
  // Only add if not 'primary' (primary is the default)
  if (config.background !== 'primary') {
    classes.push(`bg-${config.background}`)
  }

  // Border transparency (hide border when config.border is false)
  if (!config.border) {
    classes.push('border-transparent')
  }

  // Shadow class (e.g., "shadow-sm")
  if (config.shadow !== 'none') {
    classes.push(`shadow-${config.shadow}`)
  }

  // Depth gradient class (e.g., "subtle-depth-10-primary" or "subtle-depth-20-brand-left")
  if (config.depthIntensity !== 'none') {
    const direction = config.depthDirection !== 'bottom' ? `-${config.depthDirection}` : ''
    classes.push(`subtle-depth-${config.depthIntensity}-${config.depthColor}${direction}`)
  }

  return classes.join(' ')
}
