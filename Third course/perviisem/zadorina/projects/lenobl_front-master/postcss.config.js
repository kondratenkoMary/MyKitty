const postcssLess = require("postcss-less");
const postcssAutoprefixer = require("autoprefixer");

module.exports = {
    plugins: [postcssLess, postcssAutoprefixer]
};
