/**
 * webpack config
 *
 * Authors: axin
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const { baseConfig, assetsDir, distDir } = require('./config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressPlugin = require('@fedor/progress-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = merge.smart(baseConfig, {
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[chunkhash:7].js',
    publicPath: '/portal/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: false // 开启热重载
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    'browsers': [ '> 1%', 'last 3 versions', 'ie >= 9' ]
                  }),
                  require('cssnano')
                ]
              }
            }
          ],
          fallback: ['vue-style-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    'browsers': [ '> 1%', 'last 3 versions', 'ie >= 9' ]
                  }),
                  require('cssnano')
                ]
              }
            },
            'sass-loader'
          ],
          fallback: ['vue-style-loader']
        })
      }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new VueLoaderPlugin(),
    new ExtractTextPlugin({ filename: 'css/[name].[contenthash:7].css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'js/[name].[hash:7].js' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new UglifyJSPlugin({ 
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        comments: function (n, c) {
          /*! IMPORTANT: Please preserve 3rd-party library license info, inspired from @allex/amd-build-worker/config/jsplumb.js */
          var text = c.value, type = c.type
          if (type === 'comment2') {
            return /^!|@preserve|@license|@cc_on|MIT/i.test(text)
          }
        }
      }
    }),
    new CopyWebpackPlugin([
      { from: assetsDir + '/robots.txt', to: distDir },
      { from: assetsDir + '/sitemap.xml', to: distDir }
    ])
  ]
})

module.exports = config
