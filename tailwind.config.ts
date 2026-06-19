import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        masa: {
          claro: '#FFF5E6',
          DEFAULT: '#F5E6C8',
          oscuro: '#C4956A',
        },
        salsa: {
          claro: '#FFCDD2',
          DEFAULT: '#E53935',
          oscuro: '#C62828',
        },
        albahaca: {
          DEFAULT: '#43A047',
          oscuro: '#2E7D32',
        },
      },
    },
  },
  plugins: [],
};

export default config;
