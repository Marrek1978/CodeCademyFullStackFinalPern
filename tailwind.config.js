/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes:true,
    darkTheme: "night",
    base: false, // applies background color and foreground color for root element by default
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

