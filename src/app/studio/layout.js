"use strict";
/**
 * Studio Layout - Delphi Theme Scope
 *
 * Applies the Delphi.ai warm color theme exclusively to /studio routes.
 * Uses DelphiThemeProvider to apply theme class to document root,
 * ensuring portals (dropdowns, modals) also inherit the theme.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("@/styles/themes/theme-delphi.css");
const delphi_theme_provider_1 = require("@/styles/themes/delphi-theme-provider");
function StudioLayout({ children }) {
    return (<delphi_theme_provider_1.DelphiThemeProvider>
      <div className="min-h-screen bg-primary">
        {children}
      </div>
    </delphi_theme_provider_1.DelphiThemeProvider>);
}
exports.default = StudioLayout;
//# sourceMappingURL=layout.js.map