/**
 * Studio Layout - Delphi Theme Scope
 *
 * Applies the Delphi.ai warm color theme exclusively to /studio routes.
 * Uses DelphiThemeProvider to apply theme class to document root,
 * ensuring portals (dropdowns, modals) also inherit the theme.
 *
 * Hides the global FloatingNav and ThemeToggle for a cleaner studio experience.
 */

import '@/styles/themes/theme-delphi.css'
import { DelphiThemeProvider } from '@/styles/themes/delphi-theme-provider'

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <DelphiThemeProvider>
      {/* Hide global nav from root layout (but not theme toggle) */}
      <style>{`
        nav[class*="fixed"][class*="right-4"][class*="top-4"] {
          display: none !important;
        }
      `}</style>
      <div className="min-h-screen bg-secondary_alt">
        {children}
      </div>
    </DelphiThemeProvider>
  )
}
