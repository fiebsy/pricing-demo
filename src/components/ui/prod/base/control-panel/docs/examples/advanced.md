# Advanced Usage

Custom controls, state management patterns, and advanced composition.

## Custom Controls

Render arbitrary content using the `custom` control type.

### Color Palette Picker

```tsx
const [activeColor, setActiveColor] = useState('#3b82f6')
const colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6']

const customControl: Control = {
  id: 'palette',
  type: 'custom',
  label: 'Color Palette',
  render: () => (
    <div className="space-y-2">
      <label className="text-secondary font-mono text-xs">Color Palette</label>
      <div className="flex gap-1">
        {colors.map((color) => (
          <button
            key={color}
            className={cx(
              'size-8 rounded border-2 transition-transform',
              activeColor === color
                ? 'border-primary scale-110'
                : 'border-transparent hover:scale-105'
            )}
            style={{ backgroundColor: color }}
            onClick={() => setActiveColor(color)}
          />
        ))}
      </div>
    </div>
  ),
}
```

## State Management Patterns

### useReducer for Complex State

```tsx
interface State {
  columns: number
  gap: number
  theme: string
}

type Action =
  | { type: 'SET_VALUE'; id: string; value: unknown }
  | { type: 'RESET' }
  | { type: 'APPLY_PRESET'; preset: State }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, [action.id]: action.value }
    case 'RESET':
      return DEFAULT_STATE
    case 'APPLY_PRESET':
      return action.preset
    default:
      return state
  }
}

function MyPanel() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)

  const handleChange = (event: ControlChangeEvent) => {
    dispatch({ type: 'SET_VALUE', id: event.controlId, value: event.value })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET' })
  }
}
```

### URL State Sync

```tsx
import { useSearchParams, useRouter } from 'next/navigation'

function URLSyncPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const columns = Number(searchParams.get('columns')) || 3
  const gap = Number(searchParams.get('gap')) || 16

  const handleChange = (event: ControlChangeEvent) => {
    const params = new URLSearchParams(searchParams)
    params.set(event.controlId, String(event.value))
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  // Config uses URL values
  const config = useMemo(() => ({
    sections: [{
      id: 'layout',
      label: 'Layout',
      title: 'Layout',
      groups: [{
        controls: [
          { id: 'columns', type: 'slider', value: columns, /* ... */ },
          { id: 'gap', type: 'slider', value: gap, /* ... */ },
        ],
      }],
    }],
  }), [columns, gap])

  return <UnifiedControlPanel config={config} onChange={handleChange} />
}
```

### Local Storage Persistence

```tsx
const STORAGE_KEY = 'panel-config'

function PersistentPanel() {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_STATE
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_STATE
  })

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const handleChange = (event: ControlChangeEvent) => {
    setState(prev => ({ ...prev, [event.controlId]: event.value }))
  }
}
```

## Controlled Minimize State

Sync minimize state with external storage:

```tsx
function ControlledMinimize() {
  const [minimized, setMinimized] = useState(() => {
    return localStorage.getItem('panel-minimized') === 'true'
  })

  const handleMinimizedChange = (value: boolean) => {
    setMinimized(value)
    localStorage.setItem('panel-minimized', String(value))
  }

  return (
    <UnifiedControlPanel
      config={config}
      onChange={handleChange}
      minimized={minimized}
      onMinimizedChange={handleMinimizedChange}
    />
  )
}
```

## Conditional Sections

Show/hide sections based on state:

```tsx
const config: PanelConfig = useMemo(() => ({
  sections: [
    {
      id: 'basic',
      label: 'Basic',
      title: 'Basic Settings',
      groups: [/* ... */],
    },

    // Only show advanced if enabled
    ...(showAdvanced ? [{
      id: 'advanced',
      label: 'Advanced',
      title: 'Advanced Settings',
      groups: [/* ... */],
    }] : []),

    // Only show debug in development
    ...(process.env.NODE_ENV === 'development' ? [{
      id: 'debug',
      label: 'Debug',
      title: 'Debug Tools',
      groups: [/* ... */],
    }] : []),
  ],
}), [showAdvanced])
```

## Dynamic Controls

Generate controls from data:

```tsx
const properties = ['width', 'height', 'padding', 'margin']

const controls: Control[] = properties.map((prop) => ({
  id: prop,
  type: 'slider',
  label: prop.charAt(0).toUpperCase() + prop.slice(1),
  value: values[prop],
  min: 0,
  max: 100,
  step: 4,
  formatLabel: (v) => `${v}px`,
}))
```

---

## Related

- [Basic Usage](./basic-usage.md) - Getting started
- [Presets](./presets.md) - Preset management
- [Context](../api/context.md) - State management API
- [Components](../components/init.md) - Sub-components for composition
