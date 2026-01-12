/**
 * FilterChip - Simplified wrapper for ExpandingFilterChip
 *
 * This is the recommended way to use filter chips. It combines:
 * - ExpandingFilterChip (the core chip component)
 * - AnimatedChipWrapper (fade-in animation on mount)
 * - buildChipClassFromConfig (automatic className from config)
 *
 * All defaults are applied automatically from DEFAULT_CHIP_STYLE.
 *
 * @module base-ui/filter/components/filter-chip
 *
 * @example Basic usage (recommended)
 * ```tsx
 * import { FilterChip } from '@/components/ui/filter'
 * import { CheckmarkCircle02Icon } from '@hugeicons-pro/core-stroke-rounded'
 *
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => handleRemove(id)}
 * />
 * ```
 *
 * @example With label instead of icon
 * ```tsx
 * <FilterChip
 *   label="Status"
 *   value="Active"
 *   onRemove={() => handleRemove(id)}
 * />
 * ```
 *
 * @example Small size preset
 * ```tsx
 * <FilterChip
 *   preset="small"
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => handleRemove(id)}
 * />
 * ```
 *
 * @example Custom config override
 * ```tsx
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   chipConfig={{ size: 'lg', rounded: 'md' }}
 *   onRemove={() => handleRemove(id)}
 * />
 * ```
 */

'use client'

import { ExpandingFilterChip } from './expanding-filter-chip'
import { AnimatedChipWrapper } from './animated-chip-wrapper'
import { DEFAULT_CHIP_STYLE, CHIP_STYLE_PRESETS, getChipStylePreset } from '../config'
import { buildChipClassFromConfig } from '../utils/build-chip-class'
import type { ChipStyleConfig, HugeIconComponent } from '../types'

// Close icon imports
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Hugeicons imports work at runtime
import CancelCircleBulkIcon from '@hugeicons-pro/core-bulk-rounded/CancelCircleIcon'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Hugeicons imports work at runtime
import CancelCircleSolidIcon from '@hugeicons-pro/core-solid-rounded/CancelCircleIcon'

// Close icon mapping
const CLOSE_ICON_MAP = {
  multiplication: undefined, // uses default MultiplicationSignIcon
  'cancel-solid': CancelCircleSolidIcon as HugeIconComponent,
  'cancel-bulk': CancelCircleBulkIcon as HugeIconComponent,
} as const

// ============================================================================
// Types
// ============================================================================

export interface FilterChipProps {
  /**
   * Filter value text (e.g., "Active", "Completed")
   * This is the text revealed when the chip expands
   */
  value: string

  /**
   * Icon to display in the chip (recommended)
   * Takes precedence over label
   */
  icon?: HugeIconComponent

  /**
   * Text label to display if no icon provided
   * Shown with a colon (e.g., "Status:")
   */
  label?: string

  /**
   * Called when the remove/close button is clicked
   * If not provided, close button is not shown
   */
  onRemove?: () => void

  /**
   * Style preset to use
   * - 'default': Standard size (32px height)
   * - 'small': Compact size (28px height)
   *
   * @default 'default'
   */
  preset?: 'default' | 'small'

  /**
   * Custom config overrides
   * Merges with preset config (overrides take precedence)
   *
   * @example { size: 'lg', rounded: 'md' }
   */
  chipConfig?: Partial<ChipStyleConfig>

  /**
   * Whether to start in expanded state
   * Set to false (default) to see the expand animation on mount
   * @default false
   */
  defaultExpanded?: boolean

  /**
   * Controlled expanded state (makes component controlled)
   */
  expanded?: boolean

  /**
   * Called when expanded state changes
   */
  onExpandedChange?: (expanded: boolean) => void

  /**
   * Disable the scale animation on mount
   * @default false (uses preset value)
   */
  noScaleAnimation?: boolean

  /**
   * Additional CSS classes to apply
   */
  className?: string
}

// ============================================================================
// Component
// ============================================================================

/**
 * FilterChip - The simple, recommended way to use filter chips
 *
 * Combines ExpandingFilterChip + AnimatedChipWrapper with all defaults applied.
 * Just pass icon/label, value, and onRemove.
 */
export const FilterChip: React.FC<FilterChipProps> = ({
  value,
  icon,
  label,
  onRemove,
  preset = 'default',
  chipConfig,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  noScaleAnimation,
  className,
}) => {
  // Get preset config, then merge with custom overrides
  const presetConfig = getChipStylePreset(preset)?.config ?? DEFAULT_CHIP_STYLE
  const config = { ...presetConfig, ...chipConfig }

  // Build className from config + any custom classes
  const chipClassName = [buildChipClassFromConfig(config), className].filter(Boolean).join(' ')

  // Resolve animation settings
  const shouldNoScale = noScaleAnimation ?? config.noScaleAnimation

  return (
    <AnimatedChipWrapper duration={config.duration} noScale={shouldNoScale}>
      <ExpandingFilterChip
        // Content
        icon={config.useIcon ? icon : undefined}
        label={config.useIcon ? undefined : label}
        value={value}
        onRemove={onRemove}
        // Animation
        defaultExpanded={defaultExpanded}
        expanded={expanded}
        onExpandedChange={onExpandedChange}
        duration={config.duration}
        revealMode={config.revealMode}
        opacityFadeRatio={config.opacityFadeRatio}
        // Sizing (from config)
        size={config.size}
        rounded={config.rounded}
        gap={config.gap}
        // Custom spacing (from config)
        customPaddingLeft={config.paddingLeft}
        customPaddingRight={config.paddingRight}
        customIconValueGap={config.iconValueGap}
        customItemGap={config.itemGap}
        customIconSize={config.iconSize}
        customCloseIconSize={config.closeIconSize}
        // Close icon
        closeIcon={CLOSE_ICON_MAP[config.closeIconType]}
        // Icon opacity (config is 0-100, prop expects 0-1)
        leftIconOpacity={config.leftIconOpacity / 100}
        // Styling
        className={chipClassName}
      />
    </AnimatedChipWrapper>
  )
}

FilterChip.displayName = 'FilterChip'
