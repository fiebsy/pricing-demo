# useAnimate

Programmatically control animations with imperative syntax.

## Overview

`useAnimate` provides a scope ref and an `animate` function for triggering animations imperatively. This is useful for complex sequences, conditional animations, or when you need to await animation completion.

## Basic Usage

```tsx
import { useAnimate } from 'motion/react'

function Component() {
  const [scope, animate] = useAnimate()

  async function handleClick() {
    await animate(scope.current, { scale: 1.2 })
    await animate(scope.current, { scale: 1 })
  }

  return (
    <div ref={scope}>
      <button onClick={handleClick}>Pulse</button>
    </div>
  )
}
```

## Animate Function

### Signature

```tsx
animate(element, keyframes, options?)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `Element \| string` | Target element or CSS selector |
| `keyframes` | `object` | Animation target values |
| `options` | `object` | Animation options (duration, easing, etc.) |

### Returns

A `Promise` that resolves when the animation completes:

```tsx
await animate(element, { opacity: 1 })
console.log('Animation complete!')
```

## Selecting Elements

### By Ref

```tsx
const [scope, animate] = useAnimate()

<div ref={scope}>
  <button onClick={() => animate(scope.current, { x: 100 })}>
    Move
  </button>
</div>
```

### By Selector

Animate elements within the scope:

```tsx
const [scope, animate] = useAnimate()

async function animateItems() {
  // Animate all elements matching selector
  await animate('.item', { opacity: 1 })
}

<div ref={scope}>
  <div className="item">Item 1</div>
  <div className="item">Item 2</div>
  <div className="item">Item 3</div>
</div>
```

### Multiple Targets

```tsx
// Array of elements
animate([element1, element2], { opacity: 1 })

// Multiple selectors
animate('.card, .button', { scale: 1.1 })
```

## Animation Options

### Duration and Easing

```tsx
animate(element, { x: 100 }, {
  duration: 0.5,
  ease: 'easeOut',
})
```

### Spring Physics

```tsx
animate(element, { scale: 1.2 }, {
  type: 'spring',
  stiffness: 300,
  damping: 20,
})
```

### Delay

```tsx
animate(element, { opacity: 1 }, {
  delay: 0.2,
})
```

### All Options

Same options as the `transition` prop:

```tsx
animate(element, { x: 100 }, {
  duration: 0.5,
  delay: 0.1,
  ease: 'easeInOut',
  type: 'spring',
  stiffness: 300,
  damping: 20,
  repeat: 2,
  repeatType: 'reverse',
})
```

## Keyframes

### Object Keyframes

```tsx
animate(element, {
  x: [0, 100, 50],
  opacity: [0, 1, 1],
})
```

### With Timing

```tsx
animate(element, {
  x: [0, 100, 50],
}, {
  duration: 1,
  times: [0, 0.5, 1], // x reaches 100 at 50%
})
```

## Sequences

Chain animations with `await`:

```tsx
async function sequence() {
  await animate(element, { x: 100 })
  await animate(element, { y: 100 })
  await animate(element, { x: 0, y: 0 })
}
```

### Parallel Animations

```tsx
async function parallel() {
  await Promise.all([
    animate('.box-1', { x: 100 }),
    animate('.box-2', { y: 100 }),
  ])
  console.log('Both complete!')
}
```

### Staggered Animations

```tsx
async function stagger() {
  await animate('.item', { opacity: 1, y: 0 }, {
    delay: stagger(0.1), // Each item delays 0.1s more
  })
}
```

## Animation Controls

### Stop Animation

```tsx
const controls = animate(element, { x: 100 })

// Stop immediately
controls.stop()

// Stop at current position
controls.complete()
```

### Pause and Resume

```tsx
const controls = animate(element, { x: 100 })

controls.pause()
controls.play()
```

### Playback Rate

```tsx
const controls = animate(element, { x: 100 })

controls.speed = 0.5 // Half speed
controls.speed = 2   // Double speed
```

### Time Control

```tsx
const controls = animate(element, { x: 100 }, { duration: 1 })

controls.time = 0.5 // Jump to 50%
```

## Common Patterns

### Toggle Animation

```tsx
function ToggleAnimation() {
  const [scope, animate] = useAnimate()
  const [isExpanded, setIsExpanded] = useState(false)

  async function toggle() {
    setIsExpanded(!isExpanded)
    await animate(scope.current, {
      height: isExpanded ? 'auto' : 200,
      opacity: isExpanded ? 1 : 0.8,
    })
  }

  return (
    <div ref={scope}>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}
```

### Success Animation

```tsx
async function onSubmit() {
  // Show loading
  await animate('.button', { scale: 0.95, opacity: 0.7 })

  // Perform action
  await submitForm()

  // Show success
  await animate('.button', {
    scale: [1, 1.1, 1],
    backgroundColor: ['#3b82f6', '#22c55e', '#22c55e'],
  })
}
```

### Entrance Animation

```tsx
function EntranceAnimation() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate('.item', {
      opacity: [0, 1],
      y: [20, 0],
    }, {
      delay: stagger(0.1),
      duration: 0.4,
    })
  }, [])

  return (
    <div ref={scope}>
      {items.map((item) => (
        <div key={item.id} className="item opacity-0">
          {item.content}
        </div>
      ))}
    </div>
  )
}
```

### Orchestrated Sequence

```tsx
async function complexAnimation() {
  const [scope, animate] = useAnimate()

  // Step 1: Fade in container
  await animate(scope.current, { opacity: 1 })

  // Step 2: Stagger in items
  await animate('.item', { opacity: 1, x: 0 }, {
    delay: stagger(0.05),
  })

  // Step 3: Highlight first item
  await animate('.item:first-child', {
    scale: [1, 1.05, 1],
    backgroundColor: '#3b82f6',
  })
}
```

## TypeScript

```tsx
import { useAnimate, type AnimationPlaybackControls } from 'motion/react'

function Component() {
  const [scope, animate] = useAnimate<HTMLDivElement>()

  const handleAnimate = async () => {
    const controls: AnimationPlaybackControls = animate(
      scope.current,
      { x: 100 }
    )
    await controls
  }

  return <div ref={scope} />
}
```

## Related

- [Animation Basics](../../animation/basics.md): Declarative animations
- [useInView](./use-in-view.md): Trigger on viewport entry
- [useScroll](./use-scroll.md): Scroll-linked animations
