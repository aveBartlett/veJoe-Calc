const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sansserif: ["Bebas Neue", "serif"],
      custom: ["Roboto Mono", "monospace"],
    },
  },
  plugins: [],
};
