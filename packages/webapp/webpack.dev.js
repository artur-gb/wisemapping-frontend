/* eslint-disable no-undef */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
require('dotenv').config();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: {
          host: '0.0.0.0',
          protocol: 'http:',
          port: 8080,
        },
      },
    ],
    historyApiFallback: {
      rewrites: [{ from: /^\/c\//, to: '/index.html' }],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      templateParameters: {
        GOOGLE_ADDS_ENABLED: false,
        NEW_RELIC_ENABLED: false,
      },
      base: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:3000',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_ALLOWED_DOMAINS': JSON.stringify(
        process.env.REACT_APP_ALLOWED_DOMAINS || '',
      ),
    }),
  ],
});
