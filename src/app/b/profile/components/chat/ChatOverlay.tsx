/**
 * ChatOverlay Component
 *
 * Chat interface integrated into page layout (no separate container).
 * Features:
 * - Same input field in all states
 * - Messages snap to bottom, fade as they ascend
 * - X and expand buttons inline with input
 * - No background - part of the page
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { ChatBackdrop } from './ChatBackdrop'
import { useChatMessages, useSimulatedResponse } from '../../hooks'
import type { ChatOverlayProps } from '../../types'

// =============================================================================
// ANIMATION CONFIG
// =============================================================================

const messagesTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ChatOverlay({ state, onStateChange, className }: ChatOverlayProps) {
  // Hooks
  const {
    messages,
    addUserMessage,
    addAssistantMessage,
    updateMessageContent,
    completeMessage,
  } = useChatMessages()

  const { isTyping, simulateResponse } = useSimulatedResponse()

  // Handlers
  const handleInputFocus = useCallback(() => {
    if (state === 'collapsed') {
      onStateChange('default')
    }
  }, [state, onStateChange])

  const handleClose = useCallback(() => {
    onStateChange('collapsed')
  }, [onStateChange])

  const handleExpand = useCallback(() => {
    onStateChange('expanded')
  }, [onStateChange])

  const handleSend = useCallback(
    async (content: string) => {
      // Add user message
      addUserMessage(content)

      // Move to default state if collapsed (shows messages in 45% blur zone)
      // Only explicit expand button triggers full expansion
      if (state === 'collapsed') {
        onStateChange('default')
      }

      // Add empty assistant message (streaming)
      const assistantId = addAssistantMessage()

      // Simulate streaming response
      await simulateResponse(
        content,
        (chunk) => updateMessageContent(assistantId, chunk),
        (confidence) => completeMessage(assistantId, confidence)
      )
    },
    [
      state,
      onStateChange,
      addUserMessage,
      addAssistantMessage,
      updateMessageContent,
      completeMessage,
      simulateResponse,
    ]
  )

  const isExpanded = state === 'expanded'
  const showMessages = state !== 'collapsed'

  // Messages scroll area constrained by state, but container is always full height
  // This prevents hard visual edges - the blur mask handles the fade
  const messagesMaxHeight = isExpanded ? 'calc(100vh - 120px)' : 'calc(45vh - 80px)'

  return (
    <>
      {/* Radial blur backdrop - renders behind chat content */}
      <ChatBackdrop state={state} onClose={handleClose} />

      <div
        className={cn(
          'fixed inset-0 z-50',
          'flex flex-col justify-end',
          className
        )}
        style={{
          pointerEvents: 'none', // Allow clicks through to backdrop
        }}
      >
      {/* Messages area - positioned above input */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={messagesTransition}
            className="relative flex flex-col justify-end"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Messages - snapped to bottom, scrollable */}
            <div
              className="relative max-w-[800px] w-full mx-auto overflow-y-auto"
              style={{ maxHeight: messagesMaxHeight }}
            >
              <MessageList
                messages={messages}
                isTyping={isTyping}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area - always at bottom, same component in all states */}
      <div
        className="max-w-[800px] w-full mx-auto"
        style={{ pointerEvents: 'auto' }}
      >
        <ChatInput
          onSend={handleSend}
          onFocus={handleInputFocus}
          disabled={isTyping}
          state={state}
          onClose={handleClose}
          onExpand={handleExpand}
        />
      </div>
    </div>
    </>
  )
}
