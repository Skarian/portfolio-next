module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      ringColor: ['hover'],
      display: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
