'use client'

import type { FlowOptionsConfig } from '../config/types'

export type FlowType = 'quick-fix' | 'add-to-mind' | 'manual-fix'

interface FlowSelectorProps {
  onSelect: (flow: FlowType) => void
  config: FlowOptionsConfig
  selectedFlow: FlowType | null
}

export function FlowSelector(props: FlowSelectorProps) {
  const flows: FlowType[] = ['quick-fix', 'add-to-mind', 'manual-fix']
  
  return (
    <div className="flex flex-col gap-3">
      {flows.map((flow) => (
        <button
          key={flow}
          onClick={() => props.onSelect(flow)}
          className={`p-4 rounded-lg border ${
            props.selectedFlow === flow ? 'border-brand-primary bg-brand-primary/10' : 'border-secondary bg-secondary'
          }`}
        >
          {flow}
        </button>
      ))}
    </div>
  )
}