const webpack = require('webpack')
const path = require('path');
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

require('dotenv').config();

const jsBasePath = path.resolve(__dirname, 'src/');
const targets = glob.sync(`${jsBasePath}/*.js`);
const entries = {};

targets.forEach(value => {
  const re = new RegExp(`${jsBasePath}/`);
  const key = value.replace(re, '');
  entries[key] = value;
});

const ENV = process.env.JS_TYPE

module.exports = {

  entry:entries,

  output: {
    path: path.resolve(__dirname, 'build/js/'),
    filename: "[name]"
  },

  module: {
    rules: [
      {
        test: /\.tag$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
            hot: true,
            debug: true
        }
      },
      {
        test: /\.js|\.tag|\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["react"]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url&minimize&sourceMap!sass-loader')
      }
    ]
  },

  resolve: {
    extensions: [".tag", ".jsx", ".js", ".json",".vue","css"],
    alias: {
      '#root#': `${__dirname}/src/`,
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
    publicPath: '/build/',
    hot: true,
  },
  plugins: (ENV === 'production' ? [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
  ]: []),
  devtool: 'source-map'
};
