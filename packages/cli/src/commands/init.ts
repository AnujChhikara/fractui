import path from 'path';

import chalk from 'chalk';
import * as fs from 'fs-extra';

import { installPackages } from '../utils/package-manager';

const TAILWIND_CONFIG = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}`;

const GLOBALS_CSS = `@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}`;

const CN_UTIL = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

export async function initCommand() {
  console.log(chalk.blue('Initializing FractUI...'));

  try {
    // Check if we're in a Next.js project
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!(await fs.pathExists(packageJsonPath))) {
      throw new Error('No package.json found. Please run this command in a Next.js project.');
    }

    const packageJson = await fs.readJson(packageJsonPath);
    if (!packageJson.dependencies?.next && !packageJson.dependencies?.react) {
      throw new Error("This doesn't appear to be a React project.");
    }

    // Install dependencies
    console.log(chalk.yellow('Installing dependencies...'));
    const dependencies = [
      'tailwindcss',
      'postcss',
      'autoprefixer',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
    ];

    await installPackages(dependencies);

    // Create directories
    await fs.ensureDir(path.join(process.cwd(), 'components/ui'));
    await fs.ensureDir(path.join(process.cwd(), 'lib/utils'));

    // Create tailwind.config.js
    const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');
    await fs.writeFile(tailwindConfigPath, TAILWIND_CONFIG);

    // Update globals.css
    const globalsCssPath = path.join(process.cwd(), 'app/globals.css');
    if (await fs.pathExists(globalsCssPath)) {
      await fs.writeFile(globalsCssPath, GLOBALS_CSS);
    } else {
      const stylesCssPath = path.join(process.cwd(), 'styles/globals.css');
      if (await fs.pathExists(stylesCssPath)) {
        await fs.writeFile(stylesCssPath, GLOBALS_CSS);
      } else {
        // For Vite projects, try src/index.css
        const indexCssPath = path.join(process.cwd(), 'src/index.css');
        if (await fs.pathExists(indexCssPath)) {
          await fs.writeFile(indexCssPath, GLOBALS_CSS);
        }
      }
    }

    // Create cn utility
    const cnPath = path.join(process.cwd(), 'lib/utils/cn.ts');
    await fs.writeFile(cnPath, CN_UTIL);

    console.log(chalk.green('[✓] FractUI initialized successfully'));
    console.log(chalk.gray('You can now add components with: fractui add <component-name>'));
  } catch (error) {
    console.error(chalk.red('[✗] Error initializing FractUI:'), error);
    process.exit(1);
  }
}
