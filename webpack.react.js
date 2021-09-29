const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/renderer/index.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist/renderer/index.js'),
    compress: true,
    hot: true,
    port: 8080,
  },
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js(x?)|ts(x?))$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /.(js|jsx)$/,
        include: /src/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
          ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ]
  },
  output: {
    path: __dirname + '/dist/renderer',
    filename: 'index.js'
  },
  devServer: {
    /*The bundled files will be available in the browser under this path. 
    publicPath says that any request made to '/' will be served the development version of our bundle via localhost:8080. publicPath should match where we have index.html
    */
    publicPath: '/dist',

    hot: true,
    // Tell the server where to serve content from.
    contentBase: path.resolve(__dirname, './dist'),
    watchContentBase: true,

    // Proxy says taht any request made to '/api' will be routed to our server on localhost:3000
    // proxy should match whatever is going to match your fetch request on your frontend.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: path.join(__dirname, "./dist/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: path.join(__dirname, "./dist/src/styles.css")
    })
  ]
};