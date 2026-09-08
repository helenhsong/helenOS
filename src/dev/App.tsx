import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ProjectHeader } from "../components/ProjectHeader";
import helenosUiSkill from "../../skills/helenos-ui/SKILL.md?raw";
import { PlaygroundSection } from "./PlaygroundSection";
import { DocsView } from "./DocsView";
import styles from "./App.module.css";

function ProjectHeaderDemo() {
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  return <ProjectHeader isReadmeOpen={isReadmeOpen} onToggleReadme={() => setIsReadmeOpen((open) => !open)} />;
}

function ButtonDemo() {
  return (
    <div className={styles.buttonRow}>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

// One entry per component. Add a new one here as components are built —
// this list is the component catalog. Docs mode reads from the single
// consolidated skill file instead (skills/helenos-ui/SKILL.md).
const sections: { title: string; demo: ReactNode }[] = [
  { title: "ProjectHeader", demo: <ProjectHeaderDemo /> },
  { title: "Button", demo: <ButtonDemo /> },
];

export function App() {
  const [mode, setMode] = useState<"components" | "docs">("components");

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>@helenhsong/ui</p>
          <h1 className={styles.title}>Component playground</h1>
        </div>

        <div className={styles.modeToggle} role="tablist" aria-label="View">
          {(["components", "docs"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={mode === option}
              className={[styles.modeButton, mode === option && styles.modeButtonActive].filter(Boolean).join(" ")}
              onClick={() => setMode(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.sections}>
        {mode === "components" ? (
          sections.map(({ title, demo }) => (
            <PlaygroundSection key={title} title={title}>
              {demo}
            </PlaygroundSection>
          ))
        ) : (
          <PlaygroundSection title="Skill reference">
            <DocsView markdown={helenosUiSkill} />
          </PlaygroundSection>
        )}
      </main>
    </div>
  );
}
