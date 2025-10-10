import { Buffer } from 'buffer';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './index.css';
import 'highlight.js/styles/atom-one-dark.css';

// Polyfill Buffer for browser environment
window.Buffer = Buffer;

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root')
); 