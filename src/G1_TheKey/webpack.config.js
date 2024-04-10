const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: path.resolve(__dirname, './main.ts'),
  },
  output: {
    path: path.resolve(__dirname, './../../dist/G1_TheKey/js'),
    filename: "g1_the_key.build.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.join(__dirname, './../src')]
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};
