/**
 * ConfigurableToast - Playground version with full config support
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/success-toast
 */

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import CheckmarkCircle01Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon'
import type { SuccessToastConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface ConfigurableToastProps {
  config: SuccessToastConfig
  visible: boolean
  onDismiss?: () => void
  className?: string
}

// =============================================================================
// ANIMATION TRANSFORMS
// =============================================================================

function getInitialTransform(direction: SuccessToastConfig['behavior']['animationDirection']) {
  switch (direction) {
    case 'left':
      return 'translateX(-100%)'
    case 'right':
      return 'translateX(100%)'
    case 'up':
      return 'translateY(-100%)'
    case 'down':
      return 'translateY(100%)'
    default:
      return 'translateX(100%)'
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ConfigurableToast({
  config,
  visible,
  onDismiss,
  className,
}: ConfigurableToastProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(visible)
  const [progress, setProgress] = useState(0)

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      setProgress(0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      setProgress(0)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, config.behavior.animationDuration)
      return () => clearTimeout(timer)
    }
  }, [visible, config.behavior.animationDuration])

  // Progress bar animation and auto-dismiss
  useEffect(() => {
    if (!visible || !isAnimating) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / config.behavior.duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
        onDismiss?.()
      }
    }, 16)

    return () => clearInterval(interval)
  }, [visible, isAnimating, config.behavior.duration, onDismiss])

  if (!shouldRender) return null

  // Build shine class
  const shineClass = config.container.shine !== 'none'
    ? `${config.container.shine}${config.container.shineIntensity}`
    : ''

  // Build corner class
  const cornerClass = config.container.cornerShape !== 'round'
    ? `corner-${config.container.cornerShape}`
    : ''

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        `bg-${config.container.background}`,
        shineClass,
        cornerClass,
        'motion-safe:transition-all',
        className
      )}
      style={{
        paddingTop: config.container.paddingTop,
        paddingBottom: config.container.paddingBottom,
        paddingLeft: config.container.paddingLeft,
        paddingRight: config.container.paddingRight,
        borderRadius: config.container.borderRadius,
        transform: isAnimating ? 'translateX(0) translateY(0)' : getInitialTransform(config.behavior.animationDirection),
        opacity: isAnimating ? 1 : 0,
        transitionDuration: `${config.behavior.animationDuration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Content */}
      <div className="flex items-center gap-3">
        {/* Icon container - vertically centered */}
        <div
          className={cn(
            'flex items-center justify-center flex-shrink-0',
            `bg-${config.icon.containerBackground}`
          )}
          style={{
            width: config.icon.containerSize,
            height: config.icon.containerSize,
            borderRadius: config.icon.containerBorderRadius,
          }}
        >
          <HugeIcon
            icon={CheckmarkCircle01Icon}
            size={config.icon.iconSize}
            className={`text-${config.icon.iconColor}`}
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col min-w-0">
          <span
            className={cn(
              config.typography.titleSize,
              config.typography.titleWeight,
              `text-${config.typography.titleColor}`
            )}
          >
            {config.content.title}
          </span>
          {config.content.subtitle && (
            <span
              className={cn(
                config.typography.subtitleSize,
                config.typography.subtitleWeight,
                `text-${config.typography.subtitleColor}`,
                'mt-0.5'
              )}
            >
              {config.content.subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-${config.progress.background}`}
        style={{
          height: config.progress.height,
          borderRadius: config.progress.borderRadius,
        }}
      >
        <div
          className={`h-full bg-${config.progress.fillColor} motion-safe:transition-none`}
          style={{
            width: `${progress}%`,
            borderRadius: config.progress.borderRadius,
          }}
        />
      </div>
    </div>
  )
}
