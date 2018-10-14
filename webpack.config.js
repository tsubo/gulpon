const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const mode = process.env.NODE_MODE || 'development'

module.exports = {
  mode: mode,

  entry: {
    bundle: ['./src/js/index.js', './src/sass/index.js'],
    wpposts: ['./plugin/WpPosts/main.js'],
    json_posts: ['./plugin/JsonPosts/main.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js'),
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
    }),
    new VueLoaderPlugin(),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },
}
