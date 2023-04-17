import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// https://vitejs.dev/config/build-options.html#build-manifest
// https://vitejs.dev/config/build-options.html#build-emptyoutdir
export default defineConfig({
  plugins: [vue()],
  build: {
    manifest: true,
    outDir: "../static/build/",
    emptyOutDir: true
  },
  base: process.env.NODE_ENV === "production" ? "/static/build/" : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
