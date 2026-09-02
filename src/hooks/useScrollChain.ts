import { useEffect, useRef, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion";

// A trackpad/momentum fling delivers many wheel events in quick succession
// (often <50ms apart) — counting "ticks since the edge" would treat that
// single gesture's tail as a second, deliberate scroll. Requiring a pause
// at the edge before arming is what actually distinguishes "flung past the
// end" from "stopped, then scrolled again".
const REARM_PAUSE_MS = 220;

/**
 * Scrolling past the bottom of the page wipes to `nextPath` instead of
 * doing nothing — the route-boundary "replace" effect: the current page
 * still owns its own URL, but the scroll gesture carries you through.
 *
 * Reaching the edge only arms the transition; it does not fire it. Firing
 * needs a distinct, later wheel event that arrives after the initial
 * scroll's momentum has settled — the user has to hit the edge, stop, then
 * deliberately scroll again.
 */
export function useScrollChain(
  ref: RefObject<HTMLElement | null>,
  nextPath: string | null,
  prevPath?: string | null
) {
  const navigate = useNavigate();
  const chaining = useRef(false);
  const armedBottomAt = useRef<number | null>(null);
  const armedTopAt = useRef<number | null>(null);

  useEffect(() => {
    if (!nextPath && !prevPath) return;

    function fire(path: string, direction: -1 | 1) {
      chaining.current = true;
      if (ref.current && !prefersReducedMotion()) {
        gsap.to(ref.current, {
          opacity: 0,
          y: 40 * direction,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => navigate(path),
        });
      } else {
        navigate(path);
      }
    }

    function onWheel(e: WheelEvent) {
      if (chaining.current) return;

      const now = performance.now();
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const atTop = window.scrollY <= 4;

      // Scroll down -> next view
      if (nextPath && e.deltaY > 12) {
        if (!atBottom) {
          armedBottomAt.current = null;
        } else if (armedBottomAt.current === null) {
          // Reached the edge — arm it, but only a wheel event that arrives
          // well after this one counts as the deliberate follow-up scroll.
          armedBottomAt.current = now;
        } else if (now - armedBottomAt.current > REARM_PAUSE_MS) {
          fire(nextPath, -1);
        }
        // else: still inside the same momentum burst — ignore.
      }

      // Scroll up -> previous view
      if (prevPath && e.deltaY < -12) {
        if (!atTop) {
          armedTopAt.current = null;
        } else if (armedTopAt.current === null) {
          armedTopAt.current = now;
        } else if (now - armedTopAt.current > REARM_PAUSE_MS) {
          fire(prevPath, 1);
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [nextPath, prevPath, navigate, ref]);
}
