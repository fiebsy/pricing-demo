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
  const heightClass = 'h-10' // md size

  return (
    <div className="relative">
      <Button
        variant={variant}
        size="md"
        roundness="default"
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
      
      {/* Debug Status Badge */}
      {(showNumbers || showDebug) && (
        <div className="absolute -top-2 -right-2 pointer-events-none">
          <div className={cn(
            'px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border shadow-sm',
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
        </div>
      )}
      
      {/* Position Debug Info */}
      {showDebug && (
        <div className="absolute -bottom-6 left-0 pointer-events-none">
          <div className="px-1 py-0.5 bg-black/80 text-white text-[8px] font-mono rounded whitespace-nowrap">
            {levelAllId}
          </div>
        </div>
      )}
    </div>
  )
})
