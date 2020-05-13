// eslint-disable-next-line no-undef
module.exports = {
  purge: [],
  theme: {
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
      warning: 'hsl(48, 100%, 67%)',
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
