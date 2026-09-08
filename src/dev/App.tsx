import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ProjectHeader } from "../components/ProjectHeader";
import helenosUiSkill from "../../skills/helenos-ui/SKILL.md?raw";
import { Sidebar } from "./Sidebar";
import { PlaygroundSection } from "./PlaygroundSection";
import { DocsView } from "./DocsView";
import { extractMarkdownSection } from "./extractMarkdownSection";
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

// One entry per component. Add a new one here as components are built, and
// a matching `### Name` section to skills/helenos-ui/SKILL.md — that
// section's description, usage snippet, and props table get pulled onto
// this component's page, so there's one place that owns that content.
const components: { slug: string; label: string; heading: string; demo: ReactNode }[] = [
  { slug: "project-header", label: "ProjectHeader", heading: "ProjectHeader", demo: <ProjectHeaderDemo /> },
  { slug: "button", label: "Button", heading: "Button", demo: <ButtonDemo /> },
];

export function App() {
  const [activeSlug, setActiveSlug] = useState(components[0].slug);
  const active = components.find((component) => component.slug === activeSlug);

  return (
    <div className={styles.shell}>
      <Sidebar
        componentItems={components.map(({ slug, label }) => ({ slug, label }))}
        activeSlug={activeSlug}
        onSelect={setActiveSlug}
      />

      <main className={styles.main}>
        {active ? (
          <div className={styles.pageBody}>
            <h1 className={styles.title}>{active.label}</h1>
            <PlaygroundSection title="Preview">{active.demo}</PlaygroundSection>
            <DocsView markdown={extractMarkdownSection(helenosUiSkill, active.heading)} />
          </div>
        ) : (
          <div className={styles.pageBody}>
            <h1 className={styles.title}>Skill reference</h1>
            <DocsView markdown={helenosUiSkill} />
          </div>
        )}
      </main>
    </div>
  );
}
