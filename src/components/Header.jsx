import { A } from "@solidjs/router";
export default function Header() {
  return <header class="site-header container">
    <A href="/" end class="home-link">ignatij
    </A>
    <nav aria-label="Main navigation">
      <A href="/projects" activeClass="active">Work</A>
      <A href="/blog" activeClass="active">Writing</A>
      <a href="/Ignatij Gichevski CV.pdf" download>CV ↓</a>
    </nav>
  </header>;
}
