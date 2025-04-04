import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer'

// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue()],
  // server: {
  //   port: 3000,
  //   open: true,
  //   host: '0.0.0.0' // 添加: 使用IP地址链接
  // },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    postcss: {
      plugins: [ autoprefixer()]
    }
  }
});