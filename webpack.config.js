var webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './resources/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          use: [
            {
              loader: "style-loader" // creates style nodes from JS strings
            }, 
            {
              loader: 'css-loader' // translates CSS into CommonJS
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-cssnext')(),
                ]
              }
            },
            {
              loader: "sass-loader" // compiles Sass to CSS
            },
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader:"file-loader",
          query:{
            name:'[name].[ext]',
            outputPath:'images/'
            //the images will be emmited to public/assets/images/ folder 
            //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
          }
        }
      ]
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
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    }),
    // Make sure that the plugin is after any plugins that add images
    // Copy the images folder and optimize all the images
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '70'
      }
    }),
    new CopyWebpackPlugin([{
      from: 'resources/img/'
    }]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ]
};