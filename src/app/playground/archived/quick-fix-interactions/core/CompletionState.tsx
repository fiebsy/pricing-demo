'use client'

import type { CompletionConfig } from '../config/types'

interface CompletionStateProps {
  onContinue: () => void
  bullets: string[]
  config: CompletionConfig
}

export function CompletionState(props: CompletionStateProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold">Complete!</h2>
      <ul className="space-y-2">
        {props.bullets.map((bullet, i) => (
          <li key={i} className="text-sm text-secondary">{bullet}</li>
        ))}
      </ul>
      <button onClick={props.onContinue} className="px-4 py-2 bg-brand-primary text-white rounded">
        Continue
      </button>
    </div>
  )
}