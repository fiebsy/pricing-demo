/**
 * Question Command Menu V3 - Question Trigger
 *
 * Phase-based trigger component that switches between:
 * - Clickable div (idle states: add-idle, question-idle, question-saved)
 * - Input with buttons (expanded/editing states: add-expanded, question-editing)
 */

'use client'

import * as React from 'react'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { useBiaxialExpand } from '@/components/ui/features/command-menu'
import { useV3Context } from '../core/context'
import { InputWithButtons } from './InputWithButtons'
import type { TriggerConfig, TriggerPhase, TriggerButtonConfig } from '../config/types'
import { validateQuestionLength } from '../utils/validation'

// Icons
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

// ============================================================================
// TYPES
// ============================================================================

export interface QuestionTriggerProps {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  onEscape?: () => void
  onEnter?: () => void
  onSave?: (question: string) => void
  triggerConfig: TriggerConfig
  onButtonClick?: (buttonIndex: number, buttonConfig: TriggerButtonConfig) => void
  className?: string
  maxWords?: number
}

// ============================================================================
// IDLE TRIGGER (clickable div)
// ============================================================================

interface IdleTriggerProps {
  phase: TriggerPhase
  savedQuestion: string | null
  placeholder: string
  triggerConfig: TriggerConfig
  onClick: () => void
}

const IdleTrigger: React.FC<IdleTriggerProps> = ({
  phase,
  savedQuestion,
  placeholder,
  triggerConfig,
  onClick,
}) => {
  const displayText = phase === 'add-idle'
    ? placeholder
    : savedQuestion || placeholder

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className={cn(
        'flex items-center w-full h-full gap-2',
        'cursor-pointer select-none',
        'transition-colors duration-150'
      )}
      style={{
        paddingLeft: triggerConfig.paddingLeft,
        paddingRight: triggerConfig.paddingRight,
        paddingTop: triggerConfig.paddingTop,
        paddingBottom: triggerConfig.paddingBottom,
      }}
    >
      {/* Display text */}
      <span
        className={cn(
          'flex-1 min-w-0 truncate',
          'text-sm',
          phase === 'add-idle' ? 'text-tertiary' : 'text-primary'
        )}
      >
        {displayText}
      </span>

      {/* Arrow indicator */}
      <span className="shrink-0 flex items-center justify-center text-quaternary">
        <HugeIcon icon={ArrowRight01Icon} size={18} strokeWidth={1.5} />
      </span>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const QuestionTrigger: React.FC<QuestionTriggerProps> = ({
  placeholder = 'Add a question...',
  value,
  onValueChange,
  onEscape,
  onEnter,
  onSave,
  triggerConfig,
  onButtonClick,
  className,
  maxWords = 15,
}) => {
  const { setExpanded } = useBiaxialExpand()
  const {
    triggerPhase,
    setTriggerPhase,
    savedQuestion,
    setSavedQuestion,
  } = useV3Context()

  // Handle click on idle trigger
  const handleIdleClick = useCallback(() => {
    if (triggerPhase === 'add-idle') {
      setTriggerPhase('add-expanded')
      setExpanded(true)
    } else if (triggerPhase === 'question-idle' || triggerPhase === 'question-saved') {
      setTriggerPhase('question-editing')
      setExpanded(true)
      // Pre-fill input with saved question
      if (savedQuestion && onValueChange) {
        onValueChange(savedQuestion)
      }
    }
  }, [triggerPhase, setTriggerPhase, setExpanded, savedQuestion, onValueChange])

  // Handle escape from input
  const handleEscape = useCallback(() => {
    // Return to appropriate idle state
    if (savedQuestion) {
      setTriggerPhase('question-saved')
    } else {
      setTriggerPhase('add-idle')
    }
    setExpanded(false)
    onEscape?.()
  }, [savedQuestion, setTriggerPhase, setExpanded, onEscape])

  // Handle save action
  const handleSave = useCallback(() => {
    if (!value?.trim()) return

    // Validate word count
    const validation = validateQuestionLength(value, maxWords)
    if (!validation.valid) {
      console.warn('[QuestionTrigger] Validation failed:', validation.message)
      return
    }

    // Save the question
    setSavedQuestion(value.trim())
    setTriggerPhase('question-saved')
    onSave?.(value.trim())
  }, [value, maxWords, setSavedQuestion, setTriggerPhase, onSave])

  // Handle button clicks - intercept save button
  const handleButtonClick = useCallback((buttonIndex: number, buttonConfig: TriggerButtonConfig) => {
    if (buttonConfig.icon === 'check' || buttonConfig.label === 'Save') {
      handleSave()
      return
    }
    onButtonClick?.(buttonIndex, buttonConfig)
  }, [handleSave, onButtonClick])

  // Handle Enter key
  const handleEnter = useCallback(() => {
    // If in expanded state with a save button, trigger save
    const hasSaveButton = triggerConfig.buttons?.some(
      (btn) => btn.icon === 'check' || btn.label === 'Save'
    )
    if (hasSaveButton) {
      handleSave()
    } else {
      onEnter?.()
    }
  }, [triggerConfig.buttons, handleSave, onEnter])

  // Determine if we should show idle trigger or input
  const isIdleState = triggerPhase === 'add-idle' || triggerPhase === 'question-idle' || triggerPhase === 'question-saved'

  if (isIdleState) {
    return (
      <IdleTrigger
        phase={triggerPhase}
        savedQuestion={savedQuestion}
        placeholder={placeholder}
        triggerConfig={triggerConfig}
        onClick={handleIdleClick}
      />
    )
  }

  // Expanded/editing state - show input with buttons
  return (
    <InputWithButtons
      placeholder={placeholder}
      value={value}
      onValueChange={onValueChange}
      onEscape={handleEscape}
      onEnter={handleEnter}
      triggerConfig={triggerConfig}
      onButtonClick={handleButtonClick}
      expandOnFocus={false}
      className={className}
    />
  )
}

QuestionTrigger.displayName = 'QuestionTrigger'
