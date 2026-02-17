/**
 * Path Selector
 *
 * Dropdown for selecting path tracing presets.
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowDown01Icon, Route01Icon, Cancel01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { PATH_PRESETS } from '../_config/paths'
import type { FilterState } from '../_config/types'
import type { PathTracingResult } from '../hooks/usePathTracing'
import { cn } from '@/lib/utils'

// =============================================================================
// PROPS
// =============================================================================

interface PathSelectorProps {
  filterState: FilterState
  onFilterChange: (updates: Partial<FilterState>) => void
  pathStats?: PathTracingResult | null
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PathSelector({ filterState, onFilterChange, pathStats }: PathSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedPreset = PATH_PRESETS.find(p => p.id === filterState.activePathPreset)

  const selectPreset = (presetId: string | null) => {
    onFilterChange({ activePathPreset: presetId })
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors',
          selectedPreset
            ? 'bg-brand-primary border-brand text-brand-primary'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <HugeIcon icon={Route01Icon} size={18} />
        <span className="text-sm font-medium">
          {selectedPreset?.label ?? 'Trace Path'}
        </span>
        <HugeIcon
          icon={ArrowDown01Icon}
          size={16}
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {/* Clear Button (when preset is active) */}
      {selectedPreset && (
        <button
          onClick={() => selectPreset(null)}
          className="absolute -top-1 -right-1 p-0.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <HugeIcon icon={Cancel01Icon} size={12} />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            {PATH_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => selectPreset(preset.id)}
                className={cn(
                  'w-full px-3 py-2 rounded-lg text-left transition-colors',
                  preset.id === filterState.activePathPreset
                    ? 'bg-brand-primary text-brand-primary'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                )}
              >
                <div className="text-sm font-medium">{preset.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{preset.description}</div>
              </button>
            ))}
          </div>

          {/* Clear Option */}
          {filterState.activePathPreset && (
            <>
              <div className="border-t border-gray-100 dark:border-gray-800" />
              <div className="p-2">
                <button
                  onClick={() => selectPreset(null)}
                  className="w-full px-3 py-2 rounded-lg text-left text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Clear path trace
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Path Stats (when active) */}
      {selectedPreset && pathStats && (
        <div className="absolute top-full left-0 mt-12 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-xs shadow-lg whitespace-nowrap">
          <div className="flex items-center gap-3">
            <span>
              <strong>{pathStats.stats.nodeCount}</strong> nodes
            </span>
            <span>•</span>
            <span>
              <strong>{pathStats.stats.edgeCount}</strong> transitions
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
