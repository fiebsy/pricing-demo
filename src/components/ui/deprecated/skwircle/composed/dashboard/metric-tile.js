"use strict";
/**
 * Metric Tile Component
 *
 * A composed component for displaying dashboard metrics.
 * Wraps Skwircle.Card with semantic props for metric display.
 *
 * @example Basic usage
 * ```tsx
 * <MetricTile
 *   label="Total Revenue"
 *   value="$45,231"
 *   change="+12.5%"
 *   changeType="positive"
 * />
 * ```
 *
 * @example With period and custom size
 * ```tsx
 * <MetricTile
 *   label="Active Orders"
 *   value="1,284"
 *   change="+8.2%"
 *   changeType="positive"
 *   period="vs last week"
 *   size="lg"
 * />
 * ```
 *
 * @example Override Skwircle props
 * ```tsx
 * <MetricTile
 *   label="Conversion"
 *   value="24.8%"
 *   elevation="sm"
 *   backgroundGradient="depth-10-bottom-right"
 * />
 * ```
 */
'use client';
/**
 * Metric Tile Component
 *
 * A composed component for displaying dashboard metrics.
 * Wraps Skwircle.Card with semantic props for metric display.
 *
 * @example Basic usage
 * ```tsx
 * <MetricTile
 *   label="Total Revenue"
 *   value="$45,231"
 *   change="+12.5%"
 *   changeType="positive"
 * />
 * ```
 *
 * @example With period and custom size
 * ```tsx
 * <MetricTile
 *   label="Active Orders"
 *   value="1,284"
 *   change="+8.2%"
 *   changeType="positive"
 *   period="vs last week"
 *   size="lg"
 * />
 * ```
 *
 * @example Override Skwircle props
 * ```tsx
 * <MetricTile
 *   label="Conversion"
 *   value="24.8%"
 *   elevation="sm"
 *   backgroundGradient="depth-10-bottom-right"
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricTile = void 0;
const React = require("react");
const skwircle_1 = require("@/components/ui/deprecated/skwircle");
const metric_tile_config_1 = require("./metric-tile-config");
// =============================================================================
// COMPONENT
// =============================================================================
const MetricTile = ({ 
// Semantic props
label, value, change, changeType = 'neutral', period, size = 'md', labelClassName, valueClassName, icon, children, 
// Skwircle.Card overrides (with dashboard defaults)
elevation = metric_tile_config_1.METRIC_TILE_DEFAULTS.elevation, roundness = metric_tile_config_1.METRIC_TILE_DEFAULTS.roundness, borderWidth = metric_tile_config_1.METRIC_TILE_DEFAULTS.borderWidth, backgroundGradient = metric_tile_config_1.METRIC_TILE_DEFAULTS.backgroundGradient, fillMode = true, 
// Pass through remaining Skwircle props
...skwircleProps }) => {
    const sizeConfig = metric_tile_config_1.METRIC_TILE_SIZE_CONFIGS[size];
    const changeColor = metric_tile_config_1.CHANGE_TYPE_COLORS[changeType];
    return (<skwircle_1.Skwircle.Card elevation={elevation} roundness={roundness} borderWidth={borderWidth} backgroundGradient={backgroundGradient} fillMode={fillMode} {...skwircleProps}>
      <div className={sizeConfig.padding}>
        {/* Header row with label and optional icon */}
        <div className="flex items-start justify-between">
          <p className={`${sizeConfig.labelClass} text-tertiary ${labelClassName ?? ''}`}>
            {label}
          </p>
          {icon && (<span className="text-tertiary">
              {icon}
            </span>)}
        </div>

        {/* Value */}
        <p className={`${sizeConfig.valueGap} ${sizeConfig.valueClass} text-primary ${valueClassName ?? ''}`}>
          {value}
        </p>

        {/* Change indicator */}
        {change && (<div className={`${sizeConfig.valueGap} flex items-center ${sizeConfig.changeGap}`}>
            <span className={`${sizeConfig.changeClass} ${changeColor}`}>
              {change}
            </span>
            {period && (<span className={`${sizeConfig.periodClass} text-quaternary`}>
                {period}
              </span>)}
          </div>)}

        {/* Additional content */}
        {children}
      </div>
    </skwircle_1.Skwircle.Card>);
};
exports.MetricTile = MetricTile;
exports.MetricTile.displayName = 'MetricTile';
//# sourceMappingURL=metric-tile.js.map