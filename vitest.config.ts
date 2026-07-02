import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    css: true,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    onConsoleLog(log, type) {
      if (type === 'stderr' && log.includes('Warning: An update to')) {
        return false;
      }
      if (type === 'stderr' && log.includes('was not wrapped in act')) {
        return false;
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});
