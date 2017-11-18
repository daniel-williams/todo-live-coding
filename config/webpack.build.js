const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const PUBLIC = process.env.PUBLIC_DEV || HOST + ':' + PORT;
const METADATA = {
  host: HOST,
  port: PORT,
  public: PUBLIC,
  ENV: ENV
};

const extractSass = new ExtractTextPlugin({
  filename: "assets/bundles/[name].[contenthash].css"
});

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {
    devtool: 'source-map',
    output: {
      path: helpers.root('dist'),
      filename: 'assets/bundles/[name].[hash].js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          use: 'awesome-typescript-loader'
        },
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [
              { loader: "css-loader" }, // translates CSS into CommonJS
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [
                    require('postcss-import')({ addDependencyTo: webpack }),
                    require('postcss-cssnext')(),
                    require('postcss-reporter')(),
                  ]
                }
              },
              { loader: "sass-loader" }, // compiles Sass to CSS
            ],
            fallback: "style-loader"
          }),
        },
      ],
    },
    plugins: [
      extractSass,
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
      }),
      new CopyWebpackPlugin([
        { from: './client/assets', to: './assets' }
      ])
    ]
  });
};