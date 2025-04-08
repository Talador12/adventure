// tailwind.config.ts
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'IM Fell English SC'", ...fontFamily.serif],
        display: ["'MedievalSharp'", ...fontFamily.sans],
      },
      colors: {
        parchment: "#f6f1d3",
        ink: "#2e1f0e",
        mana: "#4a8ec2",
        health: "#a93030",
        shadow: "#1c0e0a",
      },
    },
  },
};
