---
name: new-project
description: Create and publish a new helenhsong project-page repository from a project name, using the immutable shared ProjectHeader, a child README route, and the standard GitHub Pages workflow. Use when the user invokes $new-project or asks for a new portfolio project repo using the established template.
---

# New project

Create a complete public project-page repository from one required input: the
project name. If the user supplies a name, proceed without asking for a design
brief; the initial page may be blank beneath the shared header and designed
later.

Invoking this skill with a project name authorizes these scoped side effects:
create the local project directory, create the public GitHub repository, make
the initial commit, push `main`, enable GitHub Pages, and verify deployment. It
does not authorize overwriting an existing directory or repository.

## Invocation and targets

- If no project name was supplied, ask only for the name.
- Format the supplied project name as a proper work title for the README
  heading and browser title (for example, `Cyworld`, not `cyworld`). Use
  conventional title capitalization while preserving an intentional brand
  spelling in the supplied name. Keep that exact browser title on the project
  root and README child page.
- Derive the repository slug by lowercasing the name, replacing spaces with
  hyphens, and removing characters other than letters, digits, and hyphens.
- Create `/Users/helensong/Documents/projects/repositories/<repo-slug>`.
- Create the public GitHub repository `helenhsong/<repo-slug>`.

Before writing anything, confirm that neither target exists. Distinguish an
absent GitHub repository from an authentication or network failure. If either
target exists, stop and report the exact conflict; never overwrite, delete, or
silently choose another name.

Use the supplied name for a minimal `# <Project Name>` README heading and do
not invent project details.

## Project-page template

Every project page is a blank Vite + React application with one shared piece
of chrome: [`ProjectHeader`](../../src/components/ProjectHeader/ProjectHeader.tsx).
It links to `helenhsong.com` and to the rendered project README at the real
child URL `helenhsong.github.io/<repo-slug>/readme/`.

[`cyworld`](https://github.com/helenhsong/cyworld) is the deployment reference.
Copy its `vite.config.js` and `.github/workflows/deploy.yml` when necessary.

### Immutable shared chrome

`ProjectHeader` and the README panel are shared UI owned exclusively by
`@helenhsong/ui`. This is a permanent invariant for every project created with
this skill.

- Import the package stylesheet and render `ProjectHeader` with its default
  presentation.
- Never edit, replace, restyle, theme, animate, or visually wrap the header or
  README panel from a project repository.
- Never target `.ph-*`, the header element, or README descendants from project
  CSS. Do not pass a presentational `className` to `ProjectHeader`.
- Never set `--project-bg`, `--project-fg`, `--project-muted-fg`, or other
  shared-header presentation tokens from a project.
- Do not add global typography, color, reset, box-model, or control selectors
  that cascade into the header or README. The neutral `body { margin: 0; }`
  baseline is allowed.
- Scope project styles beneath one project-owned content root such as
  `.project-page`; scope box sizing as `.project-page, .project-page *` and
  controls as `.project-page button` rather than using global selectors.
- A project may react to `html[data-ph-open]` only to hide or disable its own
  content while the README is open. It must not use that state to modify the
  shared header, README, backdrop, typography, layout, or transition.
- Project backgrounds, fonts, loaders, and motion begin below the header and
  remain inside the project-owned content root. They never paint behind or
  alter the shared chrome.

The package owns the header font and the README typography. A project's design
brief applies only to project-owned content unless the user explicitly asks to
change the shared UI package itself in a separate task.

## 1. Scaffold the app

```bash
npm create vite@latest . -- --template react
```

Use `--template react-ts` only when TypeScript is otherwise useful.

## 2. Install the shared UI package

```bash
npm install github:helenhsong/ui
```

Prefer the newest released tag that exports `ProjectHeader`. If no suitable
release exists, pin the exact verified commit containing the export rather
than tracking a moving branch. See [Pinning a version](../../README.md#pinning-a-version).

## 3. Set the base path

GitHub Pages serves the application at
`helenhsong.github.io/<repo-slug>/`, so set Vite's subpath:

```js
export default defineConfig({
  base: "/<repo-slug>/",
  build: {
    rollupOptions: {
      input: ["index.html", "readme/index.html"],
    },
  },
  plugins: [react()],
});
```

Create `readme/index.html` as a second Vite HTML entry using the same root
element and `/src/main.jsx` script as `index.html`. This makes the README a
real static child page, so direct visits and refreshes work on GitHub Pages.
GitHub Pages canonicalizes the directory URL with a trailing slash. Use the
same `<title><Project Name></title>` as the root page; opening the README must
not append "README" or otherwise change the browser title.

## 4. Render the blank page

Import the committed README as raw text so `ProjectHeader` renders the actual
file without a separate copy. Its default uncontrolled state reads the URL,
uses real links for the root and README child page, and synchronizes browser
back/forward navigation:

```jsx
import { ProjectHeader } from "@helenhsong/ui";
import "@helenhsong/ui/style.css";
import readme from "../README.md?raw";

export default function App() {
  return <ProjectHeader readme={readme} />;
}
```

When project content is added later, render it as a sibling under the header
inside a single project-owned root:

```jsx
<>
  <ProjectHeader readme={readme} />
  <main className="project-page">...</main>
</>
```

Keep the shared component outside `.project-page` so project CSS cannot style
it accidentally.

If a project controls `ProjectHeader` with `open` and `onOpenChange`, initialize
its state from `/\/readme\/?$/` against `window.location.pathname`. The shared
component will call `onOpenChange` for browser back/forward navigation.

### README content

The README file doubles as the README panel's content. Write semantic Markdown
and let the shared renderer control presentation:

- Start with one `# Title` line.
- Write introductions as ordinary paragraphs.
- Put standalone images on their own lines; the shared renderer gives them
  slightly more separation from surrounding text than ordinary paragraphs.
- Use normal headings, lists, code blocks, and links without project-specific
  wrappers or presentation classes.

## 5. Project-owned loading and motion

When project content uses several images, sprites, fonts, or canvas layers,
treat everything visible in the first view as one load unit:

- Reserve final dimensions with explicit sizes or `aspect-ratio`.
- Preload critical images off-DOM and wait for `decode()` when available.
- Wait for project-owned opening-view fonts.
- Include a timeout and allow optional assets to fail without trapping users.
- Use one honest indeterminate loading state; reveal the composed scene as one
  object and honor `prefers-reduced-motion`.
- Warm secondary-view assets during idle time. If selected early, show one
  coordinated loading state rather than staggered boxes.
- Give the project container `aria-busy`, make the loader a status region, and
  keep hidden project content non-interactive.

All loading and motion rules remain inside the project-owned content root.
Use the default, unmodified README open/close behavior from `ProjectHeader`.

## 6. Deploy to GitHub Pages

Add `.github/workflows/deploy.yml`:

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

Install dependencies and run the build plus configured lint or type checks.
Inspect everything to be committed. Confirm `.gitignore` excludes dependencies,
build output, environment files, keys, and credentials.

Initialize Git with `main` and make an `Initial commit`. Create the public
repository without pushing, add `origin`, enable Pages on the project repository,
then push:

```bash
gh repo create helenhsong/<repo-slug> --public --source . --remote origin
gh api repos/helenhsong/<repo-slug>/pages -X POST -f "build_type=workflow"
git push -u origin main
```

Monitor the initial Pages workflow and verify
`https://helenhsong.github.io/<repo-slug>/` and
`https://helenhsong.github.io/<repo-slug>/readme/` both respond successfully.
If GitHub authentication is missing, stop and ask the user to authenticate. On
any create, push, or deployment failure, preserve local work, report which
operations succeeded, and do not retry under a different name.

Finish by reporting the local path, GitHub repository URL, live Pages URL, and
build/deployment status.

## Checklist

- [ ] Neither local nor GitHub target existed before creation.
- [ ] `vite.config.js` has `base: "/<repo-slug>/"` and builds both
      `index.html` and `readme/index.html`.
- [ ] `@helenhsong/ui` is pinned to a release or exact verified commit that
      exports `ProjectHeader`.
- [ ] `App` renders `<ProjectHeader readme={readme} />` using README.md via
      `?raw` and imports `@helenhsong/ui/style.css` once.
- [ ] The README link navigates to `/<repo-slug>/readme/`; direct visits,
      refreshes, and browser back/forward navigation all work.
- [ ] The browser title uses proper title capitalization and stays exactly the
      same on both routes.
- [ ] No project code modifies shared-header or README styling, presentation
      tokens, layout, typography, backdrop, or transitions.
- [ ] Project content and all of its styling live under a sibling project-owned
      root, with no global selectors that cascade into shared chrome.
- [ ] README.md starts with one `# Title` and relies on the shared renderer.
- [ ] Project-owned loading and motion are coordinated, accessible, scoped,
      and reduced-motion safe when present.
- [ ] `.github/workflows/deploy.yml` is present.
- [ ] Pages is enabled with `build_type=workflow`.
