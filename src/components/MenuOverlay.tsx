import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { profile } from "../data/profile";
import DecorField, { OVERLAY_SPOTS } from "./DecorField";
import StarField, { OVERLAY_STAR_SPOTS } from "./StarField";
import { prefersReducedMotion } from "../lib/motion";

interface MenuOverlayProps {
  onClose: () => void;
}

const links = [
  { label: "Works", to: "/works" },
  { label: "Experience", to: "/experience" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function MenuOverlay({ onClose }: MenuOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current || !listRef.current) return;
    const items = listRef.current.querySelectorAll("li");
    const tl = gsap.timeline();
    tl.fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    tl.fromTo(
      items,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
      0.05
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true" ref={rootRef}>
      <DecorField variant="cross" spots={OVERLAY_SPOTS} />
      <StarField spots={OVERLAY_STAR_SPOTS} />
      <nav className="nav">
        <span className="nav__brand">Portfolio {profile.year}</span>
        <button className="menu-trigger" style={{ display: "flex" }} onClick={onClose}>
          Close ✕
        </button>
      </nav>

      <ul className="menu-overlay__list" ref={listRef}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} onClick={onClose}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="menu-overlay__foot">
        <div>
          <span>Status: Online</span>
          <span>{profile.location}</span>
        </div>
        <div className="align-end">
          <span>© {profile.year} {profile.name}</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </div>
  );
}
