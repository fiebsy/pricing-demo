# Column Reordering

Deep dive into StickyDataTable's drag-and-drop column reordering system: pointer-based drag, hit detection, FLIP animations, and visual feedback.

---

## Overview

Column reordering allows users to drag column headers to rearrange the table layout. The implementation uses **pointer events** (not HTML5 drag-and-drop) for full control over cursor, drag preview, and animations.

### Key Features

- **Pointer-based drag** - Full cursor control with `grabbing` cursor
- **Floating drag clone** - Semi-transparent label follows cursor
- **Hit detection** - Real-time drop target detection via cached DOMRects
- **FLIP animations** - Smooth column shifts (dragged column snaps, others animate)
- **Constraints** - Sticky columns and checkbox column cannot be reordered

---

## Basic Setup

### Enable Reordering

```tsx
import { useColumnConfiguration } from '../hooks'

const { columns: orderedColumns, reorderColumns } = useColumnConfiguration({
  columns: COLUMN_CONFIGS,
  storageKey: 'my-table-columns', // Optional: persist to localStorage
})

<StickyDataTable
  columns={orderedColumns}
  enableColumnReorder={true}
  onReorderColumns={reorderColumns}
  // ... other props
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `enableColumnReorder` | `boolean` | Enable drag-and-drop column reordering |
| `onReorderColumns` | `(fromKey: string, toKey: string) => void` | Callback when columns are reordered (uses keys for correct handling with hidden columns) |

> **Note**: The callback uses column **keys** instead of indices. This ensures correct reordering even when some columns are hidden, as indices in the visible columns array would not match the full columns array.

---

## Architecture

### Component Flow

```
User drags column handle
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  TableHeader (table-header.tsx)                                 │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ PointerDragState│    │ columnRectsRef  │                    │
│  │ - isDragging    │    │ Map<key, Rect>  │                    │
│  │ - draggedKey    │    │ (hit detection) │                    │
│  │ - dragOverKey   │    └─────────────────┘                    │
│  │ - pointerX/Y    │                                           │
│  │ - dragWidth/H   │    ┌─────────────────┐                    │
│  │ - dragLabel     │    │ lastDroppedKey  │                    │
│  └─────────────────┘    │ (FLIP animation)│                    │
│                         └─────────────────┘                    │
│                                                                 │
│  Handlers:                                                      │
│  - handlePointerDown → Capture pointer, store rects            │
│  - handlePointerMove → Update position, find drop target       │
│  - handlePointerUp   → Perform reorder, trigger FLIP           │
│  - handlePointerCancel → Reset state                           │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  useAutoColumnFlip (use-auto-column-flip.ts)                    │
│                                                                 │
│  - Detects column order changes                                 │
│  - Skips dragged column (snaps instantly)                      │
│  - Animates shifted columns via Web Animations API (WAAPI)     │
│  - Uses container-relative positions for accuracy              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Drag State

### PointerDragState Interface

```tsx
interface PointerDragState {
  isDragging: boolean        // Whether currently dragging
  draggedKey: string | null  // Key of column being dragged
  dragOverKey: string | null // Key of column being hovered
  pointerX: number           // Current pointer X position
  pointerY: number           // Current pointer Y position
  dragWidth: number          // Width of dragged element
  dragHeight: number         // Height of dragged element
  dragLabel: string          // Label text for drag clone
}
```

### Initial State

```tsx
const [dragState, setDragState] = useState<PointerDragState>({
  isDragging: false,
  draggedKey: null,
  dragOverKey: null,
  pointerX: 0,
  pointerY: 0,
  dragWidth: 0,
  dragHeight: 0,
  dragLabel: '',
})
```

---

## Hit Detection

### Capturing Column Rects

On `pointerdown`, all column positions are cached for efficient hit testing:

```tsx
const columnRectsRef = useRef<Map<string, DOMRect>>(new Map())

const captureColumnRects = useCallback(() => {
  const container = headerScrollRef.current
  if (!container) return

  columnRectsRef.current.clear()
  const cells = container.querySelectorAll('[data-column-key]')
  cells.forEach((cell) => {
    const key = cell.getAttribute('data-column-key')
    if (key) {
      columnRectsRef.current.set(key, cell.getBoundingClientRect())
    }
  })
}, [headerScrollRef])
```

### Finding Drop Target

During `pointermove`, the drop target is found by checking pointer position against cached rects:

```tsx
const findDropTarget = useCallback((x: number, y: number): string | null => {
  for (const [key, rect] of columnRectsRef.current.entries()) {
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      const col = allColumns.find((c) => c.key === key)
      if (col && isValidDropTarget(col)) {
        return key
      }
    }
  }
  return null
}, [allColumns, isValidDropTarget])
```

---

## Pointer Event Handlers

### handlePointerDown

Initiates drag when user clicks the drag handle:

```tsx
const handlePointerDown = useCallback((e: React.PointerEvent, columnKey: string, label: string) => {
  e.preventDefault()
  e.stopPropagation()

  const target = e.currentTarget as HTMLElement
  const cell = target.closest('[data-column-key]') as HTMLElement
  if (!cell) return

  const rect = cell.getBoundingClientRect()

  // Capture pointer for tracking outside element
  target.setPointerCapture(e.pointerId)

  // Cache all column positions for hit testing
  captureColumnRects()

  setDragState({
    isDragging: true,
    draggedKey: columnKey,
    dragOverKey: null,
    pointerX: e.clientX,
    pointerY: e.clientY,
    dragWidth: rect.width,
    dragHeight: rect.height,
    dragLabel: label,
  })
}, [captureColumnRects])
```

### handlePointerMove

Updates position and detects drop targets:

```tsx
const handlePointerMove = useCallback((e: React.PointerEvent) => {
  if (!dragState.isDragging) return

  const dropTarget = findDropTarget(e.clientX, e.clientY)

  setDragState((prev) => ({
    ...prev,
    pointerX: e.clientX,
    pointerY: e.clientY,
    dragOverKey: dropTarget !== prev.draggedKey ? dropTarget : null,
  }))
}, [dragState.isDragging, findDropTarget])
```

### handlePointerUp

Completes the drag and triggers reorder:

```tsx
const handlePointerUp = useCallback((e: React.PointerEvent) => {
  if (!dragState.isDragging || !dragState.draggedKey) {
    setDragState((prev) => ({ ...prev, isDragging: false, draggedKey: null, dragOverKey: null }))
    return
  }

  const targetKey = findDropTarget(e.clientX, e.clientY)

  if (targetKey && targetKey !== dragState.draggedKey && onReorderColumns) {
    // Store for FLIP animation (dragged column excluded)
    lastDroppedKeyRef.current = dragState.draggedKey

    // Pass column keys directly - the hook will find correct indices in full array
    // This ensures correct reordering even when some columns are hidden
    onReorderColumns(dragState.draggedKey, targetKey)

    // Clear after animation completes
    setTimeout(() => {
      lastDroppedKeyRef.current = null
    }, ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION + 50)
  }

  // Reset drag state
  setDragState({
    isDragging: false,
    draggedKey: null,
    dragOverKey: null,
    pointerX: 0,
    pointerY: 0,
    dragWidth: 0,
    dragHeight: 0,
    dragLabel: '',
  })
}, [dragState.isDragging, dragState.draggedKey, findDropTarget, onReorderColumns])
```

---

## FLIP Animation

### How It Works

FLIP (First, Last, Invert, Play) animates columns that shift position:

1. **First**: Capture positions before change (stored in `prevPositionsRef`)
2. **Last**: DOM updates with new column order
3. **Invert**: Calculate position delta for each column
4. **Play**: Animate from inverted position to final position

### Key Implementation Details

Located in `hooks/use-auto-column-flip.ts`:

```tsx
export function useAutoColumnFlip(
  containerRef: React.RefObject<HTMLElement>,
  columnKeys: Set<string> | string[],
  options: UseAutoColumnFlipOptions = {}
)
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable/disable animations |
| `duration` | `number` | `200ms` | Animation duration |
| `threshold` | `number` | `2px` | Minimum movement to trigger |
| `easing` | `string` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | CSS easing |
| `draggedKey` | `string \| null` | `null` | Column to exclude from animation |

### Index-Based Change Detection

Only columns that actually changed INDEX animate (not just position):

```tsx
// Determine which columns actually changed INDEX
const changedIndexKeys = new Set<string>()
keysArray.forEach((key, newIndex) => {
  const oldIndex = prevKeys.indexOf(key)
  if (oldIndex !== -1 && oldIndex !== newIndex) {
    changedIndexKeys.add(key)
  }
})

// Skip columns that didn't change index
if (!changedIndexKeys.has(key)) {
  return
}

// Skip the dragged column (it snaps, others animate)
if (draggedKey && key === draggedKey) {
  return
}
```

### Container-Relative Positioning

Positions are calculated relative to the container to avoid viewport offset issues:

```tsx
const containerRect = container.getBoundingClientRect()
const newLeft = newRect.left - containerRect.left
const deltaX = oldPos.left - newLeft
```

---

## Visual Feedback

### Drag Handle

The drag handle appears on hover, positioned opposite to label alignment:

```tsx
{isDraggable && (
  <div
    className={`
      absolute top-1/2 -translate-y-1/2 z-10
      ${dragHandlePosition === 'left' ? 'left-2' : 'right-2'}
      cursor-grab active:cursor-grabbing
      opacity-0 transition-opacity duration-150
      group-hover:opacity-40 hover:!opacity-70
      text-tertiary
      touch-none
    `}
    onPointerDown={onPointerDown}
  >
    <DragHandleIcon />
  </div>
)}
```

### Drop Indicator

A vertical line shows the drop position:

```tsx
{isDragOver && (
  <div
    className="pointer-events-none absolute bottom-1 left-0 top-1 w-0.5 rounded-full bg-brand-solid"
    aria-hidden="true"
  />
)}
```

### Floating Drag Clone

A semi-transparent label follows the cursor via portal:

```tsx
{dragState.isDragging && createPortal(
  <div
    className="pointer-events-none fixed z-[9999] flex items-center border border-primary bg-tertiary/10 px-3 text-xs font-medium text-secondary shadow-lg backdrop-blur-sm"
    style={{
      left: dragState.pointerX + 12,
      top: dragState.pointerY - 8,
      height: dragState.dragHeight,
      minWidth: dragState.dragWidth,
      cursor: 'grabbing',
    }}
  >
    {dragState.dragLabel}
  </div>,
  document.body
)}
```

### Global Cursor Override

Ensures grabbing cursor throughout the drag:

```tsx
{dragState.isDragging && createPortal(
  <style>{`* { cursor: grabbing !important; }`}</style>,
  document.head
)}
```

---

## Constraints

### Non-Draggable Columns

These columns cannot be reordered:

```tsx
const isColumnDraggable = useCallback((column: ComputedColumn): boolean => {
  if (!enableColumnReorder || !onReorderColumns) return false
  if (column.isSticky) return false           // Sticky columns
  if (column.key === '__checkbox') return false // Checkbox column
  return true
}, [enableColumnReorder, onReorderColumns])
```

### Non-Droppable Targets

Same constraints apply to drop targets:

```tsx
const isValidDropTarget = useCallback((column: ComputedColumn): boolean => {
  if (!enableColumnReorder || !onReorderColumns) return false
  if (column.isSticky) return false
  if (column.key === '__checkbox') return false
  return true
}, [enableColumnReorder, onReorderColumns])
```

---

## Styling Customization

### Drag Clone Appearance

Modify the floating clone styles in `TableHeaderBase`:

```tsx
// Current styles
className="... border border-primary bg-tertiary/10 text-secondary backdrop-blur-sm ..."

// Alternative: Solid background
className="... bg-secondary text-primary shadow-xl ..."

// Alternative: Brand colored
className="... bg-brand-primary/20 text-brand-primary border-brand-primary ..."
```

### Drop Indicator

Modify the vertical line indicator in `HeaderCell`:

```tsx
// Current: Blue line
className="... w-0.5 bg-brand-solid ..."

// Thicker line
className="... w-1 bg-brand-solid ..."

// Different color
className="... w-0.5 bg-success-solid ..."
```

### Drag Handle

Modify visibility and position in `HeaderCell`:

```tsx
// More visible on hover
className="... group-hover:opacity-60 hover:!opacity-100 ..."

// Always visible
className="... opacity-40 hover:opacity-70 ..."
```

---

## Performance Considerations

### Why Pointer Events?

HTML5 drag-and-drop has limitations:
- Browser controls cursor during drag (can't use `grabbing`)
- Drag image is a static snapshot
- Limited styling options

Pointer events provide:
- Full cursor control
- Custom drag preview rendering
- Real-time hit detection
- Better animation integration

### Optimizations

1. **Cached DOMRects** - Hit detection uses cached positions, not live queries
2. **Pointer capture** - Events continue even when pointer leaves element
3. **Index-based FLIP** - Only animates columns that actually moved in the order
4. **Container-relative positions** - Avoids scroll/viewport offset issues
5. **RAF-based position capture** - Captures new positions after paint

---

## Troubleshooting

### Columns Not Reordering

1. Check `enableColumnReorder={true}` is set
2. Verify `onReorderColumns` callback is provided
3. Ensure column is not sticky (`isSticky: true`)
4. Ensure column is not the checkbox column

### FLIP Animation Issues

1. **All columns animating**: Check `draggedKey` is being passed to `useAutoColumnFlip`
2. **No animation**: Verify `ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION` > 0
3. **Jumpy animation**: Check for conflicting CSS transitions on cells

### Cursor Not Changing

The global `<style>` tag should override all cursors. If not working:
1. Check if other styles have higher specificity
2. Verify the portal is rendering to `document.head`

---

## Next Steps

- [Features](./FEATURES.md) - Other table features
- [Architecture](./ARCHITECTURE.md) - Component structure overview
- [Styling](./STYLING.md) - Border and background customization
