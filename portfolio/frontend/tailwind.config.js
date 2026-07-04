/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens driven by CSS variables (see index.css)
        // Dark "Midnight Amber" is default; html.light swaps the palette.
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-card': 'rgb(var(--surface-card) / <alpha-value>)',
        'surface-muted': 'rgb(var(--surface-muted) / <alpha-value>)',
        'surface-invert': '#F8FAFC',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--accent-hover) / <alpha-value>)',
        'accent-light': 'rgb(var(--accent) / 0.10)',
        'accent-secondary': 'rgb(var(--accent-secondary) / <alpha-value>)',
        heading: 'rgb(var(--heading) / <alpha-value>)',
        body: 'rgb(var(--body) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--ink) / 0.06)',
        'line-strong': 'rgb(var(--ink) / 0.12)',
        // "white" utilities (border-white/8, bg-white/[0.03], text-white/20)
        // are used as low-opacity ink throughout — remap so they invert in light mode
        white: 'rgb(var(--ink) / <alpha-value>)',

        // Theme-specific color sets
        // Cobalt Elegance
        'cobalt-primary': '#1e40af',
        'cobalt-hover': '#1e3a8a',
        'cobalt-light': '#eff6ff',
        'cobalt-secondary': '#0369a1',
        'cobalt-heading': '#0f172a',
        'cobalt-body': '#475569',

        // Violet Creative
        'violet-primary': '#7c3aed',
        'violet-hover': '#6d28d9',
        'violet-light': '#f3e8ff',
        'violet-secondary': '#a78bfa',
        'violet-heading': '#1e1b4b',
        'violet-body': '#4c1d95',

        // Crimson Bold
        'crimson-primary': '#dc2626',
        'crimson-hover': '#b91c1c',
        'crimson-light': '#fef2f2',
        'crimson-secondary': '#f97316',
        'crimson-heading': '#7f1d1d',
        'crimson-body': '#7c2d12',

        // Slate Minimal
        'slate-primary': '#475569',
        'slate-hover': '#334155',
        'slate-light': '#f1f5f9',
        'slate-secondary': '#64748b',
        'slate-heading': '#0f172a',
        'slate-body': '#475569',

        // Amber Warm
        'amber-primary': '#d97706',
        'amber-hover': '#b45309',
        'amber-light': '#fffbeb',
        'amber-secondary': '#f59e0b',
        'amber-heading': '#78350f',
        'amber-body': '#92400e',

        // Teal Balance
        'teal-primary': '#14b8a6',
        'teal-hover': '#0d9488',
        'teal-light': '#f0fdfa',
        'teal-secondary': '#06b6d4',
        'teal-heading': '#0f766e',
        'teal-body': '#2d6a6b',

        // Indigo Premium
        'indigo-primary': '#4f46e5',
        'indigo-hover': '#4338ca',
        'indigo-light': '#e0e7ff',
        'indigo-secondary': '#6366f1',
        'indigo-heading': '#1e1b4b',
        'indigo-body': '#3730a3',

        // Rose Elegant
        'rose-primary': '#be185d',
        'rose-hover': '#9d174d',
        'rose-light': '#ffe4e6',
        'rose-secondary': '#fb7185',
        'rose-heading': '#500724',
        'rose-body': '#831843',

        // Cyan Tech
        'cyan-primary': '#0891b2',
        'cyan-hover': '#0e7490',
        'cyan-light': '#ecf9ff',
        'cyan-secondary': '#06b6d4',
        'cyan-heading': '#082f49',
        'cyan-body': '#164e63',

        // Green Sustainable
        'green-primary': '#22c55e',
        'green-hover': '#16a34a',
        'green-light': '#f0fdf4',
        'green-secondary': '#84cc16',
        'green-heading': '#15803d',
        'green-body': '#3f6319',

        // Orange Vibrant
        'orange-primary': '#ea580c',
        'orange-hover': '#c2410c',
        'orange-light': '#fff7ed',
        'orange-secondary': '#f97316',
        'orange-heading': '#7c2d12',
        'orange-body': '#9a3412',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],

        // Theme-specific fonts
        'display-cobalt': ['Poppins', 'system-ui', 'sans-serif'],
        'body-cobalt': ['Raleway', 'system-ui', 'sans-serif'],

        'display-violet': ['Playfair Display', 'system-ui', 'serif'],
        'body-violet': ['Lato', 'system-ui', 'sans-serif'],

        'display-crimson': ['Montserrat', 'system-ui', 'sans-serif'],
        'body-crimson': ['Open Sans', 'system-ui', 'sans-serif'],

        'display-slate': ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        'body-slate': ['Source Sans Pro', 'system-ui', 'sans-serif'],

        'display-amber': ['Merriweather', 'system-ui', 'serif'],
        'body-amber': ['Poppins', 'system-ui', 'sans-serif'],

        'display-teal': ['Quicksand', 'system-ui', 'sans-serif'],
        'body-teal': ['Nunito', 'system-ui', 'sans-serif'],

        'display-indigo': ['Cormorant Garamond', 'system-ui', 'serif'],
        'body-indigo': ['Lora', 'system-ui', 'serif'],

        'display-rose': ['Playfair Display', 'system-ui', 'serif'],
        'body-rose': ['Crimson Text', 'system-ui', 'serif'],

        'display-cyan': ['JetBrains Mono', 'monospace'],
        'body-cyan': ['Roboto', 'system-ui', 'sans-serif'],

        'display-green': ['Comfortaa', 'system-ui', 'sans-serif'],
        'body-green': ['Ubuntu', 'system-ui', 'sans-serif'],

        'display-orange': ['Bebas Neue', 'system-ui', 'sans-serif'],
        'body-orange': ['Oxygen', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn: 'var(--radius-btn, 10px)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
