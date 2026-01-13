"use strict";
/**
 * Unified Control Panel
 *
 * Complete control panel component with tabs, sections, and action bar.
 * Supports minimize/expand functionality for better screen real estate management.
 */
'use client';
/**
 * Unified Control Panel
 *
 * Complete control panel component with tabs, sections, and action bar.
 * Supports minimize/expand functionality for better screen real estate management.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifiedControlPanel = void 0;
const react_1 = require("react");
const cx_1 = require("@/components/utils/cx");
const panel_context_1 = require("./context/panel-context");
const use_scroll_sync_1 = require("./hooks/use-scroll-sync");
const tab_navigation_1 = require("./components/tab-navigation");
const section_renderer_1 = require("./components/section-renderer");
const action_bar_1 = require("./components/action-bar");
const minimized_pill_1 = require("./components/minimized-pill");
const PanelHeader = ({ title }) => {
    const { toggleMinimize } = (0, panel_context_1.usePanelActions)();
    return (<div className="flex items-center justify-between border-b border-primary px-3 py-2">
      {title && (<h3 className="text-primary text-sm font-semibold">{title}</h3>)}
      <button type="button" onClick={toggleMinimize} className={(0, cx_1.cx)('ml-auto flex items-center justify-center', 'size-7 rounded-md', 'text-secondary hover:text-primary', 'hover:bg-tertiary', 'transition-colors duration-150', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand')} aria-label="Minimize panel" title="Minimize panel">
        {/* Minimize icon */}
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 14 10 14 10 20"/>
          <polyline points="20 10 14 10 14 4"/>
          <line x1="14" y1="10" x2="21" y2="3"/>
          <line x1="3" y1="21" x2="10" y2="14"/>
        </svg>
      </button>
    </div>);
};
const PanelContent = ({ config, onChange, onReset, onPresetChange, getConfigForCopy, className, }) => {
    const { sections, showReset, resetLabel, presetConfig, title, minimizedTitle } = config;
    // Split context usage for optimal performance
    const { activeTab, isScrollingProgrammatically, isMinimized } = (0, panel_context_1.usePanelState)();
    const { setActiveTab, scrollToSection, containerRef } = (0, panel_context_1.usePanelActions)();
    const [isInitialMount, setIsInitialMount] = (0, react_1.useState)(true);
    // Tab change handler
    const handleTabChange = (0, react_1.useCallback)((tabId) => {
        scrollToSection(tabId);
    }, [scrollToSection]);
    // Scroll sync
    const sectionIds = (0, react_1.useMemo)(() => sections.map((s) => s.id), [sections]);
    (0, use_scroll_sync_1.useScrollSync)({
        sectionIds,
        onSectionInView: setActiveTab,
        isDisabled: isScrollingProgrammatically,
        containerRef,
    });
    // Enable toggle handler
    const handleEnableToggle = (0, react_1.useCallback)((sectionId, enabled) => {
        const section = sections.find((s) => s.id === sectionId);
        if (section?.enableToggle) {
            onChange({
                controlId: section.enableToggle.key,
                sectionId,
                value: enabled,
            });
        }
    }, [sections, onChange]);
    // Position styles
    const positionStyle = (0, react_1.useMemo)(() => ({
        '--panel-top': config.position?.top ?? '80px',
        '--panel-bottom': config.position?.bottom ?? '16px',
        '--panel-right': config.position?.right ?? '16px',
        '--panel-width': config.position?.width ?? '320px',
    }), [config.position]);
    // Render minimized pill when minimized
    if (isMinimized) {
        return <minimized_pill_1.MinimizedPill title={minimizedTitle ?? title ?? 'Controls'}/>;
    }
    return (<div className={(0, cx_1.cx)('pointer-events-auto fixed flex flex-col', 'bg-secondary rounded-xl shadow-xl', 
        // Animation
        'animate-in fade-in slide-in-from-right-4 duration-200', 'motion-reduce:animate-none', className)} style={{
            top: 'var(--panel-top)',
            bottom: 'var(--panel-bottom)',
            right: 'var(--panel-right)',
            width: 'var(--panel-width)',
            ...positionStyle,
        }}>
      {/* Header with minimize button */}
      <PanelHeader title={title}/>

      {/* Tabs */}
      <tab_navigation_1.TabNavigation sections={sections} activeTab={activeTab} onTabChange={handleTabChange} isInitialMount={isInitialMount} onInitialMountComplete={() => setIsInitialMount(false)}/>

      {/* Scrollable Content */}
      <div ref={containerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-3" style={{ scrollBehavior: 'smooth' }}>
        <div className="space-y-4">
          {sections.map((section) => (<section_renderer_1.SectionRenderer key={section.id} section={section} onChange={onChange} onEnableToggle={handleEnableToggle} defaultCollapsed={section.defaultCollapsed}/>))}
        </div>
      </div>

      {/* Action Bar */}
      <action_bar_1.ActionBar presetConfig={presetConfig} showReset={showReset} resetLabel={resetLabel} onReset={onReset} onPresetChange={onPresetChange} getConfigForCopy={getConfigForCopy}/>
    </div>);
};
// -----------------------------------------------------------------------------
// Unified Control Panel (exported)
// -----------------------------------------------------------------------------
const UnifiedControlPanel = (props) => {
    const defaultTab = props.config.defaultActiveTab ?? props.config.sections[0]?.id ?? '';
    const defaultMinimized = props.config.defaultMinimized ?? false;
    return (<panel_context_1.PanelProvider defaultActiveTab={defaultTab} defaultMinimized={defaultMinimized}>
      <PanelContent {...props}/>
    </panel_context_1.PanelProvider>);
};
exports.UnifiedControlPanel = UnifiedControlPanel;
//# sourceMappingURL=unified-control-panel.js.map