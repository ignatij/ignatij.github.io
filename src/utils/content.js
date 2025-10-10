import { marked } from "marked";
import matter from "gray-matter";
import hljs from "highlight.js";

// Configure marked for security and syntax highlighting
const renderer = new marked.Renderer();

renderer.code = function (code, lang) {
  const codeText = code.text || code;
  const codeLang = code.lang || lang;

  let highlightedCode = codeText;

  if (codeLang && hljs.getLanguage(codeLang)) {
    try {
      highlightedCode = hljs.highlight(codeText, { language: codeLang }).value;
    } catch (err) {
      console.error("Error highlighting code:", err);
    }
  } else {
    try {
      highlightedCode = hljs.highlightAuto(codeText).value;
    } catch (err) {
      console.error("Error auto-highlighting code:", err);
    }
  }

  return `<pre><code class="hljs language-${
    codeLang || ""
  }">${highlightedCode}</code></pre>`;
};

marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false,
  pedantic: false,
  smartLists: false,
  smartypants: false,
  xhtml: false,
  renderer: renderer,
});

// Load all blog posts
export async function loadBlogPosts() {
  const posts = [];

  try {
    // Use import.meta.glob to discover all markdown files in the blog folder
    const blogFiles = import.meta.glob("../../content/blog/*.md", {
      eager: true,
    });
    const blogSlugs = Object.keys(blogFiles).map((path) =>
      path.split("/").pop().replace(".md", "")
    );

    // Dynamic imports for each discovered blog post
    for (const slug of blogSlugs) {
      try {
        const file = await import(`../../content/blog/${slug}.md?raw`);

        const { data, content: markdownContent } = matter(file.default);

        // Extract first paragraph as excerpt if not provided in frontmatter
        const excerpt =
          data.excerpt ||
          markdownContent
            .split("\n")
            .find((line) => line.trim() && !line.startsWith("#"))
            ?.substring(0, 200) + "..." ||
          markdownContent.substring(0, 200) + "...";

        // Calculate read time (average 200 words per minute)
        const wordCount = markdownContent.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        posts.push({
          ...data,
          slug: slug,
          content: marked(markdownContent),
          excerpt: excerpt,
          readTime: `${readTime} min read`,
          date: data.date || new Date().toISOString().split("T")[0], // Default to today if no date
        });
      } catch (importError) {
        console.error(`Error importing blog post ${slug}:`, importError);
      }
    }
  } catch (error) {
    console.error("Error loading blog posts:", error);
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Load a specific blog post
export async function loadBlogPost(slug) {
  const posts = await loadBlogPosts();
  return posts.find((post) => post.slug === slug);
}

// Load all projects
export async function loadProjects() {
  const projects = [];

  try {
    // Use import.meta.glob to discover all markdown files
    const projectFiles = import.meta.glob("../../content/projects/*.md", {
      eager: true,
    });
    const projectSlugs = Object.keys(projectFiles).map((path) =>
      path.split("/").pop().replace(".md", "")
    );

    // Dynamic imports for each discovered project
    for (const slug of projectSlugs) {
      try {
        const file = await import(`../../content/projects/${slug}.md?raw`);

        const { data, content: markdownContent } = matter(file.default);

        projects.push({
          ...data,
          slug: slug,
          content: marked(markdownContent),
          excerpt: data.excerpt || markdownContent.substring(0, 200) + "...",
        });
      } catch (importError) {
        console.error(`Error importing ${slug}:`, importError);
      }
    }
  } catch (error) {
    console.error("Error loading projects:", error);
  }

  // Sort projects by date descending if available, otherwise alphabetically
  return projects.sort((a, b) => {
    // Check if projects have any dates (production projects)
    const aHasDates = a.start_date || a.end_date;
    const bHasDates = b.start_date || b.end_date;

    // Production projects (with dates) come before private projects (without dates)
    if (aHasDates && !bHasDates) {
      return -1; // a (production) comes before b (private)
    }
    if (!aHasDates && bHasDates) {
      return 1; // b (production) comes before a (private)
    }

    // If both are production projects (have dates)
    if (aHasDates && bHasDates) {
      // If both have end_date, sort by end_date descending (most recent first)
      if (a.end_date && b.end_date) {
        return new Date(b.end_date) - new Date(a.end_date);
      }

      // If only one has end_date, the one without end_date (current project) goes first
      if (a.end_date && !b.end_date) {
        return 1; // b (current) comes before a (completed)
      }
      if (!a.end_date && b.end_date) {
        return -1; // a (current) comes before b (completed)
      }

      // If neither has end_date (both current), sort by start_date descending
      if (!a.end_date && !b.end_date) {
        if (a.start_date && b.start_date) {
          return new Date(b.start_date) - new Date(a.start_date);
        }
        // If one has start_date and the other doesn't, the one with start_date goes first
        if (a.start_date && !b.start_date) {
          return -1; // a (with start_date) comes before b (without start_date)
        }
        if (!a.start_date && b.start_date) {
          return 1; // b (with start_date) comes before a (without start_date)
        }
      }
    }

    // If both are private projects (no dates), sort alphabetically
    if (!aHasDates && !bHasDates) {
      return a.title?.localeCompare(b.title) || 0;
    }

    // Fallback to alphabetical by title
    return a.title?.localeCompare(b.title) || 0;
  });
}

// Load a specific project
export async function loadProject(slug) {
  const projects = await loadProjects();
  return projects.find((project) => project.slug === slug);
}
