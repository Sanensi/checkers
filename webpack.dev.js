const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const outputPath = path.join(__dirname, 'build', 'dev', 'client');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: outputPath,
    filename: 'app.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src', 'client'),
    watchContentBase: true
  }
});