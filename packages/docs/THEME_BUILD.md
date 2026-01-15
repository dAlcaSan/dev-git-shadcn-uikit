# Theme Build Configuration

## Overview

The shadcn-uikit now builds themes as **separate CSS files** for tree-shakeable imports. This allows consumers to import only the themes they need, reducing bundle size.

## Build Output

The Vite build generates the following CSS files:

```
dist/
├── shadcn-uikit.css          (15KB) - Main styles with default theme
└── themes/
    ├── acronis-default.css   (14.65KB) - Standalone default theme
    └── acronis-ocean.css     (7.87KB) - Standalone ocean theme
```

## How It Works

### 1. CSS Code Splitting

Enabled in `vite.config.ts`:

```typescript
build: {
  cssCodeSplit: true,  // Enable CSS code splitting
  lib: {
    entry: {
      index: resolve(__dirname, 'src/index.ts'),
      react: resolve(__dirname, 'src/react.ts'),
      styles: resolve(__dirname, 'src/styles/index.scss'),
      'themes/acronis-default': resolve(__dirname, 'src/styles/theme-acronis-default.scss'),
      'themes/acronis-ocean': resolve(__dirname, 'src/styles/theme-acronis-ocean.scss'),
    },
    formats: ['es'],
    fileName: (format, entryName) => `${entryName}.js`,
  },
}
```

### 2. Standalone Theme Entry Files

Created separate SCSS entry files that import only what's needed:

**`src/styles/theme-acronis-default.scss`:**

```scss
@use './tokens/primitives';
@use './themes/acronis-default';
```

**`src/styles/theme-acronis-ocean.scss`:**

```scss
@use './tokens/primitives';
@use './themes/acronis-ocean';
```

These standalone files ensure each theme can be imported independently without duplicating the entire token system.

### 3. Package Exports

Updated `package.json` to expose theme CSS files:

```json
{
  "exports": {
    "./styles": "./dist/shadcn-uikit.css",
    "./styles/themes": "./dist/themes/acronis-default.css",
    "./styles/themes/acronis-default": "./dist/themes/acronis-default.css",
    "./styles/themes/acronis-ocean": "./dist/themes/acronis-ocean.css"
  }
}
```

## Usage Patterns

### Pattern 1: Main Styles Only (Default Theme)

```typescript
import '@acronis-platform/shadcn-uikit/styles';
```

**Result:** 15KB - Includes default theme via semantic tokens

### Pattern 2: Alternative Theme

```typescript
import '@acronis-platform/shadcn-uikit/styles';
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-ocean';
```

**Result:** 15KB + 7.87KB = 22.87KB - Main styles + ocean theme

### Pattern 3: Standalone Theme (Advanced)

```typescript
// Only import the theme without main styles
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-ocean';
```

**Result:** 7.87KB - Only ocean theme (requires manual Tailwind setup)

## File Size Breakdown

| File                         | Size    | Gzipped | Contents                    |
| ---------------------------- | ------- | ------- | --------------------------- |
| `shadcn-uikit.css`           | 15KB    | 1.78KB  | Main styles + default theme |
| `themes/acronis-default.css` | 14.65KB | 1.54KB  | Primitives + default theme  |
| `themes/acronis-ocean.css`   | 7.87KB  | 1.51KB  | Primitives + ocean theme    |

## Why Separate Files?

### Benefits

1. **Tree-shakeable** - Import only themes you use
2. **Smaller bundles** - Don't ship unused themes
3. **Lazy loading** - Load themes on demand
4. **Better caching** - Themes cached separately
5. **Flexible** - Mix and match as needed

### Trade-offs

- Slightly more complex import setup
- Multiple HTTP requests (mitigated by HTTP/2)
- Need to manage multiple CSS imports

## Adding New Themes

To add a new theme to the build:

### 1. Create Theme File

```scss
// src/styles/themes/my-theme.scss
@mixin theme-my-theme {
  // Theme tokens
}

.theme-my-theme {
  @include theme-my-theme;
}
```

### 2. Create Standalone Entry

```scss
// src/styles/theme-my-theme.scss
@use './tokens/primitives';
@use './themes/my-theme';
```

### 3. Add to Vite Config

```typescript
entry: {
  // ... existing entries
  'themes/my-theme': resolve(__dirname, 'src/styles/theme-my-theme.scss'),
}
```

### 4. Add to Package Exports

```json
{
  "exports": {
    "./styles/themes/my-theme": "./dist/themes/my-theme.css"
  }
}
```

### 5. Build

```bash
pnpm build
```

## Technical Details

### CSS Code Splitting

Vite's `cssCodeSplit: true` option enables splitting CSS by entry point. Each SCSS entry generates its own CSS file.

### Asset Naming

The `assetFileNames` function in rollup options controls CSS output names:

```typescript
assetFileNames: (assetInfo) => {
  if (assetInfo.name === 'style.css' || assetInfo.name === 'styles.css') {
    return 'shadcn-uikit.css';
  }
  return assetInfo.name || 'assets/[name]-[hash][extname]';
};
```

### Theme Structure

Each theme includes:

- Primitive tokens (colors, opacity)
- Semantic mappings (light mode)
- Dark mode overrides
- Theme class wrapper

## Build Verification

To verify themes are building correctly:

```bash
# Build the package
pnpm --filter @acronis-platform/shadcn-uikit build

# Check output files
ls -lh dist/*.css dist/themes/*.css

# Expected output:
# dist/shadcn-uikit.css
# dist/themes/acronis-default.css
# dist/themes/acronis-ocean.css
```

## Migration Notes

### From Previous Setup

Previously, all themes were bundled into a single CSS file. Now:

- **Before:** One `shadcn-uikit.css` with all themes (~30KB)
- **After:** Separate files - main + individual themes (15KB + 7-14KB each)

### No Breaking Changes

The main import still works:

```typescript
import '@acronis-platform/shadcn-uikit/styles';
```

Additional themes are opt-in via separate imports.

## Performance Considerations

### Bundle Size

- **Default usage:** 15KB (main styles only)
- **With ocean theme:** 22.87KB (main + ocean)
- **Savings:** ~7KB if not using alternative themes

### Loading Strategy

**Option 1: Static Import (Recommended)**

```typescript
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-ocean';
```

**Option 2: Dynamic Import (Advanced)**

```typescript
async function loadTheme(theme: string) {
  await import(`@acronis-platform/shadcn-uikit/styles/themes/${theme}`);
}
```

## Troubleshooting

### Theme CSS not found

Ensure the package is built:

```bash
pnpm --filter @acronis-platform/shadcn-uikit build
```

### Import errors

Check package.json exports match your import path:

```typescript
// ✅ Correct
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-ocean';

// ❌ Wrong
import '@acronis-platform/shadcn-uikit/themes/acronis-ocean';
```

### Duplicate styles

Don't import both main styles and standalone theme:

```typescript
// ❌ Duplicate default theme
import '@acronis-platform/shadcn-uikit/styles';
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-default';

// ✅ Correct - main styles already include default
import '@acronis-platform/shadcn-uikit/styles';
```

## Related Documentation

- [THEMES.md](./THEMES.md) - User guide for theme usage
- [THEME_ARCHITECTURE.md](../demo/docs/THEME_ARCHITECTURE.md) - Token system architecture
- [THEME_IMPLEMENTATION.md](./THEME_IMPLEMENTATION.md) - Implementation details
