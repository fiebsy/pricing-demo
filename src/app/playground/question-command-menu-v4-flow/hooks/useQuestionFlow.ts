/**
 * useQuestionFlow Hook
 *
 * Encapsulates the chat message state and typewriter effect logic
 * for a single question flow instance.
 */

import { useCallback, useState } from 'react'
import { useV4Context } from '../../question-command-menu-v4/state'
import type { ChatMessage, Question } from '../types'

interface UseQuestionFlowOptions {
  /** Callback when question state updates */
  onUpdate?: (question: Partial<Question>) => void
  /** Callback when question is deleted */
  onDelete?: () => void
  /** Typing speed in ms per character */
  typeSpeed?: number
  /** Delay before typewriter starts */
  typeDelay?: number
}

interface UseQuestionFlowReturn {
  chatMessages: ChatMessage[]
  isChatTyping: boolean
  handleChatSend: (message: string) => void
  handleDelete: () => void
  resetFlow: () => void
}

export function useQuestionFlow(options: UseQuestionFlowOptions = {}): UseQuestionFlowReturn {
  const { onUpdate, onDelete, typeSpeed = 15, typeDelay = 500 } = options

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isChatTyping, setIsChatTyping] = useState(false)

  const {
    flowStateId,
    startAdding,
    submitQuestion,
    receiveResponse,
    deleteQuestion,
  } = useV4Context()

  const handleChatSend = useCallback(
    (message: string) => {
      // Detect confidence level from message (for demo purposes)
      const isLowConfidence = message.toLowerCase().startsWith('test low')
      const confidence = isLowConfidence ? 0 : 0.85

      // Auto-transition through states
      if (flowStateId === 'idle') {
        startAdding()
      }
      submitQuestion(confidence)

      // Show user message + streaming placeholder
      const ts = Date.now()
      setChatMessages([
        { id: `user-${ts}`, role: 'user', content: message },
        { id: `assistant-${ts}`, role: 'assistant', content: '', isStreaming: true },
      ])
      setIsChatTyping(true)

      // Mock AI response
      const mockResponse = isLowConfidence
        ? "I'm not very confident about this answer. This is a low confidence response that you should verify independently."
        : "This is a simulated AI response. The flow is now in 'response' state. Try clicking the button below or editing your question."

      // Start typewriter after delay
      setTimeout(() => {
        let charIndex = 0

        const typewriterInterval = setInterval(() => {
          charIndex++
          const currentText = mockResponse.slice(0, charIndex)

          setChatMessages([
            { id: `user-${ts}`, role: 'user', content: message },
            {
              id: `assistant-${ts}`,
              role: 'assistant',
              content: currentText,
              isStreaming: charIndex < mockResponse.length,
            },
          ])

          // Complete when done
          if (charIndex >= mockResponse.length) {
            clearInterval(typewriterInterval)
            setChatMessages([
              { id: `user-${ts}`, role: 'user', content: message },
              {
                id: `assistant-${ts}`,
                role: 'assistant',
                content: mockResponse,
                confidence,
              },
            ])
            receiveResponse(mockResponse)
            setIsChatTyping(false)

            // Notify parent of update
            onUpdate?.({
              text: message,
              response: mockResponse,
              confidence,
              status: 'response',
            })
          }
        }, typeSpeed)
      }, typeDelay)
    },
    [flowStateId, startAdding, submitQuestion, receiveResponse, typeSpeed, typeDelay, onUpdate]
  )

  const handleDelete = useCallback(() => {
    deleteQuestion()
    setChatMessages([])
    onDelete?.()
  }, [deleteQuestion, onDelete])

  const resetFlow = useCallback(() => {
    deleteQuestion()
    setChatMessages([])
    setIsChatTyping(false)
  }, [deleteQuestion])

  return {
    chatMessages,
    isChatTyping,
    handleChatSend,
    handleDelete,
    resetFlow,
  }
}
