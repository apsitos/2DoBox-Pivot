const path = require('path');

module.exports = {
  entry: {
    main: "./lib/script.js",
    test: "mocha!./test/script.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  }
};
