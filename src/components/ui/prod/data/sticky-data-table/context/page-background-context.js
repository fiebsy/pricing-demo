"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGE_BACKGROUND_CONFIGS = exports.createPageBackgroundStyle = exports.useTablePageBackground = exports.TablePageBackgroundProvider = exports.getBackgroundCssVar = void 0;
/**
 * TablePageBackground Context
 *
 * Provides automatic background color synchronization between page layouts
 * and StickyDataTable components. This ensures the sticky toolbar/header
 * seamlessly blends with the page background during scroll.
 *
 * ## Usage Patterns
 *
 * ### Pattern 1: CSS Variable (Recommended - Zero JS Cost)
 * Set `--table-page-bg` on any ancestor element:
 *
 * ```tsx
 * // In your page or layout
 * <div
 *   className="bg-secondary min-h-screen"
 *   style={{ '--table-page-bg': 'var(--background-color-secondary)' } as React.CSSProperties}
 * >
 *   <StickyDataTable ... /> // Auto-inherits background
 * </div>
 * ```
 *
 * ### Pattern 2: React Context (For Complex Layouts)
 * Wrap with provider when CSS inheritance isn't sufficient:
 *
 * ```tsx
 * <TablePageBackgroundProvider background="bg-secondary">
 *   <StickyDataTable ... /> // Reads from context
 * </TablePageBackgroundProvider>
 * ```
 *
 * ### Pattern 3: Explicit Override (Always Works)
 * Pass backgroundConfig directly to the table:
 *
 * ```tsx
 * <StickyDataTable
 *   backgroundConfig={{ headerWrapper: 'bg-secondary' }}
 * />
 * ```
 *
 * ## Priority Order
 * 1. Explicit `backgroundConfig.headerWrapper` prop (highest)
 * 2. React Context value
 * 3. CSS Variable `--table-page-bg`
 * 4. Default (`bg-secondary_alt`)
 *
 * @module context/page-background-context
 */
const react_1 = require("react");
// ============================================================================
// CSS VARIABLE MAPPING
// ============================================================================
/**
 * Maps Tailwind background classes to their CSS variable equivalents
 * Used for gradient overlays which need the raw color value
 */
const BG_CLASS_TO_CSS_VAR = {
    'bg-primary': 'var(--background-color-primary)',
    'bg-secondary': 'var(--background-color-secondary)',
    'bg-secondary_alt': 'var(--background-color-secondary_alt)',
    'bg-secondary_p1': 'var(--background-color-secondary_p1)',
    'bg-secondary_t1': 'var(--background-color-secondary_t1)',
    'bg-tertiary': 'var(--background-color-tertiary)',
};
/**
 * Get the CSS variable for a background class
 * Falls back to secondary_alt if not found
 */
function getBackgroundCssVar(bgClass) {
    return BG_CLASS_TO_CSS_VAR[bgClass] ?? 'var(--background-color-secondary_alt)';
}
exports.getBackgroundCssVar = getBackgroundCssVar;
// ============================================================================
// CONTEXT
// ============================================================================
/**
 * Context for page background propagation
 * Default is undefined - tables will use their own defaults
 */
const TablePageBackgroundContext = (0, react_1.createContext)(undefined);
// ============================================================================
// PROVIDER
// ============================================================================
/**
 * Provider for page background context
 *
 * Wrap your page content with this provider to automatically synchronize
 * StickyDataTable backgrounds with the page.
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   return (
 *     <TablePageBackgroundProvider background="bg-secondary">
 *       <div className="bg-secondary min-h-screen p-8">
 *         <StickyDataTable ... />
 *       </div>
 *     </TablePageBackgroundProvider>
 *   )
 * }
 * ```
 */
function TablePageBackgroundProvider({ background, children, }) {
    const value = {
        backgroundClass: background,
        backgroundCssVar: getBackgroundCssVar(background),
    };
    return (<TablePageBackgroundContext.Provider value={value}>
      {children}
    </TablePageBackgroundContext.Provider>);
}
exports.TablePageBackgroundProvider = TablePageBackgroundProvider;
// ============================================================================
// HOOK
// ============================================================================
/**
 * Hook to access page background context
 *
 * Returns undefined if no provider is present - the table will use defaults.
 * This is intentional to support the opt-in pattern.
 */
function useTablePageBackground() {
    return (0, react_1.useContext)(TablePageBackgroundContext);
}
exports.useTablePageBackground = useTablePageBackground;
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Create a style object with the CSS variable for page background
 *
 * Use this when you want the CSS-only approach without React context.
 *
 * @example
 * ```tsx
 * <div
 *   className="bg-secondary min-h-screen"
 *   style={createPageBackgroundStyle('bg-secondary')}
 * >
 *   <StickyDataTable ... />
 * </div>
 * ```
 */
function createPageBackgroundStyle(bgClass) {
    return {
        '--table-page-bg': getBackgroundCssVar(bgClass),
    };
}
exports.createPageBackgroundStyle = createPageBackgroundStyle;
/**
 * Preset configurations for common page backgrounds
 *
 * Use these with backgroundConfig prop for explicit control:
 *
 * @example
 * ```tsx
 * <StickyDataTable
 *   backgroundConfig={PAGE_BACKGROUND_CONFIGS.secondary}
 * />
 * ```
 */
exports.PAGE_BACKGROUND_CONFIGS = {
    primary: {
        headerWrapper: 'bg-primary',
        headerContainer: 'bg-secondary_p1',
        headerStickyCell: 'bg-secondary_p1',
        headerStickyCellWithArrows: 'bg-secondary_t1/95',
        bodyContainer: 'bg-primary',
        rowStickyCell: 'bg-primary/0',
        rowStickyCellWithArrows: 'bg-secondary_t1/95',
        rowHover: 'bg-secondary',
    },
    secondary: {
        headerWrapper: 'bg-secondary',
        headerContainer: 'bg-secondary_p1',
        headerStickyCell: 'bg-secondary_p1',
        headerStickyCellWithArrows: 'bg-secondary_t1/95',
        bodyContainer: 'bg-primary',
        rowStickyCell: 'bg-primary/0',
        rowStickyCellWithArrows: 'bg-secondary_t1/95',
        rowHover: 'bg-secondary',
    },
    secondaryAlt: {
        headerWrapper: 'bg-secondary_alt',
        headerContainer: 'bg-secondary_p1',
        headerStickyCell: 'bg-secondary_p1',
        headerStickyCellWithArrows: 'bg-secondary_t1/95',
        bodyContainer: 'bg-primary',
        rowStickyCell: 'bg-primary/0',
        rowStickyCellWithArrows: 'bg-secondary_t1/95',
        rowHover: 'bg-secondary',
    },
};
//# sourceMappingURL=page-background-context.js.map