/**
 * BlurMessageList Component
 *
 * Message list with fading scroll and blur message bubbles.
 * Designed for radial blur playground experimentation.
 *
 * @module playground/radial-blur
 */

'use client'

import * as React from 'react'
import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { FadingScrollArea } from './FadingScrollArea'
import { BlurMessageBubble } from './BlurMessageBubble'
import type { ChatMessage } from '@/app/b/profile/types'
import type { SemanticBgColor, ShineStyle } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface BlurMessageListProps {
  messages: ChatMessage[]
  isTyping: boolean
  blurAmount?: number
  /** Assistant bubble background color */
  bubbleBgColor?: SemanticBgColor
  /** Assistant bubble opacity (0-100) */
  bubbleOpacity?: number
  /** User bubble background color */
  userBubbleBgColor?: SemanticBgColor
  /** User bubble opacity (0-100) */
  userBubbleOpacity?: number
  maxHeight?: string
  /** Height of the fade zone at top in pixels */
  fadeTopHeight?: number
  /** Height of the fade zone at bottom in pixels */
  fadeBottomHeight?: number
  /** Extra bottom padding for input overlay (px) */
  inputHeight?: number
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

export function BlurMessageList({
  messages,
  isTyping,
  blurAmount = 12,
  bubbleBgColor = 'tertiary',
  bubbleOpacity = 50,
  userBubbleBgColor = 'secondary',
  userBubbleOpacity = 60,
  maxHeight,
  fadeTopHeight = 140,
  fadeBottomHeight = 80,
  inputHeight = 80,
  borderRadius = 16,
  useAsymmetricCorners = true,
  useSquircle = false,
  shineStyle = 'none',
  className,
}: BlurMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [messages, isTyping])

  // Don't render if no messages
  if (messages.length === 0 && !isTyping) {
    return null
  }

  return (
    <FadingScrollArea
      maxHeight={maxHeight}
      fadeTopHeight={fadeTopHeight}
      fadeBottomHeight={fadeBottomHeight}
      scrollbarBottomOffset={inputHeight}
      alignBottom
      className={cn('h-full', className)}
    >
      {/*
        Minimal top padding - fade handles visual transition
        Bottom padding: accounts for input overlay
      */}
      <div
        className="space-y-3"
        style={{
          paddingTop: 16,
          paddingBottom: inputHeight + 16,
        }}
      >
        {messages.map((message) => (
          <BlurMessageBubble
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
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </FadingScrollArea>
  )
}
