import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

// Two modes:
//  - `vite` / `vite dev`: runs src/dev as a normal app, for previewing components locally.
//  - `vite build`: builds src/index.ts into a publishable library in dist/.
const isLib = process.env.npm_lifecycle_event === "build";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    isLib &&
      dts({
        include: ["src"],
        exclude: ["src/dev"],
        rollupTypes: true,
      }),
  ],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
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
            // Name the single compiled stylesheet style.css; leave every other
            // asset (self-hosted font files, etc.) with its default hashed name
            // so they don't collide with each other.
            assetFileNames: (asset) => (asset.names?.[0]?.endsWith(".css") ? "style.css" : "assets/[name]-[hash][extname]"),
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
        // Emit font files as separate assets instead of base64-inlining them
        // into style.css — inlining would defeat the self-hosted fonts'
        // unicode-range subsetting, forcing every consumer to download every
        // language subset instead of just the one their text needs.
        assetsInlineLimit: 0,
      }
    : undefined,
  root: isLib ? undefined : "src/dev",
});
