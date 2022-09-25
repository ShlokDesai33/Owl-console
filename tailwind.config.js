/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'post-shadow': '0px 0px 20px -3px rgba(0, 0, 0, 0.17)',
      },
      colors: {
        'primary': '#2F80ED',
        'secondary': '#BE6CFF',
        'gray-bg': '#F7F7F7',
        'gray-text': '#717171',
        'gray-btn': '#BDBDBD',
        'gray-skl': '#F2F2F2',
      },
      fontSize: {
        "xxl": "1.375rem",
      },
      backgroundImage: {
        'landing': "url('/images/landing.svg')",
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ],
}