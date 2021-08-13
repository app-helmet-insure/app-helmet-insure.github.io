module.exports = {
  mode: "universal",
  router: {
    middleware: "i18n",
    mode: "history",
    base: "/",
  },
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    title: "helmet1.0" || process.env.npm_package_name,
    description:
      "Helmet.insure is a peer-to-peer price-shield insurance protocol on BSC, with the aim to redefine option trading with user-friendly insurance policy wrapping.",
    keywords: "HELMET BSC binance insurance",
    bodyAttrs: {
      class: "light",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        hid: "description",
        name: "description",
        content:
          "Helmet.insure is a peer-to-peer price-shield insurance protocol on BSC, with the aim to redefine option trading with user-friendly insurance policy wrapping.",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "bsc binance smart chain defi crypto yieldfarm binance insurance helmet BSC",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      // {
      //   src: "/js/iconfont.js"
      // },
      // {
      //   src: "/js/tronweb.js"
      // }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~assets/css/main.scss",
    "~assets/css/animate.css",
    "element-ui/lib/theme-chalk/index.css",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~plugins/i18n.js",
    "~plugins/bus-inject.js",
    "~plugins/filter.js",
    "~plugins/c-ui.js",
    "~plugins/element-ui.js",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true,
  },
  proxy: {
    "/api": {
      target: "https://api.helmet.insure",
      pathRewrite: {
        "^/api": "/",
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        [
          "component",
          { libraryName: "element-ui", styleLibraryName: "theme-chalk" },
        ],
      ],
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  generate: {
    dir: "docs",
  },
};
