'use client'

import type { ActionButtonsConfig } from '../config/types'

interface ActionButtonsProps {
  onSwipe: (direction: 'left' | 'right') => void
  config: ActionButtonsConfig
}

export function ActionButtons(props: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button onClick={() => props.onSwipe('left')} className="p-4 bg-secondary rounded-full">Left</button>
      <button onClick={() => props.onSwipe('right')} className="p-4 bg-secondary rounded-full">Right</button>
    </div>
  )
}