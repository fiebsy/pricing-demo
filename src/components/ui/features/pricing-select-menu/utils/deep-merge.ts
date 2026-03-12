/**
 * Pricing Select Menu - Deep Merge Utility
 *
 * Recursively merges objects for config composition.
 */

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
