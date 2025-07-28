# Ignatij's Portfolio Website

A modern, responsive portfolio website built with Solid.js and Tailwind CSS, featuring a blog and project showcase. The design is inspired by [xnacly.me](https://xnacly.me/) with a clean, minimalist aesthetic.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Blog System**: Markdown-based blog with syntax highlighting
- **Project Showcase**: Detailed project pages with live demos
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Fast Performance**: Static generation with minimal JavaScript
- **Dark Theme**: Beautiful dark theme with smooth transitions

- **Mobile-Friendly**: Fully responsive navigation and layout

## Tech Stack

- **Frontend**: [Solid.js](https://www.solidjs.com/) - Reactive UI library
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast development and optimized builds
- **Routing**: [Solid Router](https://github.com/solidjs/solid-router) - Client-side routing
- **Deployment**: [GitHub Pages](https://pages.github.com/) - Static hosting
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) - Automated deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ignatij/ignatij.github.io.git
cd ignatij.github.io
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/         # Route components
│   ├── Home.jsx
│   ├── Blog.jsx
│   ├── BlogPost.jsx
│   ├── Projects.jsx
│   └── Project.jsx
├── App.jsx        # Main app component
├── index.jsx      # Entry point
└── index.css      # Global styles
```

## Content Management

Content is managed statically through code. To add or modify content:

### Adding Blog Posts

1. Edit the `blogPosts` array in `src/pages/Blog.jsx`
2. Add your new blog post data
3. Create a corresponding entry in the `posts` object in `src/pages/BlogPost.jsx`

### Adding Projects

1. Edit the `projects` array in `src/pages/Projects.jsx`
2. Add your new project data
3. Create a corresponding entry in the `projects` object in `src/pages/Project.jsx`

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment process:

1. Runs linting to ensure code quality
2. Builds the project for production
3. Deploys to GitHub Pages

### Manual Deployment

To deploy manually:

```bash
npm run build
# The dist/ folder contains the built files
```

## Customization

### Colors and Theme

The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  'bg-primary': '#0a0a0a',
  'bg-secondary': '#1a1a1a',
  'text-primary': '#ffffff',
  'text-secondary': '#a0a0a0',
  'accent': '#3b82f6',
  'accent-hover': '#2563eb',
}
```

### Content

- Blog posts are stored in the `src/pages/Blog.jsx` and `src/pages/BlogPost.jsx` files
- Projects are stored in the `src/pages/Projects.jsx` and `src/pages/Project.jsx` files
- Update the data objects to add or modify content

### SEO

Update the meta tags in `index.html` and individual pages to optimize for search engines.

## Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Responsive images with lazy loading
- **Caching**: Aggressive caching strategies for static assets
- **Bundle Analysis**: Regular bundle size monitoring

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from [xnacly.me](https://xnacly.me/)
- [Solid.js](https://www.solidjs.com/) for the reactive framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Vite](https://vitejs.dev/) for the build tool

## Contact

- Website: [https://ignatij.github.io](https://ignatij.github.io)
- GitHub: [@ignatij](https://github.com/ignatij)
- Email: [your-email@example.com](mailto:your-email@example.com) 