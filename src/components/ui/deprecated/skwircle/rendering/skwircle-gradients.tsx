/**
 * Skwircle Gradients Component
 *
 * SVG gradient definitions for border and background gradients.
 */

'use client'

import React from 'react'
import type { GradientConfig } from '../types'
import { resolveColor } from '../utils'

interface SkwircleGradientsProps {
  /** Unique instance ID for gradient references */
  instanceId: string
  /** Border gradient configuration */
  borderGradient: GradientConfig | null
  /** Background gradient configuration */
  backgroundGradient: GradientConfig | null
}

/**
 * Renders SVG gradient definitions.
 */
export const SkwircleGradients: React.FC<SkwircleGradientsProps> = ({
  instanceId,
  borderGradient,
  backgroundGradient,
}) => {
  return (
    <>
      {/* Border Gradient */}
      {borderGradient && renderGradient(borderGradient, `border-gradient-${instanceId}`)}

      {/* Background Gradient */}
      {backgroundGradient && renderGradient(backgroundGradient, `background-gradient-${instanceId}`)}
    </>
  )
}

/**
 * Renders a gradient definition based on type.
 */
function renderGradient(config: GradientConfig, id: string): React.ReactNode {
  if (config.type === 'linear' || config.type === 'corner-emphasis') {
    return renderLinearGradient(config, id)
  }

  if (config.type === 'radial') {
    return renderRadialGradient(config, id)
  }

  // Conic falls back to linear
  return renderLinearGradient(config, id)
}

/**
 * Renders a linear gradient.
 */
function renderLinearGradient(config: GradientConfig, id: string): React.ReactNode {
  const angle = config.angle || 135
  const radians = (angle * Math.PI) / 180
  const x1 = 50 - 50 * Math.cos(radians)
  const y1 = 50 - 50 * Math.sin(radians)
  const x2 = 50 + 50 * Math.cos(radians)
  const y2 = 50 + 50 * Math.sin(radians)

  const color = resolveColor(config.colors[0])
  const stops = config.stops || [0, 25, 50, 75, 100]
  const opacities = config.opacities || [1, 0.5, 0, 0.5, 1]

  return (
    <linearGradient id={id} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
      {stops.map((position, index) => (
        <stop
          key={index}
          offset={`${position}%`}
          stopColor={color}
          stopOpacity={opacities[index] ?? 1}
        />
      ))}
    </linearGradient>
  )
}

/**
 * Renders a radial gradient.
 */
function renderRadialGradient(config: GradientConfig, id: string): React.ReactNode {
  const color = resolveColor(config.colors[0])
  const stops = config.stops || [0, 25, 50, 75, 100]
  const opacities = config.opacities || [1, 0.5, 0, 0.5, 1]

  return (
    <radialGradient id={id} cx="50%" cy="50%" r="70.7%">
      {stops.map((position, index) => (
        <stop
          key={index}
          offset={`${position}%`}
          stopColor={color}
          stopOpacity={opacities[index] ?? 1}
        />
      ))}
    </radialGradient>
  )
}
