import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GridBackground from "./components/GridBackground";
import Navigation from "./components/Navigation";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className={`app-shell${isHome ? " is-home" : ""}`}>
      <GridBackground />
      <div className="page-content">
        <Navigation />
        <Outlet />
      </div>
    </div>
  );
}
