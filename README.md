# @helenhsong/ui

Shared React components, built here and consumed directly by other repos as a git dependency — no npm registry, no publish step.

## Using it in another repo

```bash
npm install github:helenhsong/helenOS
```

That's it — no publish step. `npm install` clones this repo, runs its `prepare` script (which builds `dist/`), and links it in like any other package.

Then:

```tsx
import { Button } from "@helenhsong/ui";
import "@helenhsong/ui/style.css"; // once, e.g. in your app's entry point

<Button>Save</Button>;
```

Built on [shadcn/ui](https://ui.shadcn.com) (Radix primitives + Tailwind),
but Tailwind is a build-time detail of this repo, not something consumers
need — `npm run build` compiles it all down to the one plain `style.css`
above, so nothing here requires the consuming app to have Tailwind
configured.

### Pinning a version

Tracking `main` means every consumer picks up changes on their next `npm install`, which is fine for personal projects but can break things unexpectedly. To pin, tag a release here:

```bash
git tag v0.1.0 && git push --tags
```

and depend on the tag instead of the branch:

```bash
npm install github:helenhsong/helenOS#v0.1.0
```

Bump the tag (and the `version` in `package.json`, by convention) whenever you want consumers to intentionally move forward.

### Updating

```bash
npm update @helenhsong/ui        # if depending on a branch
# or bump the tag in package.json and reinstall, if pinned
```

## Using it as a Claude Code skill

[skills/helenos-ui/SKILL.md](skills/helenos-ui/SKILL.md) documents the whole
library — what components exist, their props, and how to install them —
as a single Claude Code skill. Two ways to use it elsewhere:

- **Reference it in place.** Once installed via `npm install
  github:helenhsong/helenOS`, the file also lives at
  `node_modules/@helenhsong/ui/skills/helenos-ui/SKILL.md`.
- **Drop it into another repo directly**, dependency or not:
  ```bash
  cp -r node_modules/@helenhsong/ui/skills/helenos-ui .claude/skills/
  # or, without installing the package first:
  curl -L https://raw.githubusercontent.com/helenhsong/helenOS/main/skills/helenos-ui/SKILL.md \
    -o .claude/skills/helenos-ui/SKILL.md
  ```

It's one skill for the whole library, not one per component — adding a
component means appending a section to `SKILL.md`, not creating a new skill.

## Developing in this repo

```bash
npm install
npm run dev        # opens src/dev — a playground for previewing components
```

Add new work-in-progress components to `src/dev/App.tsx` to see them rendered live.

### Adding a new component

- **A shadcn primitive** (Card, Dialog, Input, etc.): `npm run ui:add -- <name>`
  vendors it into `src/components/ui/` with the CLI's own Tailwind classes
  and Radix wiring — tweak it there, then re-export it from
  [src/index.ts](src/index.ts).
- **Something custom** (like `ProjectHeader`): create
  `src/components/MyThing/MyThing.tsx`, styled with Tailwind utilities and
  the shared `cn()` helper from `@/lib/utils` (see `ProjectHeader` for the
  pattern), and re-export it from [src/index.ts](src/index.ts).

Either way: anything not exported from `src/index.ts` isn't part of the
public package. Preview it via `src/dev/App.tsx`, then add a section for it
to [skills/helenos-ui/SKILL.md](skills/helenos-ui/SKILL.md).

### Scripts

- `npm run dev` — local playground with hot reload
- `npm run build` — builds the publishable package into `dist/`
- `npm run typecheck` — type-checks `src/` without emitting
- `npm run lint` — runs ESLint
- `npm run ui:add -- <component>` — vendors a shadcn primitive into `src/components/ui/`

## Design decisions

- **Distribution**: plain git dependency (via `prepare`), not npm/GitHub Packages — simplest to keep in sync across personal repos with no auth or publish ceremony.
- **Design system**: [shadcn/ui](https://ui.shadcn.com) — Radix primitives, Tailwind, `cva` variants, `cn()` merging — as the foundation to build and tweak components on top of, rather than hand-rolling each one.
- **Styling distribution**: Tailwind is compiled away at build time into one plain `dist/style.css`, not shipped as source. Consumers get the same zero-Tailwind-required experience as before; only this repo's own build needs it.
- **Layout**: single package at the repo root. If this grows into several independently-versioned packages, revisit as an npm/pnpm workspace monorepo.
