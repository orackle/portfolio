import { useEffect, useRef, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Scrolling past the bottom of the page wipes to `nextPath` instead of
 * doing nothing — the route-boundary "replace" effect: the current page
 * still owns its own URL, but the scroll gesture carries you through.
 */
export function useScrollChain(
  ref: RefObject<HTMLElement | null>,
  nextPath: string | null,
  prevPath?: string | null
) {
  const navigate = useNavigate();
  const chaining = useRef(false);

  useEffect(() => {
    if (!nextPath && !prevPath) return;

    function onWheel(e: WheelEvent) {
      if (chaining.current) return;

      // Scroll down -> next view
      if (nextPath && e.deltaY > 12) {
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) {
          chaining.current = true;
          if (ref.current && !prefersReducedMotion()) {
            gsap.to(ref.current, {
              opacity: 0,
              y: -40,
              duration: 0.35,
              ease: "power2.in",
              onComplete: () => navigate(nextPath),
            });
          } else {
            navigate(nextPath);
          }
        }
      }

      // Scroll up -> previous view
      if (prevPath && e.deltaY < -12) {
        const atTop = window.scrollY <= 4;
        if (atTop) {
          chaining.current = true;
          if (ref.current && !prefersReducedMotion()) {
            gsap.to(ref.current, {
              opacity: 0,
              y: 40,
              duration: 0.35,
              ease: "power2.in",
              onComplete: () => navigate(prevPath),
            });
          } else {
            navigate(prevPath);
          }
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [nextPath, prevPath, navigate, ref]);
}
