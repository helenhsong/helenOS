import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Renders a project's README.md content to sanitized HTML for display in
 * ProjectHeader's README panel.
 */
export function renderReadmeHtml(markdown: string): string {
  const rawHtml = marked.parse(markdown, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml);
}
