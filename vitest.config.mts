import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
    setupFiles: './vitest.setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      all: true,
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules',
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/types',
        'src/middleware.ts',
        'src/i18n/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
