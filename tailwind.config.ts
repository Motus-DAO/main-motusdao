import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", '[class~="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#9333EA",
          pink: "#EC4899",
          blue: "#6366F1",
        },
        surface: "rgba(255,255,255,0.06)",
        "surface-hover": "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        glass:
          "0 8px 32px rgba(0,0,0,0.15), 0 0 20px rgba(255,255,255,0.08)",
        glow: "0 0 20px rgba(147,51,234,0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
