"use strict";
/**
 * Slider Component
 *
 * Range slider using @base-ui/react.
 */
'use client';
/**
 * Slider Component
 *
 * Range slider using @base-ui/react.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const React = require("react");
const slider_1 = require("@base-ui/react/slider");
const cx_1 = require("@/components/utils/cx");
function Slider({ value, onChange, minValue = 0, maxValue = 100, step = 1, isDisabled = false, className, }) {
    const handleValueChange = React.useCallback((newValue) => {
        if (typeof newValue === 'number') {
            onChange([newValue]);
        }
        else {
            onChange([...newValue]);
        }
    }, [onChange]);
    return (<slider_1.Slider.Root value={value} onValueChange={handleValueChange} min={minValue} max={maxValue} step={step} disabled={isDisabled} className={(0, cx_1.cx)('relative flex w-full touch-none select-none items-center', isDisabled && 'cursor-not-allowed opacity-50', className)}>
      <slider_1.Slider.Control className="relative flex h-5 w-full items-center">
        <slider_1.Slider.Track className="bg-tertiary relative h-1.5 w-full grow overflow-hidden rounded-full">
          <slider_1.Slider.Indicator className="bg-brand-solid absolute h-full rounded-full"/>
        </slider_1.Slider.Track>
        <slider_1.Slider.Thumb className={(0, cx_1.cx)('block size-4 rounded-full border-2 border-brand-solid bg-primary shadow', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand', 'transition-colors', !isDisabled && 'cursor-grab active:cursor-grabbing')}/>
      </slider_1.Slider.Control>
    </slider_1.Slider.Root>);
}
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map