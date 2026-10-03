/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
        },
        canteen: {
          orange: '#ff6b35',
          gold: '#f7c59f',
          dark: '#1a1a24',
          accent: '#2e4057'
        }
      }
    },
  },
  plugins: [],
}
