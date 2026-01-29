# Drag

Create draggable elements with constraints, elasticity, and momentum.

## Overview

The `drag` prop enables dragging on motion components. Motion handles touch and pointer events, applies physics, and provides full animation control during and after drag.

## Basic Drag

Enable dragging with the `drag` prop:

```tsx
<motion.div drag className="w-24 h-24 bg-primary rounded-lg" />
```

## Drag Axis

Constrain dragging to a single axis:

```tsx
// Horizontal only
<motion.div drag="x" />

// Vertical only
<motion.div drag="y" />

// Both axes (default)
<motion.div drag />
```

## Drag Constraints

Limit how far an element can be dragged.

### Pixel Constraints

```tsx
<motion.div
  drag
  dragConstraints={{
    top: -100,
    left: -100,
    right: 100,
    bottom: 100,
  }}
/>
```

### Ref Constraints

Constrain to a parent element's bounds:

```tsx
function DraggableInContainer() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="w-96 h-96 bg-gray-100">
      <motion.div
        drag
        dragConstraints={containerRef}
        className="w-16 h-16 bg-primary rounded"
      />
    </div>
  )
}
```

## Drag Elasticity

Control how elements behave when dragged beyond constraints:

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 100 }}
  dragElastic={0.5}  // 0 = rigid, 1 = no resistance
/>
```

### Per-Direction Elasticity

```tsx
<motion.div
  drag
  dragConstraints={{ top: 0, bottom: 100 }}
  dragElastic={{
    top: 0,      // No elasticity at top
    bottom: 0.5, // Some elasticity at bottom
  }}
/>
```

## Drag Momentum

Control momentum after release:

```tsx
<motion.div
  drag
  dragMomentum={true}    // Enable momentum (default)
  dragMomentum={false}   // Stop immediately on release
/>
```

### Momentum Decay

```tsx
<motion.div
  drag
  dragTransition={{
    power: 0.3,        // Velocity multiplier (0-1)
    timeConstant: 200, // Deceleration time in ms
  }}
/>
```

## Snap to Position

Return to origin after drag:

```tsx
<motion.div
  drag
  dragSnapToOrigin
/>
```

### Snap with Animation

```tsx
<motion.div
  drag
  dragSnapToOrigin
  dragTransition={{
    bounceStiffness: 500,
    bounceDamping: 20,
  }}
/>
```

## Drag Listeners

Control drag constraints dynamically:

```tsx
<motion.div
  drag
  dragListener={false}  // Disable drag from this element
/>
```

### Custom Drag Area

```tsx
function CustomDragHandle() {
  const controls = useDragControls()

  return (
    <div>
      {/* Only this triggers drag */}
      <div onPointerDown={(e) => controls.start(e)}>
        Drag Handle
      </div>
      <motion.div drag="x" dragControls={controls} dragListener={false}>
        Draggable content
      </motion.div>
    </div>
  )
}
```

## Drag Events

Respond to drag lifecycle:

```tsx
<motion.div
  drag
  onDragStart={(event, info) => {
    console.log('Started at', info.point)
  }}
  onDrag={(event, info) => {
    console.log('Offset:', info.offset)
    console.log('Velocity:', info.velocity)
  }}
  onDragEnd={(event, info) => {
    console.log('Ended at', info.point)
  }}
/>
```

### Event Info Object

| Property | Type | Description |
|----------|------|-------------|
| `point` | `{ x, y }` | Current position relative to viewport |
| `offset` | `{ x, y }` | Distance from drag start |
| `velocity` | `{ x, y }` | Current velocity in px/s |
| `delta` | `{ x, y }` | Change since last event |

## whileDrag

Animate while dragging:

```tsx
<motion.div
  drag
  whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
/>
```

### Drag Visual Feedback

```tsx
<motion.div
  drag
  whileHover={{ cursor: 'grab' }}
  whileDrag={{
    scale: 1.05,
    cursor: 'grabbing',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  }}
  className="p-4 bg-primary rounded"
/>
```

## Drag Direction Detection

Detect drag direction to lock axis:

```tsx
<motion.div
  drag
  dragDirectionLock
  onDirectionLock={(axis) => console.log('Locked to', axis)}
/>
```

## Common Patterns

### Swipeable Card

```tsx
function SwipeableCard({ onSwipe }) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onSwipe(info.offset.x > 0 ? 'right' : 'left')
        }
      }}
      className="p-6 bg-primary rounded-lg"
    >
      Swipe me
    </motion.div>
  )
}
```

### Slider Thumb

```tsx
function Slider({ min = 0, max = 100, value, onChange }) {
  const trackRef = useRef(null)

  return (
    <div ref={trackRef} className="relative h-2 bg-gray-200 rounded">
      <motion.div
        drag="x"
        dragConstraints={trackRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={(_, info) => {
          const track = trackRef.current
          if (track) {
            const percent = info.point.x / track.offsetWidth
            onChange(min + (max - min) * Math.max(0, Math.min(1, percent)))
          }
        }}
        className="absolute w-4 h-4 -mt-1 bg-primary rounded-full cursor-grab"
        style={{ left: `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
  )
}
```

### Dismissible Item

```tsx
function DismissibleItem({ onDismiss, children }) {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, opacity }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onDismiss()
        }
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Draggable Modal

```tsx
function DraggableModal({ children }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      className="fixed p-6 bg-primary rounded-lg shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="cursor-move mb-4 pb-2 border-b">
        Drag to move
      </div>
      {children}
    </motion.div>
  )
}
```

### Sortable List

For drag-to-reorder, use the `Reorder` component:

```tsx
import { Reorder } from 'motion/react'

function SortableList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map((item) => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

## Touch Considerations

Motion handles touch events automatically:

- Touch events are normalized to pointer events
- Multi-touch is filtered (only first touch triggers drag)
- Scroll is prevented during drag

### Preventing Page Scroll

```tsx
// Prevent page scroll while dragging
<motion.div
  drag="y"
  onTouchStart={(e) => e.preventDefault()}
/>
```

## Related

- [Gestures](./gestures.md): whileHover, whileTap
- [useMotionValue](../advanced/motion-values.md): Track drag position
- [Layout](../animation/layout.md): Animate reordering
