/**
 * QuestionCard Component - V3
 *
 * Card with three-dot menu for edit/delete actions.
 * Edit mode turns the card into an inline input.
 *
 * @module b/profile-v3/components/questions
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Menu } from '@/components/ui/core/primitives/menu'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import MoreVerticalIcon from '@hugeicons-pro/core-solid-rounded/MoreVerticalIcon'
import PencilEdit01Icon from '@hugeicons-pro/core-stroke-rounded/PencilEdit01Icon'
import Delete02Icon from '@hugeicons-pro/core-stroke-rounded/Delete02Icon'
import Tick02Icon from '@hugeicons-pro/core-stroke-rounded/Tick02Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import type { ProfileQuestion } from '../../types'
import type { MenuItem } from '@/components/ui/core/primitives/menu/types'

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_WORDS = 15

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionCardProps {
  question: ProfileQuestion
  onClick?: (question: ProfileQuestion) => void
  onUpdate?: (question: ProfileQuestion) => void
  /** Returns the new question text to typewrite */
  onRegenerate?: (question: ProfileQuestion) => string
  onDelete?: (question: ProfileQuestion) => void
  isHighlighted?: boolean
  isDimmed?: boolean
  className?: string
}

// =============================================================================
// HELPERS
// =============================================================================

function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

// =============================================================================
// COMPONENT
// =============================================================================

export function QuestionCard({
  question,
  onClick,
  onUpdate,
  onRegenerate,
  onDelete,
  isHighlighted = false,
  isDimmed = false,
  className,
}: QuestionCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [editText, setEditText] = useState(question.text)
  const [targetText, setTargetText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const typewriterRef = useRef<NodeJS.Timeout | null>(null)

  const wordCount = useMemo(() => countWords(editText), [editText])
  const isOverLimit = wordCount > MAX_WORDS
  const isEmpty = editText.trim().length === 0
  const canSave = !isEmpty && !isOverLimit && editText.trim() !== question.text

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current && !isRegenerating) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing, isRegenerating])

  // Typewriter effect for regeneration
  useEffect(() => {
    if (!isRegenerating || !targetText) return

    let currentIndex = 0
    setEditText('')

    const typeNextChar = () => {
      if (currentIndex < targetText.length) {
        setEditText(targetText.slice(0, currentIndex + 1))
        currentIndex++
        typewriterRef.current = setTimeout(typeNextChar, 30 + Math.random() * 20)
      } else {
        // Typing complete
        setIsRegenerating(false)
        setTargetText('')
      }
    }

    typewriterRef.current = setTimeout(typeNextChar, 100)

    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [isRegenerating, targetText])

  const handleClick = useCallback(() => {
    if (!isEditing) {
      onClick?.(question)
    }
  }, [isEditing, onClick, question])

  const handleEdit = useCallback(() => {
    setEditText(question.text)
    setIsEditing(true)
  }, [question.text])

  const handleRegenerate = useCallback(() => {
    const newText = onRegenerate?.(question)
    if (newText) {
      setIsEditing(true)
      setIsRegenerating(true)
      setTargetText(newText)
    }
  }, [onRegenerate, question])

  const handleDelete = useCallback(() => {
    onDelete?.(question)
  }, [onDelete, question])

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
    setEditText(question.text)
  }, [question.text])

  const handleSaveEdit = useCallback(() => {
    if (!canSave && editText.trim() === question.text) {
      // No changes, just close
      setIsEditing(false)
      return
    }
    if (!canSave) return

    onUpdate?.({
      ...question,
      text: editText.trim(),
    })
    setIsEditing(false)
  }, [canSave, editText, question, onUpdate])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSaveEdit()
      } else if (e.key === 'Escape') {
        handleCancelEdit()
      }
    },
    [handleSaveEdit, handleCancelEdit]
  )

  const menuItems: MenuItem[] = [
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: RefreshIcon,
      onClick: handleRegenerate,
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: PencilEdit01Icon,
      onClick: handleEdit,
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Delete02Icon,
      onClick: handleDelete,
    },
  ]

  // Editing state - show inline input
  if (isEditing) {
    return (
      <div
        className={cn(
          'flex items-center gap-2',
          'bg-primary',
          'rounded-2xl corner-squircle',
          'px-4 py-3',
          'shine-1-subtle',
          // Override parent's *:opacity-50 when editing
          '!opacity-100',
          isOverLimit && 'ring-2 ring-error',
          className
        )}
      >
        {/* Auto-expanding input using grid trick */}
        <div
          className="inline-grid min-w-[120px]"
          data-value={editText || ' '}
          style={{
            gridTemplateColumns: '1fr',
          }}
        >
          {/* Hidden sizer element */}
          <span
            className="invisible whitespace-pre col-start-1 row-start-1 text-sm font-medium"
            aria-hidden="true"
          >
            {editText || ' '}
          </span>
          {/* Actual input */}
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => !isRegenerating && setEditText(e.target.value)}
            onKeyDown={!isRegenerating ? handleKeyDown : undefined}
            readOnly={isRegenerating}
            className={cn(
              'col-start-1 row-start-1 w-full',
              'bg-transparent',
              'text-sm font-medium text-primary placeholder:text-quaternary',
              'focus:outline-none',
              isRegenerating && 'cursor-default'
            )}
          />
        </div>

        {/* Word count indicator - hidden during regeneration */}
        {!isRegenerating && (
          <span
            className={cn(
              'text-xs tabular-nums shrink-0',
              isOverLimit ? 'text-error' : 'text-quaternary'
            )}
          >
            {wordCount}/{MAX_WORDS}
          </span>
        )}

        {/* Action buttons - hidden during regeneration */}
        {!isRegenerating && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleCancelEdit}
              className={cn(
                'flex items-center justify-center',
                'w-7 h-7',
                'rounded-lg corner-squircle',
                'text-tertiary hover:text-primary',
                'hover:bg-tertiary/50',
                'transition-colors duration-150',
                'motion-reduce:transition-none',
                'focus:outline-none'
              )}
            >
              <HugeIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={handleSaveEdit}
              disabled={isOverLimit || isEmpty}
              className={cn(
                'flex items-center justify-center',
                'w-7 h-7',
                'rounded-lg corner-squircle',
                'text-brand-solid hover:text-brand-solid-hover',
                'hover:bg-brand-primary/10',
                'transition-colors duration-150',
                'motion-reduce:transition-none',
                'focus:outline-none',
                'disabled:opacity-30 disabled:pointer-events-none'
              )}
            >
              <HugeIcon icon={Tick02Icon} size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Normal display state
  return (
    <div
      className={cn(
        'group flex items-center gap-2',
        'motion-safe:transition-transform motion-safe:duration-200',
        'motion-reduce:transition-none',
        // Lock position when menu is open, otherwise use hover - applies to whole row
        isMenuOpen ? '-translate-y-0.5' : 'hover:-translate-y-0.5',
        !isMenuOpen && 'active:scale-[0.99] active:translate-y-0',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'text-left w-auto',
          'bg-primary',
          'rounded-2xl corner-squircle',
          'px-5 py-4',
          'shine-1-subtle',
          'focus:outline-none',
          isDimmed && 'opacity-30',
          isHighlighted && 'ring-2 ring-brand-primary ring-offset-2'
        )}
      >
        <p className="text-sm font-medium text-primary whitespace-nowrap">
          {question.text}
        </p>
      </button>

      {/* Three-dot menu - outside container to the right */}
      <div
        className={cn(
          'transition-opacity duration-150',
          'motion-reduce:transition-none',
          (isHovered || isMenuOpen) ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <Menu
          items={menuItems}
          side="bottom"
          align="end"
          sideOffset={4}
          width={140}
          onOpenChange={setIsMenuOpen}
          appearance={{
            borderRadius: 'xl',
            shadow: 'lg',
            shine: 'shine-1-subtle',
            background: 'primary',
            squircle: true,
          }}
          trigger={
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'flex items-center justify-center',
                'w-7 h-7',
                'rounded-lg corner-squircle',
                'text-tertiary hover:text-primary',
                'hover:bg-tertiary/50',
                'transition-colors duration-150',
                'motion-reduce:transition-none',
                'focus:outline-none'
              )}
            >
              <HugeIcon icon={MoreVerticalIcon} size={16} />
            </button>
          }
        />
      </div>
    </div>
  )
}
