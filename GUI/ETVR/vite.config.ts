import * as path from 'path'
import solid from 'solid-start/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@components': path.resolve(__dirname, './src/components'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@config': path.resolve(__dirname, './src/config'),
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './assets'),
      '@hooks': path.resolve(__dirname, './src/utils/hooks'),
      '@static': path.resolve(__dirname, './src/static'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [solid(ssr: false)],
  ssr: {
    noExternal: ['@hope-ui/core', '@hope-ui/styles'],
  },
})
