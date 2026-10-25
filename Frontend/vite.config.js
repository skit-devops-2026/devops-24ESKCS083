import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Vitest configuration
  test: {
    // Use jsdom to simulate a browser environment for React component tests
    environment: 'jsdom',
    // Automatically inject describe/it/expect globals (no need to import them)
    globals: true,
    // Include test files from the __tests__ directories and *.test.js files
    include: ['src/**/*.test.{js,jsx,ts,tsx}', 'src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
  },
})
