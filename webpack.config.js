'use strict'

const webpack = require('webpack')

module.exports = {
  entry: ['./lib/prismic.js'],
  output: {
    path: './dist/',
    filename: 'prismic.io.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.json$/,
      loader: "json-loader"
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
}
