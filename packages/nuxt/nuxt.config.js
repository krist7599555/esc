export default {
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["style/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ["nuxt-buefy", { css: false }],
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    '@nuxtjs/proxy',
    "@nuxtjs/auth",
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
  ],
  middleware: ['auth'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/login",
            method: "post",
            propertyName: false
          },
          logout: {
            url: "/api/logout",
            method: "post"
          },
          user: {
            url: "/api/profile",
            method: "get",
            propertyName: false
          }
        },
        tokenRequired: false,
        tokenType: false
      }
    }
  },

  axios: {
    proxy: true
  },

  proxy: {
    '/api': 'http://0.0.0.0:3000',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
