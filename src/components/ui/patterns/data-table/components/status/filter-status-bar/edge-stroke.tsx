/**
 * EdgeStroke Component
 *
 * Renders horizontal border lines for the filter bar.
 * Used with flip corners to create continuous border effect.
 */

import type { EdgeStrokeProps } from './types'

export function EdgeStroke({
  position,
  strokeWidth,
  strokeColor,
  leftInset = 0,
  rightInset = 0,
}: EdgeStrokeProps) {
  if (strokeWidth <= 0) return null

  const isTop = position === 'top'

  return (
    <div
      style={{
        position: 'absolute',
        left: leftInset,
        right: rightInset,
        [isTop ? 'top' : 'bottom']: 0,
        height: strokeWidth,
        backgroundColor: strokeColor,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
