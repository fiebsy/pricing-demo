"use strict";
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
'use client';
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterChip = void 0;
const expanding_filter_chip_1 = require("./expanding-filter-chip");
const animated_chip_wrapper_1 = require("./animated-chip-wrapper");
const config_1 = require("../config");
const build_chip_class_1 = require("../utils/build-chip-class");
// Close icon imports
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Hugeicons imports work at runtime
const CancelCircleIcon_1 = require("@hugeicons-pro/core-bulk-rounded/CancelCircleIcon");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Hugeicons imports work at runtime
const CancelCircleIcon_2 = require("@hugeicons-pro/core-solid-rounded/CancelCircleIcon");
// Close icon mapping
const CLOSE_ICON_MAP = {
    multiplication: undefined, // uses default MultiplicationSignIcon
    'cancel-solid': CancelCircleIcon_2.default,
    'cancel-bulk': CancelCircleIcon_1.default,
};
// ============================================================================
// Component
// ============================================================================
/**
 * FilterChip - The simple, recommended way to use filter chips
 *
 * Combines ExpandingFilterChip + AnimatedChipWrapper with all defaults applied.
 * Just pass icon/label, value, and onRemove.
 */
const FilterChip = ({ value, icon, label, onRemove, preset = 'default', chipConfig, defaultExpanded = false, expanded, onExpandedChange, noScaleAnimation, className, }) => {
    // Get preset config, then merge with custom overrides
    const presetConfig = (0, config_1.getChipStylePreset)(preset)?.config ?? config_1.DEFAULT_CHIP_STYLE;
    const config = { ...presetConfig, ...chipConfig };
    // Build className from config + any custom classes
    const chipClassName = [(0, build_chip_class_1.buildChipClassFromConfig)(config), className].filter(Boolean).join(' ');
    // Resolve animation settings
    const shouldNoScale = noScaleAnimation ?? config.noScaleAnimation;
    return (<animated_chip_wrapper_1.AnimatedChipWrapper duration={config.duration} noScale={shouldNoScale}>
      <expanding_filter_chip_1.ExpandingFilterChip 
    // Content
    icon={config.useIcon ? icon : undefined} label={config.useIcon ? undefined : label} value={value} onRemove={onRemove} 
    // Animation
    defaultExpanded={defaultExpanded} expanded={expanded} onExpandedChange={onExpandedChange} duration={config.duration} revealMode={config.revealMode} opacityFadeRatio={config.opacityFadeRatio} 
    // Sizing (from config)
    size={config.size} rounded={config.rounded} gap={config.gap} 
    // Custom spacing (from config)
    customPaddingLeft={config.paddingLeft} customPaddingRight={config.paddingRight} customIconValueGap={config.iconValueGap} customItemGap={config.itemGap} customIconSize={config.iconSize} customCloseIconSize={config.closeIconSize} 
    // Close icon
    closeIcon={CLOSE_ICON_MAP[config.closeIconType]} 
    // Icon opacity (config is 0-100, prop expects 0-1)
    leftIconOpacity={config.leftIconOpacity / 100} 
    // Styling
    className={chipClassName}/>
    </animated_chip_wrapper_1.AnimatedChipWrapper>);
};
exports.FilterChip = FilterChip;
exports.FilterChip.displayName = 'FilterChip';
//# sourceMappingURL=filter-chip.js.map