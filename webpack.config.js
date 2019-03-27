const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    a: path.join(__dirname, './src/a/index.jsx'),
    b: path.join(__dirname, './src/b/index.jsx'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: [/node_modules/, /build\/lib/, /\.min\.js$/],
        use: 'babel-loader',
      },
      {
        test: /\.(s)?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'resolve-url-loader',
              options: {
                debug: true,
                keepQuery: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, // 结合resolve-url-loader使用必填，详见https://www.npmjs.com/package/resolve-url-loader
                sourceMapContents: false,
              },
            },
          ],
        }),
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)((\?|#).*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
  devServer: {
    open: true,
    openPage: './index.html',
    port: 9002,
    publicPath: '/build/',
  }
};
