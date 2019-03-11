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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      { src: "https://www.eventbrite.com/static/widgets/eb_widgets.js" },
      { src: "https://embed.small.chat/TA72U2CCCGGU78RJ3W.js" }
    ]
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
  ** Nuxt.js modules
  */
  modules: [
    ["@nuxtjs/pwa"],
    ["@nuxtjs/google-analytics", { id: "UA-135962984-1", dev: false }],
    ["nuxt-facebook-pixel-module", { pixelId: "1351265168355817" }]
  ],

  /*
  ** Rendering
  */
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ["script", "style", "font"].includes(type);
      }
    },
    http2: {
      push: true
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
