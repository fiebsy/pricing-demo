# Hooks

React hooks for imperative animation control and tracking.

---

## Topics

- [useAnimate](./use-animate.md): Programmatically control animations
- [useInView](./use-in-view.md): Detect when elements enter the viewport
- [useScroll](./use-scroll.md): Track and animate based on scroll position

---

## Quick Reference

### useAnimate
```tsx
const [scope, animate] = useAnimate()

// Animate an element
await animate(scope.current, { opacity: 1 })

// Animate with options
await animate(scope.current, { x: 100 }, { duration: 0.5 })

// Animate a selector
await animate('.item', { scale: 1.2 })
```

### useInView
```tsx
const ref = useRef(null)
const isInView = useInView(ref)

// With options
const isInView = useInView(ref, {
  once: true,
  amount: 0.5,
})
```

### useScroll
```tsx
const { scrollY, scrollYProgress } = useScroll()

// Track element scroll
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
})
```

### Value Mapping
```tsx
const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

<motion.div style={{ opacity }} />
```
