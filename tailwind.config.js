/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
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
        // Gangsta Monkey inspired color scheme
        background: "#0B0B0B",
        surface: "#111111",
        text: {
          primary: "#F5F5F5",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
        coin: "#F9A825",
        energy: "#22C55E",
        secondary: "#0EA5E9",
        accent: {
          orange: "#FB923C",
          red: "#EF4444",
          purple: "#A855F7",
        },
        // Shadcn compatibility
        border: "#27272A",
        input: "#27272A",
        ring: "#F9A825",
        foreground: "#F5F5F5",
        primary: {
          DEFAULT: "#F9A825",
          foreground: "#0B0B0B",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#F5F5F5",
        },
        muted: {
          DEFAULT: "#27272A",
          foreground: "#A1A1AA",
        },
        popover: {
          DEFAULT: "#111111",
          foreground: "#F5F5F5",
        },
        card: {
          DEFAULT: "#111111",
          foreground: "#F5F5F5",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      letterSpacing: {
        tight: '-0.025em',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(249, 168, 37, 0.3)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "tap": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "coin-float": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-50px) scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "tap": "tap 0.2s ease-in-out",
        "coin-float": "coin-float 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}