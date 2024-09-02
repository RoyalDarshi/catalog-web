const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { dependencies } = require("./package.json");
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {


  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',

    },
    historyApiFallback: true,


  },
  performance: {
    hints: false,
    maxEntrypointSize: 1512000,
    maxAssetSize: 8512000

  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images', // This is where the images will be stored in the output directory
            },
          },
        ],
      },
      {
        test: /\.(xlsx|xls)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/excel/', // Specify the output directory
            },
          },
        ],
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
      new Dotenv(),
    new ModuleFederationPlugin({
      name: "CatalogRemote",
      filename: "catalogRemoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        ...dependencies,
        "react": {
          eager: true,
         // singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          eager: true,
          //singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json"
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  target: "web",
};
