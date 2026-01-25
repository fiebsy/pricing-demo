'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { inputStyles } from './text-input'

const MAX_QUESTIONS = 5

interface QuestionsListProps {
  questions: string[]
  onChange: (questions: string[]) => void
}

/**
 * Pinned questions list with dynamic add/remove
 */
export function QuestionsList({ questions, onChange }: QuestionsListProps) {
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    onChange(newQuestions)
  }

  const handleRemove = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index)
    onChange(newQuestions)
  }

  const handleAdd = () => {
    if (questions.length < MAX_QUESTIONS) {
      onChange([...questions, ''])
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="ml-3.5 flex items-center gap-2">
        <span className="text-sm font-medium text-primary">
          Pinned Questions
        </span>
        <span className="text-xs text-tertiary">
          Max {MAX_QUESTIONS} questions
        </span>
      </div>

      {/* Questions */}
      <div className="flex w-full flex-col gap-2">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            value={question}
            onChange={(value) => handleQuestionChange(index, value)}
            onRemove={() => handleRemove(index)}
          />
        ))}

        {/* Add button - only show if under max */}
        {questions.length < MAX_QUESTIONS && (
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              'flex w-fit cursor-pointer items-center gap-2',
              'rounded-xl bg-tertiary px-3 py-2.5',
              'text-sm text-secondary',
              'hover:bg-quaternary',
              'transition-colors'
            )}
          >
            {/* Plus icon */}
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H17.25C17.6642 11.25 18 11.5858 18 12C18 12.4142 17.6642 12.75 17.25 12.75H12.75V17.25C12.75 17.6642 12.4142 18 12 18C11.5858 18 11.25 17.6642 11.25 17.25V12.75H6.75C6.33579 12.75 6 12.4142 6 12C6 11.5858 6.33579 11.25 6.75 11.25H11.25V6.75C11.25 6.33579 11.5858 6 12 6Z"
                fill="currentColor"
              />
            </svg>
            Add question
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Individual question textarea with remove button
 */
function QuestionItem({
  value,
  onChange,
  onRemove,
}: {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.max(43, textarea.scrollHeight)}px`
    }
  }, [value])

  return (
    <div
      className="w-full"
      style={{
        opacity: 1,
        height: 'auto',
        transform: 'none',
        transformOrigin: '0% 50% 0px',
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={1}
            className={cn(
              inputStyles,
              'w-full resize-none overflow-hidden',
              'px-4 py-2.5 pr-10',
              '!min-h-[43px]'
            )}
            style={{
              height: '43px',
            }}
          />
          {/* Remove button */}
          <button
            type="button"
            onClick={onRemove}
            title="Remove"
            className={cn(
              'absolute right-3 top-2.5 z-10',
              'flex size-5 cursor-pointer items-center justify-center rounded'
            )}
          >
            <svg
              className="size-3.5 text-tertiary opacity-40 transition-opacity duration-200 hover:opacity-100"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 5L19 19M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
