const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  // Webpack is reading index.js in client folder and compiling it into output object.
  entry: './client/index.tsx',
  // Compiled index.js is saved in the location specified output.
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.jpg', '.jpeg', '.png', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: [/node_modules/],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
      },
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader", 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MySteam',
      template: './index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    /*The bundled files will be available in the browser under this path. 
    publicPath says that any request made to '/' will be served the development version of our bundle via localhost:8080. publicPath should match where we have index.html
    */
    publicPath: '/build',

    hot: true,
    // Tell the server where to serve content from.
    contentBase: path.resolve(__dirname, './client/'),
    watchContentBase: true,

    // Proxy says taht any request made to '/api' will be routed to our server on localhost:3000
    // proxy should match whatever is going to match your fetch request on your frontend.
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: false,
      },
    }
  }
};
