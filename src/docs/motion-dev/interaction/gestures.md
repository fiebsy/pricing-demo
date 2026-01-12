# Gestures

Add hover, tap, focus, and viewport animations with gesture props.

## Overview

Motion provides gesture props that animate elements in response to user interactions. These are declarative - you define the target state, and Motion handles the animation.

## whileHover

Animates while the pointer hovers over the element (desktop only, filters out touch events):

```tsx
<motion.button
  whileHover={{ scale: 1.1 }}
>
  Hover me
</motion.button>
```

### Hover with Transition

```tsx
<motion.div
  whileHover={{ scale: 1.1 }}
  transition={{ type: 'spring', stiffness: 400 }}
/>
```

### Hover Callbacks

```tsx
<motion.div
  whileHover={{ scale: 1.1 }}
  onHoverStart={() => console.log('Hover started')}
  onHoverEnd={() => console.log('Hover ended')}
/>
```

## whileTap

Animates while the element is pressed (click or touch). Automatically provides keyboard accessibility - the element becomes focusable and responds to Enter key:

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Tap Callbacks

```tsx
<motion.div
  whileTap={{ scale: 0.9 }}
  onTapStart={() => console.log('Tap started')}
  onTap={() => console.log('Tap complete')}
  onTapCancel={() => console.log('Tap cancelled')}
/>
```

### Combined Hover and Tap

```tsx
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: '#3b82f6' }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.1 }}
  className="px-4 py-2 bg-primary text-primary-foreground rounded"
>
  Interactive Button
</motion.button>
```

## whileFocus

Animates while the element has keyboard focus:

```tsx
<motion.input
  whileFocus={{
    scale: 1.02,
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
  }}
  className="px-3 py-2 border rounded"
/>
```

### Focus with Base UI

```tsx
<Input.Input
  render={
    <motion.input
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    />
  }
/>
```

## whileInView

Animates when the element enters the viewport:

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
>
  Scroll to reveal
</motion.div>
```

### Viewport Options

```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{
    once: true,          // Only animate once
    amount: 0.5,         // Trigger at 50% visibility
    margin: '-100px',    // Trigger 100px before entering
    root: scrollRef,     // Custom scroll container
  }}
/>
```

### Common Scroll Reveal Pattern

```tsx
function FadeInSection({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
```

## Gesture Priority

When multiple gestures are active, they combine in this priority order:

1. `whileDrag` (highest)
2. `whileTap`
3. `whileFocus`
4. `whileHover`
5. `animate` (lowest)

```tsx
// During tap, scale is 0.95 (not 1.1 from hover)
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
/>
```

## Propagation

Gesture events propagate to parent motion components:

```tsx
<motion.div whileHover={{ backgroundColor: '#f3f4f6' }}>
  <motion.button whileTap={{ scale: 0.95 }}>
    {/* Hovering the button also triggers parent hover */}
    Click
  </motion.button>
</motion.div>
```

## Variants with Gestures

Use variants for cleaner gesture definitions:

```tsx
const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

<motion.button
  variants={buttonVariants}
  initial="idle"
  whileHover="hover"
  whileTap="tap"
>
  Button
</motion.button>
```

### Propagating Variants

Variants propagate to children:

```tsx
const cardVariants = {
  idle: {},
  hover: {},
}

const iconVariants = {
  idle: { rotate: 0 },
  hover: { rotate: 15 },
}

<motion.div
  variants={cardVariants}
  initial="idle"
  whileHover="hover"
  className="p-4 bg-primary rounded"
>
  <motion.span variants={iconVariants}>
    →
  </motion.span>
  <span>Hover to animate arrow</span>
</motion.div>
```

## Common Patterns

### Button with Ripple Effect

```tsx
<motion.button
  whileTap={{ scale: 0.98 }}
  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
  transition={{ duration: 0.1 }}
  className="relative overflow-hidden px-4 py-2 rounded"
>
  Click me
</motion.button>
```

### Card with Lift Effect

```tsx
<motion.div
  whileHover={{
    y: -4,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  }}
  transition={{ type: 'spring', stiffness: 300 }}
  className="p-6 bg-primary rounded-lg shadow"
>
  Hover to lift
</motion.div>
```

### Link with Underline Animation

```tsx
<motion.a
  href="/about"
  whileHover="hover"
  initial="idle"
  className="relative"
>
  About
  <motion.span
    variants={{
      idle: { scaleX: 0 },
      hover: { scaleX: 1 },
    }}
    transition={{ duration: 0.2 }}
    className="absolute bottom-0 left-0 right-0 h-0.5 bg-current origin-left"
  />
</motion.a>
```

### Icon Button with Rotation

```tsx
<motion.button
  whileHover={{ rotate: 90 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: 'spring', stiffness: 300 }}
  className="p-2 rounded-full"
>
  <PlusIcon />
</motion.button>
```

### Staggered List Reveal

```tsx
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.ul
  variants={container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((i) => (
    <motion.li key={i} variants={item}>
      {i}
    </motion.li>
  ))}
</motion.ul>
```

## Accessibility

### whileTap Keyboard Support

`whileTap` automatically makes elements keyboard accessible:

```tsx
// This button responds to Enter key
<motion.div
  whileTap={{ scale: 0.95 }}
  role="button"
  tabIndex={0}
>
  Accessible button
</motion.div>
```

### Reduced Motion

Respect user preferences:

```tsx
import { useReducedMotion } from 'motion/react'

function AccessibleButton({ children }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
```

## Related

- [Drag](./drag.md): Draggable elements
- [useInView](./hooks/use-in-view.md): More viewport control
- [Accessibility](../advanced/accessibility.md): Motion preferences
