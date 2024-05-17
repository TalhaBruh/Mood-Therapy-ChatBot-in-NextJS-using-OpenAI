import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "custom-secondary": {
          100: "E7C8E7",
          900: "#C266A7",
        },
        "custom-muted": "#4C2F6F",
        "custom-accent": "#52489F",
        "text-color": {
          100: "#FFFFFF",
          500: "#E8E6E3",
          900: "#c0c0c0",
        },
        "custom-btn": {
          500: "#d8669d8c",
          700: "#c266a7",
          900: "#61284480",
        },
        "custom-btn-hover": "#79335580",
        "custom-input": "#141414",
        "custom-input-text": "#7e7a71",
        "custom-black": {
          900: "#131212",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
} satisfies Config;

export default config;
