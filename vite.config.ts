import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
const path = require("path");
const resolve = (str) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [react(), WindiCSS()],
  resolve: {
    alias: {
      "@": resolve("./src"),
      Components: resolve("./src/components"),
      Pages: resolve("./src/pages"),
      Types: resolve("./src/types"),
      Styles: resolve("./src/styles"),
      Hooks: resolve("./src/hooks"),
      Api: resolve("./src/api"),
      Assets: resolve("./src/assets"),
    },
  },
});
