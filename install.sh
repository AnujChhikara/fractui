#!/bin/bash

# FractUI Installation Script
echo "🚀 Setting up FractUI development environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build packages
echo "🔨 Building packages..."
pnpm build

echo "✅ FractUI setup complete!"
echo ""
echo "Next steps:"
echo "1. To test the CLI locally: cd packages/cli && npm link"
echo "2. In a Next.js project, run: npx @fractui/cli@latest init"
echo "3. Add components: npx @fractui/cli@latest add button"
