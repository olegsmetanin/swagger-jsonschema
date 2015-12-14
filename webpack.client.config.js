var path = require('path');
var webpack = require('webpack');

//https://github.com/keokilee/react-typescript-boilerplate

var APP_DIR = path.join(__dirname, 'src');

var config = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel', 'ts']
    }, {
      test: /\.jsx?$/,
      loaders: ['babel'],
    }, {
      test: /\.json$/,
      loaders: ['json'],
    }]
  },
  plugins: []
}

module.exports = config;
