var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.html$/,
        loader: StringReplacePlugin.replace(
            'file?name=[name].[ext]',
            {
              replacements: [{
                pattern: /v=_VERSION_/ig,
                replacement: function (match, p1, offset, string) {
                  var d = new Date();
                  return "" + d.getYear() + (d.getMonth() + 1) + d.getDay() + d.getHours() + d.getMinutes();
                }
              }]
            }
        )
      },
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react'
        ]
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new StringReplacePlugin()
  ],
  devServer: {
    contentBase: './client',
    hot: true
  }
}
