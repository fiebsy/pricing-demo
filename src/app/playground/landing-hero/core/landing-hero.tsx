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

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { SkwircleClip } from '@/components/ui/core/skwircle-clip'
import type { LandingHeroConfig, SquircleLevel } from '../config/types'

// Map squircle level to smoothing value (matches ROUNDNESS_CONFIGS)
const SQUIRCLE_SMOOTHING: Record<SquircleLevel, number> = {
  none: 10.0,
  subtle: 7.0,
  moderate: 5.5,
  rounded: 4.0,
  pill: 3.0,
}
import {
  getOuterContainerClasses,
  getOuterContainerStyles,
  getInnerContainerClasses,
  getInnerContainerStyles,
  getGlowStyle,
  getGlowColorVar,
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
  /** Optional ref for external video control */
  videoRef?: React.RefObject<HTMLVideoElement | null>
  /** Called when video ends */
  onVideoEnded?: () => void
  /** Custom glow color (overrides config) */
  glowColorOverride?: string | null
  /** Custom content to render below the hero (replaces default text) */
  children?: React.ReactNode
}

export function LandingHero({
  config,
  onClick,
  onMouseEnter,
  onMouseLeave,
  videoRef,
  onVideoEnded,
  glowColorOverride,
  children,
}: LandingHeroProps) {
  const { background, image } = config
  const isVideo = image.mediaType === 'video'

  // Wait for media to load before showing
  const [isMediaReady, setIsMediaReady] = useState(false)

  // Use external ref if provided, else auto-play behavior
  const isExternallyControlled = Boolean(videoRef)

  const outerClasses = getOuterContainerClasses(config)
  const outerStyles = getOuterContainerStyles(config)
  const innerClasses = getInnerContainerClasses(config)
  const innerStyles = getInnerContainerStyles(config)

  // Support custom glow color override (e.g., for confetti color flash)
  const glowStyle = glowColorOverride
    ? {
        width: background.glowSize,
        height: background.glowSize,
        background: `radial-gradient(circle, ${glowColorOverride} 0%, transparent ${background.glowSpread}%)`,
        opacity: background.glowOpacity,
        borderRadius: '50%',
        filter: background.glowBlur > 0 ? `blur(${background.glowBlur}px)` : undefined,
      }
    : getGlowStyle(
        background.glowColor,
        background.glowSize,
        background.glowOpacity,
        background.glowSpread,
        background.glowShape,
        background.glowBlur
      )

  // Secondary blob style
  const secondaryBlobStyle: React.CSSProperties = {
    width: background.secondaryBlobSize,
    height: background.secondaryBlobSize,
    background: `radial-gradient(circle, ${getGlowColorVar(background.secondaryBlobColor)} 0%, transparent ${background.secondaryBlobSpread}%)`,
    opacity: background.secondaryBlobOpacity,
    borderRadius: '50%',
    transform: `translate(${background.secondaryBlobOffsetX}px, ${background.secondaryBlobOffsetY}px)`,
    filter: background.secondaryBlobBlur > 0 ? `blur(${background.secondaryBlobBlur}px)` : undefined,
  }

  const isAssetPosition = background.glowPosition === 'asset'

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      {/* SVG Pattern - fixed to viewport */}
      {background.showPattern && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <SVGPattern type={background.patternType} opacity={background.patternOpacity} />
        </div>
      )}

      {/* Glow - fixed centered in viewport (only when position is 'center') */}
      {background.showGlow && !isAssetPosition && (
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
          <div style={glowStyle} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4">
        {/* Interactive wrapper with shadow - transparent, handles all interaction */}
        {/* Entry animation hides clip path calculation delay */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMediaReady ? 1 : 0 }}
          whileTap={{ scale: config.interaction.scaleOnClick, transition: { duration: 0.05 } }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`relative cursor-pointer transition-shadow duration-150 ${!isVideo ? getShadowClass(config.image.shadow) : ''} ${!isVideo && config.image.outerCorner === 'squircle' ? 'corner-squircle' : ''}`}
          style={isVideo ? undefined : { borderRadius: `${config.image.outerBorderRadius}px` }}
        >
          {/* Glow behind asset (only when position is 'asset') */}
          {background.showGlow && isAssetPosition && (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={glowStyle}
            />
          )}
          {/* Secondary blob */}
          {background.showSecondaryBlob && (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
              style={secondaryBlobStyle}
            />
          )}
          {/* Visual container with shine and background */}
          <div
            className={`relative z-10 ${isVideo ? '' : outerClasses}`}
            style={isVideo ? { padding: outerStyles.padding } : outerStyles}
          >
            <div
              className={isVideo ? 'overflow-hidden' : innerClasses}
              style={isVideo ? undefined : innerStyles}
            >
              {image.mediaType === 'video' ? (
                <SkwircleClip
                  radius={image.innerBorderRadius}
                  smoothing={SQUIRCLE_SMOOTHING[image.squircleLevel]}
                  shine={image.shine}
                  shineIntensity={image.shineIntensity}
                  shadow={image.shadow}
                  className="h-[80px] w-[142px]"
                >
                  <video
                    ref={videoRef}
                    src="/turtle/turtles3.mp4"
                    autoPlay={!isExternallyControlled}
                    loop={!isExternallyControlled}
                    muted={!isExternallyControlled}
                    playsInline
                    preload="auto"
                    onLoadedData={() => setIsMediaReady(true)}
                    onEnded={onVideoEnded}
                    className="h-full w-full object-cover"
                  />
                </SkwircleClip>
              ) : (
                <Image
                  src="/skwircle-kid.png"
                  alt="i like skwircles"
                  height={80}
                  width={142}
                  draggable={false}
                  onLoad={() => setIsMediaReady(true)}
                  className="pointer-events-none select-none"
                />
              )}
            </div>
          </div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMediaReady ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {children ?? (
            <p className="text-xl font-medium text-primary opacity-50 transition-opacity duration-300 hover:opacity-100">
              i like skwircles
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
