/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    daisyui: {
      themes: ["light", "dark", "cupcake","dracula"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake","dracula"],
  },
}

