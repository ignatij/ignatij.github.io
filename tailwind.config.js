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
            'bg-primary': '#0a0a0a',
            'bg-secondary': '#1a1a1a',
            'bg-tertiary': '#2a2a2a',
            'text-primary': '#ffffff',
            'text-secondary': '#a0a0a0',
            'text-muted': '#666666',
            'accent': '#29ffff',
            'accent-hover': '#1acccc',
            'border': '#333333',
            'code-bg': '#1e1e1e',
            'code-border': '#404040',
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
                  color: '#ffffff',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600',
                },
                h4: {
                  color: '#ffffff',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600',
                },
                h5: {
                  color: '#ffffff',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600',
                },
                h6: {
                  color: '#ffffff',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600',
                },
                            a: {
                  color: '#29ffff',
                  '&:hover': {
                    color: '#1acccc',
                  },
                },
                            code: {
                  color: '#29ffff',
                  backgroundColor: '#1e1e1e',
                  border: '1px solid #404040',
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
              backgroundColor: '#1e1e1e',
              border: '1px solid #404040',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
              color: '#ffffff',
            },
                            blockquote: {
                  borderLeftColor: '#29ffff',
                  color: '#ffffff',
                  fontStyle: 'italic',
                },
            strong: {
              color: '#ffffff',
              fontWeight: '600',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
            },
                            th: {
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  fontFamily: 'JetBrains Mono, monospace',
                  border: '1px solid #333333',
                  padding: '0.5rem 1rem',
                  textAlign: 'left',
                },
                            td: {
                  color: '#ffffff',
                  border: '1px solid #333333',
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