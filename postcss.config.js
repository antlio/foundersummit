const autoprefixer = require('autoprefixer')
const postcssCustomMedia = require('postcss-custom-media')
const postcssNested = require('postcss-nested')

module.exports = {
  plugins: [
    autoprefixer({}),
    postcssCustomMedia({
      importFrom: 'assets/stylesheets/base/media.css'
    }),
    postcssNested({
      importFrom: 'assets/stylesheets/application.css'
    })
  ]
}
