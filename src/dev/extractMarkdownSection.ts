// Pulls one `### Heading` section's body out of the skill markdown — the
// per-component page reuses SKILL.md's own prose/usage/props instead of
// keeping a second copy of them.
export function extractMarkdownSection(markdown: string, heading: string): string {
  const lines = markdown.split("\n");
  const startIndex = lines.findIndex((line) => line.trim() === `### ${heading}`);
  if (startIndex === -1) return "";

  const rest = lines.slice(startIndex + 1);
  // Stop at the next heading, or a `---` rule (the footer note below the last section).
  const endOffset = rest.findIndex((line) => /^#{2,3}\s/.test(line) || line.trim() === "---");
  const sectionLines = endOffset === -1 ? rest : rest.slice(0, endOffset);

  return sectionLines.join("\n").trim();
}
