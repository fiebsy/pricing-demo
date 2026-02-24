/**
 * Flow Controls Component
 *
 * Toggle buttons for switching between Flow 1 and Flow 2.
 * Positioned at the bottom of the preview area.
 */

'use client'

import { cn } from '@/lib/utils'
import type { FlowId } from '../config/types'

const FLOW_IDS: FlowId[] = ['flow-a', 'flow-b', 'flow-c']

const FLOW_LABELS: Record<FlowId, string> = {
  'flow-a': 'Flow A',
  'flow-b': 'Flow B',
  'flow-c': 'Flow C',
}

interface FlowControlsProps {
  activeFlow: FlowId
  onFlowChange: (flowId: FlowId) => void
}

export function FlowControls({ activeFlow, onFlowChange }: FlowControlsProps) {
  return (
    <div className="fixed bottom-8 left-[var(--playground-left)] right-[var(--playground-right)] flex justify-center pointer-events-none">
      <div className="flex items-center gap-1 rounded-full bg-secondary/80 p-1 backdrop-blur-sm pointer-events-auto">
        {FLOW_IDS.map((flowId) => (
          <button
            key={flowId}
            onClick={() => onFlowChange(flowId)}
            className={cn(
              'flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium transition-all',
              activeFlow === flowId
                ? 'bg-primary text-primary shadow-sm'
                : 'text-secondary hover:bg-tertiary hover:text-primary'
            )}
          >
            {FLOW_LABELS[flowId]}
          </button>
        ))}
      </div>
    </div>
  )
}
