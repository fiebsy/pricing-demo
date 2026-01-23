/**
 * Question Command Menu V4 - Chat Content
 *
 * Displays a mini chat interface with AI responses.
 */

'use client'

import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { useV4Context } from '../state'
import type { ChatMessage, ChatConfig, SlotPosition, SlotScrollConfig } from '../types'

// Icons
import SparklesIcon from '@hugeicons-pro/core-stroke-rounded/SparklesIcon'
import Copy01Icon from '@hugeicons-pro/core-stroke-rounded/Copy01Icon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import VolumeHighIcon from '@hugeicons-pro/core-stroke-rounded/VolumeHighIcon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'

// =============================================================================
// TYPES
// =============================================================================

export interface ChatContentProps {
  messages: ChatMessage[]
  isTyping?: boolean
  slotPosition: SlotPosition
  scrollConfig: SlotScrollConfig
  height: number
  onRegenerate?: (messageId: string) => void
  className?: string
}

// =============================================================================
// BACKGROUND MAPPING
// =============================================================================

const BACKGROUND_MAP: Record<string, string> = {
  none: 'transparent',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

const BACKGROUND_CSS_VAR_MAP: Record<string, string> = {
  none: 'transparent',
  primary: 'var(--color-bg-primary)',
  secondary: 'var(--color-bg-secondary)',
  tertiary: 'var(--color-bg-tertiary)',
  quaternary: 'var(--color-bg-quaternary)',
}

const TEXT_COLOR_MAP: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  'on-brand': 'text-on-brand',
}

// =============================================================================
// TYPING INDICATOR
// =============================================================================

const TypingIndicator: React.FC<{ config: ChatConfig }> = ({ config }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-2xl',
        BACKGROUND_MAP[config.assistantMessage.background]
      )}
      style={{
        paddingLeft: config.message.paddingX,
        paddingRight: config.message.paddingX,
        paddingTop: config.message.paddingY,
        paddingBottom: config.message.paddingY,
        borderRadius: config.message.borderRadius,
      }}
    >
      <HugeIcon
        icon={SparklesIcon}
        size={14}
        className="text-brand-primary animate-pulse"
      />
      <span className={cn('text-sm', TEXT_COLOR_MAP[config.assistantMessage.textColor])}>
        Thinking...
      </span>
    </div>
  )
}

// =============================================================================
// RESPONSE ACTIONS
// =============================================================================

const ACTION_ICONS = {
  copy: Copy01Icon,
  regenerate: RefreshIcon,
  speak: VolumeHighIcon,
} as const

interface ResponseActionsProps {
  config: ChatConfig
  onAction?: (actionId: string) => void
}

const ResponseActions: React.FC<ResponseActionsProps> = ({ config, onAction }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { responseActions } = config
  if (!responseActions?.enabled) return null

  const enabledActions = responseActions.actions.filter((a) => a.enabled)
  if (enabledActions.length === 0) return null

  const handleClick = (actionId: string) => {
    onAction?.(actionId)
    if (actionId === 'copy') {
      setCopiedId(actionId)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <div className="flex items-center gap-1 mt-2 -ml-1.5">
      {enabledActions.map((action) => {
        const isCopied = action.id === 'copy' && copiedId === 'copy'
        const Icon = isCopied ? Tick01Icon : ACTION_ICONS[action.id]
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => handleClick(action.id)}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              isCopied
                ? 'text-success-primary'
                : 'text-quaternary hover:text-secondary hover:bg-quaternary/50',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
            )}
          >
            <HugeIcon icon={Icon} size={14} />
          </button>
        )
      })}
    </div>
  )
}

// =============================================================================
// MESSAGE BUBBLE
// =============================================================================

interface MessageBubbleProps {
  message: ChatMessage
  config: ChatConfig
  onAction?: (messageId: string, actionId: string) => void
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, config, onAction }) => {
  const isUser = message.role === 'user'
  const appearance = isUser ? config.userMessage : config.assistantMessage
  const bgClass = BACKGROUND_MAP[appearance.background]
  const textClass = TEXT_COLOR_MAP[appearance.textColor]
  const shineClass = appearance.shine && appearance.shine !== 'none' ? appearance.shine : undefined
  const showActions = !isUser && !message.isStreaming && config.responseActions?.enabled

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'relative',
          bgClass,
          config.message.squircle && 'corner-squircle',
          shineClass,
          message.isStreaming && 'animate-pulse'
        )}
        style={{
          paddingLeft: config.message.paddingX,
          paddingRight: config.message.paddingX,
          paddingTop: config.message.paddingY,
          paddingBottom: showActions ? config.message.paddingY / 2 : config.message.paddingY,
          borderRadius: config.message.borderRadius,
          maxWidth: `${config.message.maxWidth}%`,
        }}
      >
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1">
            <HugeIcon
              icon={SparklesIcon}
              size={12}
              className="text-brand-primary"
            />
            <span className="text-xs font-medium text-brand-primary">
              AI Response
            </span>
            {message.confidence && (
              <span className="text-xs text-tertiary">
                ({Math.round(message.confidence * 100)}% confidence)
              </span>
            )}
          </div>
        )}
        <p className={cn('text-sm whitespace-pre-wrap', textClass)}>
          {message.content}
        </p>
        {showActions && (
          <ResponseActions config={config} onAction={(actionId) => onAction?.(message.id, actionId)} />
        )}
      </div>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isTyping = false,
  slotPosition,
  scrollConfig,
  height,
  onRegenerate,
  className,
}) => {
  const { config, getSlotConfig } = useV4Context()
  const viewportRef = useRef<HTMLDivElement>(null)
  const lastMessageCountRef = useRef(messages.length)

  // Handle action clicks
  const handleAction = (messageId: string, actionId: string) => {
    if (actionId === 'regenerate' && onRegenerate) {
      onRegenerate(messageId)
    } else if (actionId === 'copy') {
      const message = messages.find((m) => m.id === messageId)
      if (message) {
        navigator.clipboard.writeText(message.content)
      }
    }
  }

  // Get chat config
  const chatConfig = config.contentConfigs.chat

  // Get slot background for gradient
  const slotConfig = getSlotConfig(slotPosition)
  const slotBackground = slotConfig.appearance.background ?? 'secondary'
  const gradientColor = BACKGROUND_CSS_VAR_MAP[slotBackground] ?? BACKGROUND_CSS_VAR_MAP.secondary

  const hasMessages = messages.length > 0

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const isAtBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 50
    const hasNewMessage = messages.length > lastMessageCountRef.current

    if (isAtBottom || hasNewMessage || isTyping) {
      requestAnimationFrame(() => {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth',
        })
      })
    }

    lastMessageCountRef.current = messages.length
  }, [messages, isTyping])

  // Scroll to bottom on initial mount with messages
  useEffect(() => {
    const viewport = viewportRef.current
    if (viewport && hasMessages) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={cn('w-full h-full overflow-hidden', className)}
      style={{ height }}
    >
      <ScrollArea.Root className="h-full w-full">
        <ScrollArea.Viewport
          ref={viewportRef}
          className="h-full w-full"
        >
          <div
            className="flex flex-col"
            style={{
              paddingTop: chatConfig.container.paddingTop,
              paddingBottom: chatConfig.container.paddingBottom,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {hasMessages || isTyping ? (
              <div
                className="flex flex-col"
                style={{ gap: chatConfig.message.gap }}
              >
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    config={chatConfig}
                    onAction={handleAction}
                  />
                ))}
                {isTyping && chatConfig.showTypingIndicator && (
                  <TypingIndicator config={chatConfig} />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <HugeIcon
                  icon={SparklesIcon}
                  size={24}
                  className="text-quaternary"
                />
                <p className="text-sm text-tertiary text-center">
                  {chatConfig.emptyMessage || 'Ask a question to see the AI response here'}
                </p>
              </div>
            )}
          </div>
        </ScrollArea.Viewport>

        {/* Custom Scrollbar */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className={cn(
            'absolute top-1 right-1 bottom-1 flex w-1.5 touch-none select-none p-0.5',
            'opacity-0 transition-opacity duration-150',
            'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
          )}
        >
          <ScrollArea.Thumb className="bg-fg-quaternary hover:bg-fg-quaternary_hover relative flex-1 rounded-full" />
        </ScrollArea.Scrollbar>

        {/* Overflow Gradients */}
        {scrollConfig.overflowGradient && (
          <>
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 transition-opacity duration-150"
              style={{
                height: scrollConfig.gradientHeight,
                background: `linear-gradient(to bottom, ${gradientColor} 0%, transparent 100%)`,
                opacity: 'calc(min(1, var(--scroll-area-overflow-y-start, 24) / 24))',
              }}
            />
            <div
              className="pointer-events-none absolute left-0 right-0 bottom-0 transition-opacity duration-150"
              style={{
                height: scrollConfig.gradientHeight,
                background: `linear-gradient(to top, ${gradientColor} 0%, transparent 100%)`,
                opacity: 'calc(min(1, var(--scroll-area-overflow-y-end, 24) / 24))',
              }}
            />
          </>
        )}
      </ScrollArea.Root>
    </div>
  )
}

ChatContent.displayName = 'ChatContent'
