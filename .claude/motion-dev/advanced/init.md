# Advanced

Deep dives into Motion's advanced features and best practices.

---

## Topics

- [Motion Values](./motion-values.md): `useMotionValue`, `useTransform`, `useSpring`
- [Performance](./performance.md): Bundle optimization, GPU acceleration, LazyMotion
- [Accessibility](./accessibility.md): Respecting `prefers-reduced-motion`
- [Patterns](./patterns.md): Base UI component animation recipes

---

## Quick Reference

### Motion Values
```tsx
// Create a motion value
const x = useMotionValue(0)

// Transform to another value
const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

// Add spring physics
const springX = useSpring(x, { stiffness: 300 })

// Use in style
<motion.div style={{ x, opacity }} />
```

### Performance
```tsx
// Reduce bundle size
import { LazyMotion, domAnimation, m } from 'motion/react'

<LazyMotion features={domAnimation}>
  <m.div animate={{ opacity: 1 }} />
</LazyMotion>
```

### Accessibility
```tsx
// Respect motion preference
const prefersReducedMotion = useReducedMotion()

<motion.div
  animate={{ scale: prefersReducedMotion ? 1 : 1.1 }}
/>
```
