"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintText = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
/**
 * HintText - Helper/description text for form fields
 *
 * Automatically styles as error message when isInvalid is true.
 *
 * @example
 * ```tsx
 * <HintText>Enter your full name as it appears on your ID</HintText>
 * <HintText isInvalid>This field is required</HintText>
 * ```
 */
exports.HintText = (0, react_1.forwardRef)(({ children, isInvalid, className, ...props }, ref) => {
    return (<span ref={ref} role={isInvalid ? 'alert' : undefined} className={(0, utils_1.cn)(config_1.hintTextCommonStyles, isInvalid && config_1.hintTextInvalidStyles, className)} {...props}>
        {children}
      </span>);
});
exports.HintText.displayName = 'HintText';
//# sourceMappingURL=hint-text.js.map