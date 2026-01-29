'use client'

import { useEffect, useState } from 'react'
import { SlideCard } from './slide-card'
import { SlideCardV2 } from './slide-card-v2'
import type { HTMLMotionProps } from 'motion/react'

interface SlideCardWrapperProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  delay?: number
  motionProps?: Omit<HTMLMotionProps<'div'>, 'className' | 'style'>
}

/**
 * Smart wrapper that automatically selects the appropriate SlideCard version
 * based on the current context (screen view, V2 export, or legacy export)
 */
export function SlideCardWrapper(props: SlideCardWrapperProps) {
  const [exportMode, setExportMode] = useState<'screen' | 'desktop-export' | 'mobile-export'>('screen')
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Check if we're in V2 export mode
    const v2Container = document.querySelector('.pdf-export-mode-v2')
    if (v2Container) {
      if (v2Container.classList.contains('mobile-export')) {
        setExportMode('mobile-export')
      } else if (v2Container.classList.contains('desktop-export')) {
        setExportMode('desktop-export')
      }
      return
    }
    
    // Check for V2 data attribute
    const exportContainer = document.querySelector('[data-export-v2]')
    if (exportContainer) {
      const mode = exportContainer.getAttribute('data-export-v2')
      if (mode === 'mobile') {
        setExportMode('mobile-export')
      } else if (mode === 'desktop') {
        setExportMode('desktop-export')
      }
      return
    }
    
    // Default to screen mode
    setExportMode('screen')
  }, [])
  
  // Check if we're in V2 mode
  const isV2Mode = typeof window !== 'undefined' && (
    document.querySelector('.pdf-export-mode-v2') !== null ||
    document.querySelector('[data-export-v2]') !== null
  )
  
  // Use V2 card if in V2 mode, otherwise use legacy card
  if (isV2Mode) {
    return <SlideCardV2 {...props} exportMode={exportMode} />
  }
  
  // Use legacy card for backward compatibility
  return <SlideCard {...props} />
}