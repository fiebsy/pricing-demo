'use client'

/**
 * Delphi Theme Provider
 * =====================
 *
 * Client component that applies the Delphi theme to the entire document.
 *
 * WHY THIS EXISTS:
 * ────────────────
 * React portals (dropdowns, modals, popovers, tooltips) render outside the
 * normal React component tree, typically directly to document.body. If we only
 * added .theme-delphi to a wrapper div, portals would NOT inherit the theme.
 *
 * SOLUTION:
 * ─────────
 * This provider adds .theme-delphi to document.documentElement (<html>),
 * ensuring ALL elements—including portals—inherit the themed CSS variables.
 *
 * LIFECYCLE:
 * ──────────
 * - Mount: Adds .theme-delphi class to <html>
 * - Unmount: Removes .theme-delphi class (no style leakage to other routes)
 *
 * USAGE:
 * ──────
 * ```tsx
 * // In your route's layout.tsx
 * import '@/styles/themes/theme-delphi.css'
 * import { DelphiThemeProvider } from '@/styles/themes/delphi-theme-provider'
 *
 * export default function MyLayout({ children }) {
 *   return (
 *     <DelphiThemeProvider>
 *       <div className="min-h-screen bg-primary">
 *         {children}
 *       </div>
 *     </DelphiThemeProvider>
 *   )
 * }
 * ```
 *
 * IMPORTANT:
 * ──────────
 * - Must be a client component ('use client') to access document
 * - CSS file must be imported separately (not bundled in this component)
 * - Cleanup ensures theme doesn't persist when navigating away
 */

import { useLayoutEffect } from 'react'

const THEME_CLASS = 'theme-delphi'

export function DelphiThemeProvider({ children }: { children: React.ReactNode }) {
  // useLayoutEffect runs synchronously before paint, preventing flash
  useLayoutEffect(() => {
    const root = document.documentElement

    // Skip if already applied (e.g., SSR hydration or re-render)
    if (root.classList.contains(THEME_CLASS)) {
      return () => {
        root.classList.remove(THEME_CLASS)
      }
    }

    // Add theme class to <html> element so all elements inherit it,
    // including portals that render outside the React tree
    root.classList.add(THEME_CLASS)

    // Cleanup: Remove class when component unmounts (route change)
    // This prevents the theme from leaking to other routes
    return () => {
      root.classList.remove(THEME_CLASS)
    }
  }, [])

  return <>{children}</>
}
