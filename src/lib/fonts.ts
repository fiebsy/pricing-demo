import { Inter } from 'next/font/google'

// Inter - Body & UI text
const interBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

// Inter - Headings & hero text
const interDisplay = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
})

export { interBody, interDisplay }
