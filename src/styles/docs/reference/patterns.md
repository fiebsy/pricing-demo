# Common Patterns

Ready-to-use component patterns using the PAYVA style system.

## Card

### Basic Card

```tsx
<div className="bg-secondary border border-primary rounded-xl p-4">
  <h3 className="text-display-xs font-display text-primary">Card Title</h3>
  <p className="text-secondary mt-2">Card description text.</p>
</div>
```

### Elevated Card

```tsx
<div className="bg-secondary border border-primary rounded-xl p-4 shadow-md">
  <h3 className="text-display-xs font-display text-primary">Elevated Card</h3>
  <p className="text-secondary mt-2">With drop shadow.</p>
</div>
```

### Premium Card (Shine + Shadow)

```tsx
<div className="shine-2-subtle-shadow-lg bg-secondary rounded-2xl p-6">
  <h3 className="text-display-sm font-display text-primary">Premium Card</h3>
  <p className="text-secondary mt-2">With shine effect.</p>
</div>
```

### Clickable Card

```tsx
<button className="
  w-full text-left
  bg-secondary
  border border-primary
  rounded-xl p-4
  hover:bg-secondary_hover
  focus:ring-2 focus:ring-brand focus:outline-none
  transition-colors
">
  <h3 className="text-primary font-medium">Clickable Card</h3>
  <p className="text-secondary mt-1">Click to interact.</p>
</button>
```

### Selectable Card

```tsx
<div className={cn(
  "border-2 rounded-xl p-4 cursor-pointer transition-all",
  isSelected
    ? "border-brand bg-brand-primary"
    : "border-primary bg-secondary hover:border-secondary"
)}>
  <h3 className="text-primary font-medium">Selectable Card</h3>
  <p className="text-secondary mt-1">Click to select.</p>
</div>
```

## Buttons

### Primary Button

```tsx
<button className="
  bg-brand-solid
  hover:bg-brand-solid_hover
  text-white
  rounded-lg
  px-4 py-2
  font-medium
  focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:outline-none
  disabled:bg-disabled disabled:text-disabled disabled:cursor-not-allowed
">
  Primary Action
</button>
```

### Secondary Button

```tsx
<button className="
  bg-secondary
  hover:bg-secondary_hover
  text-primary
  border border-primary
  rounded-lg
  px-4 py-2
  font-medium
  focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:outline-none
  disabled:bg-disabled disabled:text-disabled disabled:border-disabled
">
  Secondary Action
</button>
```

### Tertiary Button (Ghost)

```tsx
<button className="
  bg-transparent
  hover:bg-secondary
  text-secondary
  hover:text-primary
  rounded-lg
  px-4 py-2
  font-medium
  focus:ring-2 focus:ring-brand focus:outline-none
">
  Tertiary Action
</button>
```

### Destructive Button

```tsx
<button className="
  bg-error-solid
  hover:bg-error-solid_hover
  text-white
  rounded-lg
  px-4 py-2
  font-medium
  focus:ring-2 focus:ring-error focus:ring-offset-2 focus:outline-none
">
  Delete
</button>
```

### Icon Button

```tsx
<button className="
  p-2
  rounded-lg
  bg-secondary
  hover:bg-secondary_hover
  text-fg-secondary
  hover:text-fg-primary
  focus:ring-2 focus:ring-brand focus:outline-none
">
  <Icon className="w-5 h-5" />
</button>
```

### Premium Button (Shine)

```tsx
<button className="
  shine-brand
  bg-brand-solid
  hover:bg-brand-solid_hover
  text-white
  rounded-xl
  px-6 py-3
  font-medium
">
  Premium Action
</button>
```

## Input Field

### Basic Input

```tsx
<input
  type="text"
  className="
    w-full
    bg-secondary
    border border-primary
    rounded-md
    px-3 py-2
    text-primary
    placeholder:text-placeholder
    focus:border-transparent
    focus:ring-2 focus:ring-brand
    disabled:bg-disabled disabled:border-disabled disabled:text-disabled
  "
  placeholder="Enter text..."
/>
```

### Input with Error

```tsx
<div>
  <input
    type="text"
    className="
      w-full
      bg-secondary
      border border-error
      rounded-md
      px-3 py-2
      text-primary
      focus:ring-2 focus:ring-error_subtle
    "
  />
  <p className="text-error-primary text-sm mt-1">Error message here</p>
</div>
```

### Input with Label

```tsx
<label className="block">
  <span className="text-sm font-medium text-primary">Email</span>
  <input
    type="email"
    className="
      mt-1 w-full
      bg-secondary border border-primary rounded-md
      px-3 py-2 text-primary
      placeholder:text-placeholder
      focus:ring-2 focus:ring-brand focus:border-transparent
    "
    placeholder="you@example.com"
  />
  <span className="text-xs text-tertiary mt-1 block">
    We'll never share your email.
  </span>
</label>
```

### Textarea

```tsx
<textarea
  className="
    w-full
    bg-secondary
    border border-primary
    rounded-md
    px-3 py-2
    text-primary
    placeholder:text-placeholder
    focus:ring-2 focus:ring-brand focus:border-transparent
    resize-none
  "
  rows={4}
  placeholder="Enter message..."
/>
```

## Status Badges

### Basic Badges

```tsx
<span className="
  inline-flex items-center
  px-2 py-1
  rounded-full
  text-xs font-medium
  bg-success-primary text-success-primary
">
  Active
</span>

<span className="
  inline-flex items-center
  px-2 py-1
  rounded-full
  text-xs font-medium
  bg-warning-primary text-warning-primary
">
  Pending
</span>

<span className="
  inline-flex items-center
  px-2 py-1
  rounded-full
  text-xs font-medium
  bg-error-primary text-error-primary
">
  Failed
</span>

<span className="
  inline-flex items-center
  px-2 py-1
  rounded-full
  text-xs font-medium
  bg-secondary text-secondary
">
  Draft
</span>
```

### Badge with Icon

```tsx
<span className="
  inline-flex items-center gap-1
  px-2 py-1
  rounded-full
  text-xs font-medium
  bg-success-primary text-success-primary
">
  <CheckIcon className="w-3 h-3" />
  Completed
</span>
```

### Pill Badge

```tsx
<span className="
  inline-flex items-center
  px-3 py-1
  rounded-full
  text-sm font-medium
  bg-brand-primary text-brand-secondary
">
  New Feature
</span>
```

## Alert/Banner

### Info Alert

```tsx
<div className="
  bg-brand-primary
  border border-brand
  rounded-lg
  p-4
  flex items-start gap-3
">
  <InfoIcon className="w-5 h-5 text-fg-brand-primary flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="font-medium text-brand-secondary">Information</h4>
    <p className="text-brand-tertiary mt-1">
      This is an informational message.
    </p>
  </div>
</div>
```

### Error Alert

```tsx
<div className="
  bg-error-primary
  border border-error_subtle
  rounded-lg
  p-4
  flex items-start gap-3
">
  <AlertIcon className="w-5 h-5 text-fg-error-primary flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="font-medium text-error-primary">Error</h4>
    <p className="text-error-primary mt-1">
      Something went wrong. Please try again.
    </p>
  </div>
</div>
```

### Success Alert

```tsx
<div className="
  bg-success-primary
  border border-success-300
  rounded-lg
  p-4
  flex items-start gap-3
">
  <CheckIcon className="w-5 h-5 text-fg-success-primary flex-shrink-0 mt-0.5" />
  <div>
    <h4 className="font-medium text-success-primary">Success</h4>
    <p className="text-success-primary mt-1">
      Your changes have been saved.
    </p>
  </div>
</div>
```

## Navigation

### Nav Item

```tsx
<a
  href="#"
  className={cn(
    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
    isActive
      ? "bg-secondary text-primary"
      : "text-secondary hover:bg-secondary_hover hover:text-primary"
  )}
>
  <Icon className="w-5 h-5" />
  <span>Nav Item</span>
</a>
```

### Tab Navigation

```tsx
<div className="flex gap-1 bg-tertiary p-1 rounded-lg">
  {tabs.map(tab => (
    <button
      key={tab.id}
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        activeTab === tab.id
          ? "bg-primary text-primary shadow-sm"
          : "text-secondary hover:text-primary"
      )}
    >
      {tab.label}
    </button>
  ))}
</div>
```

## Data Display

### Stat Card

```tsx
<div className="bg-secondary rounded-xl p-4">
  <p className="text-sm text-tertiary">Total Revenue</p>
  <p className="text-display-md font-display text-primary mt-1">$12,345</p>
  <p className="text-sm text-success-primary mt-2 flex items-center gap-1">
    <TrendUpIcon className="w-4 h-4" />
    +12.5% from last month
  </p>
</div>
```

### List Item

```tsx
<div className="
  flex items-center justify-between
  p-4
  border-b border-secondary
  last:border-b-0
">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-tertiary" />
    <div>
      <p className="font-medium text-primary">Item Name</p>
      <p className="text-sm text-secondary">Description</p>
    </div>
  </div>
  <span className="text-sm text-tertiary">$99.00</span>
</div>
```

### Table Row

```tsx
<tr className="border-b border-secondary hover:bg-secondary_hover">
  <td className="px-4 py-3 text-primary">Cell content</td>
  <td className="px-4 py-3 text-secondary">Secondary</td>
  <td className="px-4 py-3 text-tertiary">Tertiary</td>
</tr>
```

## Modal/Dialog

### Modal Container

```tsx
<div className="
  fixed inset-0
  bg-overlay/50
  flex items-center justify-center
  p-4
">
  <div className="
    bg-primary
    rounded-2xl
    shadow-2xl
    w-full max-w-md
    p-6
  ">
    <h2 className="text-display-xs font-display text-primary">
      Modal Title
    </h2>
    <p className="text-secondary mt-2">
      Modal content goes here.
    </p>
    <div className="flex justify-end gap-3 mt-6">
      <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary_hover text-primary">
        Cancel
      </button>
      <button className="px-4 py-2 rounded-lg bg-brand-solid hover:bg-brand-solid_hover text-white">
        Confirm
      </button>
    </div>
  </div>
</div>
```

## Tooltip

```tsx
<div className="
  bg-inverted-primary
  text-on-inverted-primary
  rounded-lg
  px-3 py-2
  text-sm
  shadow-lg
">
  Tooltip content
</div>
```

## Dropdown Menu

```tsx
<div className="
  bg-primary
  border border-primary
  rounded-xl
  shadow-lg
  py-1
  min-w-[200px]
">
  <button className="
    w-full px-4 py-2 text-left
    text-primary
    hover:bg-secondary_hover
  ">
    Option 1
  </button>
  <button className="
    w-full px-4 py-2 text-left
    text-primary
    hover:bg-secondary_hover
  ">
    Option 2
  </button>
  <hr className="my-1 border-secondary" />
  <button className="
    w-full px-4 py-2 text-left
    text-error-primary
    hover:bg-error-primary
  ">
    Delete
  </button>
</div>
```

## Avatar

### Basic Avatar

```tsx
<div className="
  w-10 h-10
  rounded-full
  bg-tertiary
  flex items-center justify-center
  text-secondary font-medium
">
  AB
</div>
```

### Avatar with Status

```tsx
<div className="relative">
  <img
    src="/avatar.jpg"
    className="w-10 h-10 rounded-full"
  />
  <span className="
    absolute bottom-0 right-0
    w-3 h-3
    rounded-full
    bg-success-solid
    border-2 border-primary
  " />
</div>
```

## Loading States

### Spinner

```tsx
<div className="
  w-5 h-5
  border-2 border-secondary
  border-t-brand-solid
  rounded-full
  animate-spin
" />
```

### Skeleton

```tsx
<div className="animate-pulse">
  <div className="h-4 bg-tertiary rounded w-3/4 mb-2" />
  <div className="h-4 bg-tertiary rounded w-1/2" />
</div>
```

## Related

- [All Utilities](./all-utilities.md): Complete utility reference
- [Colors](../utilities/colors.md): Color utilities
- [Effects](../utilities/effects.md): Shine and depth effects
