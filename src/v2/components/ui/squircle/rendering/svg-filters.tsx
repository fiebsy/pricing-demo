import React from 'react'
import type { CustomShadowConfig } from '../types'

interface SquircleFiltersProps {
  instanceId: string
  overflow: 'visible' | 'hidden' | 'clip'
  paths: { background: string; border: string; outerBorder: string }
  totalBorderOffset: number
}

/**
 * SVG ClipPath Definitions Component
 * Handles clipping paths for content overflow control
 *
 * Note: Shadow rendering moved to separate duplicate SVG method
 * (see SquircleShadow component)
 */
export const SquircleFilters: React.FC<SquircleFiltersProps> = ({
  instanceId,
  overflow,
  paths,
  totalBorderOffset,
}) => {
  return (
    <>
      {/* ClipPath definition for content overflow control */}
      {overflow === 'hidden' && (
        <clipPath id={`clip-${instanceId}`}>
          <path d={paths.background} transform={`translate(${totalBorderOffset}, ${totalBorderOffset})`} />
        </clipPath>
      )}
    </>
  )
}

interface SquircleShadowProps {
  dimensions: { width: number; height: number }
  borderWidth: number
  shadowConfig: CustomShadowConfig
  paths: { background: string }
}

/**
 * Squircle Shadow Component - Duplicate SVG Method
 *
 * Uses a separate SVG element to render the shadow behind the main shape.
 * This is the reliable cross-browser approach that supports:
 * - Full shadow spread control
 * - No clipping issues
 * - Works reliably on Chrome and Safari
 *
 * Trade-off: Renders 2 SVG elements instead of 1, but shadow actually works!
 */
export const SquircleShadow: React.FC<SquircleShadowProps> = ({
  dimensions,
  borderWidth,
  shadowConfig,
  paths,
}) => {
  // Don't render if shadow is disabled
  if (!shadowConfig || shadowConfig.opacity === 0) {
    return null
  }

  return (
    <svg
      width={dimensions.width + borderWidth * 2}
      height={dimensions.height + borderWidth * 2}
      viewBox={`0 0 ${dimensions.width + borderWidth * 2} ${dimensions.height + borderWidth * 2}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate(${shadowConfig.offsetX}px, ${shadowConfig.offsetY}px)`,
        filter: `blur(${shadowConfig.blur}px)`,
        opacity: shadowConfig.opacity,
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      {/* Shadow duplicate of the background shape */}
      <g transform={`translate(${borderWidth}, ${borderWidth})`}>
        <path
          d={paths.background}
          fill={shadowConfig.color === 'black' ? '#000000' : shadowConfig.color}
          strokeWidth={0}
        />
      </g>
    </svg>
  )
}
