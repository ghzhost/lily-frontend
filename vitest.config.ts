import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src")
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**', 'tests/e2e/**', '**/*.spec.ts', 'eslint-rules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/app/**/*',
        'src/test/**/*',
        'src/types/**/*',
        'src/**/__fixtures__/**/*',
        'src/**/*.stories.{ts,tsx}',
        'src/i18n/**/*',
      ],
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70
      }
    },
  },
});
