"use strict";
/**
 * Action Bar
 *
 * Bottom action bar with presets, copy, and reset functionality
 */
'use client';
/**
 * Action Bar
 *
 * Bottom action bar with presets, copy, and reset functionality
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBar = void 0;
const react_1 = require("react");
const primitives_1 = require("@/components/ui/base/primitives");
const ActionBar = ({ presetConfig, showReset = true, resetLabel = 'Reset', onReset, onPresetChange, getConfigForCopy, }) => {
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
    return (<div className="bg-primary border-primary shrink-0 rounded-b-xl border p-2">
      {hasContent && (<div className="flex items-center gap-2">
          {hasPresets && (<div className="min-w-0 flex-1">
              <primitives_1.Select value={presetConfig.activePresetId || undefined} onValueChange={(value) => {
                    if (value)
                        handlePresetSelect(value);
                }}>
                <primitives_1.SelectTrigger className="h-8 w-full px-2 py-1 font-mono text-xs">
                  <primitives_1.SelectValue placeholder="Preset..."/>
                </primitives_1.SelectTrigger>
                <primitives_1.SelectContent className="max-w-[280px]">
                  {presetConfig.presets.map((preset) => (<primitives_1.SelectItem key={preset.id} value={preset.id} className="font-mono text-xs">
                      {preset.name}
                    </primitives_1.SelectItem>))}
                </primitives_1.SelectContent>
              </primitives_1.Select>
            </div>)}

          {showCopyButton && (<primitives_1.Button size="sm" color={copyStatus === 'copied' ? 'primary' : 'secondary'} onClick={handleCopyConfig}>
              {copyStatus === 'copied' ? '✓' : 'Copy'}
            </primitives_1.Button>)}

          {showReset && onReset && (<primitives_1.Button size="sm" color="tertiary" onClick={onReset}>
              {resetLabel}
            </primitives_1.Button>)}
        </div>)}
    </div>);
};
exports.ActionBar = ActionBar;
//# sourceMappingURL=action-bar.js.map