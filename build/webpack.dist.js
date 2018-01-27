'use strict'
const merge = require('deep-assign')
const webpack = require('webpack')
const options = require('./options')
const base = require('./webpack.base.js')
const config = merge(base, {
  entry: options.paths.src.main,
  output: {
    filename: '[name].js',
    path: options.paths.output.main
  },
  plugins: []
})

// debug and production
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(options.version)
  })
])

if (options.isProduction) {
  // production only
  config.plugins = config.plugins.concat([
    // Set the production environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Minify with dead-code elimination
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   compress: {
    //     warnings: false
    //   }
    // })
  ])
}
module.exports = config