/**
 * Side-Stack Layout Component
 *
 * A row of containers where each can expand horizontally,
 * revealing left and right slots with clip-path animations.
 * Expansion pushes neighboring containers aside.
 */

'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import type { PlaygroundConfig, SideStackMode } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface SideStackLayoutProps {
  config: PlaygroundConfig
  expandedIndex: number | null
  onContainerClick: (index: number) => void
}

interface DebugDimensions {
  containers: Array<{ width: number; height: number }>
}

// =============================================================================
// HELPERS
// =============================================================================

function getTriggerColorClass(color: PlaygroundConfig['triggerColor']): string {
  switch (color) {
    case 'neutral':
      return 'bg-gray-400'
    case 'secondary':
      return 'bg-secondary'
    case 'tertiary':
      return 'bg-tertiary'
    default:
      return 'bg-gray-400'
  }
}

function getSlotColorClass(color: PlaygroundConfig['leftSlotColor'] | PlaygroundConfig['rightSlotColor']): string {
  switch (color) {
    case 'error':
      return 'bg-error-solid'
    case 'success':
      return 'bg-success-solid'
    case 'warning':
      return 'bg-warning-solid'
    case 'brand':
      return 'bg-brand-solid'
    default:
      return 'bg-brand-solid'
  }
}

/**
 * Get clip-path for slot animation.
 * Left slot: expands leftward (reveals from right edge)
 * Right slot: expands rightward (reveals from left edge)
 */
function getSlotClipPath(expanded: boolean, side: 'left' | 'right'): string {
  if (expanded) {
    return 'inset(0 0 0 0)'
  }
  // Left slot collapses toward right (expands leftward)
  // Right slot collapses toward left (expands rightward)
  return side === 'left' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SideStackLayout({
  config,
  expandedIndex,
  onContainerClick,
}: SideStackLayoutProps) {
  const {
    sideStackMode,
    containerCount,
    triggerWidth,
    triggerHeight,
    leftSlotWidth,
    rightSlotWidth,
    containerGap,
    slotInset,
    animationDuration,
    animationEasing,
    collapseDuration,
    slotContainerDurationOffset,
    animateSlotContainers,
    triggerColor,
    leftSlotColor,
    rightSlotColor,
    borderRadius,
    containerBorderRadius,
    showContainerBorder,
    showSlotLabels,
    showDebug,
    slowMoEnabled,
    reduceMotion,
  } = config

  // Refs for measuring dimensions
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [debugDimensions, setDebugDimensions] = useState<DebugDimensions>({
    containers: [],
  })

  // Determine which slots are enabled based on mode
  const showLeftSlot = sideStackMode === 'both' || sideStackMode === 'left-only'
  const showRightSlot = sideStackMode === 'both' || sideStackMode === 'right-only'

  // Update debug dimensions
  useEffect(() => {
    if (!showDebug) return

    const updateDimensions = () => {
      const containers = containerRefs.current

      setDebugDimensions({
        containers: containers.map((el) =>
          el ? { width: el.offsetWidth, height: el.offsetHeight } : { width: 0, height: 0 }
        ),
      })
    }

    updateDimensions()
    const timer = setTimeout(updateDimensions, animationDuration + 50)
    return () => clearTimeout(timer)
  }, [showDebug, expandedIndex, animationDuration, containerCount])

  // Time scale factor for slow-mo
  const timeScale = slowMoEnabled ? 10 : 1

  // Calculate actual durations with slow-mo
  const actualExpandDuration = reduceMotion ? 0 : animationDuration * timeScale
  const actualCollapseDuration = reduceMotion ? 0 : collapseDuration * timeScale
  const actualSlotOffset = reduceMotion ? 0 : slotContainerDurationOffset * timeScale

  const containers = Array.from({ length: containerCount }, (_, i) => i)

  // Easing constant for clip-path animation
  const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <div className="relative">
      {/* Container row */}
      <div
        className="flex items-center"
        style={{ gap: containerGap }}
      >
        {containers.map((index) => {
          const isExpanded = expandedIndex === index
          const duration = isExpanded ? actualExpandDuration : actualCollapseDuration

          // Grid columns: [left slot] [trigger] [right slot]
          // When collapsed, side slots are 0 width
          const leftCol = showLeftSlot ? (isExpanded ? `${leftSlotWidth}px` : '0px') : '0px'
          const rightCol = showRightSlot ? (isExpanded ? `${rightSlotWidth}px` : '0px') : '0px'
          const gridTemplateColumns = `${leftCol} ${triggerWidth}px ${rightCol}`

          // Build CSS transition string
          const gridTransition = reduceMotion
            ? 'none'
            : `grid-template-columns ${duration}ms ${animationEasing}`

          return (
            <div
              key={index}
              ref={(el) => {
                containerRefs.current[index] = el
              }}
              onClick={() => onContainerClick(index)}
              className={`
                relative grid cursor-pointer items-center
                ${showContainerBorder ? 'border border-primary/20' : ''}
                ${reduceMotion ? '' : 'motion-reduce:transition-none'}
              `}
              style={{
                gridTemplateColumns,
                transition: gridTransition,
                borderRadius: containerBorderRadius,
                height: triggerHeight,
              }}
            >
              {/* Left Slot */}
              {showLeftSlot && (
                <div
                  className="relative h-full overflow-hidden"
                  style={{ borderRadius }}
                >
                  {/* Inner content with clip-path animation */}
                  <div
                    className={`
                      absolute flex items-center justify-center
                      ${getSlotColorClass(leftSlotColor)}
                    `}
                    style={{
                      top: slotInset,
                      bottom: slotInset,
                      left: slotInset,
                      right: slotInset,
                      borderRadius: Math.max(0, borderRadius - slotInset),
                      clipPath: animateSlotContainers
                        ? getSlotClipPath(isExpanded, 'left')
                        : 'inset(0 0 0 0)',
                      transition: animateSlotContainers
                        ? `clip-path ${duration + actualSlotOffset}ms ${EASING_EXPO_OUT}`
                        : 'none',
                    }}
                  >
                    {showSlotLabels && (
                      <span className="whitespace-nowrap text-xs font-medium text-white">
                        L{index + 1}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Trigger - always visible */}
              <div
                className={`
                  relative flex shrink-0 items-center justify-center
                  ${getTriggerColorClass(triggerColor)}
                `}
                style={{
                  width: triggerWidth,
                  height: triggerHeight,
                  borderRadius,
                }}
              >
                {showSlotLabels && (
                  <span className="text-sm font-medium text-white">
                    T{index + 1}
                  </span>
                )}
              </div>

              {/* Right Slot */}
              {showRightSlot && (
                <div
                  className="relative h-full overflow-hidden"
                  style={{ borderRadius }}
                >
                  {/* Inner content with clip-path animation */}
                  <div
                    className={`
                      absolute flex items-center justify-center
                      ${getSlotColorClass(rightSlotColor)}
                    `}
                    style={{
                      top: slotInset,
                      bottom: slotInset,
                      left: slotInset,
                      right: slotInset,
                      borderRadius: Math.max(0, borderRadius - slotInset),
                      clipPath: animateSlotContainers
                        ? getSlotClipPath(isExpanded, 'right')
                        : 'inset(0 0 0 0)',
                      transition: animateSlotContainers
                        ? `clip-path ${duration + actualSlotOffset}ms ${EASING_EXPO_OUT}`
                        : 'none',
                    }}
                  >
                    {showSlotLabels && (
                      <span className="whitespace-nowrap text-xs font-medium text-white">
                        R{index + 1}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Debug overlay */}
      {showDebug && (
        <div className="absolute -bottom-4 left-0 translate-y-full rounded-lg bg-black/90 p-4 font-mono text-xs text-white shadow-xl">
          <div className="mb-3 border-b border-white/20 pb-2 text-sm font-semibold text-blue-400">
            Debug Info
          </div>

          {/* Mode */}
          <div className="mb-3">
            <div className="mb-1 text-blue-300">Mode</div>
            <div className="pl-2 text-gray-300">
              Stack: <span className="text-white">{sideStackMode}</span>
            </div>
          </div>

          {/* Container dimensions */}
          <div className="mb-3">
            <div className="mb-1 text-blue-300">Containers ({containerCount})</div>
            <div className="space-y-1 pl-2">
              {debugDimensions.containers.slice(0, containerCount).map((dim, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300">
                  <span className={expandedIndex === i ? 'text-green-400' : ''}>
                    [{i + 1}]
                  </span>
                  <span className="text-white">{dim.width}×{dim.height}px</span>
                  {expandedIndex === i && (
                    <span className="text-green-400">(expanded)</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Animation info */}
          <div className="mb-3">
            <div className="mb-1 text-blue-300">Animation</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-2 text-gray-300">
              <div>Expand:</div>
              <div className="text-white">{animationDuration}ms</div>
              <div>Collapse:</div>
              <div className="text-white">{collapseDuration}ms</div>
              <div>Clip Offset:</div>
              <div className="text-white">{slotContainerDurationOffset}ms</div>
              {slowMoEnabled && (
                <>
                  <div>Time Scale:</div>
                  <div className="text-yellow-400">{timeScale}x (slow-mo)</div>
                </>
              )}
            </div>
          </div>

          {/* Slot dimensions */}
          <div>
            <div className="mb-1 text-blue-300">Slots</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-2 text-gray-300">
              <div>Left:</div>
              <div className="text-white">{showLeftSlot ? `${leftSlotWidth}px` : 'disabled'}</div>
              <div>Trigger:</div>
              <div className="text-white">{triggerWidth}×{triggerHeight}px</div>
              <div>Right:</div>
              <div className="text-white">{showRightSlot ? `${rightSlotWidth}px` : 'disabled'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
