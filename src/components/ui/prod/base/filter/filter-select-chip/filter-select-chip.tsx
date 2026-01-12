/**
 * FilterSelectChip - Biaxial Animated Filter Dropdown
 *
 * A filter chip that expands into a menu for selecting filter options.
 * Uses the two-layer animation system:
 *
 * 1. **Backdrop Layer** - Animates size with shine/shadow
 * 2. **Content Layer** - Uses clip-path for smooth reveal
 *
 * The trigger (filter chip) retains its exact appearance and entry animation.
 *
 * @module prod/base/filter/filter-select-chip/filter-select-chip
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  getPopupClasses,
  getGradientStyles,
} from '@/components/ui/prod/base/menu/config'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import CancelCircleSolidIcon from '@hugeicons-pro/core-solid-rounded/CancelCircleIcon'

// CSS-driven transitions (S-tier: transform + opacity only)
import './filter-select-chip-transitions.css'

import type { FilterSelectChipProps, FilterSelectChipConfig, OptionListRef } from './types'
import { CHIP_SIZE_CONFIGS, mergeConfig, getFSCCSSVariables } from './config'
import { ChipTrigger, OptionList } from './components'

/** Padding inside menu items (matches px-2.5) */
const MENU_ITEM_PADDING = 10

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Calculate panel height based on options count
 */
function calculatePanelHeight(
  config: FilterSelectChipConfig,
  optionCount: number,
  chipHeight: number
): number {
  const itemsHeight = optionCount * config.itemHeight
  const gapsHeight = Math.max(0, optionCount - 1) * config.itemGap
  const padding = config.innerPadding * 2

  const calculatedHeight =
    config.topExtension + chipHeight + config.contentTopOffset + itemsHeight + gapsHeight + padding

  return Math.min(calculatedHeight, config.maxPanelHeight + chipHeight + config.topExtension)
}

/**
 * Get clip-path for biaxial animation
 *
 * When collapsed, chip is always at left=0 (for entry animation).
 * When expanded with center anchor, panel expands from center.
 */
function getClipPath(
  expanded: boolean,
  panelWidth: number,
  panelHeight: number,
  chipWidth: number,
  chipHeight: number,
  borderRadius: number,
  topExtension: number
): string {
  const round = `round ${borderRadius}px`

  if (expanded) {
    return `inset(0 0 0 0 ${round})`
  }

  // Collapsed - always show chip area from left edge (chip is at left=0 when closed)
  const bottomInset = panelHeight - chipHeight - topExtension
  const topInset = topExtension
  const rightInset = panelWidth - chipWidth

  return `inset(${topInset}px ${rightInset}px ${bottomInset}px 0px ${round})`
}

// ============================================================================
// COMPONENT
// ============================================================================

export const FilterSelectChip: React.FC<FilterSelectChipProps> = ({
  value,
  options,
  disabledOptions = [],
  icon,
  label,
  expandedLabel,
  config: userConfig,
  onChange,
  onRemove,
  triggerMode = 'click',
  hoverOpenDelay = 0,
  hoverCloseDelay = 150,
  className,
}) => {
  // Merge config with defaults
  const config = useMemo(() => mergeConfig(userConfig), [userConfig])

  // State
  const [menuExpanded, setMenuExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<OptionListRef>(null)
  const hoverOpenTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hoverCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Get chip dimensions from size config
  const chipSizeConfig = CHIP_SIZE_CONFIGS[config.chipSize]
  const chipHeight = chipSizeConfig?.height ?? 32

  // Get selected option label for display
  const selectedOption = useMemo(
    () => options.find((o) => o.id === value),
    [options, value]
  )
  const displayValue = selectedOption?.label ?? value

  // Merge disabled options into the options array
  const optionsWithDisabled = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        disabled: option.disabled || disabledOptions.includes(option.id),
      })),
    [options, disabledOptions]
  )

  // Calculate dimensions
  const panelHeight = useMemo(
    () => calculatePanelHeight(config, options.length, chipHeight),
    [config, options.length, chipHeight]
  )

  // Item radius = container radius - padding
  const itemRadius = useMemo(
    () => Math.max(0, config.borderRadius - config.innerPadding),
    [config.borderRadius, config.innerPadding]
  )

  // We need to measure the chip width dynamically
  const [chipWidth, setChipWidth] = useState(100)
  const chipMeasureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chipMeasureRef.current) return

    const measure = () => {
      if (chipMeasureRef.current) {
        setChipWidth(chipMeasureRef.current.offsetWidth)
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(chipMeasureRef.current)

    return () => observer.disconnect()
  }, [displayValue, icon, label, config.chipSize])

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleToggle = useCallback(() => {
    setMenuExpanded((prev) => !prev)
  }, [])

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    if (triggerMode !== 'hover') return

    // Clear any pending close timeout
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current)
      hoverCloseTimeoutRef.current = null
    }

    // Set open timeout
    hoverOpenTimeoutRef.current = setTimeout(() => {
      setMenuExpanded(true)
    }, hoverOpenDelay)
  }, [triggerMode, hoverOpenDelay])

  const handleMouseLeave = useCallback(() => {
    if (triggerMode !== 'hover') return

    // Clear any pending open timeout
    if (hoverOpenTimeoutRef.current) {
      clearTimeout(hoverOpenTimeoutRef.current)
      hoverOpenTimeoutRef.current = null
    }

    // Set close timeout
    hoverCloseTimeoutRef.current = setTimeout(() => {
      setMenuExpanded(false)
    }, hoverCloseDelay)
  }, [triggerMode, hoverCloseDelay])

  // Cleanup hover timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverOpenTimeoutRef.current) clearTimeout(hoverOpenTimeoutRef.current)
      if (hoverCloseTimeoutRef.current) clearTimeout(hoverCloseTimeoutRef.current)
    }
  }, [])

  const handleSelect = useCallback(
    (optionId: string) => {
      onChange?.(optionId)
      setMenuExpanded(false)
    },
    [onChange]
  )

  // Handle keyboard navigation when expanded
  useEffect(() => {
    if (!menuExpanded) return

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
        case 'Escape':
          e.preventDefault()
          setMenuExpanded(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuExpanded])

  // Click outside to close
  useEffect(() => {
    if (!menuExpanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuExpanded])

  // Reset highlight when opening
  useEffect(() => {
    if (menuExpanded) {
      listRef.current?.resetHighlight()
    }
  }, [menuExpanded])

  // ---------------------------------------------------------------------------
  // Animation Values
  // ---------------------------------------------------------------------------

  const clipPath = getClipPath(
    menuExpanded,
    config.minPanelWidth,
    panelHeight,
    chipWidth,
    chipHeight,
    config.borderRadius,
    config.topExtension
  )

  // CSS custom properties for CSS-driven animations
  const cssVariables = useMemo(
    () => getFSCCSSVariables(config, { chipWidth, chipHeight, panelHeight }),
    [config, chipWidth, chipHeight, panelHeight]
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

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={cn('filter-select-chip-container relative inline-block', className)}
      style={{
        ...cssVariables,
        width: chipWidth,
        height: chipHeight,
        zIndex: menuExpanded ? 50 : 'auto',
      }}
      data-fsc-expanded={menuExpanded}
      data-fsc-anchor={config.menuAnchor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden chip measurement element */}
      <div
        ref={chipMeasureRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none"
        style={{ visibility: 'hidden' }}
      >
        <ChipTrigger
          value={displayValue}
          icon={icon}
          label={label}
          expandedLabel={expandedLabel}
          isExpanded={false}
          onClick={() => {}}
          onRemove={onRemove}
          chipSize={config.chipSize}
          chipRounded={config.chipRounded}
          iconSize={config.iconSize}
          iconOpacity={config.iconOpacity}
          iconValueGap={config.iconValueGap}
          paddingLeft={config.paddingLeft}
          paddingRight={config.paddingRight}
          chipDuration={config.chipDuration}
          revealMode={config.revealMode}
          chipExpandAnimation={config.chipExpandAnimation}
        />
      </div>

      {/* Backdrop Layer - CSS-driven size animation */}
      <div
        className={cn(
          'fsc-backdrop',
          popupClasses,
          // Apply squircle corners on open if enabled
          config.squircleOnOpen && menuExpanded && 'corner-squircle'
        )}
        style={gradientStyles}
      />

      {/* Content Layer - uses CLIP-PATH for smooth reveal */}
      <div
        className="fsc-content"
        style={{
          clipPath,
          '--menu-item-radius': `${itemRadius}px`,
        } as React.CSSProperties}
      >
        {/* Chip Trigger - CSS handles center anchor positioning */}
        <div className="fsc-trigger">
          <ChipTrigger
            value={displayValue}
            icon={icon}
            label={label}
            expandedLabel={expandedLabel}
            isExpanded={menuExpanded}
            onClick={handleToggle}
            onRemove={onRemove}
            hideCloseButton={menuExpanded}
            chipSize={config.chipSize}
            chipRounded={config.chipRounded}
            iconSize={config.iconSize}
            iconOpacity={config.iconOpacity}
            iconValueGap={config.iconValueGap}
            paddingLeft={config.paddingLeft}
            paddingRight={config.paddingRight}
            chipDuration={config.chipDuration}
            revealMode={config.revealMode}
            chipExpandAnimation={config.chipExpandAnimation}
          />
        </div>

        {/* Close Button - CSS-driven opacity animation */}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className={cn(
              'fsc-close rounded-full',
              'text-tertiary hover:text-primary',
              'transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand'
            )}
            style={{
              top: config.topExtension + (chipHeight - chipSizeConfig.closeSize) / 2,
              // Align with checkmark center (innerPadding + itemPadding + half icon width)
              right: config.innerPadding + MENU_ITEM_PADDING + 8 - chipSizeConfig.closeSize / 2,
              width: chipSizeConfig.closeSize,
              height: chipSizeConfig.closeSize,
            }}
            aria-label={`Remove ${displayValue} filter`}
          >
            <HugeIcon
              icon={CancelCircleSolidIcon}
              size={chipSizeConfig.closeSize}
              strokeWidth={0}
            />
          </button>
        )}

        {/* Options List - CSS-driven opacity animation */}
        <div
          className="fsc-options"
          style={{
            top: config.topExtension + chipHeight + config.contentTopOffset,
            padding: config.innerPadding,
          }}
        >
          {/* Header Separator */}
          {config.showHeaderSeparator && (
            <div
              className="fsc-separator border-t border-primary -mx-1 mb-1"
              role="separator"
            />
          )}

          <OptionList
            ref={listRef}
            options={optionsWithDisabled}
            selectedId={value}
            onSelect={handleSelect}
            itemHeight={config.itemHeight}
            itemGap={config.itemGap}
            maxHeight={config.maxPanelHeight - chipHeight - config.innerPadding * 2}
            itemSquircle={config.itemSquircle}
          />
        </div>
      </div>
    </div>
  )
}

FilterSelectChip.displayName = 'FilterSelectChip'
