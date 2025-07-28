import { createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen());

  return (
    <header class="bg-bg-primary border-b border-border sticky top-0 z-50">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <A href="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <img 
              src="/avatar.png" 
              alt="ignatij" 
              class="w-8 h-8 rounded-full border border-border"
            />
            <span class="text-xl font-mono font-bold text-accent">
              ignatij
            </span>
          </A>

          {/* Desktop Navigation */}
          <nav class="hidden md:flex space-x-8">
            <A 
              href="/" 
              class={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              home
            </A>
            <A 
              href="/blog" 
              class={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
            >
              blog
            </A>
            <A 
              href="/projects" 
              class={`nav-link ${location.pathname.startsWith('/projects') ? 'active' : ''}`}
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
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen() ? (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
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
                class={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                home
              </A>
              <A 
                href="/blog" 
                class={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                blog
              </A>
              <A 
                href="/projects" 
                class={`nav-link ${location.pathname.startsWith('/projects') ? 'active' : ''}`}
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