/**
 * Question Command Menu V4 Playground
 *
 * A comprehensive playground demonstrating the V4 state machine architecture.
 *
 * Key V4 Features:
 * - Unified state machine (reducer pattern from edit-questions)
 * - Single TriggerFullState consolidating 4 separate useState calls
 * - UnifiedTrigger handling all three modes: input, question, display
 * - Extended button visibility predicates
 * - Modular preset system split by category
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/prod/base/control-panel'

// V4 imports
import type { PlaygroundState, ChatMessage } from './types'
import { DEFAULT_STATE, PRESETS } from './presets'
import { buildPanelConfig, updateNestedValue } from './panels'
import { V4Provider } from './state'
import { Preview } from './components'
import { SAMPLE_QUESTIONS } from './data'

// Chat hooks
import { useSimulatedResponse } from '@/app/b/profile/hooks'

// ============================================================================
// CHAT MESSAGE HELPERS
// ============================================================================

let messageIdCounter = 0
function generateMessageId() {
  return `msg-${++messageIdCounter}-${Date.now()}`
}

// ============================================================================
// PLAYGROUND PAGE
// ============================================================================

export default function QuestionCommandMenuV4Playground() {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')
  const [lockExpanded, setLockExpanded] = useState(false)

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const { isTyping, simulateResponse } = useSimulatedResponse()

  // Chat handlers
  const handleChatRegenerate = useCallback(async (messageId: string) => {
    // Find the message index
    const messageIndex = chatMessages.findIndex((m) => m.id === messageId)
    if (messageIndex === -1) return

    // Find the preceding user message
    let userMessage: ChatMessage | undefined
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (chatMessages[i].role === 'user') {
        userMessage = chatMessages[i]
        break
      }
    }
    if (!userMessage) return

    // Update the assistant message to show it's regenerating
    setChatMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, content: '', isStreaming: true, confidence: undefined }
          : msg
      )
    )

    // Regenerate the response
    await simulateResponse(
      userMessage.content,
      (streamedContent) => {
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, content: streamedContent }
              : msg
          )
        )
      },
      (confidence) => {
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, isStreaming: false, confidence }
              : msg
          )
        )
      }
    )
  }, [chatMessages, simulateResponse])

  const handleChatSend = useCallback(async (content: string) => {
    // Reset chat - only keep current question and response (no history)
    const userMessageId = generateMessageId()
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content,
    }

    const assistantMessageId = generateMessageId()
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    }

    // Replace all messages with just the new question and placeholder response
    setChatMessages([userMessage, assistantMessage])

    // Simulate AI response
    await simulateResponse(
      content,
      (streamedContent) => {
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: streamedContent }
              : msg
          )
        )
      },
      (confidence) => {
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, isStreaming: false, confidence }
              : msg
          )
        )
      }
    )
  }, [simulateResponse])

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setState((prev) => updateNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  const handleReset = useCallback(() => {
    setState(DEFAULT_STATE)
    setActivePresetId('default')
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setState(preset.data)
      setActivePresetId(presetId)
      // Clear chat messages when changing presets
      setChatMessages([])
    }
  }, [])

  const panelConfig = useMemo(
    () => buildPanelConfig(state, activePresetId),
    [state, activePresetId]
  )

  // Handle question save (from QuestionTrigger)
  // When a question is saved, switch bottom slot from suggestions to buttons
  const handleQuestionSave = useCallback((question: string) => {
    console.log('[Playground V4] Question saved:', question)

    // Switch bottom slot content from suggestions to buttons after saving
    setState((prev) => {
      const newContent = prev.config.content.map((c) => {
        if (c.slot === 'bottom' && c.type === 'suggestions') {
          return { ...c, type: 'buttons' as const }
        }
        return c
      })
      return {
        ...prev,
        config: {
          ...prev.config,
          content: newContent,
        },
      }
    })
    setActivePresetId(null)
  }, [])

  return (
    <V4Provider config={state.config}>
      <div className="relative min-h-screen" style={{ height: '100vh' }}>
        {/* Control Panel */}
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onReset={handleReset}
          onPresetChange={handlePresetChange}
          getConfigForCopy={() => state.config}
        />

        {/* Floating Controls */}
        <div className="fixed left-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
          <button
            type="button"
            onClick={() => setLockExpanded((prev) => !prev)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-md',
              lockExpanded
                ? 'bg-brand-solid text-on-brand'
                : 'bg-primary text-tertiary hover:bg-secondary hover:text-secondary border border-primary'
            )}
          >
            {lockExpanded ? 'Unlock' : 'Lock'}
          </button>
          {chatMessages.length > 0 && (
            <button
              type="button"
              onClick={() => setChatMessages([])}
              className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-md bg-primary text-tertiary hover:bg-secondary hover:text-secondary border border-primary"
            >
              Clear Chat
            </button>
          )}
        </div>

        {/* Preview Canvas */}
        <div className="flex h-full flex-col items-center justify-center overflow-visible pr-[352px]">
          <Preview
            config={state.config}
            questionGroups={SAMPLE_QUESTIONS}
            chatMessages={chatMessages}
            isChatTyping={isTyping}
            onChatSend={handleChatSend}
            onChatRegenerate={handleChatRegenerate}
            onQuestionSave={handleQuestionSave}
          />

          {/* Info Text */}
          <div className="mt-8 text-center">
            <h1 className="text-lg font-semibold text-primary">
              Question Command Menu V4
            </h1>
            <p className="text-sm text-tertiary mt-1">
              Click the input to expand. Configure with the panel on the right.
            </p>
            <p className="text-xs text-quaternary mt-2">
              State machine architecture | Unified trigger | Extended visibility predicates
            </p>
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-quaternary">Try:</span>
                <code className="px-2 py-0.5 text-xs bg-tertiary text-secondary rounded">
                  Chat Mode
                </code>
                <span className="text-xs text-quaternary">preset for AI responses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-quaternary">Or try:</span>
                <code className="px-2 py-0.5 text-xs bg-tertiary text-secondary rounded">
                  Add Question
                </code>
                <span className="text-xs text-quaternary">preset for two-state trigger with suggestions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </V4Provider>
  )
}
