export interface ComponentInfo {
  name: string
  filePath: string | null
  lineNumber: number | null
  props: Record<string, unknown>
  element: HTMLElement | null
}

export interface BrowserAction {
  id: string
  type: 'refresh' | 'navigate' | 'highlight' | 'scroll_to' | 'custom'
  payload?: Record<string, unknown>
  timestamp: number
}

export interface MCPContextValue {
  isInspectorActive: boolean
  toggleInspector: () => void
  hoveredComponent: ComponentInfo | null
  selectedComponent: ComponentInfo | null
  clearSelection: () => void
  syncStatus: 'idle' | 'syncing' | 'synced' | 'error'
}
