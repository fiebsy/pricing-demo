/**
 * Panel Context
 *
 * Shared state management for unified control panel
 */

'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from 'react'
import type { PanelContextValue } from '../types'

const PanelContext = createContext<PanelContextValue | null>(null)

interface PanelProviderProps {
  children: ReactNode
  defaultActiveTab: string
}

export const PanelProvider = ({ children, defaultActiveTab }: PanelProviderProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)
  const [isScrollingProgrammatically, setIsScrollingProgrammatically] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element)
    } else {
      sectionRefs.current.delete(id)
    }
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const sectionEl = sectionRefs.current.get(sectionId)
    const container = containerRef.current

    if (!sectionEl || !container) return

    setActiveTab(sectionId)
    setIsScrollingProgrammatically(true)

    const scrollMargin = 128
    const elementTop = sectionEl.offsetTop
    const targetScroll = Math.max(0, elementTop - scrollMargin)

    const scrollDistance = Math.abs(container.scrollTop - targetScroll)
    const useSmooth = scrollDistance > 500

    container.scrollTo({
      top: targetScroll,
      behavior: useSmooth ? 'smooth' : 'auto',
    })

    const resetDelay = useSmooth ? 600 : 100
    setTimeout(() => {
      setIsScrollingProgrammatically(false)
    }, resetDelay)
  }, [])

  const value = useMemo<PanelContextValue>(() => ({
    activeTab,
    setActiveTab,
    isScrollingProgrammatically,
    setIsScrollingProgrammatically,
    registerSection,
    scrollToSection,
    containerRef,
  }), [activeTab, isScrollingProgrammatically, registerSection, scrollToSection])

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
}

export const usePanelContext = () => {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error('usePanelContext must be used within a PanelProvider')
  }
  return context
}

export { PanelContext }
