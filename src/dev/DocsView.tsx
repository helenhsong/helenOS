import { marked } from "marked";
import { parseFrontmatter } from "./parseFrontmatter";
import styles from "./DocsView.module.css";

// Docs are our own markdown files, not user input, so dangerouslySetInnerHTML is fine here.
export function DocsView({ markdown }: { markdown: string }) {
  const { frontmatter, body } = parseFrontmatter(markdown);
  const html = marked.parse(body, { async: false }) as string;

  return (
    <div className={styles.prose}>
      {frontmatter.name && (
        <p className={styles.skillTag}>
          Also a Claude Code skill: <code>{frontmatter.name}</code>
        </p>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
