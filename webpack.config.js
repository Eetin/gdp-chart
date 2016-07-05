var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname + '/app',
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] }
    ]
  },
  node: {
    fs: "empty"
  },
  devtool: "source-map",
  plugins: [HtmlWebpackPluginConfig]
}
