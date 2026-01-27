/**
 * ChatMessagesArea Component
 *
 * Renders messages with AnimatePresence wrapper.
 * Switches between BlurMessageList and standard MessageList based on config.
 *
 * @module playground/radial-blur/chat
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'
import { BlurMessageList } from '../core/BlurMessageList'
import { MessageList } from '@/app/b/profile/components/chat/MessageList'
import type { ChatMessage } from '@/app/b/profile/types'
import type { ChatDisplayConfig } from './types'

// =============================================================================
// TYPES
// =============================================================================

export interface ChatMessagesAreaProps {
  /** Array of chat messages to display */
  messages: ChatMessage[]
  /** Whether assistant is currently typing */
  isTyping: boolean
  /** Display configuration for messages */
  displayConfig: ChatDisplayConfig
  /** Whether to show messages (state !== 'collapsed') */
  showMessages: boolean
  /** Maximum height for messages area */
  maxHeight?: string
  /** Maximum width for centering */
  maxWidth?: number
}

// =============================================================================
// ANIMATION CONFIG
// =============================================================================

const enterTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

const exitTransition = {
  duration: 0,
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatMessagesArea({
  messages,
  isTyping,
  displayConfig,
  showMessages,
  maxHeight,
  maxWidth,
}: ChatMessagesAreaProps) {
  const {
    useBlurBubbles,
    bubbleBlur,
    bubbleBgColor,
    bubbleOpacity,
    userBubbleBgColor,
    userBubbleOpacity,
    fadeTopHeight,
    fadeBottomHeight,
    borderRadius,
    useAsymmetricCorners,
    useSquircle,
    shineStyle,
  } = displayConfig

  return (
    <AnimatePresence>
      {showMessages && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: enterTransition }}
          exit={{ opacity: 0, transition: exitTransition }}
          className="absolute bottom-0 left-0 right-0"
          style={{
            pointerEvents: 'auto',
            height: maxHeight,
          }}
        >
          <div
            className="relative w-full mx-auto h-full"
            style={{ maxWidth }}
          >
            {useBlurBubbles ? (
              <BlurMessageList
                messages={messages}
                isTyping={isTyping}
                blurAmount={bubbleBlur}
                bubbleBgColor={bubbleBgColor}
                bubbleOpacity={bubbleOpacity}
                userBubbleBgColor={userBubbleBgColor}
                userBubbleOpacity={userBubbleOpacity}
                fadeTopHeight={fadeTopHeight}
                fadeBottomHeight={fadeBottomHeight}
                borderRadius={borderRadius}
                useAsymmetricCorners={useAsymmetricCorners}
                useSquircle={useSquircle}
                shineStyle={shineStyle}
                inputHeight={80}
                maxHeight="100%"
              />
            ) : (
              <div className="overflow-y-auto h-full">
                <MessageList
                  messages={messages}
                  isTyping={isTyping}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
