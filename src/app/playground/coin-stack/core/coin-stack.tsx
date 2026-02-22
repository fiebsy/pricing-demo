/**
 * Coin Stack Component
 *
 * 3D coin stack SVG with configurable gradients and effects.
 * Features two stacked coin tiers with customizable fills, strokes, and shadows.
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/coin-stack
 */

'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'
import type { CoinStackConfig, TierConfig } from '../config/types'
import { resolveColor } from '../config/options'
import {
  GradientDef,
  DropShadowFilter,
  InnerGlowFilter,
  ShineGradientDef,
} from '../utils/gradients'

// ============================================================================
// SVG Path Constants
// ============================================================================

// Bottom tier body (stacked edge effect with fill-rule evenodd)
const BOTTOM_BODY_PATH =
  'M151.947 95.8503C151.982 95.4314 152 95.01 152 94.5863C152 79.2783 128.719 66.8687 100 66.8687C71.2812 66.8687 48 79.2783 48 94.5863C48 95.01 48.0178 95.4314 48.0531 95.8503C48.0178 96.2693 48 96.6907 48 97.1143C48 97.538 48.0178 97.9594 48.0531 98.3783C48.0178 98.7973 48 99.2187 48 99.6423C48 100.066 48.0178 100.487 48.0531 100.906C48.0178 101.325 48 101.747 48 102.17C48 102.594 48.0178 103.015 48.0531 103.434C48.0178 103.853 48 104.275 48 104.698C48 105.122 48.0178 105.543 48.0531 105.962C48.0178 106.381 48 106.803 48 107.226C48 107.65 48.0178 108.071 48.0531 108.49C48.0178 108.909 48 109.331 48 109.754C48 110.178 48.0178 110.599 48.0531 111.018C48.0178 111.437 48 111.859 48 112.282C48 127.59 71.2812 140 100 140C128.719 140 152 127.59 152 112.282C152 111.859 151.982 111.437 151.947 111.018C151.982 110.599 152 110.178 152 109.754C152 109.331 151.982 108.909 151.947 108.49C151.982 108.071 152 107.65 152 107.226C152 106.803 151.982 106.381 151.947 105.962C151.982 105.543 152 105.122 152 104.698C152 104.275 151.982 103.853 151.947 103.434C151.982 103.015 152 102.594 152 102.17C152 101.747 151.982 101.325 151.947 100.906C151.982 100.487 152 100.066 152 99.6423C152 99.2187 151.982 98.7973 151.947 98.3783C151.982 97.9594 152 97.538 152 97.1143C152 96.6907 151.982 96.2693 151.947 95.8503Z'

// Bottom tier face (stroked ellipse)
const BOTTOM_FACE_PATH =
  'M150.951 94.6128C150.951 101.698 145.551 108.357 136.276 113.305C127.046 118.23 114.222 121.308 100 121.308C85.7781 121.308 72.9545 118.23 63.7244 113.305C54.4493 108.357 49.0493 101.698 49.0493 94.6128C49.0493 87.5273 54.4493 80.869 63.7244 75.9204C72.9545 70.9957 85.7781 67.9178 100 67.9178C114.222 67.9178 127.046 70.9957 136.276 75.9204C145.551 80.869 150.951 87.5273 150.951 94.6128Z'

// Top tier body (stacked edge effect with fill-rule evenodd)
const TOP_BODY_PATH =
  'M138.723 81.6162C138.749 81.3037 138.762 80.9894 138.762 80.6734C138.762 69.2558 121.407 60 99.9985 60C78.59 60 61.2349 69.2558 61.2349 80.6734C61.2349 80.9894 61.2482 81.3037 61.2745 81.6162C61.2482 81.9287 61.2349 82.243 61.2349 82.5589C61.2349 82.8749 61.2482 83.1892 61.2745 83.5017C61.2482 83.8142 61.2349 84.1285 61.2349 84.4445C61.2349 84.7604 61.2482 85.0747 61.2745 85.3872C61.2482 85.6997 61.2349 86.014 61.2349 86.33C61.2349 86.6459 61.2482 86.9602 61.2745 87.2727C61.2482 87.5852 61.2349 87.8995 61.2349 88.2155C61.2349 88.5315 61.2482 88.8458 61.2745 89.1583C61.2482 89.4708 61.2349 89.7851 61.2349 90.101C61.2349 90.417 61.2482 90.7313 61.2745 91.0438C61.2482 91.3563 61.2349 91.6706 61.2349 91.9866C61.2349 92.3025 61.2482 92.6168 61.2745 92.9293C61.2482 93.2418 61.2349 93.5561 61.2349 93.8721C61.2349 105.29 78.59 114.545 99.9985 114.545C121.407 114.545 138.762 105.29 138.762 93.8721C138.762 93.5561 138.749 93.2418 138.723 92.9293C138.749 92.6168 138.762 92.3025 138.762 91.9866C138.762 91.6706 138.749 91.3563 138.723 91.0438C138.749 90.7313 138.762 90.417 138.762 90.101C138.762 89.7851 138.749 89.4708 138.723 89.1583C138.749 88.8458 138.762 88.5315 138.762 88.2155C138.762 87.8995 138.749 87.5852 138.723 87.2727C138.749 86.9602 138.762 86.6459 138.762 86.33C138.762 86.014 138.749 85.6997 138.723 85.3872C138.749 85.0747 138.762 84.7604 138.762 84.4445C138.762 84.1285 138.749 83.8142 138.723 83.5017C138.749 83.1892 138.762 82.8749 138.762 82.5589C138.762 82.243 138.749 81.9287 138.723 81.6162Z'

// Top tier face (stroked ellipse)
const TOP_FACE_PATH =
  'M137.713 80.6734C137.713 85.8061 133.795 90.6968 126.915 94.366C120.08 98.0111 110.566 100.298 99.9986 100.298C89.4317 100.298 79.9172 98.0111 73.0823 94.366C66.2024 90.6968 62.2842 85.8061 62.2842 80.6734C62.2842 75.5407 66.2024 70.6501 73.0823 66.9809C79.9172 63.3357 89.4317 61.0492 99.9986 61.0492C110.566 61.0492 120.08 63.3357 126.915 66.9809C133.795 70.6501 137.713 75.5407 137.713 80.6734Z'

// Content-fitted viewBox with shadow padding
// Content bounds: x=48-152 (104px), y=60-140 (80px)
// With 24px padding for XL shadow spread
const VIEWBOX = '24 36 152 128'
const VIEWBOX_WIDTH = 152
const VIEWBOX_HEIGHT = 128

// ============================================================================
// Tier Renderer
// ============================================================================

interface TierProps {
  tier: TierConfig
  bodyPath: string
  facePath: string
  gradientId: string
  innerGlowId: string | null
  useInnerGlow: boolean
}

function Tier({ tier, bodyPath, facePath, gradientId, innerGlowId, useInnerGlow }: TierProps) {
  const fillValue = tier.useGradient ? `url(#${gradientId})` : resolveColor(tier.faceColor)

  return (
    <g>
      {/* Body of coin (stacked edge effect) */}
      <path
        d={bodyPath}
        fillRule="evenodd"
        clipRule="evenodd"
        fill={resolveColor(tier.shadowColor)}
        fillOpacity={tier.shadowOpacity / 100}
      />
      {/* Face of coin (stroked ellipse) */}
      <path
        d={facePath}
        fill={fillValue}
        stroke={resolveColor(tier.strokeColor)}
        strokeWidth={tier.strokeWidth}
        filter={useInnerGlow && innerGlowId ? `url(#${innerGlowId})` : undefined}
      />
    </g>
  )
}

// ============================================================================
// Shine Overlay
// ============================================================================

interface ShineProps {
  intensity: 'subtle' | 'medium' | 'strong'
  gradientId: string
}

const SHINE_OPACITIES = {
  subtle: 0.15,
  medium: 0.25,
  strong: 0.4,
}

function Shine({ intensity, gradientId }: ShineProps) {
  const opacity = SHINE_OPACITIES[intensity]

  // Simplified shine overlay on top face
  return (
    <ellipse
      cx={100}
      cy={80.6734}
      rx={38}
      ry={20}
      fill={`url(#${gradientId})`}
      fillOpacity={opacity}
      style={{ pointerEvents: 'none' }}
    />
  )
}

// ============================================================================
// Props
// ============================================================================

interface CoinStackProps {
  config: CoinStackConfig
  className?: string
}

// ============================================================================
// Main Component
// ============================================================================

export function CoinStack({ config, className }: CoinStackProps) {
  const instanceId = useId()

  const { size, bottomTier, topTier, effects, demo } = config

  // Calculate dimensions - aspect ratio is determined by viewBox content
  const width = size.width
  const height = width * (VIEWBOX_HEIGHT / VIEWBOX_WIDTH)

  // Generate unique IDs for this instance
  const bottomGradientId = `bottom-gradient-${instanceId}`
  const topGradientId = `top-gradient-${instanceId}`
  const dropShadowId = `drop-shadow-${instanceId}`
  const bottomInnerGlowId = `bottom-inner-glow-${instanceId}`
  const topInnerGlowId = `top-inner-glow-${instanceId}`
  const shineGradientId = `shine-gradient-${instanceId}`

  // Check if we need filters
  const hasDropShadow = effects.dropShadow !== 'none'
  const hasInnerGlow = effects.innerGlow !== 'none'
  const hasShine = effects.shineOverlay !== 'none'

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <svg
        width={width}
        height={height}
        viewBox={VIEWBOX}
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradients */}
          {bottomTier.useGradient && (
            <GradientDef id={bottomGradientId} config={bottomTier.gradient} />
          )}
          {topTier.useGradient && <GradientDef id={topGradientId} config={topTier.gradient} />}

          {/* Drop shadow filter */}
          {hasDropShadow && (
            <DropShadowFilter
              id={dropShadowId}
              size={effects.dropShadow as 'sm' | 'md' | 'lg' | 'xl'}
              color={effects.dropShadowColor}
              opacity={effects.dropShadowOpacity}
            />
          )}

          {/* Inner glow filters */}
          {hasInnerGlow && (
            <>
              <InnerGlowFilter
                id={bottomInnerGlowId}
                intensity={effects.innerGlow as 'subtle' | 'medium' | 'strong'}
                color={effects.innerGlowColor}
              />
              <InnerGlowFilter
                id={topInnerGlowId}
                intensity={effects.innerGlow as 'subtle' | 'medium' | 'strong'}
                color={effects.innerGlowColor}
              />
            </>
          )}

          {/* Shine gradient */}
          {hasShine && <ShineGradientDef id={shineGradientId} />}
        </defs>

        {/* Main content group with drop shadow */}
        <g filter={hasDropShadow ? `url(#${dropShadowId})` : undefined}>
          {/* Bottom tier */}
          <Tier
            tier={bottomTier}
            bodyPath={BOTTOM_BODY_PATH}
            facePath={BOTTOM_FACE_PATH}
            gradientId={bottomGradientId}
            innerGlowId={bottomInnerGlowId}
            useInnerGlow={hasInnerGlow}
          />

          {/* Top tier */}
          <Tier
            tier={topTier}
            bodyPath={TOP_BODY_PATH}
            facePath={TOP_FACE_PATH}
            gradientId={topGradientId}
            innerGlowId={topInnerGlowId}
            useInnerGlow={hasInnerGlow}
          />

          {/* Shine overlay on top face */}
          {hasShine && (
            <Shine
              intensity={effects.shineOverlay as 'subtle' | 'medium' | 'strong'}
              gradientId={shineGradientId}
            />
          )}
        </g>

        {/* Debug overlay */}
        {demo.showDebug && (
          <g>
            {/* Center crosshair */}
            <line
              x1={24 + VIEWBOX_WIDTH / 2}
              y1="36"
              x2={24 + VIEWBOX_WIDTH / 2}
              y2={36 + VIEWBOX_HEIGHT}
              stroke="red"
              strokeWidth="0.5"
              strokeDasharray="4 2"
            />
            <line
              x1="24"
              y1={36 + VIEWBOX_HEIGHT / 2}
              x2={24 + VIEWBOX_WIDTH}
              y2={36 + VIEWBOX_HEIGHT / 2}
              stroke="red"
              strokeWidth="0.5"
              strokeDasharray="4 2"
            />
            {/* ViewBox boundary */}
            <rect
              x="24.5"
              y="36.5"
              width={VIEWBOX_WIDTH - 1}
              height={VIEWBOX_HEIGHT - 1}
              fill="none"
              stroke="blue"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
          </g>
        )}
      </svg>
    </div>
  )
}

CoinStack.displayName = 'CoinStack'
