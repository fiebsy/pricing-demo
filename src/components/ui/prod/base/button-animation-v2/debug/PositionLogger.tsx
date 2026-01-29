/**
 * Position Logger - Debug utility for logging button positions
 */

'use client'

import { useEffect, useRef } from 'react'
import { useStackContextOptional } from '../context'

interface LogEntry {
  timestamp: string
  activePath: string[]
  anchoredCount: number
  positions: {
    [id: string]: {
      state: string
      offset: number
      isAbsolute: boolean
      level: number
    }
  }
}

/**
 * Component that logs positioning data to console and localStorage
 */
export function PositionLogger() {
  const context = useStackContextOptional()
  const logRef = useRef<LogEntry[]>([])
  
  useEffect(() => {
    if (!context) return
    
    const { activePath, styleConfig } = context
    const anchoredCount = Math.max(0, activePath.length - 1)
    
    // Find all button elements
    const buttons = document.querySelectorAll('[data-state][data-id]')
    const positions: LogEntry['positions'] = {}
    
    buttons.forEach((button) => {
      const element = button as HTMLElement
      const id = element.dataset.id!
      const state = element.dataset.state!
      const level = parseInt(element.dataset.level || '0')
      
      // Get computed styles
      const computed = window.getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      const isAbsolute = computed.position === 'absolute'
      const left = parseFloat(computed.left) || 0
      
      positions[id] = {
        state,
        offset: isAbsolute ? left : rect.left,
        isAbsolute,
        level
      }
    })
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      activePath,
      anchoredCount,
      positions
    }
    
    // Log to console with formatting
    console.group(`🎯 Position Update at ${new Date().toLocaleTimeString()}`)
    console.log('Active Path:', activePath.join(' → ') || '(none)')
    console.log('Anchored Count:', anchoredCount)
    console.log('Expected Child Offset:', anchoredCount * (styleConfig?.peekOffset || 8), 'px')
    
    console.table(
      Object.entries(positions).map(([id, data]) => ({
        ID: id,
        State: data.state,
        Level: data.level,
        Position: data.isAbsolute ? 'absolute' : 'relative',
        Offset: `${data.offset}px`
      }))
    )
    console.groupEnd()
    
    // Store in ref for export
    logRef.current.push(entry)
    
    // Also store in localStorage for persistence
    try {
      localStorage.setItem('button-position-log', JSON.stringify(logRef.current.slice(-50))) // Keep last 50 entries
    } catch (e) {
      // Ignore localStorage errors
    }
    
  }, [context?.activePath])
  
  // Add export function to window for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).exportPositionLog = () => {
        const log = logRef.current
        const blob = new Blob([JSON.stringify(log, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `position-log-${Date.now()}.json`
        a.click()
        console.log('📁 Position log exported')
        return log
      }
      
      (window as any).clearPositionLog = () => {
        logRef.current = []
        localStorage.removeItem('button-position-log')
        console.log('🗑️ Position log cleared')
      }
      
      console.log('💡 Debug functions available:')
      console.log('  - window.exportPositionLog() : Export positioning data')
      console.log('  - window.clearPositionLog() : Clear log data')
    }
  }, [])
  
  return null
}