const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const nodeModulesPath = path.join(__dirname, 'node_modules');
const outputPath = path.join(__dirname, 'build', 'dev');

module.exports = {
  entry: path.join(sourcePath, 'index.ts'),

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
        include: sourcePath,
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
      sourcePath
    ],
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html'),
      filename: 'index.html'
    })
  ],

  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: outputPath,
    filename: 'index.js'
  },
  devServer: {
    contentBase: outputPath
  }
};