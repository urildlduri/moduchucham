import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold:   '#b8922a',
        gold2:  '#c9a03a',
        gold3:  '#d4a843',
        gold4:  '#e8c068',
        gold6:  '#faeecb',
        gold7:  '#fdf8ed',
        ivory:  '#faf8f3',
        ivory2: '#f4f0e4',
        ivory3: '#ede6d2',
        ivory4: '#e0d5be',
        dark:   '#14110d',
        dark2:  '#1e1a13',
        dark3:  '#28231a',
        brown:  '#6b5a3e',
        brown2: '#9a8668',
      },
      fontFamily: {
        sans: ['Noto Sans KR', '-apple-system', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
export default config
