import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import type { Project } from "../data/projects";
import { prefersReducedMotion } from "../lib/motion";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const titleRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(titleRef.current, { y: -4, duration: 0.25, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (prefersReducedMotion()) return;
    gsap.to(titleRef.current, { y: 0, duration: 0.25, ease: "power2.out" });
  };

  return (
    <Link
      to={`/works/${project.slug}`}
      className="project-card"
      data-reveal
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img src={project.image} alt={project.title} className="project-card__img" />
      <span className="project-card__title" ref={titleRef}>
        {project.title}
      </span>
    </Link>
  );
}
