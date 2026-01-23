/**
 * SwipeableCard - Configurable Tinder-style swipe card
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import type { CardConfig, SwipeConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface SwipeableCardProps {
  text: string
  isActive: boolean
  position: number
  onSwipe: (isTrue: boolean) => void
  cardConfig: CardConfig
  swipeConfig: SwipeConfig
  /** Programmatically trigger swipe animation (from button click) */
  triggerDirection?: 'left' | 'right' | null
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SwipeableCard({
  text,
  isActive,
  position,
  onSwipe,
  cardConfig,
  swipeConfig,
  triggerDirection,
  className,
}: SwipeableCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const startXRef = useRef(0)
  const startTimeRef = useRef(0)
  const hasTriggeredRef = useRef(false)

  // Handle swipe action
  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      setSwipeDirection(direction)
      setTimeout(() => {
        onSwipe(direction === 'right')
      }, swipeConfig.exitDuration)
    },
    [onSwipe, swipeConfig.exitDuration]
  )

  // Handle programmatic trigger from button click
  React.useEffect(() => {
    if (triggerDirection && isActive && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      handleSwipe(triggerDirection)
    }
    // Reset the trigger tracking when direction clears
    if (!triggerDirection) {
      hasTriggeredRef.current = false
    }
  }, [triggerDirection, isActive, handleSwipe])

  // Mouse/touch handlers for drag
  const handleDragStart = useCallback(
    (clientX: number) => {
      if (!isActive) return
      setIsDragging(true)
      startXRef.current = clientX
      startTimeRef.current = Date.now()
    },
    [isActive]
  )

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return
      const diff = clientX - startXRef.current
      setDragX(diff)
    },
    [isDragging]
  )

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    // Calculate velocity
    const elapsed = Date.now() - startTimeRef.current
    const velocity = Math.abs(dragX) / elapsed

    // Check for swipe trigger
    const passedThreshold = Math.abs(dragX) > swipeConfig.swipeThreshold
    const passedVelocity = velocity > swipeConfig.velocityThreshold

    if (passedThreshold || passedVelocity) {
      handleSwipe(dragX > 0 ? 'right' : 'left')
    } else {
      setDragX(0)
    }
  }, [isDragging, dragX, swipeConfig.swipeThreshold, swipeConfig.velocityThreshold, handleSwipe])

  // Calculate transform based on position and drag
  const getTransform = () => {
    if (swipeDirection) {
      const x = swipeDirection === 'right' ? swipeConfig.exitDistance : -swipeConfig.exitDistance
      const rotate = swipeDirection === 'right' ? swipeConfig.exitRotation : -swipeConfig.exitRotation
      return `translateX(${x}px) rotate(${rotate}deg)`
    }
    if (isDragging) {
      const rotation = Math.min(swipeConfig.maxRotation, Math.abs(dragX) * swipeConfig.rotationFactor)
      const rotateDir = dragX > 0 ? rotation : -rotation
      return `translateX(${dragX}px) rotate(${rotateDir}deg) scale(${swipeConfig.scaleOnDrag})`
    }
    const scale = 1 - position * cardConfig.stackScale
    const y = position * cardConfig.stackOffset
    return `scale(${scale}) translateY(${y}px)`
  }

  // Only reduce opacity for cards at position 2+ (keeps incoming card at full opacity)
  const opacity = position >= cardConfig.visibleCards ? 0 : position <= 1 ? 1 : 1 - (position - 1) * 0.2

  if (!isActive && position >= cardConfig.visibleCards) return null

  // Build classes
  const bgClass = `bg-${cardConfig.background}`
  const shadowClass = cardConfig.shadow !== 'none' ? `shadow-${cardConfig.shadow}` : ''
  const borderClass = cardConfig.border ? `border border-${cardConfig.borderColor}` : ''
  const cornerClass = cardConfig.cornerShape === 'squircle' ? 'corner-squircle' : ''

  // Build shine class
  const shineClass = cardConfig.shine !== 'none'
    ? `${cardConfig.shine}${cardConfig.shineIntensity}`
    : ''

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center text-center',
        bgClass,
        shadowClass,
        borderClass,
        cornerClass,
        shineClass,
        cardConfig.fontSize,
        cardConfig.fontWeight,
        `text-${cardConfig.textColor}`,
        'motion-safe:transition-transform',
        isActive && 'cursor-grab active:cursor-grabbing',
        className
      )}
      style={{
        width: cardConfig.width,
        height: cardConfig.height,
        padding: cardConfig.padding,
        borderRadius: cardConfig.borderRadius,
        transform: getTransform(),
        opacity,
        zIndex: 10 - position,
        transitionDuration: swipeDirection
          ? `${swipeConfig.exitDuration}ms`
          : `${swipeConfig.returnDuration}ms`,
      }}
      onMouseDown={(e) => {
        if (!isActive) return
        handleDragStart(e.clientX)

        const handleMove = (moveE: MouseEvent) => handleDragMove(moveE.clientX)
        const handleUp = () => {
          handleDragEnd()
          window.removeEventListener('mousemove', handleMove)
          window.removeEventListener('mouseup', handleUp)
        }

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', handleUp)
      }}
      onTouchStart={(e) => {
        if (!isActive) return
        handleDragStart(e.touches[0].clientX)
      }}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <p className="leading-relaxed max-w-xs">{text}</p>

      {/* Swipe hint overlay */}
      {swipeConfig.showOverlay && isActive && Math.abs(dragX) > 30 && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'motion-safe:transition-opacity motion-safe:duration-150',
            dragX > 0
              ? 'bg-success-primary border-2 border-success-primary'
              : 'bg-error-primary border-2 border-error-primary',
            cornerClass
          )}
          style={{
            borderRadius: cardConfig.borderRadius,
            opacity: swipeConfig.overlayOpacity / 100,
          }}
        >
          <HugeIcon
            icon={dragX > 0 ? Tick01Icon : Cancel01Icon}
            size="xl"
            color={dragX > 0 ? 'success' : 'error'}
          />
        </div>
      )}
    </div>
  )
}
