import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'

const { pathname: root } = new URL('./src/', import.meta.url)

export default defineConfig({
  plugins: [
    AutoImport(),
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '~/': root,
    },
  },
  test: {
    clearMocks: true,
    coverage: {
      provider: 'v8',
      thresholdAutoUpdate: true,
    },
    environment: 'jsdom',
    globals: true,
    mockReset: true,
    reporters: 'verbose',
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
  },
})
