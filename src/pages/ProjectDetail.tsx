import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { useReveal } from "../hooks/useReveal";
import { usePageTransition } from "../hooks/usePageTransition";
import Footer from "../components/Footer";
import TechIcon from "../components/TechIcon";

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const ref = useReveal<HTMLDivElement>([slug]);
  const pageRef = usePageTransition<HTMLDivElement>();

  if (index === -1) return <Navigate to="/works" replace />;

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div ref={pageRef}>
      <div className="project-hero" ref={ref}>
        <div className="nav" style={{ padding: 0, border: "none", marginBottom: 10 }}>
          <Link to="/works" className="project-hero__back">
            ← Back to index
          </Link>
          <span className="label-mono">{project.year}</span>
        </div>

        <div className="project-hero__grid">
          <h1 className="project-hero__title" data-reveal>{project.title}</h1>
          <div className="project-hero__overview" data-reveal>
            <div className="project-hero__overview-label">Project Overview</div>
            <p>{project.overview}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <img src={project.image} alt={project.title} className="project-cover" />
      </div>

      <div className="project-body">
        <aside className="project-body__side">
          <h4>Stack &amp; Tools</h4>
          <div className="stack-grid">
            {project.stack.map((tech) => (
              <span key={tech} className="stack-pill">
                <TechIcon tech={tech} className="stack-pill__icon" />
                {tech}
              </span>
            ))}
          </div>
          <h4>Roles</h4>
          <p className="project-body__roles">{project.roles}</p>
        </aside>

        <div className="project-body__main">
          <blockquote>{project.quote}</blockquote>
          {project.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="project-link-btn"
          >
            View Repository →
          </a>
        </div>
      </div>

      <nav className="project-nav">
        <div>
          <div className="project-nav__item">Previous Project</div>
          <Link to={`/works/${prev.slug}`}>← {prev.title}</Link>
        </div>
        <div className="align-end">
          <div className="project-nav__item">Next Project</div>
          <Link to={`/works/${next.slug}`}>{next.title} →</Link>
        </div>
      </nav>
      <Footer />
    </div>
  );
}
