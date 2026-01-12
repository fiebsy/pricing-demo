# Button

A high-quality, unstyled React button component that can be rendered as another tag or focusable when disabled.

## Overview

The Button is an unstyled React component that renders a `<button>` element by default. It supports flexible rendering, accessibility features, and custom styling.

## Basic Usage

```tsx
import { Button } from '@base-ui/react/button';

<Button className="my-button">Click me</Button>
```

## Key Features

**Core Capabilities:**
- Renders as native `<button>` or alternative tags via the `render` prop
- Maintains keyboard accessibility even when disabled
- Supports loading states with focus retention
- Fully customizable styling approach

## Props

| Prop | Purpose |
|------|---------|
| `focusableWhenDisabled` | Keeps button focusable when disabled, useful for loading states |
| `nativeButton` | Controls whether to render as native button element |
| `disabled` | Prevents user interaction |
| `render` | Replaces default HTML element with custom tag or component |
| `className` / `style` | Accepts static values or functions based on component state |

## Data Attributes

- `data-disabled`: Applied when the button is disabled

## Usage Patterns

### Complex Content

Set `render={<div />}` with `nativeButton={false}` to render non-button elements while preserving accessibility:

```tsx
<Button render={<div />} nativeButton={false}>
  <span>Complex</span>
  <span>Content</span>
</Button>
```

### Loading States

Enable `focusableWhenDisabled` to prevent focus loss when a button transitions to disabled:

```tsx
const [loading, setLoading] = React.useState(false);

<Button
  disabled={loading}
  focusableWhenDisabled
  onClick={async () => {
    setLoading(true);
    await doSomething();
    setLoading(false);
  }}
>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

### Custom Element

```tsx
<Button render={<a href="/dashboard" />}>
  Go to Dashboard
</Button>
```

## Styling Example

```tsx
<Button className="flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 data-[disabled]:opacity-50">
  Submit
</Button>
```
