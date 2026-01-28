'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface ElementBounds {
  x: number
  y: number
  width: number
  height: number
}

export interface ComponentInfo {
  name: string
  filePath: string | null
  lineNumber: number | null
  props: Record<string, unknown>
  element: HTMLElement | null
  bounds: ElementBounds | null
  selector: string | null
}

interface ReactFiber {
  type: {
    name?: string
    displayName?: string
  } | string | null
  _debugSource?: {
    fileName: string
    lineNumber: number
    columnNumber?: number
  }
  memoizedProps?: Record<string, unknown>
  return?: ReactFiber
}

// Essential props that are commonly useful for debugging
const ESSENTIAL_PROPS = new Set([
  'className',
  'id',
  'href',
  'src',
  'alt',
  'title',
  'type',
  'value',
  'name',
  'placeholder',
  'disabled',
  'checked',
  'selected',
  'variant',
  'size',
  'color',
  'open',
  'active',
  'loading',
  'error'
])

// Props that should always be excluded
const EXCLUDED_PROPS = new Set([
  'children',
  'ref',
  'key',
  '_owner',
  '_store',
  '__source',
  '__self'
])

export interface SerializationOptions {
  mode?: 'minimal' | 'standard' | 'detailed'
  maxProps?: number
  maxDepth?: number
  includeDataAttrs?: boolean
}

// Serialize props safely with performance optimizations
function serializeProps(
  props: Record<string, unknown>,
  options: SerializationOptions = {}
): Record<string, unknown> {
  const {
    mode = 'minimal',
    maxProps = mode === 'minimal' ? 5 : mode === 'standard' ? 10 : 20,
    maxDepth = mode === 'minimal' ? 2 : mode === 'standard' ? 3 : 5,
    includeDataAttrs = mode !== 'minimal'
  } = options

  const seen = new WeakSet()
  let propCount = 0

  function serialize(value: unknown, depth = 0): unknown {
    if (depth > maxDepth) return '[...]'
    if (value === null || value === undefined) return value
    if (typeof value === 'function') return '[fn]'
    if (typeof value === 'symbol') return '[sym]'

    if (typeof value === 'object') {
      if (seen.has(value as object)) return '[circular]'
      seen.add(value as object)

      if (Array.isArray(value)) {
        return mode === 'minimal' 
          ? `[Array(${value.length})]`
          : value.slice(0, 3).map((v) => serialize(v, depth + 1))
      }

      // Skip Promises
      if (value instanceof Promise || (value && typeof (value as Promise<unknown>).then === 'function')) {
        return '[Promise]'
      }

      // Skip React elements and DOM nodes
      if ('$$typeof' in value || value instanceof HTMLElement) {
        return '[ReactElement]'
      }

      const result: Record<string, unknown> = {}
      
      // In minimal mode, just show object type
      if (mode === 'minimal' && depth > 0) {
        return '{...}'
      }

      for (const [k, v] of Object.entries(value)) {
        if (propCount >= maxProps) break
        
        // Skip excluded props
        if (EXCLUDED_PROPS.has(k) || k.startsWith('_')) continue
        
        // In minimal mode, only include essential props
        if (mode === 'minimal' && !ESSENTIAL_PROPS.has(k)) {
          if (!includeDataAttrs || !k.startsWith('data-')) continue
        }
        
        result[k] = serialize(v, depth + 1)
        propCount++
      }
      
      return result
    }

    // Simplify long strings in minimal mode
    if (typeof value === 'string' && mode === 'minimal' && value.length > 50) {
      return value.substring(0, 47) + '...'
    }

    return value
  }

  // Start with only essential props for minimal mode
  if (mode === 'minimal') {
    const filtered: Record<string, unknown> = {}
    for (const key of Object.keys(props)) {
      if (ESSENTIAL_PROPS.has(key) || (includeDataAttrs && key.startsWith('data-'))) {
        filtered[key] = props[key]
      }
    }
    return serialize(filtered) as Record<string, unknown>
  }

  return serialize(props) as Record<string, unknown>
}

// Get React fiber from DOM element
function getFiberFromElement(element: HTMLElement): ReactFiber | null {
  const key = Object.keys(element).find(
    (key) =>
      key.startsWith('__reactFiber$') ||
      key.startsWith('__reactInternalInstance$')
  )

  if (!key) return null
  return (element as unknown as Record<string, ReactFiber>)[key]
}

// Generate a unique CSS selector for an element
function generateSelector(element: HTMLElement): string {
  // Build a unique selector using data attributes, id, or class names
  const parts: string[] = []
  let current: HTMLElement | null = element

  while (current && current !== document.body) {
    const tagName = current.tagName.toLowerCase()
    let selector = tagName

    // Prefer id (most unique)
    if (current.id) {
      parts.unshift(`#${CSS.escape(current.id)}`)
      break // ID is unique, we're done
    }

    // Try data-testid or data-component attributes
    const testId = current.getAttribute('data-testid')
    if (testId) {
      parts.unshift(`[data-testid="${CSS.escape(testId)}"]`)
      break
    }
    const componentId = current.getAttribute('data-component')
    if (componentId) {
      parts.unshift(`[data-component="${CSS.escape(componentId)}"]`)
      break
    }

    // Add class names (filter out dynamic ones like React-generated)
    const classes = Array.from(current.classList)
      .filter(c => !c.includes('__') && !c.match(/^[a-z]+[A-Z]/) && c.length < 30)
      .slice(0, 2)
    if (classes.length > 0) {
      selector += classes.map(c => `.${CSS.escape(c)}`).join('')
    }

    // Add nth-of-type if needed for uniqueness among siblings
    const parent: HTMLElement | null = current.parentElement
    if (parent) {
      const currentTagName = current.tagName
      const sameTagSiblings = Array.from(parent.children).filter(
        (child) => child.tagName === currentTagName
      )
      if (sameTagSiblings.length > 1) {
        const index = sameTagSiblings.indexOf(current) + 1
        selector += `:nth-of-type(${index})`
      }
    }

    parts.unshift(selector)
    current = parent
  }

  return parts.join(' > ')
}

// Get element bounds using getBoundingClientRect
function getElementBounds(element: HTMLElement): ElementBounds {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.x + window.scrollX,
    y: rect.y + window.scrollY,
    width: rect.width,
    height: rect.height
  }
}

// Find the nearest user component (not built-in DOM element)
function findUserComponent(fiber: ReactFiber | null): ReactFiber | null {
  let current = fiber

  while (current) {
    // Check if it's a user component (function/class with a name)
    if (current.type && typeof current.type !== 'string') {
      const name = current.type.displayName || current.type.name
      if (name && !name.startsWith('_') && name !== 'Fragment') {
        return current
      }
    }
    current = current.return || null
  }

  return null
}

// Extract component info from fiber
function extractComponentInfo(
  fiber: ReactFiber,
  element: HTMLElement,
  serializationMode: SerializationOptions['mode'] = 'minimal'
): ComponentInfo {
  const type = fiber.type as { displayName?: string; name?: string }
  const name = type?.displayName || type?.name || 'Unknown'
  const debugSource = fiber._debugSource

  return {
    name,
    filePath: debugSource?.fileName || null,
    lineNumber: debugSource?.lineNumber || null,
    props: serializeProps(fiber.memoizedProps || {}, { mode: serializationMode }),
    element,
    bounds: getElementBounds(element),
    selector: generateSelector(element),
  }
}

export function useComponentInspector() {
  const [isActive, setIsActive] = useState(false)
  const [hoveredComponent, setHoveredComponent] = useState<ComponentInfo | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle')
  const lastSyncedRef = useRef<string | null>(null)

  // Sync selection to backend
  const syncSelection = useCallback(async (component: ComponentInfo) => {
    // Skip if same component
    const key = `${component.name}-${component.filePath}-${component.lineNumber}`
    if (key === lastSyncedRef.current) return

    setSyncStatus('syncing')
    try {
      const response = await fetch('/api/mcp/selected-component', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: component.name,
          filePath: component.filePath,
          lineNumber: component.lineNumber,
          props: component.props,
          bounds: component.bounds,
          selector: component.selector,
        }),
      })

      if (response.ok) {
        lastSyncedRef.current = key
        setSyncStatus('synced')
      } else {
        setSyncStatus('error')
      }
    } catch {
      setSyncStatus('error')
    }
  }, [])

  // Handle mouse move (hover detection)
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isActive) return

      const target = event.target as HTMLElement
      if (!target || target === document.body) {
        setHoveredComponent(null)
        return
      }

      const fiber = getFiberFromElement(target)
      const userFiber = findUserComponent(fiber)

      if (userFiber) {
        const info = extractComponentInfo(userFiber, target)
        setHoveredComponent(info)
      } else {
        setHoveredComponent(null)
      }
    },
    [isActive]
  )

  // Handle click (selection)
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!isActive) return

      // Ignore clicks on inspector UI itself
      const target = event.target as HTMLElement
      if (target.closest('[data-mcp-inspector]')) return

      event.preventDefault()
      event.stopPropagation()

      const fiber = getFiberFromElement(target)
      const userFiber = findUserComponent(fiber)

      if (userFiber) {
        const info = extractComponentInfo(userFiber, target)
        setSelectedComponent(info)
        syncSelection(info)
      }
    },
    [isActive, syncSelection]
  )

  // Handle keyboard shortcut (Cmd+Shift+I)
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.shiftKey && event.key === 'i') {
      event.preventDefault()
      setIsActive((prev) => !prev)
    }
  }, [])

  // Toggle inspector
  const toggle = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  // Clear selection
  const clearSelection = useCallback(async () => {
    setSelectedComponent(null)
    lastSyncedRef.current = null
    setSyncStatus('idle')
    try {
      await fetch('/api/mcp/selected-component', { method: 'DELETE' })
    } catch {
      // Ignore
    }
  }, [])

  // Event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return

    document.addEventListener('keydown', handleKeyDown)

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('click', handleClick, true)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick, true)
    }
  }, [isActive, handleMouseMove, handleClick, handleKeyDown])

  return {
    isActive,
    toggle,
    hoveredComponent,
    selectedComponent,
    clearSelection,
    syncStatus,
  }
}
