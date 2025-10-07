import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Base dinamico: su Vercel usa '/', in produzione GitHub Pages usa '/ciclo-del-carbonio/'
const isVercel = !!process.env.VERCEL;
const base = isVercel ? "/" : "/ciclo-del-carbonio/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
