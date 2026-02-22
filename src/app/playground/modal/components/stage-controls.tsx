/**
 * Stage Controls Component
 *
 * 4 numbered buttons for switching between modal stages.
 * Positioned at the bottom of the preview area.
 */

'use client'

import { cn } from '@/lib/utils'
import type { StageConfig } from '../config/types'

interface StageControlsProps {
  stages: StageConfig[]
  activeStage: 1 | 2 | 3 | 4
  onStageChange: (stageId: 1 | 2 | 3 | 4) => void
}

export function StageControls({ stages, activeStage, onStageChange }: StageControlsProps) {
  return (
    <div className="fixed bottom-8 left-[var(--playground-left)] right-[var(--playground-right)] flex justify-center pointer-events-none">
      <div className="flex items-center gap-1 rounded-full bg-secondary/80 p-1 backdrop-blur-sm pointer-events-auto">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => onStageChange(stage.id)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all',
              activeStage === stage.id
                ? 'bg-primary text-primary shadow-sm'
                : 'text-secondary hover:bg-tertiary hover:text-primary'
            )}
          >
            {stage.id}
          </button>
        ))}
      </div>
    </div>
  )
}
