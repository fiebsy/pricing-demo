"use strict";
// =============================================================================
// Action Bar
// =============================================================================
// Bottom action bar with presets, copy, and reset functionality.
// =============================================================================
'use client';
// =============================================================================
// Action Bar
// =============================================================================
// Bottom action bar with presets, copy, and reset functionality.
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBar = void 0;
const react_1 = require("react");
const Copy01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Copy01Icon");
const Tick01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Tick01Icon");
// Using deprecated primitives until prod/base/ Select is ready
const select_1 = require("@/components/ui/deprecated/base/primitives/select");
// Prod components
const button_1 = require("@/components/ui/prod/base/button");
function ActionBar({ presetConfig, showReset = true, resetLabel = 'Reset', onReset, onPresetChange, getConfigForCopy, }) {
    const [copyStatus, setCopyStatus] = (0, react_1.useState)('idle');
    const hasPresets = presetConfig && presetConfig.presets.length > 0;
    const showCopyButton = presetConfig?.showCopyButton !== false && getConfigForCopy;
    const hasContent = hasPresets || showCopyButton || (showReset && onReset);
    const handleCopyConfig = (0, react_1.useCallback)(async () => {
        if (!getConfigForCopy)
            return;
        try {
            const configData = getConfigForCopy();
            const jsonString = JSON.stringify(configData, null, 2);
            await navigator.clipboard.writeText(jsonString);
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        }
        catch (err) {
            console.error('Failed to copy config:', err);
        }
    }, [getConfigForCopy]);
    const handlePresetSelect = (0, react_1.useCallback)((presetId) => {
        if (presetId && onPresetChange) {
            onPresetChange(presetId);
        }
    }, [onPresetChange]);
    if (!hasContent)
        return null;
    return (<div className="bg-primary border-primary shrink-0 rounded-b-xl border p-2">
      <div className="flex items-center gap-2">
        {/* Preset Selector */}
        {hasPresets && (<div className="min-w-0 flex-1">
            <select_1.Select value={presetConfig.activePresetId || undefined} onValueChange={handlePresetSelect}>
              <select_1.SelectTrigger className="h-8 w-full px-2 py-1 font-mono text-xs">
                <select_1.SelectValue placeholder="Preset..."/>
              </select_1.SelectTrigger>
              <select_1.SelectContent className="max-w-[280px]">
                {presetConfig.presets.map((preset) => (<select_1.SelectItem key={preset.id} value={preset.id} className="font-mono text-xs">
                    {preset.name}
                  </select_1.SelectItem>))}
              </select_1.SelectContent>
            </select_1.Select>
          </div>)}

        {/* Copy Button */}
        {showCopyButton && (<button_1.Button size="sm" variant={copyStatus === 'copied' ? 'primary' : 'secondary'} onClick={handleCopyConfig} className="shrink-0" iconLeading={copyStatus === 'copied' ? Tick01Icon_1.default : Copy01Icon_1.default}/>)}

        {/* Reset Button */}
        {showReset && onReset && (<button_1.Button size="sm" variant="tertiary" onClick={onReset} className="shrink-0">
            {resetLabel}
          </button_1.Button>)}
      </div>
    </div>);
}
exports.ActionBar = ActionBar;
//# sourceMappingURL=action-bar.js.map