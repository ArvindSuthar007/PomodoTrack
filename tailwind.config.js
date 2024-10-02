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
        check: {
          "0%": { strokeDashoffset: "500" },
          "100%": { strokeDashoffset: "0" },
        },
        ripple: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        check: "check 4s forwards",
        ripple: "ripple 0.3s",
      },
    },
  },
  plugins: [],
};
