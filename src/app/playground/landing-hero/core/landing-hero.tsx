/**
 * Landing Hero Component
 *
 * A migration-ready hero component with configurable background effects,
 * image container styling, and interactive states.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/landing-hero
 */

'use client'

import Image from 'next/image'
import type { LandingHeroConfig } from '../config/types'
import {
  getOuterContainerClasses,
  getOuterContainerStyles,
  getInnerContainerClasses,
  getInnerContainerStyles,
  getBlurCircleColorVar,
  getActiveScaleClass,
  getShadowClass,
} from '../utils/class-builders'

// ============================================================================
// SVG Pattern Component
// ============================================================================

interface SVGPatternProps {
  type: string
  opacity: number
}

function SVGPattern({ type, opacity }: SVGPatternProps) {
  if (type === 'none') return null

  const patterns: Record<string, React.ReactNode> = {
    dots: (
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" />
      </pattern>
    ),
    grid: (
      <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    ),
    diagonal: (
      <pattern id="diagonal" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 0 10 L 10 0" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    ),
  }

  return (
    <svg className="absolute inset-0 h-full w-full text-primary" style={{ opacity }}>
      <defs>{patterns[type]}</defs>
      <rect width="100%" height="100%" fill={`url(#${type})`} />
    </svg>
  )
}

// ============================================================================
// Landing Hero Component
// ============================================================================

interface LandingHeroProps {
  config: LandingHeroConfig
  onClick?: (e: React.MouseEvent) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function LandingHero({ config, onClick, onMouseEnter, onMouseLeave }: LandingHeroProps) {
  const { background, image } = config

  const outerClasses = getOuterContainerClasses(config)
  const outerStyles = getOuterContainerStyles(config)
  const innerClasses = getInnerContainerClasses(config)
  const innerStyles = getInnerContainerStyles(config)
  const activeScaleClass = getActiveScaleClass(config.interaction.scaleOnClick)

  const blurCircleStyle = {
    width: background.blurCircleSize,
    height: background.blurCircleSize,
    opacity: background.blurCircleOpacity,
    filter: `blur(${background.blurAmount}px)`,
    backgroundColor: getBlurCircleColorVar(background.blurCircleColor),
  }

  const isAssetPosition = background.blurCirclePosition === 'asset'

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      {/* SVG Pattern - fixed to viewport */}
      {background.showPattern && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <SVGPattern type={background.patternType} opacity={background.patternOpacity} />
        </div>
      )}

      {/* Blur circle - fixed centered in viewport (only when position is 'center') */}
      {background.showBlurCircle && !isAssetPosition && (
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
          <div className="rounded-full" style={blurCircleStyle} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4">
        {/* Interactive wrapper with shadow - transparent, handles all interaction */}
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`relative cursor-pointer transition-all duration-150 ${getShadowClass(config.image.shadow)} ${config.image.outerCorner === 'squircle' ? 'corner-squircle' : ''} ${activeScaleClass}`}
          style={{ borderRadius: `${config.image.outerBorderRadius}px` }}
        >
          {/* Blur circle behind asset (only when position is 'asset') */}
          {background.showBlurCircle && isAssetPosition && (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={blurCircleStyle}
            />
          )}
          {/* Visual container with shine and background */}
          <div className={`relative ${outerClasses}`} style={outerStyles}>
            <div className={innerClasses} style={innerStyles}>
              <Image
                src="/skwircle-kid.png"
                alt="i like skwircles"
                height={80}
                width={142}
                draggable={false}
                className="pointer-events-none select-none"
              />
            </div>
          </div>
        </button>

        <p className="text-xl font-medium text-primary opacity-50 transition-opacity duration-300 hover:opacity-100">
          i like skwircles
        </p>
      </div>
    </div>
  )
}
