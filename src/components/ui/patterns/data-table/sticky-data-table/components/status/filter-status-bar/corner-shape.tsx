/**
 * CornerShape Component
 *
 * Renders SVG-based S-curve corner connectors (Safari tab style).
 * Creates flip corners with concave/inward-curving shapes.
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { CornerShapeProps, CornerPosition, FlipCornerCurvature } from './types'
import { CORNER_OVERLAP } from './constants'

/** Generates the SVG path for the filled L-shape with S-curve */
function getFillPath(
  position: CornerPosition,
  width: number,
  height: number,
  curvature: FlipCornerCurvature
): string {
  const { cp1x, cp1y, cp2x, cp2y } = curvature

  switch (position) {
    case 'top-left':
      return [
        `M ${width} ${height}`,
        `L ${width} 0`,
        `C ${width * (1 - cp1x)} ${height * cp1y} ${width * (1 - cp2x)} ${height * cp2y} 0 ${height}`,
        `Z`
      ].join(' ')

    case 'top-right':
      return [
        `M 0 ${height}`,
        `L 0 0`,
        `C ${width * cp1x} ${height * cp1y} ${width * cp2x} ${height * cp2y} ${width} ${height}`,
        `Z`
      ].join(' ')

    case 'bottom-left':
      return [
        `M ${width} 0`,
        `L ${width} ${height}`,
        `C ${width * (1 - cp1x)} ${height * (1 - cp1y)} ${width * (1 - cp2x)} ${height * (1 - cp2y)} 0 0`,
        `Z`
      ].join(' ')

    case 'bottom-right':
      return [
        `M 0 0`,
        `L 0 ${height}`,
        `C ${width * cp1x} ${height * (1 - cp1y)} ${width * cp2x} ${height * (1 - cp2y)} ${width} 0`,
        `Z`
      ].join(' ')

    default:
      return ''
  }
}

/** Generates the SVG path for just the S-curve (for stroke only) */
function getStrokePath(
  position: CornerPosition,
  width: number,
  height: number,
  curvature: FlipCornerCurvature
): string {
  const { cp1x, cp1y, cp2x, cp2y } = curvature

  switch (position) {
    case 'top-left':
      return [
        `M ${width} 0`,
        `C ${width * (1 - cp1x)} ${height * cp1y} ${width * (1 - cp2x)} ${height * cp2y} 0 ${height}`
      ].join(' ')

    case 'top-right':
      return [
        `M 0 0`,
        `C ${width * cp1x} ${height * cp1y} ${width * cp2x} ${height * cp2y} ${width} ${height}`
      ].join(' ')

    case 'bottom-left':
      return [
        `M ${width} ${height}`,
        `C ${width * (1 - cp1x)} ${height * (1 - cp1y)} ${width * (1 - cp2x)} ${height * (1 - cp2y)} 0 0`
      ].join(' ')

    case 'bottom-right':
      return [
        `M 0 ${height}`,
        `C ${width * cp1x} ${height * (1 - cp1y)} ${width * cp2x} ${height * (1 - cp2y)} ${width} 0`
      ].join(' ')

    default:
      return ''
  }
}

/** Gets the CSS positioning styles for each corner position */
function getPositionStyles(
  position: CornerPosition,
  width: number
): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
  }

  switch (position) {
    case 'top-left':
      return { ...base, top: 0, left: -width + CORNER_OVERLAP }
    case 'top-right':
      return { ...base, top: 0, right: -width + CORNER_OVERLAP }
    case 'bottom-left':
      return { ...base, bottom: 0, left: -width + CORNER_OVERLAP }
    case 'bottom-right':
      return { ...base, bottom: 0, right: -width + CORNER_OVERLAP }
    default:
      return base
  }
}

/** Renders an SVG S-curve corner connector with optional stroke */
export function CornerShape({
  position,
  size,
  height,
  fillColor,
  strokeWidth = 0,
  strokeColor = 'transparent',
  curvature,
  className,
}: CornerShapeProps) {
  if (size <= 0 || height <= 0) return null

  const hasStroke = strokeWidth > 0 && strokeColor !== 'transparent'
  const fillPath = getFillPath(position, size, height, curvature)
  const strokePath = getStrokePath(position, size, height, curvature)
  const positionStyles = getPositionStyles(position, size)

  return (
    <svg
      className={cn('flex-shrink-0', className)}
      style={{
        ...positionStyles,
        width: size,
        height,
        overflow: 'visible',
      }}
      width={size}
      height={height}
      viewBox={`0 0 ${size} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={fillPath} fill={fillColor} />
      {hasStroke && (
        <path
          d={strokePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
