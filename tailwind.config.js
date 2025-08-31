/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'facebook-blue': '#1877F2',
        'facebook-hover': '#166FE5',
        'facebook-green': '#42A72A',
        'facebook-gray': '#F0F2F5',
        'facebook-dark-gray': '#65676B',
        'facebook-border': '#DADDE1',
      }
    },
  },
  plugins: [],
}
