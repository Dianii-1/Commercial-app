import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#008296",
        accent: "#FAC830",
      },
    },
  },

  darkMode: "class",
};

export default config;
