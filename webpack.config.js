const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // module:{
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [
  //         { loader: "style-loader" },
  //         { loader: "css-loader" }
  //       ]
  //     }
  //   ]
  // },
  module: {
      rules: [{
          test: /\.scss$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
      }]
  },
  plugins: [
  	new BrowserSyncPlugin({
      // browse to http://localhost:8000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 8000,
      server: { baseDir: ['./'] },
      files: [
      	"./src/*.js",
      	"./*.html",
        "./src/*.css"
      ]
    })
  ]
};