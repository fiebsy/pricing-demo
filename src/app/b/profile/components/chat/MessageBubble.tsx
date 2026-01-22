/**
 * MessageBubble Component
 *
 * Chat bubble for user and assistant messages.
 * Uses asymmetric corner radius (iOS-style).
 *
 * User: right-aligned, rounded-tr-md
 * Assistant: left-aligned, rounded-tl-md
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/prod/base/badge'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import type { MessageBubbleProps } from '../../types'

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
// COMPONENT
// =============================================================================

export function MessageBubble({ message, className }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isStreaming = message.status === 'streaming'
  const isComplete = message.status === 'complete'

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
          'max-w-[75%] px-4 py-3 border',
          // Asymmetric corners (iOS style)
          isUser
            ? 'rounded-2xl rounded-tr-md bg-tertiary/20 border-tertiary/30'
            : 'rounded-2xl rounded-tl-md bg-brand-primary/5 border-brand-primary/20',
          // Streaming state pulse
          isStreaming && 'animate-pulse'
        )}
      >
        {/* Message content */}
        <p
          className={cn(
            'text-sm leading-relaxed',
            isUser ? 'text-primary' : 'text-secondary'
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
    </motion.div>
  )
}
