import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import type { Project } from "../data/projects";
import PixelFlower from "./PixelFlower";
import { prefersReducedMotion } from "../lib/motion";

interface ProjectCardProps {
  project: Project;
  wide?: boolean;
}

export default function ProjectCard({ project, wide }: ProjectCardProps) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const cornerRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(titleRef.current, { y: -4, duration: 0.25, ease: "power2.out" });
    if (wide) gsap.to(cornerRef.current, { opacity: 1, duration: 0.25 });
  };

  const handleLeave = () => {
    if (prefersReducedMotion()) return;
    gsap.to(titleRef.current, { y: 0, duration: 0.25, ease: "power2.out" });
    if (wide) gsap.to(cornerRef.current, { opacity: 0, duration: 0.2 });
  };

  return (
    <Link
      to={`/works/${project.slug}`}
      className={`project-card${wide ? " project-card--wide" : ""}`}
      data-reveal
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img src={project.image} alt={project.title} className="project-card__img" />
      {wide && (
        <span className="project-card__corner" ref={cornerRef}>
          <PixelFlower variant="cross" size={20} sway={false} />
        </span>
      )}
      <span className="project-card__title" ref={titleRef}>
        {project.title}
      </span>
    </Link>
  );
}
