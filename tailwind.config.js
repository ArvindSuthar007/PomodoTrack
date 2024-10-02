/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ArialRounded: ["ArialRounded", "Arial", "sans-serif"],
        ArialRoundedBold: [
          "ArialRoundedBold",
          "ArialRounded",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
