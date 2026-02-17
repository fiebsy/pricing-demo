/**
 * View Toggle Component
 *
 * Simple toggle between Statuses and Transitions views.
 */

'use client'

import type { ViewMode } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

interface ViewToggleProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
  statusCount: number
  transitionCount: number
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ViewToggle({
  value,
  onChange,
  statusCount,
  transitionCount,
}: ViewToggleProps) {
  return (
    <div className="bg-secondary inline-flex rounded-lg p-1">
      <ToggleButton
        label="Statuses"
        count={statusCount}
        isActive={value === 'statuses'}
        onClick={() => onChange('statuses')}
      />
      <ToggleButton
        label="Transitions"
        count={transitionCount}
        isActive={value === 'transitions'}
        onClick={() => onChange('transitions')}
      />
    </div>
  )
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface ToggleButtonProps {
  label: string
  count: number
  isActive: boolean
  onClick: () => void
}

function ToggleButton({ label, count, isActive, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary text-primary shadow-sm'
          : 'text-secondary hover:text-primary'
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
          isActive
            ? 'bg-secondary/50 text-secondary'
            : 'bg-tertiary/50 text-tertiary'
        }`}
      >
        {count}
      </span>
    </button>
  )
}
