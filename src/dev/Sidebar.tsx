import styles from "./Sidebar.module.css";

export interface NavItem {
  slug: string;
  label: string;
}

export function Sidebar({
  componentItems,
  activeSlug,
  onSelect,
}: {
  componentItems: NavItem[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <nav className={styles.sidebar} aria-label="Component catalog">
      <p className={styles.brand}>@helenhsong/ui</p>

      <div className={styles.navGroup}>
        <p className={styles.navLabel}>Components</p>
        {componentItems.map(({ slug, label }) => (
          <NavButton key={slug} label={label} isActive={slug === activeSlug} onClick={() => onSelect(slug)} />
        ))}
      </div>

      <div className={styles.navGroup}>
        <p className={styles.navLabel}>Reference</p>
        <NavButton label="Skill" isActive={activeSlug === "skill"} onClick={() => onSelect("skill")} />
      </div>
    </nav>
  );
}

function NavButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={[styles.navItem, isActive && styles.navItemActive].filter(Boolean).join(" ")}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
