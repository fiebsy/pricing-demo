"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeToggle = void 0;
const React = require("react");
const react_aria_components_1 = require("react-aria-components");
const theme_provider_1 = require("../../theme-provider");
const icon_1 = require("@/components/ui/prod/base/icon");
const core_duotone_rounded_1 = require("@hugeicons-pro/core-duotone-rounded");
/**
 * Theme toggle switch
 * Uses react-aria-components Switch for accessibility and proper toggle behavior
 */
function ThemeToggle() {
    const { theme, setTheme } = (0, theme_provider_1.useTheme)();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <div className="fixed bottom-4 right-4 z-50 h-8 w-14"/>;
    }
    const isDark = theme === 'dark';
    return (<react_aria_components_1.Switch isSelected={isDark} onChange={(selected) => setTheme(selected ? 'dark' : 'light')} className="group fixed bottom-4 right-4 z-50 flex h-8 w-14 cursor-pointer items-center rounded-full bg-tertiary p-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary selected:bg-quaternary" aria-label="Toggle dark mode">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-sm transition-transform duration-200 ease-out group-selected:translate-x-6">
        <icon_1.HugeIcon icon={isDark ? core_duotone_rounded_1.Moon02Icon : core_duotone_rounded_1.Sun03Icon} size={14} strokeWidth={1.5} className="text-quaternary"/>
      </span>
    </react_aria_components_1.Switch>);
}
exports.ThemeToggle = ThemeToggle;
//# sourceMappingURL=theme-toggle.js.map