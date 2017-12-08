var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  devtool: 'source-map',
  entry: './src/js/app.jsx',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
              loader: 'babel-loader',
            }
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [
            'css-loader', 'sass-loader',
          ]
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins : [
    extractPlugin,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      sourceMap: true,
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })
  ]
};
