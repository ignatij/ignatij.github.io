# Content Structure

This directory contains all the markdown content for the portfolio website.

## Directory Structure

```
content/
├── blog/           # Blog posts
│   └── *.md       # Individual blog post files
├── projects/       # Project descriptions
│   └── *.md       # Individual project files
└── README.md      # This file
```

## Adding New Content

### Blog Posts

1. Create a new `.md` file in the `blog/` directory
2. Use the following frontmatter structure:

```yaml
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
readTime: "X min read"
tags: ["tag1", "tag2", "tag3"]
excerpt: "A brief description of your blog post."
---
```

3. Write your content in markdown format below the frontmatter
4. The file name will become the URL slug (e.g., `my-post.md` → `/blog/my-post`)

### Projects

1. Create a new `.md` file in the `projects/` directory
2. Use the following frontmatter structure:

```yaml
---
title: "Project Name"
excerpt: "Brief description of the project"
technologies: ["tech1", "tech2", "tech3"]
github: "https://github.com/username/repo"
live: "https://live-demo-url.com"  # or null if no live demo
personal_project_order: 1  # optional; lower values appear first among personal projects
---
```

3. Write your project description in markdown format below the frontmatter
4. The file name will become the URL slug (e.g., `my-project.md` → `/projects/my-project`)

## Markdown Features

The website supports standard markdown features including:

- **Headers**: `# H1`, `## H2`, etc.
- **Bold/Italic**: `**bold**`, `*italic*`
- **Code**: `` `inline code` ``, ```` ```code blocks``` ````
- **Links**: `[text](url)`
- **Lists**: `- item` or `1. item`
- **Tables**: Standard markdown table syntax
- **Blockquotes**: `> quote`

## Styling

The shared reading layout is styled in `src/index.css`:

- **Headings**: Neutral white (`#F4F4F5`)
- **Paragraphs and metadata**: Gray (`#B4B4BC`)
- **Links and focus**: Light blue (`#7DD3FC`), with underlined links
- **Background**: Dark zinc (`#18181B`)
- **Typography**: Sans-serif body and headings; monospace code

Featured projects can provide `home_summary` and `home_technologies` for concise
listing entries. Full technology lists remain on project pages and in the CV.
CV highlights come from `cv_highlights`; run `pnpm cv:generate` after editing them.

## Examples

See the existing files in `blog/` and `projects/` directories for examples of properly formatted content.
