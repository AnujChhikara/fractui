# FractUI Components

This document provides a comprehensive overview of all available components in FractUI, including their variants, props, and usage examples.

## Available Components

### Button

A versatile button component with multiple variants and sizes.

#### Variants

| Variant       | Description                                   | Usage                                |
| ------------- | --------------------------------------------- | ------------------------------------ |
| `default`     | Primary button with solid background          | Main actions, CTAs                   |
| `destructive` | Red button for destructive actions            | Delete, remove, dangerous operations |
| `outline`     | Button with border and transparent background | Secondary actions, alternatives      |
| `secondary`   | Muted button with subtle background           | Less prominent actions               |
| `ghost`       | Transparent button with hover effects         | Subtle actions, icon buttons         |
| `link`        | Text button that looks like a link            | Navigation, text-based actions       |

#### Sizes

| Size      | Description             | Height      | Use Case              |
| --------- | ----------------------- | ----------- | --------------------- |
| `default` | Standard button size    | `h-10`      | Most common use       |
| `sm`      | Small button            | `h-9`       | Compact spaces, forms |
| `lg`      | Large button            | `h-11`      | Prominent CTAs        |
| `icon`    | Square button for icons | `h-10 w-10` | Icon-only buttons     |

#### Props

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children: React.ReactNode;
}
```

#### Usage Examples

```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🚀</Button>

// Combined
<Button variant="destructive" size="lg">Delete Account</Button>

// With custom styling
<Button className="w-full">Full Width</Button>
```

#### Styling

The Button component uses CSS variables for theming:

- `--primary` - Primary color
- `--primary-foreground` - Primary text color
- `--destructive` - Destructive color
- `--destructive-foreground` - Destructive text color
- `--secondary` - Secondary color
- `--secondary-foreground` - Secondary text color
- `--accent` - Accent color
- `--accent-foreground` - Accent text color
- `--background` - Background color
- `--foreground` - Text color
- `--border` - Border color
- `--input` - Input border color
- `--ring` - Focus ring color

#### Accessibility

- Full keyboard navigation support
- Proper focus management with visible focus rings
- ARIA attributes for screen readers
- Disabled state handling
- Semantic HTML button element

#### Dependencies

- `@mui/base` - Base button functionality
- `class-variance-authority` - Variant management
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class merging

---

## Adding New Components

When adding new components to FractUI:

1. **Create the component** in `packages/fractui/src/components/[component-name]/`
2. **Add to core registry** in `packages/fractui/registry.json`
3. **Update CLI registry** in `packages/cli/registry.json`
4. **Update this documentation** with component details
5. **Test thoroughly** with different variants and props

### Component Template

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils/cn';

const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-styles',
      // Add more variants
    },
    size: {
      default: 'default-size',
      // Add more sizes
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Add component-specific props
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div className={cn(componentVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);

Component.displayName = 'Component';

export { Component, componentVariants };
```

---

## Component Guidelines

### Design Principles

1. **Consistency** - All components follow the same design patterns
2. **Accessibility** - WCAG 2.1 AA compliance
3. **Flexibility** - Customizable through props and CSS variables
4. **Performance** - Optimized for tree-shaking and minimal bundle size
5. **TypeScript** - Full type safety and IntelliSense support

### Variant Naming

- Use descriptive names that clearly indicate the component's purpose
- Follow a consistent pattern: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`
- Consider the component's context and usage patterns

### Size Naming

- Use consistent size names: `sm`, `default`, `lg`, `icon`
- Ensure sizes work well across different screen sizes
- Consider touch targets for mobile devices

### Documentation Requirements

Each component should include:

- [ ] Clear description and purpose
- [ ] All available variants and sizes
- [ ] Complete props interface
- [ ] Usage examples
- [ ] Accessibility features
- [ ] Dependencies
- [ ] Styling information

---

_Last updated: [Current Date]_
_Total components: 1_
