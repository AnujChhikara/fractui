import path from 'path';

import * as fs from 'fs-extra';

export interface RegistryFile {
  path: string;
  type: string;
}

export interface RegistryComponent {
  name: string;
  type: string;
  files: RegistryFile[];
  dependencies: string[];
  devDependencies: string[];
  registryDependencies?: string[];
}

export interface RegistryUtil {
  name: string;
  files: RegistryFile[];
  dependencies: string[];
}

export interface Registry {
  components: RegistryComponent[];
  utils: RegistryUtil[];
}

export async function loadRegistry(): Promise<Registry> {
  const registryPath = path.resolve(__dirname, '../registry.json');
  const registry = await fs.readJson(registryPath);
  return registry;
}

export function findComponent(registry: Registry, name: string): RegistryComponent | undefined {
  return registry.components.find(component => component.name === name);
}

export function findUtil(registry: Registry, name: string): RegistryUtil | undefined {
  return registry.utils.find(util => util.name === name);
}
