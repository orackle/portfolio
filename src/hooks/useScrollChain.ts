import { useEffect, useRef, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Scrolling past the bottom of the page wipes to `nextPath` instead of
 * doing nothing — the route-boundary "replace" effect: the current page
 * still owns its own URL, but the scroll gesture carries you through.
 *
 * Reaching the edge only arms the transition; it does not fire it. A
 * momentum-scroll that overshoots into the edge would otherwise chain
 * straight through to the next page as an unintended side effect of the
 * same gesture. Firing requires a distinct, later wheel event — the user
 * has to hit the edge, then deliberately scroll again.
 */
export function useScrollChain(
  ref: RefObject<HTMLElement | null>,
  nextPath: string | null,
  prevPath?: string | null
) {
  const navigate = useNavigate();
  const chaining = useRef(false);
  const armedBottom = useRef(false);
  const armedTop = useRef(false);

  useEffect(() => {
    if (!nextPath && !prevPath) return;

    function onWheel(e: WheelEvent) {
      if (chaining.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const atTop = window.scrollY <= 4;

      // Scroll down -> next view
      if (nextPath && e.deltaY > 12) {
        if (!atBottom) {
          armedBottom.current = false;
        } else if (!armedBottom.current) {
          // First wheel tick that reaches the edge just arms it.
          armedBottom.current = true;
        } else {
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
        if (!atTop) {
          armedTop.current = false;
        } else if (!armedTop.current) {
          armedTop.current = true;
        } else {
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
