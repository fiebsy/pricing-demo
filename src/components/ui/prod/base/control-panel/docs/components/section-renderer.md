# SectionRenderer

Renders sections with collapsible groups and animated expand/collapse.

## Overview

The SectionRenderer components handle displaying section content with collapsible control groups. Uses CSS grid animation for smooth height transitions.

## Imports

```typescript
import {
  SectionRenderer,
  ActiveSectionContent,
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
```

## Components

### ActiveSectionContent

Renders a single section's title and groups.

```tsx
<ActiveSectionContent
  section={section}
  onChange={(controlId, value) => {
    // Handle control change
  }}
/>
```

#### Props

```typescript
interface ActiveSectionContentProps {
  section: Section
  onChange: (controlId: string, value: unknown) => void
}
```

| Prop | Type | Description |
|------|------|-------------|
| `section` | `Section` | Section to render |
| `onChange` | `(id, value) => void` | Control change callback |

### SectionRenderer

Renders all sections (for non-tabbed layouts).

```tsx
<SectionRenderer
  sections={sections}
  onChange={handleChange}
/>
```

#### Props

```typescript
interface SectionRendererProps {
  sections: Section[]
  onChange: (controlId: string, value: unknown) => void
}
```

## Structure

```
ActiveSectionContent
├── Section Header (title)
└── Groups Container
    ├── Group Card
    │   └── CollapsibleGroup
    │       ├── Header (title, description, +/- icon)
    │       └── Content
    │           └── ControlGrid
    │               └── ControlRenderer (per control)
    ├── Group Card
    │   └── ...
    └── ...
```

## Animation

Uses CSS grid for height animation:

```tsx
<div
  className={cx(
    'grid transition-[grid-template-rows] duration-200 ease-out',
    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
  )}
>
  <div className="overflow-hidden">
    <div className="space-y-4 pt-3">{children}</div>
  </div>
</div>
```

This approach:
- Animates from `0fr` to `1fr` grid rows
- Works with dynamic content height
- Smoother than `max-height` hacks

## Accessibility

- Uses `aria-expanded` on collapse button
- Uses `aria-controls` linking to content ID
- Generates unique IDs with `useId()`

## Usage Examples

### In TabPanel

```tsx
<TabPanel id={section.id}>
  <div className="pt-2 pb-2.5 pl-2.5 pr-0">
    <ActiveSectionContent
      section={section}
      onChange={handleControlChange}
    />
  </div>
</TabPanel>
```

### Standalone (No Tabs)

```tsx
function SimpleControlPanel({ sections, onChange }) {
  return (
    <div className="bg-tertiary p-4">
      <SectionRenderer
        sections={sections}
        onChange={(controlId, value) => {
          onChange({ controlId, sectionId: '', value })
        }}
      />
    </div>
  )
}
```

---

## Related

- [TabNavigation](./tab-navigation.md) - Tab header components
- [Controls](../controls/init.md) - Individual control types
- [Types](../api/types.md) - Section and ControlGroup types
