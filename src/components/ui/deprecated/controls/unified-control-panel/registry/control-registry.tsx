/**
 * Control Registry
 *
 * Extensible registry pattern for control components.
 * Allows registering custom control types without modifying core code.
 *
 * Usage:
 *   // Register a custom control type
 *   registerControl('my-custom', MyCustomControl)
 *
 *   // Use in config
 *   { type: 'my-custom', id: 'foo', label: 'Foo', ...customProps }
 */

'use client'

import { ComponentType, createContext, useContext, ReactNode, useMemo } from 'react'
import type { ControlConfig, BaseControlConfig } from '../types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * Props that all control components receive
 */
export interface ControlComponentProps<T extends BaseControlConfig = BaseControlConfig> {
  config: T
  onChange: (value: unknown) => void
  disabled?: boolean
}

/**
 * A registered control component
 */
export type ControlComponent<T extends BaseControlConfig = BaseControlConfig> = ComponentType<
  ControlComponentProps<T>
>

/**
 * The control registry - maps type names to components
 */
export type ControlRegistry = Map<string, ControlComponent>

// -----------------------------------------------------------------------------
// Default Registry
// -----------------------------------------------------------------------------

/**
 * The default registry instance
 * Built-in controls are registered in control-primitives.tsx
 */
const defaultRegistry: ControlRegistry = new Map()

/**
 * Register a control component for a given type
 */
export function registerControl<T extends BaseControlConfig>(
  type: string,
  component: ControlComponent<T>
): void {
  defaultRegistry.set(type, component as ControlComponent)
}

/**
 * Unregister a control component
 */
export function unregisterControl(type: string): boolean {
  return defaultRegistry.delete(type)
}

/**
 * Get a control component by type
 */
export function getControl(type: string): ControlComponent | undefined {
  return defaultRegistry.get(type)
}

/**
 * Check if a control type is registered
 */
export function hasControl(type: string): boolean {
  return defaultRegistry.has(type)
}

/**
 * Get all registered control types
 */
export function getRegisteredTypes(): string[] {
  return Array.from(defaultRegistry.keys())
}

// -----------------------------------------------------------------------------
// Registry Context (for scoped registries)
// -----------------------------------------------------------------------------

const ControlRegistryContext = createContext<ControlRegistry>(defaultRegistry)

interface ControlRegistryProviderProps {
  children: ReactNode
  registry?: ControlRegistry
  /** If true, extends the default registry instead of replacing it */
  extend?: boolean
}

/**
 * Provider for a custom control registry scope
 * Use this to provide additional controls for a specific subtree
 */
export function ControlRegistryProvider({
  children,
  registry,
  extend = true,
}: ControlRegistryProviderProps) {
  const parentRegistry = useContext(ControlRegistryContext)

  const mergedRegistry = useMemo(() => {
    if (!registry) return parentRegistry

    if (extend) {
      // Merge with parent registry (custom controls override built-in)
      const merged = new Map(parentRegistry)
      registry.forEach((component, type) => {
        merged.set(type, component)
      })
      return merged
    }

    return registry
  }, [registry, extend, parentRegistry])

  return (
    <ControlRegistryContext.Provider value={mergedRegistry}>
      {children}
    </ControlRegistryContext.Provider>
  )
}

/**
 * Hook to access the control registry
 */
export function useControlRegistry(): ControlRegistry {
  return useContext(ControlRegistryContext)
}

/**
 * Hook to render a control from the registry
 */
export function useRenderControl() {
  const registry = useControlRegistry()

  return function renderControl(
    config: ControlConfig,
    onChange: (value: unknown) => void
  ): ReactNode {
    const Component = registry.get(config.type)

    if (!Component) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[ControlRegistry] No component registered for type "${config.type}"`)
      }
      return null
    }

    return (
      <Component
        config={config}
        onChange={onChange}
        disabled={config.disabled}
      />
    )
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export { defaultRegistry, ControlRegistryContext }
