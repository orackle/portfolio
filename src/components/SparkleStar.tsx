import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { buildStarPath } from "../lib/roughEllipse";
import { prefersReducedMotion } from "../lib/motion";

interface SparkleStarProps {
  size?: number;
  color?: string;
  style?: CSSProperties;
  bounceDelay?: number;
  bounceDuration?: number;
}

/** The same crisp 4-point star used in the editorial annotation, scattered as a decoration. */
export default function SparkleStar({
  size = 8,
  color = "var(--decor-a)",
  style,
  bounceDelay,
  bounceDuration,
}: SparkleStarProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -6 },
        {
          y: 6,
          duration: bounceDuration ?? gsap.utils.random(2.4, 3.2),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: bounceDelay ?? gsap.utils.random(0, 1.6),
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [bounceDelay, bounceDuration]);

  const r = size / 2;
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", ...style }}
      aria-hidden="true"
    >
      <path d={buildStarPath(r, r, r)} fill={color} />
    </svg>
  );
}
