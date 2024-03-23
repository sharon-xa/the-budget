/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "bungee": ["Bungee Hairline", "sans-serif"],
        "jura": ["Jura", "sans-serif"],
        "comfortaa": ["Comfortaa", "sans-serif"],
      }
    },
    colors: {
      "white": "#C0C9D1",
      "grey": "#242C35",
      "light-grey": "#38393D",
      "blue": "#002E62",
      // #41719D
      "light-blue": "#3C6A95",
      "red": "#620000",
    }
  },
  plugins: [],
}
