# Migration Guide: Using @infinityvault/shared-ui

## Step 1: Install Dependencies

```bash
# From project root
cd packages/shared-ui
npm install
npm run build

# Then install in your frontend app
cd ../../frontend  # or eos-agent-frontend
npm install
```

## Step 2: Update Imports

### Before (Old Structure):
```tsx
// Multiple imports from different ui component files
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
```

### After (Using Shared UI):
```tsx
// Single import from shared-ui package
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Badge,
  cn
} from '@infinityvault/shared-ui';
```

## Step 3: Remove Duplicate Files

After migrating imports, you can remove the duplicate component files:

```bash
# Frontend app
rm -rf frontend/src/components/ui/button.tsx
rm -rf frontend/src/components/ui/card.tsx
rm -rf frontend/src/components/ui/badge.tsx
rm -rf frontend/src/components/ui/input.tsx
rm -rf frontend/src/components/ui/label.tsx
rm -rf frontend/src/components/ui/progress.tsx
rm -rf frontend/src/components/ui/tabs.tsx
rm -rf frontend/src/components/ui/textarea.tsx
rm -rf frontend/src/components/ui/dialog.tsx
rm -rf frontend/src/components/ui/separator.tsx
rm -rf frontend/src/components/ui/select.tsx

# EOS Agent Frontend
rm -rf eos-agent-frontend/src/components/ui/button.tsx
rm -rf eos-agent-frontend/src/components/ui/card.tsx
rm -rf eos-agent-frontend/src/components/ui/badge.tsx
rm -rf eos-agent-frontend/src/components/ui/input.tsx
rm -rf eos-agent-frontend/src/components/ui/label.tsx
rm -rf eos-agent-frontend/src/components/ui/progress.tsx
rm -rf eos-agent-frontend/src/components/ui/tabs.tsx
rm -rf eos-agent-frontend/src/components/ui/textarea.tsx
rm -rf eos-agent-frontend/src/components/ui/dialog.tsx
```

## Step 4: Update Chat Components

### Before:
```tsx
import { ChatMessage } from './components/chat/ChatMessage';
```

### After:
```tsx
import { ChatMessage } from '@infinityvault/shared-ui';
```

## Step 5: Components Not Yet Migrated

These components remain in your local frontend and may be migrated later:
- Accordion
- Alert & AlertDialog  
- AspectRatio
- Avatar
- Breadcrumb
- Calendar
- Carousel
- Chart
- Checkbox
- Collapsible
- Command
- ContextMenu
- Drawer
- DropdownMenu
- Form
- HoverCard
- InputOTP
- Menubar
- NavigationMenu
- Pagination
- Popover
- RadioGroup
- Resizable
- ScrollArea
- Sheet
- Sidebar
- Skeleton
- Slider
- Switch
- Table
- Toast & Toaster
- Toggle & ToggleGroup
- Tooltip

## Step 6: Testing

1. Run type checking:
```bash
npm run typecheck
```

2. Run build:
```bash
npm run build
```

3. Test the application:
```bash
npm run dev
```

## Common Issues

### Issue: Module not found
**Solution:** Make sure you've built the shared-ui package first:
```bash
cd packages/shared-ui && npm run build
```

### Issue: Type errors
**Solution:** The shared-ui exports proper TypeScript types. Make sure your imports match the exported names.

### Issue: Styling issues
**Solution:** The shared-ui components use the same Tailwind classes. Ensure your app's tailwind.config.js includes the shared-ui in content paths:
```js
content: [
  "./src/**/*.{ts,tsx}",
  "../packages/shared-ui/src/**/*.{ts,tsx}" // Add this line
]
```