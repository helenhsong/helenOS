# Button

A native `<button>` with two visual variants. All standard button attributes
(`onClick`, `disabled`, `type`, etc.) pass straight through.

## Import

```tsx
import { Button } from "@helenhsong/ui";
import "@helenhsong/ui/style.css";
```

## Usage

```tsx
<Button>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button disabled>Saving…</Button>
```

## Props

| Prop        | Type                                       | Default     | Description                                          |
| ----------- | ------------------------------------------ | ----------- | ----------------------------------------------------- |
| `variant`   | `"primary" \| "secondary"`                 | `"primary"` | Visual style.                                          |
| `children`  | `ReactNode`                                | —           | Button label/content.                                  |
| `className` | `string`                                   | —           | Merged with the component's own classes.               |
| ...rest     | `ButtonHTMLAttributes<HTMLButtonElement>`  | —           | Passed through to the underlying `<button>` unchanged. |
