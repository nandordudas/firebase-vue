import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// import Dts from 'vite-plugin-dts'

const { pathname: root } = new URL('./src/', import.meta.url)

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        '@vueuse/firebase',
        'firebase',
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        'vue',
      ],
      output: {
        globals: {
          '@vueuse/firebase': 'firebase',
          'firebase': 'firebase',
          'firebase/app': 'firebase',
          'firebase/auth': 'firebase',
          'firebase/firestore': 'firebase',
          'vue': 'Vue',
        },
      },
    },
  },
  plugins: [
    Vue(),
    // Dts(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '~/': root,
    },
  },
})
