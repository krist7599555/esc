// eslint-disable-next-line no-undef
module.exports = {
  purge: [],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      // 'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      // 'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      sans:
        '"Sukhumvit Set", -apple-system, Helvetica, Georgia, Cambria, serif',
      serif:
        '"Sukhumvit Set", -apple-system, Helvetica, Georgia, Cambria, serif',
      display:
        '"Sukhumvit Set", -apple-system, Helvetica, Georgia, Cambria, serif',
      body:
        '"Sukhumvit Set", -apple-system, Helvetica, Georgia, Cambria, serif',
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#FFFFFF',
      light: '#F5F5F5',
      grey: '#DBDBDB',
      primary: {
        default: '#8C2E2F',
        dark: '#682323',
      },
      dark: '#363636',
      success: 'hsl(141, 53%, 53%)',
      danger: 'hsl(348, 100%, 61%)',
      warning: 'hsl(43, 96%, 62%);',
      info: 'hsl(204, 86%, 53%)'
    },
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [],
  corePlugins: {
    outline: false,
  },
}
