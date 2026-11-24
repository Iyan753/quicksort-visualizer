import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono Variable",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        ink: {
          950: "#05050b",
          900: "#080812",
          850: "#0b0b18",
          800: "#10101f",
          700: "#17172b",
        },
        violet: {
          350: "#b79cff",
        },
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(139, 92, 246, 0.55)",
        "glow-sm": "0 0 24px -10px rgba(139, 92, 246, 0.6)",
        card: "0 24px 60px -30px rgba(0, 0, 0, 0.9)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
