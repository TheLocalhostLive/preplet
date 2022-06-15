const { urlObjectKeys } = require("next/dist/shared/lib/utils");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        Jost: ["Jost"],
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.9)",
          },
          "66%": {
            transform: "translate(0px,0px) scale(1)",
          },
        },
      },
      colors: {
        orange: {
          500: "#f76116",
          400: "#f77416",
        },
        // purple: {
        //   500: "#CA10E7",
        //   600: "#8E066B",
        //   700: ""
        // },
        black: {
          bg: "#050505",
        },
        'spurple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'spink':'#ed80fd',
        'hotpink':'#ff69b4',
        'purpleh':'#7e22ce',
        'skyblue':'#67e8f9'
      },
      margin: {
        110: "36rem",
        120: "42rem",
      },
      backgroundImage: {
        team: "url('/images/Team-b.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [],
};
