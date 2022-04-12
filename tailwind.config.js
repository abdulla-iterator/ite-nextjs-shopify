module.exports = {
  content: [
    "./pages/**/*.{js,ts,html,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio', '@headlessui/react', '@tailwindcss/forms'),
  ],
}
