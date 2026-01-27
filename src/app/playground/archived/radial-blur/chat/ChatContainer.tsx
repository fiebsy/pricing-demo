/**
 * ChatContainer Component
 *
 * Self-contained, portable chat interface that encapsulates:
 * - Message state via useChatMessages
 * - Response simulation via useSimulatedResponse
 * - Mode switching (blur bubbles vs standard)
 * - State transitions (collapsed → default → expanded)
 *
 * @module playground/radial-blur/chat
 */

'use client'

import { useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ChatInput } from '@/app/b/profile/components/chat/ChatInput'
import { useChatMessages, useSimulatedResponse } from '@/app/b/profile/hooks'
import { ChatMessagesArea } from './ChatMessagesArea'
import type { ChatContainerProps } from './types'

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatContainer({
  displayConfig,
  inputConfig,
  state,
  onStateChange,
  maxWidth = 550,
  messagesMaxHeight,
  className,
}: ChatContainerProps) {
  // Chat state hooks
  const {
    messages,
    addUserMessage,
    addAssistantMessage,
    updateMessageContent,
    completeMessage,
  } = useChatMessages()

  const { isTyping, simulateResponse } = useSimulatedResponse()

  // Derived state
  const showMessages = state !== 'collapsed'

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

  // Click outside to close
  const contentRef = useRef<HTMLDivElement>(null)

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // Only close if chat is open and click is on the backdrop (not content)
      if (state !== 'collapsed' && e.target === e.currentTarget) {
        onStateChange('collapsed')
      }
    },
    [state, onStateChange]
  )

  const handleSend = useCallback(
    async (content: string) => {
      addUserMessage(content)

      // Move to default state if collapsed
      if (state === 'collapsed') {
        onStateChange('default')
      }

      const assistantId = addAssistantMessage()

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

  // Stop propagation handler for content areas
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <div
      className={cn('absolute inset-0 z-20', className)}
      style={{ pointerEvents: showMessages ? 'auto' : 'none' }}
      onClick={handleBackdropClick}
    >
      {/* Messages area - stops propagation only within actual content bounds */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 mx-auto"
        style={{
          maxWidth,
          height: messagesMaxHeight,
          pointerEvents: 'auto',
        }}
        onClick={stopPropagation}
      >
        <ChatMessagesArea
          messages={messages}
          isTyping={isTyping}
          displayConfig={displayConfig}
          showMessages={showMessages}
          maxHeight={messagesMaxHeight}
          maxWidth={maxWidth}
        />
      </div>

      {/* Input area - positioned at bottom, stops propagation */}
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto"
        style={{ maxWidth, pointerEvents: 'auto' }}
        onClick={stopPropagation}
      >
        <ChatInput
          onSend={handleSend}
          onFocus={handleInputFocus}
          disabled={isTyping}
          state={state}
          onClose={handleClose}
          onExpand={handleExpand}
          inputStyle={inputConfig}
        />
      </div>
    </div>
  )
}
