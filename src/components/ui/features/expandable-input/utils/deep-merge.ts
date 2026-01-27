/**
 * Expandable Input - Deep Merge Utility
 */

import type { ExpandableInputConfig } from '../types'

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
  const result = { ...base } as T

  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const baseValue = base[key]
      const overrideValue = override[key]

      if (
        typeof baseValue === 'object' &&
        baseValue !== null &&
        !Array.isArray(baseValue) &&
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        !Array.isArray(overrideValue)
      ) {
        result[key] = deepMerge(
          baseValue as Record<string, unknown>,
          overrideValue as Record<string, unknown>
        ) as T[typeof key]
      } else {
        result[key] = overrideValue as T[typeof key]
      }
    }
  }

  return result
}

/**
 * Create a preset config by merging with default
 */
export function createPreset(
  baseConfig: ExpandableInputConfig,
  overrides: Partial<ExpandableInputConfig>
): ExpandableInputConfig {
  return deepMerge(
    baseConfig as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>
  ) as unknown as ExpandableInputConfig
}
