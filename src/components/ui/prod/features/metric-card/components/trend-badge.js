"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendBadge = void 0;
/**
 * TrendBadge Component
 *
 * Displays a trend indicator with optional directional icon and percentage.
 *
 * @module metric-card/components/trend-badge
 */
const React = require("react");
const ArrowUp01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon");
const ArrowDown01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("../config");
// =============================================================================
// COMPONENT
// =============================================================================
const TrendBadge = ({ trend, style, className }) => {
    // Use directional colors (success/error) or custom color
    const colorClass = style.useDirectionalColors
        ? config_1.TREND_COLORS[trend.direction]
        : config_1.TEXT_COLOR_CLASSES[style.color];
    const fontSizeClass = config_1.FONT_SIZE_CLASSES[style.fontSize];
    const fontWeightClass = config_1.FONT_WEIGHT_CLASSES[style.fontWeight];
    return (<span className={(0, utils_1.cn)('inline-flex items-center gap-0.5', colorClass, fontSizeClass, fontWeightClass, className)}>
      {trend.showIcon !== false && trend.direction === 'up' && (<icon_1.HugeIcon icon={ArrowUp01Icon_1.default} size={style.iconSize}/>)}
      {trend.showIcon !== false && trend.direction === 'down' && (<icon_1.HugeIcon icon={ArrowDown01Icon_1.default} size={style.iconSize}/>)}
      <span>{trend.value}%</span>
    </span>);
};
exports.TrendBadge = TrendBadge;
exports.TrendBadge.displayName = 'TrendBadge';
//# sourceMappingURL=trend-badge.js.map