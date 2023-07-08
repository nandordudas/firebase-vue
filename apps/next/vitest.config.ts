import { defineConfig } from 'vitest/config'

const { pathname: root } = new URL('./src/', import.meta.url)

export default defineConfig({
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
