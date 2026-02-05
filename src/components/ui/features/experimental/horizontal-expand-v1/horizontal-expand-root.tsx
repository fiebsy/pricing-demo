/**
 * Horizontal Expand V1 - Root Component
 *
 * Container that provides context and manages the horizontal expand state.
 * Renders a flex row with backdrop and slots.
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { HorizontalExpandProvider, useHorizontalExpand } from './context'
import { DEFAULT_HORIZONTAL_EXPAND_CONFIG } from './constants'
import { Backdrop, TriggerSlot, LeftSlot, RightSlot } from './components'
import type { HorizontalExpandRootProps, HorizontalExpandConfig } from './types'

// ============================================================================
// INTERNAL CONTAINER
// ============================================================================

interface InternalContainerProps {
  className?: string
  children: React.ReactNode
}

const InternalContainer: React.FC<InternalContainerProps> = ({ className, children }) => {
  const { expanded, setExpanded, setHovered, config, refs, dimensions } = useHorizontalExpand()

  // Calculate widths for grid template
  const leftWidth = config.leftSlot.enabled ? dimensions.leftWidth : 0
  const rightWidth = config.rightSlot.enabled ? dimensions.rightWidth : 0
  const leftGap = config.leftSlot.enabled ? config.layout.leftGap : 0
  const rightGap = config.rightSlot.enabled ? config.layout.rightGap : 0

  // Grid columns: [left slot] [left gap] [trigger] [right gap] [right slot]
  // When collapsed, side slots are 0 width
  const gridTemplateColumns = expanded
    ? `${leftWidth}px ${leftGap}px ${dimensions.triggerWidth}px ${rightGap}px ${rightWidth}px`
    : `0px 0px ${dimensions.triggerWidth}px 0px 0px`

  const duration = expanded ? config.animation.duration : config.animation.collapseDuration

  return (
    <div
      ref={refs.container}
      className={cn(
        'relative inline-grid cursor-pointer items-center motion-reduce:transition-none',
        className
      )}
      style={{
        gridTemplateColumns,
        transition: `grid-template-columns ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        height: config.layout.triggerHeight,
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Backdrop behind everything */}
      <Backdrop />

      {/* Content layer */}
      <div
        className="contents"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// ROOT COMPONENT
// ============================================================================

const HorizontalExpandRoot: React.FC<HorizontalExpandRootProps> = ({
  config: configOverride,
  expanded,
  onExpandedChange,
  className,
  children,
}) => {
  // Deep merge config with defaults
  const config = useMemo<HorizontalExpandConfig>(() => {
    if (!configOverride) return DEFAULT_HORIZONTAL_EXPAND_CONFIG

    return {
      animation: { ...DEFAULT_HORIZONTAL_EXPAND_CONFIG.animation, ...configOverride.animation },
      layout: { ...DEFAULT_HORIZONTAL_EXPAND_CONFIG.layout, ...configOverride.layout },
      appearance: { ...DEFAULT_HORIZONTAL_EXPAND_CONFIG.appearance, ...configOverride.appearance },
      collapsedBackground: configOverride.collapsedBackground ?? DEFAULT_HORIZONTAL_EXPAND_CONFIG.collapsedBackground,
      leftSlot: { ...DEFAULT_HORIZONTAL_EXPAND_CONFIG.leftSlot, ...configOverride.leftSlot },
      triggerSlot: { ...DEFAULT_HORIZONTAL_EXPAND_CONFIG.triggerSlot, ...configOverride.triggerSlot },
      rightSlot: { ...DEFAULT_HORIZONTAL_EXPAND_CONFIG.rightSlot, ...configOverride.rightSlot },
      debug: configOverride.debug ?? DEFAULT_HORIZONTAL_EXPAND_CONFIG.debug,
    }
  }, [configOverride])

  return (
    <HorizontalExpandProvider
      config={config}
      expanded={expanded ?? false}
      onExpandedChange={onExpandedChange}
    >
      <InternalContainer className={className}>{children}</InternalContainer>
    </HorizontalExpandProvider>
  )
}

HorizontalExpandRoot.displayName = 'HorizontalExpandV1.Root'

// ============================================================================
// COMPOUND COMPONENT EXPORT
// ============================================================================

export const HorizontalExpandV1 = {
  Root: HorizontalExpandRoot,
  Backdrop,
  TriggerSlot,
  LeftSlot,
  RightSlot,
}
