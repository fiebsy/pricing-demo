'use client'

/**
 * Playground Debug Controls
 *
 * Debug controls for animation speed and debug outlines.
 * Buttons with press scale effect and labels.
 */

import { cn } from '../utils'
import { HugeIcon } from '../primitives/icon'
import Bug02Icon from '@hugeicons-pro/core-stroke-rounded/Bug02Icon'
import ViewIcon from '@hugeicons-pro/core-stroke-rounded/ViewIcon'
import { TurtleIcon } from '../primitives/custom-icons'

export interface PlaygroundDebugControlsProps {
  slowMo: boolean
  onSlowMoChange: (enabled: boolean) => void
  showDebug: boolean
  onShowDebugChange: (enabled: boolean) => void
  /** Auto-open expanded state */
  autoOpen?: boolean
  onAutoOpenChange?: (enabled: boolean) => void
  /** Additional class names */
  className?: string
}

const buttonStyles = cn(
  'pointer-events-auto',
  'flex h-11 w-11 items-center justify-center rounded-full',
  'cursor-pointer',
  'transition-all duration-150 ease-out',
  'motion-reduce:transition-none motion-reduce:transform-none',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
)

export function PlaygroundDebugControls({
  slowMo,
  onSlowMoChange,
  showDebug,
  onShowDebugChange,
  autoOpen,
  onAutoOpenChange,
  className,
}: PlaygroundDebugControlsProps) {
  return (
    <div className={cn('pointer-events-auto flex items-center gap-3', className)}>
      {/* Auto Open */}
      {onAutoOpenChange && (
        <div
          className={cn(
            'group flex flex-col items-center gap-1.5',
            'transition-all duration-150 ease-out',
            autoOpen ? 'scale-90' : 'opacity-40 hover:opacity-100'
          )}
        >
          <button
            type="button"
            role="switch"
            aria-checked={autoOpen}
            aria-label={autoOpen ? 'Auto open enabled' : 'Auto open disabled'}
            onClick={() => onAutoOpenChange(!autoOpen)}
            className={cn(
              buttonStyles,
              'hover:bg-tertiary',
              autoOpen && 'bg-tertiary shine-3'
            )}
          >
            <HugeIcon
              icon={ViewIcon}
              size={22}
              className={cn(
                'transition-colors duration-150',
                autoOpen ? 'text-primary' : 'text-quaternary'
              )}
            />
          </button>
          <span
            className={cn(
              'text-[10px] font-medium tracking-wide transition-opacity duration-150',
              'text-quaternary opacity-0 group-hover:opacity-100'
            )}
          >
            Open
          </span>
        </div>
      )}

      {/* Slow Motion */}
      <div
        className={cn(
          'group flex flex-col items-center gap-1.5',
          'transition-all duration-150 ease-out',
          slowMo ? 'scale-90' : 'opacity-40 hover:opacity-100'
        )}
      >
        <button
          type="button"
          role="switch"
          aria-checked={slowMo}
          aria-label={slowMo ? 'Slow motion enabled' : 'Normal speed'}
          onClick={() => onSlowMoChange(!slowMo)}
          className={cn(
            buttonStyles,
            'hover:bg-tertiary',
            slowMo && 'bg-tertiary shine-3'
          )}
        >
          <TurtleIcon
            size={22}
            className={cn(
              'transition-colors duration-150',
              slowMo ? 'text-primary' : 'text-quaternary'
            )}
          />
        </button>
        <span
          className={cn(
            'text-[10px] font-medium tracking-wide transition-opacity duration-150',
            'text-quaternary opacity-0 group-hover:opacity-100'
          )}
        >
          Slow
        </span>
      </div>

      {/* Debug Outlines */}
      <div
        className={cn(
          'group flex flex-col items-center gap-1.5',
          'transition-all duration-150 ease-out',
          showDebug ? 'scale-90' : 'opacity-40 hover:opacity-100'
        )}
      >
        <button
          type="button"
          role="switch"
          aria-checked={showDebug}
          aria-label={showDebug ? 'Debug outlines enabled' : 'Debug outlines disabled'}
          onClick={() => onShowDebugChange(!showDebug)}
          className={cn(
            buttonStyles,
            'hover:bg-tertiary',
            showDebug && 'bg-tertiary shine-3'
          )}
        >
          <HugeIcon
            icon={Bug02Icon}
            size={22}
            className={cn(
              'transition-colors duration-150',
              showDebug ? 'text-primary' : 'text-quaternary'
            )}
          />
        </button>
        <span
          className={cn(
            'text-[10px] font-medium tracking-wide transition-opacity duration-150',
            'text-quaternary opacity-0 group-hover:opacity-100'
          )}
        >
          Debug
        </span>
      </div>
    </div>
  )
}
