import { Buffer } from 'buffer';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './index.css';

// Polyfill Buffer for browser environment
window.Buffer = Buffer;

const root = document.getElementById('root');
// Clear any static prerendered markup before mounting the interactive Solid app
root.innerHTML = '';

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root
);
