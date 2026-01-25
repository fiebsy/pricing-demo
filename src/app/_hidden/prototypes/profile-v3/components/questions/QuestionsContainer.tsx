/**
 * QuestionsContainer Component
 *
 * Orchestrates multiple QuestionCommandMenu instances.
 * Manages single-expand coordination (only one question expanded at a time).
 *
 * @module b/profile-v3/components/questions
 */

'use client'

import * as React from 'react'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { QuestionCommandMenu } from './QuestionCommandMenu'
import { AddQuestionCommandMenu } from './AddQuestionCommandMenu'
import { useQuestionsCoordinator } from '../../hooks'
import type { ProfileQuestion, CategoryType } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionsContainerProps {
  questions: ProfileQuestion[]
  onQuestionClick?: (question: ProfileQuestion) => void
  onQuestionUpdate: (question: ProfileQuestion) => void
  onQuestionDelete: (question: ProfileQuestion) => void
  onAddQuestion: (question: ProfileQuestion) => void
  onCategoryHighlight?: (category: CategoryType) => void
  canAddQuestion?: boolean
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function QuestionsContainer({
  questions,
  onQuestionClick,
  onQuestionUpdate,
  onQuestionDelete,
  onAddQuestion,
  onCategoryHighlight,
  canAddQuestion = true,
  className,
}: QuestionsContainerProps) {
  const {
    expandedQuestionId,
    expandQuestion,
    collapseQuestion,
    collapseAll,
    isExpanded,
  } = useQuestionsCoordinator()

  // Track if add input is active
  const [isAddingNew, setIsAddingNew] = useState(false)

  // Handle expand request - collapse others first
  const handleExpandRequest = useCallback(
    (questionId: string) => {
      setIsAddingNew(false) // Close add input if open
      expandQuestion(questionId)
    },
    [expandQuestion]
  )

  // Handle collapse
  const handleCollapse = useCallback(
    (questionId: string) => {
      collapseQuestion(questionId)
    },
    [collapseQuestion]
  )

  // Handle add input activation
  const handleAddActivate = useCallback(() => {
    collapseAll() // Close any expanded questions
    setIsAddingNew(true)
  }, [collapseAll])

  // Handle add input deactivation
  const handleAddDeactivate = useCallback(() => {
    setIsAddingNew(false)
  }, [])

  // Handle new question added
  const handleAddQuestion = useCallback(
    (question: ProfileQuestion) => {
      onAddQuestion(question)
      setIsAddingNew(false)
      // Expand the newly added question
      expandQuestion(question.id)
    },
    [onAddQuestion, expandQuestion]
  )

  // Handle background click to collapse all
  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      // Only collapse if clicking the container itself, not children
      if (e.target === e.currentTarget) {
        collapseAll()
        setIsAddingNew(false)
      }
    },
    [collapseAll]
  )

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3',
        'w-full',
        className
      )}
      onClick={handleContainerClick}
    >
      {questions.map((question) => (
        <QuestionCommandMenu
          key={question.id}
          question={question}
          isExpanded={isExpanded(question.id)}
          onExpandRequest={() => handleExpandRequest(question.id)}
          onCollapse={() => handleCollapse(question.id)}
          onQuestionUpdate={onQuestionUpdate}
          onDelete={onQuestionDelete}
          onCategoryHighlight={onCategoryHighlight}
          className={cn(
            'w-full max-w-md',
            // Dim non-expanded questions when one is expanded
            expandedQuestionId && !isExpanded(question.id) && 'opacity-50',
            'transition-opacity duration-200',
            'motion-reduce:transition-none'
          )}
        />
      ))}

      {/* Add question input */}
      {canAddQuestion && (
        <AddQuestionCommandMenu
          isActive={isAddingNew}
          onActivate={handleAddActivate}
          onDeactivate={handleAddDeactivate}
          onAdd={handleAddQuestion}
          className={cn(
            'w-full max-w-md',
            // Dim add input when a question is expanded
            expandedQuestionId && !isAddingNew && 'opacity-50',
            'transition-opacity duration-200',
            'motion-reduce:transition-none'
          )}
        />
      )}
    </div>
  )
}

QuestionsContainer.displayName = 'QuestionsContainer'
