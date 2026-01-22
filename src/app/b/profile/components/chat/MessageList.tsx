/**
 * MessageList Component
 *
 * Scrollable container for chat messages.
 * Auto-scrolls to bottom on new messages.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import type { MessageListProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function MessageList({ messages, isTyping, className }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages or typing state change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Don't render if no messages
  if (messages.length === 0 && !isTyping) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex flex-col justify-end',
        className
      )}
    >
      <div className="py-4 space-y-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
