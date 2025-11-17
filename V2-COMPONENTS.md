# V2 Components - Full Implementation

This repository now includes the complete v2 design system with all proprietary dependencies.

## ✅ What's Included

### Premium Dependencies (Installed & Configured)

1. **@hugeicons-pro** (v1.2.1)
   - `core-stroke-rounded` - Line style icons (default)
   - `core-duotone-rounded` - Two-tone icons
   - `core-solid-rounded` - Filled icons
   - 4,600+ professional icons
   - Authentication configured in `.npmrc`

2. **@untitledui-pro/icons** (v0.0.2)
   - Premium icon library
   - Authentication configured in `.npmrc`

3. **@silk-hq/components** (v0.9.12)
   - Animation primitives
   - Modal system components
   - Custom easing functions
   - Styles imported in `globals.css`

4. **Supporting Libraries**
   - `framer-motion` (v12.23.24) - Animation engine for Squircle
   - `class-variance-authority` (v0.7.1) - Component variants
   - `react-aria` + `react-aria-components` - Accessibility primitives
   - `tailwindcss-animate` + `tailwindcss-react-aria-components` - Tailwind plugins

### V2 Component Structure

```
src/v2/
├── components/ui/
│   ├── squircle/              ✅ Complete Squircle implementation
│   │   ├── component.tsx      - Main Squircle component
│   │   ├── types.ts           - TypeScript definitions
│   │   ├── lib/               - Utilities and constants
│   │   └── rendering/         - SVG rendering logic
│   │
│   ├── badge/                 ✅ Production-ready Badge
│   │   ├── index.tsx          - Badge with Squircle + HugeIcons
│   │   ├── config.ts          - Size/type/color configurations
│   │   └── types.ts           - Badge type definitions
│   │
│   ├── icon/                  ✅ HugeIcon wrapper
│   │   └── huge-icons/
│   │       └── huge-icons.tsx - Robust HugeIcons Pro wrapper
│   │
│   ├── button/                ✅ Button component (copied)
│   └── search-input/          ✅ SearchInput component (copied)
│
└── utils/
    └── cx.ts                  ✅ Tailwind class merger utility
```

### Design System Files

```
src/styles/
├── globals.css                ✅ Updated with SILK imports
├── theme.css                  ✅ 1,350+ lines of semantic tokens
├── base.css                   ✅ Browser resets
├── silk/
│   └── silk-styles.css        ✅ SILK component styles
└── utilities/                 ✅ Complete utility classes
    ├── animations.css
    ├── borders.css
    ├── colors.css
    ├── typography.css
    ├── rings.css
    ├── outlines.css
    └── misc.css
```

### Showcase Pages

- **`/`** - Landing page with links to all component pages
- **`/components`** - Basic component showcase (Button, Badge, Card)
- **`/v2-components`** - Full v2 component showcase with:
  - Squircle Badges (all types: pill, badge, modern)
  - HugeIcons integration examples
  - Icon-only badges
  - Dot indicator badges
  - All size variants (sm, md, lg)
  - All 9 color variants (gray, brand, error, warning, success, blue, indigo, purple, orange)

## 🎨 Key Features

### Squircle Component

- **Smooth Continuous Curves**: SVG-based with configurable roundness levels (0-5)
- **Performance Optimized**: High/balanced/low performance modes
- **Shadow Support**: Built-in shadow presets (xs, sm, md, lg, xl, 2xl)
- **Border System**: Configurable border width and colors
- **Semantic Tokens**: Full integration with v2 design tokens
- **Fade-in Animation**: Optional mount animation

### Badge Component

- **3 Visual Types**: pill (full rounded), badge (rounded), modern (subtle + shadow)
- **Icon Support**: Leading/trailing HugeIcons with automatic color muting
- **Dot Indicators**: Status badges with colored dots
- **Icon-Only Mode**: Compact badge display
- **3 Sizes**: sm, md, lg (all maintain 12px icon size)
- **9 Color Variants**: Full utility color scale support
- **Asymmetric Padding**: 4px icon side, 6px text side (perfect alignment)

### HugeIcon Wrapper

- **Robust Error Handling**: Console warnings for invalid icons
- **Format Normalization**: Handles various import formats
- **Semantic Token Integration**: Uses `currentColor` for Tailwind compatibility
- **Type Safety**: Full TypeScript support

## 🔧 Configuration

### .npmrc & .env (Authentication)

The project uses environment variables for npm authentication tokens to keep them secure.

1. **Create a `.env` file** in the project root with your tokens:
```bash
UNTITLEDUI_AUTH_TOKEN=your_untitledui_token_here
HUGEICONS_AUTH_TOKEN=your_hugeicons_token_here
```

2. **Load environment variables** before running pnpm commands:
```bash
# On macOS/Linux - export variables from .env
export $(cat .env | xargs)
pnpm install

# Or use dotenv-cli (install globally: npm i -g dotenv-cli)
dotenv pnpm install
```

3. **The `.npmrc` file** (already configured) references these environment variables:
```
@untitledui-pro:registry=https://pkg.untitledui.com
//pkg.untitledui.com/:_authToken=${UNTITLEDUI_AUTH_TOKEN}
@hugeicons-pro:registry=https://npm.hugeicons.com/
//npm.hugeicons.com/:_authToken=${HUGEICONS_AUTH_TOKEN}
```

**Note**: 
- `.env` and `.npmrc` are gitignored - never commit your tokens to version control
- These tokens are for package access only, no billing/payment involved
- If you prefer, you can also hardcode tokens directly in `.npmrc` (but `.env` is more secure)

### Tailwind Plugins

```css
@plugin 'tailwindcss-animate';
@plugin 'tailwindcss-react-aria-components';
```

### Custom Variants

```css
@custom-variant dark (&:where(.dark-mode, .dark-mode *));
@custom-variant label (& [data-label]);
@custom-variant focus-input-within (&:has(input:focus));
```

## 🚀 Usage Examples

### Squircle Badge with Icon

```tsx
import { Badge } from '@/v2/components/ui/badge'
import { StarIcon } from '@hugeicons-pro/core-stroke-rounded'

<Badge.WithIcon 
  type="modern" 
  color="brand" 
  size="md" 
  icon={StarIcon}
  iconPosition="leading"
>
  Featured
</Badge.WithIcon>
```

### Icon-Only Badge

```tsx
<Badge.Icon 
  type="modern" 
  color="success" 
  size="sm" 
  icon={CheckmarkSquare03Icon}
/>
```

### Badge with Dot

```tsx
<Badge.WithDot 
  type="modern" 
  color="gray" 
  dotColor="success"
  size="sm"
>
  Active
</Badge.WithDot>
```

### Direct Squircle Usage

```tsx
import { Squircle } from '@/v2/components/ui/squircle'

<Squircle
  backgroundColor="background-primary"
  borderColor="border-primary"
  borderWidth={1}
  roundness={3}
  shadow="md"
  className="p-4"
>
  <div>Custom content</div>
</Squircle>
```

## 📊 Component Comparison

### Original Simple Components

- Location: `src/components/ui/`
- Uses standard CSS border-radius
- No icon integration
- Basic color variants
- Good for: Simple projects, quick prototypes

### V2 Production Components

- Location: `src/v2/components/ui/`
- Uses Squircle for smooth curves
- HugeIcons Pro integration
- Full semantic token support
- Advanced features (dot indicators, asymmetric padding, icon muting)
- Good for: Production apps, design-focused projects

## 🎯 Design Token Usage

All v2 components use semantic tokens that automatically remap in dark mode:

```tsx
// Utility color tokens (for badges, status indicators)
--color-utility-brand-50      // Light background
--color-utility-brand-200     // Border color
--color-utility-brand-500     // Icon color (muted)
--color-utility-brand-700     // Text color (primary)

// Semantic tokens (for general UI)
--color-text-primary          // Body text
--color-bg-primary            // Main surface
--color-border-primary        // Default border
```

## 🔗 Documentation Links

- **HugeIcons**: https://hugeicons.com
- **SILK Components**: https://silk.design
- **Untitled UI**: https://untitledui.com
- **Tailwind v4**: https://tailwindcss.com/blog/tailwindcss-v4-beta
- **React Aria**: https://react-spectrum.adobe.com/react-aria/

## ⚠️ Important Notes

1. **Node Version**: Requires Node 20.9.0+ (see `.nvmrc`)
2. **Authentication**: Premium packages require valid tokens in `.npmrc`
3. **Build Time**: First build may take longer due to premium packages
4. **File Size**: Squircle components are ~500 lines (well-documented, production-ready)
5. **Dark Mode**: Uses `.dark-mode` class (not `dark:` prefix)

## 🎉 What's Ready

- ✅ All proprietary dependencies installed
- ✅ V2 component structure copied
- ✅ Squircle component with full features
- ✅ Badge component with all variants
- ✅ HugeIcon wrapper with error handling
- ✅ SILK styles integrated
- ✅ Showcase page with live examples
- ✅ Documentation complete
- ✅ Ready to build and deploy

## 🚀 Next Steps

1. Test the build: `pnpm build` (requires Node 20+)
2. Run dev server: `pnpm dev`
3. Visit `/v2-components` to see all examples
4. Push to GitHub and deploy to Vercel

---

**This is now a COMPLETE v2 design system implementation, ready for portfolio showcase!** 🎉

