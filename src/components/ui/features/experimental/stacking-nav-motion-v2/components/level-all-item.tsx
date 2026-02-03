/**
 * StackingNav V2 - Level All Item Component
 *
 * The visual button for Level-All (virtual "All" at child levels).
 *
 * @module features/stacking-nav-v2/components
 */

'use client'

import * as React from 'react'
import { Button } from '@/components/ui/core/primitives/button'
import { cn } from '@/lib/utils'

import { useStackContext, useLevelContext } from '../context'
import { HEIGHT_CLASSES, getLevelFromLevelAllId } from '../config'

interface LevelAllItemProps {
  levelAllId: string
  isActive: boolean
}

/**
 * Level-All button component.
 * Shown at L1+ when no specific child is selected.
 */
export const LevelAllItem = React.memo(function LevelAllItem({
  levelAllId,
  isActive,
}: LevelAllItemProps) {
  const { styleConfig, collapseToLevel, showDebug } = useStackContext()
  const { level } = useLevelContext()

  // Handle click - collapse to parent level
  const handleClick = React.useCallback(() => {
    // Level-All at L1 collapses to L0, etc.
    collapseToLevel(level)
  }, [level, collapseToLevel])

  // Determine variant based on active state
  const variant = isActive
    ? styleConfig.levelAllActiveVariant
    : styleConfig.levelAllInactiveVariant

  // Height class for consistent sizing
  const heightClass = HEIGHT_CLASSES[styleConfig.buttonSize]

  // Get level number from ID for debug
  const levelNum = getLevelFromLevelAllId(levelAllId)

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={styleConfig.buttonSize}
        roundness={styleConfig.buttonRoundness}
        onClick={handleClick}
        className={cn(
          'relative',
          'transition-[background-color,border-color,color,box-shadow,opacity] duration-150',
          heightClass
        )}
        // Active state for tab variant underline
        data-active={isActive || undefined}
        data-item-id={levelAllId}
        data-item-level={level}
        data-item-state={isActive ? 'active' : 'inactive'}
      >
        <span className="select-none">{styleConfig.levelAllLabel}</span>
      </Button>

      {/* Debug badge */}
      {showDebug && (
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 flex -translate-x-1/2 flex-col items-center">
          <div
            className={cn(
              'rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-semibold shadow-sm',
              isActive
                ? 'border-green-600 bg-green-500 text-white'
                : 'border-gray-400 bg-gray-300 text-gray-700'
            )}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span>{isActive ? 'ALL-ACTIVE' : 'ALL'}</span>
              <span className="text-[8px] opacity-80">L{levelNum}</span>
            </div>
          </div>
          {/* Arrow */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-2 w-px',
                isActive ? 'bg-green-500/60' : 'bg-gray-400/60'
              )}
            />
            <div
              className={cn(
                'h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent',
                isActive ? 'border-t-green-500/60' : 'border-t-gray-400/60'
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
})
