import type { ReactNode } from "react";
import styles from "./PlaygroundSection.module.css";

// Playground-only scaffolding — not exported from the package. Labels one
// group of content so the catalog in App.tsx reads as a list you can keep
// appending to, one section per component.
export function PlaygroundSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.label}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
