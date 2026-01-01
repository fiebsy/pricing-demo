/**
 * Base UI Menu - Reveal Menu Component
 *
 * Wrapper that adds a reveal/scale animation to the BaseUIMenu.
 * Injects CSS keyframes for smooth scale-in effect on open.
 *
 * @module base-ui/menu/reveal-menu
 */

'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type { RevealMenuProps, MenuItem, IconTriggerConfig } from './types'
import {
  DEFAULT_MENU_PROPS,
  DEFAULT_HEIGHT_TRANSITION,
  DEFAULT_SLIDE_TRANSITION,
  DEFAULT_REVEAL_CONFIG,
} from './config'
import { useRevealAnimation } from './hooks/use-reveal-animation'
import { BaseUIMenu } from './base-ui-menu'
import { IconTrigger } from './components'

// ============================================================================
// Helper Functions
// ============================================================================

function isIconTriggerConfig(trigger: unknown): trigger is IconTriggerConfig {
  return (
    trigger !== null &&
    typeof trigger === 'object' &&
    'icon' in trigger &&
    !React.isValidElement(trigger)
  )
}

// ============================================================================
// Component
// ============================================================================

/**
 * Menu with reveal animation
 * Built on Base UI Menu primitives
 *
 * Animation Architecture:
 * - Container 1: Menu.Popup (outer wrapper)
 * - Container 1A: Root menu panel
 * - Container 1B: Submenu panel(s)
 */
export const RevealMenu: React.FC<RevealMenuProps> = ({
  trigger,
  items,
  align = DEFAULT_MENU_PROPS.align,
  side = DEFAULT_MENU_PROPS.side,
  sideOffset,
  alignOffset,
  width = DEFAULT_MENU_PROPS.width,
  variant = DEFAULT_MENU_PROPS.variant,
  revealConfig = DEFAULT_REVEAL_CONFIG,
  heightTransition = DEFAULT_HEIGHT_TRANSITION,
  slideTransition = DEFAULT_SLIDE_TRANSITION,
  onOpenChange: externalOnOpenChange,
  header,
  className,
  appearance,
  // Panel Navigation Animation (1A ↔ 1B)
  heightAnimationEnabled = true,
  opacityCrossfadeEnabled = true,
  opacityDurationRatio = 0.8,
}) => {
  // ============================================================================
  // State
  // ============================================================================

  const [isOpen, setIsOpen] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      externalOnOpenChange?.(open)
    },
    [externalOnOpenChange]
  )

  // ============================================================================
  // Animation
  // ============================================================================

  const { uniqueClass, animationCss } = useRevealAnimation({
    isOpen,
    revealConfig,
    side,
    align,
    animationKey,
  })

  // ============================================================================
  // Loop Animation (for testing)
  // ============================================================================

  useEffect(() => {
    if (revealConfig.loop && isOpen) {
      const interval = setInterval(() => {
        handleOpenChange(false)
        setTimeout(() => {
          setAnimationKey((prev) => prev + 1)
          handleOpenChange(true)
        }, revealConfig.duration)
      }, revealConfig.duration * 2)

      return () => clearInterval(interval)
    }
  }, [isOpen, revealConfig.loop, revealConfig.duration, handleOpenChange])

  // ============================================================================
  // Trigger
  // ============================================================================

  const stableTrigger = React.useMemo(() => {
    if (isIconTriggerConfig(trigger)) {
      return (
        <div className="inline-flex items-center justify-center">
          <IconTrigger
            icon={trigger.icon}
            className={trigger.className}
            isOpen={isOpen}
          />
        </div>
      )
    }

    if (
      React.isValidElement(trigger) ||
      typeof trigger === 'string' ||
      typeof trigger === 'number'
    ) {
      return <div className="inline-block">{trigger}</div>
    }

    return trigger
  }, [trigger, isOpen])

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="reveal-menu-wrapper">
      {/* Inject animation CSS when open */}
      {isOpen && <style>{animationCss}</style>}

      <BaseUIMenu
        trigger={stableTrigger}
        items={items}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        width={width}
        variant={variant}
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={cn(
          uniqueClass,
          // Disable default animations (we use our own)
          'data-[open]:fade-in-0 animate-none data-[open]:animate-none',
          className
        )}
        appearance={appearance}
        heightTransition={heightTransition}
        slideTransition={slideTransition}
        header={header}
        // Panel Navigation Animation (1A ↔ 1B)
        heightAnimationEnabled={heightAnimationEnabled}
        opacityCrossfadeEnabled={opacityCrossfadeEnabled}
        opacityDurationRatio={opacityDurationRatio}
      />
    </div>
  )
}

RevealMenu.displayName = 'RevealMenu'
