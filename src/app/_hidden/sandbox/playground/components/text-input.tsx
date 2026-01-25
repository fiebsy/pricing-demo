'use client'

import { cn } from '@/lib/utils'
import type { TextInputProps } from '../types'

// Shared input styles using semantic design tokens
export const inputStyles = cn(
  // Base styles
  'flex w-full text-[15px] text-primary',
  'placeholder:text-placeholder placeholder:transition-colors placeholder:duration-200',
  'hover:placeholder:text-tertiary',
  'focus:placeholder:text-tertiary',
  // Background
  'bg-secondary',
  // Border radius
  'rounded-[14px]',
  // Shadow and ring - using semantic tokens
  'shadow-xs ring-1 ring-border-secondary',
  // Focus state with ring
  'focus:ring-2 focus:ring-border-primary',
  // Reset browser defaults
  'border-0 outline-none',
  'focus:border-0 focus:outline-none',
  // Transition
  'transition-shadow duration-200',
  // Disabled state
  'disabled:cursor-not-allowed disabled:opacity-50'
)

/**
 * Text input using semantic design tokens
 */
export function TextInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  maxLength,
  leftIcon,
  rightContent,
  className,
}: TextInputProps) {
  const hasLeftIcon = !!leftIcon
  const hasRightContent = !!rightContent

  return (
    <div className="relative">
      {leftIcon && (
        <div
          className="absolute left-3 top-1/2 z-10 flex size-[22px] -translate-y-1/2 items-center justify-center"
        >
          {leftIcon}
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={cn(
          inputStyles,
          'h-10 px-4 py-2.5',
          hasLeftIcon && 'pl-10',
          hasRightContent && 'pr-10',
          className
        )}
      />
      {rightContent && (
        <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
          {rightContent}
        </div>
      )}
    </div>
  )
}

/**
 * Disabled name field with lock icon and support link
 */
export function DisabledNameField({ name }: { name: string }) {
  return (
    <div
      className={cn(
        'flex h-10 w-full items-center px-4 py-2.5',
        'text-[15px] text-disabled',
        'bg-disabled',
        'rounded-[14px]',
        'cursor-default pointer-events-none'
      )}
    >
      <span className="flex-1 truncate">{name}</span>
      <div className="flex shrink-0 items-center gap-1.5 text-quaternary pointer-events-auto">
        {/* Lock icon */}
        <svg
          className="size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C9.23858 2 7 4.23858 7 7V9.12602C5.27477 9.57006 4 11.1362 4 13V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V13C20 11.1362 18.7252 9.57006 17 9.12602V7C17 4.23858 14.7614 2 12 2ZM15 9V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V9H15ZM12 13C12.5523 13 13 13.4477 13 14V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V14C11 13.4477 11.4477 13 12 13Z"
            fill="currentColor"
          />
        </svg>
        <span className="text-xs">
          <a
            href="mailto:support@delphi.ai"
            className="hover:underline"
          >
            Contact support
          </a>
        </span>
      </div>
    </div>
  )
}
