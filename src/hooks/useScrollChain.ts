import { useEffect, useRef, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion";

// A trackpad/momentum fling delivers many wheel events in quick succession
// (often <50ms apart) — counting every tick at the edge would treat one
// fling's tail as several deliberate scrolls. A tick only counts as a new
// "hard scroll" once this much time has passed since the last counted one,
// which is what separates "flung past the end" from "scrolled, paused,
// scrolled again."
const REARM_PAUSE_MS = 220;

// How many distinct hard scrolls at the edge it takes to actually chain to
// the next/previous page. Reaching the edge alone never fires it.
const SCROLLS_TO_CHAIN = 3;

/**
 * Scrolling past the bottom of the page wipes to `nextPath` instead of
 * doing nothing — the route-boundary "replace" effect: the current page
 * still owns its own URL, but the scroll gesture carries you through.
 *
 * Firing takes `SCROLLS_TO_CHAIN` distinct wheel gestures once already at
 * the edge, each separated by a pause — a single scroll (or fling) that
 * merely reaches the edge does nothing.
 */
export function useScrollChain(
  ref: RefObject<HTMLElement | null>,
  nextPath: string | null,
  prevPath?: string | null
) {
  const navigate = useNavigate();
  const chaining = useRef(false);
  const bottomCount = useRef(0);
  const bottomLastAt = useRef<number | null>(null);
  const topCount = useRef(0);
  const topLastAt = useRef<number | null>(null);

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
          bottomCount.current = 0;
          bottomLastAt.current = null;
        } else if (bottomLastAt.current === null || now - bottomLastAt.current > REARM_PAUSE_MS) {
          bottomLastAt.current = now;
          bottomCount.current += 1;
          if (bottomCount.current >= SCROLLS_TO_CHAIN) fire(nextPath, -1);
        }
        // else: still inside the same momentum burst — ignore, don't count it.
      }

      // Scroll up -> previous view
      if (prevPath && e.deltaY < -12) {
        if (!atTop) {
          topCount.current = 0;
          topLastAt.current = null;
        } else if (topLastAt.current === null || now - topLastAt.current > REARM_PAUSE_MS) {
          topLastAt.current = now;
          topCount.current += 1;
          if (topCount.current >= SCROLLS_TO_CHAIN) fire(prevPath, 1);
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [nextPath, prevPath, navigate, ref]);
}
