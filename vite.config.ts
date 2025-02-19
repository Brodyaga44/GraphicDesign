import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svg from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(""), "./src"),
    },
  },

  plugins: [react(), svg()],
});
