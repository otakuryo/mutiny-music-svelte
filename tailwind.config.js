/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""'
            },
            "code::after": {
              content: '""'
            },
            "p, li": {
              code: {
                backgroundColor: "#27272a",
                padding: "0.250rem 0.4rem",
                borderRadius: "0.250rem",
                fontWeight: "300",
                color: "white"
              }
            },
            "html:not(.dark) p, li": {
              code: {
                backgroundColor: "#e4e4e7",
                padding: "0.250rem 0.4rem",
                borderRadius: "0.250rem",
                fontWeight: "300",
                color: "black"
              }
            },
            "h1, h2, h3, h4": {
              fontWeight: "300"
            }
          }
        }
      },
      fontFamily: {
        inter: "Inter, Arial, sans-serif"
      },
      gridTemplateColumns: {
        1: "repeat(auto-fit, minmax(24ch, 1fr));"
      },
      animation:{
        'spin-slow': 'spin 4s linear infinite',
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require('@tailwindcss/forms'),]
};
