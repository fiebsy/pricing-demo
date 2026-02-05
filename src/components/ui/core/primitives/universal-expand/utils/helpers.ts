/**
 * Universal Expand - Helper Utilities
 *
 * Common utility functions for styling and calculations.
 */

import type { BackgroundOption, BorderColorOption } from '../types'

// ============================================================================
// BACKGROUND CLASSES
// ============================================================================

const BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  none: '',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

export function getBackgroundClass(background: BackgroundOption): string {
  return BACKGROUND_CLASSES[background]
}

// ============================================================================
// BORDER COLOR
// ============================================================================

export function getBorderColorVar(color: BorderColorOption): string {
  return `var(--color-border-${color})`
}

// ============================================================================
// DEEP MERGE
// ============================================================================

/**
 * Deep merge two objects, with source taking precedence.
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!source) return target

  const result = { ...target } as T

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key]
      const targetValue = (target as Record<string, unknown>)[key]

      if (
        sourceValue !== undefined &&
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        // Recursively merge nested objects
        (result as Record<string, unknown>)[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        )
      } else if (sourceValue !== undefined) {
        (result as Record<string, unknown>)[key] = sourceValue
      }
    }
  }

  return result
}
