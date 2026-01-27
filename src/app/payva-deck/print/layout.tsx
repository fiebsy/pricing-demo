/**
 * Print Layout - Forces light mode for PDF export
 *
 * Overrides dark mode CSS variables with light mode values.
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PAYVA Pitch Deck - PDF Export',
}

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Force light mode immediately */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.style.colorScheme = 'light';
          `,
        }}
      />
      <style>{`
        /* ==============================================
           FORCE LIGHT MODE - Override ALL dark mode
           ============================================== */

        html,
        html.dark-mode,
        :root,
        .dark-mode {
          color-scheme: light !important;

          /* Text colors - force light mode values */
          --color-text-primary: rgb(24 29 39) !important;
          --color-text-secondary: rgb(65 70 81) !important;
          --color-text-tertiary: rgb(83 88 98) !important;
          --color-text-quaternary: rgb(113 118 128) !important;

          /* Background colors - force light mode values */
          --color-bg-primary: rgb(255 255 255) !important;
          --color-bg-secondary: rgb(250 250 250) !important;
          --color-bg-tertiary: rgb(245 245 245) !important;
          --color-bg-quaternary: rgb(233 234 235) !important;

          /* Foreground colors */
          --color-fg-primary: rgb(24 29 39) !important;
          --color-fg-secondary: rgb(65 70 81) !important;
          --color-fg-tertiary: rgb(83 88 98) !important;
          --color-fg-quaternary: rgb(164 167 174) !important;

          /* Border colors */
          --color-border-primary: rgb(213 215 218) !important;
          --color-border-secondary: rgb(233 234 235) !important;
          --color-border-tertiary: rgb(245 245 245) !important;

          /* Tailwind text color overrides */
          --text-color-primary: rgb(24 29 39) !important;
          --text-color-secondary: rgb(65 70 81) !important;
          --text-color-tertiary: rgb(83 88 98) !important;
          --text-color-quaternary: rgb(113 118 128) !important;

          /* Tailwind background color overrides */
          --background-color-primary: rgb(255 255 255) !important;
          --background-color-secondary: rgb(250 250 250) !important;
          --background-color-tertiary: rgb(245 245 245) !important;

          /* Brand colors (keep consistent) */
          --color-bg-brand-primary: rgb(249 245 255) !important;
          --background-color-brand-primary: rgb(249 245 255) !important;

          /* White/black */
          --color-white: rgb(255 255 255) !important;
          --color-alpha-white: rgb(255 255 255) !important;
        }

        html, body {
          background: white !important;
          color: rgb(24 29 39) !important;
        }

        /* Hide navigation and UI */
        nav,
        [role="switch"],
        .print-hidden,
        [data-mcp-inspector] {
          display: none !important;
        }

        /* Force color printing */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* ==============================================
           CARD STYLING - Simple border, no shadow
           ============================================== */
        .shine-3 {
          background: linear-gradient(180deg, #ffffff 0%, #fdfcfe 100%) !important;
          box-shadow: none !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          border-radius: 16px !important;
        }

        /* ==============================================
           HIDE SUBTITLE FROM SLIDELAYOUT
           (We render it absolutely positioned instead)
           Only hide the pt-4 px-4 wrapper, not the content zone
           ============================================== */
        [data-variant] > .w-full.pt-4.px-4:first-child {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}
