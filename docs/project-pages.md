# Setting up a project page

Every repo under `helenhsong.github.io/<project>` is a blank Vite + React
app with one shared piece of chrome: [`ProjectHeader`](../src/components/ProjectHeader/ProjectHeader.tsx) —
a link back to `helenhsong.com` on the left, and a `README` toggle on the
right that swaps the page for the project's own README.md, rendered.

[`cyworld`](https://github.com/helenhsong/cyworld) is the reference
implementation — copy its `vite.config.js` and `.github/workflows/deploy.yml`
verbatim if you're not sure what something below should look like.

## 1. Scaffold the app

```bash
npm create vite@latest . -- --template react
```

(`--template react-ts` if you want TypeScript — `ProjectHeader` works with
either.)

## 2. Install the shared UI package

```bash
npm install github:helenhsong/ui
```

Pin a released version instead of tracking `main` with
`npm install github:helenhsong/ui#v0.1.0` (see the [main README](../README.md#pinning-a-version)).

## 3. Set the base path

GitHub Pages serves this repo at `helenhsong.github.io/<repo-name>`, not
the domain root, so Vite needs to know the subpath or built asset URLs
will 404. In `vite.config.js`:

```js
export default defineConfig({
  base: "/<repo-name>/",
  plugins: [react()],
});
```

## 4. Render a blank page with ProjectHeader

`ProjectHeader` takes the project's raw README.md text and renders it
itself when the toggle is opened — import it with Vite's `?raw` suffix so
the page always shows whatever is actually committed to README.md, with
no separate copy to keep in sync. In `src/App.jsx`:

```jsx
import { ProjectHeader } from "@helenhsong/ui";
import "@helenhsong/ui/style.css"; // once, here or in main.jsx
import readme from "../README.md?raw";

export default function App() {
  return <ProjectHeader readme={readme} />;
}
```

That's the whole page. Closed, it's blank below the header; open, it's the
rendered README. Build project content (if/when the project has any) as a
sibling under the header — `ProjectHeader` renders in normal document
flow and doesn't assume it owns the rest of the page.

### Fonts

The header bar (the "helenhsong.com" / "README" / "[close]" labels) uses
`iA Writer Mono` at 12px. Unlike most fonts this package doesn't bundle
(see [main README](../README.md#design-decisions)), this one ships in
`@helenhsong/ui/style.css` already — it's [SIL OFL licensed](https://github.com/iaolo/iA-Fonts)
so redistributing it is fine, and only the one weight actually used is
included. Nothing to do here; if the stylesheet import from step 4 is
in place, the font just works. The README body itself renders in Inter,
matching helenhsong.com's own content column.

### Writing README.md for the README panel

`ProjectHeader` renders whatever's actually in README.md, so the file
doubles as the project page's content — a couple of conventions make it
render well:

- Start with a single `# Title` line — it gets the same foreground/medium
  treatment as the name at the top of helenhsong.com.
- Follow it immediately with a one-line tagline or description paragraph.
  A paragraph directly under the title is styled as a subtitle (muted,
  flush against the title), matching Home's name+role — the body copy
  after it gets a bigger gap to separate the two.
- Everything else (headings, lists, code blocks, links) renders with
  plain, sensible typography — no special formatting needed.

## 5. Deploy to GitHub Pages

Add `.github/workflows/deploy.yml` (copy [cyworld's](https://github.com/helenhsong/cyworld/blob/main/.github/workflows/deploy.yml)):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then enable Pages on the repo itself (not on `helenhsong.github.io` —
each project repo serves its own Pages site at its own subpath):

```bash
gh api repos/helenhsong/<repo-name>/pages -X POST -f "build_type=workflow"
```

Push to `main`. The workflow builds and deploys automatically, and the
page is live at `helenhsong.github.io/<repo-name>`.

## Checklist for a new project page

- [ ] `vite.config.js` has `base: "/<repo-name>/"`
- [ ] `npm install github:helenhsong/ui`
- [ ] `App` renders `<ProjectHeader readme={readme} />` with README.md imported via `?raw`
- [ ] `@helenhsong/ui/style.css` imported once (also loads iA Writer Mono V for the header bar — nothing extra to do)
- [ ] README.md opens with `# Title` + a one-line tagline paragraph, for the subtitle spacing to kick in
- [ ] `.github/workflows/deploy.yml` in place
- [ ] Pages enabled on the repo with `build_type=workflow`
