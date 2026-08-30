import { experience } from "../data/experience";
import { education } from "../data/education";
import { certifications } from "../data/certifications";
import Footer from "../components/Footer";
import { usePageTransition } from "../hooks/usePageTransition";

function getCompanyBadge(issuer: string) {
  const norm = issuer.toLowerCase();
  if (norm.includes("google")) {
    return (
      <svg viewBox="0 0 16 16" width="20" height="20" className="cert-card__badge" aria-hidden="true">
        <rect x="4" y="2" width="8" height="2" fill="#ea4335" />
        <rect x="2" y="4" width="2" height="8" fill="#fbbc05" />
        <rect x="4" y="12" width="8" height="2" fill="#34a853" />
        <rect x="12" y="4" width="2" height="5" fill="#4285f4" />
        <rect x="8" y="7" width="5" height="2" fill="#4285f4" />
      </svg>
    );
  }
  if (norm.includes("ibm")) {
    return (
      <svg viewBox="0 0 16 16" width="20" height="20" className="cert-card__badge" aria-hidden="true">
        <rect x="2" y="3" width="12" height="1" fill="#0f62fe" />
        <rect x="2" y="5" width="12" height="1" fill="#0f62fe" />
        <rect x="2" y="7" width="12" height="1" fill="#0f62fe" />
        <rect x="2" y="9" width="12" height="1" fill="#0f62fe" />
        <rect x="2" y="11" width="12" height="1" fill="#0f62fe" />
        <rect x="2" y="13" width="12" height="1" fill="#0f62fe" />
      </svg>
    );
  }
  if (norm.includes("microsoft")) {
    return (
      <svg viewBox="0 0 16 16" width="20" height="20" className="cert-card__badge" aria-hidden="true">
        <rect x="2" y="2" width="5" height="5" fill="#f25022" />
        <rect x="9" y="2" width="5" height="5" fill="#7fba00" />
        <rect x="2" y="9" width="5" height="5" fill="#00a1f1" />
        <rect x="9" y="9" width="5" height="5" fill="#ffb900" />
      </svg>
    );
  }
  if (norm.includes("langchain")) {
    return (
      <svg viewBox="0 0 16 16" width="20" height="20" className="cert-card__badge" aria-hidden="true">
        <rect x="6" y="2" width="4" height="3" fill="#3cd070" />
        <rect x="10" y="3" width="2" height="2" fill="#ffd400" />
        <rect x="7" y="3" width="1" height="1" fill="#000000" />
        <rect x="5" y="5" width="5" height="6" fill="#3cd070" />
        <rect x="4" y="6" width="2" height="4" fill="#2f9e44" />
        <rect x="3" y="9" width="2" height="3" fill="#2f9e44" />
        <rect x="6" y="11" width="1" height="2" fill="#ffd400" />
        <rect x="8" y="11" width="1" height="2" fill="#ffd400" />
      </svg>
    );
  }
  return null;
}

export default function Experience() {
  const ref = usePageTransition<HTMLDivElement>();

  return (
    <div ref={ref}>
      <header className="page-header">
        <span className="page-header__eyebrow">Experience &amp; Education</span>
      </header>

      <section className="experience-section" id="work-experience">
        <span className="page-header__eyebrow">Work Experience</span>
        <div className="experience-list">
          {experience.map((exp) => (
            <div className="experience-card" key={exp.company}>
              <div className="experience-card__header">
                <span className="experience-card__role">{exp.role}</span>
                <span className="experience-card__company">{exp.company}</span>
                <span className="experience-card__period">{exp.period}</span>
              </div>
              <ul className="experience-card__desc">
                {exp.description.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div className="experience-card__skills">
                {exp.skills.map((skill) => (
                  <span className="experience-card__skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="education-section" id="education">
        <span className="page-header__eyebrow">Education</span>
        <div className="education-list">
          {education.map((edu) => (
            <div className="education-card" key={edu.school}>
              <span className="education-card__degree">{edu.degree}</span>
              <span className="education-card__school">{edu.school}</span>
              <span className="education-card__period">{edu.period}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cert-section" id="certifications">
        <span className="page-header__eyebrow">Certifications</span>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <div className="cert-card" key={cert.title}>
              <div className="cert-card__header">
                {getCompanyBadge(cert.issuer)}
                <span className="cert-card__issuer">{cert.issuer}</span>
              </div>
              <span className="cert-card__title">{cert.title}</span>
              {cert.date && <span className="cert-card__date">Issued {cert.date}</span>}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
