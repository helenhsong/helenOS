import type { CSSProperties } from "react";
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
  return (
    <div className="flex flex-col gap-6">
      <ProjectHeader readme={sampleReadme} defaultOpen />

      {/* A project page that paints something other than the plain
          background behind the header (here, a tinted backdrop standing
          in for cyworld's animated shader) makes the header transparent
          and sets --project-bg to that color — the label AND the
          README panel's own text (below) darken into a matching hue on
          their own, no color choice required. */}
      <div
        className="rounded-lg p-6"
        style={{ background: "#E8E0F2", "--project-bg": "#E8E0F2" } as CSSProperties}
      >
        <ProjectHeader readme={sampleReadme} className="bg-transparent" defaultOpen />
      </div>
    </div>
  );
}
