"use strict";
/**
 * Badge Component
 *
 * A high-level badge component built on Skwircle primitive.
 * Provides compound components for common badge patterns.
 *
 * @example Basic
 * ```tsx
 * <Badge color="success">Active</Badge>
 * ```
 *
 * @example With Icon
 * ```tsx
 * <Badge.WithIcon icon={CheckIcon} color="success">Verified</Badge.WithIcon>
 * ```
 *
 * @example With Dot
 * ```tsx
 * <Badge.WithDot dotColor="success">Online</Badge.WithDot>
 * ```
 */
'use client';
/**
 * Badge Component
 *
 * A high-level badge component built on Skwircle primitive.
 * Provides compound components for common badge patterns.
 *
 * @example Basic
 * ```tsx
 * <Badge color="success">Active</Badge>
 * ```
 *
 * @example With Icon
 * ```tsx
 * <Badge.WithIcon icon={CheckIcon} color="success">Verified</Badge.WithIcon>
 * ```
 *
 * @example With Dot
 * ```tsx
 * <Badge.WithDot dotColor="success">Online</Badge.WithDot>
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const React = require("react");
const __1 = require("../..");
const badge_1 = require("../../config/badge");
const icon_1 = require("@/components/ui/prod/base/icon");
// =============================================================================
// DOT COLOR MAPPING
// =============================================================================
const DOT_COLORS = {
    success: 'bg-success-solid',
    warning: 'bg-warning-solid',
    error: 'bg-error-solid',
    gray: 'bg-quaternary',
};
// =============================================================================
// BASE BADGE
// =============================================================================
const BadgeBase = ({ children, color = 'gray', type = 'badge', size = 'sm', className = '', }) => {
    const typeConfig = (0, badge_1.getBadgeTypeConfig)(type);
    const colorConfig = (0, badge_1.getBadgeColorConfig)(type, color);
    const sizeConfig = (0, badge_1.getBadgeSizeConfig)(size);
    const paddingStyle = (0, badge_1.getBadgePaddingStyle)(size, 'none');
    const textStyle = (0, badge_1.getBadgeTextStyle)(colorConfig);
    return (<__1.Skwircle variant="badge" roundness={typeConfig.roundness} elevation={typeConfig.elevation} borderWidth={typeConfig.borderWidth} backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor} className={className}>
      <span className={`flex items-center font-medium ${sizeConfig.textClass}`} style={{ ...paddingStyle, ...textStyle }}>
        {children}
      </span>
    </__1.Skwircle>);
};
// =============================================================================
// BADGE WITH ICON
// =============================================================================
const BadgeWithIcon = ({ children, icon, color = 'gray', type = 'badge', size = 'sm', className = '', }) => {
    const typeConfig = (0, badge_1.getBadgeTypeConfig)(type);
    const colorConfig = (0, badge_1.getBadgeColorConfig)(type, color);
    const sizeConfig = (0, badge_1.getBadgeSizeConfig)(size);
    const paddingStyle = (0, badge_1.getBadgePaddingStyle)(size, 'leading');
    const iconStyle = (0, badge_1.getBadgeIconStyle)(colorConfig);
    const textStyle = (0, badge_1.getBadgeTextStyle)(colorConfig);
    return (<__1.Skwircle variant="badge" roundness={typeConfig.roundness} elevation={typeConfig.elevation} borderWidth={typeConfig.borderWidth} backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor} className={className}>
      <span className={`flex items-center font-medium ${sizeConfig.textClass}`} style={paddingStyle}>
        <span style={iconStyle}>
          <icon_1.HugeIcon icon={icon} size={sizeConfig.iconSize} strokeWidth={sizeConfig.iconStroke}/>
        </span>
        <span style={textStyle}>{children}</span>
      </span>
    </__1.Skwircle>);
};
// =============================================================================
// BADGE ICON ONLY
// =============================================================================
const BadgeIconOnly = ({ icon, color = 'gray', type = 'badge', size = 'sm', className = '', }) => {
    const typeConfig = (0, badge_1.getBadgeTypeConfig)(type);
    const colorConfig = (0, badge_1.getBadgeColorConfig)(type, color);
    const sizeConfig = (0, badge_1.getBadgeSizeConfig)(size);
    const iconStyle = (0, badge_1.getBadgeIconStyle)(colorConfig);
    return (<__1.Skwircle variant="badge" roundness={typeConfig.roundness} elevation={typeConfig.elevation} borderWidth={typeConfig.borderWidth} backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor} className={className}>
      <span className="flex items-center justify-center" style={{
            padding: `${sizeConfig.paddingVertical}px ${sizeConfig.paddingIcon}px`,
            ...iconStyle,
        }}>
        <icon_1.HugeIcon icon={icon} size={sizeConfig.iconSize} strokeWidth={sizeConfig.iconStroke}/>
      </span>
    </__1.Skwircle>);
};
// =============================================================================
// BADGE WITH DOT
// =============================================================================
const BadgeWithDot = ({ children, dotColor = 'gray', type = 'badge', size = 'sm', className = '', }) => {
    const typeConfig = (0, badge_1.getBadgeTypeConfig)(type);
    const colorConfig = (0, badge_1.getBadgeColorConfig)(type, 'gray');
    const sizeConfig = (0, badge_1.getBadgeSizeConfig)(size);
    const paddingStyle = (0, badge_1.getBadgePaddingStyle)(size, 'leading');
    const textStyle = (0, badge_1.getBadgeTextStyle)(colorConfig);
    const dotClassName = DOT_COLORS[dotColor] || DOT_COLORS.gray;
    return (<__1.Skwircle variant="badge" roundness={typeConfig.roundness} elevation={typeConfig.elevation} borderWidth={typeConfig.borderWidth} backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor} className={className}>
      <span className={`flex items-center font-medium ${sizeConfig.textClass}`} style={paddingStyle}>
        <span className={`rounded-full ${dotClassName}`} style={{ width: sizeConfig.iconSize * 0.5, height: sizeConfig.iconSize * 0.5 }}/>
        <span style={textStyle}>{children}</span>
      </span>
    </__1.Skwircle>);
};
exports.Badge = BadgeBase;
exports.Badge.WithIcon = BadgeWithIcon;
exports.Badge.Icon = BadgeIconOnly;
exports.Badge.WithDot = BadgeWithDot;
//# sourceMappingURL=index.js.map