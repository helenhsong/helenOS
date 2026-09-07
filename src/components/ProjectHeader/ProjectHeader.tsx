import styles from "./ProjectHeader.module.css";

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

/**
 * Top bar for a project page: a site label on the left and a README
 * open/close toggle on the right. One component, two looks — which label
 * the toggle shows follows `isReadmeOpen`, it isn't a separate variant.
 *
 * Set in Geist Mono; load that font in your app (e.g. via Google Fonts or
 * next/font) or it falls back to the system monospace stack.
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
  const classes = [styles.header, className].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      {siteHref === null ? (
        <span className={styles.label}>{siteLabel}</span>
      ) : (
        <a href={siteHref} className={styles.label}>
          {siteLabel}
        </a>
      )}
      <button type="button" className={styles.toggle} onClick={onToggleReadme} aria-expanded={isReadmeOpen}>
        {isReadmeOpen ? closeLabel : openLabel}
      </button>
    </header>
  );
}
