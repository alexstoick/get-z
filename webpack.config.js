module.exports = {
  entry: "./js/main.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
