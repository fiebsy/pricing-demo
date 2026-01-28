/**
 * ButtonAnimation V3 - Animated Item Component
 *
 * Individual button with state-aware animations.
 * Uses Button's iconTrailing prop for proper spacing.
 *
 * @module prod/base/button-animation-v3/components
 */

'use client'

import * as React from 'react'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Button } from '@/components/ui/prod/base/button'
import { cn } from '@/lib/utils'

import { useStackContext, useLevelContext } from '../context'
import { getNumberLabel, ROOT_ANCHOR_ID } from '../config'
import type { StackItem } from '../types'

// =============================================================================
// REMOVE BUTTON COMPONENT
// =============================================================================

interface RemoveButtonProps {
  label: string
  onRemove: () => void
}

function RemoveButton({ label, onRemove }: RemoveButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onRemove()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      onRemove()
    }
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'rounded-full p-0.5',
        'opacity-60 transition-opacity',
        'hover:opacity-100',
        'focus-visible:opacity-100',
        'motion-reduce:transition-none'
      )}
      aria-label={`Remove ${label}`}
    >
      <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
    </span>
  )
}

// =============================================================================
// ANIMATED ITEM COMPONENT
// =============================================================================

interface AnimatedItemProps {
  item: StackItem
  index: number
  levelIndices: number[]
  isAnchored: boolean
  isPromoting?: boolean
}

/**
 * Individual button component.
 * Uses Button's iconTrailing for proper alignment.
 */
export const AnimatedItem = React.memo(function AnimatedItem({
  item,
  levelIndices,
  isAnchored,
  isPromoting = false,
}: AnimatedItemProps) {
  const {
    activePath,
    styleConfig,
    showNumbers,
    selectItem,
    collapseToLevel,
  } = useStackContext()
  
  const { level } = useLevelContext()
  
  const hasChildren = Boolean(item.children?.length)
  
  // Determine item state (matching V2 logic)
  const isInActivePath = activePath[level] === item.id
  const isExpanded = isInActivePath && hasChildren && !isAnchored
  const isSelected = isInActivePath && !hasChildren
  const isChildItem = level > 0 && !isInActivePath
  const isRootAnchor = level === 0 && item.id === ROOT_ANCHOR_ID
  
  // Determine variant (matching V2 exactly)
  let variant: 'primary' | 'secondary' | 'tertiary' | 'shine' | 'link-gray' | 'link-color' = 'tertiary'
  if (isRootAnchor && !isAnchored) {
    variant = 'shine'
  } else if (isAnchored) {
    variant = styleConfig.anchoredVariant
  } else if (isExpanded) {
    variant = styleConfig.expandedVariant
  } else if (isSelected) {
    variant = styleConfig.expandedVariant
  } else if (isChildItem) {
    variant = styleConfig.childVariant
  }

  // Handle click
  const handleSelect = React.useCallback(() => {
    if (!isAnchored) {
      selectItem(level, item.id, hasChildren)
    }
  }, [isAnchored, level, item.id, hasChildren, selectItem])

  // Handle remove
  const handleRemove = React.useCallback(() => {
    collapseToLevel(level)
  }, [level, collapseToLevel])

  // Number label
  const numberLabel = showNumbers ? getNumberLabel(levelIndices) : undefined
  
  // Trailing element (close button for expanded items)
  const trailingElement = isExpanded ? (
    <RemoveButton label={item.label} onRemove={handleRemove} />
  ) : undefined

  // Shadow for anchored items
  const anchoredShadow = isAnchored
    ? 'shadow-[4px_0_8px_-2px_rgba(0,0,0,0.3)]'
    : ''
  
  // Scale for promoting items
  const scale = isPromoting ? 1.05 : 1
  
  // Height class for consistent sizing
  const heightClass = 'h-10' // md size

  return (
    <Button
      variant={variant}
      size="md"
      roundness="default"
      iconTrailing={trailingElement}
      onClick={handleSelect}
      disabled={isAnchored}
      className={cn(
        'relative transition-all duration-300',
        heightClass,
        anchoredShadow,
        isAnchored && 'pointer-events-none'
      )}
      style={{
        opacity: isAnchored ? styleConfig.anchoredOpacity : 1,
        transform: `scale(${scale})`,
      }}
    >
      {numberLabel && (
        <span className="mr-1.5 font-mono text-xs opacity-50">{numberLabel}</span>
      )}
      <span className="select-none">{item.label}</span>
    </Button>
  )
})