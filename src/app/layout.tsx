import type { Metadata } from 'next'
import { neueHaasGroteskText, neueHaasGroteskDisplay } from '@/lib/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'PAYVA Design System — Modal Challenge',
  description: 'Core design system components and modal showcase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${neueHaasGroteskText.variable} ${neueHaasGroteskDisplay.variable} bg-secondary_alt overscroll-none dark-mode`} style={{ scrollbarGutter: 'stable' }} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark-mode');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body bg-secondary_alt noise-overlay noise-fixed noise-opacity-90">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
