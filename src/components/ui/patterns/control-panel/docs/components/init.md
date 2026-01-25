# Components

Sub-components for advanced composition and customization.

---

## Topics

- [ActionBar](./action-bar.md): Presets, copy config, and reset buttons
- [TabNavigation](./tab-navigation.md): Scrollable tabs with fade indicators
- [SectionRenderer](./section-renderer.md): Collapsible groups and control grid
- [MinimizedHeader](./minimized-header.md): Compact expand button

---

## Quick Reference

All components are exported from the main entry point:

```typescript
import {
  // Tab navigation
  ScrollableTabList,
  TabTrigger,
  MinimizeButton,

  // Content rendering
  SectionRenderer,
  ActiveSectionContent,

  // Action bar
  ActionBar,

  // Minimized state
  MinimizedHeader,

  // Control primitives
  ControlGroupWrapper,
  ControlGrid,
  ColorSwatch,
  ControlRenderer,
  SliderControlComponent,
  SelectControlComponent,
  // ... more control components
} from '@/modules/design-system/v2/components/ui/prod/base/control-panel'
```

---

## When to Use

These components are useful when:

1. Building a **custom panel layout** with different structure
2. Adding **additional functionality** between sections
3. Creating **embedded control panels** without fixed positioning
4. Implementing **wizard-style** multi-step configuration

For standard use cases, the `UnifiedControlPanel` component handles everything automatically.
