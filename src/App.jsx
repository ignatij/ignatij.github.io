import { Routes, Route } from '@solidjs/router';
import { MetaProvider } from 'solid-meta';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Projects from './pages/Projects';
import Project from './pages/Project';

function App() {
  return (
    <MetaProvider>
      <div class="min-h-screen bg-bg-primary text-text-primary">
        <Header />
        <main>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:slug" component={Project} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MetaProvider>
  );
}

export default App; 