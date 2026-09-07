import { useState } from "react";
import { Button } from "../components/Button";
import { ProjectHeader } from "../components/ProjectHeader";

// Playground for previewing components during development.
// Not part of the published package — add whatever you're working on here.
export function App() {
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <ProjectHeader isReadmeOpen={isReadmeOpen} onToggleReadme={() => setIsReadmeOpen((open) => !open)} />

      <div style={{ padding: "2rem", display: "flex", gap: "1rem" }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
