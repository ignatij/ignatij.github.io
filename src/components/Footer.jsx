export default function Footer() {
  return (
    <footer class="bg-bg-primary border-t border-border mt-16">
      <div class="container py-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-text-secondary font-mono text-sm mb-4 md:mb-0">
            © 2026 ignatij. built with <span class="text-accent">solid.js</span>{" "}
            + <span class="text-accent">tailwind 🫶</span>
          </div>

          <div class="flex space-x-6">
            <a
              href="https://github.com/ignatij"
              target="_blank"
              rel="noopener noreferrer"
              class="text-text-secondary hover:text-accent transition-colors duration-200 font-mono text-sm"
            >
              github
            </a>
            <a
              href="https://linkedin.com/in/ignatij"
              target="_blank"
              rel="noopener noreferrer"
              class="text-text-secondary hover:text-accent transition-colors duration-200 font-mono text-sm"
            >
              linkedin
            </a>
            <a
              href="https://twitter.com/ignatij"
              target="_blank"
              rel="noopener noreferrer"
              class="text-text-secondary hover:text-accent transition-colors duration-200 font-mono text-sm"
            >
              twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
