/**
 * Simple inline debugger that avoids React errors
 */

'use client'

import * as React from 'react'
import { useEffect } from 'react'

export function SimpleDebugger() {
  useEffect(() => {
    // Add debug functions to window
    if (typeof window !== 'undefined') {
      // Debug function to check positions
      (window as any).debugPositions = () => {
        const buttons = document.querySelectorAll('[data-state][data-id]')
        const data: any[] = []
        
        buttons.forEach((button) => {
          const el = button as HTMLElement
          const computed = window.getComputedStyle(el)
          const rect = el.getBoundingClientRect()
          
          data.push({
            id: el.dataset.id,
            state: el.dataset.state,
            level: el.dataset.level || '0',
            position: computed.position,
            left: computed.left,
            transform: computed.transform,
            actualX: Math.round(rect.left),
            opacity: computed.opacity,
            zIndex: computed.zIndex
          })
        })
        
        console.clear()
        console.log('🎯 Button Positions Debug')
        console.log('========================')
        console.table(data)
        
        // Check for overlapping
        const overlapping: any[] = []
        data.forEach((item, i) => {
          data.forEach((other, j) => {
            if (i < j && Math.abs(item.actualX - other.actualX) < 2) {
              overlapping.push({
                buttons: `${item.id} & ${other.id}`,
                position: item.actualX + 'px',
                issue: 'Overlapping!'
              })
            }
          })
        })
        
        if (overlapping.length > 0) {
          console.log('\n⚠️  Overlapping Buttons Found:')
          console.table(overlapping)
        }
        
        return data
      }
      
      // Debug function to test navigation
      (window as any).testNavigation = async () => {
        console.log('🧪 Testing Navigation...\n')
        
        const clickButton = (text: string) => {
          const buttons = Array.from(document.querySelectorAll('button'))
          const button = buttons.find(b => b.textContent?.trim() === text)
          if (button) {
            console.log(`Clicking: ${text}`)
            button.click()
            return true
          }
          console.log(`Button "${text}" not found`)
          return false
        }
        
        // Test sequence
        const sequence = ['Design', 'Figma', 'Components']
        
        for (const buttonText of sequence) {
          clickButton(buttonText)
          await new Promise(r => setTimeout(r, 500)) // Wait for animation
          (window as any).debugPositions()
          await new Promise(r => setTimeout(r, 1000))
        }
        
        console.log('✅ Navigation test complete')
      }
      
      // Log available functions
      console.log('🔧 Debug functions available:')
      console.log('  window.debugPositions() - Check current button positions')
      console.log('  window.testNavigation() - Auto-test navigation sequence')
    }
  }, [])
  
  return null
}