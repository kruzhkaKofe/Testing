import { defineConfig, EnvironmentModuleGraph } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    exclude: ["module/*"],
    environment: 'happy-dom',
    watch: true,
    watchExclude: ['**/node_modules/**', '**/dist/**'],
  },
});
