"use strict";
/**
 * Expanding Filter Chip Component
 *
 * A filter chip that expands horizontally from a compact icon/label state.
 * The icon stays fixed at the left while the value area slides in.
 *
 * @module base-ui/filter/components/expanding-filter-chip
 */
'use client';
/**
 * Expanding Filter Chip Component
 *
 * A filter chip that expands horizontally from a compact icon/label state.
 * The icon stays fixed at the left while the value area slides in.
 *
 * @module base-ui/filter/components/expanding-filter-chip
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingFilterChip = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const constants_1 = require("../../constants");
const config_1 = require("../../config");
const primitives_1 = require("../../primitives");
const use_chip_measurement_1 = require("./use-chip-measurement");
const use_chip_animation_1 = require("./use-chip-animation");
// ============================================================================
// Background Mapping
// ============================================================================
const BACKGROUND_CLASSES = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    quaternary: 'bg-quaternary',
    'brand-solid': 'bg-brand-solid',
    'brand-primary': 'bg-brand-primary',
    'brand-secondary': 'bg-brand-secondary',
    'error-primary': 'bg-error-primary',
    'warning-primary': 'bg-warning-primary',
    'success-primary': 'bg-success-primary',
};
// ============================================================================
// Component
// ============================================================================
const ExpandingFilterChip = ({ label, icon, value, onRemove, duration, defaultExpanded, expanded, onExpandedChange, revealMode, opacityFadeRatio, chipConfig, size, rounded, gap, className, customPaddingX, customPaddingLeft, customPaddingRight, customItemGap, customIconValueGap, customIconSize, customCloseIconSize, closeIcon, closeIconStrokeWidth, leftIconOpacity, }) => {
    const containerRef = (0, react_1.useRef)(null);
    // Merge chipConfig with DEFAULT_CHIP_STYLE (chipConfig overrides defaults)
    const mergedConfig = { ...config_1.DEFAULT_CHIP_STYLE, ...chipConfig };
    // Props override chipConfig which overrides DEFAULT_CHIP_STYLE
    const resolvedSize = size ?? mergedConfig.size;
    const resolvedRounded = rounded ?? mergedConfig.rounded;
    const resolvedGap = gap ?? mergedConfig.gap;
    const sizeConfig = constants_1.SIZE_CONFIG[resolvedSize];
    const roundingClass = constants_1.ROUNDING_CONFIG[resolvedRounded];
    const gapValue = constants_1.GAP_CONFIG[resolvedGap];
    const backgroundClass = BACKGROUND_CLASSES[mergedConfig.background] || 'bg-secondary';
    const hasIcon = !!icon;
    // Derived values - props override chipConfig, chipConfig overrides SIZE_CONFIG/GAP_CONFIG
    const basePaddingX = customPaddingX ?? sizeConfig.paddingX;
    const paddingLeft = customPaddingLeft ?? mergedConfig.paddingLeft ?? basePaddingX;
    const paddingRight = customPaddingRight ?? mergedConfig.paddingRight ?? basePaddingX;
    const itemGap = customItemGap ?? mergedConfig.itemGap ?? gapValue;
    const iconValueGap = customIconValueGap ?? mergedConfig.iconValueGap ?? gapValue;
    const iconSize = customIconSize ?? mergedConfig.iconSize ?? sizeConfig.iconSize;
    const closeIconSize = customCloseIconSize ?? mergedConfig.closeIconSize ?? sizeConfig.closeIconSize;
    // leftIconOpacity: prop is 0-1, config is 0-100, convert config to 0-1 scale
    const resolvedLeftIconOpacity = leftIconOpacity ?? (mergedConfig.leftIconOpacity / 100);
    // Animation hook
    const animation = (0, use_chip_animation_1.useChipAnimation)({
        defaultExpanded,
        expanded,
        onExpandedChange,
        duration,
        revealMode,
        opacityFadeRatio,
    });
    // Measurement hook
    const measurement = (0, use_chip_measurement_1.useChipMeasurement)([label, icon, value, onRemove, size, gap]);
    const handleRemove = (0, react_1.useCallback)(() => {
        onRemove?.();
    }, [onRemove]);
    const handleTransitionEnd = (0, react_1.useCallback)((e) => {
        if (e.target === containerRef.current) {
            animation.handleTransitionEnd(e);
        }
    }, [animation]);
    const currentWidth = animation.isExpanded ? measurement.expandedWidth : measurement.collapsedWidth;
    // Render the icon or label content
    const renderIconOrLabel = () => {
        if (hasIcon) {
            return (<icon_1.HugeIcon icon={icon} size={iconSize} strokeWidth={2} className="text-tertiary flex-shrink-0" style={{ opacity: resolvedLeftIconOpacity }}/>);
        }
        return (<span className={(0, utils_1.cn)(sizeConfig.textClass, 'font-medium text-tertiary whitespace-nowrap')} style={{ opacity: resolvedLeftIconOpacity }}>
        {label}:
      </span>);
    };
    return (<div className="relative inline-block">
      {/* Hidden measurement element */}
      <div ref={measurement.refs.measureRef} aria-hidden="true" className={(0, utils_1.cn)('inline-flex items-center', backgroundClass, 'border border-primary', roundingClass, 'whitespace-nowrap')} style={{
            visibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            height: sizeConfig.height,
            paddingLeft,
            paddingRight,
        }}>
        <span ref={measurement.refs.iconLabelMeasureRef} className="inline-flex items-center" style={{
            height: sizeConfig.height,
            paddingLeft,
            marginLeft: -paddingLeft,
        }}>
          {renderIconOrLabel()}
        </span>
        <span className={(0, utils_1.cn)(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')} style={{ marginLeft: iconValueGap }}>
          {value}
        </span>
        {onRemove && (<span className="flex-shrink-0 flex items-center justify-center" style={{ width: closeIconSize, height: closeIconSize, marginLeft: itemGap }}/>)}
      </div>

      {/* Visible animated container */}
      <div ref={containerRef} onClick={!animation.isExpanded ? animation.handleToggle : undefined} onTransitionEnd={handleTransitionEnd} className={(0, utils_1.cn)('relative overflow-hidden', backgroundClass, 'border border-primary', roundingClass, 'motion-reduce:transition-none', !animation.isExpanded && 'cursor-pointer', className)} style={{
            width: currentWidth || 'auto',
            height: sizeConfig.height,
            transition: animation.getContainerTransition(),
        }}>
        {/* Icon/Label - absolutely positioned, never moves */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center" style={{
            width: measurement.collapsedWidth,
            paddingLeft,
        }}>
          {renderIconOrLabel()}
        </div>

        {/* Value area - revealed as container expands */}
        <div className="absolute top-0 bottom-0 right-0 flex items-center" style={{
            left: measurement.collapsedWidth,
            paddingLeft: iconValueGap,
            paddingRight,
            gap: itemGap,
            opacity: animation.getContentOpacity(),
            transition: animation.getContentTransition(),
            pointerEvents: animation.isExpanded ? 'auto' : 'none',
        }}>
          <span className={(0, utils_1.cn)(sizeConfig.textClass, 'font-medium text-primary whitespace-nowrap')}>
            {value}
          </span>

          {onRemove && (<primitives_1.CloseButton onPress={handleRemove} iconSize={closeIconSize} icon={closeIcon} strokeWidth={closeIconStrokeWidth} opacity={animation.getContentOpacity()} transition={animation.getContentTransition()}/>)}
        </div>
      </div>
    </div>);
};
exports.ExpandingFilterChip = ExpandingFilterChip;
exports.ExpandingFilterChip.displayName = 'ExpandingFilterChip';
//# sourceMappingURL=expanding-filter-chip.js.map