/**
 * MessageBubble Component
 *
 * Chat bubble with frosted glass/blur background effect.
 * Supports configurable blur, opacity, corners, and shine effects.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/prod/base/button'
import { ConfidenceSignal } from './ConfidenceSignal'
import type { ChatMessage } from '../../types'
import type { SemanticBgColor, ShineStyle } from '@/components/ui/features/radial-blur'

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

function isLowConfidence(confidence: number | undefined): boolean {
  return confidence !== undefined && confidence < 0.4
}

// =============================================================================
// TYPES
// =============================================================================

export interface MessageBubbleProps {
  message: ChatMessage
  /** Blur amount for bubble background (px) */
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
  /** Callback when "Improve answer" button is clicked */
  onImproveAnswer?: (message: ChatMessage) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function MessageBubble({
  message,
  blurAmount = 12,
  bubbleBgColor = 'primary',
  bubbleOpacity = 70,
  userBubbleBgColor = 'brand-primary',
  userBubbleOpacity = 20,
  borderRadius = 32,
  useAsymmetricCorners = false,
  useSquircle = true,
  shineStyle = 'shine-3',
  onImproveAnswer,
  className,
}: MessageBubbleProps) {
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
      <div className="flex flex-col items-start max-w-[75%]">
        {/* Message bubble */}
        <div
          className={cn(
            'relative px-4 py-3',
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
              boxShadow: shineBoxShadow,
            }}
          />
          {/* Low confidence red gradient overlay */}
          {!isUser && isComplete && isLowConfidence(message.confidence) && (
            <div
              className={cn(
                'absolute inset-0 pointer-events-none',
                useSquircle && 'corner-squircle'
              )}
              style={{
                borderRadius: cornerRadiusStyle,
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.08) 50%, rgba(185, 28, 28, 0.12) 100%)',
              }}
            />
          )}
          {/* Content layer */}
          <div className="relative z-10">
            {/* Message content */}
            <p className="text-sm leading-relaxed text-primary">
              {message.content}
              {/* Streaming cursor */}
              {isStreaming && (
                <span className="inline-block w-0.5 h-4 ml-0.5 bg-brand-primary animate-pulse" />
              )}
            </p>

            {/* Confidence indicator (assistant only, when complete) */}
            {!isUser && isComplete && message.confidence !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                {/* Signal gauge */}
                <ConfidenceSignal confidence={message.confidence} size="sm" />
                {/* Confidence text */}
                <span className="text-xs text-tertiary">
                  {Math.round(message.confidence * 100)}% confidence
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Add confidence button - outside bubble (assistant only, when complete) */}
        {!isUser && isComplete && onImproveAnswer && (
          <div className="mt-2 ml-1">
            <Button
              variant="tertiary"
              size="xs"
              onClick={() => onImproveAnswer(message)}
            >
              Improve answer
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
