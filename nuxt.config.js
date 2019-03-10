module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: "fr"
    },
    title: "Founder Summit 2019",
    titleTemplate: "%s - Le Wagon Lyon",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      },
      { name: "keywords", content: "founder, summit, lewagon, lyon" }
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
  css: ["~/assets/stylesheets/application.css"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: "~plugins/smooth-scroll", ssr: false }],

  /*
  ** Env variable
  */
  env: {
    PIXEL_ID: process.env.PIXEL_ID,
    GA_ID: process.env.GA_ID
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    ["@nuxtjs/pwa"],
    ["@nuxtjs/google-analytics", { id: "UA-135962984-1", dev: false }],
    ["nuxt-facebook-pixel-module", { pixelId: "12312412412" }]
  ],

  /*
  ** Rendering
  */
  render: {
    http2: {
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles
          .filter(f => f.asType === "script" && f.file === "runtime.js")
          .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
