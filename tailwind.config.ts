/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#E8943A',
          light: '#F5C678',
          pale: '#FDF0DC',
          deep: '#F59E0B',
        },
        cream: '#FAF6EE',
        sky: {
          DEFAULT: '#C8DEFF',
          deep: '#7BAEE8',
          blue: '#60A5FA',
        },
        irid: {
          1: '#C084FC',
          2: '#F472B6',
          3: '#FB923C',
          4: '#60A5FA',
        },
        chrome: {
          DEFAULT: '#E8EDF4',
          glow: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#1A1410',
          soft: '#3D3028',
        },
        muted: '#8A7A6A',
        border: 'rgba(232,148,58,0.15)',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
