import { Button } from "../components/Button";

// Playground for previewing components during development.
// Not part of the published package — add whatever you're working on here.
export function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", display: "flex", gap: "1rem" }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
