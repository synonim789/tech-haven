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
        hero: "url('./src/assets/6017768.jpg')",
      },
      aspectRatio: {
        '3/5': '3 / 5',
      },
    },
  },
  plugins: [],
}
