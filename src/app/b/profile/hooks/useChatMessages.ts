/**
 * useChatMessages Hook
 *
 * Manages chat message state for the ChatOverlay.
 * Provides methods to add, update, and complete messages.
 *
 * @module b/profile/hooks
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import type { ChatMessage, MessageStatus } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface UseChatMessagesReturn {
  messages: ChatMessage[]
  addUserMessage: (content: string) => string
  addAssistantMessage: () => string
  updateMessageContent: (id: string, content: string) => void
  setMessageStatus: (id: string, status: MessageStatus) => void
  completeMessage: (id: string, confidence: number) => void
  clearMessages: () => void
}

// =============================================================================
// UTILITIES
// =============================================================================

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// =============================================================================
// HOOK
// =============================================================================

export function useChatMessages(): UseChatMessagesReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const addUserMessage = useCallback((content: string): string => {
    const id = generateId()
    const message: ChatMessage = {
      id,
      role: 'user',
      content,
      status: 'complete',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
    return id
  }, [])

  const addAssistantMessage = useCallback((): string => {
    const id = generateId()
    const message: ChatMessage = {
      id,
      role: 'assistant',
      content: '',
      status: 'streaming',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
    return id
  }, [])

  const updateMessageContent = useCallback((id: string, content: string): void => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content } : msg))
    )
  }, [])

  const setMessageStatus = useCallback((id: string, status: MessageStatus): void => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
    )
  }, [])

  const completeMessage = useCallback((id: string, confidence: number): void => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: 'complete', confidence } : msg
      )
    )
  }, [])

  const clearMessages = useCallback((): void => {
    setMessages([])
  }, [])

  return useMemo(
    () => ({
      messages,
      addUserMessage,
      addAssistantMessage,
      updateMessageContent,
      setMessageStatus,
      completeMessage,
      clearMessages,
    }),
    [
      messages,
      addUserMessage,
      addAssistantMessage,
      updateMessageContent,
      setMessageStatus,
      completeMessage,
      clearMessages,
    ]
  )
}
