'use client'

import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import type { Transition, Variants, Easing } from 'motion/react'
import type { PlaygroundConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface ExpandingLayoutProps {
  config: PlaygroundConfig
  expandedIndex: number | null
  onContainerClick: (index: number) => void
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
    squareASize,
    squareBSize,
    gap,
    containerGap,
    maxContainerWidth,
    animationType,
    springStiffness,
    springDamping,
    springMass,
    tweenDuration,
    tweenEase,
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

  // Time scale factor for slow-mo
  const timeScale = slowMoEnabled ? 0.1 : 1

  // Build layout transition based on animation type
  const layoutTransition: Transition = reduceMotion
    ? { duration: 0 }
    : animationType === 'spring'
      ? {
          type: 'spring',
          stiffness: springStiffness * timeScale * timeScale,
          damping: springDamping * timeScale,
          mass: springMass,
        }
      : {
          type: 'tween',
          duration: (tweenDuration / 1000) / timeScale,
          ease: tweenEase as Easing,
        }

  // Square B variants for AnimatePresence
  const squareBVariants: Variants = {
    hidden: {
      opacity: squareBEntryOpacity,
      scale: squareBEntryScale,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            delay: (squareBEntryDelay / 1000) / timeScale,
            duration: (squareBEntryDuration / 1000) / timeScale,
            ease: 'easeOut',
          },
    },
    exit: {
      opacity: 0,
      scale: squareBEntryScale,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: (squareBExitDuration / 1000) / timeScale,
            ease: 'easeIn',
          },
    },
  }

  const containers = Array.from({ length: containerCount }, (_, i) => i)

  return (
    <div
      className="flex items-center justify-center"
      style={{ maxWidth: maxContainerWidth }}
    >
      <LayoutGroup>
        <div
          className="flex items-stretch"
          style={{ gap: containerGap }}
        >
          {containers.map((index) => {
            const isExpanded = expandedIndex === index

            return (
              <motion.div
                key={index}
                layout
                onClick={() => onContainerClick(index)}
                transition={layoutTransition}
                className={`
                  flex cursor-pointer items-center p-3
                  ${showContainerBorder ? 'border border-primary/20' : ''}
                `}
                style={{
                  borderRadius: containerBorderRadius,
                  gap: isExpanded ? gap : 0,
                }}
              >
                {/* Square A - always visible */}
                <motion.div
                  layout="position"
                  className={`
                    flex shrink-0 items-center justify-center
                    ${getSquareAColorClass(squareAColor)}
                  `}
                  style={{
                    width: squareASize,
                    height: squareASize,
                    borderRadius: squareBorderRadius,
                  }}
                >
                  {showSquareLabels && (
                    <span className="text-sm font-medium text-white">
                      A{index + 1}
                    </span>
                  )}
                </motion.div>

                {/* Square B - conditional with AnimatePresence */}
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      key={`squareB-${index}`}
                      variants={squareBVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`
                        flex shrink-0 items-center justify-center
                        ${getSquareBColorClass(squareBColor)}
                      `}
                      style={{
                        width: squareBSize,
                        height: squareBSize,
                        borderRadius: squareBorderRadius,
                      }}
                    >
                      {showSquareLabels && (
                        <span className="text-sm font-medium text-white">
                          B{index + 1}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </LayoutGroup>

      {/* Debug info */}
      {showDebug && (
        <div className="absolute bottom-4 left-4 rounded-lg bg-black/80 p-3 font-mono text-xs text-white">
          <div>Expanded: {expandedIndex !== null ? expandedIndex : 'none'}</div>
          <div>Animation: {animationType}</div>
          {animationType === 'spring' && (
            <>
              <div>Stiffness: {springStiffness}</div>
              <div>Damping: {springDamping}</div>
            </>
          )}
          {animationType === 'tween' && (
            <div>Duration: {tweenDuration}ms</div>
          )}
          <div>Time Scale: {timeScale}x</div>
        </div>
      )}
    </div>
  )
}
