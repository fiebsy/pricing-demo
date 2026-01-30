/**
 * BlurMessageBubble Component
 *
 * Chat bubble variant with frosted glass/blur background effect.
 * Designed for use over radial blur backdrop in default (pre-expanded) state.
 *
 * @module playground/radial-blur
 */

'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/core/primitives/badge'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import type { ChatMessage } from '@/app/b/profile/types'
import type { SemanticBgColor, ShineStyle } from '../config/types'

// =============================================================================
// COLOR MAPPING
// =============================================================================

const bgColorMap: Record<SemanticBgColor, string> = {
  'primary': 'var(--color-bg-primary)',
  'secondary': 'var(--color-bg-secondary)',
  'tertiary': 'var(--color-bg-tertiary)',
  'quaternary': 'var(--color-bg-quaternary)',
  'brand-primary': 'var(--color-bg-brand-solid)',
  'brand-secondary': 'var(--color-bg-brand-secondary)',
}

// =============================================================================
// ANIMATION CONFIG
// =============================================================================

const messageVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
}

// =============================================================================
// UTILITIES
// =============================================================================

function getConfidenceBadgeColor(confidence: number): 'success' | 'warning' | 'error' {
  if (confidence >= 0.8) return 'success'
  if (confidence >= 0.5) return 'warning'
  return 'error'
}

// =============================================================================
// TYPES
// =============================================================================

export interface BlurMessageBubbleProps {
  message: ChatMessage
  blurAmount?: number
  /** Assistant bubble background color */
  bubbleBgColor?: SemanticBgColor
  /** Assistant bubble opacity (0-100) */
  bubbleOpacity?: number
  /** User bubble background color */
  userBubbleBgColor?: SemanticBgColor
  /** User bubble opacity (0-100) */
  userBubbleOpacity?: number
  /** Border radius in pixels */
  borderRadius?: number
  /** Use asymmetric corners (iOS-style) */
  useAsymmetricCorners?: boolean
  /** Use squircle corner-shape */
  useSquircle?: boolean
  /** Shine effect style */
  shineStyle?: ShineStyle
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function BlurMessageBubble({
  message,
  blurAmount = 12,
  bubbleBgColor = 'tertiary',
  bubbleOpacity = 50,
  userBubbleBgColor = 'secondary',
  userBubbleOpacity = 60,
  borderRadius = 16,
  useAsymmetricCorners = true,
  useSquircle = false,
  shineStyle = 'none',
  className,
}: BlurMessageBubbleProps) {
  const isUser = message.role === 'user'
  const isStreaming = message.status === 'streaming'
  const isComplete = message.status === 'complete'

  const bgColor = isUser ? userBubbleBgColor : bubbleBgColor
  const opacity = isUser ? userBubbleOpacity : bubbleOpacity

  // Build corner radius style
  let cornerRadiusStyle: string
  if (useAsymmetricCorners) {
    // iOS-style with one smaller corner
    const smallRadius = Math.max(4, borderRadius * 0.25)
    cornerRadiusStyle = isUser
      ? `${borderRadius}px ${smallRadius}px ${borderRadius}px ${borderRadius}px`
      : `${smallRadius}px ${borderRadius}px ${borderRadius}px ${borderRadius}px`
  } else {
    // Uniform radius on all corners
    cornerRadiusStyle = `${borderRadius}px`
  }

  // Get shine box-shadow from CSS variable
  const shineBoxShadow = shineStyle !== 'none'
    ? `var(--${shineStyle})`
    : undefined

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={messageVariants}
      className={cn(
        'flex w-full px-4',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          'relative max-w-[75%] px-4 py-3',
          useSquircle && 'corner-squircle'
        )}
        style={{ borderRadius: cornerRadiusStyle }}
      >
        {/* Background layer with opacity */}
        <div
          className={cn(
            'absolute inset-0',
            useSquircle && 'corner-squircle',
            // Streaming state pulse on background only
            isStreaming && 'animate-pulse'
          )}
          style={{
            borderRadius: cornerRadiusStyle,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            backgroundColor: bgColorMap[bgColor],
            opacity: opacity / 100,
            boxShadow: shineBoxShadow || '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        />
        {/* Content layer */}
        <div className="relative z-10">
        {/* Message content */}
        <p
          className={cn(
            'text-sm leading-relaxed',
            'text-primary'
          )}
        >
          {message.content}
          {/* Streaming cursor */}
          {isStreaming && (
            <span className="inline-block w-0.5 h-4 ml-0.5 bg-brand-primary animate-pulse" />
          )}
        </p>

        {/* Confidence badge (assistant only, when complete) */}
        {!isUser && isComplete && message.confidence !== undefined && (
          <div className="mt-2">
            <Badge
              size="xs"
              shape="squircle"
              color={getConfidenceBadgeColor(message.confidence)}
              iconLeading={
                <HugeIcon icon={Tick01Icon} size={12} color="current" />
              }
            >
              {Math.round(message.confidence * 100)}% confidence
            </Badge>
          </div>
        )}
        </div>
      </div>
    </motion.div>
  )
}
