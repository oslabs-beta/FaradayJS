const path = require('path');

module.exports = {
  // Build Mode
  mode: 'development',
  // Electron Entrypoint
  entry: './src/main.ts',
  target: 'electron-main',
  resolve: {
    alias: {
      ['@']: path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{
      // "test" is commonly used to match the file extension
      test: /\.ts$/,
      // include all modules matching these conditions (/src folder)
      include: /src/,
        // "exclude" should be used to exclude exceptions
        // try to prefer "include" when possible

        // the "loader"
      use: [{ loader: 'ts-loader' }]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
}