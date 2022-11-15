/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      mb: "375px",
    },
    extend: {
      colors: {
        veryDarkBlue: "hsl(217, 54%, 11%)",
        darkBlueNormal: "hsl(216, 50%, 16%)",
        darkBlue: "hsl(215, 32%, 27%)",
        softBlue: "hsl(215, 51%, 70%)",
        White: "hsl(0, 0%, 100%)",
        cyan: "hsl(178, 100%, 50%)",
      },
    },
  },
  plugins: [],
};
