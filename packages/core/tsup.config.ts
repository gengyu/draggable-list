import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  external: [],
  injectStyle: false,
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'copy'
    };
    return options;
  }
}); 