const { urlObjectKeys } = require("next/dist/shared/lib/utils");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Russo One"],
        fancy: ["Dancing Script"],
        beba: ["Bebas Neue"],
      },
      boxShadow: {
        "3in": "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
        "3xl": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "sub-menu":
          "linear-gradient(180deg, rgba(234, 229, 229, 0.6) 0%, rgba(246, 246, 246, 0.36) 100%)",
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
      borderRadius: {
        tc: "50px 50px 0px 0px",
      },
      colors: {
        orange: {
          500: "#f76116",
          400: "#f77416",
        },
        purple: {
          500: "#CA10E7",
          600: "#8E066B",
          700: "#900C3F",
        },
        black: {
          bg: "#050505",
        },
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
