import { readFileSync } from 'fs';
import type { SnowpackConfig, SnowpackPlugin } from 'snowpack';
import { name as package_name } from './package.json';

const defaultExts = ['.txt'];

interface Options {
  exts?: string[];
}

interface StrictOptions {
  exts: string[];
}

function formatOptions(options?: Options): StrictOptions {
  const { exts = defaultExts } = options || {};
  return {
    exts: Array.isArray(exts) && exts.length > 0 ? exts : defaultExts
  };
}

export default function plugin(_: SnowpackConfig, options?: Options): SnowpackPlugin {
  const { exts } = formatOptions(options);
  return {
    name: package_name,
    resolve: {
      input: exts,
      output: ['.js']
    },
    async load({ filePath }): Promise<string> {
      const content = readFileSync(filePath, 'utf-8');
      const json = JSON.stringify(content)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
      return `export default ${json};`;
    }
  };
}
