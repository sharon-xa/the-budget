/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "white": "#efefef",
      "black": "#222222",
      "green": "#1ec889",
      "light-green": "#1BE099",
      "red": "#E03F1B",
      "light-red": "#e65433",
      "blue": "#7451E0",
      "yellow": "#ebd91c",
      "grey": "#d3d3d3"
    }
  },
  plugins: [],
}
