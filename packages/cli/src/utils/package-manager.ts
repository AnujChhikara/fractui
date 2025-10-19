import { execSync } from 'child_process';
import path from 'path';

import * as fs from 'fs-extra';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export async function getPackageManager(): Promise<PackageManager> {
  const cwd = process.cwd();

  // Check for lock files in order of preference
  if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (await fs.pathExists(path.join(cwd, 'package-lock.json'))) {
    return 'npm';
  }

  // Default to npm if no lock file found
  return 'npm';
}

export function getInstallCommand(packageManager: PackageManager, packages: string[]): string {
  const packageList = packages.join(' ');

  switch (packageManager) {
    case 'pnpm':
      return `pnpm add ${packageList}`;
    case 'yarn':
      return `yarn add ${packageList}`;
    case 'npm':
    default:
      return `npm install ${packageList}`;
  }
}

export async function installPackages(packages: string[]): Promise<void> {
  const packageManager = await getPackageManager();
  const command = getInstallCommand(packageManager, packages);

  console.log(`Installing packages with ${packageManager}...`);

  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Failed to install packages with ${packageManager}. Command: ${command}\nError: ${errorMessage}`
    );
  }
}
