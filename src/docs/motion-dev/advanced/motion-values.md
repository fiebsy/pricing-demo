# Motion Values

Low-level primitives for creating reactive, animatable values.

## Overview

Motion values are special objects that can be animated and shared between components without triggering React re-renders. They're the foundation of Motion's performance.

## useMotionValue

Create an animatable value:

```tsx
import { useMotionValue, motion } from 'motion/react'

function Component() {
  const x = useMotionValue(0)

  return <motion.div style={{ x }} drag="x" />
}
```

### Reading Values

```tsx
const x = useMotionValue(0)

// Get current value (doesn't subscribe to updates)
const current = x.get()

// Subscribe to changes
useEffect(() => {
  const unsubscribe = x.on('change', (latest) => {
    console.log('x changed to', latest)
  })
  return unsubscribe
}, [x])
```

### Setting Values

```tsx
const x = useMotionValue(0)

// Set immediately (no animation)
x.set(100)

// Jump to value
x.jump(100)
```

### Animating Values

```tsx
import { useMotionValue, animate } from 'motion/react'

const x = useMotionValue(0)

// Animate to new value
animate(x, 100, { duration: 0.5 })

// With spring
animate(x, 100, { type: 'spring', stiffness: 300 })
```

## useTransform

Create a value that's derived from another:

```tsx
import { useMotionValue, useTransform, motion } from 'motion/react'

function Component() {
  const x = useMotionValue(0)

  // Map x from [-200, 200] to opacity [0, 1, 0]
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

  return (
    <motion.div style={{ x, opacity }} drag="x" />
  )
}
```

### Input/Output Ranges

```tsx
const x = useMotionValue(0)

// As x goes from -100 to 100, scale goes from 0.5 to 1.5
const scale = useTransform(x, [-100, 100], [0.5, 1.5])

// Multiple breakpoints
const rotate = useTransform(x, [-100, 0, 100], [-45, 0, 45])
```

### Transform Function

```tsx
const x = useMotionValue(0)

// Custom transformation
const display = useTransform(x, (latest) => {
  return Math.round(latest)
})

// Complex calculation
const constrainedX = useTransform(x, (latest) => {
  return Math.max(-100, Math.min(100, latest))
})
```

### Chaining Transforms

```tsx
const x = useMotionValue(0)
const scale = useTransform(x, [0, 100], [1, 2])
const opacity = useTransform(scale, [1, 2], [1, 0])
```

### Combining Values

```tsx
import { useMotionValue, useTransform } from 'motion/react'

const x = useMotionValue(0)
const y = useMotionValue(0)

// Combine multiple motion values
const distance = useTransform([x, y], ([latestX, latestY]) => {
  return Math.sqrt(latestX ** 2 + latestY ** 2)
})
```

## useSpring

Apply spring physics to a motion value:

```tsx
import { useMotionValue, useSpring, motion } from 'motion/react'

function Component() {
  const x = useMotionValue(0)
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
  })

  return (
    <motion.div
      style={{ x: springX }}
      onMouseMove={(e) => x.set(e.clientX)}
    />
  )
}
```

### Spring Options

```tsx
const springValue = useSpring(motionValue, {
  stiffness: 100,   // Spring tension (default: 100)
  damping: 10,      // Friction (default: 10)
  mass: 1,          // Mass (default: 1)
  restSpeed: 0.01,  // Minimum velocity to stop
  restDelta: 0.01,  // Minimum distance to stop
})
```

### Common Spring Presets

```tsx
// Snappy - quick response
const snappy = useSpring(value, { stiffness: 500, damping: 30 })

// Bouncy - playful feel
const bouncy = useSpring(value, { stiffness: 200, damping: 10 })

// Smooth - gentle motion
const smooth = useSpring(value, { stiffness: 50, damping: 20 })

// Responsive cursor
const cursor = useSpring(value, { stiffness: 1000, damping: 50 })
```

## useVelocity

Track the velocity of a motion value:

```tsx
import { useMotionValue, useVelocity } from 'motion/react'

function Component() {
  const x = useMotionValue(0)
  const velocity = useVelocity(x)

  // velocity updates as x changes over time
  return <motion.div style={{ x }} drag="x" />
}
```

### Velocity-Based Animation

```tsx
const x = useMotionValue(0)
const velocity = useVelocity(x)

// Scale based on how fast you're moving
const scale = useTransform(velocity, [-1000, 0, 1000], [0.8, 1, 0.8])
```

## useMotionValueEvent

Subscribe to motion value events without effects:

```tsx
import { useMotionValue, useMotionValueEvent } from 'motion/react'

function Component() {
  const x = useMotionValue(0)

  useMotionValueEvent(x, 'change', (latest) => {
    console.log('x changed to', latest)
  })

  useMotionValueEvent(x, 'animationStart', () => {
    console.log('Animation started')
  })

  useMotionValueEvent(x, 'animationComplete', () => {
    console.log('Animation complete')
  })

  return <motion.div style={{ x }} animate={{ x: 100 }} />
}
```

## useMotionTemplate

Create a string template from motion values:

```tsx
import { useMotionValue, useMotionTemplate, motion } from 'motion/react'

function Component() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Creates "translateX(0px) translateY(0px)"
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px)`

  return <motion.div style={{ transform }} />
}
```

### Shadow Example

```tsx
const x = useMotionValue(0)
const y = useMotionValue(0)

const boxShadow = useMotionTemplate`${x}px ${y}px 20px rgba(0, 0, 0, 0.2)`
```

### Gradient Example

```tsx
const hue = useMotionValue(0)

const background = useMotionTemplate`linear-gradient(${hue}deg, #ff0000, #00ff00)`
```

## Common Patterns

### Cursor Follow

```tsx
function CursorFollow() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        position: 'fixed',
        pointerEvents: 'none',
      }}
      className="w-8 h-8 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
    />
  )
}
```

### Drag with Decay

```tsx
function DragDecay() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  return (
    <motion.div
      style={{ x, y }}
      drag
      dragTransition={{
        power: 0.2,
        timeConstant: 200,
      }}
      className="w-24 h-24 bg-primary rounded-lg"
    />
  )
}
```

### Scroll Progress Circle

```tsx
function ScrollCircle() {
  const { scrollYProgress } = useScroll()

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <svg className="fixed top-4 right-4 w-12 h-12">
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="gray"
        strokeWidth="4"
        fill="none"
      />
      <motion.circle
        cx="24"
        cy="24"
        r="20"
        stroke="blue"
        strokeWidth="4"
        fill="none"
        style={{ pathLength }}
      />
    </svg>
  )
}
```

### Tilt Card

```tsx
function TiltCard({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }

  function resetMouse() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="p-8 bg-primary rounded-lg"
    >
      {children}
    </motion.div>
  )
}
```

## Performance

Motion values bypass React's render cycle:

```tsx
// This doesn't cause re-renders as x changes
function Component() {
  const x = useMotionValue(0)

  return (
    <motion.div
      style={{ x }}
      drag="x"
      onDrag={(_, info) => {
        // Updates 60fps without re-rendering
      }}
    />
  )
}
```

### When to Use Motion Values

| Use Motion Values | Use React State |
|-------------------|-----------------|
| High-frequency updates (drag, scroll) | UI state (open/closed) |
| Derived animations | Conditional rendering |
| Performance-critical | Simple animations |

## Related

- [useScroll](../interaction/hooks/use-scroll.md): Scroll-linked values
- [Animation Basics](../animation/basics.md): Declarative approach
- [Performance](./performance.md): Optimization tips
