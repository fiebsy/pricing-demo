"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeProvider = void 0;
const React = require("react");
const ThemeContext = React.createContext(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = React.useState('light');
    const [mounted, setMounted] = React.useState(false);
    // Only run on client side
    React.useEffect(() => {
        setMounted(true);
        // Check localStorage for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark-mode');
            }
        }
    }, []);
    const handleSetTheme = React.useCallback((newTheme) => {
        if (!mounted)
            return;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
        else {
            document.documentElement.classList.remove('dark-mode');
        }
    }, [mounted]);
    const toggleTheme = React.useCallback(() => {
        handleSetTheme(theme === 'light' ? 'dark' : 'light');
    }, [theme, handleSetTheme]);
    // Always provide context, even before mounting
    return (<ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>);
}
exports.ThemeProvider = ThemeProvider;
function useTheme() {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
exports.useTheme = useTheme;
//# sourceMappingURL=theme-provider.js.map