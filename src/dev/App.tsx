import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

// One entry per component. Add a new one here as components are built —
// this list is the whole catalog.
const components: { name: string; demo: ReactNode }[] = [
  {
    name: "Button",
    demo: (
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
        <Button disabled>Disabled</Button>
      </div>
    ),
  },
];

export function App() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 p-8">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">@helenhsong/ui</p>
        <h1 className="text-2xl font-semibold">Components</h1>
      </header>

      <div className="flex flex-col gap-8">
        {components.map(({ name, demo }) => (
          <section key={name} className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">{name}</h2>
            <div className="rounded-lg border p-6">{demo}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
