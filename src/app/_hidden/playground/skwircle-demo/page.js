"use strict";
/**
 * Skwircle Demo Page
 *
 * Interactive playground for Skwircle design system components.
 * Features unified control panel for real-time configuration.
 */
'use client';
/**
 * Skwircle Demo Page
 *
 * Interactive playground for Skwircle design system components.
 * Features unified control panel for real-time configuration.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const nav_1 = require("@/components/ui/deprecated/nav");
const control_panel_1 = require("@/components/ui/prod/base/control-panel");
const constants_1 = require("./constants");
const panels_1 = require("./panels");
const components_1 = require("./components");
// =============================================================================
// MAIN COMPONENT
// =============================================================================
function SkwircleDemoPage() {
    // Component configs
    const [buttonConfig, setButtonConfig] = (0, react_1.useState)(constants_1.DEFAULT_BUTTON_CONFIG);
    const [inputConfig, setInputConfig] = (0, react_1.useState)(constants_1.DEFAULT_INPUT_CONFIG);
    const [badgeConfig, setBadgeConfig] = (0, react_1.useState)(constants_1.DEFAULT_BADGE_CONFIG);
    const [cardConfig, setCardConfig] = (0, react_1.useState)(constants_1.DEFAULT_CARD_CONFIG);
    const [dashboardConfig, setDashboardConfig] = (0, react_1.useState)(constants_1.DEFAULT_DASHBOARD_CONFIG);
    // Active tab
    const [activeTab, setActiveTab] = (0, react_1.useState)('button');
    // Control panel configuration
    const panelConfig = (0, react_1.useMemo)(() => ({
        sections: [
            (0, panels_1.createButtonPanelConfig)(buttonConfig),
            (0, panels_1.createInputPanelConfig)(inputConfig),
            (0, panels_1.createBadgePanelConfig)(badgeConfig),
            (0, panels_1.createCardPanelConfig)(cardConfig),
            (0, panels_1.createDashboardPanelConfig)(dashboardConfig),
        ],
        defaultActiveTab: activeTab,
        position: {
            top: '16px',
            bottom: '16px',
            right: '16px',
            width: '320px',
        },
        showReset: true,
        resetLabel: 'Reset All',
    }), [buttonConfig, inputConfig, badgeConfig, cardConfig, dashboardConfig, activeTab]);
    // Handle control changes
    const handleControlChange = (0, react_1.useCallback)((event) => {
        const { sectionId, controlId, value } = event;
        // Update active tab when section changes
        setActiveTab(sectionId);
        // Update the appropriate config based on section
        switch (sectionId) {
            case 'button':
                setButtonConfig(prev => ({ ...prev, [controlId]: value }));
                break;
            case 'input':
                setInputConfig(prev => ({ ...prev, [controlId]: value }));
                break;
            case 'badge':
                setBadgeConfig(prev => ({ ...prev, [controlId]: value }));
                break;
            case 'card':
                setCardConfig(prev => ({ ...prev, [controlId]: value }));
                break;
            case 'dashboard':
                setDashboardConfig(prev => ({ ...prev, [controlId]: value }));
                break;
        }
    }, []);
    // Handle reset
    const handleReset = (0, react_1.useCallback)(() => {
        setButtonConfig(constants_1.DEFAULT_BUTTON_CONFIG);
        setInputConfig(constants_1.DEFAULT_INPUT_CONFIG);
        setBadgeConfig(constants_1.DEFAULT_BADGE_CONFIG);
        setCardConfig(constants_1.DEFAULT_CARD_CONFIG);
        setDashboardConfig(constants_1.DEFAULT_DASHBOARD_CONFIG);
    }, []);
    // Get current config for copy
    const getConfigForCopy = (0, react_1.useCallback)(() => {
        switch (activeTab) {
            case 'button':
                return buttonConfig;
            case 'input':
                return inputConfig;
            case 'badge':
                return badgeConfig;
            case 'card':
                return cardConfig;
            case 'dashboard':
                return dashboardConfig;
            default:
                return {};
        }
    }, [activeTab, buttonConfig, inputConfig, badgeConfig, cardConfig, dashboardConfig]);
    // Render active preview
    const renderPreview = () => {
        switch (activeTab) {
            case 'button':
                return <components_1.ButtonPreview config={buttonConfig}/>;
            case 'input':
                return (<components_1.InputPreview config={inputConfig} onValueChange={(value) => setInputConfig(prev => ({ ...prev, value }))}/>);
            case 'badge':
                return <components_1.BadgePreview config={badgeConfig}/>;
            case 'card':
                return <components_1.CardPreview config={cardConfig}/>;
            case 'dashboard':
                return <components_1.DashboardPreview config={dashboardConfig}/>;
            default:
                return null;
        }
    };
    return (<div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <nav_1.Breadcrumbs items={[
            { label: 'Playground', href: '/playground' },
            { label: 'Skwircle Demo' },
        ]}/>

          {/* Tab indicators */}
          <div className="flex items-center gap-1">
            {['button', 'input', 'badge', 'card', 'dashboard'].map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === tab
                ? 'bg-brand-secondary text-brand-secondary'
                : 'text-tertiary hover:text-primary hover:bg-secondary'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>))}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
          {renderPreview()}
        </div>
      </div>

      {/* Control Panel */}
      <control_panel_1.UnifiedControlPanel config={panelConfig} onChange={handleControlChange} onReset={handleReset} getConfigForCopy={getConfigForCopy}/>
    </div>);
}
exports.default = SkwircleDemoPage;
//# sourceMappingURL=page.js.map