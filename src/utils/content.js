import { marked } from 'marked';
import matter from 'gray-matter';

// Configure marked for security
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false
});

// Load all blog posts
export async function loadBlogPosts() {
  const posts = [];


  console.log('Final posts:', posts);
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Load a specific blog post
export async function loadBlogPost(slug) {
  const posts = await loadBlogPosts();
  return posts.find(post => post.slug === slug);
}

// Load all projects
export async function loadProjects() {
  const projects = [];
  
  try {
    // Import all project markdown files
    const projectFiles = [
      { file: await import('../../content/projects/competitive-intelligence-tool.md?raw'), slug: 'competitive-intelligence-tool' },
      { file: await import('../../content/projects/data-grid-angular.md?raw'), slug: 'data-grid-angular' },
      { file: await import('../../content/projects/portfolio-builder.md?raw'), slug: 'portfolio-builder' },
      { file: await import('../../content/projects/coffee-shop-monorepo.md?raw'), slug: 'coffee-shop-monorepo' }
    ];

    for (const { file, slug } of projectFiles) {
      console.log('Imported project:', slug, file);
      
      const { data, content: markdownContent } = matter(file.default);
      console.log('Parsed project data:', data);
      
      projects.push({
        ...data,
        slug: slug,
        content: marked(markdownContent),
        excerpt: data.excerpt || markdownContent.substring(0, 200) + '...'
      });
    }
  } catch (error) {
    console.error('Error loading projects:', error);
  }

  return projects;
}

// Load a specific project
export async function loadProject(slug) {
  const projects = await loadProjects();
  return projects.find(project => project.slug === slug);
} 