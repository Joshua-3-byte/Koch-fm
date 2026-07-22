import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'  // ✅ Add this if you're using React

export default defineConfig({
  plugins: [
    react(),  // ✅ Add this if you're using React
    tailwindcss(),
  ],
  // ✅ Ensure public files are copied to build
  publicDir: 'public',
  build: {
    outDir: 'dist',
    // ✅ Make sure assets are handled properly
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
    // ✅ Handle SPA routing in development
    historyApiFallback: true,
  },
})