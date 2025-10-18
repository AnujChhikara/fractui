#!/usr/bin/env node

import { Command } from 'commander';

import { addCommand } from './commands/add';
import { initCommand } from './commands/init';

const program = new Command();

program.name('fractui').description('CLI tool for FractUI component library').version('0.1.0');

program
  .command('init')
  .description('Initialize FractUI in your project')
  .action(async () => {
    await initCommand();
  });

program
  .command('add <component>')
  .description('Add a component to your project')
  .action(async (component: string) => {
    await addCommand(component);
  });

program.parse();
