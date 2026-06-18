import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectTile } from "../../ui/project-tile";
import { WORK_PROJECTS } from "../../lib/content";

interface CaseStudyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = WORK_PROJECTS.find((item) => item.id === id);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} Case Study`,
    description: project.oneLiner,
    openGraph: {
      title: `${project.name} Case Study`,
      description: project.oneLiner,
      url: `/work/${project.id}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const project = WORK_PROJECTS.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="case-study-page">
      <Link className="case-back-link" href="/#work">
        Back to work
      </Link>

      <section className="case-hero">
        <div className="case-copy">
          <div className="project-meta-row">
            <span className="status-tag">{project.statusLabel}</span>
            <span className="type-tag">{project.type}</span>
          </div>
          <h1>{project.name}</h1>
          <p>{project.oneLiner}</p>
          <div className="project-actions">
            {project.link ? (
              <a
                className="project-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.linkLabel}
              </a>
            ) : null}
            <Link className="project-link secondary-link" href="/#contact">
              Start a Similar Build
            </Link>
          </div>
        </div>

        <ProjectTile {...project.tile} tags={project.visual} />
      </section>

      <section className="case-section">
        <h2>What this proves</h2>
        <ul className="case-bullets">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      <section className="case-section">
        <h2>Stack</h2>
        <div className="project-stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="case-section case-note">
        <h2>Status boundary</h2>
        <p>
          This page uses verified portfolio facts only. Published and live products are
          labeled as such; built tools and experiments are not described as public launches.
        </p>
      </section>
    </main>
  );
}
