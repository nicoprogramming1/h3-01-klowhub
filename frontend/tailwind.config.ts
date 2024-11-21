import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        white: "0px 1px 2px white, 1px 2px 4px white",
        whitesm: "1px 1px 15px #f6d6ff",
      },
      backgroundImage: {
        "custom-gradient-dark":
          "linear-gradient(to bottom right, #051D8A, #181941, #431650)",

        "custom-gradient-light":
          "linear-gradient(to bottom right, #0f6bff,#faebff , #f6d6ff)",

        "custom-gradient-background":
          "linear-gradient(263.17deg, #201C2D 0.4%, #201D43 50.02%, #262136 99.65%)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        primario: {
          "100": "#E8C9F1",
          "200": "#D194E2",
          "300": "#B95ED4",
          "400": "#9D32BC",
          "500": "#702486",
          "600": "#5A1D6B",
          "700": "#431650",
          "800": "#2D0E36",
          "900": "#16071B",
          DEFAULT: "#702486",
          foreground: "#ffff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        secundario: {
          "100": "#C0D6FB",
          "200": "#A1C2FA",
          "300": "#81AEF8",
          "400": "#6299f6",
          "500": "#4285f4",
          "600": "#0E61EA",
          "700": "#0A49B0",
          "800": "#073075",
          "900": "#03183B",
          DEFAULT: "#4285f4",
          foreground: "#ffff",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-textshadow")],
} satisfies Config;
