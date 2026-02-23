/**
 * ProCard Component
 *
 * Displays a "Pro 2X" style badge with gradient text,
 * shine border container, and optional glow effect.
 * Supports independent gradient colors for title and multiplier.
 * Also supports semantic text tokens (text-primary, text-secondary, text-tertiary).
 */

'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ProCardConfig, ProCardGradient, ProCardTextStyle } from '../config/types'

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
const BACKGROUND_CLASSES: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  transparent: 'bg-transparent',
}

// Font weight class mappings
const FONT_WEIGHT_CLASSES: Record<string, string> = {
  '400': 'font-normal',
  '500': 'font-medium',
  '600': 'font-semibold',
  '700': 'font-bold',
  '800': 'font-extrabold',
  '900': 'font-black',
}

interface ProCardProps {
  config: ProCardConfig
  height: number
  duration?: number
  bounce?: number
}

/** Get text classes for a style (gradient or semantic token) */
function getTextClasses(style: ProCardTextStyle): string {
  if (isSemanticToken(style)) {
    // Semantic token: just apply the color class directly
    return style
  }
  // Gradient: apply gradient classes with bg-clip-text
  return cn('bg-gradient-to-r bg-clip-text text-transparent', GRADIENT_CLASSES[style])
}

export function ProCard({ config, height, duration = 0.4, bounce = 0.1 }: ProCardProps) {
  const { title, multiplier, container, glow, text } = config

  // Calculate font size (auto from height or manual)
  const fontSize = text?.fontSize === 'auto' || !text?.fontSize
    ? Math.max(28, height * 0.45)
    : text.fontSize

  // Get text styles (use text config or fallback to legacy gradient)
  const titleStyle = text?.titleGradient ?? config.gradient
  const multiplierStyle = text?.multiplierGradient ?? config.gradient

  // Get text styling
  const fontWeight = text?.fontWeight ?? '700'
  const letterSpacing = text?.letterSpacing ?? -0.02

  // Check if title and multiplier use the same style (render as single span)
  const sameStyle = titleStyle === multiplierStyle

  return (
    <motion.div
      layout
      className={cn(
        'flex w-full items-center justify-center overflow-hidden',
        BACKGROUND_CLASSES[container.background],
        container.shine !== 'none' && container.shine
      )}
      style={{
        height,
        borderRadius: container.borderRadius,
        padding: container.padding,
      }}
      transition={{ layout: { type: 'spring', duration, bounce } }}
    >
      <div className="relative flex items-center justify-center">
        {/* Glow effect layer */}
        {glow.enabled && (
          <div
            className={cn(
              'pointer-events-none absolute inset-0',
              glow.hideOnMobile && 'hidden sm:block'
            )}
            style={{
              background: GLOW_COLORS[glow.color] ?? '#3b82f6',
              filter: `blur(${glow.blur}px)`,
              opacity: glow.opacity / 100,
              transform: 'scale(1.5)',
            }}
          />
        )}

        {/* Text rendering - single span if same style, split if different */}
        {sameStyle ? (
          <span
            className={cn(
              'relative z-10 tracking-tight',
              getTextClasses(titleStyle),
              FONT_WEIGHT_CLASSES[fontWeight]
            )}
            style={{
              fontSize,
              letterSpacing: `${letterSpacing}em`,
            }}
          >
            {title} {multiplier}x
          </span>
        ) : (
          <span
            className={cn(
              'relative z-10 tracking-tight',
              FONT_WEIGHT_CLASSES[fontWeight]
            )}
            style={{
              fontSize,
              letterSpacing: `${letterSpacing}em`,
            }}
          >
            <span className={getTextClasses(titleStyle)}>
              {title}
            </span>
            {' '}
            <span className={getTextClasses(multiplierStyle)}>
              {multiplier}x
            </span>
          </span>
        )}
      </div>
    </motion.div>
  )
}
