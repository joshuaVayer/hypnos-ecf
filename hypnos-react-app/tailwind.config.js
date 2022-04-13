module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: ["bg-red", "bg-red-600", "bg-green", "bg-green-600"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora"],
        raylig: ["Raylig", "sans-serif"]
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        danger: "var(--danger)",
        primary: {
          DEFAULT: "#075985",
          50: "#4EBBF6",
          100: "#3BB4F5",
          200: "#14A5F3",
          300: "#0B8DD3",
          400: "#0973AC",
          500: "#075985",
          600: "#043550",
          700: "#01121A",
          800: "#000000",
          900: "#000000"
        },
        success: "var(--success)",
        warning: "var(--warning)",
        disabled: "var(--disabled)",
        secondary: "var(--secondary)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio")
  ]
};
