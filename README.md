# @helenhsong/ui

Shared React component library, built here and consumed directly by other
repos as a git dependency — no npm registry, no publish step.

Built on [shadcn/ui](https://ui.shadcn.com): components get vendored in via
the shadcn CLI, then tweaked and built on top of directly in this repo.

## Using it in another repo

```bash
npm install github:helenhsong/ui
```

`npm install` clones this repo, runs its `prepare` script (which builds
`dist/`), and links it in like any other package.

```tsx
import { SomeComponent } from "@helenhsong/ui";
import "@helenhsong/ui/style.css"; // once, e.g. in your app's entry point
```

Tailwind is a build-time detail of this repo, not something consumers
need — `npm run build` compiles it all down to the one plain `style.css`
above, so nothing here requires the consuming app to have Tailwind
configured.

### Pinning a version

Tracking `main` means every consumer picks up changes on their next
`npm install`. To pin, tag a release here:

```bash
git tag v0.1.0 && git push --tags
```

and depend on the tag instead of the branch:

```bash
npm install github:helenhsong/ui#v0.1.0
```

## Developing in this repo

```bash
npm install
npm run dev        # opens src/dev — a playground for previewing components
```

### Adding a component

```bash
npm run ui:add -- <name>   # e.g. npm run ui:add -- card
```

vendors a shadcn primitive into `src/components/ui/`. Tweak it there, then
re-export it from [src/index.ts](src/index.ts) — anything not exported
there isn't part of the public package. Preview it via `src/dev/App.tsx`.

For something fully custom (not a shadcn primitive), build it under
`src/components/<Name>/`, styled with Tailwind utilities and the shared
`cn()` helper from `@/lib/utils`, and export it the same way.

### Scripts

- `npm run dev` — local playground with hot reload
- `npm run build` — builds the publishable package into `dist/`
- `npm run typecheck` — type-checks `src/` without emitting
- `npm run lint` — runs ESLint
- `npm run ui:add -- <component>` — vendors a shadcn primitive into `src/components/ui/`

## Design decisions

- **Distribution**: plain git dependency (via `prepare`), not npm/GitHub Packages — simplest to keep in sync across personal repos with no auth or publish ceremony.
- **Design system**: [shadcn/ui](https://ui.shadcn.com) — vendored primitives, `cva` variants, `cn()` merging — as the foundation to build and tweak components on top of, rather than hand-rolling each one.
- **Styling distribution**: Tailwind is compiled away at build time into one plain `dist/style.css`, not shipped as source. Consumers get a zero-Tailwind-required experience; only this repo's own build needs it.
- **Fonts**: not self-hosted. Bundling `@fontsource` packages inlined every font file as base64 into the stylesheet (Tailwind's CSS bundler inlines `@font-face` `url()`s regardless of Vite's asset settings), bloating it from ~4KB to ~150KB gzip. Consumers load fonts themselves.
- **Layout**: single package at the repo root. If this grows into several independently-versioned packages, revisit as an npm/pnpm workspace monorepo.
