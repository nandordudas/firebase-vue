import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import VueDevTools from 'vite-plugin-vue-devtools'

const { pathname: root } = new URL('./src/', import.meta.url)

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    AutoImport({
      imports: [
        '@vueuse/core',
        'pinia',
        'vue',
      ],
      dirs: [
        './src/composables',
        './src/stores',
      ],
      vueTemplate: true,
    }),
    Components(),
    UnoCSS(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '~/': root,
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
