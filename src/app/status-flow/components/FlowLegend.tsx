/**
 * Flow Legend
 *
 * Legend showing edge colors by destination and thickness by frequency.
 */

'use client'

import { useState } from 'react'
import { InformationCircleIcon, ArrowDown01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { cn } from '@/lib/utils'

// =============================================================================
// LEGEND DATA
// =============================================================================

const EDGE_DESTINATION_COLORS = [
  { label: 'Paid in Full', color: '#22c55e', description: 'Leads to successful payment' },
  { label: 'Clawback/Default', color: '#ef4444', description: 'Leads to clawback states' },
  { label: 'Canceled', color: '#f59e0b', description: 'Leads to cancellation' },
  { label: 'Active Loop', color: '#3b82f6', description: 'Loops back to active states' },
  { label: 'Other Closed', color: '#9ca3af', description: 'Leads to other closed states' },
]

const EDGE_WIDTHS = [
  { label: '2000+', width: 5, opacity: 0.9 },
  { label: '1000+', width: 4, opacity: 0.85 },
  { label: '500+', width: 3, opacity: 0.75 },
  { label: '100+', width: 2, opacity: 0.6 },
  { label: '<100', width: 1.5, opacity: 0.45 },
]

const NODE_CATEGORIES = [
  { label: 'Other Active', color: 'bg-brand-primary', border: 'border-brand' },
  { label: 'Healthy', color: 'bg-success-primary', border: 'border-success' },
  { label: 'At Risk', color: 'bg-warning-primary', border: 'border-warning' },
  { label: 'Fully Paid', color: 'bg-success-primary', border: 'border-success' },
  { label: 'Clawed Back', color: 'bg-error-primary', border: 'border-error' },
  { label: 'Closed', color: 'bg-tertiary', border: 'border-secondary' },
]

// =============================================================================
// COMPONENT
// =============================================================================

export function FlowLegend() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden max-w-[280px]">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HugeIcon icon={InformationCircleIcon} size={16} className="text-gray-400 dark:text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Legend</span>
        </div>
        <HugeIcon
          icon={ArrowDown01Icon}
          size={14}
          className={cn('text-gray-400 dark:text-gray-500 transition-transform', isExpanded && 'rotate-180')}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-800 pt-2 space-y-4">
          {/* Edge Colors by Destination */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Edge Color = Destination
            </div>
            <div className="space-y-1.5">
              {EDGE_DESTINATION_COLORS.map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-6 h-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edge Thickness */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Edge Width = Frequency
            </div>
            <div className="space-y-1">
              {EDGE_WIDTHS.map(edge => (
                <div key={edge.label} className="flex items-center gap-2">
                  <div className="w-8 flex items-center">
                    <div
                      className="w-full bg-gray-500 rounded-full"
                      style={{ height: `${edge.width}px`, opacity: edge.opacity }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-600 dark:text-gray-300">{edge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Node Categories */}
          <div>
            <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Node Categories
            </div>
            <div className="grid grid-cols-2 gap-1">
              {NODE_CATEGORIES.map(cat => (
                <div key={cat.label} className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      'w-3 h-3 rounded border',
                      cat.color,
                      cat.border
                    )}
                  />
                  <span className="text-[9px] text-gray-600 dark:text-gray-300 truncate">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
