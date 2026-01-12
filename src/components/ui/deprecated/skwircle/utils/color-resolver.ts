/**
 * Skwircle Color Resolver
 *
 * Resolves semantic color tokens to CSS values.
 */

import { V2_SEMANTIC_COLORS } from '../config/constants'

/**
 * Resolve a semantic color token to its CSS value.
 *
 * @param color - Semantic token (e.g., 'background-primary') or CSS color
 * @returns CSS color value
 */
export const resolveColor = (color: string | undefined): string => {
  if (!color) return 'transparent'
  return V2_SEMANTIC_COLORS[color] || color
}

/**
 * Parse a pixel value from CSS width/height.
 *
 * @param value - CSS value (number, 'Npx', or string)
 * @returns Parsed number or null
 */
export const parsePx = (
  value: React.CSSProperties['width'] | React.CSSProperties['height']
): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.endsWith('px')) {
    const n = Number(trimmed.slice(0, -2))
    return Number.isFinite(n) ? n : null
  }
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}
