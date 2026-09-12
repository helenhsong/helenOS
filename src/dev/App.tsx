import type { ComponentType } from "react";
import { ButtonExample } from "./examples/button";
import buttonSource from "./examples/button.tsx?raw";
import { ProjectHeaderExample } from "./examples/project-header";
import projectHeaderSource from "./examples/project-header.tsx?raw";
import { ComponentEntry } from "./ComponentEntry";

// One entry per component. Add a new one here as components are built:
// an examples/<slug>.tsx file that renders it (see examples/button.tsx),
// imported twice — once normally for the live preview, once as ?raw for
// the "View code" toggle.
const components: { slug: string; name: string; description: string; Example: ComponentType; source: string }[] = [
  {
    slug: "button",
    name: "Button",
    description: "Displays a button, or a component that looks like a button.",
    Example: ButtonExample,
    source: buttonSource,
  },
  {
    slug: "project-header",
    name: "ProjectHeader",
    description:
      "The header every project page (helenhsong.github.io/<project>) shares: a link home, and a link to the project's rendered README child page.",
    Example: ProjectHeaderExample,
    source: projectHeaderSource,
  },
];

export function App() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 p-8">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">@helenhsong/ui</p>
        <h1 className="text-2xl font-semibold">Components</h1>
      </header>

      <div className="flex flex-col gap-10">
        {components.map((component) => (
          <ComponentEntry key={component.slug} {...component} />
        ))}
      </div>
    </div>
  );
}
