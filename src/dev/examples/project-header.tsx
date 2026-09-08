import { ProjectHeader } from "@/components/ProjectHeader/ProjectHeader";

const sampleReadme = `# cyworld

A small React app, revived from the dead.

## Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

Deployed at [helenhsong.github.io/cyworld](https://helenhsong.github.io/cyworld).
`;

export function ProjectHeaderExample() {
  return <ProjectHeader readme={sampleReadme} defaultOpen />;
}
