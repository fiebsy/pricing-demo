"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGroup = exports.InputPrefix = exports.Input = exports.InputBase = void 0;
const react_1 = require("react");
const field_1 = require("@base-ui/react/field");
const input_1 = require("@base-ui/react/input");
const HelpCircleIcon_1 = require("@hugeicons-pro/core-stroke-rounded/HelpCircleIcon");
const InformationCircleIcon_1 = require("@hugeicons-pro/core-stroke-rounded/InformationCircleIcon");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const tooltip_1 = require("@/components/ui/prod/base/tooltip");
const config_1 = require("./config");
const label_1 = require("./label");
const hint_text_1 = require("./hint-text");
// ============================================================================
// INPUT BASE (Visual input with wrapper)
// ============================================================================
/**
 * InputBase - Styled input wrapper with icon and tooltip support
 *
 * Use this for custom implementations where you need more control.
 *
 * @example
 * ```tsx
 * <InputBase placeholder="Enter text..." />
 * <InputBase icon={SearchIcon} placeholder="Search..." />
 * <InputBase tooltip="Helper information" />
 * ```
 */
exports.InputBase = (0, react_1.forwardRef)(({ size = 'sm', disabled = false, isInvalid = false, placeholder, icon, tooltip, shortcut, value, defaultValue, onChange, onFocus, onBlur, type = 'text', name, required, id, autoComplete, autoFocus, maxLength, minLength, pattern, readOnly, wrapperClassName, inputClassName, iconClassName, tooltipClassName, className, groupRef, ...props }, ref) => {
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const hasTrailingIcon = tooltip || isInvalid;
    const hasLeadingIcon = icon != null;
    const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
    };
    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    };
    return (<div ref={groupRef} className={(0, utils_1.cn)(config_1.wrapperCommonStyles, 
        // Focus state
        isFocused && !disabled && config_1.wrapperFocusStyles, 
        // Disabled state
        disabled && config_1.wrapperDisabledStyles, 
        // Invalid state
        isInvalid && config_1.wrapperInvalidStyles, 
        // Invalid + focused state
        isInvalid && isFocused && config_1.wrapperInvalidFocusStyles, wrapperClassName, className)}>
        {/* Leading icon */}
        {icon != null && (<icon_1.HugeIcon icon={icon} size={20} className={(0, utils_1.cn)(config_1.iconCommonStyles, config_1.leadingIconPositionStyles[size], disabled && config_1.iconDisabledStyles, iconClassName)}/>)}

        {/* Input field */}
        <input_1.Input ref={ref} type={type} name={name} id={id} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} required={required} autoComplete={autoComplete} autoFocus={autoFocus} maxLength={maxLength} minLength={minLength} pattern={pattern} readOnly={readOnly} onValueChange={onChange} onFocus={handleFocus} onBlur={handleBlur} className={(0, utils_1.cn)(config_1.inputCommonStyles, config_1.inputPaddingStyles[size], hasTrailingIcon && config_1.inputPaddingWithTrailingStyles[size], hasLeadingIcon && config_1.inputPaddingWithLeadingStyles[size], disabled && config_1.inputDisabledStyles, inputClassName)} {...props}/>

        {/* Tooltip help icon */}
        {tooltip && !isInvalid && (<tooltip_1.Tooltip title={tooltip} side="top">
            <span className={(0, utils_1.cn)(config_1.tooltipTriggerStyles, config_1.trailingIconPositionStyles[size], tooltipClassName)}>
              <icon_1.HugeIcon icon={HelpCircleIcon_1.default} size={16} className="text-fg-quaternary"/>
            </span>
          </tooltip_1.Tooltip>)}

        {/* Invalid icon */}
        {isInvalid && (<icon_1.HugeIcon icon={InformationCircleIcon_1.default} size={16} className={(0, utils_1.cn)(config_1.invalidIconStyles, config_1.trailingIconPositionStyles[size], tooltipClassName)}/>)}

        {/* Shortcut badge */}
        {shortcut && (<div className={(0, utils_1.cn)(config_1.shortcutContainerStyles, config_1.shortcutPaddingStyles[size])}>
            <span className={(0, utils_1.cn)(config_1.shortcutBadgeStyles, disabled && config_1.shortcutDisabledStyles)} aria-hidden="true">
              {typeof shortcut === 'string' ? shortcut : '⌘K'}
            </span>
          </div>)}
      </div>);
});
exports.InputBase.displayName = 'InputBase';
// ============================================================================
// INPUT (With label and hint)
// ============================================================================
/**
 * Input - Complete input field with label and hint support
 *
 * Built on Base UI Field and Input primitives.
 *
 * @example
 * ```tsx
 * <Input label="Email" placeholder="you@example.com" />
 * <Input label="Password" type="password" hint="At least 8 characters" />
 * <Input label="Name" isInvalid hint="This field is required" />
 * ```
 */
exports.Input = (0, react_1.forwardRef)(({ label, hint, hideRequiredIndicator, size = 'sm', disabled = false, isInvalid = false, required, className, ...inputProps }, ref) => {
    const generatedId = (0, react_1.useId)();
    const inputId = inputProps.id || generatedId;
    return (<field_1.Field.Root disabled={disabled} invalid={isInvalid} className={(0, utils_1.cn)('flex w-full flex-col items-start gap-1.5', className)}>
        {label && (<label_1.Label isRequired={hideRequiredIndicator ? false : required} htmlFor={inputId}>
            {label}
          </label_1.Label>)}

        <exports.InputBase ref={ref} id={inputId} size={size} disabled={disabled} isInvalid={isInvalid} required={required} {...inputProps}/>

        {hint && <hint_text_1.HintText isInvalid={isInvalid}>{hint}</hint_text_1.HintText>}
      </field_1.Field.Root>);
});
exports.Input.displayName = 'Input';
// ============================================================================
// INPUT PREFIX
// ============================================================================
/**
 * InputPrefix - Prefix addon for InputGroup
 *
 * @example
 * ```tsx
 * <InputGroup leadingAddon={<InputPrefix>https://</InputPrefix>}>
 *   <InputBase placeholder="example.com" />
 * </InputGroup>
 * ```
 */
exports.InputPrefix = (0, react_1.forwardRef)(({ children, size = 'sm', position = 'leading', isDisabled, className, ...props }, ref) => {
    return (<span ref={ref} className={(0, utils_1.cn)(config_1.prefixCommonStyles, config_1.prefixPaddingStyles[size], 
        // Position-based corner rounding
        position === 'leading' && 'rounded-l-xl -mr-px', position === 'trailing' && 'rounded-r-xl -ml-px', isDisabled && config_1.prefixDisabledStyles, className)} {...props}>
        {children}
      </span>);
});
exports.InputPrefix.displayName = 'InputPrefix';
// ============================================================================
// INPUT GROUP
// ============================================================================
/**
 * InputGroup - Group input with leading/trailing addons
 *
 * @example
 * ```tsx
 * <InputGroup
 *   label="Website"
 *   leadingAddon={<InputPrefix>https://</InputPrefix>}
 * >
 *   <InputBase placeholder="example.com" />
 * </InputGroup>
 * ```
 */
exports.InputGroup = (0, react_1.forwardRef)(({ size = 'sm', prefix, leadingAddon, trailingAddon, disabled = false, isInvalid = false, isRequired, label, hint, children, className, ...props }, ref) => {
    const hasLeading = !!leadingAddon || !!prefix;
    const hasTrailing = !!trailingAddon;
    return (<field_1.Field.Root disabled={disabled} invalid={isInvalid} className={(0, utils_1.cn)('flex w-full flex-col items-start gap-1.5', className)}>
        {label && <label_1.Label isRequired={isRequired}>{label}</label_1.Label>}

        <div ref={ref} data-input-size={size} className={(0, utils_1.cn)(config_1.inputGroupContainerStyles, disabled && 'cursor-not-allowed')} {...props}>
          {/* Leading addon */}
          {leadingAddon && (<section data-leading>
              {leadingAddon}
            </section>)}

          {/* Prefix text (inside input area) */}
          {prefix && (<span className={(0, utils_1.cn)(config_1.prefixCommonStyles, config_1.prefixPaddingStyles[size], 'rounded-l-xl -mr-px', disabled && config_1.prefixDisabledStyles)}>
              {prefix}
            </span>)}

          {/* Input wrapper - adjust corners based on addons */}
          <div className={(0, utils_1.cn)('z-10 flex-1', hasLeading && config_1.inputGroupWrapperLeadingStyles, hasTrailing && config_1.inputGroupWrapperTrailingStyles, 
        // Style children wrappers
        hasLeading && '[&>div]:rounded-l-none', hasTrailing && '[&>div]:rounded-r-none')}>
            {children}
          </div>

          {/* Trailing addon */}
          {trailingAddon && (<section data-trailing>
              {trailingAddon}
            </section>)}
        </div>

        {hint && <hint_text_1.HintText isInvalid={isInvalid}>{hint}</hint_text_1.HintText>}
      </field_1.Field.Root>);
});
exports.InputGroup.displayName = 'InputGroup';
//# sourceMappingURL=input.js.map