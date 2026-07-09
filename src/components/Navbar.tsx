"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "#transformation", label: "Transformation" },
  { href: "#framework", label: "Framework" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#outcomes", label: "Outcomes" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <span className={styles.logoBadge}>3-DAY IMmersive</span>
          <span className={styles.logoText}>10X FOUNDER</span>
        </div>
        <nav className={styles.navLinks} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${activeId === link.href ? styles.navLinkActive : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button href="#apply" variant="primary" className={styles.navCta}>
          Apply Now
        </Button>
      </div>
    </header>
  );
}
