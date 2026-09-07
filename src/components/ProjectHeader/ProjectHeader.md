# ProjectHeader

Top bar for a project page: a site label on the left, a README open/close
toggle on the right. One component, not two variants — which label the
toggle shows follows `isReadmeOpen`, so the caller owns the open/closed
state.

Set in Geist Mono. Load that font in the consuming app (Google Fonts,
`next/font`, etc.) — it falls back to the system monospace stack otherwise.

## Import

```tsx
import { ProjectHeader } from "@helenhsong/ui";
import "@helenhsong/ui/style.css";
```

## Usage

```tsx
const [isReadmeOpen, setIsReadmeOpen] = useState(false);

<ProjectHeader
  isReadmeOpen={isReadmeOpen}
  onToggleReadme={() => setIsReadmeOpen((open) => !open)}
/>;
```

## Props

| Prop             | Type                 | Default            | Description                                                        |
| ---------------- | -------------------- | ------------------ | -------------------------------------------------------------------- |
| `siteLabel`      | `string`             | `"helenhsong.com"` | Left-hand label.                                                     |
| `siteHref`       | `string \| null`     | `"/"`               | Link target for the site label. Pass `null` to render plain text.    |
| `isReadmeOpen`   | `boolean`            | —                   | **Required.** Which toggle label is shown.                          |
| `onToggleReadme` | `() => void`         | —                   | **Required.** Called when the toggle is clicked.                    |
| `openLabel`      | `string`             | `"README"`          | Toggle label shown when the README is closed.                       |
| `closeLabel`     | `string`             | `"[close]"`         | Toggle label shown when the README is open.                         |
| `className`      | `string`             | —                   | Merged with the component's own classes.                             |
