import localFont from 'next/font/local'

// Neue Haas Grotesk Text - Body & UI text (400, 500, 700)
const neueHaasGroteskText = localFont({
  src: [
    {
      path: '../styles/fonts/neue-haas-grotesk/text/NeueHaasGroteskText-55Roman-Web.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/text/NeueHaasGroteskText-56Italic-Web.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/text/NeueHaasGroteskText-65Medium-Web.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/text/NeueHaasGroteskText-66MediumItalic-Web.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/text/NeueHaasGroteskText-75Bold-Web.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/text/NeueHaasGroteskText-76BoldItalic-Web.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-body',
  display: 'swap',
})

// Neue Haas Grotesk Display - Headings & hero text (100-900)
const neueHaasGroteskDisplay = localFont({
  src: [
    {
      path: '../styles/fonts/neue-haas-grotesk/display/NeueHaasGroteskDisplay-45Light-Web.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/display/NeueHaasGroteskDisplay-55Roman-Web.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/display/NeueHaasGroteskDisplay-65Medium-Web.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/display/NeueHaasGroteskDisplay-75Bold-Web.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../styles/fonts/neue-haas-grotesk/display/NeueHaasGroteskDisplay-95Black-Web.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
})

export { neueHaasGroteskText, neueHaasGroteskDisplay }





