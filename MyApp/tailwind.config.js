/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DFD6CB",
        secondary: {
          DEFAULT: "#212224",
          100: "#212224",
          200: "#212224",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        rthin: ["RobotoThin", "sans-serif"],
        rthinitalic: ["RobotoThinItalic", "sans-serif"],
        rlight: ["RobotoLight", "sans-serif"],
        rlightitalic: ["RobotoLightItalic", "sans-serif"],
        rregular: ["RobotoRegular", "sans-serif"],
        ritalic: ["RobotoItalic", "sans-serif"],
        rmedium: ["RobotoMedium", "sans-serif"],
        rmediumitalic: ["RobotoMediumItalic", "sans-serif"],
        rbold: ["RobotoBold", "sans-serif"],
        rbolditalic: ["RobotoBoldItalic", "sans-serif"],
        rboldcondensed: ["RobotoBoldCondensed", "sans-serif"],
        rboldcondenseditalic: ["RobotoBoldCondensedItalic", "sans-serif"],
        rblack: ["RobotoBlack", "sans-serif"],
        rblackitalic: ["RobotoBlackItalic", "sans-serif"],
        rcondensed: ["RobotoCondensed", "sans-serif"],
        rcondenseditalic: ["RobotoCondensedItalic", "sans-serif"]
    },
    },
  },
  plugins: [],
}

