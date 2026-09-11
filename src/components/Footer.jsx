import { PROFILE } from "../data/profile";
export default function Footer() {
  return <footer class="site-footer container">
    <div class="footer-content">
      <div class="contact-line"><span>Let’s talk.</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
      <p class="metadata">© {new Date().getFullYear()} {PROFILE.name}</p>
    </div>
  </footer>;
}
