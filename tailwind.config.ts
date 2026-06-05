import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ivory:     '#faf8f4',
        cream:     '#f7f3ec',
        mist:      '#eef3ee',
        sand:      '#e8dfc8',
        sage:      '#7a9e7e',
        'sage-dark': '#4a6b4e',
        'sage-deep': '#2d4a30',
        gold:      '#b8963e',
        bark:      '#6b5740',
        warm:      '#c9b89a',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(145deg, #1e3322 0%, #2d4a30 40%, #3a5e3d 70%, #2d4a30 100%)',
      },
    },
  },
  plugins: [],
}

export default config
