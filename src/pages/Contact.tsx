import { profile } from "../data/profile";
import Footer from "../components/Footer";
import { usePageTransition } from "../hooks/usePageTransition";
import { useScrollChain } from "../hooks/useScrollChain";

export default function Contact() {
  const ref = usePageTransition<HTMLDivElement>();
  useScrollChain(ref, null, "/about");

  return (
    <div ref={ref}>
    <div className="contact-layout">
      <div>
        <h1 className="contact-title">Say Hello</h1>
        <p className="contact-copy">
          Open for new opportunities and collaborations. Based in {profile.location}, working
          remotely or on-site.
        </p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.resumeUrl} download="debangana_ai_engineer.pdf">
            Download CV
          </a>
        </div>
      </div>

      <form action="https://formspree.io/f/xvgkqpod" method="POST">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Who are you?" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Where can I reach you?" required />
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={6} placeholder="What's on your mind?" required />
        </div>
        <button type="submit" className="form-submit">
          Send Message
        </button>
      </form>
    </div>
    <Footer />
    </div>
  );
}
