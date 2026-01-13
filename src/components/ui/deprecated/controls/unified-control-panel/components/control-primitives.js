"use strict";
/**
 * Control Primitives
 *
 * Individual control components for the unified control panel
 */
'use client';
/**
 * Control Primitives
 *
 * Individual control components for the unified control panel
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlGrid = exports.ControlRenderer = exports.ColorArrayControl = exports.ColorControl = exports.TextControl = exports.InlineToggleControl = exports.CheckboxControl = exports.ColorSelectControl = exports.SelectControl = exports.SliderControl = exports.ColorSwatch = exports.ControlGroup = exports.SectionHeader = void 0;
const react_1 = require("react");
const cx_1 = require("@/components/utils/cx");
const primitives_1 = require("@/components/ui/base/primitives");
exports.SectionHeader = (0, react_1.memo)(({ title }) => (<h4 className="text-secondary border-secondary -mx-4 mb-4 border-b px-4 pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
    {title}
  </h4>));
exports.SectionHeader.displayName = 'SectionHeader';
exports.ControlGroup = (0, react_1.memo)(({ label, description, children }) => (<div className="space-y-2">
    <label className="text-secondary block font-mono text-xs">{label}</label>
    {children}
    {description && <p className="text-tertiary mt-1 font-mono text-xs">{description}</p>}
  </div>));
exports.ControlGroup.displayName = 'ControlGroup';
exports.ColorSwatch = (0, react_1.memo)(({ color, size = 'sm', className }) => {
    const [resolvedColor, setResolvedColor] = (0, react_1.useState)(color);
    (0, react_1.useEffect)(() => {
        if (color.startsWith('var(') || color.startsWith('--')) {
            const varName = color.replace('var(', '').replace(')', '').trim();
            const computed = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
            if (computed) {
                setResolvedColor(computed);
            }
        }
        else {
            setResolvedColor(color);
        }
    }, [color]);
    const sizeClasses = {
        xs: 'size-3 rounded',
        sm: 'size-4 rounded',
        md: 'size-5 rounded-md',
    };
    return (<span className={(0, cx_1.cx)('inline-block shrink-0 border border-black/10 shadow-sm', sizeClasses[size], className)} style={{ backgroundColor: resolvedColor }} title={color}/>);
});
exports.ColorSwatch.displayName = 'ColorSwatch';
exports.SliderControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { value, min, max, step, formatLabel } = config;
    const [inputValue, setInputValue] = (0, react_1.useState)(() => {
        return formatLabel ? formatLabel(value) : `${value}`;
    });
    const [isTyping, setIsTyping] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!isTyping) {
            const formatted = formatLabel ? formatLabel(value) : `${value}`;
            setInputValue(formatted);
        }
    }, [value, formatLabel, isTyping]);
    const parseInputValue = (0, react_1.useCallback)((input) => {
        if (formatLabel) {
            const match = input.match(/-?\d+\.?\d*/);
            return match ? parseFloat(match[0]) : null;
        }
        const parsed = parseFloat(input);
        return isNaN(parsed) ? null : parsed;
    }, [formatLabel]);
    const validateAndClamp = (0, react_1.useCallback)((num) => {
        return Math.max(min, Math.min(max, Math.round(num / step) * step));
    }, [min, max, step]);
    const handleInputChange = (0, react_1.useCallback)((e) => {
        setIsTyping(true);
        setInputValue(e.target.value);
    }, []);
    const handleInputCommit = (0, react_1.useCallback)(() => {
        setIsTyping(false);
        const parsed = parseInputValue(inputValue);
        if (parsed !== null) {
            const clamped = validateAndClamp(parsed);
            onChange(clamped);
            const formatted = formatLabel ? formatLabel(clamped) : `${clamped}`;
            setInputValue(formatted);
        }
        else {
            const formatted = formatLabel ? formatLabel(value) : `${value}`;
            setInputValue(formatted);
        }
    }, [parseInputValue, validateAndClamp, inputValue, onChange, formatLabel, value]);
    const handleInputKeyDown = (0, react_1.useCallback)((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleInputCommit();
        }
        else if (e.key === 'Escape') {
            setIsTyping(false);
            const formatted = formatLabel ? formatLabel(value) : `${value}`;
            setInputValue(formatted);
            e.currentTarget.blur();
        }
    }, [handleInputCommit, formatLabel, value]);
    const handleSliderChange = (0, react_1.useCallback)((val) => {
        const newValue = Array.isArray(val) ? val[0] : val;
        if (newValue !== undefined)
            onChange(newValue);
    }, [onChange]);
    return (<div className={(0, cx_1.cx)('flex items-center gap-3', disabled && 'pointer-events-none opacity-50')}>
      <div className="flex-1">
        <primitives_1.Slider value={[value]} onChange={handleSliderChange} minValue={min} maxValue={max} step={step} isDisabled={disabled}/>
      </div>
      <input type="text" value={inputValue} onChange={handleInputChange} onBlur={handleInputCommit} onKeyDown={handleInputKeyDown} disabled={disabled} className="text-secondary border-primary bg-primary focus:ring-brand focus:border-brand w-20 rounded border px-2 py-1 text-right font-mono text-xs font-medium focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"/>
    </div>);
});
exports.SliderControl.displayName = 'SliderControl';
exports.SelectControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { value, options, showColorSwatch } = config;
    const safeValue = (() => {
        if (value === undefined || value === null || value === '') {
            return options?.[0]?.value || '';
        }
        return String(value);
    })();
    const selectedOption = options.find((opt) => opt.value === safeValue);
    return (<primitives_1.Select value={safeValue || undefined} onValueChange={disabled ? undefined : onChange} disabled={disabled}>
      <primitives_1.SelectTrigger className={(0, cx_1.cx)('h-8 w-full px-2 py-1 font-mono text-xs', disabled && 'cursor-not-allowed opacity-50')}>
        <span className="flex items-center gap-2">
          {showColorSwatch && selectedOption?.color && (<exports.ColorSwatch color={selectedOption.color} size="xs"/>)}
          <primitives_1.SelectValue placeholder="Select..."/>
        </span>
      </primitives_1.SelectTrigger>
      <primitives_1.SelectContent>
        {options.map((option) => (<primitives_1.SelectItem key={option.value} value={option.value} className="font-mono text-xs">
            <span className="flex items-center gap-2">
              {showColorSwatch && option.color && (<exports.ColorSwatch color={option.color} size="xs"/>)}
              <span>{option.label}</span>
            </span>
          </primitives_1.SelectItem>))}
      </primitives_1.SelectContent>
    </primitives_1.Select>);
});
exports.SelectControl.displayName = 'SelectControl';
exports.ColorSelectControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { value, options, swatchSize = 'sm' } = config;
    const safeValue = (() => {
        if (value === undefined || value === null || value === '') {
            return options?.[0]?.value || '';
        }
        return String(value);
    })();
    const selectedOption = options.find((opt) => opt.value === safeValue);
    return (<primitives_1.Select value={safeValue || undefined} onValueChange={disabled ? undefined : onChange} disabled={disabled}>
      <primitives_1.SelectTrigger className={(0, cx_1.cx)('h-9 w-full px-2 py-1.5 font-mono text-xs', disabled && 'cursor-not-allowed opacity-50')}>
        <span className="flex items-center gap-2.5">
          {selectedOption?.color && <exports.ColorSwatch color={selectedOption.color} size={swatchSize}/>}
          <span className="truncate">
            <primitives_1.SelectValue placeholder="Select color..."/>
          </span>
        </span>
      </primitives_1.SelectTrigger>
      <primitives_1.SelectContent className="max-h-[300px]">
        {options.map((option) => (<primitives_1.SelectItem key={option.value} value={option.value} className="py-2">
            <span className="flex items-center gap-2.5">
              {option.color && <exports.ColorSwatch color={option.color} size={swatchSize}/>}
              <span className="flex flex-col">
                <span className="font-mono text-xs">{option.label}</span>
                {option.description && (<span className="text-tertiary text-[10px]">{option.description}</span>)}
              </span>
            </span>
          </primitives_1.SelectItem>))}
      </primitives_1.SelectContent>
    </primitives_1.Select>);
});
exports.ColorSelectControl.displayName = 'ColorSelectControl';
exports.CheckboxControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { value } = config;
    return <primitives_1.Checkbox size="sm" isSelected={value} onChange={onChange} isDisabled={disabled}/>;
});
exports.CheckboxControl.displayName = 'CheckboxControl';
exports.InlineToggleControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { label, value } = config;
    return (<div className={(0, cx_1.cx)('flex items-center justify-between', disabled && 'opacity-50')}>
      <span className="text-secondary font-mono text-xs">{label}</span>
      <primitives_1.Checkbox size="sm" isSelected={value} onChange={onChange} isDisabled={disabled}/>
    </div>);
});
exports.InlineToggleControl.displayName = 'InlineToggleControl';
exports.TextControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { value, placeholder, maxLength } = config;
    const handleChange = (0, react_1.useCallback)((e) => {
        onChange(e.target.value);
    }, [onChange]);
    return (<input type="text" value={value} onChange={handleChange} placeholder={placeholder} maxLength={maxLength} disabled={disabled} className={(0, cx_1.cx)('text-primary border-primary bg-primary focus:ring-brand focus:border-brand w-full rounded border px-3 py-2 font-mono text-xs focus:ring-2 focus:outline-none', disabled && 'cursor-not-allowed opacity-50')}/>);
});
exports.TextControl.displayName = 'TextControl';
exports.ColorControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { value, showValue = true } = config;
    const handleChange = (0, react_1.useCallback)((e) => {
        onChange(e.target.value);
    }, [onChange]);
    return (<div className={(0, cx_1.cx)('flex items-center gap-2', disabled && 'opacity-50')}>
      <input type="color" value={value} onChange={handleChange} disabled={disabled} className={(0, cx_1.cx)('bg-secondary border-primary h-8 w-full cursor-pointer rounded border', disabled && 'cursor-not-allowed')}/>
      {showValue && <span className="text-secondary font-mono text-xs">{value}</span>}
    </div>);
});
exports.ColorControl.displayName = 'ColorControl';
exports.ColorArrayControl = (0, react_1.memo)(({ config, onChange, disabled = false }) => {
    const { value, count } = config;
    const handleColorChange = (0, react_1.useCallback)((index, newColor) => {
        const newColors = [...value];
        newColors[index] = newColor;
        onChange(newColors);
    }, [value, onChange]);
    return (<div className={(0, cx_1.cx)('grid grid-cols-2 gap-4', disabled && 'opacity-50')}>
      {Array.from({ length: count }).map((_, index) => (<exports.ControlGroup key={index} label={`Color ${index + 1}`}>
          <div className="flex items-center gap-2">
            <input type="color" value={value[index] || value[0]} onChange={(e) => handleColorChange(index, e.target.value)} disabled={disabled} className={(0, cx_1.cx)('bg-secondary border-primary h-8 w-full cursor-pointer rounded border', disabled && 'cursor-not-allowed')}/>
          </div>
        </exports.ControlGroup>))}
    </div>);
});
exports.ColorArrayControl.displayName = 'ColorArrayControl';
// -----------------------------------------------------------------------------
// Control Registry
// -----------------------------------------------------------------------------
const control_registry_1 = require("../registry/control-registry");
/**
 * Built-in control type to component mapping
 * Used as fallback if registry lookup fails
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BUILT_IN_CONTROLS = {
    slider: exports.SliderControl,
    select: exports.SelectControl,
    checkbox: exports.CheckboxControl,
    color: exports.ColorControl,
    'color-array': exports.ColorArrayControl,
    'inline-toggle': exports.InlineToggleControl,
    'color-select': exports.ColorSelectControl,
    text: exports.TextControl,
};
// Register built-in controls with the registry
Object.entries(BUILT_IN_CONTROLS).forEach(([type, component]) => {
    (0, control_registry_1.registerControl)(type, component);
});
exports.ControlRenderer = (0, react_1.memo)(({ config, onChange }) => {
    const registry = (0, control_registry_1.useControlRegistry)();
    const disabled = config.disabled || false;
    // Try registry first, then fall back to built-in
    const Component = registry.get(config.type) || BUILT_IN_CONTROLS[config.type];
    if (!Component) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[ControlRenderer] Unknown control type: "${config.type}"`);
        }
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Component config={config} onChange={onChange} disabled={disabled}/>;
});
exports.ControlRenderer.displayName = 'ControlRenderer';
const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
};
exports.ControlGrid = (0, react_1.memo)(({ columns = 1, children }) => (<div className={(0, cx_1.cx)('grid gap-4', gridClasses[columns])}>{children}</div>));
exports.ControlGrid.displayName = 'ControlGrid';
//# sourceMappingURL=control-primitives.js.map