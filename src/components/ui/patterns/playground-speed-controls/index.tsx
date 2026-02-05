/**
 * Playground Speed Controls
 *
 * Debug control for animation speed.
 * Toggle with turtle icon that slides along track.
 * Matches control panel toggle style, scaled up.
 */

'use client'

import { cn } from '@/lib/utils'
import { TurtleIcon } from '@/components/ui/core/primitives/custom-icons'

export interface PlaygroundSpeedControlsProps {
  slowMo: boolean
  onSlowMoChange: (enabled: boolean) => void
  /** Additional class names */
  className?: string
}

export function PlaygroundSpeedControls({
  slowMo,
  onSlowMoChange,
  className,
}: PlaygroundSpeedControlsProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={slowMo}
      aria-label={slowMo ? 'Slow motion enabled' : 'Normal speed'}
      onClick={() => onSlowMoChange(!slowMo)}
      className={cn(
        'pointer-events-auto',
        'flex h-12 w-[88px] items-center rounded-full p-1.5',
        'transition-colors duration-150',
        'motion-reduce:transition-none',
        slowMo ? 'bg-fg-tertiary/80 shine-2-subtle' : 'bg-quaternary shine-2-subtle',
        className
      )}
    >
      {/* Thumb with turtle */}
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full',
          'bg-primary/80 shine-2-subtle',
          'transition-transform duration-150 ease-out',
          'motion-reduce:transition-none',
          slowMo && 'translate-x-10'
        )}
      >
        <TurtleIcon
          size={20}
          className={cn(
            'transition-colors duration-150',
            slowMo ? 'text-secondary' : 'text-quaternary/50'
          )}
        />
      </span>
    </button>
  )
}
