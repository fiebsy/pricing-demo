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
import { useCallback, useImperativeHandle, forwardRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { ChatBackdrop } from './ChatBackdrop'
import { useChatMessages, useSimulatedResponse, type SimulateResponseOptions } from '../../hooks'
import { DEFAULT_CHAT_CONFIG } from '../../config'
import type { ChatOverlayProps } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface ChatOverlayRef {
  sendMessage: (content: string, options?: SimulateResponseOptions) => Promise<void>
}

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

export const ChatOverlay = forwardRef<ChatOverlayRef, ChatOverlayProps>(
  function ChatOverlay({ state, onStateChange, onImproveAnswer, onAnswerComplete, className }, ref) {
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

  const handleInputBlur = useCallback(() => {
    // Collapse when input loses focus (hides radial blur backdrop)
    if (state !== 'collapsed') {
      onStateChange('collapsed')
    }
  }, [state, onStateChange])

  const handleClose = useCallback(() => {
    onStateChange('collapsed')
  }, [onStateChange])

  const handleExpand = useCallback(() => {
    onStateChange('expanded')
  }, [onStateChange])

  const handleSend = useCallback(
    async (content: string, options?: SimulateResponseOptions) => {
      // Add user message
      addUserMessage(content)

      // Move to default state if collapsed (shows messages in 45% blur zone)
      // Only explicit expand button triggers full expansion
      if (state === 'collapsed') {
        onStateChange('default')
      }

      // Add empty assistant message (streaming)
      const assistantId = addAssistantMessage()

      // Track accumulated content for onAnswerComplete callback
      let accumulatedContent = ''

      // Simulate streaming response
      await simulateResponse(
        content,
        (chunk) => {
          accumulatedContent = chunk
          updateMessageContent(assistantId, chunk)
        },
        (confidence) => {
          completeMessage(assistantId, confidence)
          // Notify parent when answer completes
          onAnswerComplete?.({
            id: assistantId,
            role: 'assistant',
            content: accumulatedContent,
            status: 'complete',
            confidence,
            timestamp: new Date(),
          })
        },
        options
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
      onAnswerComplete,
    ]
  )

  // Expose sendMessage to parent via ref
  useImperativeHandle(ref, () => ({
    sendMessage: handleSend,
  }), [handleSend])

  // Wrap onImproveAnswer to include the preceding user message content
  const handleImproveAnswer = useCallback(
    (assistantMessage: { id: string }) => {
      if (!onImproveAnswer) return

      // Find the assistant message index
      const assistantIndex = messages.findIndex((m) => m.id === assistantMessage.id)
      if (assistantIndex === -1) return

      // Find the preceding user message (should be immediately before)
      let userMessageContent = ''
      for (let i = assistantIndex - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
          userMessageContent = messages[i].content
          break
        }
      }

      // Get the full assistant message
      const fullAssistantMessage = messages[assistantIndex]
      onImproveAnswer(fullAssistantMessage, userMessageContent)
    },
    [onImproveAnswer, messages]
  )

  const isExpanded = state === 'expanded'
  const showMessages = state !== 'collapsed'

  // Messages scroll area constrained by state, but container is always full height
  // This prevents hard visual edges - the blur mask handles the fade
  const messagesMaxHeight = isExpanded ? 'calc(100vh - 120px)' : 'calc(55vh - 80px)'

  return (
    <>
      {/* Radial blur backdrop - only visible when input is active AND messages exist */}
      <ChatBackdrop
        state={messages.length > 0 ? state : 'collapsed'}
        onClose={handleClose}
        blurHeight={DEFAULT_CHAT_CONFIG.height}
        blurStyle={DEFAULT_CHAT_CONFIG.style}
      />

      <div
        className={cn(
          'fixed inset-0 z-50',
          className
        )}
        style={{
          pointerEvents: 'none', // Allow clicks through to backdrop
        }}
      >
        {/* Messages area - positioned at bottom, extends upward */}
        <AnimatePresence>
          {showMessages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={messagesTransition}
              className="absolute bottom-0 left-0 right-0 flex justify-center"
              style={{
                height: messagesMaxHeight,
                pointerEvents: 'none',
              }}
            >
              <div
                className="relative h-full"
                style={{
                  width: `${DEFAULT_CHAT_CONFIG.maxWidth}px`,
                  maxWidth: '100%',
                  pointerEvents: 'auto',
                }}
              >
                <MessageList
                  messages={messages}
                  isTyping={isTyping}
                  maxHeight={messagesMaxHeight}
                  blurAmount={DEFAULT_CHAT_CONFIG.messages.bubbleBlur}
                  bubbleBgColor={DEFAULT_CHAT_CONFIG.messages.bubbleBgColor}
                  bubbleOpacity={DEFAULT_CHAT_CONFIG.messages.bubbleOpacity}
                  userBubbleBgColor={DEFAULT_CHAT_CONFIG.messages.userBubbleBgColor}
                  userBubbleOpacity={DEFAULT_CHAT_CONFIG.messages.userBubbleOpacity}
                  fadeTopHeight={DEFAULT_CHAT_CONFIG.messages.fadeTopHeight}
                  fadeBottomHeight={DEFAULT_CHAT_CONFIG.messages.fadeBottomHeight}
                  borderRadius={DEFAULT_CHAT_CONFIG.messages.borderRadius}
                  useAsymmetricCorners={DEFAULT_CHAT_CONFIG.messages.useAsymmetricCorners}
                  useSquircle={DEFAULT_CHAT_CONFIG.messages.useSquircle}
                  shineStyle={DEFAULT_CHAT_CONFIG.messages.shineStyle}
                  inputHeight={DEFAULT_CHAT_CONFIG.messages.inputHeight}
                  onImproveAnswer={handleImproveAnswer}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area - fixed at bottom, overlays messages */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div
            style={{
              width: `${DEFAULT_CHAT_CONFIG.maxWidth}px`,
              maxWidth: '100%',
              pointerEvents: 'auto',
            }}
          >
            <ChatInput
              onSend={handleSend}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              disabled={isTyping}
              state={state}
              onClose={handleClose}
              onExpand={handleExpand}
              inputStyle={DEFAULT_CHAT_CONFIG.input}
            />
          </div>
        </div>
      </div>
    </>
  )
})
