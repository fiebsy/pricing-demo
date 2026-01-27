'use client'

import type { ProgressConfig } from '../config/types'

interface ProgressBarProps {
  current: number
  total: number
  config: ProgressConfig
}

export function ProgressBar(props: ProgressBarProps) {
  const percentage = (props.current / props.total) * 100
  return (
    <div className="w-full h-1 bg-tertiary/20 rounded">
      <div className="h-full bg-brand-primary rounded" style={{ width: `${percentage}%` }} />
    </div>
  )
}