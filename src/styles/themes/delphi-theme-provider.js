"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelphiThemeProvider = void 0;
/**
 * Delphi Theme Provider
 *
 * Applies the Delphi theme class to the document root element.
 * This ensures all portals (dropdowns, modals, popovers) inherit the theme
 * since they render outside the normal React tree.
 */
const react_1 = require("react");
function DelphiThemeProvider({ children }) {
    (0, react_1.useEffect)(() => {
        // Add theme class to html element so portals inherit it
        document.documentElement.classList.add('theme-delphi');
        // Cleanup on unmount
        return () => {
            document.documentElement.classList.remove('theme-delphi');
        };
    }, []);
    return <>{children}</>;
}
exports.DelphiThemeProvider = DelphiThemeProvider;
//# sourceMappingURL=delphi-theme-provider.js.map