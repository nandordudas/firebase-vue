import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Dts from 'vite-plugin-dts'

import { dependencies } from './package.json'

const { pathname: root } = new URL('./src/', import.meta.url)

export default defineConfig({
  build: {
    lib: {
      entry: resolve(root, 'main.ts'),
      name: 'FirebaseVue',
      // formats: ['es'],
      // fileName: () => '[name].mjs',
    },
    rollupOptions: {
      external: Object.keys(dependencies),
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    target: 'esnext',
  },
  plugins: [
    Vue(),
    Dts(),
  ],
  resolve: {
    alias: {
      '~/': root,
    },
  },
})
