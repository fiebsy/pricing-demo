"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = exports.CheckboxBase = void 0;
const react_1 = require("react");
const checkbox_1 = require("@base-ui/react/checkbox");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
// ============================================================================
// ICONS
// ============================================================================
/**
 * Checkmark icon SVG
 */
function CheckIcon({ className }) {
    return (<svg aria-hidden="true" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
/**
 * Indeterminate (minus) icon SVG
 */
function IndeterminateIcon({ className }) {
    return (<svg aria-hidden="true" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
// ============================================================================
// CHECKBOX BASE (Visual only)
// ============================================================================
/**
 * CheckboxBase - Visual checkbox box component (no interaction)
 *
 * Use this for custom implementations where you control the checked state externally.
 *
 * @example
 * ```tsx
 * <CheckboxBase checked={isSelected} size="md" />
 * ```
 */
exports.CheckboxBase = (0, react_1.forwardRef)(({ size = 'sm', checked = false, indeterminate = false, disabled = false, className }, ref) => {
    const isActive = checked || indeterminate;
    return (<div ref={ref} className={(0, utils_1.cn)(config_1.boxCommonStyles, config_1.boxSizeStyles[size], isActive && config_1.boxCheckedStyles, disabled && config_1.boxDisabledStyles, className)}>
        {/* Indeterminate icon */}
        <IndeterminateIcon className={(0, utils_1.cn)(config_1.indicatorCommonStyles, config_1.iconSizeStyles[size], indeterminate && config_1.indicatorVisibleStyles, disabled && config_1.indicatorDisabledStyles)}/>

        {/* Check icon */}
        <CheckIcon className={(0, utils_1.cn)(config_1.indicatorCommonStyles, config_1.checkIconSizeStyles[size], checked && !indeterminate && config_1.indicatorVisibleStyles, disabled && config_1.indicatorDisabledStyles)}/>
      </div>);
});
exports.CheckboxBase.displayName = 'CheckboxBase';
// ============================================================================
// CHECKBOX (Interactive)
// ============================================================================
/**
 * Checkbox - Interactive checkbox component built on Base UI
 *
 * Supports checked, indeterminate, and disabled states with optional label and hint.
 *
 * @example
 * ```tsx
 * // Basic
 * <Checkbox label="Accept terms" />
 *
 * // Controlled
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} label="Option A" />
 *
 * // With hint
 * <Checkbox label="Notifications" hint="Receive email updates" size="md" />
 *
 * // Indeterminate (for partial selection)
 * <Checkbox indeterminate label="Select all" />
 * ```
 */
exports.Checkbox = (0, react_1.forwardRef)(({ size = 'sm', checked, defaultChecked, indeterminate = false, disabled = false, onCheckedChange, label, hint, name, value, required, className, 'aria-label': ariaLabel, }, ref) => {
    const hasLabel = label || hint;
    return (<checkbox_1.Checkbox.Root ref={ref} checked={checked} defaultChecked={defaultChecked} indeterminate={indeterminate} disabled={disabled} onCheckedChange={onCheckedChange} name={name} value={value} required={required} aria-label={ariaLabel} className={(0, utils_1.cn)('group flex items-start', disabled && 'cursor-not-allowed', config_1.labelContainerSizeStyles[size], className)}>
        {/* Checkbox box */}
        <span className={(0, utils_1.cn)(config_1.boxCommonStyles, config_1.boxSizeStyles[size], 
        // Checked/indeterminate states (using group-data selectors)
        'group-data-[checked]:bg-brand-solid group-data-[checked]:ring-brand-solid', 'group-data-[indeterminate]:bg-brand-solid group-data-[indeterminate]:ring-brand-solid', 
        // Disabled state
        'group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-disabled_subtle group-data-[disabled]:ring-disabled', 
        // Focus state
        'group-data-[focus-visible]:outline-2 group-data-[focus-visible]:outline-offset-2 group-data-[focus-visible]:outline-focus-ring', hasLabel && 'mt-0.5')}>
          {/* Indeterminate indicator */}
          <IndeterminateIcon className={(0, utils_1.cn)(config_1.indicatorCommonStyles, config_1.iconSizeStyles[size], 'group-data-[indeterminate]:opacity-100', 'group-data-[disabled]:text-fg-disabled_subtle')}/>

          {/* Check indicator */}
          <CheckIcon className={(0, utils_1.cn)(config_1.indicatorCommonStyles, config_1.checkIconSizeStyles[size], 'group-data-[checked]:opacity-100', 'group-data-[indeterminate]:opacity-0', 'group-data-[disabled]:text-fg-disabled_subtle')}/>
        </span>

        {/* Label and hint */}
        {hasLabel && (<span className={(0, utils_1.cn)('inline-flex flex-col', config_1.textWrapperSizeStyles[size])}>
            {label && (<span className={(0, utils_1.cn)('text-secondary select-none', config_1.labelTextSizeStyles[size])}>
                {label}
              </span>)}
            {hint && (<span className={(0, utils_1.cn)('text-tertiary', config_1.hintTextSizeStyles[size])} onClick={(e) => e.stopPropagation()}>
                {hint}
              </span>)}
          </span>)}
      </checkbox_1.Checkbox.Root>);
});
exports.Checkbox.displayName = 'Checkbox';
//# sourceMappingURL=checkbox.js.map