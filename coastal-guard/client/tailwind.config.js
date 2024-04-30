/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "text": "#191410",
      "background": "#f9f7f6",
      "primary": "#154975",
      "secondary": "#DBDADA",
      "accent": "#324251",
      "zinc": "#DBDADA",
      "white": "#fff",
      "stone": "#F9F7F6",
      "contrast": "#000000",
      "error": "#ff1f1f"
    },
    extend: {
      fontFamily:{
        nunito: ['var(--font-nunito)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      width:
        {
          "200": "200px",
          "70": "70px",
        },
      },
    },
  },
  plugins: [],
};
