/**
 * ButtonAnimation V3 - Debug Overlay
 *
 * Simple debug display for tracking animation states.
 *
 * @module prod/base/button-animation-v3/components
 */

'use client'

import { motion } from 'motion/react'
import type { ActivePath } from '../types'

interface DebugOverlayProps {
  activePath: ActivePath
  promotingItems: Set<string>
}

/**
 * Debug overlay showing current state information.
 */
export function DebugOverlay({ activePath, promotingItems }: DebugOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-xs z-[9999]"
    >
      <div className="mb-2 font-semibold text-green-400">V3 Debug</div>
      
      <div className="space-y-2">
        <div>
          <span className="text-gray-400">Path:</span>{' '}
          <span className="text-yellow-400">
            {activePath.length > 0 ? activePath.join(' → ') : '(root)'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Depth:</span>{' '}
          <span className="text-blue-400">{activePath.length}</span>
        </div>
        
        {promotingItems.size > 0 && (
          <div>
            <span className="text-gray-400">Promoting:</span>{' '}
            <span className="text-orange-400">
              {Array.from(promotingItems).join(', ')}
            </span>
          </div>
        )}
        
        <div className="pt-2 text-[10px] text-gray-500">
          States: idle | parent | anchored | child | promoting
        </div>
      </div>
    </motion.div>
  )
}