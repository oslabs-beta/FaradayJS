const colors = require('tailwindcss/colors')
module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        other: '#89898b',
        light: '#b0b0b1',
        DEFAULT: '#3a3b3d',
        medium: '#333333',
        dark: '#28292a',
        darkest: '0f1010'
      },
      blue: {
        light: '#e1edf3',
        DEFUALT: '#9dc6d8',
        dark: '#4e636c'
      },
      peach: {
        light: '#fef3ef',
        DEFUALT: '#fac3af',
        dark: '#7d6157',
        other: '#af897a'
      }
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
