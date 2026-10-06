import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* AgroCoop brand palette */
        coop: {
          blue: "#2E7D32",
          "blue-dark": "#1B5E20",
          "blue-light": "#E8F5E9",
          gold: "#78716C",
          "gold-light": "#EDEDEA",
          green: "#059669",
          "green-light": "#D1FAE5",
          sand: "#F5F5F4",
          "sand-dark": "#E7E5E4",
          earth: "#44403C",
          "earth-light": "#78716C",
          coral: "#57534E",
          "coral-light": "#F0EFEC",
          sky: "#E6F0E2",
        },
        sand: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "Cambria", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(68, 64, 60, 0.08)",
        card: "0 4px 20px -6px rgba(68, 64, 60, 0.10)",
        lift: "0 12px 32px -12px rgba(68, 64, 60, 0.18)",
        "coop-blue": "0 8px 24px -8px rgba(46, 125, 50, 0.45)",
        "coop-gold": "0 8px 24px -8px rgba(120, 113, 108, 0.45)",
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
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "slow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        "slow-pulse": "slow-pulse 3.5s ease-in-out infinite",
      },
      backgroundImage: {
        "coop-pattern":
          "radial-gradient(circle at 25% 25%, rgba(46,125,50,0.08) 0%, transparent 55%), radial-gradient(circle at 75% 75%, rgba(120,113,108,0.08) 0%, transparent 55%)",
        "dots-sand":
          "radial-gradient(rgba(68,64,60,0.14) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
