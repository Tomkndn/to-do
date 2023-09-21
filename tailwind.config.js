/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: {  max: "520px" },
        md: { min: "521px", max: "950px" },
        lg: { min: "951px",},
      },
    },
  },
  plugins: [],
};

