import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Esta línea es la que "enciende" los estilos en tu página
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        disaBlue: "#0A1F44",
        disaGold: "#C5A059",
      },
    },
  },
  plugins: [],
};
export default config;