"use strict";
/**
 * Input Preview Component
 *
 * Renders a live preview of the input based on current configuration.
 */
'use client';
/**
 * Input Preview Component
 *
 * Renders a live preview of the input based on current configuration.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputPreview = void 0;
const react_1 = require("react");
const skwircle_1 = require("@/components/ui/deprecated/skwircle/skwircle");
const icon_1 = require("@/components/ui/prod/base/icon");
const Mail01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Mail01Icon");
const InputPreview = ({ config, onValueChange }) => {
    // Determine ring settings based on state
    const showRing = config.ring || config.state === 'focused' || config.state === 'error';
    const effectiveRingColor = config.state === 'error' ? 'outline-color-error' : config.ringColor;
    const effectiveBorderColor = config.state === 'error' ? 'border-error' : undefined;
    return (<div className="flex items-center justify-center p-8">
      <skwircle_1.Skwircle.Input roundness={config.roundness} state={config.state} ring={showRing} ringColor={effectiveRingColor} ringWidth={config.ringWidth} borderColor={effectiveBorderColor} style={{ width: 300 }}>
        <div className="flex items-center gap-2 px-3 py-2.5">
          {config.showIcon && (<icon_1.HugeIcon icon={Mail01Icon_1.default} size={18} className="text-tertiary"/>)}
          <input type="text" placeholder={config.placeholder} value={config.value} onChange={(e) => onValueChange?.(e.target.value)} disabled={config.state === 'disabled'} className="flex-1 bg-transparent text-sm text-primary placeholder:text-placeholder outline-none disabled:cursor-not-allowed disabled:opacity-50"/>
        </div>
      </skwircle_1.Skwircle.Input>
    </div>);
};
exports.InputPreview = InputPreview;
//# sourceMappingURL=input-preview.js.map