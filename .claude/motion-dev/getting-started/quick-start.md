# Quick Start

Create your first animation with Motion in under a minute.

## Overview

Motion provides the `motion` component factory that creates animatable versions of HTML and SVG elements. Simply replace standard elements with their `motion` equivalent and add animation props.

## Your First Animation

Replace a `<div>` with `<motion.div>` and add the `animate` prop:

```tsx
import { motion } from 'motion/react'

function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Hello, Motion!
    </motion.div>
  )
}
```

This component will fade in when it mounts.

## Animation Props

### `initial`

The starting state before any animation runs:

```tsx
<motion.div initial={{ opacity: 0, scale: 0.8 }}>
```

Set to `false` to disable the initial animation:

```tsx
<motion.div initial={false} animate={{ opacity: 1 }}>
```

### `animate`

The target state to animate to:

```tsx
<motion.div animate={{ opacity: 1, scale: 1 }}>
```

When `animate` changes, Motion will animate from the current state to the new values.

### `exit`

The state when the component is removed (requires `AnimatePresence`):

```tsx
import { motion, AnimatePresence } from 'motion/react'

function Modal({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Modal content
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### `transition`

Control timing and easing:

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    duration: 0.5,
    ease: 'easeOut',
  }}
>
```

## Animatable Properties

Motion can animate most CSS properties:

### Transforms (GPU-accelerated)
```tsx
<motion.div
  animate={{
    x: 100,        // translateX
    y: 50,         // translateY
    scale: 1.2,    // scale
    rotate: 45,    // rotate in degrees
    rotateX: 45,   // 3D rotation
    rotateY: 45,
  }}
/>
```

### Opacity
```tsx
<motion.div animate={{ opacity: 0.5 }} />
```

### Colors
```tsx
<motion.div
  animate={{
    backgroundColor: '#ff0000',
    color: 'rgb(255, 255, 255)',
  }}
/>
```

### Dimensions
```tsx
<motion.div
  animate={{
    width: 200,
    height: '50%',
  }}
/>
```

## Complete Example

A card that animates on mount:

```tsx
import { motion } from 'motion/react'

function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      className="p-6 bg-primary rounded-lg shadow-lg"
    >
      {children}
    </motion.div>
  )
}
```

## Next Steps

- [Base UI Setup](./base-ui-setup.md): Integrate Motion with Base UI components
- [Transitions](../animation/transitions.md): Control timing and easing
- [Gestures](../interaction/gestures.md): Add hover and tap animations

## Related

- [Animation Basics](../animation/basics.md): Deep dive into animation props
- [AnimatePresence](../animation/components/animate-presence.md): Exit animations
