# Styling & Customization (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. See [../STYLING.md](../STYLING.md) for current styling guide.

---

Complete guide to customizing the appearance of StickyDataTable.

## Border System

The table provides granular control over all borders through `BorderConfig`.

### Border Types

1. **Outer Borders** - Around the entire table
2. **Row Borders** - Between table rows
3. **Cell Borders** - Between columns

### Basic Border Configuration

```tsx
borderConfig={{
  outerColor: 'border-primary',    // Outer border color
  rowColor: 'border-tertiary',     // Row separator color
  cellColor: 'border-tertiary',    // Column separator color
  showOuter: true,                 // Show outer borders
  showRows: true,                  // Show row borders
  showCells: true,                 // Show cell borders
}}
```

### Side-Specific Border Colors

Override outer border colors per side:

```tsx
borderConfig={{
  outerColor: 'border-primary',    // Default for all sides
  leftColor: 'border-secondary',    // Override left side
  rightColor: 'border-secondary',   // Override right side
  topColor: 'border-primary',       // Override top side
  bottomColor: 'border-primary',    // Override bottom side
}}
```

### Hiding Borders

**Hide Row Borders:**

```tsx
borderConfig={{
  showRows: false,
}}
```

**Hide Cell Borders:**

```tsx
borderConfig={{
  showCells: false,
}}
```

**Hide Outer Borders:**

```tsx
borderConfig={{
  showOuter: false,
}}
```

**Hide Specific Sides:**

```tsx
borderConfig={{
  showOuter: true,
  showLeft: false,   // Hide left border
  showRight: false,   // Hide right border
  showTop: false,     // Hide top border
  showBottom: false,  // Hide bottom border
}}
```

### Transparent Borders for Specific Columns

Use `hideCellBordersForColumns` to make borders transparent (maintains spacing):

```tsx
borderConfig={{
  hideCellBordersForColumns: ['rank', 'id'],
}}
```

This is useful for visual grouping or when you want spacing without visible borders.

### Sticky Column Borders

When scroll arrows are visible, sticky columns automatically get enhanced borders for visual separation. This is controlled by the `StickyState` system and cannot be disabled per-column, but you can customize the color via `borderConfig.cellColor`.

## Background System

Control backgrounds for all table sections through `BackgroundConfig`.

### Background Sections

1. **Header Wrapper** - Container around the sticky header
2. **Header Container** - Inner header container
3. **Header Sticky Cells** - Sticky header cells (two states: default and with arrows)
4. **Body Container** - Table body container
5. **Row Sticky Cells** - Sticky row cells (two states: default and with arrows)
6. **Row Hover** - Hover state for rows

### Basic Background Configuration

```tsx
backgroundConfig={{
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_alt',
  headerStickyCell: 'bg-secondary_alt/95',
  headerStickyCellWithArrows: 'bg-tertiary/95',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-tertiary/95',
  rowHover: 'bg-secondary',
}}
```

### Enhanced Styling States

When scroll arrows are visible, sticky cells automatically switch to "enhanced" styling:

- **Header**: `headerStickyCellWithArrows` replaces `headerStickyCell`
- **Body**: `rowStickyCellWithArrows` replaces `rowStickyCell`

This provides visual feedback that scrolling is active.

### Custom Background Examples

**Custom Header Background:**

```tsx
backgroundConfig={{
  headerStickyCell: 'bg-primary',
  headerStickyCellWithArrows: 'bg-primary/90',
}}
```

**Custom Row Hover:**

```tsx
backgroundConfig={{
  rowHover: 'bg-tertiary',
}}
```

**Transparent Sticky Cells:**

```tsx
backgroundConfig={{
  rowStickyCell: 'bg-transparent',
  rowStickyCellWithArrows: 'bg-tertiary/50',
}}
```

## Column Animations

The table includes smooth animations when columns are added or removed via the column control panel.

### How Animations Work

**Column Addition:**

- Animates in with scale/fade/slide effect
- Duration: 600ms with bouncy easing
- Effects: Scale from 80% → 102% → 100%, fade in, slide from left

**Column Removal:**

- Animates out before DOM removal
- Duration: 400ms with smooth easing
- Effects: Scale down, fade out, slide left, dimming
- Column stays in DOM temporarily to allow animation completion

**Grid Transition:**

- Grid template smoothly transitions to new layout
- Remaining columns shift smoothly
- Duration: 400ms synchronized with removal animation

### Disabling Animations

If animations cause performance issues, you can disable them:

**Option 1: Remove Animation Classes (Recommended)**

Edit `components/table-header.tsx` and `components/table-row.tsx`:

```tsx
// Find this code:
const animationClass = isLeaving ? 'animate-column-remove' : isBeingAdded || isResetAdd ? 'animate-column-add' : ''

// Replace with:
const animationClass = '' // Disable animations
```

**Option 2: Remove CSS Animations**

Comment out animation CSS in `src/styles/globals.css`:

```css
/* Comment out these sections: */
/*
@keyframes column-add { ... }
@keyframes column-remove { ... }
.animate-column-add { ... }
.animate-column-remove { ... }
*/
```

### Performance Considerations

- Animations use GPU-accelerated properties (transform, opacity)
- Leaving columns are automatically cleaned up after 400ms
- Grid transitions only activate during column changes
- No performance impact when columns are not being toggled

## Border Radius

Control the table's border radius:

```tsx
<StickyDataTable
  borderRadius={16} // Custom radius (default: 20px)
  // ... other props
/>
```

## Dark Mode Support

The component uses semantic design tokens that automatically adapt to dark mode:

- Use semantic tokens like `border-primary`, `bg-primary`, `text-primary`
- Avoid raw colors like `border-gray-300`, `bg-white`
- Dark mode is controlled by the `.dark-mode` class on a parent element

### Semantic Token Examples

**✅ Correct (Dark Mode Compatible):**

```tsx
borderConfig={{
  outerColor: 'border-primary',    // Adapts to dark mode
  rowColor: 'border-tertiary',     // Adapts to dark mode
}}
```

**❌ Incorrect (Not Dark Mode Compatible):**

```tsx
borderConfig={{
  outerColor: 'border-gray-300',   // Fixed color
  rowColor: 'border-gray-200',     // Fixed color
}}
```

## CSS Grid Layout

The table uses CSS Grid for perfect column alignment:

- Grid template is generated from `stickyColumns` + `scrollableColumns`
- Column widths match exactly between header and body
- Sticky columns use `position: sticky` with calculated `left` offsets

### Grid Template Generation

The grid template is automatically generated based on column configurations:

- **Sticky columns**: Fixed pixel widths (or `minmax()` if `maxWidth` specified)
- **Scrollable columns**: Flexible widths using `fr` units (or `minmax()` with constraints)

Example grid template: `"48px 180px minmax(100px, 200px) 1fr 2fr"`

## Custom Styling Tips

### Matching App Layout Backgrounds

To match your app layout background:

```tsx
backgroundConfig={{
  headerWrapper: 'bg-secondary_alt',  // Match app-layout background
  headerContainer: 'bg-secondary_alt',
  bodyContainer: 'bg-primary',
}}
```

### Creating Visual Hierarchy

Use different border colors to create hierarchy:

```tsx
borderConfig={{
  outerColor: 'border-primary',      // Strong outer border
  rowColor: 'border-tertiary',       // Subtle row separators
  cellColor: 'border-transparent',   // No cell borders
}}
```

### Grouping Columns Visually

Hide borders between related columns:

```tsx
borderConfig={{
  hideCellBordersForColumns: ['rank', 'name'], // Group first two columns
}}
```

## Best Practices

1. **Use Semantic Tokens** - Always use semantic design tokens for dark mode compatibility
2. **Consistent Spacing** - Use `hideCellBordersForColumns` for spacing without visible borders
3. **Visual Feedback** - Enhanced sticky styling provides clear scrolling feedback
4. **Performance** - Animations are GPU-accelerated, but disable if causing issues
5. **Accessibility** - Ensure sufficient contrast between borders and backgrounds
