import { profile } from "../data/profile";
import { techStack } from "../data/techStack";
import Footer from "../components/Footer";
import { usePageTransition } from "../hooks/usePageTransition";
import { useScrollChain } from "../hooks/useScrollChain";

export default function About() {
  const ref = usePageTransition<HTMLDivElement>();
  useScrollChain(ref, "/contact", "/experience");

  return (
    <div ref={ref}>
      <div className="about-layout">
        <div className="about-photo-wrapper">
          <img src={profile.photo} alt={profile.name} className="about-photo" />
        </div>

      <div className="about-copy">
        <h2>About Me</h2>
        <p>{profile.about}</p>

        <div className="about-stats">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <span>{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="about-tech-stack">
          {techStack.map((group) => (
            <div className="about-tech-stack__group" key={group.category}>
              <span className="about-tech-stack__label">{group.category}</span>
              <div className="about-tech-stack__tags">
                {group.items.map((item) => (
                  <span className="about-tech-stack__tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <a href={`mailto:${profile.email}`} className="project-link-btn">
          Get in touch →
        </a>
      </div>
    </div>

    <Footer />
    </div>
  );
}
