/**
 * View Toggle Component
 *
 * Toggle between detailed (7 subcategories) and simplified (3 main states) views.
 */

'use client'

import { cn } from '@/lib/utils'
import type { ViewMode } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

interface ViewToggleProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="bg-secondary inline-flex items-center gap-1 rounded-lg p-1">
      <button
        type="button"
        onClick={() => onChange('detailed')}
        className={cn(
          'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
          value === 'detailed'
            ? 'bg-primary text-primary shadow-sm'
            : 'text-secondary hover:text-primary'
        )}
      >
        7 Subcategories
      </button>
      <button
        type="button"
        onClick={() => onChange('simplified')}
        className={cn(
          'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
          value === 'simplified'
            ? 'bg-primary text-primary shadow-sm'
            : 'text-secondary hover:text-primary'
        )}
      >
        3 Main States
      </button>
    </div>
  )
}
