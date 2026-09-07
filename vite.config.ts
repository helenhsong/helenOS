import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// Two modes:
//  - `vite` / `vite dev`: runs src/dev as a normal app, for previewing components locally.
//  - `vite build`: builds src/index.ts into a publishable library in dist/.
const isLib = process.env.npm_lifecycle_event === "build";

export default defineConfig({
  plugins: [
    react(),
    isLib &&
      dts({
        include: ["src"],
        exclude: ["src/dev"],
        rollupTypes: true,
      }),
  ],
  build: isLib
    ? {
        lib: {
          entry: new URL("src/index.ts", import.meta.url).pathname,
          formats: ["es"],
          fileName: "index",
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            assetFileNames: "style[extname]",
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
      }
    : undefined,
  root: isLib ? undefined : "src/dev",
});
