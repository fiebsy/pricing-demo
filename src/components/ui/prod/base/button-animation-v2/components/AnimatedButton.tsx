/**
 * ButtonAnimation V2 - AnimatedButton Component
 *
 * Individual button with explicit state management and smooth animations.
 * Uses the formal state machine for predictable transitions.
 *
 * @module prod/base/button-animation-v2/components
 */

'use client'

import * as React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Button } from '@/components/ui/prod/base/button'

import {
  ButtonState,
  determineButtonState,
  getStateOpacity,
  getStateZIndex,
  getTransitionConfig,
  StateContext,
} from '../core/state-machine'
import { 
  AnimationPhaseManager, 
  useAnimationPhases 
} from '../core/animation-phases'
import { 
  usePositionCalculator,
  type LayoutContext,
} from '../core/position-calculator'
import { useStackContext, useLevelContext } from '../context'
import { SIZE_HEIGHT_CLASSES, getNumberLabel } from '../config'
import type { StackItem as StackItemType, ButtonVariant } from '../types'

// ============================================================================
// PROPS
// ============================================================================

export interface AnimatedButtonProps {
  /** Item data */
  item: StackItemType
  /** Index in sibling list */
  index: number
  /** Array of indices for numbering */
  levelIndices: number[]
  /** Sibling IDs for coordinated animations */
  siblingIds?: string[]
  /** Parent element ID */
  parentId?: string | null
  /** Callback when animation completes */
  onAnimationComplete?: (state: ButtonState) => void
}

// ============================================================================
// ANIMATED BUTTON COMPONENT
// ============================================================================

/**
 * Individual button with explicit state management.
 * Handles all animation states through the formal state machine.
 */
export function AnimatedButton({
  item,
  index,
  levelIndices,
  siblingIds = [],
  parentId = null,
  onAnimationComplete,
}: AnimatedButtonProps) {
  const {
    activePath,
    animationConfig,
    styleConfig,
    showNumbers,
    selectItem,
    collapseToLevel,
  } = useStackContext()
  
  const { level } = useLevelContext()
  const shouldReduceMotion = useReducedMotion() ?? false
  
  // Refs
  const buttonRef = useRef<HTMLDivElement>(null)
  const previousStateRef = useRef<ButtonState | null>(null)
  
  // Animation managers
  const phaseManager = useAnimationPhases()
  const positionCalculator = usePositionCalculator()
  
  // State
  const [currentState, setCurrentState] = useState<ButtonState>(() => {
    const context: StateContext = {
      itemId: item.id,
      level,
      hasChildren: Boolean(item.children?.length),
      activePath,
      parentIsAnchored: false,
      isRootAnchor: item.id === 'all' && level === 0,
    }
    return determineButtonState(context)
  })
  
  const [isAnimating, setIsAnimating] = useState(false)
  
  // ============================================================================
  // STATE DETERMINATION
  // ============================================================================
  
  useEffect(() => {
    const context: StateContext = {
      itemId: item.id,
      level,
      hasChildren: Boolean(item.children?.length),
      activePath,
      parentIsAnchored: activePath.length > level + 1,
      isRootAnchor: item.id === 'all' && level === 0,
    }
    
    const newState = determineButtonState(context)
    
    if (newState !== currentState) {
      handleStateTransition(currentState, newState)
    }
  }, [activePath, level, item.id])
  
  // ============================================================================
  // STATE TRANSITIONS
  // ============================================================================
  
  const handleStateTransition = useCallback((from: ButtonState, to: ButtonState) => {
    // Special handling for child to parent promotion
    if (from === ButtonState.CHILD_IDLE && to === ButtonState.PARENT_ACTIVE) {
      // This is the critical fix!
      handleChildToParentPromotion()
    } else {
      // Normal transition
      const transition = getTransitionConfig(from, to)
      if (transition) {
        setIsAnimating(true)
        phaseManager.createPhase(item.id, from, to, {
          level,
          index,
        })
        
        // Update state after a small delay to allow animation setup
        setTimeout(() => {
          previousStateRef.current = from
          setCurrentState(to)
        }, 50)
        
        // Clear animating flag after transition
        setTimeout(() => {
          setIsAnimating(false)
          onAnimationComplete?.(to)
        }, transition.duration)
      } else {
        // Immediate state change if no transition defined
        previousStateRef.current = from
        setCurrentState(to)
      }
    }
  }, [item.id, level, index])
  
  /**
   * Special handler for child to parent promotion.
   * This fixes the issue where children don't animate correctly when becoming parents.
   */
  const handleChildToParentPromotion = useCallback(() => {
    if (!buttonRef.current) return
    
    // Capture current position
    const rect = buttonRef.current.getBoundingClientRect()
    positionCalculator.updateElementBounds(item.id, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    })
    
    // Create promotion sequence
    const filteredSiblings = siblingIds.filter(id => id !== item.id)
    phaseManager.createPromotionSequence(item.id, parentId, filteredSiblings)
    
    // Start with activating state
    setIsAnimating(true)
    previousStateRef.current = ButtonState.CHILD_IDLE
    setCurrentState(ButtonState.CHILD_ACTIVATING)
    
    // Transition to parent active after delay
    setTimeout(() => {
      setCurrentState(ButtonState.PARENT_ACTIVE)
    }, 300)
    
    setTimeout(() => {
      setIsAnimating(false)
      onAnimationComplete?.(ButtonState.PARENT_ACTIVE)
    }, 500)
  }, [item.id, parentId, siblingIds])
  
  // ============================================================================
  // POSITION & STYLING
  // ============================================================================
  
  const layoutContext: LayoutContext = {
    state: currentState,
    level,
    depth: level + 1,
    activePathLength: activePath.length,
    styleConfig,
    siblingIndex: index,
    totalSiblings: siblingIds.length,
  }
  
  const positionConfig = positionCalculator.calculatePosition(item.id, layoutContext)
  const opacity = getStateOpacity(currentState, { anchoredOpacity: styleConfig.anchoredOpacity })
  const zIndex = getStateZIndex(currentState)
  
  // Determine button variant based on state
  const getVariant = (): ButtonVariant => {
    switch (currentState) {
      case ButtonState.ROOT_ANCHOR:
        return 'shine'
      case ButtonState.PARENT_ANCHORED:
      case ButtonState.PARENT_ANCHORING:
        return styleConfig.anchoredVariant
      case ButtonState.PARENT_ACTIVE:
      case ButtonState.PARENT_EXPANDING:
        return styleConfig.expandedVariant
      case ButtonState.CHILD_ACTIVE:
        return styleConfig.selectedVariant
      case ButtonState.CHILD_IDLE:
      case ButtonState.CHILD_ENTERING:
      case ButtonState.CHILD_ACTIVATING:
        return styleConfig.childVariant
      default:
        return styleConfig.collapsedVariant
    }
  }
  
  // ============================================================================
  // INTERACTION HANDLERS
  // ============================================================================
  
  const handleClick = useCallback(() => {
    if (isAnimating) return
    selectItem(level, item.id, Boolean(item.children?.length))
  }, [level, item.id, item.children, isAnimating])
  
  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (isAnimating) return
    collapseToLevel(level)
  }, [level, isAnimating])
  
  // ============================================================================
  // ANIMATION VARIANTS
  // ============================================================================
  
  const getAnimationVariants = () => {
    const transition = previousStateRef.current 
      ? getTransitionConfig(previousStateRef.current, currentState)
      : null
    
    return {
      initial: getInitialVariant(),
      animate: getAnimateVariant(),
      exit: getExitVariant(),
      transition: transition ? {
        duration: transition.duration / 1000,
        ease: transition.easing as any,
      } : undefined,
    }
  }
  
  const getInitialVariant = () => {
    if (shouldReduceMotion) return {}
    
    switch (currentState) {
      case ButtonState.CHILD_ENTERING:
        return {
          opacity: 0,
          y: animationConfig.entryDistance ?? 8,
          scale: 0.95,
        }
      case ButtonState.CHILD_ACTIVATING:
        // Start from current child position
        return {
          scale: 1,
          opacity: 1,
        }
      default:
        return {}
    }
  }
  
  const getAnimateVariant = () => {
    if (shouldReduceMotion) {
      return { opacity }
    }
    
    switch (currentState) {
      case ButtonState.CHILD_ACTIVATING:
        // Animate to parent position with scale effect
        return {
          scale: [1, 1.05, 1],
          opacity: 1,
          x: positionConfig.target.x - positionConfig.current.x,
          y: positionConfig.target.y - positionConfig.current.y,
        }
      case ButtonState.PARENT_ANCHORED:
      case ButtonState.PARENT_ANCHORING:
        return {
          opacity,
          x: positionConfig.offset.x,
        }
      default:
        return {
          opacity,
          x: 0,
          y: 0,
          scale: 1,
        }
    }
  }
  
  const getExitVariant = () => {
    if (shouldReduceMotion) {
      return { opacity: 0 }
    }
    
    return {
      opacity: 0,
      scale: 0.95,
      y: -(animationConfig.entryDistance ?? 8),
    }
  }
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  const heightClass = SIZE_HEIGHT_CLASSES[styleConfig.size]
  const variant = getVariant()
  const numberLabel = showNumbers ? getNumberLabel(levelIndices) : undefined
  const showRemove = currentState === ButtonState.PARENT_ACTIVE
  const variants = getAnimationVariants()
  
  // Debug info
  const debugInfo = process.env.NODE_ENV === 'development' ? {
    'data-state': currentState,
    'data-level': level,
    'data-id': item.id,
    'data-animating': isAnimating,
  } : {}
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={buttonRef}
        key={`${item.id}-${currentState}`}
        className={cn(
          positionConfig.isAbsolute ? 'absolute top-0' : 'inline-flex',
          isAnimating && 'pointer-events-none'
        )}
        style={{
          zIndex,
          ...(positionConfig.isAbsolute && { left: positionConfig.offset.x }),
        }}
        layout={!positionConfig.isAbsolute && currentState !== ButtonState.CHILD_ACTIVATING}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={variants.transition}
        {...debugInfo}
      >
        <Button
          variant={variant}
          size={styleConfig.size}
          roundness={styleConfig.roundness}
          className={cn(
            heightClass,
            positionConfig.isAbsolute && 'shadow-[4px_0_8px_-2px_rgba(0,0,0,0.3)]',
            isAnimating && 'transition-all'
          )}
          onClick={handleClick}
          disabled={isAnimating}
        >
          {numberLabel && (
            <span className="mr-1.5 font-mono text-xs opacity-50">{numberLabel}</span>
          )}
          <span className="select-none">{item.label}</span>
          {showRemove && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleRemove}
              className={cn(
                'ml-2 rounded-full p-0.5',
                'opacity-60 transition-opacity',
                'hover:opacity-100',
                'motion-reduce:transition-none'
              )}
              aria-label={`Remove ${item.label}`}
            >
              <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
            </span>
          )}
        </Button>
      </motion.div>
    </AnimatePresence>
  )
}