import Image from "next/image";
import { ChatBoard } from "./ui/chat-board";
import { ContactForm } from "./ui/contact-form";
import { PROJECTS, CAPABILITIES, PROCESS, BIO_FACTS } from "./lib/content";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main>
      <section className="hero-shell" id="top">
        <div className="hero-background">
          <div className="hero-image-overlay">
            <Image 
              src={BIO_FACTS.image} 
              alt={BIO_FACTS.fullName}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="hero-vignette"></div>
        </div>

        <div className="topbar-container">
          <nav className="topbar" aria-label="Primary navigation">
            <a className="wordmark" href="#top">
              {BIO_FACTS.fullName}
            </a>
            <div className="nav-links">
              <a href="#work">Projects</a>
              <a href="#capabilities">Expertise</a>
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
                Start a project
              </a>
              <a className="button secondary" href="#work">
                View Proof
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Manifesto - Restructured Intro */}
      <section className="section intro-band">
        <div className="section-heading">
          <p className="eyebrow">Technical Manifesto</p>
          <h2 dangerouslySetInnerHTML={{ __html: BIO_FACTS.background.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </div>
        
        <div className="manifesto-grid">
          <div className="manifesto-item">
            <h3>AI Agency</h3>
            <p>Architecting autonomous systems with custom agents and MCP servers to solve complex operational bottlenecks.</p>
          </div>
          <div className="manifesto-item">
            <h3>Architecture</h3>
            <p>Engineering robust, offline-first hybrid commerce engines and 120Hz performance-tuned mobile platforms.</p>
          </div>
          <div className="manifesto-item">
            <h3>Velocity</h3>
            <p>Leveraging elite AI-assisted delivery workflows to ship verified, high-performance software at 10x traditional speed.</p>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Proven Results</p>
          <h2>Selected Work.</h2>
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
              <div className="status-tag">{project.status} • {project.type}</div>
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
          <h2>Technical Strengths.</h2>
        </div>
        <div className="capability-list">
          {CAPABILITIES.map((capability) => (
            <div key={capability} className="capability-item">
              <span>{capability}</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-heading">
          <p className="eyebrow">Delivery Process</p>
          <h2>0 to 1 Workflow.</h2>
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

      <section className="section" id="standards">
        <div className="section-heading">
          <p className="eyebrow">Engineering Standard</p>
          <h2>Architected for Reliability.</h2>
          <p className="section-copy">
            Shipping to production is the moment a small oversight becomes a public incident. I verify every build against a rigorous pre-deployment checklist to ensure your product is secure, scalable, and resilient.
          </p>
        </div>
        
        <div className="manifesto-grid">
          <div className="manifesto-item">
            <h3>Hardened Security</h3>
            <p>Rigorous authorization (IDOR prevention), sanitized inputs (SQLi/XSS protection), and strict CORS policies to lock your data to your domain.</p>
          </div>
          <div className="manifesto-item">
            <h3>Scale & Speed</h3>
            <p>Targeted database indexing for hot queries, intelligent rate limiting to prevent abuse, and sub-100ms response targets for elite performance.</p>
          </div>
          <div className="manifesto-item">
            <h3>Zero-Downtime Ops</h3>
            <p>Structured JSON logging, automated monitoring/alerts, and robust error handling to ensure 99.9% uptime and instant recovery paths.</p>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Next Step</p>
          <h2>Collaborate.</h2>
          <p className="section-copy">
            Brief me on your vision. I use an elite AI-assisted workflow to deliver results faster than traditional models.
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
              <a href="#capabilities">Expertise</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} {BIO_FACTS.fullName}. All rights reserved.</p>
          <div className="stack-info">Architected with AI</div>
        </div>
      </footer>

      <ChatBoard />
    </main>
  );
}
