# FilterSelectChipMotion

> Motion-based filter chip system to replace `filter-select-chip`.

---

## Migration Overview

This component is the **planned replacement** for `filter-select-chip`. It uses Motion Dev's `AnimatePresence` with `popLayout` instead of the complex CSS-driven animation system in the current implementation.

### Why Migrate?

| Aspect | filter-select-chip (current) | filter-select-chip-motion (new) |
|--------|------------------------------|----------------------------------|
| Animation engine | CSS transitions + clip-path | Motion Dev |
| Complexity | High (backdrop + content layers) | Low (single animated div) |
| Enter/exit | CSS `data-fsc-expanded` + manual width | `AnimatePresence` + `popLayout` |
| Layout shifts | Manual measurement + CSS vars | Automatic via `layout` prop |
| Dropdown | Custom biaxial expansion | Base UI `Select` (anchored) |
| GPU performance | B-tier (width/height animation) | S-tier (opacity/scale/transform) |
| Bundle size | Larger (custom animation system) | Smaller (leverages Motion) |
| Maintenance | Complex, hard to modify | Simple, well-documented |

---

## Migration Status

### Phase 1: Development (Current)
- [x] Core component implementation
- [x] Subcomponent architecture
- [x] Type definitions
- [x] Configuration system
- [x] Playground testing (front-end repo)

### Phase 2: Testing
- [ ] Visual regression testing
- [ ] Accessibility audit
- [ ] Performance benchmarking
- [ ] Cross-browser testing

### Phase 3: Integration
- [x] Update collections page filters (dashboard table)
- [ ] Update any other filter usages
- [ ] Document breaking changes

### Phase 4: Cleanup
- [ ] Deprecate `filter-select-chip`
- [ ] Remove old CSS transition files
- [ ] Update documentation

---

## Key Differences

### Animation Approach

**Old (CSS-based):**
```tsx
// Requires manual measurement, CSS variables, clip-path
<div
  style={{
    '--fsc-chip-width': '120px',
    '--fsc-panel-width': '200px',
  }}
  data-fsc-expanded={isExpanded}
>
  <div className="fsc-backdrop" />
  <div className="fsc-content" />
</div>
```

**New (Motion-based):**
```tsx
// Automatic layout animation, scale entry
<AnimatePresence mode="popLayout">
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
  >
    <Select.Root>...</Select.Root>
  </motion.div>
</AnimatePresence>
```

### Dropdown Behavior

**Old:** Custom biaxial expansion (chip grows into dropdown)
**New:** Base UI Select with `alignItemWithTrigger` (dropdown opens over chip)

### Configuration

**Old:** Single large config object with 30+ options
**New:** Separated `AnimationConfig` and `StyleConfig` with sensible defaults

---

## File Structure

```
filter-select-chip-motion/
├── README.md                     # This file
├── index.ts                      # Public exports
├── types.ts                      # Type definitions
├── config.ts                     # Defaults & helpers
├── filter-select-chip-motion.tsx # Main component
└── components/
    ├── index.ts                  # Subcomponent exports
    ├── animated-chip.tsx         # Motion wrapper
    ├── chip-trigger.tsx          # Select trigger
    ├── chip-popup.tsx            # Dropdown popup
    ├── option-item.tsx           # Select option
    └── remove-button.tsx         # Remove button
```

---

## Usage

### Basic
```tsx
import { FilterSelectChipMotion } from '@/components/ui/prod/base/filter'

<FilterSelectChipMotion
  filters={activeFilters}
  onFilterChange={(id, value) => updateFilter(id, value)}
  onFilterRemove={(id) => removeFilter(id)}
/>
```

### With Custom Config
```tsx
<FilterSelectChipMotion
  filters={activeFilters}
  onFilterChange={handleChange}
  onFilterRemove={handleRemove}
  animationConfig={{
    transitionType: 'spring',
    stiffness: 400,
    damping: 25,
  }}
  styleConfig={{
    size: 'md',
    roundness: 'lg',
    gap: 'sm',
  }}
/>
```

---

## Migration Checklist (Per Usage)

When migrating a page from `FilterSelectChip` to `FilterSelectChipMotion`:

1. **Update imports**
   ```tsx
   // Before
   import { FilterSelectChip } from '@/components/ui/prod/base/filter'

   // After
   import { FilterSelectChipMotion } from '@/components/ui/prod/base/filter'
   ```

2. **Convert data structure**
   ```tsx
   // Before: Individual chips
   <FilterSelectChip value={status} options={statusOptions} ... />
   <FilterSelectChip value={type} options={typeOptions} ... />

   // After: Array of filters
   const filters = [
     { id: 'status', label: 'Status', value: status, options: statusOptions },
     { id: 'type', label: 'Type', value: type, options: typeOptions },
   ]
   <FilterSelectChipMotion filters={filters} ... />
   ```

3. **Update handlers**
   ```tsx
   // Before: Per-chip handlers
   onChange={setStatus}
   onRemove={() => setStatus(null)}

   // After: Centralized handlers
   onFilterChange={(id, value) => {
     if (id === 'status') setStatus(value)
     if (id === 'type') setType(value)
   }}
   onFilterRemove={(id) => {
     if (id === 'status') setStatus(null)
     if (id === 'type') setType(null)
   }}
   ```

4. **Remove old CSS imports** (if any)
   ```tsx
   // Remove
   import '@/styles/filter-select-chip-transitions.css'
   ```

---

## Playground

Test the component in the playground:
- **URL:** `/playground/ui/component/filter-chip-animation`
- **Location:** `front-end/src/modules/playground/ui/component/pages/filter-chip-animation/`

The playground includes a control panel for testing all animation and style options.

---

## References

- [Motion for React Docs](https://motion.dev/docs/react)
- [AnimatePresence](https://motion.dev/docs/react-animate-presence)
- [Base UI Select](https://base-ui.com/components/select)
- [Original filter-select-chip](../filter-select-chip/)
