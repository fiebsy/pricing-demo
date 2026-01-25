/**
 * Biaxial Command Menu V2 - Experimental Animation Sync
 *
 * An expandable search input with synchronized backdrop/content animations.
 * Adds experimental controls for exploring animation timing relationships.
 *
 * Animation Layers:
 * 1. **Backdrop Layer** - Visual effects (shine, shadow, gradient)
 *    - Mode 'size': Animates actual dimensions (original)
 *    - Mode 'clip-path': Uses clip-path for perfect sync with content
 *
 * 2. **Content Layer** - Uses clip-path for smooth reveal
 *
 * 3. **Menu Container** (optional) - Animates the menu area independently
 *
 * @status experimental
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
  BackdropAnimationMode,
} from './types'
import { DEFAULT_COMMAND_CONFIG } from './constants'

// Re-use components from v1
import { CommandInput } from '@/components/ui/prod/base/biaxial-command-menu/components/command-input'
import {
  CommandList,
  type CommandListRef,
} from '@/components/ui/prod/base/biaxial-command-menu/components/command-list'

// ============================================================================
// HELPERS
// ============================================================================

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

function calculatePanelHeight(
  config: CommandMenuConfig,
  itemCount: number,
  groupCount: number,
  isEmpty: boolean
): number {
  const inputHeight = config.inputHeight + config.inputTopPaddingExpanded

  if (isEmpty) {
    const emptyStateHeight = 80
    const minContentHeight =
      emptyStateHeight + config.innerPaddingTop + config.innerPaddingBottom
    return inputHeight + config.contentTopOffset + minContentHeight
  }

  const itemsHeight = itemCount * config.itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * config.itemGap
  const groupHeadersHeight = groupCount * 28
  const separatorsHeight = Math.max(0, groupCount - 1) * 8
  const padding = config.innerPaddingTop + config.innerPaddingBottom
  const scrollPadding = config.scrollPaddingTop + config.scrollPaddingBottom

  const contentHeight =
    itemsHeight +
    gapsHeight +
    groupHeadersHeight +
    separatorsHeight +
    padding +
    scrollPadding

  const calculatedHeight = inputHeight + config.contentTopOffset + contentHeight

  return Math.min(calculatedHeight, config.maxPanelHeight)
}

/**
 * Get clip-path for biaxial animation (center anchor)
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

  const sideInset = (panelWidth - inputWidth) / 2
  const bottomInset = panelHeight - inputHeight

  return `inset(0 ${sideInset}px ${bottomInset}px ${sideInset}px round ${collapsedRadius})`
}

/**
 * Get clip-path for backdrop in clip-path mode
 * Similar to content clip-path but can include scale offset
 */
function getBackdropClipPath(
  expanded: boolean,
  panelWidth: number,
  panelHeight: number,
  inputWidth: number,
  inputHeight: number,
  expandedRadius: string,
  collapsedRadius: string,
  backdropTopOffset: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${expandedRadius})`
  }

  // Calculate insets to show only the input area
  const sideInset = (panelWidth - inputWidth) / 2
  // Account for backdropTopOffset in collapsed state
  const topInset = backdropTopOffset
  const bottomInset = panelHeight + backdropTopOffset - inputHeight

  return `inset(${topInset}px ${sideInset}px ${bottomInset}px ${sideInset}px round ${collapsedRadius})`
}

/**
 * Get clip-path for menu container biaxial animation
 * Expands from specified origin (top, center, bottom)
 *
 * NOTE: We don't use `round` in clip-path because it creates standard
 * circular corners that conflict with the element's borderRadius and
 * corner-squircle class. The element's own border-radius handles corners.
 */
function getMenuContainerClipPath(
  expanded: boolean,
  origin: 'top' | 'center' | 'bottom'
): string {
  if (expanded) {
    // No round - let borderRadius and corner-squircle handle corners
    return `inset(0 0 0 0)`
  }

  // Collapsed state - insets based on origin
  switch (origin) {
    case 'top':
      // Expand downward from top: collapse bottom inset to 100%
      return `inset(0 0 100% 0)`
    case 'bottom':
      // Expand upward from bottom: collapse top inset to 100%
      return `inset(100% 0 0 0)`
    case 'center':
    default:
      // Expand from center: collapse all insets to 50%
      return `inset(50% 0 50% 0)`
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export const BiaxialCommandMenuV2: React.FC<CommandMenuProps> = ({
  groups,
  config: userConfig,
  expanded: controlledExpanded,
  onExpandedChange,
  onSelect,
  className,
}) => {
  const config = useMemo(
    () => ({ ...DEFAULT_COMMAND_CONFIG, ...userConfig }),
    [userConfig]
  )

  const [internalExpanded, setInternalExpanded] = useState(false)
  const [filter, setFilter] = useState('')

  const expanded = controlledExpanded ?? internalExpanded
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<CommandListRef>(null)

  const filteredGroups = useMemo(
    () => filterGroups(groups, filter),
    [groups, filter]
  )

  const filteredItemCount = filteredGroups.reduce(
    (sum, g) => sum + g.items.filter((i) => i.type !== 'separator').length,
    0
  )
  const filteredGroupCount = filteredGroups.length
  const isEmpty = filteredGroupCount === 0

  const panelHeight = calculatePanelHeight(
    config,
    filteredItemCount,
    filteredGroupCount,
    isEmpty
  )

  const itemRadius = useMemo(
    () =>
      Math.max(
        0,
        config.borderRadius -
          Math.min(config.innerPaddingLeft, config.innerPaddingRight)
      ),
    [config.borderRadius, config.innerPaddingLeft, config.innerPaddingRight]
  )

  // Consolidated border radius calculations
  const radii = useMemo(() => {
    const base = config.borderRadius
    const top = config.topBorderRadius ?? base
    const menuBottom = config.menuBorderRadius ?? base
    const containerInset = config.menuContainerInset

    const calculateAdaptiveRadius = (
      outerRadius: number,
      inset: number
    ): number => {
      if (inset <= 0) return outerRadius
      if (outerRadius <= 0) return 0

      const basicInner = outerRadius - inset
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
      backdrop: `${top}px ${top}px ${menuBottom}px ${menuBottom}px`,
      menuContainer: `${menuTop}px ${menuTop}px ${containerBottom}px ${containerBottom}px`,
      clipExpanded:
        top !== menuBottom
          ? `${top}px ${top}px ${menuBottom}px ${menuBottom}px`
          : `${base}px`,
      clipCollapsed: `${base}px`,
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
  // Animation Sync Configuration (V2)
  // ---------------------------------------------------------------------------

  const animSync = config.animationSync

  // Calculate backdrop-specific timing
  const backdropDuration = expanded
    ? config.duration + animSync.backdropDurationOffset
    : config.collapseDuration + animSync.backdropDurationOffset

  const backdropDelay = animSync.backdropDelay

  // Calculate menu container timing
  const menuContainerDuration = expanded
    ? config.duration + animSync.menuContainerDurationOffset
    : config.collapseDuration + animSync.menuContainerDurationOffset

  const menuContainerDelay = animSync.menuContainerDelay

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleExpandedChange = useCallback(
    (newExpanded: boolean) => {
      setInternalExpanded(newExpanded)
      onExpandedChange?.(newExpanded)

      if (!newExpanded) {
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
      if (containerRef.current?.contains(e.relatedTarget as Node)) {
        return
      }
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

  const transitionDuration = expanded ? config.duration : config.collapseDuration

  // Content layer clip-path (unchanged from v1)
  const contentClipPath = getClipPath(
    expanded,
    config.panelWidth,
    panelHeight,
    config.inputWidth,
    config.inputHeight,
    radii.clipExpanded,
    radii.clipCollapsed
  )

  // Backdrop clip-path (for clip-path mode)
  const backdropClipPath = getBackdropClipPath(
    expanded,
    config.panelWidth,
    panelHeight + config.backdropTopOffset,
    config.inputWidth,
    config.inputHeight,
    radii.clipExpanded,
    radii.clipCollapsed,
    config.backdropTopOffset
  )

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

  // Backdrop positioning for size mode
  const backdropWidth = expanded ? config.panelWidth : config.inputWidth
  const backdropMarginLeft = -(backdropWidth / 2)

  // ---------------------------------------------------------------------------
  // Render Backdrop based on animation mode
  // ---------------------------------------------------------------------------

  const renderBackdrop = () => {
    if (animSync.backdropMode === 'clip-path') {
      // Clip-path mode: backdrop is always full size, revealed via clip-path
      return (
        <div
          className={cn('absolute', 'motion-reduce:transition-none', popupClasses)}
          style={{
            ...gradientStyles,
            zIndex: 10,
            top: -config.backdropTopOffset,
            left: '50%',
            marginLeft: -(config.panelWidth / 2),
            width: config.panelWidth,
            height: panelHeight + config.backdropTopOffset,
            borderRadius: radii.backdrop,
            clipPath: backdropClipPath,
            transition: `clip-path ${backdropDuration}ms ${EASING_EXPO_OUT} ${backdropDelay}ms`,
            pointerEvents: 'none',
          }}
        />
      )
    }

    // Size mode (original): backdrop animates dimensions
    return (
      <div
        className={cn('absolute', 'motion-reduce:transition-none', popupClasses)}
        style={{
          ...gradientStyles,
          zIndex: 10,
          top: expanded ? -config.backdropTopOffset : 0,
          left: '50%',
          marginLeft: backdropMarginLeft,
          width: backdropWidth,
          height: expanded
            ? panelHeight + config.backdropTopOffset
            : config.inputHeight,
          borderRadius: radii.backdrop,
          transition: `top ${backdropDuration}ms ${EASING_EXPO_OUT} ${backdropDelay}ms, width ${backdropDuration}ms ${EASING_EXPO_OUT} ${backdropDelay}ms, height ${backdropDuration}ms ${EASING_EXPO_OUT} ${backdropDelay}ms, margin-left ${backdropDuration}ms ${EASING_EXPO_OUT} ${backdropDelay}ms`,
          pointerEvents: 'none',
        }}
      />
    )
  }

  // ---------------------------------------------------------------------------
  // Render Menu Container (with optional animation)
  // ---------------------------------------------------------------------------

  const renderMenuContainer = () => {
    const baseStyles = {
      top: config.menuContainerInset,
      bottom: config.menuContainerInset,
      left: config.menuContainerInset,
      right: config.menuContainerInset,
      borderRadius: radii.menuContainer,
      ...(config.menuBorderWidth &&
        config.menuBorderWidth > 0 && {
          borderWidth: config.menuBorderWidth,
          borderStyle: 'solid' as const,
          borderColor: `var(--color-border-${config.menuBorderColor ?? 'secondary'})`,
        }),
      ...(config.debug && {
        outline: '2px solid red',
        outlineOffset: '-2px',
      }),
    }

    // If menu container animation is enabled - use clip-path for true biaxial expansion
    if (animSync.animateMenuContainer) {
      const menuClipPath = getMenuContainerClipPath(
        expanded,
        animSync.expandOrigin
      )

      return (
        <div
          className={cn(
            'absolute overflow-hidden',
            config.appearance.squircle && 'corner-squircle',
            getBackgroundClass(config.menuBackground)
          )}
          style={{
            ...baseStyles,
            clipPath: menuClipPath,
            transition: `clip-path ${menuContainerDuration}ms ${EASING_EXPO_OUT} ${menuContainerDelay}ms`,
          }}
        >
          {renderMenuContent()}
        </div>
      )
    }

    // Default: no animation on menu container
    return (
      <div
        className={cn(
          'absolute overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          getBackgroundClass(config.menuBackground)
        )}
        style={baseStyles}
      >
        {renderMenuContent()}
      </div>
    )
  }

  const renderMenuContent = () => (
    <>
      {/* Scroll container */}
      <div
        className="overflow-y-auto scrollbar-overlay"
        style={{
          scrollbarGutter: 'stable',
          marginTop: config.scrollbarMarginTop,
          marginBottom: config.scrollbarMarginBottom,
          height: `calc(100% - ${config.scrollbarMarginTop + config.scrollbarMarginBottom}px)`,
          paddingTop: config.innerPaddingTop + config.scrollPaddingTop,
          paddingBottom: config.innerPaddingBottom + config.scrollPaddingBottom,
          ...(config.debug && {
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
          }),
        }}
      >
        <div
          style={{
            paddingLeft: config.innerPaddingLeft,
            paddingRight: config.innerPaddingRight,
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
            itemsTopGap={config.itemsTopGap}
            emptyMessage={config.emptyStateMessage}
          />
        </div>
      </div>

      {/* Overflow Gradients */}
      {config.menuOverflowGradient && (
        <>
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
    </>
  )

  // ---------------------------------------------------------------------------
  // Main Render
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', className)}
      style={{ width: config.inputWidth, height: config.inputHeight }}
    >
      {/* Backdrop Layer */}
      {renderBackdrop()}

      {/* Content Layer - uses clip-path for smooth reveal */}
      <div
        className="absolute motion-reduce:transition-none"
        style={{
          zIndex: 11,
          top: 0,
          left: '50%',
          marginLeft: -(config.panelWidth / 2),
          width: config.panelWidth,
          height: panelHeight,
          clipPath: contentClipPath,
          transition: `clip-path ${transitionDuration}ms ${EASING_EXPO_OUT}, height ${transitionDuration}ms ${EASING_EXPO_OUT}`,
          pointerEvents: expanded ? 'auto' : 'none',
          '--menu-item-radius': `${itemRadius}px`,
        } as React.CSSProperties}
      >
        {/* Input Trigger */}
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

        {/* Content Wrapper */}
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
          {renderMenuContainer()}
        </div>
      </div>
    </div>
  )
}

BiaxialCommandMenuV2.displayName = 'BiaxialCommandMenuV2'
