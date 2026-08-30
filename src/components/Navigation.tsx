import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";
import MenuOverlay from "./MenuOverlay";
import { profile } from "../data/profile";
import { categories } from "../data/projects";
import { prefersReducedMotion } from "../lib/motion";

function DropdownPanel({ onNavigate }: { onNavigate: () => void }) {
  const panelRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!panelRef.current || prefersReducedMotion()) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <ul className="nav__dropdown-panel" ref={panelRef}>
      <li>
        <NavLink to="/works" onClick={onNavigate}>
          All Projects
        </NavLink>
      </li>
      {categories
        .filter((c) => c.value !== "all")
        .map((cat) => (
          <li key={cat.value}>
            <NavLink to={`/works?cat=${cat.value}`} onClick={onNavigate}>
              {cat.label}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const openWorks = () => {
    clearTimeout(closeTimer.current);
    setWorksOpen(true);
  };
  const scheduleCloseWorks = () => {
    closeTimer.current = setTimeout(() => setWorksOpen(false), 150);
  };

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav__brand">
          Portfolio {profile.year}
        </NavLink>

        <ul className="nav__links nav__links--desktop">
          <li
            className="nav__dropdown"
            onMouseEnter={openWorks}
            onMouseLeave={scheduleCloseWorks}
          >
            <NavLink to="/works" className={({ isActive }) => (isActive ? "is-active" : "")}>
              Works ▾
            </NavLink>
            {worksOpen && <DropdownPanel onNavigate={() => setWorksOpen(false)} />}
          </li>
          <li>
            <NavLink to="/experience" className={({ isActive }) => (isActive ? "is-active" : "")}>
              Experience
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "is-active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "is-active" : "")}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav__right">
          <div className="nav__socials nav__socials--desktop">
            <a href={profile.resumeUrl} download="debangana_ai_engineer.pdf">
              CV
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GH
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LI
            </a>
          </div>
          <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span className="menu-trigger__icon">
              <span />
              <span />
              <span />
            </span>
            Menu
          </button>
        </div>
      </nav>

      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </>
  );
}
