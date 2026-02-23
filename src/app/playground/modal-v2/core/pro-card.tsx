/**
 * ProCard Component
 *
 * Displays a "Pro 2X" style badge with gradient text,
 * shine border container, and optional glow effect.
 */

'use client'

import { cn } from '@/lib/utils'
import type { ProCardConfig, ProCardGradient, ProCardTextStyle, ShinePreset, BackgroundColor } from '../config/types'

// Gradient class mappings for text
const GRADIENT_CLASSES: Record<ProCardGradient, string> = {
  'arcade-blue': 'from-sky-300 via-sky-400 to-blue-500',
  'ocean-depth': 'from-blue-400 via-blue-500 to-blue-600',
  frost: 'from-white via-sky-200 to-sky-400',
  electric: 'from-indigo-400 via-blue-400 to-blue-500',
}

// Semantic text color tokens
const SEMANTIC_TEXT_COLORS = ['text-primary', 'text-secondary', 'text-tertiary'] as const

/** Check if a text style is a semantic token (not a gradient) */
const isSemanticToken = (style: ProCardTextStyle): style is typeof SEMANTIC_TEXT_COLORS[number] =>
  SEMANTIC_TEXT_COLORS.includes(style as typeof SEMANTIC_TEXT_COLORS[number])

// Glow color hex values for inline styles
const GLOW_COLORS: Record<string, string> = {
  'sky-300': '#7dd3fc',
  'sky-400': '#38bdf8',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  white: '#ffffff',
}

// Background class mappings
const BACKGROUND_CLASSES: Record<BackgroundColor | 'transparent', string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  transparent: 'bg-transparent',
}

interface ProCardProps {
  config: ProCardConfig
}

/** Get text classes for a style (gradient or semantic token) */
function getTextClasses(style: ProCardTextStyle): string {
  if (isSemanticToken(style)) {
    return style
  }
  return cn('bg-gradient-to-r bg-clip-text text-transparent', GRADIENT_CLASSES[style])
}

export function ProCard({ config }: ProCardProps) {
  const {
    title,
    multiplier,
    height,
    titleGradient,
    multiplierGradient,
    containerBackground,
    containerShine,
    containerBorderRadius,
    glowEnabled,
    glowColor,
    glowBlur,
    glowOpacity,
  } = config

  // Calculate font size from height
  const fontSize = Math.max(28, height * 0.45)

  // Check if title and multiplier use the same style
  const sameStyle = titleGradient === multiplierGradient

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center overflow-hidden',
        BACKGROUND_CLASSES[containerBackground],
        containerShine !== 'none' && containerShine
      )}
      style={{
        height,
        borderRadius: containerBorderRadius,
        padding: 16,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Glow effect layer */}
        {glowEnabled && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: GLOW_COLORS[glowColor] ?? '#3b82f6',
              filter: `blur(${glowBlur}px)`,
              opacity: glowOpacity / 100,
              transform: 'scale(1.5)',
            }}
          />
        )}

        {/* Text rendering */}
        {sameStyle ? (
          <span
            className={cn(
              'relative z-10 font-bold tracking-tight',
              getTextClasses(titleGradient)
            )}
            style={{
              fontSize,
              letterSpacing: '-0.02em',
            }}
          >
            {title} {multiplier}x
          </span>
        ) : (
          <span
            className="relative z-10 font-bold tracking-tight"
            style={{
              fontSize,
              letterSpacing: '-0.02em',
            }}
          >
            <span className={getTextClasses(titleGradient)}>{title}</span>
            {' '}
            <span className={getTextClasses(multiplierGradient)}>{multiplier}x</span>
          </span>
        )}
      </div>
    </div>
  )
}
