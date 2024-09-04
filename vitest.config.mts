import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      enabled: true,
      all: true,
      reporter: ['text'],
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: [''],
    },
    // exclude: ['./next.config.mjs']
  //   alias: {
  //   "public": path.resolve(__dirname, "./public/"),
  //   "components": path.resolve(__dirname, "./src/components/"),
  //   "hooks": path.resolve(__dirname, "./src/hooks/"),
  //   "utils": path.resolve(__dirname, "./src/utils/"),
  //   "i18n": path.resolve(__dirname, "./src/i18n/")
  // }
  },
});
