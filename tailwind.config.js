import { transform } from "typescript";

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
      keyframes: {
        expand: {
          "0%": {
            transform: "scale(1, 0.8)",
            opacity: "0.1",
          },

          "100%": {
            transform: "scale(1, 1)",
            opacity: "1",
          },
        },
      },
      animation: {
        expand: "collapse 0.2s ease-in-out ",
      },
    },
  },
  plugins: [],
};
