import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(), reactRouter(), tsconfigPaths(),
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          return `export default ${JSON.stringify(code)};`;
        }
      }
    }
  ],
  build: {
    manifest: true,
    rollupOptions: {
      external: ['app/data/amarna.md'],
    }
  }
  //coverage: {
  //  exclude: ['**/*.md']
  //}
});
