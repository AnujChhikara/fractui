# Contributing to FractUI

Thank you for your interest in contributing to FractUI! This document provides comprehensive guidelines for contributing to the project.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Adding New Components](#adding-new-components)
- [Testing Guidelines](#testing-guidelines)
- [Publishing Workflow](#publishing-workflow)
- [Pull Request Process](#pull-request-process)

## Project Structure

FractUI is a monorepo managed with pnpm, containing two main packages:

```
fractui/
├── packages/
│   ├── fractui/              # Core component library
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   └── utils/        # Utility functions
│   │   ├── dist/             # Built library output
│   │   ├── registry.json     # Component registry
│   │   ├── package.json      # Package configuration
│   │   └── tsup.config.ts    # Build configuration
│   └── cli/                  # CLI tool
│       ├── src/
│       │   ├── commands/     # CLI commands
│       │   ├── components/   # Component templates
│       │   └── utils/        # CLI utilities
│       ├── dist/             # Built CLI output
│       ├── registry.json     # CLI component registry
│       └── package.json      # CLI package configuration
├── .github/
│   └── workflows/            # GitHub Actions CI/CD
├── package.json              # Root package configuration
├── pnpm-workspace.yaml       # pnpm workspace configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # Project documentation
```

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 9.0.0+
- Git

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fractui.git
   cd fractui
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Build all packages**

   ```bash
   pnpm build
   ```

4. **Verify setup**
   ```bash
   pnpm check
   ```

## Development Workflow

### Root Level Commands

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `pnpm install`      | Install all dependencies                  |
| `pnpm build`        | Build all packages                        |
| `pnpm dev`          | Watch mode for all packages               |
| `pnpm lint`         | Run linting on all packages               |
| `pnpm lint:fix`     | Fix linting issues                        |
| `pnpm type-check`   | TypeScript type checking                  |
| `pnpm format`       | Format code with Prettier                 |
| `pnpm format:check` | Check code formatting                     |
| `pnpm check`        | Run all quality checks                    |
| `pnpm fix`          | Fix lint and format issues                |
| `pnpm runfix`       | Fix all issues (lint, format, type-check) |
| `pnpm clean`        | Clean all build artifacts                 |
| `pnpm publish:core` | Publish core library                      |
| `pnpm publish:cli`  | Publish CLI tool                          |
| `pnpm publish:all`  | Publish both packages                     |

### Package-Specific Commands

#### Core Library (`packages/fractui/`)

```bash
cd packages/fractui

# Development
pnpm dev          # Watch mode for development
pnpm build        # Build the library
pnpm clean        # Clean dist folder

# Code Quality
pnpm lint         # Lint source files
pnpm type-check   # TypeScript type checking
```

#### CLI Tool (`packages/cli/`)

```bash
cd packages/cli

# Development
pnpm dev          # Watch mode for development
pnpm build        # Build the CLI
pnpm clean        # Clean dist folder

# Code Quality
pnpm lint         # Lint source files
pnpm type-check   # TypeScript type checking
```

## Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Use enums for constants
- Follow React component patterns

### React Components

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Use `forwardRef` for components that need ref forwarding
- Follow accessibility best practices
- Use semantic HTML elements

### File Organization

- One component per file
- Co-locate related files (tests, stories, etc.)
- Use kebab-case for file names
- Use PascalCase for component names

### Import/Export

- Use named exports for components
- Use default exports sparingly
- Group imports: external libraries, internal modules, relative imports
- Sort imports alphabetically

### Styling

- Use Tailwind CSS classes
- Follow the design system patterns
- Use CSS variables for theming
- Implement dark mode support

## Adding New Components

### 1. Create the Component

1. **Create component file** in `packages/fractui/src/components/[component-name]/`
2. **Follow the component template**:

   ```tsx
   import React from 'react';
   import { cn } from '../../utils/cn';

   export interface ComponentNameProps {
     className?: string;
     children?: React.ReactNode;
   }

   export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
     ({ className, children, ...props }, ref) => {
       return (
         <div ref={ref} className={cn('base-classes', className)} {...props}>
           {children}
         </div>
       );
     }
   );

   ComponentName.displayName = 'ComponentName';
   ```

### 2. Update Registries

1. **Add to core registry** (`packages/fractui/registry.json`):

   ```json
   {
     "name": "component-name",
     "dependencies": ["dependency1", "dependency2"],
     "files": [
       {
         "name": "ComponentName.tsx",
         "path": "src/components/component-name/ComponentName.tsx"
       }
     ]
   }
   ```

2. **Add to CLI registry** (`packages/cli/registry.json`):
   ```json
   {
     "name": "component-name",
     "dependencies": ["dependency1", "dependency2"],
     "registryDependencies": ["cn"],
     "files": [
       {
         "name": "ComponentName.tsx",
         "path": "src/components/component-name/ComponentName.tsx"
       }
     ]
   }
   ```

### 3. Update CLI Registry

1. **Update CLI registry** (`packages/cli/registry.json`) to point to the core library component
2. **Add dependencies** that the component needs

### 4. Update Documentation

1. **Update COMPONENTS.md** with the new component details
2. **Add usage examples** and variant descriptions
3. **Document all props** and their purposes

### 5. Build and Test

```bash
# Build all packages
pnpm build

# Test the component
cd packages/cli
npx fractui add component-name
```

## Testing Guidelines

### Component Testing

1. **Create a test React project**:

   ```bash
   npx create-react-app test-fractui
   cd test-fractui
   ```

2. **Initialize FractUI**:

   ```bash
   npx @fractui/cli@latest init
   ```

3. **Add and test components**:

   ```bash
   npx @fractui/cli@latest add button
   ```

4. **Verify functionality** in the test project

### Manual Testing Checklist

- [ ] Component renders correctly
- [ ] Props work as expected
- [ ] Styling is applied correctly
- [ ] Dark mode works
- [ ] Accessibility features work
- [ ] TypeScript types are correct
- [ ] CLI installation works

## Publishing Workflow

### Version Management

- Use semantic versioning (semver)
- Update version in `package.json` files
- Update changelog if applicable

### Publishing Steps

1. **Update versions** in both package.json files
2. **Build all packages**:
   ```bash
   pnpm build
   ```
3. **Run quality checks**:
   ```bash
   pnpm check
   ```
4. **Publish packages**:

   ```bash
   # Publish core library
   pnpm publish:core

   # Publish CLI tool
   pnpm publish:cli

   # Or publish both
   pnpm publish:all
   ```

### Pre-publish Checklist

- [ ] All tests pass
- [ ] Code is linted and formatted
- [ ] TypeScript compilation succeeds
- [ ] Version numbers are updated
- [ ] Changelog is updated (if applicable)
- [ ] Documentation is updated

## Pull Request Process

### Before Submitting

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run quality checks**:
   ```bash
   pnpm check
   ```
5. **Test your changes** thoroughly
6. **Commit your changes**:
   ```bash
   git commit -m "feat: add new component"
   ```

### PR Guidelines

- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Reference issues** if applicable
- **Include screenshots** for UI changes
- **Update documentation** if needed
- **Ensure all checks pass**

### Commit Message Format

Use conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

Examples:

- `feat: add button component`
- `fix: resolve CLI installation issue`
- `docs: update contributing guidelines`

## Getting Help

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Documentation**: Check the README and this contributing guide

## License

By contributing to FractUI, you agree that your contributions will be licensed under the MIT License.
