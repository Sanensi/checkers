const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientPath = path.join(__dirname, 'src', 'client');
const appPath = path.join(__dirname, 'src', 'app');
const nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
  entry: path.join(clientPath, 'index.ts'),

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        },
        include: [
          clientPath,
          appPath
        ],
        exclude: nodeModulesPath,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      clientPath,
      appPath
    ],
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(clientPath, 'index.html'),
      filename: 'index.html'
    })
  ],
};