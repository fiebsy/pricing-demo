/**
 * Stage Controls Component
 *
 * Two numbered buttons for switching between coin-stack stages.
 * Positioned at the bottom of the preview area above the preset showcase.
 */

'use client'

import { cn } from '@/lib/utils'
import type { StageId } from '../config/types'
import { STAGE_IDS } from '../config/stages'

interface StageControlsProps {
  activeStage: StageId
  onStageChange: (stageId: StageId) => void
}

export function StageControls({ activeStage, onStageChange }: StageControlsProps) {
  return (
    <div className="fixed bottom-24 left-[var(--playground-left)] right-[var(--playground-right)] flex justify-center pointer-events-none">
      <div className="flex items-center gap-1 rounded-full bg-secondary/80 p-1 backdrop-blur-sm pointer-events-auto">
        {STAGE_IDS.map((stageId) => (
          <button
            key={stageId}
            onClick={() => onStageChange(stageId)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all',
              activeStage === stageId
                ? 'bg-primary text-primary shadow-sm'
                : 'text-secondary hover:bg-tertiary hover:text-primary'
            )}
          >
            {stageId}
          </button>
        ))}
      </div>
    </div>
  )
}
