"use client";

import { useState } from "react";
import { PRE_DEPLOYMENT_SAFETY } from "../lib/content";

export function PreDeploymentSafety() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section safety-section section-textured" id="safety">
      <div className="section-heading">
        <p className="eyebrow">{PRE_DEPLOYMENT_SAFETY.eyebrow}</p>
        <h2>{PRE_DEPLOYMENT_SAFETY.title}</h2>
        <p className="safety-subheading">{PRE_DEPLOYMENT_SAFETY.subtitle}</p>
        <p className="section-copy">{PRE_DEPLOYMENT_SAFETY.intro}</p>
      </div>

      <div className="safety-accordion">
        {PRE_DEPLOYMENT_SAFETY.items.map((item, index) => {
          const isOpen = activeIndex === index;
          const panelId = `safety-panel-${item.step}`;

          return (
            <article className="safety-item" key={item.step}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="safety-trigger"
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
                type="button"
              >
                <span>{item.step}</span>
                <strong>{item.title}</strong>
                <i aria-hidden="true" />
              </button>
              <div className="safety-panel" data-open={isOpen} id={panelId}>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>

      <p className="safety-closing">{PRE_DEPLOYMENT_SAFETY.closing}</p>
    </section>
  );
}
