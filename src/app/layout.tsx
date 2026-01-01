import type { Metadata } from 'next'
import { neueHaasGroteskText, neueHaasGroteskDisplay } from '@/lib/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { FloatingNav } from '@/components/ui/nav'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Design System Demo | Derick Fiebiger',
  description: 'A showcase of modern UI components built with Next.js 14, React, and Tailwind v4',
  keywords: ['design system', 'ui components', 'tailwind', 'nextjs', 'react'],
  authors: [{ name: 'Derick Fiebiger' }],
  openGraph: {
    title: 'Design System Demo',
    description: 'Modern UI components with Tailwind v4 & semantic design tokens',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${neueHaasGroteskText.variable} ${neueHaasGroteskDisplay.variable} bg-secondary_alt overscroll-none`}>
      <body className="font-body bg-secondary_alt overscroll-none noise-overlay noise-fixed noise-opacity-10">
        <ThemeProvider>
          <FloatingNav />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

