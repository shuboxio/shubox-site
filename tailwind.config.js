/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./_site/**/*.{html,js}",
    "./assets/js/shubox.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        'none': 'none',
      },
      colors: {
        'shubox-purple': '#bf9de0',
        'shubox-dark-purple': '#7c5cd1',
        'shubox-light-purple': '#f9f2ff',
        'shubox-red': '#f56565',
        'shubox-gray': '#777777',
        'shubox-silver': '#999',
        'shubox-near-white': '#faf9f8',
        'shubox-light-gray': '#edeae6',
        'shubox-dark-gray': '#3f3f40',
        'shubox-charcoal': '#3f3f40',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}

