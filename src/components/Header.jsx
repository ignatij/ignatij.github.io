import { createSignal, createMemo } from "solid-js";
import { A, useLocation } from "@solidjs/router";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen());

  // Computed values for active states
  const isHomeActive = createMemo(() => {
    const pathname = location.pathname;
    return pathname === "/";
  });

  const isBlogActive = createMemo(() => {
    const pathname = location.pathname;
    return pathname === "/blog" || pathname.startsWith("/blog/");
  });

  const isProjectsActive = createMemo(() => {
    const pathname = location.pathname;
    return pathname === "/projects" || pathname.startsWith("/projects/");
  });

  return (
    <header class="bg-bg-primary border-b border-border sticky top-0 z-50">
      <div class="container">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <A
            href="/"
            class="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/avatar.png"
              alt="ignatij"
              class="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-border"
            />
            <span class="text-lg sm:text-xl font-mono font-bold text-accent">
              ignatij
            </span>
          </A>

          {/* Desktop Navigation */}
          <nav class="hidden md:flex space-x-6 lg:space-x-8">
            <A
              href="/"
              class={`nav-link ${isHomeActive() ? "active" : ""}`}
              style={{ color: isHomeActive() ? "#29ffff" : "#cdd6f4" }}
            >
              home
            </A>
            <A
              href="/blog"
              class={`nav-link ${isBlogActive() ? "active" : ""}`}
              style={{ color: isBlogActive() ? "#29ffff" : "#cdd6f4" }}
            >
              blog
            </A>
            <A
              href="/projects"
              class={`nav-link ${isProjectsActive() ? "active" : ""}`}
              style={{ color: isProjectsActive() ? "#29ffff" : "#cdd6f4" }}
            >
              projects
            </A>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            class="md:hidden text-text-secondary hover:text-accent transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen() ? (
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen() && (
          <nav class="md:hidden py-4 border-t border-border">
            <div class="flex flex-col space-y-4">
              <A
                href="/"
                class={`nav-link ${isHomeActive() ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                home
              </A>
              <A
                href="/blog"
                class={`nav-link ${isBlogActive() ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                blog
              </A>
              <A
                href="/projects"
                class={`nav-link ${isProjectsActive() ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                projects
              </A>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
