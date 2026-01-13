"use strict";
/**
 * Badge Preview Component
 *
 * Renders a live preview of the badge based on current configuration.
 */
'use client';
/**
 * Badge Preview Component
 *
 * Renders a live preview of the badge based on current configuration.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgePreview = void 0;
const react_1 = require("react");
const skwircle_1 = require("@/components/ui/deprecated/skwircle/skwircle");
const badge_1 = require("@/components/ui/deprecated/skwircle/config/badge");
const icon_1 = require("@/components/ui/prod/base/icon");
const CheckmarkCircle01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon");
const AlertCircleIcon_1 = require("@hugeicons-pro/core-stroke-rounded/AlertCircleIcon");
// Map color to appropriate icon
const COLOR_ICONS = {
    success: CheckmarkCircle01Icon_1.default,
    warning: AlertCircleIcon_1.default,
    error: AlertCircleIcon_1.default,
};
const BadgePreview = ({ config }) => {
    const colorConfig = (0, badge_1.getBadgeColorConfig)(config.type, config.color);
    const paddingStyle = (0, badge_1.getBadgePaddingStyle)(config.size, config.showIcon ? 'leading' : 'none');
    const iconStyle = (0, badge_1.getBadgeIconStyle)(colorConfig);
    const textStyle = (0, badge_1.getBadgeTextStyle)(colorConfig);
    const sizeConfig = badge_1.BADGE_SIZE_CONFIGS[config.size];
    // Determine roundness - pill type defaults to pill roundness
    const finalRoundness = config.type === 'pill' ? 'pill' : config.roundness;
    // Choose icon based on color
    const IconComponent = COLOR_ICONS[config.color] ?? CheckmarkCircle01Icon_1.default;
    return (<div className="flex items-center justify-center p-8">
      <skwircle_1.Skwircle.Badge backgroundColor={colorConfig.backgroundColor} borderColor={colorConfig.borderColor} roundness={finalRoundness}>
        <span className={`flex items-center ${sizeConfig.textClass} font-medium`} style={paddingStyle}>
          {config.showIcon && (<span style={iconStyle}>
              <icon_1.HugeIcon icon={IconComponent} size={sizeConfig.iconSize} strokeWidth={sizeConfig.iconStroke}/>
            </span>)}
          <span style={textStyle}>{config.label}</span>
        </span>
      </skwircle_1.Skwircle.Badge>
    </div>);
};
exports.BadgePreview = BadgePreview;
//# sourceMappingURL=badge-preview.js.map