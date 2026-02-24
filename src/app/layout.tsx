import type { Metadata } from 'next'
import { interBody, interDisplay } from '@/lib/fonts'
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
    <html lang="en" className={`${interBody.variable} ${interDisplay.variable} bg-secondary_alt overscroll-none`} style={{ scrollbarGutter: 'stable' }}>
      <body className="font-body bg-secondary_alt noise-overlay noise-fixed noise-opacity-90">
        {children}
      </body>
    </html>
  )
}
