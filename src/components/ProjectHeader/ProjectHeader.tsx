import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { renderReadmeHtml } from "./readme-markdown";

const labelClassName =
  "ph-label w-fit cursor-pointer text-xs leading-[150%] font-['iAWriterMonoV-Regular','iA_Writer_Mono_V',system-ui,sans-serif] transition-colors hover:text-foreground";

function isReadmePath(pathname: string) {
  return /\/readme\/?$/.test(pathname);
}

function getProjectPaths(pathname: string) {
  const trimmedPath = pathname.replace(/\/+$/, "") || "/";
  const projectPath = isReadmePath(trimmedPath)
    ? trimmedPath.slice(0, -"/readme".length) || "/"
    : trimmedPath;
  const projectHref = projectPath === "/" ? "/" : `${projectPath}/`;
  const readmeHref = `${projectHref}readme/`.replace(/^\/\//, "/");

  return { projectHref, readmeHref };
}

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
 * link back home on the left, and a link on the right to the project's
 * rendered README.md child page.
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
  const [openState, setOpenState] = useState(
    () =>
      defaultOpen ||
      (typeof window !== "undefined" && isReadmePath(window.location.pathname))
  );
  const open = openProp ?? openState;
  const hasReadme = readme.trim().length > 0;

  function setOpen(next: boolean) {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  }

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    next: boolean
  ) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    const { projectHref, readmeHref } = getProjectPaths(
      window.location.pathname
    );
    window.history.pushState(null, "", next ? readmeHref : projectHref);
    setOpen(next);
  }

  const readmeHtml = useMemo(
    () => (hasReadme ? renderReadmeHtml(readme) : ""),
    [hasReadme, readme]
  );

  const readmeOpen = open && hasReadme;

  useEffect(() => {
    const syncFromPath = () => {
      const next = isReadmePath(window.location.pathname);
      if (openProp === undefined) {
        setOpenState(next);
      } else if (next !== openProp) {
        onOpenChange?.(next);
      }
    };

    syncFromPath();
    window.addEventListener("popstate", syncFromPath);
    return () => window.removeEventListener("popstate", syncFromPath);
  }, [onOpenChange, openProp]);

  // Reflected onto <html> (not a state prop) so a project's own
  // background — rendered as a sibling, outside this component's DOM —
  // can react to the README opening without being wired up as a React
  // child: `:root[data-ph-open] .my-backdrop { filter: blur(...) }`.
  // See the "A project with its own background" section of
  // skills/new-project/SKILL.md.
  useEffect(() => {
    document.documentElement.toggleAttribute("data-ph-open", readmeOpen);
    return () => {
      document.documentElement.removeAttribute("data-ph-open");
    };
  }, [readmeOpen]);

  const { projectHref, readmeHref } =
    typeof window === "undefined"
      ? { projectHref: "/", readmeHref: "/readme/" }
      : getProjectPaths(window.location.pathname);

  return (
    <>
      <div className="h-[66px]">
        <header
          className={cn(
            "fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-background px-8 py-6",
            className
          )}
        >
          <a href={homeHref} className={labelClassName}>
            {homeLabel}
          </a>
          {hasReadme && (
            <a
              href={open ? projectHref : readmeHref}
              aria-expanded={open}
              onClick={(event) => handleNavigation(event, !open)}
              className={labelClassName}
            >
              {open ? closeLabel : openLabel}
            </a>
          )}
        </header>
      </div>

      {readmeOpen && (
        <div
          className="ph-readme mx-auto max-w-125 px-7.5 py-18"
          dangerouslySetInnerHTML={{ __html: readmeHtml }}
        />
      )}
    </>
  );
}
