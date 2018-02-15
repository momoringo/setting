const webpack = require('webpack')
const path = require('path');
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');



function find(pattern) {
  glob(pattern, function (err, files) {
    if(err) {
      console.log(err);
    }
    console.log(pattern);
    console.log(files);
  });
}

var pattern = "src/*.js";
find(pattern);




require('dotenv').config();

const TYPE = process.env.JS_TYPE

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  entry: {
    main: `${__dirname}/src/main.js`
  },

  output: {
    path: `${__dirname}/public/build`,
    filename: "[name].js"
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
      '@': `${__dirname}/src/`,
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
    publicPath: '/build/',
    hot: true,
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
  ],
  devtool: 'source-map'
};
