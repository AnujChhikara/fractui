import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

const TAILWIND_CONFIG = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
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

const GLOBALS_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

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
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
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
      throw new Error(
        'No package.json found. Please run this command in a Next.js project.'
      );
    }

    const packageJson = await fs.readJson(packageJsonPath);
    if (!packageJson.dependencies?.next) {
      throw new Error("This doesn't appear to be a Next.js project.");
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

    execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });

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
      }
    }

    // Create cn utility
    const cnPath = path.join(process.cwd(), 'lib/utils/cn.ts');
    await fs.writeFile(cnPath, CN_UTIL);

    console.log(chalk.green('✅ FractUI initialized successfully!'));
    console.log(
      chalk.gray(
        'You can now add components with: fractui add <component-name>'
      )
    );
  } catch (error) {
    console.error(chalk.red('❌ Error initializing FractUI:'), error);
    process.exit(1);
  }
}
