import { marked } from "marked";
import styles from "./DocsView.module.css";

// Docs are our own markdown files, not user input, so dangerouslySetInnerHTML is fine here.
export function DocsView({ markdown }: { markdown: string }) {
  const html = marked.parse(markdown, { async: false }) as string;
  return <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />;
}
