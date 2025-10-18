# FractUI

A shadcn-style component library built with React and Tailwind CSS.

## Features

- 🎨 **Beautiful Components** - Pre-built components with consistent design
- 🚀 **Copy & Paste** - Open source components you can customize
- 🎨 **Tailwind CSS** - Styled with Tailwind CSS and CSS variables
- 📦 **CLI Tool** - Easy installation with `npx @fractui/cli add <component>`
- 🌙 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - All components follow accessibility best practices
- ⚡ **Fast** - Optimized for performance with tree-shaking support

## Quick Start

### 1. Initialize in your React project

```bash
npx @fractui/cli@latest init
```

This will:

- Install required dependencies (Tailwind CSS, clsx, tailwind-merge, etc.)
- Set up Tailwind configuration with CSS variables
- Create the `components/ui/` and `lib/utils/` directories
- Add the `cn` utility function

### 2. Add components

```bash
npx @fractui/cli@latest add button
```

### 3. Use in your code

```tsx
import { Button } from './components/ui/Button';

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

# Run format checking
pnpm format:check

# Fix all issues (lint, format, and type-check)
pnpm runfix
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
3. Update the CLI registry in `packages/cli/registry.json`
4. Copy the component to `packages/cli/src/components/`
5. Build and test

### Publishing

```bash
# Publish core library
pnpm publish:core

# Publish CLI tool
pnpm publish:cli

# Publish both
pnpm publish:all
```

## Project Structure

```
fractui/
├── packages/
│   ├── fractui/          # Core component library
│   └── cli/              # CLI tool for adding components
├── .github/
│   └── workflows/       # GitHub Actions CI
└── README.md
```

## License

MIT
