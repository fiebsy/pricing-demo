/**
 * Node Detail Sheet
 *
 * Slide-out panel showing full details of a status node.
 */

'use client'

import { Dialog } from '@base-ui/react/dialog'
import { Cancel01Icon, ArrowRight01Icon, ArrowLeft01Icon } from '@hugeicons-pro/core-stroke-rounded'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { StatusFlowNode, BadgeColor } from '../_config/types'
import { getTransitionsForStatus } from '../hooks/useTransitionEdges'
import { COLUMNS } from '../_config/layout'

// =============================================================================
// TYPES
// =============================================================================

interface NodeDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  node: StatusFlowNode | null
}

// =============================================================================
// HELPERS
// =============================================================================

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toLocaleString()
}

function getColumnLabel(subcategory: string): string {
  const column = COLUMNS.find(c => c.subcategory === subcategory)
  return column?.label ?? subcategory
}

// =============================================================================
// TRANSITION ROW
// =============================================================================

interface TransitionRowProps {
  status: string
  frequency: number
  description: string
  direction: 'incoming' | 'outgoing'
}

function TransitionRow({ status, frequency, description, direction }: TransitionRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      <HugeIcon
        icon={direction === 'incoming' ? ArrowLeft01Icon : ArrowRight01Icon}
        size={14}
        className="text-gray-400 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-mono text-primary truncate">{status}</div>
        <div className="text-xs text-tertiary truncate">{description}</div>
      </div>
      <div className="text-xs font-mono tabular-nums text-secondary shrink-0">
        {formatCount(frequency)}
      </div>
    </div>
  )
}

// =============================================================================
// COMPONENT
// =============================================================================

export function NodeDetailSheet({ open, onOpenChange, node }: NodeDetailSheetProps) {
  if (!node) return null

  const { data } = node
  const transitions = getTransitionsForStatus(data.code)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />

        {/* Sheet Panel */}
        <Dialog.Popup className="bg-primary fixed right-0 top-0 z-50 h-full w-[440px] overflow-y-auto shadow-xl transition-transform duration-200 data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
          {/* Header */}
          <div className="border-secondary sticky top-0 flex items-center justify-between border-b bg-inherit px-6 py-4">
            <Dialog.Title className="text-primary text-lg font-semibold">
              Status Details
            </Dialog.Title>
            <Dialog.Close className="text-tertiary hover:text-primary hover:bg-secondary -mr-2 rounded-lg p-2 transition-colors">
              <HugeIcon icon={Cancel01Icon} size={20} />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Status Info */}
            <div className="bg-secondary mb-6 rounded-xl p-4">
              <div className="text-tertiary mb-2 text-xs font-medium uppercase tracking-wider">
                Status
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="text-primary text-lg font-semibold mb-1">
                    {data.label}
                  </div>
                  <div className="font-mono text-xs text-tertiary">
                    {data.code}
                  </div>
                </div>
                <Badge
                  color={data.badgeColor as BadgeColor}
                  size="sm"
                  shape="squircle"
                >
                  {getColumnLabel(data.subcategory)}
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-secondary rounded-lg p-3 text-center">
                <div className="text-xl font-semibold text-primary tabular-nums">
                  {formatCount(data.count)}
                </div>
                <div className="text-xs text-tertiary">Orders</div>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <div className="text-xl font-semibold text-primary tabular-nums">
                  {transitions.incoming.length}
                </div>
                <div className="text-xs text-tertiary">Incoming</div>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <div className="text-xl font-semibold text-primary tabular-nums">
                  {transitions.outgoing.length}
                </div>
                <div className="text-xs text-tertiary">Outgoing</div>
              </div>
            </div>

            {/* Incoming Transitions */}
            {transitions.incoming.length > 0 && (
              <div className="mb-6">
                <div className="text-tertiary mb-3 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                  <HugeIcon icon={ArrowLeft01Icon} size={14} />
                  Incoming Transitions ({transitions.incoming.length})
                </div>
                <div className="border border-secondary rounded-lg divide-y divide-secondary">
                  {transitions.incoming
                    .sort((a, b) => b.frequency - a.frequency)
                    .slice(0, 10)
                    .map(t => (
                      <TransitionRow
                        key={t.id}
                        status={t.fromStatus}
                        frequency={t.frequency}
                        description={t.condensed}
                        direction="incoming"
                      />
                    ))}
                  {transitions.incoming.length > 10 && (
                    <div className="px-3 py-2 text-xs text-tertiary text-center">
                      +{transitions.incoming.length - 10} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Outgoing Transitions */}
            {transitions.outgoing.length > 0 && (
              <div>
                <div className="text-tertiary mb-3 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                  <HugeIcon icon={ArrowRight01Icon} size={14} />
                  Outgoing Transitions ({transitions.outgoing.length})
                </div>
                <div className="border border-secondary rounded-lg divide-y divide-secondary">
                  {transitions.outgoing
                    .sort((a, b) => b.frequency - a.frequency)
                    .slice(0, 10)
                    .map(t => (
                      <TransitionRow
                        key={t.id}
                        status={t.toStatus}
                        frequency={t.frequency}
                        description={t.condensed}
                        direction="outgoing"
                      />
                    ))}
                  {transitions.outgoing.length > 10 && (
                    <div className="px-3 py-2 text-xs text-tertiary text-center">
                      +{transitions.outgoing.length - 10} more
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* End State Indicator */}
            {data.isEndState && (
              <div className="mt-6 p-3 bg-gray-100 rounded-lg">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400" />
                  This is a terminal/end state
                </div>
              </div>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
