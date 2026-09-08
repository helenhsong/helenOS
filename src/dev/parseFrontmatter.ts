// Minimal frontmatter parser — enough for the flat `key: value` pairs our
// skill files use. Not a general YAML parser.
export function parseFrontmatter(markdown: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(markdown);
  if (!match) return { frontmatter: {}, body: markdown };

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    frontmatter[key] = value;
  }

  return { frontmatter, body: markdown.slice(match[0].length) };
}
