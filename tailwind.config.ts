const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        mobileLandscape: {
          raw: `only screen and (max-height: 480px) and (max-width: 960px)`,
        },
      },
      zIndex: {
        "999": "999",
        "9999": "9999",
      },
      keyframes: {
        slideDownAndFadeIn: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideDownAndFadeIn: "slideDownAndFadeIn 0.5s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
