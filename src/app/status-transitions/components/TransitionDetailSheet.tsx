/**
 * Transition Detail Sheet
 *
 * Slide-out panel showing full details of a status transition.
 */

'use client'

import { Dialog } from '@base-ui/react/dialog'
import { Cancel01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { TransitionEntry } from '../config/types'
import { SUBCATEGORY_LABELS, SUBCATEGORY_COLORS } from '../config/status-categories'
import { CoverageIndicator } from './CoverageIndicator'
import { UsageTierDot } from './UsageTierDot'

// =============================================================================
// TYPES
// =============================================================================

interface TransitionDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transition: TransitionEntry | null
}

// =============================================================================
// HELPERS
// =============================================================================

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatFrequency(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toLocaleString()
}

// =============================================================================
// DETAIL ROW COMPONENT
// =============================================================================

interface DetailRowProps {
  label: string
  children: React.ReactNode
}

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <span className="text-tertiary shrink-0 text-sm">{label}</span>
      <div className="text-right">{children}</div>
    </div>
  )
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TransitionDetailSheet({
  open,
  onOpenChange,
  transition,
}: TransitionDetailSheetProps) {
  if (!transition) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />

        {/* Sheet Panel */}
        <Dialog.Popup className="bg-primary fixed right-0 top-0 z-50 h-full w-[480px] overflow-y-auto shadow-xl transition-transform duration-200 data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
          {/* Header */}
          <div className="border-secondary sticky top-0 flex items-center justify-between border-b bg-inherit px-6 py-4">
            <Dialog.Title className="text-primary text-lg font-semibold">
              Transition Details
            </Dialog.Title>
            <Dialog.Close className="text-tertiary hover:text-primary hover:bg-secondary -mr-2 rounded-lg p-2 transition-colors">
              <HugeIcon icon={Cancel01Icon} size={20} />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Status Transition Visual */}
            <div className="bg-secondary mb-6 rounded-xl p-4">
              <div className="text-tertiary mb-3 text-xs font-medium uppercase tracking-wider">
                Status Change
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-lg bg-black/5 px-3 py-2">
                  <div className="text-tertiary mb-0.5 text-xs">From</div>
                  <div className="text-primary font-mono text-sm font-medium">
                    {transition.fromStatus}
                  </div>
                </div>
                <div className="text-tertiary">→</div>
                <div className="flex-1 rounded-lg bg-black/5 px-3 py-2">
                  <div className="text-tertiary mb-0.5 text-xs">To</div>
                  <div className="text-primary font-mono text-sm font-medium">
                    {transition.toStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <div className="text-tertiary mb-2 text-xs font-medium uppercase tracking-wider">
                Description
              </div>
              <p className="text-secondary text-sm leading-relaxed">
                {transition.tooltip}
              </p>
            </div>

            {/* Categories */}
            <div className="border-secondary mb-6 border-t pt-6">
              <div className="text-tertiary mb-3 text-xs font-medium uppercase tracking-wider">
                Categories
              </div>
              <div className="flex gap-3">
                {transition.fromCategory && (
                  <div className="flex-1">
                    <div className="text-tertiary mb-1.5 text-xs">From Category</div>
                    <Badge
                      color={SUBCATEGORY_COLORS[transition.fromCategory] as 'success' | 'warning' | 'error' | 'gray' | 'info'}
                      size="sm"
                      shape="squircle"
                    >
                      {SUBCATEGORY_LABELS[transition.fromCategory]}
                    </Badge>
                  </div>
                )}
                {transition.toCategory && (
                  <div className="flex-1">
                    <div className="text-tertiary mb-1.5 text-xs">To Category</div>
                    <Badge
                      color={SUBCATEGORY_COLORS[transition.toCategory] as 'success' | 'warning' | 'error' | 'gray' | 'info'}
                      size="sm"
                      shape="squircle"
                    >
                      {SUBCATEGORY_LABELS[transition.toCategory]}
                    </Badge>
                  </div>
                )}
                {!transition.fromCategory && !transition.toCategory && (
                  <span className="text-tertiary text-sm">No category mapping</span>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="border-secondary divide-secondary divide-y border-t">
              <DetailRow label="Coverage Type">
                <CoverageIndicator coverage={transition.coverage} />
              </DetailRow>

              <DetailRow label="Frequency">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-sm font-medium tabular-nums">
                    {formatFrequency(transition.frequency)}
                  </span>
                  <span className="text-tertiary text-xs">occurrences</span>
                </div>
              </DetailRow>

              <DetailRow label="Usage Tier">
                <UsageTierDot tier={transition.usageTier} />
              </DetailRow>

              <DetailRow label="Last Occurred">
                <span className="text-secondary text-sm">
                  {formatDate(transition.lastOccurred)}
                </span>
              </DetailRow>

              <DetailRow label="Short Description">
                <span className="text-secondary text-sm">{transition.condensed}</span>
              </DetailRow>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
