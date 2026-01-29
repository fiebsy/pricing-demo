# Animation Basics

Learn how to animate React components with Motion's declarative animation props.

## Overview

Motion provides a simple, declarative API for animations. Instead of imperatively controlling animation frames, you describe the target state and Motion handles the animation automatically.

## The `animate` Prop

The `animate` prop defines the target state. When values change, Motion automatically animates to the new state:

```tsx
import { motion } from 'motion/react'

// Animate to opacity: 1 on mount
<motion.div animate={{ opacity: 1 }} />

// Dynamic animation based on state
<motion.div animate={{ x: isOpen ? 200 : 0 }} />
```

### Animatable Values

Motion can animate:

**Transforms** (GPU-accelerated):
```tsx
animate={{
  x: 100,           // translateX in pixels
  y: 50,            // translateY in pixels
  z: 0,             // translateZ (3D)
  scale: 1.2,       // uniform scale
  scaleX: 1.5,      // horizontal scale
  scaleY: 0.8,      // vertical scale
  rotate: 45,       // rotation in degrees
  rotateX: 45,      // 3D rotation
  rotateY: 45,
  rotateZ: 45,
  skew: 10,         // skew in degrees
  skewX: 10,
  skewY: 10,
}}
```

**Opacity**:
```tsx
animate={{ opacity: 0.5 }}
```

**Colors**:
```tsx
animate={{
  backgroundColor: '#ff0000',
  color: 'rgb(255, 255, 255)',
  borderColor: 'hsl(200, 100%, 50%)',
}}
```

**Dimensions**:
```tsx
animate={{
  width: 200,
  height: '50%',
  padding: 20,
  borderRadius: 8,
}}
```

**CSS Variables**:
```tsx
animate={{
  '--custom-property': 100,
}}
```

## The `initial` Prop

The `initial` prop defines the starting state before any animation:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

### Disable Initial Animation

Set `initial={false}` to start at the `animate` state without animating:

```tsx
// No animation on mount - starts at opacity: 1
<motion.div
  initial={false}
  animate={{ opacity: 1 }}
/>
```

This is useful for:
- Components that should appear immediately
- State-driven animations where you don't want an entrance animation
- Components kept mounted (like Select popups)

## The `exit` Prop

The `exit` prop defines the state when a component is removed. It requires `AnimatePresence`:

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

See [AnimatePresence](./components/animate-presence.md) for more details.

## Keyframes

Animate through multiple values with arrays:

```tsx
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
  }}
/>
```

### Keyframe Timing

Control timing with the `times` array (values from 0 to 1):

```tsx
<motion.div
  animate={{
    scale: [1, 1.5, 1],
  }}
  transition={{
    duration: 2,
    times: [0, 0.2, 1], // Scale peaks at 20% through
  }}
/>
```

### Wildcard Keyframes

Use `null` for the current value:

```tsx
// Animate from current x position to 100
<motion.div animate={{ x: [null, 100] }} />
```

## Transform Origin

Control the pivot point for transforms:

```tsx
<motion.div
  style={{ transformOrigin: 'top left' }}
  animate={{ rotate: 45 }}
/>
```

For Base UI popups, use the CSS variable:

```tsx
<Popover.Popup
  render={
    <motion.div
      style={{ transformOrigin: 'var(--transform-origin)' }}
      animate={{ scale: 1 }}
    />
  }
/>
```

## Variants

Named animation states for cleaner code and orchestration:

```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
/>
```

### Variant Propagation

Variants propagate to children automatically:

```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.ul variants={container} initial="hidden" animate="visible">
  <motion.li variants={item}>Item 1</motion.li>
  <motion.li variants={item}>Item 2</motion.li>
  <motion.li variants={item}>Item 3</motion.li>
</motion.ul>
```

### Dynamic Variants

Access the `custom` prop in variant functions:

```tsx
const variants = {
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1 },
  }),
}

{items.map((item, i) => (
  <motion.div
    key={item.id}
    custom={i}
    variants={variants}
    animate="visible"
  />
))}
```

## Animation Events

Respond to animation lifecycle:

```tsx
<motion.div
  animate={{ x: 100 }}
  onAnimationStart={() => console.log('Started')}
  onAnimationComplete={() => console.log('Complete')}
/>
```

### With Definition

Receive the completed animation definition:

```tsx
<motion.div
  animate={{ x: 100, opacity: 1 }}
  onAnimationComplete={(definition) => {
    console.log('Animated to:', definition)
  }}
/>
```

## Common Patterns

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>
```

### Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
/>
```

### Scale In
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.2 }}
/>
```

### Slide from Side
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 20 }}
/>
```

## Related

- [Transitions](./transitions.md): Control timing and easing
- [Layout](./layout.md): Animate layout changes
- [AnimatePresence](./components/animate-presence.md): Exit animations
