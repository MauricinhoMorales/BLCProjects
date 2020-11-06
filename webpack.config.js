const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin(`style.[hash].css`);
const merge = require('webpack-merge');
const multipleThemesCompile = require('webpack-multiple-themes-compile');

const webpackConfigs = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: extractLess.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader?javascriptEnabled=true' },
          ],
        }),
      },
    ],
  },
};

module.exports = merge(
  webpackConfigs,
  multipleThemesCompile({
    themesConfig: {
      default: {},
      green: {
        'base-color': '#008000',
      },
      yellow: {
        'base-color': '#ffff00',
      },
    },
  })
);
