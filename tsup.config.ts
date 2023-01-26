import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/index.ts'],
  external: ['svelte/easing'],
  format: ['esm'],
  splitting: false,
  sourcemap: false,
  minify: true,
  clean: true,
  dts: true,
  esbuildOptions(options, context) {
    // waiting for https://github.com/egoist/tsup/pull/781 ?
    // options.sourcemap = 'external'
  },
})