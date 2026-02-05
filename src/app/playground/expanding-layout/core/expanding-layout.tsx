'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import type { Transition, Easing } from 'motion/react'
import type { PlaygroundConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface ExpandingLayoutProps {
  config: PlaygroundConfig
  expandedIndex: number | null
  onContainerClick: (index: number) => void
}

interface DebugDimensions {
  parent: { width: number; height: number }
  containers: Array<{ width: number; height: number }>
}

// =============================================================================
// HELPERS
// =============================================================================

function getSquareAColorClass(color: PlaygroundConfig['squareAColor']): string {
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

function getSquareBColorClass(color: PlaygroundConfig['squareBColor']): string {
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
      return 'bg-error-solid'
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ExpandingLayout({
  config,
  expandedIndex,
  onContainerClick,
}: ExpandingLayoutProps) {
  const {
    containerCount,
    squareAWidth,
    squareAHeight,
    squareBWidthMode,
    squareBWidth,
    squareBHeight,
    gap,
    containerGap,
    maxContainerWidth,
    animationDuration,
    animationEasing,
    squareBRevealMode,
    squareBEntryDelay,
    squareBEntryDuration,
    squareBExitDuration,
    squareBEntryScale,
    squareBEntryOpacity,
    squareAColor,
    squareBColor,
    squareBorderRadius,
    containerBorderRadius,
    showContainerBorder,
    showSquareLabels,
    showDebug,
    slowMoEnabled,
    reduceMotion,
  } = config

  // Refs for measuring dimensions
  const parentRef = useRef<HTMLDivElement>(null)
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [debugDimensions, setDebugDimensions] = useState<DebugDimensions>({
    parent: { width: 0, height: 0 },
    containers: [],
  })

  // Update debug dimensions
  useEffect(() => {
    if (!showDebug) return

    const updateDimensions = () => {
      const parent = parentRef.current
      const containers = containerRefs.current

      setDebugDimensions({
        parent: parent
          ? { width: parent.offsetWidth, height: parent.offsetHeight }
          : { width: 0, height: 0 },
        containers: containers.map((el) =>
          el ? { width: el.offsetWidth, height: el.offsetHeight } : { width: 0, height: 0 }
        ),
      })
    }

    updateDimensions()
    // Update after transitions
    const timer = setTimeout(updateDimensions, animationDuration + 50)
    return () => clearTimeout(timer)
  }, [showDebug, expandedIndex, animationDuration, containerCount, squareBWidthMode])

  // Time scale factor for slow-mo
  const timeScale = slowMoEnabled ? 10 : 1 // 10x slower in slow-mo

  // Calculate actual durations with slow-mo
  const actualDuration = reduceMotion ? 0 : animationDuration * timeScale
  const actualEntryDelay = reduceMotion ? 0 : squareBEntryDelay * timeScale
  const actualEntryDuration = reduceMotion ? 0 : squareBEntryDuration * timeScale
  const actualExitDuration = reduceMotion ? 0 : squareBExitDuration * timeScale

  // Motion.dev transition for Square B content effects (optional polish)
  const getContentTransition = (isExpanding: boolean): Transition => {
    if (reduceMotion) return { duration: 0 }
    return {
      delay: isExpanding ? actualEntryDelay / 1000 : 0,
      duration: (isExpanding ? actualEntryDuration : actualExitDuration) / 1000,
      ease: 'easeOut' as Easing,
    }
  }

  // Inner content animated props (handles visual effects for fade/clip-circle modes)
  const getInnerAnimatedProps = (expanded: boolean) => {
    if (squareBRevealMode === 'fade') {
      return {
        opacity: expanded ? 1 : squareBEntryOpacity,
        scale: expanded ? 1 : squareBEntryScale,
      }
    }
    if (squareBRevealMode === 'clip-circle') {
      return {
        clipPath: expanded ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
      }
    }
    // 'clip' mode - no inner animation, grid overflow:hidden does the reveal
    return {}
  }

  const containers = Array.from({ length: containerCount }, (_, i) => i)

  // Build CSS transition string
  const gridTransition = reduceMotion
    ? 'none'
    : `grid-template-columns ${actualDuration}ms ${animationEasing}`

  const isFlexMode = squareBWidthMode === 'flex'

  return (
    <div className="relative">
      {/* Parent container - uses full maxWidth in flex mode */}
      <div
        ref={parentRef}
        className={`flex items-center ${isFlexMode ? '' : 'justify-center'}`}
        style={{
          width: isFlexMode ? maxContainerWidth : undefined,
          maxWidth: maxContainerWidth,
        }}
      >
        {/* Flex container for all items */}
        <div
          className="flex items-stretch"
          style={{
            gap: containerGap,
            width: isFlexMode ? '100%' : undefined,
          }}
        >
          {containers.map((index) => {
            const isExpanded = expandedIndex === index

            // CSS Grid columns: [Square A] [Gap spacer] [Square B]
            // When collapsed: gap and Square B columns are 0
            // In flex mode, B uses 1fr to fill remaining space
            const bColumnWidth = isFlexMode ? '1fr' : `${squareBWidth}px`
            const gridTemplateColumns = isExpanded
              ? `${squareAWidth}px ${gap}px ${bColumnWidth}`
              : `${squareAWidth}px 0px 0px`

            return (
              <div
                key={index}
                ref={(el) => {
                  containerRefs.current[index] = el
                }}
                onClick={() => onContainerClick(index)}
                className={`
                  grid cursor-pointer items-center p-3
                  ${showContainerBorder ? 'border border-primary/20' : ''}
                  ${reduceMotion ? '' : 'motion-reduce:transition-none'}
                `}
                style={{
                  gridTemplateColumns,
                  transition: gridTransition,
                  borderRadius: containerBorderRadius,
                  // In flex mode, only expanded container takes remaining space
                  flex: isFlexMode && isExpanded ? 1 : undefined,
                  minWidth: isFlexMode && isExpanded ? 0 : undefined,
                }}
              >
                {/* Square A - always visible */}
                <div
                  className={`
                    flex shrink-0 items-center justify-center
                    ${getSquareAColorClass(squareAColor)}
                  `}
                  style={{
                    width: squareAWidth,
                    height: squareAHeight,
                    borderRadius: squareBorderRadius,
                  }}
                >
                  {showSquareLabels && (
                    <span className="text-sm font-medium text-white">
                      A{index + 1}
                    </span>
                  )}
                </div>

                {/* Gap spacer - collapses to 0 when not expanded */}
                <div aria-hidden="true" />

                {/* Square B wrapper - overflow:hidden clips during transition */}
                <div
                  className="overflow-hidden"
                  style={{
                    height: squareBHeight,
                    borderRadius: squareBorderRadius,
                  }}
                >
                  {/* Square B inner - handles visual effects */}
                  <motion.div
                    className={`
                      flex h-full items-center justify-center
                      ${getSquareBColorClass(squareBColor)}
                    `}
                    animate={getInnerAnimatedProps(isExpanded)}
                    transition={getContentTransition(isExpanded)}
                    style={{
                      width: isFlexMode ? '100%' : squareBWidth,
                      minWidth: isFlexMode ? squareBWidth : undefined, // Ensure minimum size in flex
                      borderRadius: squareBorderRadius,
                    }}
                  >
                    {showSquareLabels && (
                      <span className="whitespace-nowrap text-sm font-medium text-white">
                        B{index + 1}
                      </span>
                    )}
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Debug overlay */}
      {showDebug && (
        <>
          {/* Parent outline */}
          <div
            className="pointer-events-none absolute inset-0 border-2 border-dashed border-blue-500"
            style={{ borderRadius: 4 }}
          />

          {/* Debug panel */}
          <div className="absolute -bottom-4 left-0 translate-y-full rounded-lg bg-black/90 p-4 font-mono text-xs text-white shadow-xl">
            <div className="mb-3 border-b border-white/20 pb-2 text-sm font-semibold text-blue-400">
              Debug Info
            </div>

            {/* Parent dimensions */}
            <div className="mb-3">
              <div className="mb-1 text-blue-300">Parent Container</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-2 text-gray-300">
                <div>Width:</div>
                <div className="text-white">{debugDimensions.parent.width}px</div>
                <div>Height:</div>
                <div className="text-white">{debugDimensions.parent.height}px</div>
                <div>Max Width:</div>
                <div className="text-white">{maxContainerWidth}px</div>
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
                <div>Duration:</div>
                <div className="text-white">{animationDuration}ms</div>
                <div>Easing:</div>
                <div className="max-w-[120px] truncate text-white" title={animationEasing}>
                  {animationEasing}
                </div>
                <div>Reveal:</div>
                <div className="text-white">{squareBRevealMode}</div>
              </div>
            </div>

            {/* Layout mode */}
            <div>
              <div className="mb-1 text-blue-300">Layout</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-2 text-gray-300">
                <div>B Width:</div>
                <div className="text-white">
                  {isFlexMode ? 'flex (1fr)' : `fixed (${squareBWidth}px)`}
                </div>
                <div>Gap:</div>
                <div className="text-white">{containerGap}px</div>
                {slowMoEnabled && (
                  <>
                    <div>Time Scale:</div>
                    <div className="text-yellow-400">{timeScale}x (slow-mo)</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
