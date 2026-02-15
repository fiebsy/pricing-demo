/**
 * Column Toggle Component
 *
 * Allows users to show/hide optional columns.
 */

'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { ColumnKey } from '../config/columns'
import { TOGGLEABLE_COLUMNS } from '../config/columns'

// =============================================================================
// TYPES
// =============================================================================

interface ColumnToggleProps {
  visibleColumns: ColumnKey[]
  onToggle: (column: ColumnKey) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ColumnToggle({ visibleColumns, onToggle }: ColumnToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5',
          'bg-secondary text-secondary text-xs font-medium',
          'transition-colors hover:bg-tertiary',
          isOpen && 'bg-tertiary'
        )}
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        Columns
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="bg-primary border-secondary absolute right-0 top-full z-20 mt-1 min-w-[180px] rounded-lg border p-2 shadow-lg">
            {TOGGLEABLE_COLUMNS.map(({ key, label }) => (
              <label
                key={key}
                className="text-secondary hover:bg-tertiary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(key)}
                  onChange={() => onToggle(key)}
                  className="accent-brand h-3.5 w-3.5 rounded"
                />
                {label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
