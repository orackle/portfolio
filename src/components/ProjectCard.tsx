import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import type { Project } from "../data/projects";
import { prefersReducedMotion } from "../lib/motion";
import TechIcon from "./TechIcon";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    if (prefersReducedMotion()) return;
    gsap.to(titleRef.current, { y: -4, duration: 0.25, ease: "power2.out" });
  };

  const handleLeave = () => {
    setHovered(false);
    if (prefersReducedMotion()) return;
    gsap.to(titleRef.current, { y: 0, duration: 0.25, ease: "power2.out" });
  };

  const isAnimatedImage = project.image.endsWith(".gif");

  return (
    <Link
      to={`/works/${project.slug}`}
      className="project-card"
      data-reveal
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="project-card__shader" aria-hidden="true">
        <ShaderGradientCanvas
          style={{ width: "100%", height: "100%" }}
          pointerEvents="none"
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            control="props"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={2.4}
            cPolarAngle={95}
            cameraZoom={1}
            color1={project.shaderColors.color1}
            color2={project.shaderColors.color2}
            color3={project.shaderColors.color3}
            envPreset="city"
            grain="off"
            lightType="3d"
            positionX={0}
            positionY={-2.1}
            positionZ={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={225}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.8}
            uFrequency={5.5}
            uSpeed={0.2}
            uStrength={3}
            uTime={0.2}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {isAnimatedImage ? (
        <img
          src={project.image}
          alt={project.title}
          className="project-card__img project-card__img--gif"
          style={hovered ? undefined : { visibility: "hidden" }}
        />
      ) : (
        <img src={project.image} alt={project.title} className="project-card__img" />
      )}

      <div className="project-card__stack" aria-hidden="true">
        {project.stack.slice(0, 5).map((tech) => (
          <span key={tech} className="project-card__stack-item">
            <TechIcon tech={tech} className="project-card__stack-icon" />
            <span className="project-card__stack-label">{tech}</span>
          </span>
        ))}
      </div>

      <span className="project-card__title" ref={titleRef}>
        {project.title}
      </span>
    </Link>
  );
}
