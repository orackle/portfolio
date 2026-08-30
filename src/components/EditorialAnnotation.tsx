import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { buildHandDrawnOvalPath, buildStarPath, buildConnectorPath } from "../lib/roughEllipse";
import { prefersReducedMotion } from "../lib/motion";

interface EditorialAnnotationProps {
  targets: RefObject<HTMLElement | null>[];
  onDone?: () => void;
}

const ROTATIONS = [-6, 5, -4];
// where along the oval's own stroke the star sits, as a fraction of its length
const STAR_FRACTIONS = [0.78, 0.7, 0.82];

function centerOf(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

/**
 * A one-shot editorial annotation mark — an irregular, hand-drawn oval
 * (never a perfect ellipse, never quite closing where it started) that
 * circles each target in turn. A crisp 4-point star sits directly in the
 * oval's own path, with a small gap cut in the stroke around it so the
 * star reads as embedded in the line rather than pointed at from outside.
 * Once an oval fades, a tiny curved line traces toward the next target,
 * then fades itself before the next oval draws. Plays once, then gone.
 */
export default function EditorialAnnotation({ targets, onDone }: EditorialAnnotationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const ovalRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGPathElement>(null);
  const connectorRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const svg = svgRef.current;
    const group = groupRef.current;
    const oval = ovalRef.current;
    const star = starRef.current;
    const connector = connectorRef.current;
    if (!svg || !group || !oval || !star || !connector) return;

    let cancelled = false;

    function sizeViewport() {
      if (!svg) return;
      svg.setAttribute("width", String(window.innerWidth));
      svg.setAttribute("height", String(window.innerHeight));
      svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    }

    function playOnce(index: number) {
      const el = targets[index].current;
      if (!el || !oval || !star || !group) return null;

      sizeViewport();
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = rect.width / 2 + 22;
      const ry = rect.height / 2 + 18;

      oval.setAttribute("d", buildHandDrawnOvalPath(cx, cy, rx, ry, index));
      group.setAttribute("transform", `rotate(${ROTATIONS[index % ROTATIONS.length]} ${cx} ${cy})`);

      const ovalLen = oval.getTotalLength();
      const starLen = ovalLen * STAR_FRACTIONS[index % STAR_FRACTIONS.length];
      const starPoint = oval.getPointAtLength(starLen);
      star.setAttribute("d", buildStarPath(starPoint.x, starPoint.y, 5));

      const gapHalf = 9;
      const gapStart = Math.max(0, starLen - gapHalf);
      const gapWidth = gapHalf * 2;
      const remaining = Math.max(0, ovalLen - gapStart - gapWidth);
      const gapDasharray = `${gapStart} ${gapWidth} ${remaining}`;

      gsap.set(group, { opacity: 1 });
      gsap.set(oval, { strokeDasharray: ovalLen, strokeDashoffset: ovalLen });
      gsap.set(star, { scale: 0, opacity: 0, transformOrigin: `${starPoint.x}px ${starPoint.y}px` });

      const tl = gsap.timeline();
      tl.to(oval, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" })
        .to(star, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.2)" }, "-=0.2")
        .set(oval, { strokeDasharray: gapDasharray }, "<")
        .to({}, { duration: 1.3 })
        .to(group, { opacity: 0, duration: 0.6, ease: "power1.in" });

      return tl;
    }

    function traceConnector(index: number) {
      const curEl = targets[index].current;
      const nextEl = targets[index + 1]?.current;
      if (!curEl || !nextEl || !connector) return null;

      const from = centerOf(curEl);
      const to = centerOf(nextEl);
      connector.setAttribute("d", buildConnectorPath(from, to, index));
      const len = connector.getTotalLength();

      gsap.set(connector, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });

      const tl = gsap.timeline();
      tl.to(connector, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" })
        .to({}, { duration: 0.3 })
        .to(connector, { opacity: 0, duration: 0.35 });

      return tl;
    }

    async function run() {
      await new Promise((r) => setTimeout(r, 1800));
      for (let i = 0; i < targets.length; i++) {
        if (cancelled) return;
        const tl = playOnce(i);
        if (!tl) continue;
        await tl;
        if (cancelled) return;

        const ctl = traceConnector(i);
        if (ctl) {
          await ctl;
        } else {
          await new Promise((r) => setTimeout(r, 300));
        }
      }
      if (!cancelled) onDone?.();
    }

    run();

    return () => {
      cancelled = true;
      gsap.killTweensOf([oval, star, connector, group]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg ref={svgRef} className="editorial-annotation" aria-hidden="true">
      <g ref={groupRef} opacity={0}>
        <path ref={ovalRef} className="annotation-oval" />
        <path ref={starRef} className="annotation-star" />
      </g>
      <path ref={connectorRef} className="annotation-connector" opacity={0} />
    </svg>
  );
}
