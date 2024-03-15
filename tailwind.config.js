/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "white": "#C0C9D1",
      "grey": "#242C35",
      "blue": "#002E62",
      "light-blue": "#3C6A95",
      "red": "#620000",
    }
  },
  plugins: [],
}
