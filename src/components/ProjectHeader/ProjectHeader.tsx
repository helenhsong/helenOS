import { cn } from "@/lib/utils";

export interface ProjectHeaderProps {
  /** Label on the left, e.g. the site domain. */
  siteLabel?: string;
  /** Where the site label links to. Pass `null` to render it as plain text instead of a link. */
  siteHref?: string | null;
  /** Whether the project's README panel is currently open — drives the right-hand label. */
  isReadmeOpen: boolean;
  /** Called when the README toggle is activated. */
  onToggleReadme: () => void;
  /** Right-hand label shown when the README is closed. */
  openLabel?: string;
  /** Right-hand label shown when the README is open. */
  closeLabel?: string;
  className?: string;
}

const itemClassName = cn(
  "rounded-xs font-mono text-[13px] leading-[1.5] text-muted-foreground",
  "transition-colors hover:text-foreground",
  "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
);

/**
 * Top bar for a project page: a site label on the left and a README
 * open/close toggle on the right. One component, two looks — which label
 * the toggle shows follows `isReadmeOpen`, it isn't a separate variant.
 */
export function ProjectHeader({
  siteLabel = "helenhsong.com",
  siteHref = "/",
  isReadmeOpen,
  onToggleReadme,
  openLabel = "README",
  closeLabel = "[close]",
  className,
}: ProjectHeaderProps) {
  return (
    <header className={cn("flex items-center justify-between px-8 py-6", className)} data-slot="project-header">
      {siteHref === null ? (
        <span className={itemClassName}>{siteLabel}</span>
      ) : (
        <a href={siteHref} className={cn(itemClassName, "no-underline")}>
          {siteLabel}
        </a>
      )}
      <button
        type="button"
        onClick={onToggleReadme}
        aria-expanded={isReadmeOpen}
        className={cn(itemClassName, "cursor-pointer border-none bg-transparent p-0")}
      >
        {isReadmeOpen ? closeLabel : openLabel}
      </button>
    </header>
  );
}
