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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        // Default: Spin buttons match input background and text color
        ".arrow-match-bg": {
          "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
            backgroundColor: "inherit", // Match the input box background
            color: "inherit", // Match the input text color
            border: "none", // Remove any borders
            opacity: "1", // Fully visible
            transition:
              "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
          },
        },
        // Hover: No special behavior unless required (transparent background remains)
        ".arrow-hover-visible": {
          "&:hover::-webkit-inner-spin-button, &:hover::-webkit-outer-spin-button":
            {
              backgroundColor: "transparent", // Ensure hover doesn't break styles
              color: "inherit", // Match text color
            },
        },
        // Active: Grayish background and visible spin button when clicked
        ".arrow-active": {
          "&::-webkit-inner-spin-button:active, &::-webkit-outer-spin-button:active":
            {
              backgroundColor: "#4b5563", // Grayish-black (Tailwind's gray-800)
              color: "#fff", // Optional: Change text color to white for visibility
            },
        },
      });
    },
  ],
};
