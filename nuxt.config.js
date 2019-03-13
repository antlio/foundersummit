const pkg = require("./package");

require("dotenv").config();

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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
      { name: "keywords", content: "founder, summit, lewagon, lyon" }
    ],
    link: [
      {
        rel: "icon",
        rel: "stylesheet",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ],
    script: [
      { src: "https://www.eventbrite.com/static/widgets/eb_widgets.js" },
      { src: "https://embed.small.chat/TA72U2CCCGGU78RJ3W.js" }
    ]
  },

  manifest: {
    name: "Founder Summit 2019",
    lang: "fr",
    start_url: "/"
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  /*
  ** Global CSS
  */
  css: ["~assets/stylesheets/application.css"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~plugins/cookie-consent", ssr: false },
    { src: "~plugins/smooth-scroll", ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ["@nuxtjs/pwa"],
    ["@nuxtjs/google-analytics", { id: "UA-135962984-1", dev: false }],
    ["nuxt-facebook-pixel-module", { pixelId: "1351265168355817" }]
  ],

  /*
  ** Env
  */
  env: {
    airtableId: process.env.AIRTABLE_ID,
    airtableKey: process.env.AIRTABLE_KEY
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
