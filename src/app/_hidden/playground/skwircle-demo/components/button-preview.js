"use strict";
/**
 * Button Preview Component
 *
 * Renders a live preview of the button based on current configuration.
 */
'use client';
/**
 * Button Preview Component
 *
 * Renders a live preview of the button based on current configuration.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonPreview = void 0;
const react_1 = require("react");
const skwircle_1 = require("@/components/ui/deprecated/skwircle/skwircle");
const button_1 = require("@/components/ui/deprecated/skwircle/config/button");
const icon_1 = require("@/components/ui/prod/base/icon");
const ArrowRight01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon");
const ButtonPreview = ({ config }) => {
    const sizeConfig = button_1.BUTTON_SIZE_CONFIGS[config.size];
    const intentConfig = (0, button_1.getButtonIntentConfig)(config.intent);
    const paddingStyle = (0, button_1.getButtonPaddingStyle)(config.size, config.iconOnly, config.showIcon && !config.iconOnly);
    // Determine text color based on intent
    const textColorClass = intentConfig.textColorHover
        ? `${intentConfig.textColor} group-hover:${intentConfig.textColorHover}`
        : intentConfig.textColor;
    return (<div className="flex items-center justify-center p-8">
      <skwircle_1.Skwircle.Button intent={config.intent} roundness={config.roundness} ring={config.ring} ringOpacity={config.ringOpacity} borderWidth={config.intent === 'secondary' ? 1 : config.borderWidth}>
        <span className={`flex items-center ${sizeConfig.textClass} font-medium ${textColorClass} transition duration-100 ease-linear`} style={paddingStyle}>
          {config.showIcon && (<span className="opacity-55 transition-opacity duration-100 ease-linear group-hover:opacity-100">
              <icon_1.HugeIcon icon={ArrowRight01Icon_1.default} size={sizeConfig.iconSize} strokeWidth={sizeConfig.iconStroke}/>
            </span>)}
          {!config.iconOnly && config.label}
        </span>
      </skwircle_1.Skwircle.Button>
    </div>);
};
exports.ButtonPreview = ButtonPreview;
//# sourceMappingURL=button-preview.js.map