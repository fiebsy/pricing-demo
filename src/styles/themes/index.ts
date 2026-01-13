/**
 * Route-Scoped Themes
 * ===================
 *
 * This module provides route-specific theme overrides that transform
 * the PAYVA design system for individual pages.
 *
 * AVAILABLE THEMES:
 * ─────────────────
 * - Delphi: Warm, earthy aesthetic with orange brand and cream backgrounds
 *
 * USAGE:
 * ──────
 * ```tsx
 * // In your route's layout.tsx
 * import '@/styles/themes/theme-delphi.css'
 * import { DelphiThemeProvider } from '@/styles/themes'
 *
 * export default function Layout({ children }) {
 *   return (
 *     <DelphiThemeProvider>
 *       {children}
 *     </DelphiThemeProvider>
 *   )
 * }
 * ```
 *
 * See README.md for full documentation on creating new themes.
 */

export { DelphiThemeProvider } from './delphi-theme-provider'
