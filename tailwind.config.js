/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorOne: "#F31559",
        colorTwo: "#4B5365",
        bgColor: "#efe8e3",
      },
    },
  },
  plugins: [],
};
