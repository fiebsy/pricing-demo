/**
 * ButtonAnimation V2 - Position Calculator
 *
 * Calculates positions and offsets for button animations.
 * Centralizes layout logic for consistent positioning across states.
 *
 * @module prod/base/button-animation-v2/core
 */

import { ButtonState } from './state-machine'
import type { StyleConfig, OffsetTarget } from '../types'

// ============================================================================
// POSITION TYPES
// ============================================================================

/**
 * Represents a position in 2D space.
 */
export interface Position {
  x: number
  y: number
}

/**
 * Represents a bounding box.
 */
export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Animation position configuration.
 */
export interface PositionConfig {
  /** Current position */
  current: Position
  /** Target position */
  target: Position
  /** Offset to apply */
  offset: Position
  /** Z-index layer */
  zIndex: number
  /** Whether position is absolute */
  isAbsolute: boolean
}

/**
 * Layout context for position calculations.
 */
export interface LayoutContext {
  /** Button state */
  state: ButtonState
  /** Nesting level */
  level: number
  /** Item depth in tree */
  depth: number
  /** Active path length */
  activePathLength: number
  /** Style configuration */
  styleConfig: StyleConfig
  /** Parent bounding box (if anchored) */
  parentBox?: BoundingBox
  /** Sibling index */
  siblingIndex?: number
  /** Total siblings */
  totalSiblings?: number
  /** Position in anchor stack (for anchored items) */
  anchorIndex?: number
  /** Total number of anchored ancestors */
  anchoredCount?: number
}

// ============================================================================
// POSITION CALCULATOR CLASS
// ============================================================================

/**
 * Calculates positions for button animations.
 */
export class PositionCalculator {
  private cache: Map<string, PositionConfig> = new Map()
  private elementBounds: Map<string, BoundingBox> = new Map()
  
  /**
   * Calculates position configuration for a button.
   */
  calculatePosition(
    elementId: string,
    context: LayoutContext
  ): PositionConfig {
    const cacheKey = this.getCacheKey(elementId, context)
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }
    
    // Calculate new position
    const config = this.computePosition(elementId, context)
    this.cache.set(cacheKey, config)
    
    return config
  }
  
  /**
   * Computes position based on state and context.
   */
  private computePosition(
    elementId: string,
    context: LayoutContext
  ): PositionConfig {
    const { state, styleConfig } = context
    
    // Base configuration
    const config: PositionConfig = {
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
      zIndex: this.getZIndexForState(state, context.level),
      isAbsolute: this.isAbsolutePosition(state),
    }
    
    // Calculate based on state
    switch (state) {
      case ButtonState.PARENT_ANCHORED:
      case ButtonState.PARENT_ANCHORING:
        config.offset = this.calculateAnchoredOffset(context)
        config.isAbsolute = true
        break
        
      case ButtonState.CHILD_ACTIVATING:
        // Critical: Calculate transition from child to parent position
        config.current = this.getChildPosition(context)
        config.target = this.getParentPosition(context)
        break
        
      case ButtonState.CHILD_IDLE:
      case ButtonState.CHILD_ENTERING:
        config.offset = this.calculateChildOffset(context)
        break
        
      case ButtonState.CHILD_EXITING:
        config.offset = this.calculateExitOffset(context)
        break
        
      default:
        // Default positioning
        break
    }
    
    return config
  }
  
  /**
   * Calculates the peek-behind offset for anchored items.
   * Fixed: Now correctly uses position in active path for progressive stacking.
   */
  private calculateAnchoredOffset(context: LayoutContext): Position {
    const { styleConfig } = context
    const { offsetTarget, peekOffset } = styleConfig
    
    // Get the anchored item's position in the anchor stack
    // This should be passed in the context, but we'll calculate it based on level
    const anchorStackPosition = context.anchorIndex ?? context.level
    
    if (offsetTarget === 'incoming') {
      // Progressive stacking: each anchored item moves further right
      // The first anchored item (All button) is at peekOffset * 1
      // The second anchored item is at peekOffset * 2, etc.
      return {
        x: peekOffset * (anchorStackPosition + 1),
        y: 0,
      }
    }
    
    // Original behavior: anchored items shift left (negative offset)
    // Each level deeper gets a more negative offset
    return {
      x: peekOffset * (anchorStackPosition + 1),
      y: 0,
    }
  }
  
  /**
   * Calculates offset for child items.
   * Fixed: Now correctly positions children after all anchored ancestors.
   */
  private calculateChildOffset(context: LayoutContext): Position {
    const { styleConfig, anchoredCount = 0, siblingIndex = 0 } = context
    const { offsetTarget, peekOffset } = styleConfig
    
    // First child should be positioned after all anchored items
    // Only the first child needs absolute positioning with offset
    const isFirstChild = siblingIndex === 0
    
    if (offsetTarget === 'incoming' && isFirstChild && context.level > 0) {
      // Position after all anchored ancestors
      // anchoredCount tells us how many items are in the anchor stack
      return {
        x: peekOffset * anchoredCount,
        y: 0,
      }
    }
    
    // Other children flow naturally (no offset needed)
    return {
      x: 0,
      y: 0,
    }
  }
  
  /**
   * Calculates exit animation offset.
   */
  private calculateExitOffset(context: LayoutContext): Position {
    // Exit offset is not part of styleConfig, it's animation-related
    // We'll use a default value here
    return {
      x: 8,
      y: 0,
    }
  }
  
  /**
   * Gets the child position for promotion animation.
   */
  private getChildPosition(context: LayoutContext): Position {
    const { siblingIndex = 0, styleConfig } = context
    const bounds = this.elementBounds.get(`child-${context.level}-${siblingIndex}`)
    
    if (bounds) {
      return { x: bounds.x, y: bounds.y }
    }
    
    // Estimate based on typical layout
    return {
      x: siblingIndex * 100 + (styleConfig.childGap * siblingIndex),
      y: 0,
    }
  }
  
  /**
   * Gets the parent position for promotion animation.
   */
  private getParentPosition(context: LayoutContext): Position {
    const { parentBox } = context
    
    if (parentBox) {
      return { x: parentBox.x, y: parentBox.y }
    }
    
    // Default parent position
    return { x: 0, y: 0 }
  }
  
  /**
   * Determines z-index based on state and level.
   */
  private getZIndexForState(state: ButtonState, level: number): number {
    // Base z-index by state type
    const baseZ = (() => {
      switch (state) {
        case ButtonState.PARENT_ANCHORED:
        case ButtonState.PARENT_ANCHORING:
        case ButtonState.PARENT_UNANCHORING:
          return 10
        case ButtonState.CHILD_ACTIVATING:
        case ButtonState.PARENT_ACTIVE:
        case ButtonState.CHILD_IDLE:
        case ButtonState.CHILD_ACTIVE:
          return 100
        case ButtonState.CHILD_ENTERING:
        case ButtonState.CHILD_EXITING:
        case ButtonState.PARENT_EXPANDING:
        case ButtonState.PARENT_COLLAPSING:
          return 50
        default:
          return 0
      }
    })()
    
    // Add level offset for proper stacking
    return baseZ + level
  }
  
  /**
   * Determines if position should be absolute.
   */
  private isAbsolutePosition(state: ButtonState): boolean {
    return [
      ButtonState.PARENT_ANCHORED,
      ButtonState.PARENT_ANCHORING,
      ButtonState.PARENT_UNANCHORING,
    ].includes(state)
  }
  
  /**
   * Updates element bounds for accurate position calculations.
   */
  updateElementBounds(elementId: string, bounds: BoundingBox): void {
    this.elementBounds.set(elementId, bounds)
  }
  
  /**
   * Gets stored bounds for an element.
   */
  getElementBounds(elementId: string): BoundingBox | undefined {
    return this.elementBounds.get(elementId)
  }
  
  /**
   * Clears position cache.
   */
  clearCache(): void {
    this.cache.clear()
  }
  
  /**
   * Generates cache key for position configuration.
   */
  private getCacheKey(elementId: string, context: LayoutContext): string {
    return `${elementId}-${context.state}-${context.level}-${context.depth}`
  }
  
  // ============================================================================
  // TRANSITION CALCULATIONS
  // ============================================================================
  
  /**
   * Calculates the position interpolation for a transition.
   */
  interpolatePosition(
    from: Position,
    to: Position,
    progress: number,
    easing: (t: number) => number = (t) => t
  ): Position {
    const easedProgress = easing(progress)
    
    return {
      x: from.x + (to.x - from.x) * easedProgress,
      y: from.y + (to.y - from.y) * easedProgress,
    }
  }
  
  /**
   * Calculates transform string for CSS.
   */
  getTransformString(position: Position, scale: number = 1): string {
    if (position.x === 0 && position.y === 0 && scale === 1) {
      return 'none'
    }
    
    const transforms: string[] = []
    
    if (position.x !== 0 || position.y !== 0) {
      transforms.push(`translate(${position.x}px, ${position.y}px)`)
    }
    
    if (scale !== 1) {
      transforms.push(`scale(${scale})`)
    }
    
    return transforms.join(' ')
  }
  
  // ============================================================================
  // CHILD TO PARENT PROMOTION
  // ============================================================================
  
  /**
   * Special calculation for child-to-parent promotion.
   * This is the key to fixing the animation issue.
   */
  calculatePromotionPath(
    childElement: HTMLElement,
    targetParentPosition: Position
  ): {
    start: Position
    end: Position
    midpoint: Position
    curve: string
  } {
    // Get current child position
    const childRect = childElement.getBoundingClientRect()
    const start: Position = {
      x: childRect.left,
      y: childRect.top,
    }
    
    // Calculate path to parent position
    const end = targetParentPosition
    
    // Calculate a smooth curve midpoint
    const midpoint: Position = {
      x: (start.x + end.x) / 2,
      y: Math.min(start.y, end.y) - 10, // Slight arc upward
    }
    
    // Generate SVG path for smooth transition
    const curve = `M${start.x},${start.y} Q${midpoint.x},${midpoint.y} ${end.x},${end.y}`
    
    return { start, end, midpoint, curve }
  }
  
  // ============================================================================
  // DEBUG HELPERS
  // ============================================================================
  
  /**
   * Gets debug information for current positions.
   */
  getDebugInfo(): {
    cachedPositions: number
    elementBounds: number
    positions: Array<{ id: string; config: PositionConfig }>
  } {
    return {
      cachedPositions: this.cache.size,
      elementBounds: this.elementBounds.size,
      positions: Array.from(this.cache.entries()).map(([id, config]) => ({
        id,
        config,
      })),
    }
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let calculatorInstance: PositionCalculator | null = null

/**
 * Gets the singleton position calculator instance.
 */
export function getPositionCalculator(): PositionCalculator {
  if (!calculatorInstance) {
    calculatorInstance = new PositionCalculator()
  }
  return calculatorInstance
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * React hook for using the position calculator.
 */
export function usePositionCalculator() {
  return getPositionCalculator()
}