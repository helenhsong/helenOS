import { useState, type ReactNode } from "react";
import { Button } from "../components/Button";
import { ProjectHeader } from "../components/ProjectHeader";
import buttonDocs from "../components/Button/Button.md?raw";
import projectHeaderDocs from "../components/ProjectHeader/ProjectHeader.md?raw";
import { PlaygroundSection, type PlaygroundMode } from "./PlaygroundSection";
import styles from "./App.module.css";

function ProjectHeaderDemo() {
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  return <ProjectHeader isReadmeOpen={isReadmeOpen} onToggleReadme={() => setIsReadmeOpen((open) => !open)} />;
}

function ButtonDemo() {
  return (
    <div className={styles.buttonRow}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}

// One entry per component. Add a new one here as components are built —
// this list is the whole catalog, in both component and docs mode.
const sections: { title: string; demo: ReactNode; docs: string }[] = [
  { title: "ProjectHeader", demo: <ProjectHeaderDemo />, docs: projectHeaderDocs },
  { title: "Button", demo: <ButtonDemo />, docs: buttonDocs },
];

export function App() {
  const [mode, setMode] = useState<PlaygroundMode>("components");

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
        {sections.map(({ title, demo, docs }) => (
          <PlaygroundSection key={title} title={title} mode={mode} docs={docs}>
            {demo}
          </PlaygroundSection>
        ))}
      </main>
    </div>
  );
}
