"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#how-i-build", label: "How I Build" },
  { href: "#document-stack", label: "Document Stack" },
  { href: "#safety", label: "Safety" },
  { href: "#contact", label: "Contact" },
];

interface SiteNavProps {
  fullName: string;
}

export function SiteNav({ fullName }: SiteNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="topbar-container">
      <nav className="topbar" aria-label="Primary navigation" ref={navRef}>
        <a className="wordmark" href="#top" onClick={closeMenu}>
          {fullName}
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <button
          aria-controls="mobile-nav-menu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          ☰
        </button>
        <div
          className="mobile-nav-menu"
          data-open={isMenuOpen}
          id="mobile-nav-menu"
        >
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
