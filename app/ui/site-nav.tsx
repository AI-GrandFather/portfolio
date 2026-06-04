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
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '8px', display: 'inline-block' }}>
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
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
