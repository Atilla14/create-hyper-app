var path = require('path');
var plugins = [];

module.exports = {
  devtool: "source-map",
  entry: ["./index.js"],
  output: {
    path: __dirname + "/dist",
    filename: "command.js",
    publicPath: './',
    sourceMapFilename: "command.js.map"
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules\//,
        loader: "babel-loader"
      },
    ]
  },
  node: {
    fs: "empty",
    child_process: "empty"
  }
}
