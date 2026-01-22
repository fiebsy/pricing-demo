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

      // Expand to full view on first message
      if (state !== 'expanded') {
        onStateChange('expanded')
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

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'flex flex-col',
        className
      )}
      style={{
        height: isExpanded ? '100vh' : 'auto',
        pointerEvents: isExpanded ? 'auto' : 'none',
      }}
    >
      {/* Messages area - grows from bottom, fades at top */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={messagesTransition}
            className="relative flex-1 flex flex-col justify-end overflow-hidden"
          >
            {/* Top fade gradient */}
            <div
              className={cn(
                'pointer-events-none absolute inset-x-0 top-0 h-40 z-10',
                'bg-gradient-to-b from-primary via-primary/80 to-transparent'
              )}
            />

            {/* Messages - snapped to bottom */}
            <div className="relative z-0 max-w-[800px] w-full mx-auto">
              <MessageList
                messages={messages}
                isTyping={isTyping}
                className="max-h-[calc(100vh-120px)] overflow-y-auto"
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
  )
}
