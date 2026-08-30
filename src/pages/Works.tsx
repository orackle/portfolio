import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectGrid from "../components/ProjectGrid";
import Footer from "../components/Footer";
import { categories, projects, type ProjectCategory } from "../data/projects";
import { usePageTransition } from "../hooks/usePageTransition";
import { useScrollChain } from "../hooks/useScrollChain";

function isCategory(value: string | null): value is ProjectCategory {
  return categories.some((c) => c.value === value);
}

export default function Works() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get("cat");
  const [active, setActive] = useState<"all" | ProjectCategory>(
    isCategory(catParam) ? catParam : "all"
  );
  const ref = usePageTransition<HTMLDivElement>();
  useScrollChain(ref, "/experience", "/");

  useEffect(() => {
    setActive(isCategory(catParam) ? catParam : "all");
  }, [catParam]);

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div ref={ref}>
      <header className="page-header">
        <span className="page-header__eyebrow">Selected Works</span>
        <div className="filter-row">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-pill${active === cat.value ? " is-active" : ""}`}
              onClick={() => setActive(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>
      <ProjectGrid projects={filtered} />
      <Footer />
    </div>
  );
}
