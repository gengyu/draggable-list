import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      rollupTypes: true,
      // skipDiagnostics: true,
      // logDiagnostics: false
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DragListVue',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      external: [
          'vue',
        // '@drag-list/core'
      ],
      output: {
        globals: {
          vue: 'Vue',
          // '@drag-list/core': 'DragListCore'
        }
      }
    }
  }
}); 