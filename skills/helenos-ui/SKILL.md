---
name: helenos-ui
description: Use when building or editing UI in a React project with (or that could use) @helenhsong/ui, the shared helenOS component library — covers what components exist, their props, and how to install/import them.
---

# @helenhsong/ui

Shared React component library, maintained in
[helenOS](https://github.com/helenhsong/helenOS), built on
[shadcn/ui](https://ui.shadcn.com) (Radix primitives + Tailwind). Tailwind
is a build-time detail of that repo, not something this package requires —
everything compiles down to one plain `style.css`. One skill for the whole
library — as components are added there, a section gets appended below
rather than a new skill being created.

## Install

Not installed in this project yet? Add it as a git dependency — no npm
registry, no publish step:

```bash
npm install github:helenhsong/helenOS
```

Then load the stylesheet once, e.g. in your app's entry point:

```tsx
import "@helenhsong/ui/style.css";
```

## Components

### Button

shadcn/ui's Button, vendored in at `src/components/ui/button.tsx`. All
standard button attributes (`onClick`, `disabled`, `type`, etc.) pass
straight through; pass `asChild` to render your own element (e.g. a
router `<Link>`) with the button's classes instead of a `<button>`.

```tsx
import { Button } from "@helenhsong/ui";

<Button>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button disabled>Saving…</Button>
```

| Prop        | Type                                                                                | Default     | Description                                           |
| ----------- | ------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------ |
| `variant`   | `"default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"`         | `"default"` | Visual style.                                           |
| `size`      | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"`  | `"default"` | Size, including icon-only square variants.              |
| `asChild`   | `boolean`                                                                             | `false`     | Render the passed child element instead of `<button>`.  |
| `className` | `string`                                                                              | —           | Merged with the component's own classes.                |
| ...rest     | `ButtonHTMLAttributes<HTMLButtonElement>`                                            | —           | Passed through to the underlying `<button>` unchanged.  |

### ProjectHeader

Top bar for a project page: a site label on the left, a README open/close
toggle on the right. One component, not two variants — which label the
toggle shows follows `isReadmeOpen`, so the caller owns the open/closed
state. Set in Geist Mono; load that font yourself (Google Fonts,
`next/font`, etc.) or it falls back to the system monospace stack.

```tsx
import { ProjectHeader } from "@helenhsong/ui";

const [isReadmeOpen, setIsReadmeOpen] = useState(false);

<ProjectHeader
  isReadmeOpen={isReadmeOpen}
  onToggleReadme={() => setIsReadmeOpen((open) => !open)}
/>;
```

| Prop             | Type             | Default             | Description                                                       |
| ---------------- | ---------------- | -------------------- | -------------------------------------------------------------------- |
| `siteLabel`      | `string`         | `"helenhsong.com"`   | Left-hand label.                                                     |
| `siteHref`       | `string \| null` | `"/"`                | Link target for the site label. Pass `null` to render plain text.    |
| `isReadmeOpen`   | `boolean`        | —                     | **Required.** Which toggle label is shown.                           |
| `onToggleReadme` | `() => void`     | —                     | **Required.** Called when the toggle is clicked.                     |
| `openLabel`      | `string`         | `"README"`           | Toggle label shown when the README is closed.                        |
| `closeLabel`     | `string`         | `"[close]"`          | Toggle label shown when the README is open.                          |
| `className`      | `string`         | —                     | Merged with the component's own classes.                             |

---

This file is the canonical copy from `skills/helenos-ui/` in the
[helenOS](https://github.com/helenhsong/helenOS) repo. Once installed, it
also lives at `node_modules/@helenhsong/ui/skills/helenos-ui/SKILL.md` —
copy that whole folder into another project's `.claude/skills/` to reuse it
there directly.
