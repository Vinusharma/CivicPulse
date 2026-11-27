/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        civic: {
          dark: '#131210',
          surface: '#1B1A17',
          raised: '#24221E',
          hover: '#2B2925',
          border: '#36332D',
          text: '#EAE4D8',
          muted: '#A29B8D',
          accent: '#D9A23B',
          ink: '#1A1408',
          blue: '#7F9BD0',
          green: '#78B38F',
          red: '#D9604C',
          amber: '#C98B2B',
        },
      },
    },
  },
  plugins: [],
}
