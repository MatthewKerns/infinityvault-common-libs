# @infinityvault/shared-ui

Shared UI component library for InfinityVault applications.

## Installation

```bash
# From the shared-ui directory
npm install
npm run build
```

## Usage

```tsx
import { Button, Card, Badge, Input } from '@infinityvault/shared-ui';
import { cn } from '@infinityvault/shared-ui';
```

## Components

### Primitive Components
- **Button** - Versatile button component with variants
- **Card** - Container component with header, content, and footer
- **Badge** - Small label component with variants
- **Input** - Text input field
- **Label** - Form label component
- **Progress** - Progress bar component
- **Tabs** - Tab navigation component
- **Textarea** - Multi-line text input
- **Dialog** - Modal dialog component
- **Separator** - Visual separator line
- **Select** - Dropdown select component

### Composite Components
- **ChatMessage** - Rich chat message display component

## Development

```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Run Storybook for component documentation
npm run storybook
```

## Migration

To migrate existing UI components to use this shared library:

```bash
# From the shared-ui directory
./migrate-imports.sh ../../frontend
./migrate-imports.sh ../../eos-agent-frontend
```

## Version History

- **1.0.0** - Initial release with core UI components