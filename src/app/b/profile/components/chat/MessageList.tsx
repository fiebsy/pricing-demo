/**
 * MessageList Component
 *
 * Scrollable container for chat messages with fading edges.
 * Auto-scrolls to bottom on new messages.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { FadingScrollArea } from '@/app/playground/radial-blur/core/FadingScrollArea'
import { MessageBubble } from './MessageBubble'
import { ConfidenceSignal } from './ConfidenceSignal'
import type { ChatMessage } from '../../types'
import type { SemanticBgColor, ShineStyle } from '@/app/playground/radial-blur/config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface MessageListProps {
  messages: ChatMessage[]
  isTyping: boolean
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
  /** Height of the fade zone at top in pixels */
  fadeTopHeight?: number
  /** Height of the fade zone at bottom in pixels */
  fadeBottomHeight?: number
  /** Border radius in pixels */
  borderRadius?: number
  /** Use asymmetric corners (iOS-style) */
  useAsymmetricCorners?: boolean
  /** Use squircle corner-shape */
  useSquircle?: boolean
  /** Shine effect style */
  shineStyle?: ShineStyle
  /** Max height of scroll area */
  maxHeight?: string
  /** Bottom offset for scrollbar (px) */
  scrollbarBottomOffset?: number
  /** Extra bottom padding for input overlay (px) - allows messages to scroll behind input */
  inputHeight?: number
  /** Callback when "Improve answer" button is clicked */
  onImproveAnswer?: (message: ChatMessage) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function MessageList({
  messages,
  isTyping,
  blurAmount = 12,
  bubbleBgColor = 'primary',
  bubbleOpacity = 70,
  userBubbleBgColor = 'brand-primary',
  userBubbleOpacity = 20,
  fadeTopHeight = 100,
  fadeBottomHeight = 80,
  borderRadius = 32,
  useAsymmetricCorners = false,
  useSquircle = true,
  shineStyle = 'shine-3',
  maxHeight,
  scrollbarBottomOffset = 0,
  inputHeight = 0,
  onImproveAnswer,
  className,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [messages, isTyping])

  // Don't render if no messages
  if (messages.length === 0 && !isTyping) {
    return null
  }

  // Use inputHeight for scrollbar offset if provided, otherwise fall back to explicit scrollbarBottomOffset
  const effectiveScrollbarOffset = inputHeight > 0 ? inputHeight : scrollbarBottomOffset

  return (
    <FadingScrollArea
      maxHeight={maxHeight}
      fadeTopHeight={fadeTopHeight}
      fadeBottomHeight={fadeBottomHeight}
      scrollbarBottomOffset={effectiveScrollbarOffset}
      alignBottom
      className={cn('h-full', className)}
    >
      <div
        className="space-y-3"
        style={{
          paddingTop: 16,
          paddingBottom: inputHeight > 0 ? inputHeight + 16 : 16,
        }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            blurAmount={blurAmount}
            bubbleBgColor={bubbleBgColor}
            bubbleOpacity={bubbleOpacity}
            userBubbleBgColor={userBubbleBgColor}
            userBubbleOpacity={userBubbleOpacity}
            borderRadius={borderRadius}
            useAsymmetricCorners={useAsymmetricCorners}
            useSquircle={useSquircle}
            shineStyle={shineStyle}
            onImproveAnswer={onImproveAnswer}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </FadingScrollArea>
  )
}
