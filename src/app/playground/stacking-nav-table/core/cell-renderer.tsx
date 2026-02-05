/**
 * Stacking Nav + Table Playground - Cell Renderer
 *
 * Minimal cell rendering — wifi signal for threat level, origin text,
 * description text, realm badges, and sparkline lives rescued trends.
 */

'use client'

import React from 'react'
import Image from 'next/image'
import type { Character } from '../config/types'
import { getOriginSlug } from '../config/origin-avatars'
import { Badge, type BadgeColor, type BadgeStyle, type BadgeShape } from '@/components/ui/core/primitives/badge'

// =============================================================================
// CHARACTER AVATAR PATH (inlined from archived character-avatars)
// =============================================================================

/** Slugs that have PNG files (PokéAPI official artwork sprites) */
const PNG_SLUGS = new Set(['pikachu', 'mewtwo', 'charizard', 'meowth', 'snorlax', 'eevee'])

/** Returns the avatar image path for a character slug */
function getCharacterAvatarPath(slug: string): string {
  const ext = PNG_SLUGS.has(slug) ? 'png' : 'jpg'
  return `/character-avatars/${slug}.${ext}`
}

// =============================================================================
// THREAT LEVEL (wifi signal column)
// =============================================================================

const BAR_HEIGHTS = [3, 5, 7, 9, 12]

/** Get filled bars based on power score (1-100) */
function getFilledBars(score: number): number {
  if (score >= 85) return 5
  if (score >= 55) return 4
  if (score >= 25) return 3
  if (score >= 10) return 2
  return 1
}

function ThreatSignal({ score }: { score: number }) {
  const filled = getFilledBars(score)

  return (
    <div className="text-secondary flex items-end gap-[2px]">
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm bg-current"
          style={{
            height: h,
            opacity: i < filled ? 0.75 : 0.12,
          }}
        />
      ))}
      <span className="ml-1.5 text-[11px] font-medium tabular-nums leading-none opacity-35">
        {score}
      </span>
    </div>
  )
}

// =============================================================================
// SPARKLINE (Signed: -100 to +100)
// =============================================================================

const SPARK_W = 100
const SPARK_PAD = 2

export interface BadgeConfig {
  style: BadgeStyle
  shape: BadgeShape
  neutral: boolean
}

export interface OriginAvatarConfig {
  width: number
  height: number
  imageType: 'none' | 'poster' | 'logo' | 'backdrop'
  showLabel: boolean
  labelOpacity: number
  logoBg: boolean
  logoBgColor: string
  logoPaddingX: number
  logoPaddingY: number
  logoShine: string
  logoSquircle: boolean
  logoInvert: number
  // Logo outline
  logoOutline: boolean
  logoOutlineColor: string
  logoOutlineSize: number
  logoOutlineOpacity: number
  logoOutlineIntensity: number
  // Backdrop behind
  showBackdrop: boolean
  backdropPaddingX: number
  backdropPaddingY: number
  backdropShine: string
  backdropOpacity: number
  backdropRadius: number
}

export interface SparklineConfig {
  height: number
  strokeWidth: number
  showFill: boolean
  showDot: boolean
  showBaseline: boolean
  baselineWidth: number
  baselineOpacity: number
}

export type BarColorMode = 'neutral' | 'status' | 'chart'
export type ChartColorId = '1' | '2' | '3' | '4'
export type StatusColorId = 'neutral' | 'neutral-dark' | 'success' | 'error' | 'warning' | 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4'

export interface BarSparklineConfig {
  height: number
  gap: number
  radius: number
  opacity: number
  colorMode: BarColorMode
  chartColor: ChartColorId
  positiveColor: StatusColorId
  negativeColor: StatusColorId
  showTips: boolean
  tipSize: number
  tipColorMode: BarColorMode
  tipChartColor: ChartColorId
  tipPositiveColor: StatusColorId
  tipNegativeColor: StatusColorId
  showTrendLine: boolean
  trendLineWidth: number
  trendLineOpacity: number
  trendLineColorMode: BarColorMode
  trendLineChartColor: ChartColorId
  trendLineStatusColor: StatusColorId
  showBaseline: boolean
  baselineWidth: number
  baselineOpacity: number
  baselineColorMode: BarColorMode
  baselineChartColor: ChartColorId
  baselineStatusColor: StatusColorId
}

export type ChartType = 'line' | 'bar'

const DEFAULT_SPARKLINE_CONFIG: SparklineConfig = {
  height: 24,
  strokeWidth: 1.5,
  showFill: true,
  showDot: true,
  showBaseline: true,
  baselineWidth: 1,
  baselineOpacity: 0.3,
}

const DEFAULT_BAR_SPARKLINE_CONFIG: BarSparklineConfig = {
  height: 24,
  gap: 1,
  radius: 1,
  opacity: 0.7,
  colorMode: 'neutral',
  chartColor: '1',
  positiveColor: 'success',
  negativeColor: 'error',
  showTips: false,
  tipSize: 2,
  tipColorMode: 'status',
  tipChartColor: '1',
  tipPositiveColor: 'success',
  tipNegativeColor: 'error',
  showTrendLine: false,
  trendLineWidth: 1,
  trendLineOpacity: 0.6,
  trendLineColorMode: 'neutral',
  trendLineChartColor: '1',
  trendLineStatusColor: 'neutral-dark',
  showBaseline: true,
  baselineWidth: 1,
  baselineOpacity: 0.3,
  baselineColorMode: 'neutral',
  baselineChartColor: '1',
  baselineStatusColor: 'neutral',
}

// Chart color CSS variable mapping
const CHART_COLORS: Record<ChartColorId, string> = {
  '1': 'var(--color-chart-1)',
  '2': 'var(--color-chart-2)',
  '3': 'var(--color-chart-3)',
  '4': 'var(--color-chart-4)',
}

// Status color CSS variable mapping
const STATUS_COLORS: Record<StatusColorId, string> = {
  'neutral': 'var(--color-fg-quaternary)',
  'neutral-dark': 'var(--color-fg-tertiary)',
  'success': 'var(--color-success-500)',
  'error': 'var(--color-error-500)',
  'warning': 'var(--color-warning-500)',
  'chart-1': 'var(--color-chart-1)',
  'chart-2': 'var(--color-chart-2)',
  'chart-3': 'var(--color-chart-3)',
  'chart-4': 'var(--color-chart-4)',
}

/**
 * Get the fill color for a bar based on color mode and value.
 */
function getBarColor(
  mode: BarColorMode,
  chartColor: ChartColorId,
  positiveColor: StatusColorId,
  negativeColor: StatusColorId,
  isPositive: boolean
): string {
  switch (mode) {
    case 'status':
      return isPositive ? STATUS_COLORS[positiveColor] : STATUS_COLORS[negativeColor]
    case 'chart':
      return CHART_COLORS[chartColor]
    case 'neutral':
    default:
      return 'var(--color-fg-quaternary)'
  }
}


/**
 * Get the color for a line (trend line or baseline) based on color mode.
 */
function getLineColor(
  mode: BarColorMode,
  chartColor: ChartColorId,
  statusColor: StatusColorId
): string {
  switch (mode) {
    case 'status':
      return STATUS_COLORS[statusColor]
    case 'chart':
      return CHART_COLORS[chartColor]
    case 'neutral':
    default:
      return 'var(--color-fg-tertiary)'
  }
}

/**
 * Signed sparkline for lives rescued/taken.
 * - Dynamic Y scaling based on data (always includes zero)
 * - Positive values (lives saved): green (above baseline)
 * - Negative values (lives taken): red (below baseline)
 * - Uses clip paths to ensure correct colors based on Y position
 */
function Sparkline({ data, config = DEFAULT_SPARKLINE_CONFIG }: { data: number[]; config?: SparklineConfig }) {
  const positiveGradientId = React.useId()
  const negativeGradientId = React.useId()
  const positiveClipId = React.useId()
  const negativeClipId = React.useId()
  if (!data.length) return null

  const h = config.height

  // Dynamic range based on data, but always include zero with padding
  const dataMin = Math.min(...data)
  const dataMax = Math.max(...data)
  // Ensure zero is always visible, add 10% padding
  const padding = Math.max(Math.abs(dataMax), Math.abs(dataMin), 10) * 0.15
  const minRange = Math.min(0, dataMin) - padding
  const maxRange = Math.max(0, dataMax) + padding
  const range = maxRange - minRange

  // Zero line position
  const zeroY = SPARK_PAD + (1 - (0 - minRange) / range) * (h - SPARK_PAD * 2)

  // Convert data to x,y points
  const points = data.map((v, i) => {
    const x = SPARK_PAD + (i / (data.length - 1)) * (SPARK_W - SPARK_PAD * 2)
    const y = SPARK_PAD + (1 - (v - minRange) / range) * (h - SPARK_PAD * 2)
    return [x, y, v] as const
  })

  const lastValue = data[data.length - 1]
  const lastPt = points[points.length - 1]

  // Build smooth curve path using cardinal spline
  const curvePath = buildSmoothPath(points)

  // Build fill areas
  const positiveAreaPath = buildSmoothAreaPath(points, zeroY, minRange, maxRange, range, true)
  const negativeAreaPath = buildSmoothAreaPath(points, zeroY, minRange, maxRange, range, false)

  return (
    <svg
      width={SPARK_W}
      height={h}
      viewBox={`0 0 ${SPARK_W} ${h}`}
      className="block"
    >
      <defs>
        {/* Clip path for positive region (above baseline) */}
        <clipPath id={positiveClipId}>
          <rect x="0" y="0" width={SPARK_W} height={zeroY} />
        </clipPath>
        {/* Clip path for negative region (below baseline) */}
        <clipPath id={negativeClipId}>
          <rect x="0" y={zeroY} width={SPARK_W} height={h - zeroY} />
        </clipPath>
        {config.showFill && (
          <>
            {/* Positive fill gradient (green, fades down toward baseline) */}
            <linearGradient id={positiveGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-success-500)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--color-success-500)" stopOpacity={0.02} />
            </linearGradient>
            {/* Negative fill gradient (red, fades up toward baseline) */}
            <linearGradient id={negativeGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-error-500)" stopOpacity={0.02} />
              <stop offset="100%" stopColor="var(--color-error-500)" stopOpacity={0.25} />
            </linearGradient>
          </>
        )}
      </defs>

      {/* Filled areas (bottom layer) */}
      {config.showFill && positiveAreaPath && (
        <path d={positiveAreaPath} fill={`url(#${positiveGradientId})`} />
      )}
      {config.showFill && negativeAreaPath && (
        <path d={negativeAreaPath} fill={`url(#${negativeGradientId})`} />
      )}

      {/* Positive line (green, clipped to above baseline) */}
      <path
        d={curvePath}
        fill="none"
        stroke="var(--color-success-500)"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${positiveClipId})`}
      />

      {/* Negative line (red, clipped to below baseline) */}
      <path
        d={curvePath}
        fill="none"
        stroke="var(--color-error-500)"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${negativeClipId})`}
      />

      {/* Zero baseline (rendered on top of lines) */}
      {config.showBaseline && (
        <line
          x1={SPARK_PAD}
          y1={zeroY}
          x2={SPARK_W - SPARK_PAD}
          y2={zeroY}
          stroke="currentColor"
          strokeWidth={config.baselineWidth}
          strokeOpacity={config.baselineOpacity}
          className="text-tertiary"
        />
      )}

      {/* End dot */}
      {config.showDot && (
        <circle
          cx={lastPt[0]}
          cy={lastPt[1]}
          r={Math.max(1.5, config.strokeWidth)}
          fill={lastValue >= 0 ? 'var(--color-success-500)' : 'var(--color-error-500)'}
        />
      )}
    </svg>
  )
}

/**
 * Build a smooth curved path using Catmull-Rom to Bezier conversion
 */
function buildSmoothPath(points: readonly (readonly [number, number, number])[]): string {
  if (points.length < 2) return ''
  if (points.length === 2) {
    return `M${points[0][0]},${points[0][1]} L${points[1][0]},${points[1][1]}`
  }

  const path: string[] = [`M${points[0][0]},${points[0][1]}`]

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]

    // Catmull-Rom to Bezier conversion (tension = 0.5)
    const tension = 0.35
    const cp1x = p1[0] + (p2[0] - p0[0]) * tension
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension

    path.push(`C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`)
  }

  return path.join(' ')
}

/**
 * Build smooth area path for fill (clips to positive or negative region)
 */
function buildSmoothAreaPath(
  points: readonly (readonly [number, number, number])[],
  zeroY: number,
  minRange: number,
  maxRange: number,
  range: number,
  positive: boolean
): string {
  if (points.length < 2) return ''

  // Create points clipped to zero line
  const clippedPoints = points.map(([x, y, v]) => {
    if (positive) {
      return [x, v >= 0 ? y : zeroY, v] as const
    } else {
      return [x, v < 0 ? y : zeroY, v] as const
    }
  })

  // Build the top curve
  const curvePath = buildSmoothPath(clippedPoints)

  // Close the path along the zero line
  const firstX = points[0][0]
  const lastX = points[points.length - 1][0]

  return `${curvePath} L${lastX},${zeroY} L${firstX},${zeroY} Z`
}

// =============================================================================
// BAR SPARKLINE (Neutral colors, positive/negative bars)
// =============================================================================

/**
 * Bar sparkline with configurable colors.
 * - Positive values: bars extend upward from baseline
 * - Negative values: bars extend downward from baseline
 * - Color modes: neutral (gray), status (green/red), chart (chart palette)
 * - Optional tips (colored accents at bar ends)
 * - Optional trend line overlay
 */
function BarSparkline({ data, config = DEFAULT_BAR_SPARKLINE_CONFIG }: { data: number[]; config?: BarSparklineConfig }) {
  const trendGradientId = React.useId()
  if (!data.length) return null

  const h = config.height

  // Dynamic range based on data, always include zero with padding
  const dataMin = Math.min(...data)
  const dataMax = Math.max(...data)
  const padding = Math.max(Math.abs(dataMax), Math.abs(dataMin), 10) * 0.15
  const minRange = Math.min(0, dataMin) - padding
  const maxRange = Math.max(0, dataMax) + padding
  const range = maxRange - minRange

  // Zero line position
  const zeroY = SPARK_PAD + (1 - (0 - minRange) / range) * (h - SPARK_PAD * 2)

  // Calculate bar width based on data points and gap
  const availableWidth = SPARK_W - SPARK_PAD * 2
  const totalGaps = (data.length - 1) * config.gap
  const barWidth = Math.max(1, (availableWidth - totalGaps) / data.length)

  // Convert data to bar positions
  const bars = data.map((v, i) => {
    const x = SPARK_PAD + i * (barWidth + config.gap)
    const valueY = SPARK_PAD + (1 - (v - minRange) / range) * (h - SPARK_PAD * 2)
    const isPositive = v >= 0

    // Bar extends from baseline to value
    const y = isPositive ? valueY : zeroY
    const barHeight = Math.abs(valueY - zeroY)

    return { x, y, width: barWidth, height: barHeight, value: v, isPositive, valueY }
  })

  // Build trend line path for overlay (same smooth algorithm)
  const trendPoints = data.map((v, i) => {
    const x = SPARK_PAD + i * (barWidth + config.gap) + barWidth / 2
    const y = SPARK_PAD + (1 - (v - minRange) / range) * (h - SPARK_PAD * 2)
    return [x, y, v] as const
  })
  const trendPath = buildSmoothPath(trendPoints)

  // Get trend line color based on mode
  const trendLineColor = getLineColor(
    config.trendLineColorMode,
    config.trendLineChartColor,
    config.trendLineStatusColor
  )

  // Get baseline color based on mode
  const baselineColor = getLineColor(
    config.baselineColorMode,
    config.baselineChartColor,
    config.baselineStatusColor
  )

  return (
    <svg
      width={SPARK_W}
      height={h}
      viewBox={`0 0 ${SPARK_W} ${h}`}
      className="block"
    >
      <defs>
        {config.showTrendLine && (
          <linearGradient id={trendGradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={trendLineColor} stopOpacity={config.trendLineOpacity * 0.5} />
            <stop offset="50%" stopColor={trendLineColor} stopOpacity={config.trendLineOpacity} />
            <stop offset="100%" stopColor={trendLineColor} stopOpacity={config.trendLineOpacity * 0.5} />
          </linearGradient>
        )}
      </defs>

      {/* Bars */}
      {bars.map((bar, i) => (
        <g key={i}>
          {/* Main bar body */}
          <rect
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height || 0.5}
            rx={Math.min(config.radius, bar.width / 2)}
            ry={Math.min(config.radius, bar.width / 2)}
            fill={getBarColor(config.colorMode, config.chartColor, config.positiveColor, config.negativeColor, bar.isPositive)}
            opacity={config.opacity}
          />

          {/* Tip accent (colored indicator at bar end) */}
          {config.showTips && bar.height > config.tipSize && (
            <rect
              x={bar.x}
              y={bar.isPositive ? bar.y : bar.y + bar.height - config.tipSize}
              width={bar.width}
              height={config.tipSize}
              rx={Math.min(config.radius, bar.width / 2)}
              ry={Math.min(config.radius, bar.width / 2)}
              fill={getBarColor(config.tipColorMode, config.tipChartColor, config.tipPositiveColor, config.tipNegativeColor, bar.isPositive)}
              opacity={0.9}
            />
          )}
        </g>
      ))}

      {/* Trend line overlay */}
      {config.showTrendLine && trendPath && (
        <path
          d={trendPath}
          fill="none"
          stroke={`url(#${trendGradientId})`}
          strokeWidth={config.trendLineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Zero baseline */}
      {config.showBaseline && (
        <line
          x1={SPARK_PAD}
          y1={zeroY}
          x2={SPARK_W - SPARK_PAD}
          y2={zeroY}
          stroke={baselineColor}
          strokeWidth={config.baselineWidth}
          strokeOpacity={config.baselineOpacity}
        />
      )}
    </svg>
  )
}


// =============================================================================
// ORIGIN AVATAR
// =============================================================================

const DEFAULT_AVATAR_CONFIG: OriginAvatarConfig = {
  width: 20,
  height: 20,
  imageType: 'poster',
  showLabel: true,
  labelOpacity: 1,
  logoBg: false,
  logoBgColor: 'bg-tertiary',
  logoPaddingX: 4,
  logoPaddingY: 3,
  logoShine: 'none',
  logoSquircle: false,
  logoInvert: 0,
  // Logo outline
  logoOutline: false,
  logoOutlineColor: 'auto',
  logoOutlineSize: 0.5,
  logoOutlineOpacity: 0.45,
  logoOutlineIntensity: 2,
  // Backdrop behind
  showBackdrop: false,
  backdropPaddingX: 8,
  backdropPaddingY: 6,
  backdropShine: 'shine-2-shadow-sm',
  backdropOpacity: 0.85,
  backdropRadius: 4,
}

function getOriginSrc(origin: string, imageType: 'none' | 'poster' | 'logo' | 'backdrop'): string {
  const slug = getOriginSlug(origin)
  switch (imageType) {
    case 'poster':
      return `/origins/${slug}.jpg`
    case 'logo':
      return `/origins-logos/${slug}.png`
    case 'backdrop':
      return `/origins-backdrops/${slug}.jpg`
    case 'none':
    default:
      return ''
  }
}

/**
 * Build CSS filter for logo outline effect using drop-shadow.
 * Creates a shape-following outline by stacking multiple drop-shadows.
 */
function buildLogoOutlineFilter(
  color: string,
  size: number,
  opacity: number,
  intensity: number,
): string {
  if (opacity <= 0) return 'none'

  // Color mapping
  const colorMap: Record<string, string> = {
    auto: 'var(--color-fg-primary)',
    dark: 'rgba(0, 0, 0, 1)',
    light: 'rgba(255, 255, 255, 1)',
    brand: 'var(--color-brand-primary)',
    subtle: 'var(--color-fg-tertiary)',
  }
  const baseColor = colorMap[color] || colorMap.auto

  // Stack shadows based on intensity
  const shadows: string[] = []
  for (let i = 0; i < intensity; i++) {
    // Each layer is slightly different for better coverage
    const spread = size * (1 + i * 0.2)
    shadows.push(
      `drop-shadow(0 0 ${spread}px color-mix(in srgb, ${baseColor} ${Math.round(opacity * 100)}%, transparent))`,
      `drop-shadow(${spread}px 0 ${spread * 0.5}px color-mix(in srgb, ${baseColor} ${Math.round(opacity * 80)}%, transparent))`,
      `drop-shadow(-${spread}px 0 ${spread * 0.5}px color-mix(in srgb, ${baseColor} ${Math.round(opacity * 80)}%, transparent))`,
      `drop-shadow(0 ${spread}px ${spread * 0.5}px color-mix(in srgb, ${baseColor} ${Math.round(opacity * 80)}%, transparent))`,
      `drop-shadow(0 -${spread}px ${spread * 0.5}px color-mix(in srgb, ${baseColor} ${Math.round(opacity * 80)}%, transparent))`
    )
  }

  return shadows.join(' ')
}

function OriginAvatar({ origin, config = DEFAULT_AVATAR_CONFIG }: { origin: string; config?: OriginAvatarConfig }) {
  const [errored, setErrored] = React.useState(false)
  const [backdropErrored, setBackdropErrored] = React.useState(false)
  const {
    width, height, imageType,
    logoBg, logoBgColor, logoPaddingX, logoPaddingY, logoShine, logoSquircle, logoInvert,
    logoOutline, logoOutlineColor, logoOutlineSize, logoOutlineOpacity, logoOutlineIntensity,
    showBackdrop, backdropPaddingX, backdropPaddingY, backdropShine, backdropOpacity, backdropRadius,
  } = config
  const src = getOriginSrc(origin, imageType)
  const backdropSrc = getOriginSrc(origin, 'backdrop')
  const initial = origin.charAt(0).toUpperCase()
  const isLogo = imageType === 'logo'
  const showBg = isLogo && logoBg
  const showBackdropBehind = isLogo && showBackdrop && !showBg
  const showOutline = isLogo && logoOutline && !showBg && !showBackdropBehind // Outline only when no background or backdrop

  // Build outline filter
  const outlineFilter = showOutline
    ? buildLogoOutlineFilter(logoOutlineColor, logoOutlineSize, logoOutlineOpacity, logoOutlineIntensity)
    : undefined

  if (errored) {
    return (
      <div
        className="bg-tertiary text-tertiary flex shrink-0 items-center justify-center rounded-sm text-[10px] font-medium"
        style={{ width, height }}
      >
        {initial}
      </div>
    )
  }

  const img = (
    <Image
      src={src}
      alt={origin}
      width={width}
      height={height}
      loading="lazy"
      className={`shrink-0 ${isLogo ? 'object-contain' : 'rounded-sm object-cover'} ${isLogo && logoInvert > 0 ? '[filter:invert(var(--logo-invert))] dark:[filter:none]' : ''}`}
      style={{
        width,
        height,
        borderRadius: showBg ? 0 : undefined,
        '--logo-invert': isLogo && logoInvert > 0 ? logoInvert : undefined,
        filter: showOutline ? outlineFilter : undefined,
      } as React.CSSProperties}
      onError={() => setErrored(true)}
    />
  )

  // Backdrop behind logo
  if (showBackdropBehind && !backdropErrored) {
    const containerClasses = [
      'relative flex shrink-0 items-center justify-center overflow-hidden',
      backdropShine !== 'none' ? backdropShine : '',
    ].filter(Boolean).join(' ')

    return (
      <div
        className={containerClasses}
        style={{
          borderRadius: backdropRadius,
          paddingInline: backdropPaddingX,
          paddingBlock: backdropPaddingY,
        }}
      >
        {/* Backdrop image */}
        <Image
          src={backdropSrc}
          alt=""
          fill
          loading="lazy"
          className="object-cover"
          style={{ opacity: backdropOpacity }}
          onError={() => setBackdropErrored(true)}
        />
        {/* Logo on top */}
        <div className="relative z-10">{img}</div>
      </div>
    )
  }

  if (showBg) {
    const bgClasses = [
      logoBgColor,
      'flex shrink-0 items-center justify-center',
      logoShine !== 'none' ? logoShine : '',
      logoSquircle ? 'corner-squircle' : '',
    ].filter(Boolean).join(' ')

    return (
      <div
        className={bgClasses}
        style={{
          borderRadius: 4,
          paddingInline: logoPaddingX,
          paddingBlock: logoPaddingY,
        }}
      >
        {img}
      </div>
    )
  }

  return img
}

// =============================================================================
// CHARACTER AVATAR
// =============================================================================

function CharacterAvatar({ name, slug }: { name: string; slug: string }) {
  const [errored, setErrored] = React.useState(false)
  const initial = name.charAt(0).toUpperCase()

  if (errored) {
    return (
      <div className="bg-tertiary text-tertiary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
        {initial}
      </div>
    )
  }

  return (
    <Image
      src={getCharacterAvatarPath(slug)}
      alt={name}
      width={20}
      height={20}
      loading="lazy"
      className="h-5 w-5 shrink-0 rounded-full object-cover"
      onError={() => setErrored(true)}
    />
  )
}

// =============================================================================
// HELPERS
// =============================================================================

/** "Tony Stark" → "Tony S." */
function formatShortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return fullName
  return `${parts[0]} ${parts[parts.length - 1][0]}.`
}

// =============================================================================
// CELL RENDERER
// =============================================================================

export function createRenderCell(
  sparklineConfig: SparklineConfig,
  avatarConfig?: OriginAvatarConfig,
  badgeConfig?: BadgeConfig,
  chartType: ChartType = 'line',
  barConfig?: BarSparklineConfig
) {
  return (columnKey: string, item: Character, _index: number): React.ReactNode =>
    renderCell(columnKey, item, _index, sparklineConfig, avatarConfig, badgeConfig, chartType, barConfig)
}

const renderCell = (
  columnKey: string,
  item: Character,
  _index: number,
  sparklineConfig?: SparklineConfig,
  avatarConfig?: OriginAvatarConfig,
  badgeConfig?: BadgeConfig,
  chartType: ChartType = 'line',
  barConfig?: BarSparklineConfig,
): React.ReactNode => {
  switch (columnKey) {
    case 'character': {
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <CharacterAvatar name={item.name} slug={item.slug} />
          <span className="text-secondary truncate text-sm font-medium">
            {formatShortName(item.name)}
          </span>
        </div>
      )
    }

    case 'realmBadge': {
      const realm = item.realmLabel as string
      const colorMap: Record<string, BadgeColor> = {
        Marvel: 'error',
        Anime: 'brand',
        Westeros: 'warning',
      }
      const color = badgeConfig?.neutral ? 'gray' : (colorMap[realm] ?? 'gray')
      const style = badgeConfig?.style ?? 'default'
      const shape = badgeConfig?.shape ?? 'pill'
      return (
        <Badge color={color} size="xs" shape={shape} style={style}>
          {realm}
        </Badge>
      )
    }

    case 'origin': {
      const showAvatar = avatarConfig?.imageType !== 'none'
      return (
        <div className="flex items-center gap-2 min-w-0">
          {showAvatar && <OriginAvatar origin={item.origin} config={avatarConfig} />}
          {avatarConfig?.showLabel !== false && (
            <span
              className="text-tertiary truncate text-xs"
              style={{ opacity: avatarConfig?.labelOpacity ?? 1 }}
            >
              {item.origin}
            </span>
          )}
        </div>
      )
    }

    case 'threatLevel':
      return <ThreatSignal score={item.powerScore as number} />

    case 'description':
      return (
        <span className="text-tertiary truncate text-xs italic">{item.description}</span>
      )

    case 'livesRescued':
      if (chartType === 'bar') {
        return <BarSparkline data={item.trend} config={barConfig} />
      }
      return <Sparkline data={item.trend} config={sparklineConfig} />

    default:
      return null
  }
}
