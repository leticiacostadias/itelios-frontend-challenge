var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    exprContextCritical: false,
    rules: [
      { // Stylus into the page
        test: /\.styl$/,
        include: path.resolve(__dirname, 'src', 'style'),
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      { // Standard Linter
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, 'src', 'js'),
        exclude: [/node_modules/],
        use: 'standard-loader'
      },
      { // Babel Transpile ESLatest for ES5
        test: path.resolve(__dirname, 'src', 'js'),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache'
        }
      },
      { // Pug templates will be transpiled to HTML
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src'),
        use: ['html-loader', 'pug-html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Itelios Challenge',
      template: './src/index.pug'
    })
  ]
}
