/**
 * PDF Export Utilities
 * 
 * Helper functions for exporting slide cards to PDF
 */

export interface ExportOptions {
  filename?: string
  format?: 'pdf' | 'png'
  quality?: number
  printOptimized?: boolean
}

/**
 * Export the current deck slide card configuration to PDF
 */
export async function exportToPDF(options: ExportOptions = {}) {
  const {
    filename = 'deck-slide-card-export.pdf',
    printOptimized = true,
  } = options

  try {
    // Call the existing PDF export API
    const response = await fetch('/api/payva-deck/export-pdf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Export failed')
    }

    // Get the PDF blob
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up
    URL.revokeObjectURL(url)

    return { success: true }
  } catch (error) {
    console.error('PDF export failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Generate print-specific CSS classes based on config
 */
export function getPrintClasses(printOptimized: boolean, forceLight: boolean): string {
  const classes: string[] = []
  
  if (printOptimized) {
    classes.push('print-optimized')
    // Add PDF typography overrides
    classes.push('pdf-export-mode')
  }
  
  if (forceLight) {
    // Force light mode for consistent printing
    classes.push('force-light-mode')
  }
  
  return classes.join(' ')
}

/**
 * Convert viewport units to pixels for PDF export
 * Based on 1920x1080 viewport (standard slide dimensions)
 */
export function convertViewportUnits(value: string, viewportWidth = 1920): string {
  if (!value.includes('vw') && !value.includes('vh')) {
    return value
  }
  
  const vwMatch = value.match(/(\d+(?:\.\d+)?)vw/)
  if (vwMatch) {
    const vwValue = parseFloat(vwMatch[1])
    const pxValue = (vwValue / 100) * viewportWidth
    return value.replace(vwMatch[0], `${pxValue}px`)
  }
  
  const vhMatch = value.match(/(\d+(?:\.\d+)?)vh/)
  if (vhMatch) {
    const vhValue = parseFloat(vhMatch[1])
    const viewportHeight = viewportWidth * (9 / 16) // 16:9 aspect ratio
    const pxValue = (vhValue / 100) * viewportHeight
    return value.replace(vhMatch[0], `${pxValue}px`)
  }
  
  return value
}

/**
 * Get print-ready styles for the card
 */
export function getPrintStyles(config: { 
  printOptimized: boolean
  viewportScaling: boolean 
}): React.CSSProperties {
  const styles: React.CSSProperties = {}
  
  if (config.printOptimized) {
    // Ensure proper color reproduction
    styles.colorInterpolation = 'sRGB'
    styles.WebkitPrintColorAdjust = 'exact'
    styles.printColorAdjust = 'exact'
  }
  
  if (config.viewportScaling) {
    // Set base font size for viewport scaling
    styles.fontSize = '1vw'
  }
  
  return styles
}

/**
 * Test URL for PDF export endpoint
 */
export const PDF_EXPORT_ENDPOINT = '/api/payva-deck/export-pdf'

/**
 * Test if the PDF export endpoint is available
 */
export async function testExportEndpoint(): Promise<boolean> {
  try {
    const response = await fetch(PDF_EXPORT_ENDPOINT, {
      method: 'HEAD',
    })
    return response.ok
  } catch {
    return false
  }
}