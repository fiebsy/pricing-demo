/**
 * Select Component
 *
 * Simple select using native elements with styling.
 */

'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cx } from '@/components/utils/cx'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  children?: React.ReactNode
  className?: string
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface SelectValueProps {
  placeholder?: string
}

// Context for select state
const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  options: SelectOption[]
  registerOption: (option: SelectOption) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
} | null>(null)

const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('Select components must be used within Select')
  return context
}

export function Select({ value, onValueChange, disabled, children }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [options, setOptions] = React.useState<SelectOption[]>([])
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const registerOption = React.useCallback((option: SelectOption) => {
    setOptions((prev) => {
      if (prev.some((o) => o.value === option.value)) return prev
      return [...prev, option]
    })
  }, [])

  return (
    <SelectContext.Provider value={{ value, onValueChange, disabled, isOpen, setIsOpen, options, registerOption, triggerRef }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className }: SelectTriggerProps) {
  const { isOpen, setIsOpen, disabled, triggerRef } = useSelectContext()

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => !disabled && setIsOpen(!isOpen)}
      disabled={disabled}
      className={cx(
        'h-10 w-full min-w-0',
        'flex items-center justify-between gap-2',
        'border-primary bg-secondary rounded-md border px-3 py-2',
        'text-primary text-sm text-left',
        'focus-visible:border-brand focus-visible:ring-brand focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <svg className="size-4 shrink-0 opacity-50" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export function SelectContent({ children, className }: SelectContentProps) {
  const { isOpen, setIsOpen, triggerRef } = useSelectContext()
  const ref = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0, openUpward: false })

  // Update position when dropdown opens or on scroll/resize
  React.useEffect(() => {
    if (!isOpen || !triggerRef.current) return

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (rect) {
        // Check available space below vs above
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top
        const dropdownHeight = 240 // max-h-60 = 15rem = 240px

        // Open upward if not enough space below and more space above
        const shouldOpenUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow

        setPosition({
          top: shouldOpenUpward ? rect.top - 4 : rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          openUpward: shouldOpenUpward,
        })
      }
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isOpen, triggerRef])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen, triggerRef])

  if (!isOpen) return null

  const content = (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        // When opening upward, position bottom edge at the calculated top position
        ...(position.openUpward
          ? { bottom: window.innerHeight - position.top, left: position.left }
          : { top: position.top, left: position.left }),
        width: position.width,
      }}
      className={cx(
        'z-[9999]',
        'max-h-60 overflow-auto',
        'border-primary bg-secondary rounded-md border shadow-md',
        'p-1',
        className
      )}
    >
      {children}
    </div>
  )

  return createPortal(content, document.body)
}

export function SelectItem({ value, children, className }: SelectItemProps) {
  const { value: selectedValue, onValueChange, setIsOpen, registerOption } = useSelectContext()

  React.useEffect(() => {
    registerOption({ value, label: typeof children === 'string' ? children : value })
  }, [value, children, registerOption])

  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      onClick={() => {
        onValueChange?.(value)
        setIsOpen(false)
      }}
      className={cx(
        'relative flex w-full cursor-pointer items-center select-none',
        'rounded-sm py-1.5 pr-2 pl-8',
        'text-primary text-sm',
        'outline-none',
        'hover:bg-primary_hover',
        isSelected && 'bg-primary_hover',
        className
      )}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        {isSelected && (
          <svg className="size-4" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="truncate">{children}</span>
    </button>
  )
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value, options } = useSelectContext()
  const selectedOption = options.find((o) => o.value === value)

  return <span className="truncate">{selectedOption?.label || placeholder || 'Select...'}</span>
}
