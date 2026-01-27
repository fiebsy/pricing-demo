/**
 * QuickFixSheet - T/F card swipe flow sheet
 *
 * Displays swipeable cards for true/false questions.
 * Shows completion state when all cards are answered.
 *
 * @module playground/quick-fix-modal/flows
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  SwipeableCard,
  ActionButtons,
  ProgressBar,
  CompletionState,
} from '../../quick-fix-interactions/core'
import type { SheetContentProps } from '../config/types'

// =============================================================================
// SAMPLE DATA
// =============================================================================

const SAMPLE_STATEMENTS = [
  { id: 's1', text: 'I prefer working independently rather than in teams.' },
  { id: 's2', text: 'I enjoy learning new technologies and tools.' },
  { id: 's3', text: 'I prioritize quality over speed in my work.' },
  { id: 's4', text: 'I am comfortable presenting to large groups.' },
  { id: 's5', text: 'I thrive in fast-paced environments.' },
]

const MEMORY_BULLETS = [
  'Updated your work preferences',
  'Improved profile accuracy by 12%',
  'New recommendations available',
]

// =============================================================================
// TYPES
// =============================================================================

export interface QuickFixSheetProps extends SheetContentProps {
  /** Custom statements to display */
  statements?: Array<{ id: string; text: string }>
  /** Memory bullets for completion screen */
  memoryBullets?: string[]
  /** Callback when all cards are answered */
  onAllAnswered?: (answers: Array<{ id: string; answer: boolean }>) => void
  /** Additional className */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * QuickFixSheet Component
 *
 * Sheet content for the T/F card swipe flow.
 * Tracks answers and shows completion when done.
 */
export function QuickFixSheet({
  onNavigate,
  onComplete,
  onClose,
  config,
  statements = SAMPLE_STATEMENTS,
  memoryBullets = MEMORY_BULLETS,
  onAllAnswered,
  className,
}: QuickFixSheetProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isComplete, setIsComplete] = React.useState(false)
  const [triggerDirection, setTriggerDirection] = React.useState<'left' | 'right' | null>(null)
  const [answers, setAnswers] = React.useState<Array<{ id: string; answer: boolean }>>([])

  // Handle swipe action
  const handleSwipe = React.useCallback((isTrue: boolean) => {
    setTriggerDirection(null)

    // Record answer
    const statement = statements[currentIndex]
    if (statement) {
      setAnswers((prev) => [...prev, { id: statement.id, answer: isTrue }])
    }

    // Check if complete
    if (currentIndex + 1 >= statements.length) {
      setIsComplete(true)
      onAllAnswered?.(answers)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, statements, answers, onAllAnswered])

  // Handle button swipe trigger
  const handleButtonSwipe = React.useCallback((direction: 'left' | 'right') => {
    setTriggerDirection(direction)
  }, [])

  // Handle continue after completion
  const handleContinue = React.useCallback(() => {
    onComplete()
  }, [onComplete])

  // Render completion state
  if (isComplete) {
    return (
      <div className={cn('flex flex-col p-6', className)}>
        <CompletionState
          onContinue={handleContinue}
          bullets={memoryBullets}
          config={config.completion}
        />
      </div>
    )
  }

  // Render card stack
  return (
    <div className={cn('flex flex-col items-center p-6', className)}>
      {/* Progress */}
      <div className="mb-6 w-full flex justify-center">
        <ProgressBar
          current={currentIndex}
          total={statements.length}
          config={config.progress}
        />
      </div>

      {/* Instructions */}
      <p className="text-sm text-tertiary mb-6 text-center">
        Swipe right if true, left if false
      </p>

      {/* Card stack */}
      <div
        className="relative mb-6"
        style={{
          width: config.card.width,
          height: config.card.height,
        }}
      >
        {statements.map((statement, index) => {
          const position = index - currentIndex
          if (position < 0) return null

          return (
            <SwipeableCard
              key={statement.id}
              text={statement.text}
              isActive={position === 0}
              position={position}
              onSwipe={handleSwipe}
              cardConfig={config.card}
              swipeConfig={config.swipe}
              triggerDirection={position === 0 ? triggerDirection : null}
            />
          )
        })}
      </div>

      {/* Action buttons */}
      <ActionButtons
        onSwipe={handleButtonSwipe}
        config={config.actionButtons}
      />
    </div>
  )
}

// =============================================================================
// SHEET DEFINITION FACTORY
// =============================================================================

/**
 * Create a QuickFixSheet definition for use with SheetStack.
 */
export function createQuickFixSheet(
  statements?: Array<{ id: string; text: string }>,
  memoryBullets?: string[],
  title = 'Quick Fix'
) {
  return {
    id: 'quick-fix',
    title,
    component: QuickFixSheet,
    componentProps: { statements, memoryBullets },
    canPop: true,
  }
}
