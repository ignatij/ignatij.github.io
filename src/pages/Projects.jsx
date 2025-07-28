import { Title } from 'solid-meta';
import { A } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import { loadProjects } from '../utils/content';

export default function Projects() {
  const [projects, setProjects] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const projectData = await loadProjects();
      setProjects(projectData);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="min-h-screen py-16">
      <Title>projects - ignatij</Title>
      
      <div class="container">
        <header class="mb-16">
          <h1 class="text-6xl font-mono font-bold text-accent mb-6">
            projects
          </h1>
          <p class="text-xl text-text-secondary font-mono max-w-2xl">
            a collection of software projects i've built. focused on performance, 
            developer experience, and solving real problems.
          </p>
        </header>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading() ? (
            <div class="col-span-full text-center py-12">
              <p class="text-text-secondary font-mono">loading projects...</p>
            </div>
          ) : (
            projects().map(project => (
              <A href={`/projects/${project.slug}`} class="card group">
                <div class="aspect-video bg-bg-tertiary border border-border rounded-lg mb-6 overflow-hidden">
                  <div class="w-full h-full flex items-center justify-center text-text-muted font-mono text-sm">
                    [project preview]
                  </div>
                </div>
                
                <h3 class="text-xl font-mono font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p class="text-text-secondary leading-relaxed mb-4">
                  {project.excerpt}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                  {project.technologies && project.technologies.map(tech => (
                    <span class="px-2 py-1 bg-bg-tertiary border border-border rounded text-accent font-mono text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div class="flex gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    github
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      live demo
                    </a>
                  )}
                </div>
              </A>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 