/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        divider: "#282828",
        btnPrimary: "#282828",
        btnPrimaryHover: "#2D2D2D",
        btnPrimaryPressed: "#323232",

        btnSecondary: "transparent",
        btnSecondaryHover: "#191919",
        btnSecondaryPressed: "#1E1E1E",
      },  
      backgroundImage: {
        btnSpecial:  "linear-gradient(180deg, rgba(40, 40, 40, 0.70) 0%, #282828 100%), #141414" 
      },
      fontFamily: {
        glysa: "Glysa",
        lexend: "Lexend",
      },
      fontSize: {
        headlineOne: "32px"
      }
    },
  },
  plugins: [],
};
