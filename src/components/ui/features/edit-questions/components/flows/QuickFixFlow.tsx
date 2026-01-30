/**
 * QuickFixFlow - Tinder-style True/False cards
 *
 * Stack of statement cards that users swipe to answer:
 * - Swipe left = False
 * - Swipe right = True
 * - Progress indicator shows completion
 * - Generates memory bullets at the end
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import type { QuickFixStatement } from '../../types'
import { QUICK_FIX_STATEMENTS, MEMORY_BULLETS } from '../../constants'

// =============================================================================
// TYPES
// =============================================================================

export interface QuickFixFlowProps {
  questionCount: number
  onComplete: (answers: QuickFixStatement[]) => void
  className?: string
}

// =============================================================================
// CARD COMPONENT
// =============================================================================

interface StatementCardProps {
  statement: QuickFixStatement
  onAnswer: (isTrue: boolean) => void
  isActive: boolean
  position: number // 0 = front, 1 = next, etc.
}

function StatementCard({ statement, onAnswer, isActive, position }: StatementCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragX, setDragX] = useState(0)

  // Handle swipe action
  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      setSwipeDirection(direction)
      setTimeout(() => {
        onAnswer(direction === 'right')
      }, 200)
    },
    [onAnswer]
  )

  // Mouse/touch handlers for drag
  const handleDragStart = useCallback(() => {
    if (!isActive) return
    setIsDragging(true)
  }, [isActive])

  const handleDragMove = useCallback(
    (clientX: number, startX: number) => {
      if (!isDragging) return
      const diff = clientX - startX
      setDragX(diff)
    },
    [isDragging]
  )

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    if (Math.abs(dragX) > 100) {
      handleSwipe(dragX > 0 ? 'right' : 'left')
    }
    setDragX(0)
  }, [isDragging, dragX, handleSwipe])

  // Calculate transform based on position and drag
  const getTransform = () => {
    if (swipeDirection) {
      const x = swipeDirection === 'right' ? 400 : -400
      const rotate = swipeDirection === 'right' ? 15 : -15
      return `translateX(${x}px) rotate(${rotate}deg)`
    }
    if (isDragging) {
      const rotate = dragX * 0.05
      return `translateX(${dragX}px) rotate(${rotate}deg)`
    }
    const scale = 1 - position * 0.05
    const y = position * 8
    return `scale(${scale}) translateY(${y}px)`
  }

  const opacity = position > 2 ? 0 : 1 - position * 0.2

  if (!isActive && position > 2) return null

  return (
    <div
      className={cn(
        'absolute inset-0 p-6 rounded-2xl',
        'bg-primary border border-primary shadow-lg',
        'flex flex-col items-center justify-center text-center',
        'motion-safe:transition-all',
        swipeDirection ? 'motion-safe:duration-200' : 'motion-safe:duration-300',
        isActive && 'cursor-grab active:cursor-grabbing'
      )}
      style={{
        transform: getTransform(),
        opacity,
        zIndex: 10 - position,
      }}
      onMouseDown={(e) => {
        if (!isActive) return
        const startX = e.clientX
        handleDragStart()

        const handleMove = (moveE: MouseEvent) => handleDragMove(moveE.clientX, startX)
        const handleUp = () => {
          handleDragEnd()
          window.removeEventListener('mousemove', handleMove)
          window.removeEventListener('mouseup', handleUp)
        }

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', handleUp)
      }}
    >
      <p className="text-lg font-medium text-primary leading-relaxed max-w-xs">
        {statement.text}
      </p>

      {/* Swipe hint overlay */}
      {isActive && Math.abs(dragX) > 30 && (
        <div
          className={cn(
            'absolute inset-0 rounded-2xl flex items-center justify-center',
            'motion-safe:transition-opacity motion-safe:duration-150',
            dragX > 0
              ? 'bg-success-primary/10 border-2 border-success-primary'
              : 'bg-error-primary/10 border-2 border-error-primary'
          )}
        >
          <HugeIcon
            icon={dragX > 0 ? Tick01Icon : Cancel01Icon}
            size="xl"
            color={dragX > 0 ? 'success' : 'error'}
          />
        </div>
      )}
    </div>
  )
}

// =============================================================================
// PROGRESS INDICATOR
// =============================================================================

interface ProgressIndicatorProps {
  current: number
  total: number
}

function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-tertiary">Progress</span>
        <span className="text-xs font-medium text-primary">
          {current} / {total}
        </span>
      </div>
      <div className="h-1.5 bg-tertiary/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-primary rounded-full motion-safe:transition-all motion-safe:duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// =============================================================================
// COMPLETION STATE
// =============================================================================

interface CompletionStateProps {
  onContinue: () => void
}

function CompletionState({ onContinue }: CompletionStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <div className="size-16 rounded-full bg-success-primary/10 flex items-center justify-center mb-4">
        <HugeIcon icon={Tick01Icon} size="xl" color="success" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">All done!</h3>
      <p className="text-sm text-tertiary mb-6 max-w-xs">
        Here&apos;s what I learned about your perspective:
      </p>

      {/* Memory bullets */}
      <ul className="text-left space-y-2 mb-8 w-full max-w-xs">
        {MEMORY_BULLETS.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-secondary">
            <span className="text-brand-primary mt-0.5">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onContinue}
        className={cn(
          'px-6 py-2.5 rounded-xl',
          'text-sm font-medium text-white',
          'bg-brand-solid hover:bg-brand-solid-hover',
          'motion-safe:transition-colors motion-safe:duration-150'
        )}
      >
        Generate New Answer
      </button>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function QuickFixFlow({ questionCount, onComplete, className }: QuickFixFlowProps) {
  // Get limited statements
  const statements = useMemo(
    () => QUICK_FIX_STATEMENTS.slice(0, questionCount),
    [questionCount]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<QuickFixStatement[]>([])
  const [isComplete, setIsComplete] = useState(false)

  // Handle answering a statement
  const handleAnswer = useCallback(
    (isTrue: boolean) => {
      const statement = statements[currentIndex]
      const answeredStatement = { ...statement, isTrue }
      const newAnswers = [...answers, answeredStatement]
      setAnswers(newAnswers)

      if (currentIndex + 1 >= statements.length) {
        setIsComplete(true)
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [currentIndex, statements, answers]
  )

  // Handle continue after completion
  const handleContinue = useCallback(() => {
    onComplete(answers)
  }, [answers, onComplete])

  // Handle button clicks for swipe
  const handleButtonSwipe = useCallback(
    (direction: 'left' | 'right') => {
      handleAnswer(direction === 'right')
    },
    [handleAnswer]
  )

  if (isComplete) {
    return (
      <div className={className}>
        <CompletionState onContinue={handleContinue} />
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Progress */}
      <div className="mb-8 w-full flex justify-center">
        <ProgressIndicator current={currentIndex} total={statements.length} />
      </div>

      {/* Instructions */}
      <p className="text-sm text-tertiary mb-6 text-center">
        Swipe right if true, left if false
      </p>

      {/* Card stack */}
      <div className="relative w-full max-w-sm h-48 mb-8">
        {statements.map((statement, index) => {
          const position = index - currentIndex
          if (position < 0) return null

          return (
            <StatementCard
              key={statement.id}
              statement={statement}
              onAnswer={handleAnswer}
              isActive={position === 0}
              position={position}
            />
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={() => handleButtonSwipe('left')}
          className={cn(
            'size-14 rounded-full',
            'flex items-center justify-center',
            'bg-error-primary/10 text-error-primary',
            'hover:bg-error-primary/20',
            'motion-safe:transition-colors motion-safe:duration-150'
          )}
        >
          <HugeIcon icon={ArrowLeft01Icon} size="lg" color="current" />
        </button>
        <button
          type="button"
          onClick={() => handleButtonSwipe('right')}
          className={cn(
            'size-14 rounded-full',
            'flex items-center justify-center',
            'bg-success-primary/10 text-success-primary',
            'hover:bg-success-primary/20',
            'motion-safe:transition-colors motion-safe:duration-150'
          )}
        >
          <HugeIcon icon={ArrowRight01Icon} size="lg" color="current" />
        </button>
      </div>
    </div>
  )
}
