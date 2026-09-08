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

<Button variant="primary">Save</Button>;
```

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

1. Create `src/components/MyThing/MyThing.tsx`, `MyThing.module.css`, and `index.ts` (see `src/components/Button` for the pattern).
2. Re-export it from [src/index.ts](src/index.ts) — anything not exported there isn't part of the public package.
3. Preview it via `src/dev/App.tsx`.
4. Add a section for it to [skills/helenos-ui/SKILL.md](skills/helenos-ui/SKILL.md).

### Scripts

- `npm run dev` — local playground with hot reload
- `npm run build` — builds the publishable package into `dist/`
- `npm run typecheck` — type-checks `src/` without emitting
- `npm run lint` — runs ESLint

## Design decisions

- **Distribution**: plain git dependency (via `prepare`), not npm/GitHub Packages — simplest to keep in sync across personal repos with no auth or publish ceremony.
- **Styling**: CSS Modules, shipped as a single `dist/style.css` — works in any consumer without requiring Tailwind or another styling system to be configured there.
- **Layout**: single package at the repo root. If this grows into several independently-versioned packages, revisit as an npm/pnpm workspace monorepo.
