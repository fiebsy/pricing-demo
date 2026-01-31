/**
 * StackingNav - Level All Item Component
 *
 * A special "All" button that appears at each child level (L1+).
 * When active, indicates "show all items in this category".
 * When clicked, clears any deeper selection.
 *
 * KEY BEHAVIOR:
 * - No entry/exit animations - appears instantly with siblings
 * - Active when no specific child is selected at this level
 * - Inactive when user has drilled down to a specific child
 *
 * @module features/stacking-nav/components
 */

'use client'

import * as React from 'react'
import { Button } from '@/components/ui/core/primitives/button'
import { cn } from '@/lib/utils'

import { useStackContext, useLevelContext } from '../context'
import { HEIGHT_CLASSES } from '../config'

// =============================================================================
// LEVEL ALL ITEM COMPONENT
// =============================================================================

interface LevelAllItemProps {
  /** The generated ID for this level-all button */
  levelAllId: string
  /** Whether this level-all is currently active (no child selected) */
  isActive: boolean
}

/**
 * Level-All button component.
 * Shows "All" option at each child level with active/inactive styling.
 */
export const LevelAllItem = React.memo(function LevelAllItem({
  levelAllId,
  isActive,
}: LevelAllItemProps) {
  const {
    styleConfig,
    showNumbers,
    showDebug,
    collapseToLevel,
  } = useStackContext()
  
  const { level } = useLevelContext()
  
  // Determine variant based on active state
  const variant = isActive 
    ? styleConfig.levelAllActiveVariant 
    : styleConfig.levelAllInactiveVariant

  // Handle click - collapse to parent level (clear this level's selection)
  const handleClick = React.useCallback(() => {
    // Collapse to one level up, which clears any selection at this level
    // This effectively shows "all" children without drilling into one
    collapseToLevel(level)
  }, [level, collapseToLevel])

  // Height class for consistent sizing
  const heightClass = HEIGHT_CLASSES[styleConfig.buttonSize]

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={styleConfig.buttonSize}
        roundness={styleConfig.buttonRoundness}
        onClick={handleClick}
        className={cn(
          'relative',
          heightClass,
          // No transition for level-all - instant state changes
        )}
        // Active state for tab variant underline
        data-active={isActive || undefined}
        // Debug data attributes
        data-item-id={levelAllId}
        data-item-label={styleConfig.levelAllLabel}
        data-item-level={level}
        data-item-state={isActive ? 'level-all-active' : 'level-all-inactive'}
        data-level-all="true"
      >
        <span className="select-none">{styleConfig.levelAllLabel}</span>
      </Button>
      
      {/* Debug Status Badge - Above with arrow pointing down */}
      {(showNumbers || showDebug) && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 pointer-events-none flex flex-col items-center">
          {/* Badge */}
          <div className={cn(
            'px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border shadow-sm whitespace-nowrap',
            isActive 
              ? 'bg-teal-500 text-white border-teal-600'
              : 'bg-gray-400 text-white border-gray-500'
          )}>
            <div className="flex flex-col items-center gap-0.5">
              <div>
                {isActive ? 'ALL-ACTIVE' : 'ALL'}
              </div>
              <div className="text-[8px] opacity-80">
                L{level}
              </div>
            </div>
          </div>
          {/* Arrow and line pointing down */}
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-px h-3',
              isActive ? 'bg-teal-500/20' : 'bg-gray-400/20'
            )} />
            <div className={cn(
              'w-2 h-2 rounded-full',
              isActive ? 'bg-teal-500/20' : 'bg-gray-400/20'
            )} />
          </div>
        </div>
      )}
      
      {/* Position Debug Info - Below with arrow pointing up */}
      {showDebug && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 pointer-events-none flex flex-col items-center">
          {/* Arrow pointing up */}
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-black/15" />
            <div className="w-px h-2 bg-black/15" />
          </div>
          {/* ID label */}
          <div className="px-1 py-0.5 bg-black/80 text-white text-[8px] font-mono rounded whitespace-nowrap">
            {levelAllId}
          </div>
        </div>
      )}
    </div>
  )
})
