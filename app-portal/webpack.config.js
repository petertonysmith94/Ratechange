const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

// Path config
const paths = {
  source: path.join(__dirname, './src'),
  javascript: path.join(__dirname, './src/js'),
  build: path.join(__dirname, './dist') 
};

module.exports = {
  context: paths.javascript,
  entry: path.join(paths.javascript, './index.js'),

  output: {
    path: path.build,
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loaders: ["html-loader"]
      }
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(paths.source, 'index.html'),
      path: paths.build,
      filename: 'index.html'
    })
  ]
}