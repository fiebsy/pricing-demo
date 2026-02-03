/**
 * StackingNav V2 - Debug Logging
 *
 * Centralized logging for debugging animation timing issues.
 * Logs are stored in memory and can be copied/cleared via UI.
 */

export interface LogEntry {
  timestamp: number
  category: 'mode' | 'phase' | 'render' | 'timing'
  item?: string
  level?: number
  data: Record<string, unknown>
}

class DebugLogStore {
  private entries: LogEntry[] = []
  private maxEntries = 500
  private enabled = false
  private listeners: Set<() => void> = new Set()

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }

  isEnabled() {
    return this.enabled
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify() {
    this.listeners.forEach((l) => l())
  }

  log(
    category: LogEntry['category'],
    data: Record<string, unknown>,
    item?: string,
    level?: number
  ) {
    if (!this.enabled) return

    this.entries.push({
      timestamp: performance.now(),
      category,
      item,
      level,
      data,
    })

    // Trim old entries
    if (this.entries.length > this.maxEntries) {
      this.entries = this.entries.slice(-this.maxEntries)
    }

    this.notify()
  }

  logMode(
    item: string,
    level: number,
    mode: string,
    details: Record<string, unknown>
  ) {
    this.log('mode', { mode, ...details }, item, level)
  }

  logPhase(phase: string, details: Record<string, unknown>) {
    this.log('phase', { phase, ...details })
  }

  logTiming(
    item: string,
    level: number,
    delay: number,
    details: Record<string, unknown>
  ) {
    this.log('timing', { delay, ...details }, item, level)
  }

  logRender(
    item: string,
    level: number,
    initial: unknown,
    animate: unknown
  ) {
    this.log('render', { initial, animate }, item, level)
  }

  getEntries() {
    return [...this.entries]
  }

  getEntriesFormatted(): string {
    const lines = this.entries.map((e) => {
      const time = e.timestamp.toFixed(1).padStart(8)
      const cat = e.category.padEnd(6)
      const item = e.item ? `[${e.item}]`.padEnd(12) : ''.padEnd(12)
      const lvl = e.level !== undefined ? `L${e.level}` : '  '
      const data = JSON.stringify(e.data)
      return `${time}ms ${cat} ${lvl} ${item} ${data}`
    })
    return lines.join('\n')
  }

  clear() {
    this.entries = []
    this.notify()
  }

  getCount() {
    return this.entries.length
  }
}

// Singleton instance
export const debugLog = new DebugLogStore()

// Convenience exports
export const logMode = debugLog.logMode.bind(debugLog)
export const logPhase = debugLog.logPhase.bind(debugLog)
export const logTiming = debugLog.logTiming.bind(debugLog)
export const logRender = debugLog.logRender.bind(debugLog)
