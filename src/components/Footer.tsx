import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </footer>
  );
}
