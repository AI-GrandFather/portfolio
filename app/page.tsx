import Image from "next/image";
import { ChatBoard } from "./ui/chat-board";
import { ContactForm } from "./ui/contact-form";
import { PROJECTS, CAPABILITIES, PROCESS, BIO_FACTS } from "./lib/content";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main>
      <section className="hero-shell" id="top">
        <div className="topbar-container">
          <nav className="topbar" aria-label="Primary navigation">
            <a className="wordmark" href="#top">
              {BIO_FACTS.fullName}
            </a>
            <div className="nav-links">
              <a href="#work">Case Studies</a>
              <a href="#manifesto">Approach</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>
        </div>

        <div className="hero-content-wrap">
          <div className="hero-copy">
            <p className="eyebrow">{BIO_FACTS.tagline}</p>
            <h1>{BIO_FACTS.headline}</h1>
            <p className="hero-text">{BIO_FACTS.subheadline}</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Get a Consultation
              </a>
              <a className="button secondary" href="#work">
                Explore Work
              </a>
            </div>
          </div>

          <div className="hero-image-overlay">
            <Image
              src={BIO_FACTS.image}
              alt={BIO_FACTS.fullName}
              fill
              priority
              sizes="(max-width: 1024px) min(100vw - 48px, 500px), 40vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ROI Intro Section */}
      <section className="section intro-band">
        <h2 dangerouslySetInnerHTML={{ __html: BIO_FACTS.background.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      </section>

      {/* Technical Manifesto */}
      <section className="section" id="manifesto">
        <div className="section-heading">
          <p className="eyebrow">Our Philosophy</p>
          <h2>Technical Excellence. Business Results.</h2>
        </div>

        <div className="manifesto-grid">
          <div className="manifesto-item">
            <h3>AI Strategy</h3>
            <p>We don&apos;t just add AI; we architect autonomous systems that solve complex operational bottlenecks and unlock new revenue streams.</p>
          </div>
          <div className="manifesto-item">
            <h3>Scale First</h3>
            <p>Engineering robust, offline-first architectures and high-performance mobile platforms built to handle real-world production stress.</p>
          </div>
          <div className="manifesto-item">
            <h3>Elite Velocity</h3>
            <p>Leveraging advanced agentic workflows to deliver verified, high-performance software at 10x traditional development speed.</p>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Success Stories</p>
          <h2>Client-ready product systems.</h2>
        </div>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <a
              className="project-card"
              key={project.name}
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
            >
              <div className="status-tag">{project.status} &bull; {project.type}</div>
              <h3>{project.name}</h3>
              <p>{project.detail}</p>
              {project.stack && (
                <div className="project-stack">
                  {project.stack.map(s => <span key={s}>{s}</span>)}
                </div>
              )}
            </a>
          ))}
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="section-heading">
          <p className="eyebrow">Expertise</p>
          <h2>Core Proficiencies.</h2>
        </div>
        <div className="capability-list">
          {CAPABILITIES.map((capability) => (
            <div key={capability} className="capability-item">
              <span>{capability}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="process">
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
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Build the next product.</h2>
          <p className="section-copy">
            Brief me on your vision. I use elite AI-assisted workflows to deliver results faster and more accurately than traditional models.
          </p>
        </div>
        <ContactForm />
      </section>

      <footer className="footer-simple">
        <div className="footer-content">
          <div className="footer-brand">
            <a className="wordmark" href="#top">{BIO_FACTS.fullName}</a>
            <p>{BIO_FACTS.title}</p>
          </div>
          <div className="footer-links">
            <div className="footer-group">
              <span className="eyebrow">Connect</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <div className="footer-group">
              <span className="eyebrow">Navigation</span>
              <a href="#work">Work</a>
              <a href="#manifesto">Approach</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} {BIO_FACTS.fullName}. All rights reserved.</p>
          <div className="stack-info">Strategic Engineering</div>
        </div>
      </footer>

      <ChatBoard />
    </main>
  );
}
