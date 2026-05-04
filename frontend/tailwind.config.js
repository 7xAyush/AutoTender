/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1b2b48",
        "primary-deep": "#041632",
        accent: "#4f5e7e",
        background: "#fbf8fb",
        surface: "#f8fafc",
        line: "#e2e8f0",
        muted: "#57657a",
        "on-base": "#1b1b1e",
        success: "#15803d",
        danger: "#ba1a1a",
        warning: "#d97706",
      },
      boxShadow: {
        panel: "0 24px 50px -28px rgba(27, 43, 72, 0.22)",
      },
    },
  },
  plugins: [],
}
