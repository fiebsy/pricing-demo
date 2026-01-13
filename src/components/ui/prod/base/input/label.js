"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const react_1 = require("react");
const HelpCircleIcon_1 = require("@hugeicons-pro/core-stroke-rounded/HelpCircleIcon");
const field_1 = require("@base-ui/react/field");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const tooltip_1 = require("@/components/ui/prod/base/tooltip");
const config_1 = require("./config");
/**
 * Label - Input label component with optional required indicator and tooltip
 *
 * @example
 * ```tsx
 * <Label>Email</Label>
 * <Label isRequired>Password</Label>
 * <Label tooltip="We'll never share your email">Email</Label>
 * ```
 */
exports.Label = (0, react_1.forwardRef)(({ children, isRequired, tooltip, tooltipDescription, className, ...props }, ref) => {
    return (<field_1.Field.Label ref={ref} data-label="true" className={(0, utils_1.cn)(config_1.labelCommonStyles, className)} {...props}>
        {children}

        {/* Required indicator */}
        <span className={(0, utils_1.cn)('hidden', config_1.requiredIndicatorStyles, isRequired && 'block')}>
          *
        </span>

        {/* Tooltip */}
        {tooltip && (<tooltip_1.Tooltip title={tooltip} description={tooltipDescription} side="top">
            <span className="cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
              <icon_1.HugeIcon icon={HelpCircleIcon_1.default} size={16} className="text-fg-quaternary"/>
            </span>
          </tooltip_1.Tooltip>)}
      </field_1.Field.Label>);
});
exports.Label.displayName = 'Label';
//# sourceMappingURL=label.js.map