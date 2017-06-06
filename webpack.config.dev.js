const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://frivillig-dev.app.dnt.local',
      'webpack/hot/only-dev-server',
      './src/index',
    ],
  },
  output: {
    path: path.join(__dirname, 'tmp'),
    filename: '[name].js',
    publicPath: 'http://frivillig-dev.app.dnt.local/assets/',
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src'),
        test: /\.jsx?$/,
        use: [
          {loader: 'babel-loader'},
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        // use: [
        //   {loader: 'style-loader'},
        //   {loader: 'css-loader', options: {autoprefixer: true}},
        // ],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }),
      },
      {
        test: /\.png$/,
        use: [
          {loader: 'url-loader', options: {limit: 100000}}
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use : [
          {loader: 'file-loader'}
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    publicPath: 'http://frivillig-dev.app.dnt.local/assets/',
    public: 'frivillig-dev.app.dnt.local',
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': (
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
      ),
      'Access-Control-Allow-Headers': (
        'X-Requested-With, content-type, Authorization'
      ),
    },
  },
};
