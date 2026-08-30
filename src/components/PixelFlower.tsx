import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion";

interface PixelFlowerProps {
  variant?: "flower" | "cross" | "sun" | "cookie";
  size?: number;
  style?: CSSProperties;
  petalColor?: string;
  centerColor?: string;
  stemColor?: string;
  cloudColor?: string;
  className?: string;
  sway?: boolean;
  /** fixed timing so paired/symmetric flowers can bounce in sync; random per-instance otherwise */
  bounceDelay?: number;
  bounceDuration?: number;
}

export default function PixelFlower({
  variant = "flower",
  size = 34,
  style,
  petalColor = "var(--decor-b)",
  centerColor = "var(--decor-a)",
  stemColor = "var(--decor-c)",
  cloudColor = "rgba(255, 255, 255, 0.9)",
  className,
  sway = true,
  bounceDelay,
  bounceDuration,
}: PixelFlowerProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const svgClassName = ["pixel-svg", className].filter(Boolean).join(" ");

  useEffect(() => {
    if (!sway || !ref.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -10 },
        {
          y: 10,
          duration: bounceDuration ?? gsap.utils.random(2.6, 3.4),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: bounceDelay ?? gsap.utils.random(0, 1.6),
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [sway, bounceDelay, bounceDuration]);

  if (variant === "cross") {
    return (
      <svg
        ref={ref}
        className={svgClassName}
        width={size}
        height={size}
        viewBox="0 0 9 9"
        shapeRendering="crispEdges"
        style={{ position: "absolute", ...style }}
        aria-hidden="true"
      >
        <rect x={3} y={0} width={3} height={2} fill={petalColor} />
        <rect x={0} y={3} width={9} height={3} fill={centerColor} />
        <rect x={3} y={2} width={3} height={1} fill={centerColor} />
        <rect x={3} y={6} width={3} height={1} fill={stemColor} />
        <rect x={3} y={7} width={3} height={2} fill={stemColor} />
      </svg>
    );
  }

  if (variant === "sun") {
    return (
      <svg
        ref={ref}
        className={svgClassName}
        width={size}
        height={size * 0.6}
        viewBox="0 0 15 9"
        shapeRendering="crispEdges"
        style={{ position: "absolute", ...style }}
        aria-hidden="true"
      >
        {/* half sun: three evenly-fanned rays over a rounded, tapering dome */}
        <rect x={3} y={0} width={1} height={1} fill={petalColor} />
        <rect x={1} y={1} width={1} height={1} fill={petalColor} />
        <rect x={5} y={1} width={1} height={1} fill={petalColor} />
        <rect x={2} y={2} width={3} height={1} fill={petalColor} />
        <rect x={1} y={3} width={5} height={1} fill={petalColor} />
        <rect x={0} y={4} width={7} height={1} fill={petalColor} />
        <rect x={0} y={5} width={7} height={1} fill={petalColor} />
        <rect x={3} y={3} width={1} height={1} fill={centerColor} />

        {/* two small puffy clouds drifting past */}
        <rect x={9} y={2} width={2} height={1} fill={cloudColor} />
        <rect x={8} y={3} width={5} height={1} fill={cloudColor} />
        <rect x={9} y={4} width={4} height={1} fill={cloudColor} />
        <rect x={11} y={6} width={2} height={1} fill={cloudColor} />
        <rect x={10} y={7} width={4} height={1} fill={cloudColor} />
      </svg>
    );
  }

  if (variant === "cookie") {
    return (
      <svg
        ref={ref}
        className={svgClassName}
        width={size}
        height={size * 0.62}
        viewBox="0 0 13 8"
        shapeRendering="crispEdges"
        style={{ position: "absolute", ...style }}
        aria-hidden="true"
      >
        {/* fortune cookie: a folded crescent with a crease down the middle */}
        <rect x={3} y={0} width={7} height={1} fill={petalColor} />
        <rect x={1} y={1} width={11} height={1} fill={petalColor} />
        <rect x={0} y={2} width={13} height={2} fill={petalColor} />
        <rect x={1} y={4} width={11} height={1} fill={petalColor} />
        <rect x={3} y={5} width={7} height={1} fill={petalColor} />
        <rect x={6} y={0} width={1} height={6} fill={centerColor} />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      className={svgClassName}
      width={size}
      height={size * 1.65}
      viewBox="0 0 9 15"
      shapeRendering="crispEdges"
      style={{ position: "absolute", ...style }}
      aria-hidden="true"
    >
      <rect x={3} y={0} width={3} height={2} fill={petalColor} />
      <rect x={1} y={2} width={7} height={3} fill={petalColor} />
      <rect x={3} y={5} width={3} height={1} fill={petalColor} />
      <rect x={3} y={3} width={3} height={2} fill={centerColor} />
      <rect x={4} y={6} width={1} height={7} fill={stemColor} />
      <rect x={2} y={9} width={2} height={1} fill={stemColor} />
      <rect x={5} y={11} width={2} height={1} fill={stemColor} />
    </svg>
  );
}
