import React from 'react'
import { getColorValue } from '../lib/utils'
import type { GradientBorderConfig } from '../types'

interface SquircleGradientsProps {
  instanceId: string
  gradientConfig: GradientBorderConfig | null
  backgroundGradientConfig: GradientBorderConfig | null
}

/**
 * SVG Gradient Definitions Component
 * Handles all linear, radial, and conic gradient rendering for borders and backgrounds
 */
export const SquircleGradients: React.FC<SquircleGradientsProps> = ({
  instanceId,
  gradientConfig,
  backgroundGradientConfig,
}) => {
  return (
    <>
      {/* BORDER GRADIENT DEFINITIONS */}

      {/* Linear gradient */}
      {gradientConfig && (gradientConfig.type === 'linear' || gradientConfig.type === 'corner-emphasis') && (() => {
        const angle = gradientConfig.angle || 135
        const radians = (angle * Math.PI) / 180
        const x1 = 50 - 50 * Math.cos(radians)
        const y1 = 50 - 50 * Math.sin(radians)
        const x2 = 50 + 50 * Math.cos(radians)
        const y2 = 50 + 50 * Math.sin(radians)

        return (
          <linearGradient
            id={`border-gradient-${instanceId}`}
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
          >

          {gradientConfig.opacities && gradientConfig.opacities.length === 5 ? (
            // 5-stop gradient for fine control
            <>
              <stop
                offset={`${gradientConfig.stops?.[0] ?? 0}%`}
                stopColor={getColorValue(gradientConfig.colors[0])}
                stopOpacity={gradientConfig.opacities[0]}
              />
              <stop
                offset={`${gradientConfig.stops?.[1] ?? 25}%`}
                stopColor={getColorValue(gradientConfig.colors[0])}
                stopOpacity={gradientConfig.opacities[1]}
              />
              <stop
                offset={`${gradientConfig.stops?.[2] ?? 50}%`}
                stopColor={getColorValue(gradientConfig.colors[0])}
                stopOpacity={gradientConfig.opacities[2]}
              />
              <stop
                offset={`${gradientConfig.stops?.[3] ?? 75}%`}
                stopColor={getColorValue(gradientConfig.colors[0])}
                stopOpacity={gradientConfig.opacities[3]}
              />
              <stop
                offset={`${gradientConfig.stops?.[4] ?? 100}%`}
                stopColor={getColorValue(gradientConfig.colors[0])}
                stopOpacity={gradientConfig.opacities[4]}
              />
            </>
          ) : (
            // 3-stop gradient
            <>
              <stop offset="0%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.startOpacity ?? 1.0} />
              <stop offset="50%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.middleOpacity ?? 0.2} />
              <stop offset="100%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.endOpacity ?? 1.0} />
            </>
          )}
        </linearGradient>
        )
      })()}

      {/* Radial gradient */}
      {gradientConfig && gradientConfig.type === 'radial' && (
        <radialGradient
          id={`border-gradient-${instanceId}`}
          cx="50%"
          cy="50%"
          r="70.7%"
        >
          {gradientConfig.opacities && gradientConfig.opacities.length === 5 ? (
            // 5-stop gradient for fine control
            <>
              <stop offset="0%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[0]} />
              <stop offset="25%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[1]} />
              <stop offset="50%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[2]} />
              <stop offset="75%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[3]} />
              <stop offset="100%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[4]} />
            </>
          ) : (
            // 3-stop gradient
            <>
              <stop offset="0%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.startOpacity ?? 1.0} />
              <stop offset="50%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.middleOpacity ?? 0.2} />
              <stop offset="100%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.endOpacity ?? 1.0} />
            </>
          )}
        </radialGradient>
      )}

      {/* Conic gradient */}
      {gradientConfig && gradientConfig.type === 'conic' && (
        <defs>
          <linearGradient
            id={`border-gradient-${instanceId}`}
            gradientTransform={`rotate(${gradientConfig.angle || 0})`}
          >
            {gradientConfig.opacities && gradientConfig.opacities.length === 5 ? (
              // 5-stop gradient for fine control (simulating conic with linear)
              <>
                <stop offset="0%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[0]} />
                <stop offset="25%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[1]} />
                <stop offset="50%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[2]} />
                <stop offset="75%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[3]} />
                <stop offset="100%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.opacities[4]} />
              </>
            ) : (
              // 3-stop gradient
              <>
                <stop offset="0%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.startOpacity ?? 1.0} />
                <stop offset="50%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.middleOpacity ?? 0.2} />
                <stop offset="100%" stopColor={getColorValue(gradientConfig.colors[0])} stopOpacity={gradientConfig.endOpacity ?? 1.0} />
              </>
            )}
          </linearGradient>
        </defs>
      )}

      {/* BACKGROUND GRADIENT DEFINITIONS */}

      {/* Linear background gradient */}
      {backgroundGradientConfig && (backgroundGradientConfig.type === 'linear' || backgroundGradientConfig.type === 'corner-emphasis') && (() => {
        const angle = backgroundGradientConfig.angle || 135
        const radians = (angle * Math.PI) / 180
        const x1 = 50 - 50 * Math.cos(radians)
        const y1 = 50 - 50 * Math.sin(radians)
        const x2 = 50 + 50 * Math.cos(radians)
        const y2 = 50 + 50 * Math.sin(radians)

        return (
          <linearGradient
            id={`background-gradient-${instanceId}`}
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
          >

          {backgroundGradientConfig.opacities && backgroundGradientConfig.stops ? (
            // Dynamic stop gradient - supports any number of stops
            <>
              {backgroundGradientConfig.stops.map((position, index) => (
                <stop
                  key={index}
                  offset={`${position}%`}
                  stopColor={getColorValue(backgroundGradientConfig.colors[0])}
                  stopOpacity={backgroundGradientConfig.opacities?.[index] ?? 1}
                />
              ))}
            </>
          ) : backgroundGradientConfig.opacities && backgroundGradientConfig.opacities.length === 5 ? (
            // 5-stop gradient (fallback)
            <>
              <stop offset="0%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[0] ?? 1} />
              <stop offset="25%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[1] ?? 1} />
              <stop offset="50%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[2] ?? 1} />
              <stop offset="75%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[3] ?? 1} />
              <stop offset="100%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[4] ?? 1} />
            </>
          ) : (
            // 3-stop gradient
            <>
              <stop offset="0%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.startOpacity ?? 1.0} />
              <stop offset="50%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.middleOpacity ?? 0.2} />
              <stop offset="100%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.endOpacity ?? 1.0} />
            </>
          )}
        </linearGradient>
        )
      })()}

      {/* Radial background gradient */}
      {backgroundGradientConfig && backgroundGradientConfig.type === 'radial' && (
        <radialGradient
          id={`background-gradient-${instanceId}`}
          cx="50%"
          cy="50%"
          r="70.7%"
        >
          {backgroundGradientConfig.opacities && backgroundGradientConfig.stops ? (
            // Dynamic stop gradient - supports any number of stops
            <>
              {backgroundGradientConfig.stops.map((position, index) => (
                <stop
                  key={index}
                  offset={`${position}%`}
                  stopColor={getColorValue(backgroundGradientConfig.colors[0])}
                  stopOpacity={backgroundGradientConfig.opacities?.[index] ?? 1}
                />
              ))}
            </>
          ) : backgroundGradientConfig.opacities && backgroundGradientConfig.opacities.length === 5 ? (
            // 5-stop gradient
            <>
              <stop offset="0%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[0] ?? 1} />
              <stop offset="25%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[1] ?? 1} />
              <stop offset="50%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[2] ?? 1} />
              <stop offset="75%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[3] ?? 1} />
              <stop offset="100%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[4] ?? 1} />
            </>
          ) : (
            // 3-stop gradient
            <>
              <stop offset="0%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.startOpacity ?? 1.0} />
              <stop offset="50%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.middleOpacity ?? 0.2} />
              <stop offset="100%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.endOpacity ?? 1.0} />
            </>
          )}
        </radialGradient>
      )}

      {/* Conic background gradient */}
      {backgroundGradientConfig && backgroundGradientConfig.type === 'conic' && (
        <defs>
          <linearGradient
            id={`background-gradient-${instanceId}`}
            gradientTransform={`rotate(${backgroundGradientConfig.angle || 0})`}
          >
            {backgroundGradientConfig.opacities && backgroundGradientConfig.stops ? (
              // Dynamic stop gradient - supports any number of stops
              <>
                {backgroundGradientConfig.stops.map((position, index) => (
                  <stop
                    key={index}
                    offset={`${position}%`}
                    stopColor={getColorValue(backgroundGradientConfig.colors[0])}
                    stopOpacity={backgroundGradientConfig.opacities?.[index] ?? 1}
                  />
                ))}
              </>
            ) : backgroundGradientConfig.opacities && backgroundGradientConfig.opacities.length === 5 ? (
              // 5-stop gradient
              <>
                <stop offset="0%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[0] ?? 1} />
                <stop offset="25%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[1] ?? 1} />
                <stop offset="50%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[2] ?? 1} />
                <stop offset="75%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[2] ?? 1} />
                <stop offset="100%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.opacities?.[2] ?? 1} />
              </>
            ) : (
              // 3-stop gradient
              <>
                <stop offset="0%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.startOpacity ?? 1.0} />
                <stop offset="50%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.middleOpacity ?? 0.2} />
                <stop offset="100%" stopColor={getColorValue(backgroundGradientConfig.colors[0])} stopOpacity={backgroundGradientConfig.endOpacity ?? 1.0} />
              </>
            )}
          </linearGradient>
        </defs>
      )}
    </>
  )
}
