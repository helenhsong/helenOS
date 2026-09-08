import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { renderReadmeHtml } from "./readme-markdown";

const labelClassName =
  "w-fit cursor-pointer text-sm leading-[150%] font-['iAWriterMonoV-Regular','iA_Writer_Mono_V',system-ui,sans-serif] text-muted-foreground transition-colors hover:text-foreground";

export interface ProjectHeaderProps {
  /** Raw Markdown content of the project's README.md, shown in the README panel. */
  readme?: string;
  /** Href for the "helenhsong.com" home link. */
  homeHref?: string;
  /** Label for the home link. */
  homeLabel?: string;
  /** Label shown when the README panel is closed. */
  openLabel?: string;
  /** Label shown when the README panel is open. */
  closeLabel?: string;
  /** Controlled open state. Omit to let ProjectHeader manage it itself. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the toggle is clicked, controlled or not. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * The header every project page (helenhsong.github.io/<project>) shares: a
 * link back home on the left, and a toggle on the right that swaps the rest
 * of the page for the project's rendered README.md.
 *
 * Renders in normal document flow — stack it above the rest of your page.
 * When the README panel is open, it replaces whatever is below the header;
 * the caller doesn't need to hide its own content separately.
 */
export function ProjectHeader({
  readme = "",
  homeHref = "https://helenhsong.github.io/",
  homeLabel = "helenhsong.com",
  openLabel = "README",
  closeLabel = "[close]",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: ProjectHeaderProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const hasReadme = readme.trim().length > 0;

  function toggle() {
    const next = !open;
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  }

  const readmeHtml = useMemo(
    () => (hasReadme ? renderReadmeHtml(readme) : ""),
    [hasReadme, readme]
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-10 flex items-center justify-between bg-background px-8 py-6",
          className
        )}
      >
        <a href={homeHref} className={labelClassName}>
          {homeLabel}
        </a>
        {hasReadme && (
          <button
            type="button"
            aria-expanded={open}
            onClick={toggle}
            className={labelClassName}
          >
            {open ? closeLabel : openLabel}
          </button>
        )}
      </header>

      {open && hasReadme && (
        <div
          className="ph-readme mx-auto max-w-125 px-7.5 py-18"
          dangerouslySetInnerHTML={{ __html: readmeHtml }}
        />
      )}
    </>
  );
}
