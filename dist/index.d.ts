import type { SnowpackConfig, SnowpackPlugin } from 'snowpack';
interface Options {
    exts?: string[];
}
export default function plugin(_: SnowpackConfig, options?: Options): SnowpackPlugin;
export {};
