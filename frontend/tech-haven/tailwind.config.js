/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        contactHero: "url('/src/assets/contactHero.jpg')",
      },
      aspectRatio: {
        '3/5': '3 / 5',
      },
      keyframes: {
        move: {
          '50%': { transform: 'translateY(-2rem)' },
        },
      },
      animation: {
        movingY: 'move 2s linear infinite',
      },
    },
  },
  plugins: [],
}
