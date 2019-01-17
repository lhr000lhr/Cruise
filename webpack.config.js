let path = require('path');
let HtmlWebpackPlugin = require('html-webapck-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve("./build")
  },
  devServer: {
    contentBase: './build',
    port: 4200,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "awesome-typescript-loader"
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'CRULSE'
    })
  ],
  mode: 'development',
  resolve: {},
}
