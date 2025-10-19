# FractUI

A production-ready component library built with React and Tailwind CSS, inspired by shadcn/ui.

## Features

- **Beautiful Components** - Pre-built components with consistent design
- **Copy & Paste** - Open source components you can customize
- **Tailwind CSS** - Styled with Tailwind CSS and CSS variables
- **CLI Tool** - Easy installation with `npx @fractui/cli add <component>`
- **Dark Mode** - Built-in dark mode support
- **Accessible** - All components follow accessibility best practices
- **Fast** - Optimized for performance with tree-shaking support

## Quick Start

### 1. Initialize in your React project

```bash
npx @fractui/cli@latest init
```

This will:

- Install required dependencies (Tailwind CSS, clsx, tailwind-merge, etc.)
- Set up Tailwind configuration with CSS variables
- Create the `src/components/ui/` and `src/lib/utils/` directories
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
    <div className="space-x-4">
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

## Available Components

- **Button** - Versatile button component with multiple variants and sizes
  - Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
  - Sizes: `default`, `sm`, `lg`, `icon`

For detailed component documentation, see [COMPONENTS.md](./COMPONENTS.md).

## Development

This is a monorepo managed with pnpm, containing two main packages:

- `packages/fractui/` - Core component library
- `packages/cli/` - CLI tool for component installation

### Project Structure

```
fractui/
├── packages/
│   ├── fractui/          # Core component library
│   │   ├── src/          # Source components and utilities
│   │   ├── dist/         # Built library output
│   │   └── registry.json # Component registry
│   └── cli/              # CLI tool
│       ├── src/          # CLI source code
│       ├── dist/         # Built CLI output
│       └── registry.json # CLI component registry
├── .github/              # GitHub Actions workflows
├── package.json          # Root package configuration
└── pnpm-workspace.yaml   # pnpm workspace configuration
```

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Development mode (watch)
pnpm dev

# Code quality checks
pnpm lint              # Run linting
pnpm lint:fix          # Fix linting issues
pnpm type-check        # TypeScript type checking
pnpm format            # Format code
pnpm format:check      # Check formatting
pnpm check             # Run all checks
pnpm fix               # Fix lint and format issues
pnpm runfix            # Fix all issues (lint, format, type-check)

# Clean build artifacts
pnpm clean
```

### Testing Components

Create a separate React project to test components:

```bash
# Create a new React project
npx create-react-app my-test-app
cd my-test-app

# Initialize FractUI
npx @fractui/cli@latest init

# Add components
npx @fractui/cli@latest add button
```

### Adding New Components

1. Create your component in `packages/fractui/src/components/`
2. Add it to the registry in `packages/fractui/registry.json`
3. Update the CLI registry in `packages/cli/registry.json` to point to the core library component
4. Build and test

### Publishing

```bash
# Publish core library
pnpm publish:core

# Publish CLI tool
pnpm publish:cli

# Publish both packages
pnpm publish:all
```

### Package-specific Commands

Each package has its own set of commands:

**Core Library (`packages/fractui/`):**

```bash
cd packages/fractui
pnpm build        # Build the library
pnpm dev          # Watch mode
pnpm clean        # Clean dist folder
pnpm lint         # Lint source files
pnpm type-check   # TypeScript checking
```

**CLI Tool (`packages/cli/`):**

```bash
cd packages/cli
pnpm build        # Build the CLI
pnpm dev          # Watch mode
pnpm clean        # Clean dist folder
pnpm lint         # Lint source files
pnpm type-check   # TypeScript checking
```

## License

MIT
