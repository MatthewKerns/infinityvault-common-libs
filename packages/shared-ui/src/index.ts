// Utility functions
export { cn } from './lib/utils';

// Primitive components
export { Button, buttonVariants, type ButtonProps } from './components/primitives/button';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/primitives/card';
export { Badge, badgeVariants, type BadgeProps } from './components/primitives/badge';
export { Input } from './components/primitives/input';
export { Label } from './components/primitives/label';
export { Progress } from './components/primitives/progress';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/primitives/tabs';
export { Textarea } from './components/primitives/textarea';
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/primitives/dialog';
export { Separator } from './components/primitives/separator';
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/primitives/select';

// Composite components
export { ChatMessage, type Message } from './components/composite/ChatMessage';

// Re-export types
export type { ClassValue } from 'clsx';