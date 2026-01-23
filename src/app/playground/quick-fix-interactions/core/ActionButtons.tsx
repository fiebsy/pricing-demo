/**
 * ActionButtons - Configurable True/False swipe buttons
 *
 * Supports:
 * - Custom styled buttons
 * - Prod Button component
 * - Display modes: icon-only, text-only, icon+text
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/quick-fix
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Button } from '@/components/ui/prod/base/button'
import type { ButtonVariant } from '@/components/ui/prod/base/button/types'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import type { ActionButtonConfig } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

export interface ActionButtonsProps {
  onSwipe: (direction: 'left' | 'right') => void
  config: ActionButtonConfig
  disabled?: boolean
  className?: string
}

// =============================================================================
// CUSTOM BUTTON COMPONENT
// =============================================================================

interface CustomButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  config: ActionButtonConfig
  disabled?: boolean
}

function CustomButton({ direction, onClick, config, disabled }: CustomButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const isTrue = direction === 'right'
  const icon = isTrue ? ArrowRight01Icon : ArrowLeft01Icon
  const bgClass = isTrue ? `bg-${config.trueBackground}` : `bg-${config.falseBackground}`
  const colorClass = isTrue ? config.trueColor : config.falseColor
  const label = isTrue ? config.trueLabel : config.falseLabel

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    // Add ripple effect
    if (config.showRipple) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const id = Date.now()
      setRipples((prev) => [...prev, { id, x, y }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    }

    onClick()
  }

  const getScale = () => {
    if (isPressed) return config.pressScale
    if (isHovered) return config.hoverScale
    return 1
  }

  const showIcon = config.displayMode === 'icon-only' || config.displayMode === 'icon-text'
  const showText = config.displayMode === 'text-only' || config.displayMode === 'icon-text'

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={cn(
        'relative flex items-center justify-center gap-2 overflow-hidden',
        bgClass,
        'motion-safe:transition-all motion-safe:duration-150',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      style={{
        width: config.displayMode === 'icon-only' ? config.size : 'auto',
        height: config.size,
        paddingLeft: config.displayMode !== 'icon-only' ? config.size * 0.4 : undefined,
        paddingRight: config.displayMode !== 'icon-only' ? config.size * 0.4 : undefined,
        borderRadius: config.borderRadius,
        transform: `scale(${getScale()})`,
      }}
    >
      {showIcon && (
        <HugeIcon
          icon={icon}
          size={config.iconSize as 'sm' | 'md' | 'lg' | 'xl'}
          className={`text-${colorClass}`}
        />
      )}
      {showText && (
        <span className={cn('font-medium', `text-${colorClass}`)}>
          {label}
        </span>
      )}

      {/* Ripple effects */}
      {config.showRipple &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={cn(
              'absolute rounded-full animate-ripple pointer-events-none',
              isTrue ? 'bg-success-primary/30' : 'bg-error-primary/30'
            )}
            style={{
              width: config.size * 2,
              height: config.size * 2,
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
    </button>
  )
}

// =============================================================================
// PROD BUTTON WRAPPER
// =============================================================================

interface ProdButtonWrapperProps {
  direction: 'left' | 'right'
  onClick: () => void
  config: ActionButtonConfig
  disabled?: boolean
}

function ProdButtonWrapper({ direction, onClick, config, disabled }: ProdButtonWrapperProps) {
  const isTrue = direction === 'right'
  const arrowIcon = isTrue ? ArrowRight01Icon : ArrowLeft01Icon
  const label = isTrue ? config.trueLabel : config.falseLabel

  // Use configured variant
  const variant = (isTrue ? config.prodTrueVariant : config.prodFalseVariant) as ButtonVariant

  const showIcon = config.displayMode === 'icon-only' || config.displayMode === 'icon-text'
  const showText = config.displayMode === 'text-only' || config.displayMode === 'icon-text'

  return (
    <Button
      variant={variant}
      size={config.prodButtonSize}
      roundness={config.prodButtonRoundness}
      iconLeading={showIcon ? arrowIcon : undefined}
      onClick={onClick}
      disabled={disabled}
    >
      {showText ? label : null}
    </Button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ActionButtons({ onSwipe, config, disabled, className }: ActionButtonsProps) {
  const ButtonComponent = config.useProdButton ? ProdButtonWrapper : CustomButton

  return (
    <div className={cn('flex items-center gap-8', className)}>
      <ButtonComponent
        direction="left"
        onClick={() => onSwipe('left')}
        config={config}
        disabled={disabled}
      />
      <ButtonComponent
        direction="right"
        onClick={() => onSwipe('right')}
        config={config}
        disabled={disabled}
      />
    </div>
  )
}
