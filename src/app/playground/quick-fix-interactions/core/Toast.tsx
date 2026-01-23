/**
 * Toast - Configurable success toast with shine border
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import CheckmarkCircle01Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon'
import type { ToastConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface ToastProps {
  title: string
  subtitle?: string
  icon?: React.ComponentType
  visible: boolean
  config: ToastConfig
  className?: string
}

// =============================================================================
// ANIMATION TRANSFORMS
// =============================================================================

function getAnimationTransform(direction: ToastConfig['animationDirection'], entering: boolean) {
  const distance = entering ? 0 : 100
  const startDistance = 100

  switch (direction) {
    case 'left':
      return entering ? `translateX(0)` : `translateX(-${startDistance}%)`
    case 'right':
      return entering ? `translateX(0)` : `translateX(${startDistance}%)`
    case 'up':
      return entering ? `translateY(0)` : `translateY(-${startDistance}%)`
    case 'down':
      return entering ? `translateY(0)` : `translateY(${startDistance}%)`
    default:
      return 'translateX(0)'
  }
}

function getInitialTransform(direction: ToastConfig['animationDirection']) {
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

export function Toast({
  title,
  subtitle,
  icon: IconComponent,
  visible,
  config,
  className,
}: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(visible)

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, config.animationDuration)
      return () => clearTimeout(timer)
    }
  }, [visible, config.animationDuration])

  if (!shouldRender) return null

  // Build shine class
  const shineClass = config.shine !== 'none'
    ? `${config.shine}${config.shineIntensity}`
    : ''

  // Build corner class
  const cornerClass = config.cornerShape === 'squircle' ? 'corner-squircle' : ''

  const Icon = IconComponent || CheckmarkCircle01Icon

  return (
    <div
      className={cn(
        'flex items-start',
        `bg-${config.background}`,
        shineClass,
        cornerClass,
        'motion-safe:transition-all',
        className
      )}
      style={{
        padding: config.padding,
        gap: config.gap,
        borderRadius: config.borderRadius,
        transform: isAnimating ? 'translateX(0) translateY(0)' : getInitialTransform(config.animationDirection),
        opacity: isAnimating ? 1 : 0,
        transitionDuration: `${config.animationDuration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Icon container */}
      <div
        className={cn(
          'flex items-center justify-center flex-shrink-0 rounded-lg',
          `bg-${config.iconContainerBackground}`
        )}
        style={{
          width: config.iconContainerSize,
          height: config.iconContainerSize,
        }}
      >
        <HugeIcon
          icon={Icon}
          size={config.iconSize}
          className={`text-${config.iconColor}`}
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col min-w-0">
        <span
          className={cn(
            config.titleSize,
            config.titleWeight,
            `text-${config.titleColor}`
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={cn(
              config.subtitleSize,
              config.subtitleWeight,
              `text-${config.subtitleColor}`,
              'mt-0.5'
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}
