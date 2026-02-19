'use client'

import * as React from 'react'
import { useRef, useState, useEffect, useId, useMemo } from 'react'

type ShineType =
  | 'none'
  | 'shine-0'
  | 'shine-1'
  | 'shine-2'
  | 'shine-3'
  | 'shine-brand'
type ShineIntensity = '' | '-subtle' | '-intense'
type ShadowSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface SkwircleClipProps {
  children: React.ReactNode
  /** Border radius in pixels (default: 24) */
  radius?: number
  /** Smoothing factor - higher = more square (default: 3) */
  smoothing?: number
  /** Shine effect type */
  shine?: ShineType
  /** Shine intensity modifier */
  shineIntensity?: ShineIntensity
  /** Shadow size */
  shadow?: ShadowSize
  /** Additional className for the container */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Generate superellipse path for squircle clipping
 */
function generateClipPath(
  width: number,
  height: number,
  radius: number,
  smoothing: number
): string {
  const r = Math.min(radius, Math.min(width, height) / 2)
  const round = (n: number) => Math.round(n * 1000) / 1000
  const points = 32 // points per corner - higher = smoother curve

  const corner = (
    cx: number,
    cy: number,
    startAngle: number,
    endAngle: number
  ) => {
    let path = ''
    const step = (endAngle - startAngle) / (points - 1)
    for (let i = 0; i < points; i++) {
      const angle = startAngle + step * i
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const factor = Math.pow(
        Math.pow(Math.abs(cos), smoothing) + Math.pow(Math.abs(sin), smoothing),
        1 / smoothing
      )
      const x = cx + (r * cos) / factor
      const y = cy + (r * sin) / factor
      path += `L ${round(x)},${round(y)} `
    }
    return path
  }

  return [
    `M ${r},0`,
    `L ${width - r},0`,
    corner(width - r, r, -Math.PI / 2, 0),
    `L ${width},${height - r}`,
    corner(width - r, height - r, 0, Math.PI / 2),
    `L ${r},${height}`,
    corner(r, height - r, Math.PI / 2, Math.PI),
    `L 0,${r}`,
    corner(r, r, Math.PI, (3 * Math.PI) / 2),
    'Z',
  ].join(' ')
}

/**
 * Shadow configuration matching Tailwind shadow utilities
 */
interface ShadowConfig {
  blur: number
  spread: number
  offsetY: number
  opacity: number
}

function getShadowConfig(shadow: ShadowSize): ShadowConfig | null {
  if (shadow === 'none') return null

  const configs: Record<Exclude<ShadowSize, 'none'>, ShadowConfig> = {
    xs: { blur: 1, spread: 0, offsetY: 1, opacity: 0.05 },
    sm: { blur: 2, spread: 0, offsetY: 1, opacity: 0.05 },
    md: { blur: 6, spread: -1, offsetY: 4, opacity: 0.1 },
    lg: { blur: 15, spread: -3, offsetY: 10, opacity: 0.1 },
    xl: { blur: 25, spread: -5, offsetY: 20, opacity: 0.1 },
    '2xl': { blur: 50, spread: -12, offsetY: 25, opacity: 0.25 },
  }

  return configs[shadow]
}

/**
 * Shine configuration matching CSS
 */
interface ShineConfig {
  topHighlight: { offset: number; blur: number; opacity: number }
  bottomShadow: { offset: number; blur: number; opacity: number }
  border: { width: number; opacity: number }
}

function getShineConfig(
  shine: ShineType,
  intensity: ShineIntensity
): ShineConfig | null {
  if (shine === 'none') return null

  const mult =
    intensity === '-subtle' ? 0.6 : intensity === '-intense' ? 1.5 : 1

  const configs: Record<Exclude<ShineType, 'none'>, ShineConfig> = {
    'shine-0': {
      topHighlight: { offset: 1, blur: 1, opacity: 0.15 },
      bottomShadow: { offset: 1, blur: 1, opacity: 0.2 },
      border: { width: 1, opacity: 0.15 },
    },
    'shine-1': {
      topHighlight: { offset: 1, blur: 1, opacity: 0.25 },
      bottomShadow: { offset: 1, blur: 1, opacity: 0.2 },
      border: { width: 1, opacity: 0.1 },
    },
    'shine-2': {
      topHighlight: { offset: 1, blur: 1, opacity: 0.25 },
      bottomShadow: { offset: 1, blur: 1, opacity: 0.2 },
      border: { width: 1, opacity: 0.15 },
    },
    'shine-3': {
      topHighlight: { offset: 2, blur: 3, opacity: 0.25 },
      bottomShadow: { offset: 2, blur: 3, opacity: 0.2 },
      border: { width: 1, opacity: 0.2 },
    },
    'shine-brand': {
      topHighlight: { offset: 1, blur: 0, opacity: 0.4 },
      bottomShadow: { offset: 1, blur: 0, opacity: 0.5 },
      border: { width: 1, opacity: 0.1 },
    },
  }

  const config = configs[shine]
  return {
    topHighlight: {
      ...config.topHighlight,
      opacity: Math.min(config.topHighlight.opacity * mult, 1),
    },
    bottomShadow: {
      ...config.bottomShadow,
      opacity: Math.min(config.bottomShadow.opacity * mult, 1),
    },
    border: {
      ...config.border,
      opacity: Math.min(config.border.opacity * mult, 1),
    },
  }
}

export function SkwircleClip({
  children,
  radius = 24,
  smoothing = 3,
  shine = 'none',
  shineIntensity = '',
  shadow = 'none',
  className = '',
  style,
}: SkwircleClipProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const clipId = useId()
  const shadowFilterId = `${clipId}-shadow`
  const topBlurId = `${clipId}-top-blur`
  const bottomBlurId = `${clipId}-bottom-blur`

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDimensions({ width, height })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Memoize path calculation - generates 128 points (32 per corner)
  const path = useMemo(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return ''
    return generateClipPath(dimensions.width, dimensions.height, radius, smoothing)
  }, [dimensions.width, dimensions.height, radius, smoothing])

  const shineConfig = getShineConfig(shine, shineIntensity)
  const shadowConfig = getShadowConfig(shadow)

  // Calculate padding needed to show shadow
  const shadowPadding = shadowConfig
    ? Math.max(shadowConfig.blur + shadowConfig.offsetY, 50)
    : 0

  // Hide until clip path is ready to prevent flash of unclipped content
  const isReady = path !== ''

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ ...style, overflow: 'visible', opacity: isReady ? 1 : 0 }}
    >
      {/* Shadow layer - rendered BEHIND content */}
      {path && shadowConfig && (
        <svg
          className="pointer-events-none absolute"
          style={{
            left: -shadowPadding,
            top: -shadowPadding,
            width: dimensions.width + shadowPadding * 2,
            height: dimensions.height + shadowPadding * 2,
            zIndex: -1,
          }}
          aria-hidden
        >
          <defs>
            {/* Shadow filter - creates shadow without showing source shape */}
            <filter
              id={shadowFilterId}
              x="-100%"
              y="-100%"
              width="400%"
              height="400%"
            >
              {/* Blur the source */}
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation={shadowConfig.blur / 2}
                result="blur"
              />
              {/* Offset it down */}
              <feOffset in="blur" dx="0" dy={shadowConfig.offsetY} result="offsetBlur" />
              {/* Color it */}
              <feFlood floodColor="black" floodOpacity={shadowConfig.opacity} result="color" />
              {/* Composite color with blur shape */}
              <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
            </filter>
          </defs>
          {/* Shadow shape - the filter removes the source, only shadow shows */}
          <path
            d={path}
            fill="black"
            filter={`url(#${shadowFilterId})`}
            transform={`translate(${shadowPadding}, ${shadowPadding})`}
          />
        </svg>
      )}

      {/* Hidden SVG for clipPath definition only */}
      {path && (
        <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden>
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={path} />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Clipped content */}
      <div
        className="h-full w-full"
        style={{ clipPath: path ? `url(#${clipId})` : undefined }}
      >
        {children}
      </div>

      {/* Shine overlay - rendered ON TOP of content */}
      {path && shineConfig && (
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          aria-hidden
        >
          <defs>
            <filter id={topBlurId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={shineConfig.topHighlight.blur}
              />
            </filter>
            <filter
              id={bottomBlurId}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={shineConfig.bottomShadow.blur}
              />
            </filter>
          </defs>

          <g style={{ clipPath: `url(#${clipId})` }}>
            <path
              d={path}
              fill="none"
              stroke="white"
              strokeWidth={shineConfig.topHighlight.offset * 4}
              opacity={shineConfig.topHighlight.opacity}
              filter={
                shineConfig.topHighlight.blur > 0
                  ? `url(#${topBlurId})`
                  : undefined
              }
              transform={`translate(0, ${shineConfig.topHighlight.offset})`}
            />
            <path
              d={path}
              fill="none"
              stroke="black"
              strokeWidth={shineConfig.bottomShadow.offset * 4}
              opacity={shineConfig.bottomShadow.opacity}
              filter={
                shineConfig.bottomShadow.blur > 0
                  ? `url(#${bottomBlurId})`
                  : undefined
              }
              transform={`translate(0, ${-shineConfig.bottomShadow.offset})`}
            />
          </g>

          <path
            d={path}
            fill="none"
            stroke={`rgba(100, 100, 110, ${shineConfig.border.opacity})`}
            strokeWidth={shineConfig.border.width}
          />
        </svg>
      )}
    </div>
  )
}
