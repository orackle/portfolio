import type { Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { useReveal } from "../hooks/useReveal";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const sorted = [...projects].sort((a, b) => b.year.localeCompare(a.year));
  const ref = useReveal<HTMLDivElement>([sorted]);

  if (sorted.length === 0) {
    return (
      <p className="label-mono" style={{ padding: "0 var(--edge-pad) 80px" }}>
        No projects in this category yet.
      </p>
    );
  }

  return (
    <div className="project-grid" ref={ref}>
      {sorted.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
