import type { ReactNode } from "react";
import { DocsView } from "./DocsView";
import styles from "./PlaygroundSection.module.css";

export type PlaygroundMode = "components" | "docs";

// Playground-only scaffolding — not exported from the package. Labels one
// component's preview so the catalog in App.tsx reads as a list you can
// keep appending to, one section per component, each with a live demo and
// its own markdown reference doc.
export function PlaygroundSection({
  title,
  mode,
  docs,
  children,
}: {
  title: string;
  mode: PlaygroundMode;
  docs: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.label}>{title}</h2>
      <div className={styles.content}>{mode === "components" ? children : <DocsView markdown={docs} />}</div>
    </section>
  );
}
