import path from 'path';

import chalk from 'chalk';
import * as fs from 'fs-extra';
import prompts from 'prompts';

import { installPackages } from '../utils/package-manager';
import { findComponent, findUtil, loadRegistry } from '../utils/registry';

export async function addCommand(componentName: string) {
  console.log(chalk.blue(`Adding ${componentName} component...`));

  try {
    const registry = await loadRegistry();
    const component = findComponent(registry, componentName);

    if (!component) {
      console.error(chalk.red(`[✗] Component "${componentName}" not found in registry`));
      console.log(chalk.gray('Available components:'));
      registry.components.forEach(comp => {
        console.log(chalk.gray(`  - ${comp.name}`));
      });
      process.exit(1);
    }

    // Check if component already exists
    const componentPath = path.join(process.cwd(), 'src/components/ui', `${componentName}.tsx`);
    if (await fs.pathExists(componentPath)) {
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `Component ${componentName} already exists. Overwrite?`,
        initial: false,
      });

      if (!overwrite) {
        console.log(chalk.yellow('Skipped adding component'));
        return;
      }
    }

    // Install dependencies
    if (component.dependencies.length > 0) {
      console.log(chalk.yellow('Installing dependencies...'));
      await installPackages(component.dependencies);
    }

    // Install registry dependencies (utils)
    if (component.registryDependencies) {
      for (const utilName of component.registryDependencies) {
        const util = findUtil(registry, utilName);
        if (util) {
          // Copy utility files
          for (const file of util.files) {
            const sourcePath = path.resolve(__dirname, '../', file.path);
            const destPath = path.join(process.cwd(), 'src/lib/utils', path.basename(file.path));

            if (await fs.pathExists(sourcePath)) {
              await fs.copy(sourcePath, destPath);
              console.log(chalk.green(`[✓] Copied ${utilName} utility`));
            }
          }
        }
      }
    }

    // Copy component files
    for (const file of component.files) {
      // Try multiple possible source paths
      const possiblePaths = [
        path.resolve(__dirname, '../', file.path),
        path.resolve(__dirname, '../../', file.path),
        path.resolve(process.cwd(), 'packages/fractui', file.path),
      ];

      let sourcePath = null;
      for (const possiblePath of possiblePaths) {
        if (await fs.pathExists(possiblePath)) {
          sourcePath = possiblePath;
          break;
        }
      }

      const destPath = path.join(process.cwd(), 'src/components/ui', path.basename(file.path));

      if (sourcePath) {
        await fs.copy(sourcePath, destPath);
        console.log(chalk.green(`[✓] Copied ${componentName} component`));
      } else {
        console.warn(chalk.yellow(`[!] Source file not found. Tried:`));
        possiblePaths.forEach(p => console.warn(chalk.yellow(`    ${p}`)));
      }
    }

    console.log(chalk.green(`[✓] Successfully added ${componentName} component`));
    console.log(
      chalk.gray(
        `Import it with: import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from '@/components/ui/${componentName}'`
      )
    );
  } catch (error) {
    console.error(chalk.red('[✗] Error adding component:'), error);
    process.exit(1);
  }
}
