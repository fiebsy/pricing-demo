# Filter Menu V1 (Legacy)

This is the **pre-date-picker version** of the filter menu playground, preserved from commit `35c9f4c` (Feb 19, 2026) for comparison purposes.

## Why This Exists

The filter-menu playground was substantially overhauled on Feb 20, 2026 (commit `146f14c`) which added:
- Date picker variant with `FilterMenuVariant` type
- `DatePickerConfig`, `DatePickerPeriod` types
- `DatePickerPreview`, `DatePickerTrigger` components
- Variant switching logic

This V1 version preserves the original table-filter-only implementation before those changes.

## Source Commit

**`35c9f4c`** - "perf: trigger video on pointerDown for immediate playback" (Feb 19, 2026 10:37)

Note: The filter-menu files were unchanged from `27dc186` (Feb 18, 2026) - this commit just happened to be the last one before the Feb 20 date picker overhaul.

## Key Differences from Current Version

### 1. Types (`config/types.ts`)
- **HAS** `UnifiedHoverConfig` import
- **NO** `FilterMenuVariant` type (no variant switching)
- **NO** `DatePickerConfig`, `DatePickerPeriod`, `DatePickerGroup`
- **NO** `SelectionIndicator` type
- `items` is **required** (not optional like in V2)

### 2. Preview Component (`core/filter-menu-preview.tsx`)
- Single `FilterMenuPreview` component (no variant branching)
- No `DatePickerPreview`, `DatePickerTrigger`, `SelectionIndicatorDot`
- Simpler - just the table filter with submenus

### 3. Presets (`config/presets.ts`)
- **HAS** `DEFAULT_UNIFIED_HOVER` config
- **NO** `DEFAULT_DATE_PICKER_MENU_CONFIG`
- **NO** `date-picker` preset
- All presets use original animation config shape

### 4. Panel Config (`panels/panel-config.ts`)
- **NO** variant selector section
- **NO** date picker section
- **HAS** unified hover section with full spring/style controls
- Five sections: Trigger, Menu, Appearance, Animation, Unified Hover

## Animation Compatibility Note

The V1 animation config included properties that no longer exist in the current `AnimationConfig` type:
- `syncOpacityToSpring` (removed)
- `blurOnFade` (removed)
- `opacityDuration` (removed)
- `quickOutDuration` (removed)

These properties controlled opacity/fade synchronization during menu transitions. The V1 code will work with the current Menu component, but these specific animation behaviors won't be present since the properties are silently ignored.

## Usage

Navigate to `/playground/filter-menu-v1` to compare side-by-side with the current version at `/playground/filter-menu`.

## Files

```
src/app/playground/filter-menu-v1/
├── page.tsx                    # V1 page (no variant switching)
├── core/
│   ├── filter-menu-preview.tsx # V1 preview (table-filter only)
│   └── index.ts
├── config/
│   ├── types.ts               # V1 types (has unifiedHover, no variant/datePicker)
│   ├── options.ts             # V1 options (has hover options, no variant selector)
│   ├── presets.ts             # V1 presets (no date-picker preset)
│   └── index.ts
├── panels/
│   ├── panel-config.ts        # V1 panel config (5 sections, no variant/datePicker)
│   └── index.ts
└── README.md                  # This file
```

---

**Created**: Feb 20, 2026
**Purpose**: Legacy comparison / reference for pre-date-picker implementation
