import { useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";

// One catalog entry: a title/description, a live preview, an install
// command, and a "View code" toggle over the example's real source (the
// same file that renders the preview, imported again via ?raw — so the
// code shown is never out of sync with what's actually running).
export function ComponentEntry({
  name,
  slug,
  description,
  Example,
  source,
}: {
  name: string;
  slug: string;
  description: string;
  Example: ComponentType;
  source: string;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="rounded-lg border p-6">
        <Example />
      </div>

      <div className="flex items-center justify-between gap-3">
        <code className="text-xs text-muted-foreground">npm run ui:add -- {slug}</code>
        <Button variant="outline" size="sm" onClick={() => setShowCode((open) => !open)}>
          {showCode ? "Hide code" : "View code"}
        </Button>
      </div>

      {showCode && (
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-xs">
          <code>{source}</code>
        </pre>
      )}
    </section>
  );
}
