/**
 * ManualFixSheet - Text/voice input flow sheet
 *
 * Allows users to type or speak their answer directly.
 *
 * @module playground/quick-fix-modal/flows
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Button } from '@/components/ui/core/primitives/button'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import MicOff01Icon from '@hugeicons-pro/core-stroke-rounded/MicOff01Icon'
import StarIcon from '@hugeicons-pro/core-stroke-rounded/StarIcon'
import type { SheetContentProps } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface ManualFixSheetProps extends SheetContentProps {
  /** Question text to display */
  questionText?: string
  /** Minimum characters required */
  minCharacters?: number
  /** Callback when answer is submitted */
  onAnswerSubmit?: (answer: string) => void
  /** Additional className */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * ManualFixSheet Component
 *
 * Sheet content for typing or speaking an answer.
 */
export function ManualFixSheet({
  onNavigate,
  onComplete,
  onClose,
  config,
  questionText = 'How do you typically approach problem-solving in your work?',
  minCharacters = 50,
  onAnswerSubmit,
  className,
}: ManualFixSheetProps) {
  const [inputValue, setInputValue] = React.useState('')
  const [isRecording, setIsRecording] = React.useState(false)

  // Build style classes
  const shineClass = config.flowOptions.shine !== 'none'
    ? `${config.flowOptions.shine}${config.flowOptions.shineIntensity}`
    : ''
  const cornerClass = config.flowOptions.cornerShape === 'squircle' ? 'corner-squircle' : ''
  const borderRadius = config.flowOptions.cardBorderRadius

  // Toggle voice recording (simulated)
  const handleToggleRecording = React.useCallback(() => {
    if (isRecording) {
      // Stop recording and add transcription
      setIsRecording(false)
      setInputValue((prev) => {
        const transcription =
          'I believe the answer involves careful consideration of multiple factors and a balanced approach that takes into account both short-term needs and long-term goals.'
        return prev ? `${prev}\n\n${transcription}` : transcription
      })
    } else {
      // Start recording
      setIsRecording(true)
      // Auto-stop after 3 seconds (simulated)
      setTimeout(() => {
        setIsRecording(false)
        setInputValue((prev) => {
          const transcription =
            'I believe the answer involves careful consideration of multiple factors and a balanced approach that takes into account both short-term needs and long-term goals.'
          return prev ? `${prev}\n\n${transcription}` : transcription
        })
      }, 3000)
    }
  }, [isRecording])

  // Handle complete
  const handleComplete = React.useCallback(() => {
    if (inputValue.trim()) {
      onAnswerSubmit?.(inputValue.trim())
      onComplete()
    }
  }, [inputValue, onAnswerSubmit, onComplete])

  // Character count
  const charCount = inputValue.length
  const isValid = charCount >= minCharacters

  return (
    <div className={cn('flex flex-col p-6', className)}>
      {/* Question reference */}
      <div
        className={cn(
          'mb-6 p-4 bg-secondary border border-primary',
          shineClass,
          cornerClass
        )}
        style={{ borderRadius }}
      >
        <h4 className="text-xs font-medium text-tertiary uppercase tracking-wider mb-2">
          Question
        </h4>
        <p className="text-primary">{questionText}</p>
      </div>

      {/* Header */}
      <h3 className="text-lg font-semibold text-primary mb-2">Provide Your Answer</h3>
      <p className="text-sm text-tertiary mb-6">
        Type your answer below or use voice input to dictate your response.
      </p>

      {/* Input area */}
      <div className="relative mb-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Start typing your answer here..."
          rows={6}
          className={cn(
            'w-full px-4 py-3 resize-none',
            'bg-secondary border border-primary',
            'text-primary placeholder:text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary',
            'motion-safe:transition-colors motion-safe:duration-150',
            shineClass,
            cornerClass
          )}
          style={{ borderRadius }}
        />

        {/* Voice button */}
        <button
          type="button"
          onClick={handleToggleRecording}
          className={cn(
            'absolute bottom-3 right-3 p-2 rounded-lg',
            'motion-safe:transition-all motion-safe:duration-150',
            isRecording
              ? 'bg-error-primary text-white animate-pulse'
              : 'bg-tertiary text-tertiary hover:text-primary hover:bg-secondary'
          )}
        >
          <HugeIcon
            icon={isRecording ? MicOff01Icon : Mic01Icon}
            size="sm"
            color="current"
          />
        </button>
      </div>

      {/* Character count and recording status */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={cn(
            'text-xs',
            isValid ? 'text-success-primary' : 'text-tertiary'
          )}
        >
          {charCount} / {minCharacters} min characters
        </span>
        {isRecording && (
          <span className="inline-flex items-center gap-1.5 text-xs text-error-primary">
            <span className="size-2 rounded-full bg-error-primary animate-pulse" />
            Recording...
          </span>
        )}
      </div>

      {/* Tips */}
      <div
        className={cn(
          'mb-6 p-4 bg-brand-primary/5 border border-brand-primary/20',
          cornerClass
        )}
        style={{ borderRadius }}
      >
        <div className="flex items-start gap-3">
          <HugeIcon icon={StarIcon} size="sm" color="brand" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Tips for a great answer</h4>
            <ul className="text-xs text-secondary space-y-1">
              <li>Be specific with examples when possible</li>
              <li>Explain your reasoning or approach</li>
              <li>Keep it concise but comprehensive</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Complete button */}
      <Button
        variant="primary"
        size="lg"
        roundness={config.flowOptions.cornerShape === 'squircle' ? 'squircle' : 'default'}
        onClick={handleComplete}
        disabled={!isValid}
        className="w-full"
      >
        {isValid
          ? 'Save Answer'
          : `Add ${minCharacters - charCount} more characters`}
      </Button>
    </div>
  )
}

// =============================================================================
// SHEET DEFINITION FACTORY
// =============================================================================

/**
 * Create a ManualFixSheet definition for use with SheetStack.
 */
export function createManualFixSheet(
  questionText?: string,
  title = 'Manual Fix'
) {
  return {
    id: 'manual-fix',
    title,
    component: ManualFixSheet,
    componentProps: { questionText },
    canPop: true,
  }
}
