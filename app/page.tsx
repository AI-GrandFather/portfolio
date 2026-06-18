import Image from "next/image";
import { ChatBoard } from "./ui/chat-board";
import { ContactForm } from "./ui/contact-form";
import { DocumentStack } from "./ui/document-stack";
import { PreDeploymentSafety } from "./ui/pre-deployment-safety";
import { ProjectTile } from "./ui/project-tile";
import { SiteNav } from "./ui/site-nav";
import {
  BIO_FACTS,
  CONTACT_COPY,
  DEPLOYMENT_CAPABILITIES,
  HOW_I_BUILD,
  ORIGIN_STORY,
  PROCESS,
  PROJECTS,
  SERVICE_CAPABILITIES,
  STACK_GROUPS,
} from "./lib/content";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main>
      <section className="hero-shell" id="top">
        <SiteNav fullName={BIO_FACTS.fullName} />

        <div className="hero-content-wrap">
          <div className="hero-copy">
            <p className="eyebrow">{BIO_FACTS.tagline}</p>
            <h1>
              {BIO_FACTS.headline.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-text">{BIO_FACTS.subheadline}</p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                See the Work
              </a>
              <a className="button secondary" href="#contact">
                Start a Project
              </a>
            </div>
          </div>

          <div className="hero-portrait">
            <Image
              src={BIO_FACTS.image}
              alt={BIO_FACTS.fullName}
              fill
              priority
              sizes="(max-width: 1024px) min(100vw - 48px, 520px), 38vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="section section-dark section-textured" id="story">
        <div className="section-heading">
          <p className="eyebrow">The Story</p>
          <h2>Engineer. Operator. Builder.</h2>
        </div>
        <div className="origin-grid">
          {ORIGIN_STORY.map((item) => (
            <article className="origin-card" key={item.title}>
              <div className="card-kicker">
                <span>{item.phase}</span>
                <span>{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <a className="button primary" href="#contact">Hire Me for Your Next Build</a>
        </div>
      </section>

      <section className="section section-textured" id="work">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Work</p>
            <h2>Shipped. Built. In Progress.</h2>
          </div>
          <p className="section-copy">
            Accurate project status, concrete build evidence, and no inflated launch claims.
            <br />
            <a className="section-inline-link" href="#contact">
              Have a project? Let&apos;s talk →
            </a>
          </p>
        </div>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <article
              className="project-card"
              data-status={project.statusColor}
              key={project.id}
            >
              <ProjectTile {...project.tile} tags={project.visual} />
              <div className="project-meta-row">
                <span className="status-tag">{project.statusLabel}</span>
                <span className="type-tag">{project.type}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-detail">{project.detail}</p>
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
                    aria-label={`View ${project.name} project`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View project
                  </a>
                ) : (
                  <span className="project-link-muted">Case study available on request</span>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="work-cta">
          <div>
            <p className="eyebrow">Start a Build</p>
            <h3>Have a product idea or app build in mind?</h3>
            <p>
              Let&apos;s turn it into a shipped, production-ready experience.
            </p>
          </div>
          <a className="button primary" href="#contact">
            Start a Project
          </a>
        </div>
      </section>

      <section className="section services-section section-textured" id="services">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Services</p>
            <h2>Product Systems I Can Add</h2>
          </div>
          <p className="section-copy">
            Available as part of a full product build, or scoped as a standalone integration.
          </p>
        </div>
        <div className="capability-grid">
          {SERVICE_CAPABILITIES.map((capability) => (
            <article className="capability-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <a className="button primary" href="#contact">
            Discuss a System
          </a>
        </div>
      </section>

      <section className="section deployment-section section-textured" id="deployment">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Deployment</p>
            <h2>Deployment & Cloud Support</h2>
          </div>
          <p className="section-copy">
            I can set up, configure, and troubleshoot your production environment.
          </p>
        </div>
        <div className="capability-grid">
          {DEPLOYMENT_CAPABILITIES.map((capability) => (
            <article className="capability-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
        <p className="deployment-note">
          I am currently completing AWS cloud engineering coursework, with hands-on
          familiarity with EC2, S3, RDS, Lambda, cloud billing, and service selection
          for production workloads. No AWS certification is claimed.
        </p>
        <div className="section-cta">
          <a className="button primary" href="#contact">
            Plan a Deployment
          </a>
        </div>
      </section>

      <section className="section build-section section-textured" id="how-i-build">
        <div className="build-copy">
          <p className="eyebrow">{HOW_I_BUILD.eyebrow}</p>
          <h2>{HOW_I_BUILD.title}</h2>
          {HOW_I_BUILD.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div style={{ marginTop: '32px' }}>
            <a className="button primary" href="#contact">Start a Project</a>
          </div>
        </div>
        <div className="workflow-rail">
          {HOW_I_BUILD.steps.map((step, index) => (
            <article className="workflow-step" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {"detail" in step ? <p>{step.detail}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <DocumentStack />

      <PreDeploymentSafety />

      <section className="section stack-section section-textured" id="stack">
        <div className="section-heading">
          <p className="eyebrow">Stack</p>
          <h2>Tools, not trends.</h2>
        </div>
        <div className="stack-grid">
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

      <section className="section process-section" id="process">
        <div className="section-heading">
          <p className="eyebrow">Delivery Lifecycle</p>
          <h2>The 0 to 1 Path.</h2>
        </div>
        <div className="process-grid">
          {PROCESS.map((item) => (
            <article className="process-item" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.deliverable ? <em>{item.deliverable}</em> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
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
            <p>
              {BIO_FACTS.title}
            </p>
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
              <a href="#services">Services</a>
              <a href="#how-i-build">How I Build</a>
              <a href="#document-stack">Document Stack</a>
              <a href="#safety">Safety</a>
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
