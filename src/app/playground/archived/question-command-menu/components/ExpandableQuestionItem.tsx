/**
 * ExpandableQuestionItem - Question rendered as its own expandable command menu
 *
 * Each question is a BiaxialExpandV4 instance that expands in place:
 * - Collapsed: Status icon + question text + chevron
 * - Expanded: Answer preview (top) + editable input (trigger) + actions (bottom)
 *
 * @module playground/question-command-menu/components
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Time02Icon from '@hugeicons-pro/core-stroke-rounded/Time02Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'

import {
  BiaxialExpandV4,
  type BiaxialExpandConfig,
} from '@/components/ui/prod/base/biaxial-command-menu-v4'

import type { Question, QuestionStatus, Answer, AnswerState, PlaygroundConfig } from '../types'
import { ChatPreview } from './ChatPreview'
import { ActionBar } from './ActionBar'
import { ACTION_BAR_HEIGHT } from '../_utils/layout'

// =============================================================================
// TYPES
// =============================================================================

export interface ExpandableQuestionItemProps {
  /** The question to display */
  question: Question
  /** Whether this item is currently expanded */
  expanded: boolean
  /** Called when expanded state changes */
  onExpandedChange: (expanded: boolean) => void
  /** Playground config for dimensions and animation */
  config: PlaygroundConfig
  /** Answer loading/display state */
  answerState: AnswerState
  /** Called when delete is clicked */
  onDelete: () => void
  /** Called when regenerate is clicked */
  onRegenerate: () => void
  /** Called when improve is clicked */
  onImprove: () => void
  /** Called when question text is saved */
  onSave: (newText: string) => void
  /** Additional className */
  className?: string
}

// =============================================================================
// STATUS ICON CONFIG
// =============================================================================

const STATUS_CONFIG: Record<
  QuestionStatus,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  answered: { icon: CheckmarkCircle02Icon, color: 'text-success-primary' },
  orphaned: { icon: AlertCircleIcon, color: 'text-warning-primary' },
  pending: { icon: Time02Icon, color: 'text-quaternary' },
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface CollapsedContentProps {
  question: Question
  statusConfig: { icon: React.ComponentType<{ className?: string }>; color: string }
  onClick: () => void
}

function CollapsedContent({ question, statusConfig, onClick }: CollapsedContentProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 w-full px-4 h-full',
        'cursor-pointer',
        'hover:bg-quaternary/30',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset',
        'motion-safe:transition-colors motion-safe:duration-150'
      )}
    >
      {/* Status icon */}
      <div className="shrink-0">
        <HugeIcon icon={statusConfig.icon} size="sm" className={statusConfig.color} />
      </div>

      {/* Question text */}
      <span className="flex-1 text-sm text-secondary truncate text-left">
        {question.text}
      </span>

      {/* Arrow indicator */}
      <HugeIcon
        icon={ArrowRight01Icon}
        size="sm"
        className="shrink-0 text-quaternary"
      />
    </button>
  )
}

interface ExpandedTriggerProps {
  value: string
  onChange: (value: string) => void
  onBack: () => void
  placeholder: string
}

function ExpandedTrigger({ value, onChange, onBack, placeholder }: ExpandedTriggerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus input when expanded
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center gap-2 w-full px-3 h-full">
      {/* Back button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onBack()
        }}
        className={cn(
          'shrink-0 p-1.5 rounded-lg',
          'hover:bg-quaternary/50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
          'motion-safe:transition-colors motion-safe:duration-150'
        )}
      >
        <HugeIcon icon={ArrowLeft01Icon} size="sm" className="text-tertiary" />
      </button>

      {/* Editable input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex-1 h-full bg-transparent',
          'text-sm text-secondary placeholder:text-quaternary',
          'focus:outline-none',
          'truncate'
        )}
      />
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ExpandableQuestionItem({
  question,
  expanded,
  onExpandedChange,
  config,
  answerState,
  onDelete,
  onRegenerate,
  onImprove,
  onSave,
  className,
}: ExpandableQuestionItemProps) {
  const statusConfig = STATUS_CONFIG[question.status]
  const [editValue, setEditValue] = useState(question.text)

  // Reset edit value when question changes or when collapsing
  useEffect(() => {
    if (!expanded) {
      setEditValue(question.text)
    }
  }, [expanded, question.text])

  // Build V4 config for this question's expansion
  const v4Config = useMemo((): Partial<BiaxialExpandConfig> => ({
    layout: {
      triggerWidth: config.panelWidth,
      triggerHeight: config.triggerHeight,
      panelWidth: config.panelWidth,
      maxBottomHeight: ACTION_BAR_HEIGHT,
      borderRadius: config.borderRadius,
      topGap: config.topGap,
      bottomGap: config.bottomGap,
      backdropTopOffset: 0,
    },
    animation: {
      duration: config.expandDuration,
      collapseDuration: config.collapseDuration,
      contentFadeDuration: 0,
      contentFadeDelay: 0,
      backdropMode: 'size',
      backdropDelay: 0,
      backdropDurationOffset: 0,
      animateSlotContainers: config.animateSlots,
      slotContainerDelay: 0,
      slotContainerDurationOffset: 100,
      expandOrigin: 'bottom', // Expand upward!
    },
    appearance: {
      borderRadius: '2xl',
      shadow: '2xl',
      shine: 'shine-2-subtle',
      background: 'tertiary',
      gradient: 'subtle-depth-md',
      gradientColor: 'tertiary',
      squircle: true,
    },
    topSlot: {
      enabled: true,
      height: config.topSlotHeight,
      background: config.topSlotBackground as BiaxialExpandConfig['topSlot']['background'],
      borderRadius: 14,
      inset: 4,
      borderWidth: 0,
      durationOffset: -100,
    },
    bottomSlot: {
      enabled: true,
      background: 'none',
      borderRadius: 0,
      inset: 0,
      borderWidth: 0,
    },
  }), [config])

  const handleBack = useCallback(() => {
    onExpandedChange(false)
  }, [onExpandedChange])

  const handleSave = useCallback(() => {
    if (editValue.trim() && editValue !== question.text) {
      onSave(editValue.trim())
    }
  }, [editValue, question.text, onSave])

  const hasChanges = editValue.trim() !== question.text

  return (
    <div
      className={cn('relative', className)}
      style={{
        width: config.panelWidth,
        height: config.triggerHeight,
        zIndex: expanded ? 50 : 1,
      }}
    >
      {/* BiaxialExpandV4 - always mounted for animations, absolutely positioned */}
      <div className="absolute inset-0">
        <BiaxialExpandV4.Root
          config={v4Config}
          expanded={expanded}
          onExpandedChange={onExpandedChange}
        >
          <BiaxialExpandV4.TopSlot>
            <ChatPreview
              state={answerState}
              questionText={question.text}
              answer={question.answer}
            />
          </BiaxialExpandV4.TopSlot>

          <BiaxialExpandV4.Backdrop />

          <BiaxialExpandV4.Trigger>
            {expanded ? (
              <ExpandedTrigger
                value={editValue}
                onChange={setEditValue}
                onBack={handleBack}
                placeholder={question.text}
              />
            ) : (
              <CollapsedContent
                question={question}
                statusConfig={statusConfig}
                onClick={() => onExpandedChange(true)}
              />
            )}
          </BiaxialExpandV4.Trigger>

          <BiaxialExpandV4.Content>
            <BiaxialExpandV4.ContentWrapper>
              <BiaxialExpandV4.BottomSlot>
                <ActionBar
                  hasSelection={true}
                  hasChanges={hasChanges}
                  onDelete={onDelete}
                  onRegenerate={onRegenerate}
                  onImprove={onImprove}
                  onSave={handleSave}
                />
              </BiaxialExpandV4.BottomSlot>
            </BiaxialExpandV4.ContentWrapper>
          </BiaxialExpandV4.Content>
        </BiaxialExpandV4.Root>
      </div>
    </div>
  )
}
