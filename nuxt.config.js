const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    title: 'Founder Summit 2019',
    titleTemplate: '%s - Le Wagon Lyon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'L’événement qui rassemble les différents experts de la tech lyonnaise pour vous aider à créer ou à développer vos projets.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/pwa'],

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true
  },
  css: ['~/assets/stylesheets/application.css']
}
