/**
 * StickyDataTable - Deep Merge Utility
 *
 * Generic deep merge for configuration objects.
 *
 * @module config/calculators/deep-merge
 */

import type { DeepPartial } from '../../types'

// ============================================================================
// DEEP MERGE
// ============================================================================

/**
 * Deep merge utility for configuration objects
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: DeepPartial<T>
): T {
  const result = { ...target }

  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (
      sourceValue !== undefined &&
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === 'object' &&
      targetValue !== null &&
      !Array.isArray(targetValue)
    ) {
      result[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as DeepPartial<Record<string, unknown>>
      ) as T[Extract<keyof T, string>]
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[Extract<keyof T, string>]
    }
  }

  return result
}
