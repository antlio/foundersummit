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
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0"
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
  plugins: [
    { src: "~plugins/smooth-scroll", ssr: false },
    { src: "~plugins/ga.js", ssr: false },
    { src: "~plugins/fb.js", ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [["@nuxtjs/pwa"]],

  /*
  ** Rendering
  */
  render: {
    http2: {
      push: true,
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
