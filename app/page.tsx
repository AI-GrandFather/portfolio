import Image from "next/image";
import { ChatBoard } from "./ui/chat-board";
import { ContactForm } from "./ui/contact-form";
import { ProjectTile } from "./ui/project-tile";
import { SiteNav } from "./ui/site-nav";
import {
  BIO_FACTS,
  CAPABILITIES,
  CONTACT_COPY,
  PROCESS,
  PRODUCTION_SAFETY,
  STACK_GROUPS,
  WORK_PROJECTS,
} from "./lib/content";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const featuredProjects = WORK_PROJECTS.filter((project) => project.featured);
  const secondaryProjects = WORK_PROJECTS.filter((project) => !project.featured);

  return (
    <main className="portfolio-page">
      <section className="portfolio-hero" id="top">
        <SiteNav fullName={BIO_FACTS.fullName} />

        <div className="portfolio-hero-inner">
          <div className="portfolio-hero-copy">
            <p className="eyebrow">{BIO_FACTS.tagline}</p>
            <h1>{BIO_FACTS.headline}</h1>
            <p className="hero-text">{BIO_FACTS.subheadline}</p>
            <p className="proof-bar">{BIO_FACTS.proof}</p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                View Work
              </a>
              <a className="button secondary" href="#contact">
                Start a Build
              </a>
            </div>
          </div>

          <div className="hero-proof-panel" aria-label="Portfolio proof summary">
            <div className="hero-portrait-card">
              <Image
                src={BIO_FACTS.image}
                alt={BIO_FACTS.fullName}
                fill
                priority
                sizes="(max-width: 860px) 82vw, 360px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <dl className="proof-metrics">
              <div>
                <dt>Published</dt>
                <dd>2 iOS apps</dd>
              </div>
              <div>
                <dt>Live</dt>
                <dd>1 SaaS product</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>AI-assisted systems</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="portfolio-section work-section" id="work">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2>Shipped work first. Experiments clearly marked.</h2>
          </div>
          <p className="section-copy">
            The strongest proof is what is live, published, or built with a clear status.
          </p>
        </div>

        <div className="featured-work-grid">
          {featuredProjects.map((project) => (
            <article
              className="work-card featured-work-card"
              data-status={project.statusColor}
              key={project.id}
            >
              <ProjectTile {...project.tile} tags={project.visual} />
              <div className="project-meta-row">
                <span className="status-tag">{project.statusLabel}</span>
                <span className="type-tag">{project.type}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-one-liner">{project.oneLiner}</p>
              <ul className="project-bullets">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-actions">
                {project.link ? (
                  <a
                    className="project-link"
                    href={project.link}
                    aria-label={`${project.linkLabel} for ${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.linkLabel}
                  </a>
                ) : null}
                <a className="project-link secondary-link" href={project.caseStudyHref}>
                  {project.caseStudyLabel}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="secondary-work-grid">
          {secondaryProjects.map((project) => (
            <article
              className="work-card secondary-work-card"
              data-status={project.statusColor}
              key={project.id}
            >
              <ProjectTile {...project.tile} tags={project.visual} />
              <div>
                <div className="project-meta-row">
                  <span className="status-tag">{project.statusLabel}</span>
                  <span className="type-tag">{project.type}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-one-liner">{project.oneLiner}</p>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a className="project-link secondary-link" href={project.caseStudyHref}>
                    {project.caseStudyLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section capabilities-section" id="capabilities">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>What I Build</h2>
          <p className="section-copy">
            Product builds, integrations, and handoff work for founders and operators who need useful software, not a slide deck.
          </p>
        </div>
        <div className="capability-grid">
          {CAPABILITIES.map((capability) => (
            <article className="capability-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <div className="capability-chips">
                {capability.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section process-section" id="process">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Process</p>
            <h2>How I Build</h2>
            <p className="process-subtitle">
              Architect first. Agents second. Quality gate always.
            </p>
          </div>
          <p className="section-copy">
            AI helps with speed. Scope, architecture, review, and release judgment stay human.
          </p>
        </div>

        <div className="process-layout">
          <div className="process-grid">
            {PROCESS.map((item) => (
              <article className="process-item" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <aside className="safety-card">
            <p className="eyebrow">Production Safety</p>
            <h3>Before anything ships</h3>
            <ul>
              {PRODUCTION_SAFETY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>Full checklist shared during project onboarding.</p>
          </aside>
        </div>
      </section>

      <section className="portfolio-section stack-section" id="stack">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Stack</p>
            <h2>Tools, not trends.</h2>
          </div>
          <p className="section-copy">
            Compact by design. The tool only matters when it helps the product ship cleanly.
          </p>
        </div>
        <div className="stack-grid compact-stack-grid">
          {STACK_GROUPS.map((group) => (
            <article className="stack-group" key={group.label}>
              <h3>{group.label}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section contact-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">{CONTACT_COPY.eyebrow}</p>
          <h2>{CONTACT_COPY.title}</h2>
          <p className="section-copy">{CONTACT_COPY.text}</p>
        </div>
        <ContactForm />
      </section>

      <footer className="footer-simple">
        <div className="footer-content">
          <div className="footer-brand">
            <a className="wordmark" href="#top">
              {BIO_FACTS.fullName}
            </a>
            <p>{BIO_FACTS.title}</p>
          </div>
          <div className="footer-links">
            <div className="footer-group">
              <span className="eyebrow">Connect</span>
              <a href={BIO_FACTS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={BIO_FACTS.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
            <div className="footer-group">
              <span className="eyebrow">Navigate</span>
              <a href="#work">Work</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#process">Process</a>
              <a href="#stack">Stack</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} {BIO_FACTS.fullName}</p>
        </div>
      </footer>

      <ChatBoard />
    </main>
  );
}
