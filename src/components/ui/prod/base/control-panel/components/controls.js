"use strict";
// =============================================================================
// Control Components
// =============================================================================
// Individual control primitives for the unified control panel.
// Optimized for simplicity and reusability.
// =============================================================================
'use client';
// =============================================================================
// Control Components
// =============================================================================
// Individual control primitives for the unified control panel.
// Optimized for simplicity and reusability.
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlRenderer = exports.TextControl = exports.ColorControl = exports.ToggleControl = exports.ColorSelectControl = exports.SelectControl = exports.SliderControl = exports.ColorSwatch = exports.ControlGrid = exports.ControlGroupWrapper = void 0;
const react_1 = require("react");
const cx_1 = require("@/components/utils/cx");
// Using deprecated primitives until prod/base/ Select/Slider are ready
const select_1 = require("@/components/ui/deprecated/base/primitives/select");
const slider_1 = require("@/components/ui/deprecated/base/primitives/slider");
// Prod components
const checkbox_1 = require("@/components/ui/prod/base/checkbox");
function ControlGroupWrapper({ label, description, children }) {
    return (<div className="space-y-2">
      <label className="text-secondary block font-mono text-xs">{label}</label>
      {children}
      {description && <p className="text-tertiary mt-1 font-mono text-xs">{description}</p>}
    </div>);
}
exports.ControlGroupWrapper = ControlGroupWrapper;
function ControlGrid({ columns = 1, children }) {
    return (<div className={(0, cx_1.cx)('grid gap-4', columns === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
      {children}
    </div>);
}
exports.ControlGrid = ControlGrid;
function ColorSwatch({ color, size = 'sm', className }) {
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
}
exports.ColorSwatch = ColorSwatch;
function SliderControl({ control, onChange }) {
    const { value, min, max, step, formatLabel, disabled } = control;
    const [inputValue, setInputValue] = (0, react_1.useState)(() => formatLabel?.(value) ?? `${value}`);
    const [isTyping, setIsTyping] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!isTyping) {
            setInputValue(formatLabel?.(value) ?? `${value}`);
        }
    }, [value, formatLabel, isTyping]);
    const handleInputCommit = () => {
        setIsTyping(false);
        const match = inputValue.match(/-?\d+\.?\d*/);
        if (match) {
            const parsed = parseFloat(match[0]);
            const clamped = Math.max(min, Math.min(max, Math.round(parsed / step) * step));
            onChange(clamped);
            setInputValue(formatLabel?.(clamped) ?? `${clamped}`);
        }
        else {
            setInputValue(formatLabel?.(value) ?? `${value}`);
        }
    };
    return (<div className={(0, cx_1.cx)('flex items-center gap-3', disabled && 'pointer-events-none opacity-50')}>
      <div className="flex-1">
        <slider_1.Slider value={[value]} onChange={(val) => {
            const newValue = Array.isArray(val) ? val[0] : val;
            if (newValue !== undefined)
                onChange(newValue);
        }} minValue={min} maxValue={max} step={step} labelFormatter={formatLabel ?? ((v) => `${v}`)} isDisabled={disabled}/>
      </div>
      <input type="text" value={inputValue} onChange={(e) => {
            setIsTyping(true);
            setInputValue(e.target.value);
        }} onBlur={handleInputCommit} onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleInputCommit();
            }
            else if (e.key === 'Escape') {
                setIsTyping(false);
                setInputValue(formatLabel?.(value) ?? `${value}`);
                e.currentTarget.blur();
            }
        }} disabled={disabled} className="text-secondary border-primary bg-primary focus:ring-brand focus:border-brand w-20 rounded border px-2 py-1 text-right font-mono text-xs font-medium focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"/>
    </div>);
}
exports.SliderControl = SliderControl;
function SelectControl({ control, onChange }) {
    const { value, options, showColorSwatch, disabled } = control;
    const safeValue = value || options[0]?.value || '';
    const selectedOption = options.find((opt) => opt.value === safeValue);
    return (<select_1.Select value={safeValue || undefined} onValueChange={disabled ? undefined : onChange} disabled={disabled}>
      <select_1.SelectTrigger className={(0, cx_1.cx)('h-8 w-full px-2 py-1 font-mono text-xs', disabled && 'cursor-not-allowed opacity-50')}>
        <span className="flex items-center gap-2">
          {showColorSwatch && selectedOption?.color && (<ColorSwatch color={selectedOption.color} size="xs"/>)}
          <select_1.SelectValue placeholder="Select..."/>
        </span>
      </select_1.SelectTrigger>
      <select_1.SelectContent>
        {options.map((option) => (<select_1.SelectItem key={option.value} value={option.value} className="font-mono text-xs">
            <span className="flex items-center gap-2">
              {showColorSwatch && option.color && <ColorSwatch color={option.color} size="xs"/>}
              <span>{option.label}</span>
            </span>
          </select_1.SelectItem>))}
      </select_1.SelectContent>
    </select_1.Select>);
}
exports.SelectControl = SelectControl;
function ColorSelectControl({ control, onChange }) {
    const { value, options, swatchSize = 'sm', disabled } = control;
    const safeValue = value || options[0]?.value || '';
    const selectedOption = options.find((opt) => opt.value === safeValue);
    return (<select_1.Select value={safeValue || undefined} onValueChange={disabled ? undefined : onChange} disabled={disabled}>
      <select_1.SelectTrigger className={(0, cx_1.cx)('h-9 w-full px-2 py-1.5 font-mono text-xs', disabled && 'cursor-not-allowed opacity-50')}>
        <span className="flex items-center gap-2.5">
          {selectedOption?.color && <ColorSwatch color={selectedOption.color} size={swatchSize}/>}
          <span className="truncate">
            <select_1.SelectValue placeholder="Select color..."/>
          </span>
        </span>
      </select_1.SelectTrigger>
      <select_1.SelectContent className="max-h-[300px]">
        {options.map((option) => (<select_1.SelectItem key={option.value} value={option.value} className="py-2">
            <span className="flex items-center gap-2.5">
              {option.color && <ColorSwatch color={option.color} size={swatchSize}/>}
              <span className="flex flex-col">
                <span className="font-mono text-xs">{option.label}</span>
                {option.description && (<span className="text-tertiary text-[10px]">{option.description}</span>)}
              </span>
            </span>
          </select_1.SelectItem>))}
      </select_1.SelectContent>
    </select_1.Select>);
}
exports.ColorSelectControl = ColorSelectControl;
function ToggleControl({ control, onChange, inline = false }) {
    const { value, label, disabled } = control;
    if (inline) {
        return (<div className={(0, cx_1.cx)('flex items-center justify-between', disabled && 'opacity-50')}>
        <span className="text-secondary font-mono text-xs">{label}</span>
        <checkbox_1.Checkbox size="sm" checked={value} onCheckedChange={onChange} disabled={disabled}/>
      </div>);
    }
    return <checkbox_1.Checkbox size="sm" checked={value} onCheckedChange={onChange} disabled={disabled}/>;
}
exports.ToggleControl = ToggleControl;
function ColorControl({ control, onChange }) {
    const { value, showValue = true, disabled } = control;
    return (<div className={(0, cx_1.cx)('flex items-center gap-2', disabled && 'opacity-50')}>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className={(0, cx_1.cx)('bg-secondary border-primary h-8 w-full cursor-pointer rounded border', disabled && 'cursor-not-allowed')}/>
      {showValue && <span className="text-secondary font-mono text-xs">{value}</span>}
    </div>);
}
exports.ColorControl = ColorControl;
function TextControl({ control, onChange }) {
    const { value, placeholder, maxLength, disabled } = control;
    return (<input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength} disabled={disabled} className={(0, cx_1.cx)('text-primary border-primary bg-primary focus:ring-brand focus:border-brand w-full rounded border px-3 py-2 font-mono text-xs focus:ring-2 focus:outline-none', disabled && 'cursor-not-allowed opacity-50')}/>);
}
exports.TextControl = TextControl;
function ControlRenderer({ control, sectionId, onChange }) {
    const handleChange = (value) => onChange(control.id, value);
    // Custom controls render directly without wrapper
    if (control.type === 'custom') {
        return <div key={control.id}>{control.render()}</div>;
    }
    const renderControl = () => {
        switch (control.type) {
            case 'slider':
                return <SliderControl control={control} onChange={handleChange}/>;
            case 'select':
                return <SelectControl control={control} onChange={handleChange}/>;
            case 'color-select':
                return <ColorSelectControl control={control} onChange={handleChange}/>;
            case 'toggle':
                return <ToggleControl control={control} onChange={handleChange}/>;
            case 'color':
                return <ColorControl control={control} onChange={handleChange}/>;
            case 'text':
                return <TextControl control={control} onChange={handleChange}/>;
            default:
                return null;
        }
    };
    return (<ControlGroupWrapper label={control.label} description={control.description}>
      {renderControl()}
    </ControlGroupWrapper>);
}
exports.ControlRenderer = ControlRenderer;
//# sourceMappingURL=controls.js.map