# Transitions

Control animation timing, easing, and physics with the `transition` prop.

## Overview

The `transition` prop configures how values animate from one state to another. Motion supports tween (duration-based), spring (physics-based), and inertia animations.

## Basic Usage

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
/>
```

## Duration

Set animation length in seconds:

```tsx
transition={{ duration: 0.3 }}
```

## Delay

Delay the start of an animation:

```tsx
transition={{ delay: 0.2 }}
```

## Easing

### Built-in Easing Functions

```tsx
transition={{ ease: 'linear' }}
transition={{ ease: 'easeIn' }}
transition={{ ease: 'easeOut' }}
transition={{ ease: 'easeInOut' }}
transition={{ ease: 'circIn' }}
transition={{ ease: 'circOut' }}
transition={{ ease: 'circInOut' }}
transition={{ ease: 'backIn' }}
transition={{ ease: 'backOut' }}
transition={{ ease: 'backInOut' }}
transition={{ ease: 'anticipate' }}
```

### Cubic Bezier

Define custom easing with a cubic bezier array:

```tsx
transition={{ ease: [0.4, 0, 0.2, 1] }}
```

### Custom Function

Provide an easing function (receives and returns 0-1):

```tsx
transition={{ ease: (t) => t * t }}
```

## Animation Types

### Tween (Default)

Duration-based animation with easing:

```tsx
transition={{
  type: 'tween',
  duration: 0.5,
  ease: 'easeOut',
}}
```

### Spring

Physics-based spring animation:

```tsx
transition={{
  type: 'spring',
  stiffness: 300,
  damping: 20,
}}
```

Spring parameters:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `stiffness` | 100 | Spring tension (higher = faster) |
| `damping` | 10 | Friction (higher = less bounce) |
| `mass` | 1 | Mass of the object (higher = slower) |
| `velocity` | 0 | Initial velocity |
| `restSpeed` | 0.01 | Minimum speed before stopping |
| `restDelta` | 0.01 | Minimum distance before stopping |

#### Spring Presets

```tsx
// Snappy - quick with slight bounce
transition={{
  type: 'spring',
  stiffness: 500,
  damping: 30,
}}

// Bouncy - slower with more bounce
transition={{
  type: 'spring',
  stiffness: 200,
  damping: 10,
}}

// Smooth - gentle, no bounce
transition={{
  type: 'spring',
  stiffness: 100,
  damping: 20,
}}
```

#### Duration-based Spring

Use `duration` and `bounce` for easier spring configuration:

```tsx
transition={{
  type: 'spring',
  duration: 0.5,
  bounce: 0.3, // 0 = no bounce, 1 = very bouncy
}}
```

### Inertia

Decelerates from a velocity (useful after drag):

```tsx
transition={{
  type: 'inertia',
  velocity: 200,
  power: 0.8,
  timeConstant: 700,
}}
```

## Per-Property Transitions

Configure different transitions for different properties:

```tsx
<motion.div
  animate={{ x: 100, opacity: 1 }}
  transition={{
    x: { type: 'spring', stiffness: 300 },
    opacity: { duration: 0.2 },
  }}
/>
```

## Default Transitions

Motion applies smart defaults:

| Property | Default Type |
|----------|-------------|
| `x`, `y`, `scale`, `rotate` | Spring |
| `opacity` | Tween (0.3s) |
| `backgroundColor` | Tween (0.3s) |

Override the default with the `default` key:

```tsx
transition={{
  default: { type: 'spring' },
  opacity: { type: 'tween', duration: 0.2 },
}}
```

## Repeating Animations

### Repeat Count

```tsx
transition={{
  repeat: 3,           // Repeat 3 times
  repeat: Infinity,    // Loop forever
}}
```

### Repeat Type

```tsx
transition={{
  repeat: Infinity,
  repeatType: 'loop',    // Start → End → Start → End
  repeatType: 'reverse', // Start → End → Start (back and forth)
  repeatType: 'mirror',  // Same as reverse but easing also reverses
}}
```

### Repeat Delay

```tsx
transition={{
  repeat: Infinity,
  repeatDelay: 1, // 1 second between each repeat
}}
```

## Orchestration

### Stagger Children

Animate children one after another:

```tsx
const container = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}
```

### When

Control when children animate relative to parent:

```tsx
transition={{
  when: 'beforeChildren', // Parent animates first
  when: 'afterChildren',  // Children animate first
}}
```

### Stagger Direction

```tsx
transition={{
  staggerChildren: 0.1,
  staggerDirection: -1, // Reverse order (last to first)
}}
```

## Common Patterns

### Quick Feedback (Buttons)
```tsx
transition={{ duration: 0.1 }}
```

### Smooth Entrance (Modals)
```tsx
transition={{
  type: 'spring',
  duration: 0.4,
  bounce: 0.1,
}}
```

### Popup Animation
```tsx
transition={{
  type: 'spring',
  stiffness: 400,
  damping: 25,
}}
```

### Page Transitions
```tsx
transition={{
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // Material Design easing
}}
```

### Staggered List
```tsx
const container = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}
```

## Exit Transitions

The `exit` state can have its own transition:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{
    duration: 0.3,
    exit: { duration: 0.2 }, // Faster exit
  }}
/>
```

Or define it inline:

```tsx
exit={{
  opacity: 0,
  transition: { duration: 0.2 },
}}
```

## Related

- [Animation Basics](./basics.md): Core animation props
- [Layout](./layout.md): Layout animations use transitions too
- [Spring Hook](../advanced/motion-values.md#usespring): Spring physics for values
