const autoprefixer = require("autoprefixer");
const postcssCustomMedia = require("postcss-custom-media");
const postcssNested = require("postcss-nested");
const postcssFor = require("postcss-for");
const postcssRandom = require("postcss-random");
const postcssCalc = require("postcss-calc");

module.exports = {
  plugins: [
    autoprefixer({}),
    postcssFor({}),
    postcssRandom({}),
    postcssCalc({}),
    postcssCustomMedia({
      importFrom: "assets/stylesheets/base/media.css"
    }),
    postcssNested({
      importFrom: "assets/stylesheets/application.css"
    })
  ]
};
