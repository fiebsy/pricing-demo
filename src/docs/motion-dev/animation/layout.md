# Layout Animations

Animate layout changes automatically with the `layout` prop.

## Overview

Layout animations automatically animate elements when their position or size changes in the DOM. Instead of manually tracking positions, Motion handles the FLIP (First, Last, Invert, Play) technique for you.

## Basic Layout Animation

Add the `layout` prop to animate any layout change:

```tsx
import { motion } from 'motion/react'

function ExpandableCard({ isExpanded }) {
  return (
    <motion.div
      layout
      className={isExpanded ? 'w-96 h-64' : 'w-48 h-32'}
    />
  )
}
```

When `isExpanded` changes, the element smoothly animates to its new size.

## Layout Types

### `layout={true}`

Animate both position and size:

```tsx
<motion.div layout />
```

### `layout="position"`

Only animate position changes (not size):

```tsx
<motion.div layout="position" />
```

### `layout="size"`

Only animate size changes (not position):

```tsx
<motion.div layout="size" />
```

### `layout="preserve-aspect"`

Animate size while preserving aspect ratio to prevent distortion:

```tsx
<motion.div layout="preserve-aspect" />
```

## Shared Layout Animations

Use `layoutId` to animate elements between different components:

```tsx
function TabList({ activeTab }) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button key={tab.id} className="relative">
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded"
            />
          )}
        </button>
      ))}
    </div>
  )
}
```

The indicator smoothly slides between tabs because both share the same `layoutId`.

### Shared Layout with Different Content

Elements with the same `layoutId` can have different content:

```tsx
function ImageGallery() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      {/* Grid view */}
      <div className="grid grid-cols-3 gap-2">
        {images.map((image) => (
          <motion.img
            key={image.id}
            layoutId={`image-${image.id}`}
            src={image.thumbnail}
            onClick={() => setSelected(image)}
          />
        ))}
      </div>

      {/* Expanded view */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <motion.img
              layoutId={`image-${selected.id}`}
              src={selected.full}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

## Layout Transition

Customize the layout animation:

```tsx
<motion.div
  layout
  transition={{
    layout: {
      duration: 0.3,
      ease: 'easeOut',
    },
  }}
/>
```

Or use a spring:

```tsx
<motion.div
  layout
  transition={{
    layout: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  }}
/>
```

## Layout Groups

When animating lists, wrap items in a layout group:

```tsx
import { LayoutGroup } from 'motion/react'

function SortableList({ items }) {
  return (
    <LayoutGroup>
      {items.map((item) => (
        <motion.div key={item.id} layout>
          {item.content}
        </motion.div>
      ))}
    </LayoutGroup>
  )
}
```

### Group ID

Scope layout animations to prevent conflicts:

```tsx
<LayoutGroup id="sidebar">
  {/* Layout animations here won't affect other groups */}
</LayoutGroup>
```

## Handling Scale Distortion

Layout animations can distort children during scale. Use `layout` on children to correct:

```tsx
<motion.div layout className="card">
  {/* Text will distort during parent scale */}
  <p>Distorted text</p>

  {/* This text will stay crisp */}
  <motion.p layout="position">
    Corrected text
  </motion.p>
</motion.div>
```

## Layout Scroll

Correct for scroll position changes:

```tsx
<motion.div layoutScroll className="overflow-auto">
  <motion.div layout>
    {/* Content */}
  </motion.div>
</motion.div>
```

## Common Patterns

### Accordion

```tsx
function Accordion({ items }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      {items.map((item) => (
        <motion.div key={item.id} layout>
          <motion.header
            layout
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            {item.title}
          </motion.header>
          <AnimatePresence>
            {expanded === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
```

### Tab Indicator

```tsx
function Tabs({ tabs, activeId }) {
  return (
    <div className="relative flex">
      {tabs.map((tab) => (
        <button key={tab.id} className="relative px-4 py-2">
          {tab.label}
          {activeId === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      ))}
    </div>
  )
}
```

### Reorderable List

```tsx
import { Reorder } from 'motion/react'

function TodoList() {
  const [items, setItems] = useState(['Task 1', 'Task 2', 'Task 3'])

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

### Card Expansion

```tsx
function ExpandableCard({ card }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-primary rounded-lg p-4"
      style={{ borderRadius: 12 }}
    >
      <motion.h2 layout="position">{card.title}</motion.h2>
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {card.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
```

## Performance Tips

1. **Use `layout="position"`** when you don't need size animation
2. **Avoid layout on many elements** - animate the container instead
3. **Use `layoutId` sparingly** - only for actual shared element transitions
4. **Set explicit dimensions** when possible to reduce layout calculations

## Related

- [Animation Basics](./basics.md): Core animation props
- [AnimatePresence](./components/animate-presence.md): Exit animations
- [Performance](../advanced/performance.md): Optimization techniques
