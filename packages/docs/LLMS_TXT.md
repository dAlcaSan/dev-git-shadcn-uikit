# LLM.txt Generation

This document explains how the `llms.txt` file is generated for the UI kit library to help LLMs and AI agents understand and use the component library.

## What is llms.txt?

`llms.txt` is a standardized file format (see [llmstxt.org](https://llmstxt.org/)) that provides LLM-friendly documentation. It helps AI assistants:

- Understand your component library structure
- Generate correct code with proper imports
- Know available component variants and props
- Access usage examples quickly

## Generated Content

The `llms.txt` file includes:

### 1. **Project Overview**

- Package name and description
- Key features and technologies
- Important notes about conventions (av- prefix, CSS variables)

### 2. **Getting Started Links**

- Installation guide
- Architecture overview
- Main README

### 3. **Usage Examples**

- Basic component usage (Button, Card, Dialog)
- Common patterns
- Import statements

### 4. **Component Catalog**

Organized by category:

- Form Inputs
- Buttons & Actions
- Layout
- Navigation
- Overlays
- Feedback
- Data Display
- Forms
- Menus

Each component includes:

- Name and description
- Available variants (extracted from code)
- Available sizes (extracted from code)

### 5. **Styling & Customization**

- Tailwind configuration
- CSS variables
- Dark mode support
- Custom variants

### 6. **Optional Resources**

- External documentation links (Radix UI, Tailwind, etc.)

## How It Works

The generation script (`scripts/generate-llms-txt.ts`):

1. Reads component files from `src/components/ui/`
2. Extracts variant and size information from CVA definitions
3. Matches components with predefined descriptions
4. Organizes components by category
5. Generates markdown following the llms.txt spec
6. Outputs to `dist/llms.txt`

## Build Integration

The `llms.txt` file is automatically generated during the build process:

```bash
# Full build (includes llms.txt generation)
npm run build

# Generate llms.txt only
npm run build:llms
```

The file is included in the published package in the `dist/` directory.

## Usage by LLMs

AI assistants can access the file at:

- `node_modules/@acronis-platform/shadcn-uikit/dist/llms.txt` (after installation)
- Published package URL (when hosted)

IDEs with AI assistants (like Cursor, Windsurf, GitHub Copilot) can read this file to provide better code suggestions.

## Customization

To customize the generated content:

1. **Update component descriptions**: Edit the `COMPONENT_DESCRIPTIONS` object in `scripts/generate-llms-txt.ts`
2. **Add more examples**: Modify the "Usage Examples" section in the script
3. **Change categories**: Update the `categories` object to reorganize components
4. **Add more sections**: Extend the `generateLlmsTxt()` function

## Best Practices

The generated `llms.txt` follows these guidelines:

- **Concise**: Focuses on essential information
- **Clear**: Uses simple, unambiguous language
- **Structured**: Follows the llms.txt specification
- **Practical**: Includes working code examples
- **Complete**: Covers all components with key details

## Example Output

````markdown
# @acronis-platform/shadcn-uikit

> A React component library built on shadcn/ui principles...

## Getting Started

- [Installation Guide](...)
- [Architecture Overview](...)

## Usage Examples

**Basic Button:**

```tsx
import { Button } from '@acronis-platform/shadcn-uikit/react';
<Button variant="default">Click me</Button>;
```
````

## Components

**Form Inputs:**

- **input**: Text input field
- **select**: Dropdown selection input (variants: default, ghost)
  ...

```

## Maintenance

When adding new components:

1. Add the component file to `src/components/ui/`
2. Add a description to `COMPONENT_DESCRIPTIONS` in the script
3. Optionally add to a category in the `categories` object
4. Run `npm run build:llms` to regenerate

The script automatically detects new components, but manual descriptions provide better context for LLMs.

## Future Enhancements

Potential improvements:

- Generate `.md` versions of component documentation
- Create `llms-full.txt` with expanded content
- Extract JSDoc comments from components
- Include prop type definitions
- Add links to Storybook stories
- Generate component-specific usage examples from tests
```
