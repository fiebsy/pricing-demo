# Motion Component

The `motion` component factory creates animatable versions of HTML and SVG elements.

## Overview

`motion` is an object containing all HTML and SVG elements as motion components. Replace standard elements with their motion equivalent to add animation capabilities.

```tsx
import { motion } from 'motion/react'

// Standard div
<div>Hello</div>

// Animatable div
<motion.div animate={{ opacity: 1 }}>Hello</motion.div>
```

## Available Elements

### HTML Elements

All HTML elements are available:

```tsx
<motion.div />
<motion.span />
<motion.button />
<motion.a />
<motion.input />
<motion.img />
<motion.ul />
<motion.li />
<motion.header />
<motion.main />
<motion.section />
<motion.article />
<motion.aside />
<motion.nav />
<motion.form />
<motion.label />
// ... all other HTML elements
```

### SVG Elements

SVG elements for animating graphics:

```tsx
<motion.svg />
<motion.path />
<motion.circle />
<motion.rect />
<motion.line />
<motion.polyline />
<motion.polygon />
<motion.ellipse />
<motion.g />
<motion.text />
<motion.tspan />
<motion.defs />
<motion.clipPath />
<motion.mask />
<motion.use />
<motion.image />
<motion.filter />
```

## Animation Props

Motion components accept all standard element props plus animation props:

| Prop | Type | Description |
|------|------|-------------|
| `initial` | `Target \| false` | Starting animation state |
| `animate` | `Target` | Target animation state |
| `exit` | `Target` | State when unmounting |
| `transition` | `Transition` | Animation timing/easing |
| `variants` | `Variants` | Named animation states |
| `whileHover` | `Target` | State while hovered |
| `whileTap` | `Target` | State while pressed |
| `whileFocus` | `Target` | State while focused |
| `whileDrag` | `Target` | State while dragging |
| `whileInView` | `Target` | State while in viewport |

## Props Passthrough

All standard HTML/SVG props work normally:

```tsx
<motion.button
  className="btn"
  onClick={handleClick}
  disabled={isLoading}
  aria-label="Submit"
  animate={{ scale: 1 }}
>
  Submit
</motion.button>
```

## Custom Components

### Using `motion.create()`

Create a motion component from any React component:

```tsx
import { motion } from 'motion/react'
import { Button } from './button'

const MotionButton = motion.create(Button)

<MotionButton
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</MotionButton>
```

**Requirements**: The component must forward the `ref` and accept a `style` prop.

### With Base UI

Use the `render` prop to integrate with Base UI:

```tsx
import { Dialog } from '@base-ui/react/dialog'
import { motion } from 'motion/react'

<Dialog.Popup
  render={
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    />
  }
>
  Dialog content
</Dialog.Popup>
```

## Performance

Motion components are optimized:

- **No React re-renders**: Animations run outside React's render cycle
- **GPU acceleration**: Transforms and opacity use hardware acceleration
- **Automatic cleanup**: Event listeners and animations are cleaned up

### Render Props

For maximum performance in lists, use render props:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {(props) => <div {...props}>Content</div>}
</motion.div>
```

## SVG Animation

### Path Animation

Animate SVG path drawing:

```tsx
<motion.path
  d="M0 0 L100 100"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2 }}
/>
```

### Circle Animation

```tsx
<motion.circle
  cx="50"
  cy="50"
  r="40"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
/>
```

### Morphing Paths

Animate between path definitions:

```tsx
<motion.path
  animate={{
    d: isActive ? activePath : inactivePath,
  }}
/>
```

## Style Prop

The `style` prop can contain motion values:

```tsx
import { useMotionValue, useTransform } from 'motion/react'

function Component() {
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

  return (
    <motion.div style={{ x, opacity }} drag="x" />
  )
}
```

## TypeScript

Motion components are fully typed:

```tsx
import { motion, type HTMLMotionProps } from 'motion/react'

// Type for motion.div props
type DivProps = HTMLMotionProps<'div'>

// Custom component with motion props
interface CardProps extends HTMLMotionProps<'div'> {
  title: string
}

function Card({ title, ...motionProps }: CardProps) {
  return (
    <motion.div {...motionProps}>
      {title}
    </motion.div>
  )
}
```

### SVG Types

```tsx
import { motion, type SVGMotionProps } from 'motion/react'

type PathProps = SVGMotionProps<'path'>
```

## Related

- [Animation Basics](../basics.md): Animation props in detail
- [AnimatePresence](./animate-presence.md): Exit animations
- [Gestures](../../interaction/gestures.md): Hover, tap, focus animations
