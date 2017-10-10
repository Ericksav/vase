const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader" // creates style nodes from JS strings
            }, 
            {
              loader: "css-loader" // translates CSS into CommonJS
            }, {
              loader: "sass-loader" // compiles Sass to CSS
            },
            // {
            //   loader: 'style-loader!css-loader!autoprefixer-loader'
            // },
            // {
            //   loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions'
            // }
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [
                    require('autoprefixer')(),
                ]
              }
            }
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
    })
  ]
};