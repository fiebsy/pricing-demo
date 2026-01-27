/**
 * useQuestionFlowWithImprove Hook
 *
 * Enhanced version of useQuestionFlow that supports regeneration
 * after the improve flow completes.
 */

import { useCallback, useState, useEffect, useRef } from 'react'
import { useV4Context } from '@/components/ui/features/expandable-input'
import type { ChatMessage, Question } from '../../playground/question-command-menu-v4-flow/types'

interface UseQuestionFlowWithImproveOptions {
  initialQuestion?: Question
  onUpdate?: (question: Partial<Question>) => void
  onDelete?: () => void
  onRegisterRegenerate?: (fn: () => void) => void
  typeSpeed?: number
  typeDelay?: number
}

interface UseQuestionFlowWithImproveReturn {
  chatMessages: ChatMessage[]
  isChatTyping: boolean
  handleChatSend: (message: string) => void
  handleDelete: () => void
  resetFlow: () => void
  regenerateResponse: () => void
}

// Mock improved responses - these simulate better quality answers after the improve flow
const IMPROVED_RESPONSES = [
  "Based on my enhanced understanding, I can provide a more comprehensive answer. This response incorporates the additional context you've provided, offering a more nuanced and accurate perspective on your question.",
  "With the improved context, I can now offer a more detailed response. The additional information has helped me better understand your needs and provide more targeted insights.",
  "Thank you for the additional context. This improved response takes into account the new information, resulting in a more accurate and helpful answer to your question.",
  "My improved answer reflects the additional insights you've shared. This enhanced response provides more specific guidance tailored to your situation.",
]

export function useQuestionFlowWithImprove(
  options: UseQuestionFlowWithImproveOptions = {}
): UseQuestionFlowWithImproveReturn {
  const {
    initialQuestion,
    onUpdate,
    onDelete,
    onRegisterRegenerate,
    typeSpeed = 15,
    typeDelay = 500,
  } = options

  const getInitialMessages = (): ChatMessage[] => {
    if (initialQuestion?.text && initialQuestion?.response) {
      return [
        { id: 'user-initial', role: 'user', content: initialQuestion.text },
        {
          id: 'assistant-initial',
          role: 'assistant',
          content: initialQuestion.response,
          confidence: initialQuestion.confidence ?? 0.85,
        },
      ]
    }
    return []
  }

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(getInitialMessages)
  const [isChatTyping, setIsChatTyping] = useState(false)
  const hasInitialized = useRef(false)
  const currentQuestion = useRef<string>(initialQuestion?.text || '')

  const {
    flowStateId,
    startAdding,
    submitQuestion,
    receiveResponse,
    deleteQuestion,
    setInput,
  } = useV4Context()

  // Initialize flow state for pre-populated questions
  useEffect(() => {
    if (!hasInitialized.current && initialQuestion?.text && initialQuestion?.response) {
      hasInitialized.current = true
      setInput(initialQuestion.text)
      submitQuestion(initialQuestion.confidence ?? 0.85)
      setTimeout(() => {
        receiveResponse(initialQuestion.response!)
      }, 0)
    }
  }, [initialQuestion, setInput, submitQuestion, receiveResponse])

  // Typewriter effect helper
  const runTypewriter = useCallback(
    (message: string, response: string, confidence: number, isImproved: boolean = false) => {
      const ts = Date.now()

      setChatMessages([
        { id: `user-${ts}`, role: 'user', content: message },
        { id: `assistant-${ts}`, role: 'assistant', content: '', isStreaming: true },
      ])
      setIsChatTyping(true)

      setTimeout(() => {
        let charIndex = 0

        const typewriterInterval = setInterval(() => {
          charIndex++
          const currentText = response.slice(0, charIndex)

          setChatMessages([
            { id: `user-${ts}`, role: 'user', content: message },
            {
              id: `assistant-${ts}`,
              role: 'assistant',
              content: currentText,
              isStreaming: charIndex < response.length,
            },
          ])

          if (charIndex >= response.length) {
            clearInterval(typewriterInterval)
            setChatMessages([
              { id: `user-${ts}`, role: 'user', content: message },
              {
                id: `assistant-${ts}`,
                role: 'assistant',
                content: response,
                confidence,
              },
            ])
            receiveResponse(response)
            setIsChatTyping(false)

            onUpdate?.({
              text: message,
              response,
              confidence,
              status: 'response',
            })
          }
        }, typeSpeed)
      }, typeDelay)
    },
    [typeSpeed, typeDelay, receiveResponse, onUpdate]
  )

  const handleChatSend = useCallback(
    (message: string) => {
      currentQuestion.current = message

      // Triggers for low confidence responses
      const messageLower = message.toLowerCase()
      const isLowConfidence =
        messageLower.startsWith('test low') ||
        messageLower.includes('what is your favorite color')

      const confidence = isLowConfidence ? 0 : 0.85

      if (flowStateId === 'idle') {
        startAdding()
      }
      submitQuestion(confidence)

      const mockResponse = isLowConfidence
        ? "I'm not very confident about this answer. This is a low confidence response that you should verify independently."
        : "This is a simulated AI response. The flow is now in 'response' state. Try clicking the button below or editing your question."

      runTypewriter(message, mockResponse, confidence)
    },
    [flowStateId, startAdding, submitQuestion, runTypewriter]
  )

  // Regenerate response with improved content
  const regenerateResponse = useCallback(() => {
    if (!currentQuestion.current) return

    // Pick a random improved response
    const improvedResponse =
      IMPROVED_RESPONSES[Math.floor(Math.random() * IMPROVED_RESPONSES.length)]

    // Higher confidence for improved responses
    const improvedConfidence = 0.92 + Math.random() * 0.06 // 92-98%

    submitQuestion(improvedConfidence)
    runTypewriter(currentQuestion.current, improvedResponse, improvedConfidence, true)
  }, [submitQuestion, runTypewriter])

  // Register regenerate function with parent
  useEffect(() => {
    if (onRegisterRegenerate) {
      onRegisterRegenerate(regenerateResponse)
    }
  }, [onRegisterRegenerate, regenerateResponse])

  const handleDelete = useCallback(() => {
    deleteQuestion()
    setChatMessages([])
    currentQuestion.current = ''
    onDelete?.()
  }, [deleteQuestion, onDelete])

  const resetFlow = useCallback(() => {
    deleteQuestion()
    setChatMessages([])
    setIsChatTyping(false)
    currentQuestion.current = ''
  }, [deleteQuestion])

  return {
    chatMessages,
    isChatTyping,
    handleChatSend,
    handleDelete,
    resetFlow,
    regenerateResponse,
  }
}
