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
import { motion, useAnimate } from 'motion/react'
import { SkwircleClip } from '@/components/ui/core/skwircle-clip'
import type { LandingHeroConfig, SquircleLevel, HeroSize, TextSize } from '../config/types'

// Map squircle level to smoothing value (superellipse exponent)
// Lower = more circular, ~4-5 = classic iOS squircle, Higher = more rectangular
const SQUIRCLE_SMOOTHING: Record<SquircleLevel, number> = {
  none: 10.0,
  subtle: 7.0,
  moderate: 5.5,
  rounded: 4.0,
  ios: 5.0, // Classic iOS icon squircle - bulbous corners
  pill: 3.0,
  'pill-xl': 2.0,
}

// Size scale configuration
// Everything scales proportionally: asset, text, glow, spacing
const SIZE_SCALES: Record<HeroSize, {
  multiplier: number
  asset: { width: number; height: number }
  text: string
  gap: string
}> = {
  current: { multiplier: 1, asset: { width: 142, height: 80 }, text: 'text-xl', gap: 'gap-3' },
  M: { multiplier: 1.5, asset: { width: 213, height: 120 }, text: 'text-2xl', gap: 'gap-4' },
  L: { multiplier: 2, asset: { width: 284, height: 160 }, text: 'text-3xl', gap: 'gap-6' },
}

// Text size classes mapping
const TEXT_SIZE_CLASSES: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
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
  /** Called on pointer down - use for immediate press feedback */
  onPointerDown?: (e: React.PointerEvent) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  /** Optional ref for external video control */
  videoRef?: React.RefObject<HTMLVideoElement | null>
  /** Called when video ends */
  onVideoEnded?: () => void
  /** Custom glow color (overrides config) */
  glowColorOverride?: string | null
  /** Custom content to render below the hero (replaces default text) */
  children?: React.ReactNode | ((context: { textClass: string; textRef: React.RefObject<HTMLDivElement | null> }) => React.ReactNode)
}

export function LandingHero({
  config,
  onClick,
  onPointerDown: onPointerDownProp,
  onMouseEnter,
  onMouseLeave,
  videoRef,
  onVideoEnded,
  glowColorOverride,
  children,
}: LandingHeroProps) {
  const { background, image, text } = config
  const isVideo = image.mediaType === 'video'
  const sizeScale = SIZE_SCALES[image.size]
  const { multiplier } = sizeScale

  // Wait for media to load before showing
  const [isMediaReady, setIsMediaReady] = useState(false)

  // Use external ref if provided, else auto-play behavior
  const isExternallyControlled = Boolean(videoRef)

  // Imperative animation for responsive press feedback
  const [scope, animate] = useAnimate()
  const [textScope, animateText] = useAnimate()

  // Use custom text size if set, otherwise use size scale default
  const textClass = TEXT_SIZE_CLASSES[text.size]

  const handlePointerDown = (e: React.PointerEvent) => {
    // Stop any running animation and immediately scale down
    animate(scope.current, { scale: config.interaction.scaleOnClick }, { duration: 0.06 })
    // Animate text with stretchy squish effect (GPU-accelerated transforms only)
    if (text.animateOnPress && textScope.current) {
      animateText(textScope.current, {
        scaleY: text.pressScaleY,
        scaleX: text.pressScaleX,
        y: -text.pressOffsetY, // Negative Y to pull up toward asset
      }, { duration: 0.06 })
    }
    // Notify parent for immediate press actions (e.g., video start)
    onPointerDownProp?.(e)
  }

  const handlePointerUp = () => {
    animate(scope.current, { scale: 1 }, { duration: 0.12, type: 'spring', stiffness: 500, damping: 25 })
    // Spring back text to normal
    if (text.animateOnPress && textScope.current) {
      animateText(textScope.current, { scaleY: 1, scaleX: 1, y: 0 }, { duration: 0.12, type: 'spring', stiffness: 500, damping: 25 })
    }
  }

  const outerClasses = getOuterContainerClasses(config)
  const outerStyles = getOuterContainerStyles(config)
  const innerClasses = getInnerContainerClasses(config)
  const innerStyles = getInnerContainerStyles(config)

  // Scale glow sizes by size multiplier
  const scaledGlowSize = background.glowSize * multiplier
  const scaledGlowBlur = background.glowBlur * multiplier

  // Support custom glow color override (e.g., for confetti color flash)
  const glowStyle = glowColorOverride
    ? {
        width: scaledGlowSize,
        height: scaledGlowSize,
        background: `radial-gradient(circle, ${glowColorOverride} 0%, transparent ${background.glowSpread}%)`,
        opacity: background.glowOpacity,
        borderRadius: '50%',
        filter: scaledGlowBlur > 0 ? `blur(${scaledGlowBlur}px)` : undefined,
      }
    : getGlowStyle(
        background.glowColor,
        scaledGlowSize,
        background.glowOpacity,
        background.glowSpread,
        background.glowShape,
        scaledGlowBlur
      )

  // Scale secondary blob by size multiplier
  const scaledSecondaryBlobSize = background.secondaryBlobSize * multiplier
  const scaledSecondaryBlobOffsetX = background.secondaryBlobOffsetX * multiplier
  const scaledSecondaryBlobOffsetY = background.secondaryBlobOffsetY * multiplier
  const scaledSecondaryBlobBlur = background.secondaryBlobBlur * multiplier

  // Secondary blob style
  const secondaryBlobStyle: React.CSSProperties = {
    width: scaledSecondaryBlobSize,
    height: scaledSecondaryBlobSize,
    background: `radial-gradient(circle, ${getGlowColorVar(background.secondaryBlobColor)} 0%, transparent ${background.secondaryBlobSpread}%)`,
    opacity: background.secondaryBlobOpacity,
    borderRadius: '50%',
    transform: `translate(${scaledSecondaryBlobOffsetX}px, ${scaledSecondaryBlobOffsetY}px)`,
    filter: scaledSecondaryBlobBlur > 0 ? `blur(${scaledSecondaryBlobBlur}px)` : undefined,
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
      <div className={`relative z-10 flex min-h-screen flex-col items-center justify-center ${sizeScale.gap}`}>
        {/* Interactive wrapper with shadow - transparent, handles all interaction */}
        {/* Entry animation hides clip path calculation delay */}
        <motion.button
          ref={scope}
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMediaReady ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          onPointerDown={(e) => handlePointerDown(e)}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
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
                  shines={image.shines}
                  shadow={image.shadow}
                  style={{ width: sizeScale.asset.width, height: sizeScale.asset.height }}
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
                  height={sizeScale.asset.height}
                  width={sizeScale.asset.width}
                  draggable={false}
                  onLoad={() => setIsMediaReady(true)}
                  className="pointer-events-none select-none"
                />
              )}
            </div>
          </div>
        </motion.button>

        <motion.div
          ref={textScope}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMediaReady ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {typeof children === 'function'
            ? children({ textClass, textRef: textScope })
            : children ?? (
                <p className={`${textClass} font-medium text-primary opacity-50 transition-opacity duration-300 hover:opacity-100`}>
                  i like skwircles
                </p>
              )}
        </motion.div>
      </div>
    </div>
  )
}
