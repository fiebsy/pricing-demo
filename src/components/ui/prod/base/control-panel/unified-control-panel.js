"use strict";
// =============================================================================
// Unified Control Panel
// =============================================================================
// Optimized control panel with:
// - Minimize/expand functionality
// - React Aria Tabs for proper tab panel routing
// - Cleaner structure and API
// - Preset management and copy functionality
// =============================================================================
'use client';
// =============================================================================
// Unified Control Panel
// =============================================================================
// Optimized control panel with:
// - Minimize/expand functionality
// - React Aria Tabs for proper tab panel routing
// - Cleaner structure and API
// - Preset management and copy functionality
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifiedControlPanel = void 0;
const react_1 = require("react");
const cx_1 = require("@/components/utils/cx");
const react_aria_components_1 = require("react-aria-components");
const context_1 = require("./context");
const section_renderer_1 = require("./components/section-renderer");
const action_bar_1 = require("./components/action-bar");
const minimized_header_1 = require("./components/minimized-header");
const tab_navigation_1 = require("./components/tab-navigation");
// Default position values
const DEFAULT_POSITION = {
    top: '90px',
    bottom: '90px',
    right: '16px',
    width: '320px',
};
function PanelInner({ sections, position, title, minimizedTitle, showReset, resetLabel, presetConfig, className, onChange, onReset, onPresetChange, getConfigForCopy, }) {
    const { isMinimized, activeTab, setActiveTab, toggleMinimized } = (0, context_1.usePanelContext)();
    // Handle control changes
    const handleControlChange = (0, react_1.useCallback)((controlId, value) => {
        // Find which section this control belongs to
        // Support both 'groups' and legacy 'subsections' naming
        const section = sections.find((s) => {
            const groups = s.groups || s.subsections || [];
            return groups.some((g) => g.controls.some((c) => c.id === controlId));
        });
        const sectionId = section?.id || '';
        const event = {
            controlId,
            sectionId,
            value,
        };
        onChange(event);
    }, [sections, onChange]);
    const hasPresets = presetConfig && presetConfig.presets.length > 0;
    const showCopyButton = presetConfig?.showCopyButton !== false && getConfigForCopy;
    const showActionBar = hasPresets || showCopyButton || (showReset && onReset);
    const cssVariables = {
        '--panel-top': position.top,
        '--panel-bottom': position.bottom,
        '--panel-right': position.right,
        '--panel-width': position.width,
    };
    // Minimized state - show just a button
    if (isMinimized) {
        return (<div className={(0, cx_1.cx)('fixed z-30', className)} style={{
                ...cssVariables,
                top: 'var(--panel-top, 90px)',
                right: 'var(--panel-right, 16px)',
            }}>
        <minimized_header_1.MinimizedHeader title={minimizedTitle}/>
      </div>);
    }
    const isScrollable = sections.length > 4;
    // Expanded state - full panel with true tab routing
    return (<div className={(0, cx_1.cx)('fixed z-30', 'flex flex-col', 'overflow-hidden rounded-xl shadow-xl', className)} style={{
            ...cssVariables,
            top: 'var(--panel-top, 90px)',
            bottom: 'var(--panel-bottom, 90px)',
            right: 'var(--panel-right, 16px)',
            width: 'var(--panel-width, 320px)',
        }}>
      <react_aria_components_1.Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key)} className="flex min-h-0 flex-1 flex-col">
        {/* Tab Navigation - Fixed Height */}
        <div className="bg-quaternary border-primary flex h-10 shrink-0 items-center rounded-t-xl border px-1">
          <tab_navigation_1.ScrollableTabList activeTabId={activeTab} isScrollable={isScrollable}>
            <react_aria_components_1.TabList aria-label="Control sections" className="flex items-center gap-0.5">
              {sections.map((section) => (<react_aria_components_1.Tab key={section.id} id={section.id} data-key={section.id} className="group cursor-pointer outline-none">
                  {({ isSelected }) => (<tab_navigation_1.TabTrigger label={section.label || section.tabLabel || section.title} isSelected={isSelected} isScrollable={isScrollable}/>)}
                </react_aria_components_1.Tab>))}
            </react_aria_components_1.TabList>
          </tab_navigation_1.ScrollableTabList>

          {/* Minimize button */}
          <tab_navigation_1.MinimizeButton onClick={toggleMinimized}/>
        </div>

        {/* Tab Panels - Only active section rendered */}
        {sections.map((section) => (<react_aria_components_1.TabPanel key={section.id} id={section.id} className="bg-tertiary border-primary min-h-0 flex-1 overscroll-contain border-x scrollbar-overlay focus:outline-none">
            <div className="pt-2 pb-2.5 pl-2.5 pr-0">
              <section_renderer_1.ActiveSectionContent section={section} onChange={handleControlChange}/>
            </div>
          </react_aria_components_1.TabPanel>))}
      </react_aria_components_1.Tabs>

      {/* Action Bar */}
      {showActionBar && (<action_bar_1.ActionBar presetConfig={presetConfig} showReset={showReset} resetLabel={resetLabel} onReset={onReset} onPresetChange={onPresetChange} getConfigForCopy={getConfigForCopy}/>)}
    </div>);
}
// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------
function UnifiedControlPanel({ config, onChange, onReset, onPresetChange, getConfigForCopy, className, defaultMinimized = false, minimized, onMinimizedChange, }) {
    const { sections, defaultActiveTab, position, title = 'Controls', minimizedTitle = 'Controls', showReset = true, resetLabel = 'Reset', presetConfig, } = config;
    if (!sections || sections.length === 0) {
        console.warn('UnifiedControlPanel: No sections provided');
        return null;
    }
    const pos = { ...DEFAULT_POSITION, ...position };
    const initialTab = defaultActiveTab || sections[0]?.id || '';
    return (<context_1.PanelProvider defaultActiveTab={initialTab} defaultMinimized={defaultMinimized} minimized={minimized} onMinimizedChange={onMinimizedChange}>
      <PanelInner sections={sections} position={pos} title={title} minimizedTitle={minimizedTitle} showReset={showReset} resetLabel={resetLabel} presetConfig={presetConfig} className={className} onChange={onChange} onReset={onReset} onPresetChange={onPresetChange} getConfigForCopy={getConfigForCopy}/>
    </context_1.PanelProvider>);
}
exports.UnifiedControlPanel = UnifiedControlPanel;
//# sourceMappingURL=unified-control-panel.js.map