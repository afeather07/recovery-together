"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/journey", label: "My Journey" },
  { href: "/resources", label: "Resources" },
  { href: "/safety", label: "Safety" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="site-nav-bar">
        <Link href="/" className="brand" aria-label="Just Another Friend home" onClick={() => setOpen(false)}>
          <span className="brand-mark">JAF</span>
          <span>Just Another Friend</span>
        </Link>

        <nav className="site-nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "nav-link active" : "nav-link"}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? "nav-toggle-bar open-a" : "nav-toggle-bar"} />
          <span className={open ? "nav-toggle-bar open-b" : "nav-toggle-bar"} />
          <span className={open ? "nav-toggle-bar open-c" : "nav-toggle-bar"} />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav-panel" className="nav-mobile-panel" aria-label="Primary mobile">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "nav-mobile-link active" : "nav-mobile-link"}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
