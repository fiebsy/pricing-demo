/**
 * ButtonAnimation V2 - Enhanced Stack Item Component
 *
 * Improved version of stack item with better child-to-parent animation.
 * Minimal changes to fix the core animation issue.
 *
 * @module prod/base/button-animation-v2/components
 */

'use client'

import * as React from 'react'
import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Button } from '@/components/ui/prod/base/button'

import { useStackContext, useLevelContext } from '../context'
import { SIZE_HEIGHT_CLASSES, getNumberLabel, ROOT_ANCHOR_ID } from '../config'
import type { StackItem as StackItemType, ButtonVariant } from '../types'

// ============================================================================
// REMOVE BUTTON
// ============================================================================

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
        'focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1',
        'motion-reduce:transition-none'
      )}
      aria-label={`Remove ${label}`}
    >
      <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
    </span>
  )
}

// ============================================================================
// ENHANCED STACK ITEM COMPONENT
// ============================================================================

export interface EnhancedStackItemProps {
  item: StackItemType
  /** Index in the current level's item list */
  index: number
  /** Array of indices leading to this item (for numbering) */
  levelIndices: number[]
  /** Whether this item is rendered as an anchored (peek-behind) item */
  isAnchored?: boolean
  /** Whether this item is transitioning from child to parent */
  isPromoting?: boolean
  /** Callback when item is selected */
  onSelect?: () => void
}

/**
 * Enhanced stack item with improved animation support.
 * Fixes the child-to-parent transition issue.
 */
export function EnhancedStackItem({
  item,
  index,
  levelIndices,
  isAnchored = false,
  isPromoting = false,
  onSelect,
}: EnhancedStackItemProps) {
  const {
    activePath,
    styleConfig,
    showNumbers,
    selectItem,
    collapseToLevel,
  } = useStackContext()

  const { level } = useLevelContext()
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const hasChildren = Boolean(item.children?.length)

  // Determine item state
  const isInActivePath = activePath[level] === item.id
  const isExpanded = isInActivePath && hasChildren && !isAnchored
  const isSelected = isInActivePath && !hasChildren
  const isChildItem = level > 0 && !isInActivePath
  const isRootAnchor = level === 0 && item.id === ROOT_ANCHOR_ID

  // Track if this was previously a child becoming active
  const wasChildRef = useRef(isChildItem)
  const isBecomingParent = wasChildRef.current && isExpanded
  
  useEffect(() => {
    wasChildRef.current = isChildItem
  }, [isChildItem])

  // Determine variant
  let variant: ButtonVariant = styleConfig.collapsedVariant
  if (isRootAnchor && !isAnchored) {
    variant = 'shine'
  } else if (isAnchored) {
    variant = styleConfig.anchoredVariant
  } else if (isExpanded) {
    variant = styleConfig.expandedVariant
  } else if (isSelected) {
    variant = styleConfig.selectedVariant
  } else if (isChildItem) {
    variant = styleConfig.childVariant
  }

  const heightClass = SIZE_HEIGHT_CLASSES[styleConfig.size]

  const handleSelect = () => {
    // Add a small scale animation when child becomes parent
    if (isChildItem && hasChildren && buttonRef.current) {
      buttonRef.current.style.transform = 'scale(1.05)'
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = ''
        }
      }, 200)
    }
    
    selectItem(level, item.id, hasChildren)
    onSelect?.()
  }

  const handleRemove = () => {
    collapseToLevel(level)
  }

  // Number label
  const numberLabel = showNumbers ? getNumberLabel(levelIndices) : undefined

  const trailingElement =
    isExpanded ? (
      <RemoveButton label={item.label} onRemove={handleRemove} />
    ) : undefined

  // Shadow for anchored items
  const anchoredShadow = isAnchored
    ? 'shadow-[4px_0_8px_-2px_rgba(0,0,0,0.3)]'
    : ''

  // Add transition class for smooth child-to-parent animation
  const transitionClass = isBecomingParent || isPromoting
    ? 'transition-all duration-300 ease-out'
    : ''

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={styleConfig.size}
      roundness={styleConfig.roundness}
      iconTrailing={trailingElement}
      className={cn(
        heightClass, 
        anchoredShadow,
        transitionClass,
        isBecomingParent && 'animate-pulse-once'
      )}
      onClick={handleSelect}
    >
      {numberLabel && (
        <span className="mr-1.5 font-mono text-xs opacity-50">{numberLabel}</span>
      )}
      <span className="select-none">{item.label}</span>
    </Button>
  )
}