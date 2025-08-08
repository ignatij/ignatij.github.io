/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'bg-primary': '#1e1e2e',
        'bg-secondary': '#313244',
        'bg-tertiary': '#45475a',
        'text-primary': '#cdd6f4',
        'text-secondary': '#a6adc8',
        'text-muted': '#6c7086',
        'accent': '#29ffff',
        'accent-hover': '#89dceb',
        'border': '#45475a',
        'code-bg': '#313244',
        'code-border': '#45475a',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#cbcbcb !important',
            h1: {
              color: '#ff5c53 !important',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: '600',
            },
            h2: {
              color: '#ff5c53 !important',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: '600',
            },
            h3: {
              color: '#29ffff',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: '600',
            },
            h4: {
              color: '#29ffff',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: '600',
            },
            h5: {
              color: '#29ffff',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: '600',
            },
            h6: {
              color: '#29ffff',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: '600',
            },
            a: {
              color: '#29ffff',
              '&:hover': {
                color: '#89dceb',
              },
            },
            code: {
              color: '#29ffff',
              backgroundColor: '#313244',
              border: '1px solid #45475a',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.875rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#313244',
              border: '1px solid #45475a',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
              color: '#cdd6f4',
            },
            blockquote: {
              borderLeftColor: '#29ffff',
              color: '#a6adc8',
              fontStyle: 'italic',
            },
            strong: {
              color: '#29ffff',
              fontWeight: '600',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
            },
            th: {
              backgroundColor: '#313244',
              color: '#cdd6f4',
              fontFamily: 'JetBrains Mono, monospace',
              border: '1px solid #45475a',
              padding: '0.5rem 1rem',
              textAlign: 'left',
            },
            td: {
              color: '#cbcbcb !important',
              border: '1px solid #45475a',
              padding: '0.5rem 1rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 