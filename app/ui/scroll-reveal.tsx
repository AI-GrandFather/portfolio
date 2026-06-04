"use client";

import { useEffect } from "react";

const revealSelector = [
  ".section",
  ".hero-copy",
  ".hero-portrait",
  ".origin-card",
  ".project-card",
  ".workflow-step",
  ".safety-item",
  ".stack-group",
  ".process-item",
  ".contact-form",
].join(", ");

export function ScrollReveal() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>(revealSelector)
        .forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );

    elements.forEach((element) => element.classList.add("reveal-item"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
