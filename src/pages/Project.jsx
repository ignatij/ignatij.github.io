import { Title } from 'solid-meta';
import { useParams, A } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import { loadProject } from '../utils/content';

export default function Project() {
  const params = useParams();
  const [project, setProject] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const projectData = await loadProject(params.slug);
      setProject(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="min-h-screen py-16">
      {loading() ? (
        <div class="container text-center py-20">
          <p class="text-text-secondary font-mono">loading project...</p>
        </div>
      ) : project() ? (
        <>
          <Title>{project().title} - ignatij</Title>
          
          <div class="container">
            <article class="prose prose-lg max-w-none">
              {/* Header */}
              <header class="mb-16">
                <h1 class="text-5xl font-mono font-bold text-accent mb-6">
                  {project().title}
                </h1>
                
                <p class="text-xl text-text-secondary leading-relaxed mb-8 max-w-3xl">
                  {project().excerpt}
                </p>
                
                                        <div class="flex flex-wrap gap-2 mb-8">
                          {project().technologies && project().technologies.map(tech => (
                            <span class="px-3 py-1 bg-bg-secondary border border-border rounded text-accent font-mono text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                
                <div class="flex gap-4">
                  {project().github && (
                    <a 
                      href={project().github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="btn"
                    >
                      view on github
                    </a>
                  )}
                  {project().live && (
                    <a 
                      href={project().live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="btn btn-primary"
                    >
                      live demo
                    </a>
                  )}
                </div>
              </header>

              {/* Content */}
              <div 
                class="prose prose-lg max-w-none"
                innerHTML={project().content}
              />
            </article>

            {/* Navigation */}
            <nav class="mt-16 pt-8 border-t border-border">
              <div class="flex justify-between items-center">
                <A href="/projects" class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm">
                  ← back to projects
                </A>
                <div class="text-text-secondary font-mono text-sm">
                  thanks for checking it out
                </div>
              </div>
            </nav>
          </div>
        </>
      ) : (
        <div class="container text-center py-20">
          <h1 class="text-4xl font-mono font-bold text-text-primary mb-6">
            project not found
          </h1>
          <p class="text-text-secondary mb-8">
            the project you're looking for doesn't exist.
          </p>
          <A href="/projects" class="btn btn-primary">
            back to projects
          </A>
        </div>
      )}
    </div>
  );
} 