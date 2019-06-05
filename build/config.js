/**
 * webpack config
 *
 * Authors: axin
 */

const path = require('path')
const glob = require('globby')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExtPlugin = require('html-webpack-ext-plugin')
const domain = require('./domain')
const isProduction = process.env.NODE_ENV !== 'development'

const resolve = dir => path.join(__dirname, '..', dir)

const assetsDir = resolve('src')
const distDir = resolve('dist')
const viewDir = resolve('src/view')

function moduleName (modules) {
  let filename = path.basename(modules)
  let parts = filename.split('.')
  parts.pop()
  filename = parts.join('.')
  return path.dirname(modules) + '/' + filename
}

const jsEntry = (() => {
  const obj = {}
  const files = glob.sync(['js/conf/**/!(_*|source)/!(_*).js'], { cwd: assetsDir })
  files.forEach(val => {
    let parts = val.split(/[\\/]/)
    parts.shift()
    parts.shift()
    let modules = parts.join('/')
    let entry = moduleName(modules)
    obj[entry] = val
  })
  return obj
})()

const minifierConfig = isProduction ? {
  removeComments: true,
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  minifyJS: true,
  removeScriptTypeAttributes: true,
  maxLineLength: 1024
} : false

const getPageEntry = view => jsEntry[view] ? view : ''

// 重新定向输出页面
const pageRewriter = {
  'view/home/index.*': 'index.html',
  'view/price/price.*': 'function.html',
  'view/error/error': '404.html'
}

const isEmpty = o => {
  for (let k in o) {
    if (o.hasOwnProperty(k)) {
      return
    }
  }
  return true
}

const unixPath = v => v.replace(/\\/g, '/')

const rewriterPath = p => {
  if (isEmpty(pageRewriter)) {
    return
  }

  for (let k in pageRewriter) {
    let regx = new RegExp(k)

    if (regx.test(unixPath(p))) {
      return pageRewriter[k]
    }
  }
}

const pages = glob.sync(['**/!(_*).html', '!docs/**/*.html'], { cwd: viewDir }).map(p => {
  let pagePath = `${path.join(viewDir, p)}`
  let newPagePath = rewriterPath(pagePath)

  let entry = getPageEntry(p.replace('.html', ''))
  let chunks = ['common']
  if (entry) {
    chunks.push(entry)
  }
  return new HtmlWebpackPlugin({
    filename: newPagePath || `${entry.split('/').join('-')}.html`,
    template: `html-loader?min=false!${path.join(viewDir, p)}`,
    cache: true,
    inject: true,
    chunks: chunks,
    minify: minifierConfig
  })
})

const baseConfig = {
  entry: jsEntry,
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'js/[name].[chunkhash:7].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheIdentifier: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          publicPath: distDir,
          name: 'font/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    modules: [
      resolve('node_modules'),
      resolve('./'),
      resolve('src'),
      resolve('src/js')
    ],
    alias: {
      '@': resolve('src/js')
    },
    extensions: ['.js', 'json', '.vue', '.scss']
  },
  externals: {
    'jquery': '$',
    'echarts': 'echarts',
    'vue': 'Vue',
    'lodash': '_',
    'moment': 'moment',
    '@fedor/utils': '__',
    '@vue/utils': 'VueUtils',
    '@analysys/lazyload': 'Lazyload'
  },
  plugins: [
    new webpack.ProvidePlugin({ vue: 'Vue', _: 'lodash' }),
    new HtmlWebpackExtPlugin({ cache: true, delimiter: '$', locals: domain[process.env.NODE_ENV ? process.env.NODE_ENV : 'development']['locals'] }),
    ...pages
  ]
}

module.exports = {
  isProduction,
  assetsDir,
  distDir,
  baseConfig
}
