# FractUI

A shadcn-style component library built on Base UI with Tailwind CSS.

## Features

- 🎨 **Beautiful Components** - Pre-built components with consistent design
- 🚀 **Copy & Paste** - Open source components you can customize
- 🎯 **Base UI Powered** - Built on top of Base UI for accessibility
- 🎨 **Tailwind CSS** - Styled with Tailwind CSS and CSS variables
- 📦 **CLI Tool** - Easy installation with `npx fractui add <component>`
- 🌙 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - All components follow accessibility best practices

## Quick Start

### 1. Initialize in your Next.js project

```bash
npx @fractui/cli@latest init
```

This will:

- Install required dependencies (Tailwind CSS, Base UI, etc.)
- Set up Tailwind configuration with CSS variables
- Create the `components/ui/` directory
- Add the `cn` utility function

### 2. Add components

```bash
npx @fractui/cli@latest add button
```

### 3. Use in your code

```tsx
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

## Available Components

- **Button** - Basic button component with hover and focus states

## Development

This is a monorepo with two packages:

- `packages/fractui/` - The component library
- `packages/cli/` - The CLI tool

### Setup

```bash
# Install dependencies
pnpm install

# Build packages
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

### Adding New Components

1. Create your component in `packages/fractui/src/components/`
2. Add it to the registry in `packages/fractui/registry.json`
3. Update the CLI registry in `packages/cli/registry.json`
4. Build and test

## License

MIT
