import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "var(--forest-green)",
        leaf: "var(--leaf-green)",
        charcoal: "var(--charcoal-black)",
        beige: "var(--soft-beige)",
        offwhite: "var(--off-white)",
        textgrey: "var(--text-grey)",
        lightgrey: "var(--light-grey)",
        amber: "var(--amber)",
        danger: "var(--deep-red)",
        sky: "var(--sky-blue)",
      },
    },
  },
};

export default config;
