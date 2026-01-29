# Performance

Optimize Motion for smaller bundles and faster animations.

## Overview

Motion is designed for performance out of the box, but there are strategies to further optimize bundle size and runtime performance.

## Bundle Size

### Tree Shaking

Motion is tree-shakable. Only import what you use:

```tsx
// Good - only imports animate
import { animate } from 'motion/react'

// Good - only imports hooks
import { useMotionValue, useTransform } from 'motion/react'

// Avoid - may import unused code
import * as Motion from 'motion/react'
```

### LazyMotion

Reduce initial bundle by lazy-loading Motion features:

```tsx
import { LazyMotion, domAnimation, m } from 'motion/react'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      {/* Use m instead of motion */}
      <m.div animate={{ opacity: 1 }} />
    </LazyMotion>
  )
}
```

#### Feature Bundles

| Bundle | Size | Features |
|--------|------|----------|
| `domAnimation` | ~15kb | animate, exit, variants, gestures |
| `domMax` | ~25kb | Above + layout, drag |

```tsx
// For most apps
import { domAnimation } from 'motion/react'

// If you need layout/drag
import { domMax } from 'motion/react'
```

#### Async Loading

Load features asynchronously:

```tsx
import { LazyMotion, m } from 'motion/react'

const loadFeatures = () =>
  import('motion/react').then(res => res.domAnimation)

function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div animate={{ opacity: 1 }} />
    </LazyMotion>
  )
}
```

The `strict` prop throws if you accidentally use `motion` instead of `m`.

### Motion Lite Import

For minimal bundle, import specific modules:

```tsx
// Specific hooks only
import { useMotionValue } from 'motion/react'
import { useSpring } from 'motion/react'

// Animate function only
import { animate } from 'motion'
```

## GPU Acceleration

### Hardware-Accelerated Properties

These properties use the GPU and are highly performant:

```tsx
// Fast - GPU accelerated
animate={{
  x: 100,
  y: 50,
  scale: 1.2,
  rotate: 45,
  opacity: 0.5,
}}

// Slower - triggers layout
animate={{
  width: 200,    // Avoid
  height: 100,   // Avoid
  left: 50,      // Use x instead
  top: 50,       // Use y instead
}}
```

### Transform vs Position

```tsx
// Good - GPU accelerated
<motion.div animate={{ x: 100 }} />

// Avoid - triggers layout
<motion.div animate={{ left: 100 }} />
```

### Will-Change Hint

Add `will-change` for complex animations:

```tsx
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ x: [0, 100], scale: [1, 1.2] }}
/>
```

**Note**: Don't overuse `will-change` - it consumes memory.

## Reducing Re-renders

### Motion Values

Use motion values for frequent updates:

```tsx
// Bad - re-renders on every mouse move
function Component() {
  const [x, setX] = useState(0)

  return (
    <motion.div
      animate={{ x }}
      onMouseMove={(e) => setX(e.clientX)}
    />
  )
}

// Good - no re-renders
function Component() {
  const x = useMotionValue(0)

  return (
    <motion.div
      style={{ x }}
      onMouseMove={(e) => x.set(e.clientX)}
    />
  )
}
```

### Memoization

Memoize expensive components:

```tsx
const AnimatedItem = memo(function AnimatedItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {item.content}
    </motion.div>
  )
})
```

### Stable References

Keep animation objects stable:

```tsx
// Bad - new object every render
function Component() {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} />
  )
}

// Good - stable reference
const fadeIn = { opacity: 1, y: 0 }

function Component() {
  return <motion.div animate={fadeIn} />
}

// Also good - variants
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function Component() {
  return (
    <motion.div variants={variants} initial="hidden" animate="visible" />
  )
}
```

## Layout Animation Performance

### Use layout="position"

When you only need position animation:

```tsx
// Animates both position and size
<motion.div layout />

// Only animates position (faster)
<motion.div layout="position" />
```

### Avoid Layout on Many Elements

```tsx
// Slow - every item has layout
<div>
  {items.map(item => (
    <motion.div key={item.id} layout>
      {item.content}
    </motion.div>
  ))}
</div>

// Faster - only container has layout
<motion.div layout>
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</motion.div>
```

### LayoutGroup Boundaries

Scope layout calculations:

```tsx
import { LayoutGroup } from 'motion/react'

// Layout animations in one group don't affect others
<LayoutGroup id="sidebar">
  {/* Sidebar items */}
</LayoutGroup>

<LayoutGroup id="main">
  {/* Main content items */}
</LayoutGroup>
```

## Animation Performance

### Limit Concurrent Animations

Too many simultaneous animations can cause jank:

```tsx
// Stagger reduces concurrent animations
const container = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}
```

### Use Exit with Care

Exit animations keep elements in the DOM longer:

```tsx
// Only add exit if needed
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}  // Only if exit animation is needed
    />
  )}
</AnimatePresence>
```

### Simplify Complex Animations

```tsx
// Complex - many properties
animate={{
  x: 100,
  y: 50,
  scale: 1.2,
  rotate: 45,
  opacity: 0.8,
  backgroundColor: '#ff0000',
  borderRadius: 20,
}}

// Simpler - fewer properties
animate={{
  x: 100,
  opacity: 1,
}}
```

## Measuring Performance

### React DevTools Profiler

1. Open React DevTools
2. Go to Profiler tab
3. Record during animation
4. Look for unnecessary re-renders

### Chrome Performance Panel

1. Open DevTools → Performance
2. Record during animation
3. Look for:
   - Long frames (>16ms)
   - Layout thrashing
   - Paint storms

### Motion Debug

```tsx
// Log animation events
<motion.div
  animate={{ x: 100 }}
  onAnimationStart={() => console.log('Start')}
  onAnimationComplete={() => console.log('Complete')}
/>
```

## Checklist

### Bundle Size
- [ ] Use `LazyMotion` with `domAnimation`
- [ ] Import only needed hooks
- [ ] Use `m` instead of `motion` in LazyMotion
- [ ] Analyze bundle with webpack-bundle-analyzer

### Runtime
- [ ] Use transforms, not position properties
- [ ] Use motion values for high-frequency updates
- [ ] Memoize components when appropriate
- [ ] Use `layout="position"` instead of `layout`
- [ ] Limit concurrent animations with stagger
- [ ] Scope with LayoutGroup

## Related

- [Motion Values](./motion-values.md): Avoid re-renders
- [Animation Basics](../animation/basics.md): Simpler animations
- [Layout](../animation/layout.md): Layout optimization
