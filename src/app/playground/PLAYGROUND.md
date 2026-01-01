# Playground Configuration Guide

> **CRITICAL**: All playground pages MUST use the `UnifiedControlPanel` component for component customization. This is the standard pattern for Skwircle demos.

---

## Quick Reference

```typescript
// Required imports for any playground page
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
  type UnifiedControlPanelConfig,
  type ControlSection,
} from '@/components/ui/controls/unified-control-panel'
```

---

## Standard Playground Layout

Every playground page follows this structure:

```tsx
export default function ComponentPlaygroundPage() {
  const [config, setConfig] = useState<ComponentConfig>(DEFAULT_CONFIG)

  // Panel configuration - recreate when config changes
  const panelConfig = useMemo<UnifiedControlPanelConfig>(() => ({
    sections: [createPanelConfig(config)],
    defaultActiveTab: 'section-id',
    position: {
      top: '80px',      // Below fixed header
      bottom: '16px',   // Margin from bottom
      right: '16px',    // Margin from right
      width: '320px',   // Panel width
    },
    showReset: true,
    resetLabel: 'Reset',
  }), [config])

  // Handle control changes - update state by controlId
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setConfig(prev => ({ ...prev, [controlId]: value }))
  }, [])

  // Reset to defaults
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
  }, [])

  // For copy/export functionality
  const getConfigForCopy = useCallback(() => config, [config])

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-secondary bg-primary/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/playground" className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors">
              <HugeIcon icon={ArrowLeft01Icon} size={16} />
              Back
            </Link>
            <div className="h-4 w-px border-secondary" />
            <h1 className="text-lg font-semibold text-primary">Component Name</h1>
          </div>
        </div>
      </div>

      {/* Preview Area - offset for panel width */}
      <div className="pt-20 pr-[352px]">
        <div className="flex flex-col min-h-[calc(100vh-80px)] items-center justify-center p-8">
          {/* Component preview */}
          <YourComponent config={config} />
        </div>
      </div>

      {/* Control Panel - fixed position */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
```

---

## Available Control Types

### 1. Slider Control
```typescript
{
  id: 'cardWidth',           // Maps to config property
  label: 'Card Width',
  type: 'slider',
  value: config.cardWidth,
  min: 280,
  max: 600,
  step: 20,
  formatLabel: (v: number) => `${v}px`,
}
```

### 2. Select Control
```typescript
{
  id: 'roundness',
  label: 'Roundness',
  type: 'select',
  value: config.roundness,
  options: [
    { label: 'None', value: 'none' },
    { label: 'Rounded', value: 'rounded' },
    { label: 'Pill', value: 'pill' },
  ],
}
```

### 3. Color Control
```typescript
{
  id: 'backgroundColor',
  label: 'Background',
  type: 'color',
  value: config.backgroundColor,
  showValue: true,  // Show hex value below picker
}
```

### 4. Color Select (Swatches)
```typescript
{
  id: 'theme',
  label: 'Theme Color',
  type: 'color-select',
  value: config.theme,
  options: [
    { label: 'Blue', value: 'blue', color: '#3B82F6' },
    { label: 'Red', value: 'red', color: '#EF4444' },
  ],
  swatchSize: 'md',  // 'xs' | 'sm' | 'md'
}
```

### 5. Color Array Control
```typescript
{
  id: 'gradientColors',
  label: 'Gradient Colors',
  type: 'color-array',
  value: config.gradientColors,
  count: 3,  // Number of color pickers
}
```

### 6. Checkbox Control
```typescript
{
  id: 'showBorder',
  label: 'Show Border',
  type: 'checkbox',
  value: config.showBorder,
}
```

### 7. Inline Toggle Control
```typescript
{
  id: 'enabled',
  label: 'Enable Feature',
  type: 'inline-toggle',
  value: config.enabled,
}
```

### 8. Text Control
```typescript
{
  id: 'title',
  label: 'Title',
  type: 'text',
  value: config.title,
  placeholder: 'Enter title...',
  maxLength: 50,
}
```

### 9. Custom Control
```typescript
{
  id: 'custom',
  label: 'Custom Control',
  type: 'custom',
  render: () => <CustomComponent />,
}
```

---

## Section Configuration Pattern

```typescript
const createPanelConfig = (config: ComponentConfig): ControlSection => ({
  id: 'component-name',
  title: 'Component Name',
  tabLabel: 'Tab',      // Short label for tab navigation
  subsections: [
    {
      title: 'Subsection Title',
      controls: [
        // Control configs here
      ],
      columns: 1,         // Optional: 1 | 2 | 3 | 4
      collapsible: false, // Optional: makes subsection collapsible
      defaultCollapsed: false,
    },
    // More subsections...
  ],
  defaultCollapsed: false,  // Optional: section starts collapsed
})
```

### Multi-Tab Configuration
```typescript
const panelConfig = useMemo<UnifiedControlPanelConfig>(() => ({
  sections: [
    createContainerSection(config),
    createStyleSection(config),
    createContentSection(config),
  ],
  defaultActiveTab: 'container',
  // ... rest of config
}), [config])
```

---

## Conditional Controls

Disable controls based on other values:

```typescript
{
  id: 'direction',
  label: 'Direction',
  type: 'select',
  value: config.direction,
  options: DIRECTION_OPTIONS,
  disabled: config.intensity === 'none',  // Disabled when intensity is none
}
```

---

## Best Practices

### 1. Config State Pattern
- Define a typed interface for your component config
- Create a `DEFAULT_CONFIG` constant
- Use single state object for all configurable properties
- Map control `id` directly to config property names

### 2. Panel Position
- Use `top: '80px'` to account for fixed header
- Use `pr-[352px]` on preview area (panel width + padding)
- Standard panel width is `320px`

### 3. Control Organization
- Group related controls in subsections
- Use clear, descriptive labels
- Add `formatLabel` for numeric values with units
- Order controls by importance/frequency of use

### 4. Performance
- Wrap `panelConfig` in `useMemo` with config dependency
- Use `useCallback` for handlers
- Only recalculate panel config when needed

### 5. Default Values
- Set sensible defaults that showcase the component well
- Ensure all config properties have default values

---

## Example: Creating a New Playground

1. **Define config interface and defaults**:
```typescript
interface ButtonConfig {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  label: string
  disabled: boolean
}

const DEFAULT_CONFIG: ButtonConfig = {
  variant: 'primary',
  size: 'md',
  label: 'Click Me',
  disabled: false,
}
```

2. **Create panel configuration function**:
```typescript
const createPanelConfig = (config: ButtonConfig): ControlSection => ({
  id: 'button',
  title: 'Button',
  tabLabel: 'Button',
  subsections: [
    {
      title: 'Appearance',
      controls: [
        {
          id: 'variant',
          label: 'Variant',
          type: 'select',
          value: config.variant,
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          type: 'select',
          value: config.size,
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
      ],
    },
    {
      title: 'Content',
      controls: [
        {
          id: 'label',
          label: 'Label',
          type: 'text',
          value: config.label,
          placeholder: 'Button text...',
        },
        {
          id: 'disabled',
          label: 'Disabled',
          type: 'checkbox',
          value: config.disabled,
        },
      ],
    },
  ],
})
```

3. **Follow the standard layout template** (see above)

---

## Reference Implementation

See `/playground/skwircle-card/page.tsx` for a complete reference implementation with:
- Complex config state management
- Multiple subsections
- Various control types
- Dynamic control disabling
- Custom component preview

---

**Last Updated**: January 2026
