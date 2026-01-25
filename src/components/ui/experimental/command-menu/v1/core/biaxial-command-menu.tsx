/**
 * Biaxial Command Menu - Biaxial Animated Command Palette
 *
 * An expandable search input that reveals a filterable command list.
 * Uses the two-layer animation system:
 *
 * 1. **Backdrop Layer** - Animates size with shine/shadow
 * 2. **Content Layer** - Uses clip-path for smooth reveal
 *
 * @status incubating
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  EASING_EXPO_OUT,
  getPopupClasses,
  getGradientStyles,
} from '@/components/ui/prod/base/menu/config'

import type {
  CommandMenuProps,
  CommandMenuConfig,
  CommandItemAction,
  BackgroundOption,
  CommandGroup,
} from './types'
import { DEFAULT_COMMAND_CONFIG } from './constants'
import { CommandInput } from '../components/command-input'
import { CommandList, type CommandListRef } from '../components/command-list'

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Get background class from config option
 */
function getBackgroundClass(bg: BackgroundOption): string {
  switch (bg) {
    case 'none':
      return ''
    case 'primary':
      return 'bg-primary'
    case 'secondary':
      return 'bg-secondary'
    case 'tertiary':
      return 'bg-tertiary'
    case 'quaternary':
      return 'bg-quaternary'
    default:
      return ''
  }
}

/**
 * Filter groups based on search string
 * Duplicated from CommandList to calculate height at parent level
 */
function filterGroups(groups: CommandGroup[], filter: string): CommandGroup[] {
  if (!filter.trim()) return groups

  const lowerFilter = filter.toLowerCase()

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (item.type === 'separator') return false
        const action = item as CommandItemAction
        return (
          action.label.toLowerCase().includes(lowerFilter) ||
          action.description?.toLowerCase().includes(lowerFilter)
        )
      }),
    }))
    .filter((group) => group.items.length > 0)
}

/**
 * Calculate panel dimensions based on content
 *
 * maxPanelHeight represents the maximum height of the ENTIRE panel (including input).
 * The content area height = maxPanelHeight - inputHeight - contentTopOffset
 */
function calculatePanelHeight(
  config: CommandMenuConfig,
  itemCount: number,
  groupCount: number,
  isEmpty: boolean
): number {
  const inputHeight = config.inputHeight + config.inputTopPaddingExpanded

  // Empty state: show minimum content area for "No results" message
  if (isEmpty) {
    const emptyStateHeight = 80 // Fixed height for empty state message
    const minContentHeight =
      emptyStateHeight + config.innerPaddingTop + config.innerPaddingBottom
    return inputHeight + config.contentTopOffset + minContentHeight
  }

  const itemsHeight = itemCount * config.itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * config.itemGap
  // Group headers + separators
  const groupHeadersHeight = groupCount * 28 // ~28px per group header
  const separatorsHeight = Math.max(0, groupCount - 1) * 8 // separator + margin
  const padding = config.innerPaddingTop + config.innerPaddingBottom
  const scrollPadding = config.scrollPaddingTop + config.scrollPaddingBottom

  // Calculate content height (area below input)
  const contentHeight =
    itemsHeight +
    gapsHeight +
    groupHeadersHeight +
    separatorsHeight +
    padding +
    scrollPadding

  // Total panel height = input + offset + content
  const calculatedHeight = inputHeight + config.contentTopOffset + contentHeight

  // Cap at maxPanelHeight
  return Math.min(calculatedHeight, config.maxPanelHeight)
}

/**
 * Get clip-path for biaxial animation (always center anchor)
 */
function getClipPath(
  expanded: boolean,
  panelWidth: number,
  panelHeight: number,
  inputWidth: number,
  inputHeight: number,
  expandedRadius: string,
  collapsedRadius: string
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${expandedRadius})`
  }

  // Collapsed - show only input area (center anchor)
  const sideInset = (panelWidth - inputWidth) / 2
  const bottomInset = panelHeight - inputHeight

  return `inset(0 ${sideInset}px ${bottomInset}px ${sideInset}px round ${collapsedRadius})`
}

// ============================================================================
// COMPONENT
// ============================================================================

export const BiaxialCommandMenu: React.FC<CommandMenuProps> = ({
  groups,
  config: userConfig,
  expanded: controlledExpanded,
  onExpandedChange,
  onSelect,
  className,
}) => {
  // Merge config with defaults
  const config = useMemo(
    () => ({ ...DEFAULT_COMMAND_CONFIG, ...userConfig }),
    [userConfig]
  )

  // State
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [filter, setFilter] = useState('')

  const expanded = controlledExpanded ?? internalExpanded
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<CommandListRef>(null)

  // Filter groups based on current search - recalculates on every filter change
  const filteredGroups = useMemo(
    () => filterGroups(groups, filter),
    [groups, filter]
  )

  // Count filtered items for height calculation
  const filteredItemCount = filteredGroups.reduce(
    (sum, g) => sum + g.items.filter((i) => i.type !== 'separator').length,
    0
  )
  const filteredGroupCount = filteredGroups.length
  const isEmpty = filteredGroupCount === 0

  // Calculate dimensions based on filtered content - no memo to ensure recalculation
  const panelHeight = calculatePanelHeight(
    config,
    filteredItemCount,
    filteredGroupCount,
    isEmpty
  )

  // Item radius = container radius - padding (use smaller of left/right)
  const itemRadius = useMemo(
    () =>
      Math.max(
        0,
        config.borderRadius -
          Math.min(config.innerPaddingLeft, config.innerPaddingRight)
      ),
    [config.borderRadius, config.innerPaddingLeft, config.innerPaddingRight]
  )

  // Consolidated border radius calculations - single source of truth
  const radii = useMemo(() => {
    const base = config.borderRadius
    const top = config.topBorderRadius ?? base
    const menuBottom = config.menuBorderRadius ?? base
    const containerInset = config.menuContainerInset

    // Calculate synced radius that adapts based on inset level
    const calculateAdaptiveRadius = (
      outerRadius: number,
      inset: number
    ): number => {
      if (inset <= 0) return outerRadius
      if (outerRadius <= 0) return 0

      // Calculate the basic inner radius
      const basicInner = outerRadius - inset

      // If inset is small relative to radius, use simple subtraction
      const insetRatio = inset / outerRadius

      if (insetRatio <= 0.5) {
        return Math.max(0, basicInner)
      } else {
        const minRadius = outerRadius * 0.25
        const falloff = 1 - (insetRatio - 0.5) * 2
        return Math.max(minRadius * (1 - falloff), basicInner, 0)
      }
    }

    const syncedRadius = calculateAdaptiveRadius(menuBottom, containerInset)

    const menuTop = config.syncMenuContainerRadius
      ? syncedRadius
      : (config.menuTopBorderRadius ?? 0)
    const containerBottom = config.syncMenuContainerRadius
      ? syncedRadius
      : (config.menuContainerBottomRadius ?? menuBottom)

    return {
      // Backdrop outer radius
      backdrop: `${top}px ${top}px ${menuBottom}px ${menuBottom}px`,
      // Menu container (clips gradients)
      menuContainer: `${menuTop}px ${menuTop}px ${containerBottom}px ${containerBottom}px`,
      // Clip-path radii for expanded state
      clipExpanded:
        top !== menuBottom
          ? `${top}px ${top}px ${menuBottom}px ${menuBottom}px`
          : `${base}px`,
      // Clip-path radii for collapsed state
      clipCollapsed: `${base}px`,
      // Raw values for calculations
      raw: { base, top, menuBottom, menuTop, containerBottom, syncedRadius },
    }
  }, [
    config.borderRadius,
    config.topBorderRadius,
    config.menuBorderRadius,
    config.menuTopBorderRadius,
    config.menuContainerBottomRadius,
    config.menuContainerInset,
    config.syncMenuContainerRadius,
  ])

  // Effective gradient insets - synced to scrollbar margins when enabled
  const gradientInsets = useMemo(() => {
    if (config.syncGradientToScrollbar) {
      return {
        top: config.scrollbarMarginTop,
        bottom: config.scrollbarMarginBottom,
        left: config.gradientInsetLeft ?? 0,
        right: config.gradientInsetRight ?? 0,
      }
    }
    return {
      top: config.gradientInsetTop ?? 0,
      bottom: config.gradientInsetBottom ?? 0,
      left: config.gradientInsetLeft ?? 0,
      right: config.gradientInsetRight ?? 0,
    }
  }, [
    config.syncGradientToScrollbar,
    config.scrollbarMarginTop,
    config.scrollbarMarginBottom,
    config.gradientInsetTop,
    config.gradientInsetBottom,
    config.gradientInsetLeft,
    config.gradientInsetRight,
  ])

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleExpandedChange = useCallback(
    (newExpanded: boolean) => {
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)

      if (!newExpanded) {
        // Reset filter when closing
        setFilter('')
        listRef.current?.resetHighlight()
      }
    },
    [onExpandedChange]
  )

  const handleInputFocus = useCallback(() => {
    handleExpandedChange(true)
  }, [handleExpandedChange])

  const handleInputBlur = useCallback(
    (e: React.FocusEvent) => {
      // Don't close if clicking inside the container
      if (containerRef.current?.contains(e.relatedTarget as Node)) {
        return
      }
      // Small delay to allow item click to register
      setTimeout(() => {
        handleExpandedChange(false)
      }, 150)
    },
    [handleExpandedChange]
  )

  const handleEscape = useCallback(() => {
    handleExpandedChange(false)
    inputRef.current?.blur()
  }, [handleExpandedChange])

  const handleArrowDown = useCallback(() => {
    listRef.current?.highlightNext()
  }, [])

  const handleSelect = useCallback(
    (item: CommandItemAction) => {
      onSelect?.(item)
      handleExpandedChange(false)
      inputRef.current?.blur()
    },
    [onSelect, handleExpandedChange]
  )

  // Handle keyboard navigation when expanded
  useEffect(() => {
    if (!expanded) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          listRef.current?.highlightNext()
          break
        case 'ArrowUp':
          e.preventDefault()
          listRef.current?.highlightPrev()
          break
        case 'Enter':
          e.preventDefault()
          listRef.current?.selectHighlighted()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [expanded])

  // Click outside to close
  useEffect(() => {
    if (!expanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleExpandedChange(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [expanded, handleExpandedChange])

  // ---------------------------------------------------------------------------
  // Animation Values
  // ---------------------------------------------------------------------------

  const clipPath = getClipPath(
    expanded,
    config.panelWidth,
    panelHeight,
    config.inputWidth,
    config.inputHeight,
    radii.clipExpanded,
    radii.clipCollapsed
  )

  const transitionDuration = expanded ? config.duration : config.collapseDuration

  // ---------------------------------------------------------------------------
  // Styling
  // ---------------------------------------------------------------------------

  const popupClasses = useMemo(
    () => getPopupClasses(config.appearance),
    [config.appearance]
  )

  const gradientStyles = useMemo(
    () => getGradientStyles(config.appearance),
    [config.appearance]
  )

  // Backdrop positioning (center anchor)
  const backdropWidth = expanded ? config.panelWidth : config.inputWidth
  const backdropMarginLeft = -(backdropWidth / 2)

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', className)}
      style={{ width: config.inputWidth, height: config.inputHeight }}
    >
      {/* Hover Detection Layer - CSS-only, no state re-renders */}
      <div
        className="absolute peer/trigger"
        style={{
          zIndex: 12,
          top: 0,
          left: 0,
          width: config.inputWidth,
          height: config.inputHeight,
          pointerEvents: expanded ? 'none' : 'auto',
          cursor: 'text',
        }}
        onClick={() => inputRef.current?.focus()}
      />

      {/* Backdrop Layer - animates SIZE for shine/shadow */}
      <div
        className={cn(
          'absolute motion-reduce:transition-none',
          // Hover effects (compositor-only: transform + opacity)
          'peer-hover/trigger:scale-[1.02] peer-hover/trigger:brightness-105',
          popupClasses
        )}
        style={{
          ...gradientStyles,
          zIndex: 10,
          // Extend upward when expanded using backdropTopOffset
          top: expanded ? -config.backdropTopOffset : 0,
          left: '50%',
          marginLeft: backdropMarginLeft,
          width: backdropWidth,
          // Add backdropTopOffset to height when expanded
          height: expanded
            ? panelHeight + config.backdropTopOffset
            : config.inputHeight,
          borderRadius: radii.backdrop,
          transformOrigin: 'center center',
          transition: `top ${transitionDuration}ms ${EASING_EXPO_OUT}, width ${transitionDuration}ms ${EASING_EXPO_OUT}, height ${transitionDuration}ms ${EASING_EXPO_OUT}, margin-left ${transitionDuration}ms ${EASING_EXPO_OUT}, transform 150ms ease-out, filter 150ms ease-out`,
          pointerEvents: 'none',
        }}
      />

      {/* Content Layer - uses CLIP-PATH for smooth reveal */}
      <div
        className="absolute motion-reduce:transition-none"
        style={{
          zIndex: 11,
          top: 0,
          left: '50%',
          marginLeft: -(config.panelWidth / 2),
          width: config.panelWidth,
          height: panelHeight,
          clipPath,
          transition: `clip-path ${transitionDuration}ms ${EASING_EXPO_OUT}, height ${transitionDuration}ms ${EASING_EXPO_OUT}`,
          pointerEvents: expanded ? 'auto' : 'none',
          '--menu-item-radius': `${itemRadius}px`,
        } as React.CSSProperties}
      >
        {/* Input Trigger - centered without transform */}
        <div
          className={cn(
            'absolute flex items-center group/trigger',
            'transition-all duration-150',
            expanded && getBackgroundClass(config.inputBackground)
          )}
          style={{
            top: 0,
            left: expanded ? 0 : (config.panelWidth - config.inputWidth) / 2,
            width: expanded ? config.panelWidth : config.inputWidth,
            height: expanded
              ? config.inputHeight + config.inputTopPaddingExpanded
              : config.inputHeight,
            paddingLeft: expanded ? 12 + config.inputPaddingExpanded : 12,
            paddingRight: expanded ? 12 + config.inputPaddingExpanded : 12,
            paddingTop: expanded ? config.inputTopPaddingExpanded : 0,
            pointerEvents: 'auto',
            transition: `left ${transitionDuration}ms ${EASING_EXPO_OUT}, width ${transitionDuration}ms ${EASING_EXPO_OUT}, height ${transitionDuration}ms ${EASING_EXPO_OUT}, padding ${transitionDuration}ms ${EASING_EXPO_OUT}, background-color 150ms ease`,
          }}
        >
          <CommandInput
            ref={inputRef}
            value={filter}
            onChange={setFilter}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onEscape={handleEscape}
            onArrowDown={handleArrowDown}
            placeholder={config.placeholder}
            isExpanded={expanded}
          />
        </div>

        {/* Content Wrapper - Scrollable menu area */}
        <div
          className="absolute left-0 right-0"
          style={{
            top:
              config.inputHeight +
              config.inputTopPaddingExpanded +
              config.contentTopOffset,
            bottom: config.contentBottomOffset,
            opacity: expanded ? 1 : 0,
            transition: expanded
              ? `opacity ${config.contentFadeDuration}ms ${EASING_EXPO_OUT} ${config.contentFadeDelay}ms, top ${transitionDuration}ms ${EASING_EXPO_OUT}`
              : 'opacity 0ms',
          }}
        >
          {/* Menu container - overflow:hidden clips gradients to squircle shape */}
          <div
            className={cn(
              'absolute overflow-hidden',
              config.appearance.squircle && 'corner-squircle',
              // Apply background to the menu container (red) so it follows inset
              getBackgroundClass(config.menuBackground)
            )}
            style={{
              top: config.menuContainerInset,
              bottom: config.menuContainerInset,
              left: config.menuContainerInset,
              right: config.menuContainerInset,
              borderRadius: radii.menuContainer,
              // Menu border
              ...(config.menuBorderWidth &&
                config.menuBorderWidth > 0 && {
                  borderWidth: config.menuBorderWidth,
                  borderStyle: 'solid',
                  borderColor: `var(--color-border-${config.menuBorderColor ?? 'secondary'})`,
                }),
              // Debug: red border for menu container
              ...(config.debug && {
                outline: '2px solid red',
                outlineOffset: '-2px',
              }),
            }}
          >
            {/* Scroll container - gutter stable reserves scrollbar space */}
            <div
              className="overflow-y-auto scrollbar-overlay"
              style={{
                scrollbarGutter: 'stable',
                // Margin pushes the scrollbar track inward
                marginTop: config.scrollbarMarginTop,
                marginBottom: config.scrollbarMarginBottom,
                // Height accounts for margins
                height: `calc(100% - ${config.scrollbarMarginTop + config.scrollbarMarginBottom}px)`,
                // Separate top/bottom padding for scroll area clearance
                paddingTop: config.innerPaddingTop + config.scrollPaddingTop,
                paddingBottom:
                  config.innerPaddingBottom + config.scrollPaddingBottom,
                // Debug: blue background for scroll container
                ...(config.debug && {
                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                }),
              }}
            >
              {/* Inner content wrapper - horizontal padding applied here */}
              <div
                style={{
                  paddingLeft: config.innerPaddingLeft,
                  paddingRight: config.innerPaddingRight,
                  // Debug: green background for inner content
                  ...(config.debug && {
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  }),
                }}
              >
                <CommandList
                  ref={listRef}
                  groups={groups}
                  filter={filter}
                  onSelect={handleSelect}
                  itemHeight={config.itemHeight}
                  itemGap={config.itemGap}
                  emptyMessage={config.emptyStateMessage}
                />
              </div>
            </div>

            {/* Overflow Gradient - Top (clipped by parent overflow:hidden) */}
            {config.menuOverflowGradient && (
              <>
                {/* Debug: show full gradient area (no inset) in pink */}
                {config.debug && (
                  <div
                    className="pointer-events-none absolute"
                    style={{
                      top: 0,
                      left: 0,
                      right: 0,
                      height: config.menuOverflowGradientHeight,
                      backgroundColor: 'rgba(236, 72, 153, 0.3)',
                      border: '1px dashed rgba(236, 72, 153, 0.8)',
                    }}
                  />
                )}
                <div
                  className="pointer-events-none absolute"
                  style={{
                    top: gradientInsets.top,
                    left: gradientInsets.left,
                    right: gradientInsets.right,
                    height: config.menuOverflowGradientHeight,
                    background: config.debug
                      ? 'rgba(251, 191, 36, 0.5)'
                      : `linear-gradient(to bottom, var(--color-bg-${config.menuBackground === 'none' ? 'primary' : config.menuBackground}) 0%, transparent 100%)`,
                  }}
                />
              </>
            )}

            {/* Overflow Gradient - Bottom (clipped by parent overflow:hidden) */}
            {config.menuOverflowGradient && (
              <>
                {/* Debug: show full gradient area (no inset) in pink */}
                {config.debug && (
                  <div
                    className="pointer-events-none absolute"
                    style={{
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: config.menuOverflowGradientHeight,
                      backgroundColor: 'rgba(236, 72, 153, 0.3)',
                      border: '1px dashed rgba(236, 72, 153, 0.8)',
                    }}
                  />
                )}
                <div
                  className="pointer-events-none absolute"
                  style={{
                    bottom: gradientInsets.bottom,
                    left: gradientInsets.left,
                    right: gradientInsets.right,
                    height: config.menuOverflowGradientHeight,
                    background: config.debug
                      ? 'rgba(251, 191, 36, 0.5)'
                      : `linear-gradient(to top, var(--color-bg-${config.menuBackground === 'none' ? 'primary' : config.menuBackground}) 0%, transparent 100%)`,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

BiaxialCommandMenu.displayName = 'BiaxialCommandMenu'
