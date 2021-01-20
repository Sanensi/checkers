const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const outputPath = path.join(__dirname, 'build', 'prod', 'client');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: outputPath,
    filename: 'app.js'
  }
});