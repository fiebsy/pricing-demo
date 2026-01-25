'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { TextareaFieldProps } from '../types'

/**
 * Auto-resizing textarea using semantic design tokens
 */
export function TextareaField({
  value,
  onChange,
  placeholder,
  headerActions,
}: TextareaFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  return (
    <div className="flex flex-col gap-2">
      {headerActions && (
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {/* Label is handled by parent FormField */}
          </div>
          <div className="mr-2 flex items-center gap-1">
            {headerActions}
          </div>
        </div>
      )}
      <div className="p-1">
        <div
          className={cn(
            'relative',
            'bg-secondary',
            'rounded-[14px]',
            'shadow-xs ring-1 ring-border-secondary',
            'focus-within:ring-2 focus-within:ring-border-primary',
            'transition-shadow duration-200'
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              'w-full resize-none overflow-hidden',
              'bg-transparent',
              'rounded-[14px]',
              'px-3.5 py-3',
              'text-[15px] leading-relaxed text-primary',
              'placeholder:text-placeholder',
              'border-0 outline-none ring-0',
              'focus:border-0 focus:outline-none focus:ring-0'
            )}
            style={{
              minHeight: '100px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Bio action button (Highlight, Generate Bio)
 */
export function BioActionButton({
  icon,
  children,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5',
        'text-xs font-medium',
        'text-tertiary',
        'rounded-full',
        'bg-transparent',
        'hover:bg-quaternary hover:text-primary',
        'active:bg-quaternary',
        'transition-colors',
        'cursor-pointer',
        'disabled:opacity-50 disabled:pointer-events-none'
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}
