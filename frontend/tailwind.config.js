/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f2747",
        accent: "#1d4ed8",
        surface: "#f3f6fb",
        success: "#15803d",
        danger: "#b91c1c",
      },
      boxShadow: {
        panel: "0 18px 45px -24px rgba(15, 39, 71, 0.35)",
      },
    },
  },
  plugins: [],
}
